import { fetchUsersWithoutJourney } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await fetchUsersWithoutJourney();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users." },
      { status: 500 },
    );
  }
}
