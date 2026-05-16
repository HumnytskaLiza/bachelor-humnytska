import { fetchJourneyTasks } from "@/lib/data/journey";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ unique_id: string }> },
) {
  try {
    const { unique_id } = await context.params;
    const data = await fetchJourneyTasks(unique_id);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `Failed to fetch journey tasks: ${error}` },
      { status: 500 },
    );
  }
}
