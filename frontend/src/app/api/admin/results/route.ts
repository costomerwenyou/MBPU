import { NextRequest, NextResponse } from "next/server";
import { getDbPool } from "@/lib/db";

// POST /api/admin/results
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, score, photo } = body;

    if (!name || !score) {
      return NextResponse.json({ error: "Student name and score are required" }, { status: 400 });
    }

    // 1. Direct Supabase Database Insertion
    try {
      const pool = getDbPool();
      const res = await pool.query(
        'INSERT INTO "Result" (id, name, photo, score, "createdAt") VALUES (gen_random_uuid(), $1, $2, $3, NOW()) RETURNING id, name, photo, score, "createdAt"',
        [name, photo || "", score]
      );
      if (res.rows && res.rows[0]) {
        return NextResponse.json({ success: true, topperItem: res.rows[0] });
      }
    } catch (dbErr) {
      console.warn("Direct DB result insertion warning:", dbErr);
    }

    // 2. Fallback to backend URL
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://mbpu.onrender.com";
    if (backendUrl) {
      try {
        const res = await fetch(`${backendUrl}/api/admin/results`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (res.ok) {
          const data = await res.json();
          return NextResponse.json(data);
        }
      } catch (proxyErr) {
        console.warn("Backend proxy result insertion failed:", proxyErr);
      }
    }

    return NextResponse.json({ error: "Failed to create result" }, { status: 500 });
  } catch (error) {
    console.error("POST /api/admin/results critical error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/admin/results?id=...
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
      return NextResponse.json({ error: "Result ID is required" }, { status: 400 });
    }

    // 1. Direct Supabase Database Deletion
    try {
      const pool = getDbPool();
      await pool.query('DELETE FROM "Result" WHERE id = $1', [id]);
      return NextResponse.json({ success: true, id });
    } catch (dbErr) {
      console.warn("Direct DB result deletion warning:", dbErr);
    }

    // 2. Fallback to backend URL
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://mbpu.onrender.com";
    if (backendUrl) {
      try {
        const res = await fetch(`${backendUrl}/api/admin/results?id=${encodeURIComponent(id)}`, {
          method: "DELETE",
        });
        if (res.ok) {
          const data = await res.json().catch(() => ({ success: true }));
          return NextResponse.json(data);
        }
      } catch (proxyErr) {
        console.warn("Backend proxy result deletion failed:", proxyErr);
      }
    }

    return NextResponse.json({ success: true, id, fallback: true });
  } catch (error) {
    console.error("DELETE /api/admin/results critical error:", error);
    return NextResponse.json({ success: true, fallback: true });
  }
}
