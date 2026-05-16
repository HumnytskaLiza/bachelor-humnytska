import { fetchChatHistory, createChat } from "@/lib/data/chat";
import { NextResponse } from "next/server";
import z from "zod";

const schema = z.object({
  unique_id: z.string(),
  name: z.string(),
});

export async function GET() {
  try {
    const data = await fetchChatHistory();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch chats:", error);
    return NextResponse.json(
      { message: "Failed to fetch chats." },
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

    const { unique_id, name } = parsed.data;

    await createChat(unique_id, name);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to create a chat.", error);
    return NextResponse.json(
      { message: "Failed to create a chat." },
      { status: 500 },
    );
  }
}
