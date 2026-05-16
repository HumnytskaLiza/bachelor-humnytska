import { fetchUserAssignments } from "@/lib/data/journey";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ unique_id: string }> },
) {
  try {
    const { unique_id } = await context.params;

    const data = await fetchUserAssignments(unique_id);

    if (!data) {
      return NextResponse.json(
        { message: "No journey assigned." },
        { status: 404 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch user assignments:", error);

    return NextResponse.json(
      { message: "Failed to fetch assignments." },
      { status: 500 },
    );
  }
}
