import "server-only";
import { supabase } from "@/lib/supabase";

export async function fetchStandardUsers() {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "standard");

  if (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users.");
  }

  return data;
}

export async function createStandardUser(
  unique_id: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  job_position: "Developer" | "Designer" | "HR" | "QA" | "Project Manager",
  level: "Trainee" | "Junior" | "Middle" | "Senior",
) {
  const { error } = await supabase.from("users").insert([
    {
      unique_id,
      first_name,
      last_name,
      email,
      password,
      role: "standard",
      job_position,
      level,
    },
  ]);

  if (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create a user.");
  }
}

export async function fetchUserById(unique_id: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("unique_id", unique_id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch user.");
  }

  return data;
}

export async function fetchAdminUsers() {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "admin");

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch users.");
  }

  return data;
}

export async function createFolder(
  unique_id: string,
  name: string,
  color_hex: string,
  parent_id: string | null,
) {
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

export async function fetchChatHistory() {
  const { data, error } = await supabase.from("chats").select("*");

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch chat history.");
  }

  return data;
}

export async function fetchChatById(unique_id: string) {
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("unique_id", unique_id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch chat.");
  }

  const messages = await fetchChatMessages(unique_id);

  return { chat: data, messages: messages };
}

async function fetchChatMessages(unique_id: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", unique_id)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch chat history.");
  }

  return data.map((message) => ({
    id: message.id,
    role: message.role,
    parts: [
      {
        type: "text",
        text: message.content,
      },
    ],
  }));
}

export async function addMessage(
  id: string,
  message: string,
  role: string,
  chatId: string,
) {
  const { data: chat, error: fetchError } = await supabase
    .from("chats")
    .select("messages")
    .eq("unique_id", chatId)
    .single();

  if (fetchError) throw fetchError;

  const currentMessages = chat.messages || [];
  const updatedMessages = [...currentMessages, { id, message, role }];

  const { error } = await supabase
    .from("chats")
    .update({ messages: updatedMessages })
    .eq("unique_id", chatId);

  if (error) {
    console.error(error);
    throw new Error("Failed to add message.");
  }

  return { success: true };
}

export async function deleteChat(unique_id: string) {
  const { error } = await supabase
    .from("chats")
    .delete()
    .eq("unique_id", unique_id);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete chat.");
  }
}

export async function createChat(unique_id: string, name: string) {
  const { error } = await supabase.from("chats").insert([{ unique_id, name }]);

  if (error) {
    console.error(error);
    throw new Error(`Failed to create chat: ${error.message}`);
  }
}

export async function addFileToStorage(
  name: string,
  file: File,
  unique_id: string,
  folder_id: string | null,
  embedding?: Array<number>,
) {
  const storagePath = process.env.SUPABASE_STORAGE_PATH!;

  if (!storagePath) throw new Error("Missing storage path");

  const filePath = `${storagePath}/${name}`;

  const { data, error } = await supabase.storage
    .from("Knowledge")
    .upload(name, file);

  if (error) {
    console.error("UPLOAD ERROR:", error);
    throw error;
  }

  console.log("UPLOAD SUCCESS:", data);

  createFileMetadata(name, unique_id, "Knowldege", filePath, folder_id);
  // createEmbeddings(content, embedding, file_id);
}

export async function createFileMetadata(
  name: string,
  unique_id: string,
  bucket: string,
  path: string,
  folder_id: string | null,
) {
  const { error } = await supabase
    .from("files")
    .insert([{ name, unique_id, bucket, path, folder_id }]);

  if (error) {
    console.error(error);
    throw new Error(`Failed to create chat: ${error.message}`);
  }
}

export async function createEmbeddings(
  content: string,
  embedding: Array<number>,
  file_id: string,
) {
  const { error } = await supabase.from("embeddings").insert({
    content: content,
    embedding: embedding,
    file_id: file_id,
  });

  if (error) {
    console.error(error);
    throw new Error(`Failed to create chat: ${error.message}`);
  }
}

export async function fetchFolders(unique_id: string) {
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

export async function fetchFileLinkById(unique_id: string) {
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
