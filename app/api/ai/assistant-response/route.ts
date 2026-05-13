import { createClient } from "@/lib/supabase/server";
import { nanoid } from "@/lib/utils";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { role, content } = await req.json();
  const chatId = new URL(req.url).searchParams.get("chatId");

  const { error } = await supabase.from("messages").insert({
    unique_id: nanoid(16),
    chat_id: chatId,
    role,
    content,
  });

  if (error) {
    console.error(error);
    throw new Error(`Failed to save message: ${error.message}`);
  }

  return Response.json({ ok: true });
}
