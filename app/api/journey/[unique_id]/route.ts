import { fetchJourneyById } from "@/lib/data/journey";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ unique_id: string }> },
) {
  try {
    const { unique_id } = await context.params;
    const data = await fetchJourneyById(unique_id);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `Failed to fetch journey by id: ${error}` },
      { status: 500 },
    );
  }
}
