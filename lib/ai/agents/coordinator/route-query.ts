import { ChatPromptTemplate } from "@langchain/core/prompts";
import { generateText } from "ai";

const coordinatorPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `
    You are the coordinator agent in a centralized multi-agent onboarding assistant.

    Your only task is to route the user's latest request to the most appropriate agent.

    Available agents:

    1. hr
    Use for questions about:
    - company culture
    - HR policies
    - onboarding procedures
    - employee communication
    - workplace expectations
    - organizational rules

    2. role-based
    Use for questions about:
    - technical tasks
    - role-specific responsibilities
    - workflows
    - tools
    - development practices
    - job-specific guidance

    3. trainer
    Use for questions asking for:
    - explanations
    - step-by-step learning
    - beginner-friendly teaching
    - learning paths
    - clarification of concepts

    Routing rules:
    - If the user asks about company rules, culture, policies, or onboarding logistics, choose hr.
    - If the user asks how to perform a role-specific or technical task, choose role-based.
    - If the user asks to explain, teach, simplify, or create a learning path, choose trainer.
    - If unsure, choose trainer.

    Return ONLY one value:
    hr
    role-based
    trainer

    Do not explain your reasoning.
    `,
  ],
  ["human", "User request:\n{input}"],
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
