import "server-only";
import { supabase } from "@/lib/supabase";

import { sql } from "@vercel/postgres";
import { User, File, Folder, Chat } from "./definitions";

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
    },
  ]);

  if (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create a user.");
  }
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

  return data;
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

export async function fetchFolders(unique_id: string) {
  try {
    if (unique_id === "") {
      const folders =
        await sql<Folder>`SELECT * FROM folders WHERE parent_id IS NULL`;

      const files =
        await sql<Folder>`SELECT * FROM files WHERE folder_id IS NULL`;

      return { current: null, folders: folders.rows, files: files.rows };
    }

    const folder =
      await sql<Folder>`SELECT * FROM folders WHERE unique_id = ${unique_id}`;

    const folders =
      await sql<Folder>`SELECT * FROM folders WHERE parent_id = ${unique_id}`;

    const files =
      await sql<File>`SELECT * FROM files WHERE folder_id = ${unique_id}`;

    return {
      current: folder.rows[0],
      folders: folders.rows,
      files: files.rows,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch folders.");
  }
}
