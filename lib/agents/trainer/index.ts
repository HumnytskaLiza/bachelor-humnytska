import { llm } from "@/lib/ai/llm";

export default async function trainerAgent(input: string, context?: string) {
  const prompt = `
You are a writing agent.

Use the context if provided:

Context:
${context ?? "none"}

User request:
${input}

Produce a clear final answer.
`;

  const res = await llm.invoke(prompt);
  return JSON.parse(res);
}
