import { embedMany, embed } from "ai";
import { supabase } from "../supabase";

const embeddingModel = "openai/text-embedding-ada-002";

export type RetrievalResult = {
  content: string;
  file_id: string;
  file_name?: string;
  similarity?: number;
};

const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split(".")
    .filter((i) => i !== "");
};

export const generateEmbeddings = async (
  value: string,
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = generateChunks(value);
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });
  return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll("\\n", " ");
  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });
  return embedding;
};

export const findRelevantContent = async (
  userQuery: string,
): Promise<RetrievalResult[]> => {
  const userQueryEmbedded = await generateEmbedding(userQuery);

  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: userQueryEmbedded,
    match_threshold: 0.8,
    match_count: 3,
  });

  if (error) {
    console.error(error);
    throw new Error("Failed to find similar content: ", error);
  }

  return data;
};
