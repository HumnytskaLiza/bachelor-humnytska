import { roleBasedAgent } from "../role-based";
import { hrAgent } from "../hr";
import { trainerAgent } from "../trainer";
import evaluateQuery from "./evaluation-query";
import routeQuery from "./route-query";
import { UIMessage } from "ai";

export async function coordinatorAgent(input: string, messages: UIMessage[]) {
  const route = await routeQuery(input);

  let agentOutput;

  const chatHistory = messages
    .map((m) => {
      const text = m.parts
        .filter((p) => p.type === "text")
        .map((p) => p.text)
        .join("");

      return `${m.role}: ${text}`;
    })
    .join("\n");

  if (route === "trainer") {
    agentOutput = await trainerAgent(input, chatHistory);
  } else if (route === "hr") {
    agentOutput = await hrAgent(input, chatHistory);
  } else if (route === "role-based") {
    agentOutput = await roleBasedAgent(input, chatHistory);
  } else {
    throw new Error(`Unknown route: ${route}`);
  }

  const evaluation = await evaluateQuery(input, agentOutput.text);
  const evaluationInput =
    input +
    "\nImprove clarity, add missing details: " +
    evaluation.missing.join(", ");

  if (evaluation.needs_retry && evaluation.score < 0.7) {
    let improved;

    if (route === "trainer") {
      improved = await trainerAgent(evaluationInput, chatHistory);
    } else if (route === "hr") {
      improved = await hrAgent(evaluationInput, chatHistory);
    } else if (route === "role-based") {
      improved = await roleBasedAgent(evaluationInput, chatHistory);
    } else {
      throw new Error(`Unknown route: ${route}`);
    }

    return improved.result;
  }

  return agentOutput.result;
}
