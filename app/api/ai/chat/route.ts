import { streamText, UIMessage, convertToModelMessages } from "ai";
import { supabase } from "@/lib/supabase";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { nanoid } from "nanoid";

export const dynamic = "force-dynamic";

const TEMPLATE = `You are a comedian. You have witty replies to user 
questions and you tell jokes.

  Current conversation:
  {chat_history}

  user: {input}
  assistant:`;

export async function POST(req: Request) {
  const chatId = new URL(req.url).searchParams.get("chatId");

  const { messages }: { messages: UIMessage[] } = await req.json();

  const formatMessage = (message: UIMessage) => {
    return `${message.role}: ${message}`;
  };

  const lastMessage = messages[messages.length - 1];
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);

  const { error } = await supabase.from("messages").insert({
    unique_id: nanoid(16),
    chat_id: chatId,
    role: "user",
    content: lastMessage.parts
      .filter((p) => p.type === "text")
      .map((p) => p.text)
      .join(""),
  });

  if (error) {
    console.error(error);
    throw new Error(`Failed to save message: ${error.message}`);
  }

  const prompt = PromptTemplate.fromTemplate(TEMPLATE);

  const formattedPrompt = await prompt.format({
    chat_history: formattedPreviousMessages.join("\n"),
    input: lastMessage,
  });

  const result = streamText({
    model: "openai/gpt-4o-mini",
    prompt: formattedPrompt,
  });

  const response = result.toUIMessageStreamResponse();

  return response;
}
