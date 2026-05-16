import { fetchFolders } from "@/lib/data/knowledge";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ unique_id: string }> },
) {
  try {
    const { unique_id } = await context.params;
    const data = await fetchFolders(unique_id);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch folder:", error);
    return NextResponse.json(
      { message: "Failed to fetch folder." },
      { status: 500 },
    );
  }
}
