import { fetchJourneyUsers } from "@/lib/data";
import { NextResponse } from "next/server";
import { z } from "zod";

// const schema = z.object({
//   unique_id: z.string(),
//   name: z.string().min(1),
//   role: z.enum(JobPositions),
//   level: z.enum(Levels),
//   color_hex: z.string(),
//   start_date: z.date(),
// });

export async function GET(
  request: Request,
  context: { params: Promise<{ unique_id: string }> },
) {
  try {
    const { unique_id } = await context.params;
    const data = await fetchJourneyUsers(unique_id);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `Failed to fetch journey tasks: ${error}` },
      { status: 500 },
    );
  }
}
