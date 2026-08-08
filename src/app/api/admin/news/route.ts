import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({ error: "News text is required" }, { status: 400 });
    }

    const newsItem = await db.news.create({
      data: { text },
    });

    return NextResponse.json({ success: true, newsItem });
  } catch (error) {
    console.error("Failed to create news:", error);
    return NextResponse.json({ error: "Failed to create news" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "News ID is required" }, { status: 400 });
    }

    await db.news.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete news:", error);
    return NextResponse.json({ error: "Failed to delete news" }, { status: 500 });
  }
}
