import { UIMessage } from "ai";
import { supabase } from "@/lib/supabase/client";
import { coordinatorAgent } from "@/lib/ai/agents/coordinator";
import { nanoid } from "nanoid";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const chatId = new URL(req.url).searchParams.get("chatId");

  const { messages }: { messages: UIMessage[] } = await req.json();

  const lastMessage = messages[messages.length - 1];
  const textLastMessage = lastMessage.parts
    .filter((p) => p.type === "text")
    .map((p) => p.text)
    .join("");

  const { error } = await supabase.from("messages").insert({
    unique_id: nanoid(16),
    chat_id: chatId,
    role: "user",
    content: textLastMessage,
  });

  if (error) {
    console.error(error);
    throw new Error(`Failed to save message: ${error.message}`);
  }

  const result = await coordinatorAgent(textLastMessage, messages);

  return result.toUIMessageStreamResponse();
}
