import { ChatPromptTemplate } from "@langchain/core/prompts";
import { generateText } from "ai";

const coordinatorPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `
    You are a coordinator agent in a multi-agent onboarding system.

    Your task is to determine which specialized agent
    should handle the user's request.

    Available agents:

    - hr
      Handles:
      - corporate culture
      - HR policies
      - onboarding procedures
      - employee communication

    - role-based
      Handles:
      - technical questions
      - role-specific guidance
      - workflows and responsibilities

    - trainer
      Handles:
      - educational explanations
      - step-by-step guidance
      - beginner-friendly teaching

    Return ONLY one of:
    - hr
    - role-based
    - trainer

    Do not explain your reasoning.
`,
  ],

  ["human", "{input}"],
]);

export default async function routeQuery(input: string) {
  const formatted = await coordinatorPrompt.format({
    input,
  });

  const result = await generateText({
    model: "openai/gpt-4o-mini",
    prompt: formatted,
  });

  return result.text.trim();
}
