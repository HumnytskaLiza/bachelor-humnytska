import { generateText } from "ai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const evaluationPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `
    You are a strict evaluator.

    Return ONLY valid JSON:
    {{
      "score": number (0-1),
      "needs_retry": boolean,
      "missing": string[],
      "reason": string
    }}
    `,
  ],
  [
    "human",
    `
    Question: {input}
    Answer: {result}
    `,
  ],
]);

export default async function evaluateQuery(input: string, result: string) {
  const formatted = await evaluationPrompt.format({
    input,
    result,
  });

  const evaluation = await generateText({
    model: "openai/gpt-4o-mini",
    prompt: formatted,
  });

  return JSON.parse(evaluation.text.trim());
}
