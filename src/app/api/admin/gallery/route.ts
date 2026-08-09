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
    const body = await request.json();

    if (Array.isArray(body.items)) {
      const validItems = body.items.filter(
        (item: { url?: string; type?: string; category?: string }) =>
          item.url && item.type && item.category
      );

      if (validItems.length === 0) {
        return NextResponse.json({ error: "No valid items provided" }, { status: 400 });
      }

      await db.galleryItem.createMany({
        data: validItems,
      });

      const createdItems = await db.galleryItem.findMany({
        orderBy: { createdAt: "desc" },
        take: validItems.length,
      });

      return NextResponse.json({ success: true, galleryItems: createdItems });
    }

    const { url, type, category } = body;
    if (!url || !type || !category) {
      return NextResponse.json(
        { error: "URL, type, and category are required fields" },
        { status: 400 }
      );
    }

    const galleryItem = await db.galleryItem.create({
      data: { url, type, category },
    });

    return NextResponse.json({ success: true, galleryItem });
  } catch (error) {
    console.error("Failed to create gallery item:", error);
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 });
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
      return NextResponse.json({ error: "Gallery Item ID is required" }, { status: 400 });
    }

    await db.galleryItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete gallery item:", error);
    return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 });
  }
}
