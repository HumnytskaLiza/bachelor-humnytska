import { findRelevantContent, RetrievalResult } from "../../embeddings";
import { generateText, streamText } from "ai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import z from "zod";

export async function hrAgent(input: string, chatHistory: string) {
  const hrPrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `
      You are the HR agent in a multi-agent onboarding assistant.

      You answer only questions related to:
      - corporate culture
      - HR policies
      - onboarding procedures
      - workplace communication
      - employee expectations

      Rules:
      - Use the provided Context as the single source of truth.
      - Do not use external knowledge.
      - Do not invent policies, procedures, or company rules.
      - Chat history may clarify the question, but it must not override Context.
      - If the answer is not supported by Context, say:
      "I could not find this information in the provided documents."
      - Be concise, professional, and clear.
      `,
    ],
    [
      "human",
      `
      Context:
      {context}

      Chat history:
      {chat_history}

      Question:
      {input}
      `,
    ],
  ]);

  const formatContext = (docs: RetrievalResult[]) => {
    return docs
      .map((doc) => {
        return `
      [Document: ${doc.file_id} | score: ${doc.similarity?.toFixed(3)}]

      ${doc.content}
      `.trim();
      })
      .join("\n\n---\n\n");
  };

  const ragContext = await findRelevantContent(input);
  const formattedContext = formatContext(ragContext);

  const formattedPrompt = await hrPrompt.format({
    context: formattedContext,
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
