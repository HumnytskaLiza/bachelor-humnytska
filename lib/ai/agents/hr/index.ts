import { findRelevantContent } from "../../embeddings";
import { generateText, streamText } from "ai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import z from "zod";

export async function hrAgent(input: string, chatHistory: string) {
  const hrPrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `
      You are an HR assistant.

      Responsibilities:
      - corporate culture
      - onboarding
      - company policies
      - communication standards

      Use the provided context to answer.
      If information is missing, say you do not know.
    `,
    ],

    [
      "human",
      `
      Context:
      {context}

      Chat history and past messages within current chat:
      {chat_history}

      Question:
      {input}
    `,
    ],
  ]);

  const ragContext = findRelevantContent(input);

  const formattedPrompt = await hrPrompt.format({
    context: ragContext,
    input: input,
    chat_history: chatHistory,
  });

  const result = streamText({
    model: "openai/gpt-4o-mini",
    prompt: formattedPrompt,
    tools: {
      agentMeta: {
        description: "internal metadata",
        inputSchema: z.object({
          agent: z.string(),
        }),
        execute: async () => ({
          agent: "trainer",
        }),
      },
    },
  });

  const textResult = await generateText({
    model: "openai/gpt-4o-mini",
    prompt: formattedPrompt,
  });

  return {
    result,
    text: textResult.text,
  };
}
