import { fetchFolders, createFolder } from "@/lib/data";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  unique_id: z.string(),
  name: z.string().min(1),
  color_hex: z.string(),
  parent_id: z.string().nullable(),
});

export async function GET() {
  try {
    const data = await fetchFolders("");
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch folders." },
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

    const { unique_id, name, color_hex, parent_id } = parsed.data;

    await createFolder(unique_id, name, color_hex, parent_id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to create a folder.", error);
    return NextResponse.json(
      { message: `Failed to create a folder: ${error}` },
      { status: 500 },
    );
  }
}
