import { fetchJourneys, createJourney } from "@/lib/data";
import { NextResponse } from "next/server";
import { JobPositions, Levels } from "@/lib/types";
import { z } from "zod";

const schema = z.object({
  unique_id: z.string(),
  name: z.string().min(1),
  role: z.enum(JobPositions),
  level: z.enum(Levels),
  color_hex: z.string(),
  start_date: z.date(),
});

export async function GET() {
  try {
    const data = await fetchJourneys();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `Failed to fetch journeys: ${error}` },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { unique_id, name, role, level, color_hex, start_date } = parsed.data;

    await createJourney(unique_id, name, role, level, color_hex, start_date);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to create a journey.", error);
    return NextResponse.json({ status: 500 });
  }
}
