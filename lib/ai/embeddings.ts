import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

export const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
});

export const vectorStore = new MemoryVectorStore(embeddings);
export const retriever = vectorStore.asRetriever();

export function chunkText(text: string) {
  return text.match(/.{1,1000}/g) || [];
}

export async function embed(text: string) {
  const res = await fetch("https://api-inference.huggingface.co/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
    },
    body: JSON.stringify({ inputs: text }),
  });

  return await res.json();
}
