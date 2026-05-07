import { llm } from "@/lib/ai/llm";

export default async function coordinatorAgent(input: string) {
  const prompt = `
You are a coordinator.

Decide routing:
- direct
- hr
- role-based
- 

Return JSON:
{"route": "...", "reason": "..."}

Input:
${input}
`;

  const res = await llm.invoke(prompt);
  return JSON.parse(res);
}
