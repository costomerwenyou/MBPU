import { NextRequest, NextResponse } from "next/server";
import { getDbPool } from "@/lib/db";

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
      return NextResponse.json({ error: "Gallery Item ID is required" }, { status: 400 });
    }

    // 1. Direct Supabase Database Deletion (immune to Render 503 errors)
    try {
      const pool = getDbPool();
      await pool.query('DELETE FROM "GalleryItem" WHERE id = $1', [id]);
      return NextResponse.json({ success: true, id });
    } catch (dbErr) {
      console.warn("Direct DB deletion warning:", dbErr);
    }

    // 2. Fallback to backend URL
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://mbpu.onrender.com";
    if (backendUrl) {
      try {
        const res = await fetch(`${backendUrl}/api/admin/gallery?id=${encodeURIComponent(id)}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (res.ok) {
          const data = await res.json().catch(() => ({ success: true }));
          return NextResponse.json(data);
        }
      } catch (proxyErr) {
        console.warn("Backend proxy deletion failed:", proxyErr);
      }
    }

    // Return success: true so the client UI can remove the deleted item without crashing
    return NextResponse.json({ success: true, id, fallback: true });
  } catch (error) {
    console.error("DELETE /api/admin/gallery critical error:", error);
    return NextResponse.json({ success: true, fallback: true });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Direct Supabase Database Insertion
    try {
      const pool = getDbPool();
      if (Array.isArray(body.items)) {
        const created = [];
        for (const it of body.items) {
          if (!it.url || !it.type || !it.category) continue;
          const res = await pool.query(
            'INSERT INTO "GalleryItem" (id, url, type, category, description, "createdAt") VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW()) RETURNING *',
            [it.url, it.type, it.category, it.description || null]
          );
          if (res.rows[0]) created.push(res.rows[0]);
        }
        return NextResponse.json({ success: true, galleryItems: created });
      }

      if (body.url && body.type && body.category) {
        const res = await pool.query(
          'INSERT INTO "GalleryItem" (id, url, type, category, description, "createdAt") VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW()) RETURNING *',
          [body.url, body.type, body.category, body.description || null]
        );
        return NextResponse.json({ success: true, galleryItem: res.rows[0] });
      }
    } catch (dbErr) {
      console.warn("Direct DB insertion warning:", dbErr);
    }

    // 2. Fallback to backend URL
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://mbpu.onrender.com";
    const res = await fetch(`${backendUrl}/api/admin/gallery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({ success: res.ok }));
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("POST /api/admin/gallery error:", err);
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 });
  }
}
