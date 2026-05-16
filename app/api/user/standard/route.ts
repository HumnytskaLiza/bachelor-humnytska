import { fetchStandardUsers, createStandardUser } from "@/lib/data/user";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  unique_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
  job_position: z.enum([
    "Developer",
    "Designer",
    "HR",
    "QA",
    "Project Manager",
  ]),
  level: z.enum(["Trainee", "Junior", "Middle", "Senior"]),
});

export async function GET() {
  try {
    const data = await fetchStandardUsers();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users." },
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

    const { unique_id, first_name, last_name, email, job_position, level } =
      parsed.data;

    await createStandardUser(
      unique_id,
      first_name,
      last_name,
      email,
      job_position,
      level,
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to create a folder.", error);
    return NextResponse.json(
      { message: "Failed to create a folder." },
      { status: 500 },
    );
  }
}
