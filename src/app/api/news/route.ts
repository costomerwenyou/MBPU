import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const news = await db.news.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(news);
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
