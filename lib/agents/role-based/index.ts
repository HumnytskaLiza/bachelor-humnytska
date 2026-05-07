import { llm } from "@/lib/ai/llm";

export default async function roleBasedAgent(input: string) {
  const prompt = `
You are a research agent.
Extract key facts and useful context for this query:

${input}
`;

  const res = await llm.invoke(prompt);
  return JSON.parse(res);
}
