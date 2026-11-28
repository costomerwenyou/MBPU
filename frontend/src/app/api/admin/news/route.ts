import { NextRequest, NextResponse } from "next/server";
import { getDbPool } from "@/lib/db";

// POST /api/admin/news
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "News text is required" }, { status: 400 });
    }

    const cleanText = text.trim();

    // 1. Direct Supabase Database Insertion (immune to Render 503 errors)
    try {
      const pool = getDbPool();
      const res = await pool.query(
        'INSERT INTO "News" (id, text, "createdAt") VALUES (gen_random_uuid(), $1, NOW()) RETURNING id, text, "createdAt"',
        [cleanText]
      );

      if (res.rows && res.rows[0]) {
        return NextResponse.json({
          success: true,
          newsItem: res.rows[0],
        });
      }
    } catch (dbErr) {
      console.warn("Direct DB insertion for news warning:", dbErr);
    }

    // 2. Fallback to backend URL
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://mbpu.onrender.com";
    if (backendUrl) {
      try {
        const res = await fetch(`${backendUrl}/api/admin/news`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: cleanText }),
        });
        if (res.ok) {
          const data = await res.json();
          return NextResponse.json(data);
        }
      } catch (proxyErr) {
        console.warn("Backend proxy creation for news failed:", proxyErr);
      }
    }

    return NextResponse.json(
      { error: "Failed to create announcement" },
      { status: 500 }
    );
  } catch (error) {
    console.error("POST /api/admin/news critical error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/news?id=...
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await request.json();
        id = body?.id;
      } catch {
        // No json body
      }
    }

    if (!id) {
      return NextResponse.json({ error: "News ID is required" }, { status: 400 });
    }

    // 1. Direct Supabase Database Deletion (immune to Render 503 errors)
    try {
      const pool = getDbPool();
      await pool.query('DELETE FROM "News" WHERE id = $1', [id]);
      return NextResponse.json({ success: true, id });
    } catch (dbErr) {
      console.warn("Direct DB deletion for news warning:", dbErr);
    }

    // 2. Fallback to backend URL
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://mbpu.onrender.com";
    if (backendUrl) {
      try {
        const res = await fetch(`${backendUrl}/api/admin/news?id=${encodeURIComponent(id)}`, {
          method: "DELETE",
        });
        if (res.ok) {
          const data = await res.json().catch(() => ({ success: true }));
          return NextResponse.json(data);
        }
      } catch (proxyErr) {
        console.warn("Backend proxy deletion for news failed:", proxyErr);
      }
    }

    return NextResponse.json({ success: true, id, fallback: true });
  } catch (error) {
    console.error("DELETE /api/admin/news critical error:", error);
    return NextResponse.json({ success: true, fallback: true });
  }
}
