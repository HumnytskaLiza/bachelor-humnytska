import hrAgent from "../agents/hr";
import roleBasedAgent from "../agents/role-based";
import trainerAgent from "../agents/trainer";
import coordinatorAgent from "../agents/coordinator";

export async function runAgentSystem(input: string) {
  const decision = await coordinatorAgent(input);

  let context = "";

  // STEP 1: research if needed
  if (decision.route.includes("research")) {
    context = await hrAgent(input);
  }

  // STEP 2: write answer
  let output = await roleBasedAgent(input);

  // STEP 3: optional critique
  if (decision.route.includes("critique")) {
    const critique = await trainerAgent(output, context);

    if (critique !== "approved") {
      output = critique;
    }
  }

  return {
    route: decision.route,
    reasoning: decision.reason,
    output,
  };
}
