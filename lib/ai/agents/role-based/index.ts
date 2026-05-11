import { findRelevantContent } from "../../embeddings";
import { streamText, generateText } from "ai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import z from "zod";

export async function roleBasedAgent(input: string, chatHistory: string) {
  const roleBasedPrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `
      You are a technical mentor.

      Provide:
      - role-specific guidance
      - technical explanations
      - workflow recommendations

      Answer practically and concisely.
      Use the provided context to answer.
      If information is missing, say you do not know. 
      Please, do not provide the answer without having the relevant context.
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

  const formattedPrompt = await roleBasedPrompt.format({
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
