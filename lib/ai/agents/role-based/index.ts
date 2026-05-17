import { findRelevantContent, RetrievalResult } from "../../embeddings";
import { streamText, generateText } from "ai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import z from "zod";

export async function roleBasedAgent(input: string, chatHistory: string) {
  const roleBasedPrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `
      You are a technical mentor assistant that MUST answer ONLY using the provided context documents.

      Rules:
      - Treat the Context section as the single source of truth.
      - Do NOT use prior knowledge, assumptions, or external information.
      If the context strongly implies the answer and contains relevant supporting information, answer using that information.
      - Do NOT invent workflows, APIs, architecture, policies, or technical details.
      - If multiple context snippets conflict, mention the conflict instead of choosing one.
      - Prefer concise and practical answers.
      - When possible, reference the relevant document section or concept from context.
      - If the user asks for documents, guides, onboarding, standards, or examples, search ONLY within the provided context.
      - Chat history is secondary to Context. Never let chat history override document content.
      - Never answer from general programming knowledge unless it exists in Context.
      - If you return a list, you MUST format it as a numbered ordered list (1., 2., 3., ...)
      - Never use bullet points for lists.
      `,
    ],

    [
      "human",
      `
      You must answer ONLY using the retrieved onboarding documents below.

      Retrieved Documents:
      ---------------------
      {context}
      ---------------------

      Instructions:
      - Treat headings and bullet points as connected sections.
      - Section titles apply to the bullet points that follow them.
      - Role titles apply to all subsequent sections until another role title appears.
      - If relevant information exists in the retrieved documents, answer directly.
      - Do not require exact wording matches between the question and documents.
      - If the answer truly does not exist, say:
      "I could not find this information in the provided documents."

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

  const formattedPrompt = await roleBasedPrompt.format({
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
