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
    const { name, photo, score } = await request.json();
    if (!name || !photo || !score) {
      return NextResponse.json(
        { error: "Name, photo, and score are required" },
        { status: 400 }
      );
    }

    const topperItem = await db.result.create({
      data: { name, photo, score },
    });

    return NextResponse.json({ success: true, topperItem });
  } catch (error) {
    console.error("Failed to create result:", error);
    return NextResponse.json({ error: "Failed to create result" }, { status: 500 });
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
      return NextResponse.json({ error: "Result ID is required" }, { status: 400 });
    }

    await db.result.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete result:", error);
    return NextResponse.json({ error: "Failed to delete result" }, { status: 500 });
  }
}
