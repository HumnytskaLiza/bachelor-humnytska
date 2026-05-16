import "server-only";
import { createClient } from "@/lib/supabase/server";

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
