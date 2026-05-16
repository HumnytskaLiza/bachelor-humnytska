import { fetchChatById, deleteChat, addMessage } from "@/lib/data/chat";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  id: z.string().min(1),
  chatId: z.string().min(1),
  message: z.string().min(1),
  role: z.string().min(1),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ unique_id: string }> },
) {
  const { unique_id } = await params;

  try {
    if (!unique_id) {
      return NextResponse.json({ message: "Missing id" }, { status: 400 });
    }

    const chatData = await fetchChatById(unique_id);

    const messages = chatData.messages;
    const chat = chatData.chat;

    return NextResponse.json({ messages, chat });
  } catch (error) {
    console.error("Failed to fetch chat:", error);
    return NextResponse.json(
      { message: `Failed to fetch chat. UNIQUE_ID: ${unique_id}` },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { id, message, role, chatId } = parsed.data;

    await addMessage(id, message, role, chatId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save a message.", error);
    return NextResponse.json(
      { message: "Failed to save a message." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ unique_id: string }> },
) {
  try {
    const { unique_id } = await params;
    await deleteChat(unique_id);
  } catch (error) {
    console.error("Failed to delete a chat:", error);
    return NextResponse.json(
      { message: "Failed to delete a chat." },
      { status: 500 },
    );
  }
}
