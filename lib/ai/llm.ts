import { HuggingFaceInference } from "@langchain/community/llms/hf";

export const llm = new HuggingFaceInference({
  model: "HuggingFaceH4/zephyr-7b-beta",
  apiKey: process.env.HUGGINGFACE_API_KEY,
});
