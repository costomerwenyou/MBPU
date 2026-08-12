import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const results = await db.result.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(results);
  } catch (error) {
    console.error("Failed to fetch results:", error);
    return NextResponse.json([], { status: 200 });
  }
}
