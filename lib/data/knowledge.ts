import "server-only";
import { createClient } from "@/lib/supabase/server";
import { generateEmbeddings } from "@/lib/ai/embeddings";
import { nanoid } from "../utils";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

export async function fetchFileLinkById(unique_id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("files")
    .select("*")
    .eq("unique_id", unique_id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch file metadata by id.");
  }

  return data;
}

export async function createFolder(
  unique_id: string,
  name: string,
  color_hex: string,
  parent_id: string | null,
) {
  const supabase = await createClient();

  const { error } = await supabase.from("folders").insert([
    {
      unique_id,
      name,
      color_hex,
      parent_id,
    },
  ]);

  if (error) {
    console.error(error);
    throw new Error("Failed to create folder.");
  }
}

export async function addFileToStorage(
  name: string,
  file: File,
  unique_id: string,
  folder_id: string | null,
) {
  const storagePath = process.env.SUPABASE_STORAGE_PATH!;

  if (!storagePath) throw new Error("Missing storage path");

  const filePath = `${storagePath}/${name}`;

  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from("Knowledge")
    .upload(name, file);

  if (error) {
    console.error("UPLOAD ERROR:", error);
    throw error;
  }

  console.log("UPLOAD SUCCESS:", data);

  await createFileMetadata(name, unique_id, "Knowldege", filePath, folder_id);

  const loader = new WebPDFLoader(file);
  const docs = await loader.load();

  await createEmbeddings(docs[0].pageContent, unique_id);
}

export async function createFileMetadata(
  name: string,
  unique_id: string,
  bucket: string,
  path: string,
  folder_id: string | null,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("files")
    .insert([{ name, unique_id, bucket, path, folder_id }]);

  if (error) {
    console.error(error);
    throw new Error(`Failed to create file: ${error.message}`);
  }
}

export async function createEmbeddings(content: string, file_id: string) {
  const embeddings = await generateEmbeddings(content);

  const rows = embeddings.map((embedding) => ({
    content: embedding.content,
    file_id,
    unique_id: nanoid(16),
    embedding: embedding.embedding,
  }));

  const supabase = await createClient();

  const { error } = await supabase.from("embeddings").insert(rows);

  if (error) {
    console.error(error);
    throw new Error(`Failed to save embeddings: ${error.message}`);
  }
}

export async function fetchFolders(unique_id: string) {
  const supabase = await createClient();

  try {
    if (unique_id === "") {
      const { data: folders, error: foldersError } = await supabase
        .from("folders")
        .select("*")
        .is("parent_id", null);

      const { data: files, error: filesError } = await supabase
        .from("files")
        .select("*")
        .is("folder_id", null);

      if (foldersError || filesError) {
        console.error(foldersError || filesError);
        throw new Error("Failed to fetch folders.");
      }

      return { current: null, folders, files };
    }

    const { data: folder, error: folderError } = await supabase
      .from("folders")
      .select("*")
      .eq("unique_id", unique_id)
      .single();

    const { data: folders, error: foldersError } = await supabase
      .from("folders")
      .select("*")
      .eq("parent_id", unique_id);

    const { data: files, error: filesError } = await supabase
      .from("files")
      .select("*")
      .eq("folder_id", unique_id);

    if (folderError || foldersError || filesError) {
      console.error(folderError || foldersError || filesError);
      throw new Error("Failed to fetch folders.");
    }

    return {
      current: folder,
      folders,
      files,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch folders.");
  }
}
