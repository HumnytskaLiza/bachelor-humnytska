import { embedMany, embed } from "ai";
import { createClient } from "@/lib/supabase/client";

const embeddingModel = "openai/text-embedding-ada-002";

export type RetrievalResult = {
  content: string;
  file_id: string;
  file_name?: string;
  similarity?: number;
};

const generateChunks = (
  text: string,
  chunkSize = 800,
  overlap = 150,
): string[] => {
  const chunks: string[] = [];

  let start = 0;

  while (start < text.length) {
    const end = start + chunkSize;

    chunks.push(text.slice(start, end).trim());

    start += chunkSize - overlap;
  }

  return chunks.filter(Boolean);
};

const supabase = createClient();

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
    match_count: 5,
  });

  console.log(data);

  if (error) {
    console.error(error);
    throw new Error("Failed to find similar content: ", error);
  }

  return data;
};
