import { NextResponse } from "next/server";
import { getDbPool } from "@/lib/db";

export async function GET() {
  // 1. Direct Supabase Database Query (instant, reliable, no Render 503)
  try {
    const pool = getDbPool();
    const res = await pool.query('SELECT id, name, photo, score, "createdAt" FROM "Result" ORDER BY "createdAt" DESC');
    if (res.rows && res.rows.length > 0) {
      return NextResponse.json(res.rows, {
        headers: {
          "Cache-Control": "public, max-age=15, stale-while-revalidate=60",
        },
      });
    }
  } catch (dbErr) {
    console.warn("Direct DB results fetch warning:", dbErr);
  }

  // 2. Fallback to backend URL
  const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://mbpu.onrender.com";
  if (backendUrl) {
    try {
      const res = await fetch(`${backendUrl}/api/results`, {
        next: { revalidate: 15 },
      });
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }
    } catch {
      // Fallback below
    }
  }

  // Fallback empty list so pages smoothly fallback to default toppers without 404
  return NextResponse.json([]);
}
