import { ChatOpenAI } from "@langchain/openai";
import { retriever } from "./vector";

const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
});

export async function ragAnswer(query: string) {
  const docs = await retriever.getRelevantDocuments(query);

  const context = docs.map((d) => d.pageContent).join("\n");

  return llm.invoke(`
Answer using context:

${context}

Question: ${query}
`);
}
