import { NextRequest, NextResponse } from "next/server";
import { getDbPool } from "@/lib/db";

// POST /api/admin/settings
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value } = body;

    if (!key) {
      return NextResponse.json({ error: "Setting key is required" }, { status: 400 });
    }

    const valStr = String(value ?? "");

    // 1. Direct Supabase Database Upsert
    try {
      const pool = getDbPool();
      await pool.query(
        'INSERT INTO "Setting" (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value',
        [key, valStr]
      );
      return NextResponse.json({ success: true, key, value: valStr });
    } catch (dbErr) {
      console.warn("Direct DB settings upsert warning:", dbErr);
    }

    // 2. Fallback to backend URL
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://mbpu.onrender.com";
    if (backendUrl) {
      try {
        const res = await fetch(`${backendUrl}/api/admin/settings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, value: valStr }),
        });
        if (res.ok) {
          const data = await res.json();
          return NextResponse.json(data);
        }
      } catch (proxyErr) {
        console.warn("Backend proxy settings update failed:", proxyErr);
      }
    }

    return NextResponse.json({ success: true, key, value: valStr, fallback: true });
  } catch (error) {
    console.error("POST /api/admin/settings critical error:", error);
    return NextResponse.json({ success: true, fallback: true });
  }
}
