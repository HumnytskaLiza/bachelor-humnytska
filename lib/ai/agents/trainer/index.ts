import { findRelevantContent, RetrievalResult } from "../../embeddings";
import { generateText, streamText } from "ai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import z from "zod";

export async function trainerAgent(input: string, chatHistory: string) {
  const trainerPrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `
      You are the trainer agent in a multi-agent onboarding assistant.

      Your role is to explain information from the provided documents in a clear, educational way.

      Rules:
      - Use only the provided Context.
      - Do not add external knowledge.
      - Explain step-by-step when helpful.
      - Use simple language and examples only if they are supported by Context.
      - Adapt explanation depth to the user's role when available.
      - Chat history may clarify the user's confusion, but Context has priority.
      - If the answer is not supported by Context, say:
      "I could not find this information in the provided documents."
      `,
    ],
    [
      "human",
      `
      Context:
      {context}

      Chat history:
      {chat_history}

      User role:
      {user_role}

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

  const formattedPrompt = await trainerPrompt.format({
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
