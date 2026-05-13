import "server-only";
import { createClient } from "@/lib/supabase/server";
import { generateEmbeddings } from "@/lib/ai/embeddings";
import { nanoid } from "./utils";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { JobPosition, Level } from "./types";
import { redirect } from "next/navigation";

export async function fetchStandardUsers() {
  const supabase = await createClient();

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
  job_position: JobPosition,
  level: Level,
) {
  const supabase = await createClient();

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
  const supabase = await createClient();

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
  const supabase = await createClient();

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

export async function fetchChatHistory() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("chats").select("*");

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch chat history.", error);
  }

  return data;
}

export async function fetchChatById(unique_id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("unique_id", unique_id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch chat.", error);
  }

  const messages = await fetchChatMessages(unique_id);

  return { chat: data, messages: messages };
}

async function fetchChatMessages(unique_id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", unique_id)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch chat history.", error);
  }

  return data;
}

export async function addMessage(
  id: string,
  message: string,
  role: string,
  chatId: string,
) {
  const supabase = await createClient();

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
  const supabase = await createClient();

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
  const supabase = await createClient();

  const { error } = await supabase
    .from("chats")
    .insert([{ unique_id, name }])
    .select()
    .single();

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
    throw new Error(`Failed to create chat: ${error.message}`);
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

export async function fetchJourneys() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("journeys")
    .select("*")
    .order("created_date", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch journeys.", error);
  }

  return data;
}

export async function fetchJourneyById(unique_id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("journeys")
    .select("*")
    .eq("unique_id", unique_id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch journey by id.");
  }

  return data;
}

export async function fetchJourneyTasks(unique_id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("journey_id", unique_id);

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch journey tasks.");
  }

  return data;
}

export async function fetchJourneyUsers(unique_id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("journey_id", unique_id);

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch users assigned to the journey.");
  }

  return data;
}

export async function createJourney(
  unique_id: string,
  name: string,
  job_position: JobPosition,
  level: Level,
  color_hex: string,
  start_date: Date,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("journeys")
    .insert([{ unique_id, name, job_position, level, color_hex, start_date }]);

  if (error) {
    console.error(error);
    throw new Error(`Failed to create journey: ${error.message}`);
  }
}

export async function createTask(
  unique_id: string,
  name: string,
  description: string,
  deadline: Date,
  journey_id: string,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tasks")
    .insert([{ unique_id, name, description, deadline, journey_id }]);

  if (error) {
    console.error(error);
    throw new Error(`Failed to create task: ${error.message}`);
  }
}

export async function fetchUsersWithoutJourney() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .is("journey_id", null);

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch users.");
  }

  return data;
}

export async function updateUser(user_id: string, journey_id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("users")
    .update({
      journey_id,
    })
    .eq("unique_id", user_id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(`Failed to update user: ${error.message}`);
  }
}

export async function updateTask(
  unique_id: string,
  name: string,
  description: string,
  deadline: Date,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tasks")
    .update({
      name,
      description,
      deadline,
    })
    .eq("unique_id", unique_id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(`Failed to update task: ${error.message}`);
  }
}

export async function getUserRole() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return data?.role ?? null;
}
