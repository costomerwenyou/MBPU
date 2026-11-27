import { NextRequest, NextResponse } from "next/server";
import { getDbPool } from "@/lib/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");

  // 1. Direct Supabase Database Query (instant, reliable, no Render 503)
  try {
    const pool = getDbPool();
    let query = 'SELECT id, url, type, category, description, "createdAt" FROM "GalleryItem"';
    const params: string[] = [];

    if (category && category !== "All") {
      query += ' WHERE category = $1';
      params.push(category);
    }

    query += ' ORDER BY "createdAt" DESC';

    const res = await pool.query(query, params);
    if (res.rows && res.rows.length > 0) {
      return NextResponse.json(res.rows, {
        headers: {
          "Cache-Control": "public, max-age=15, stale-while-revalidate=60",
        },
      });
    }
  } catch (dbErr) {
    console.warn("Direct DB gallery fetch failed, checking backend fallback:", dbErr);
  }

  // 2. Fallback to backend URL
  const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://mbpu.onrender.com";
  const search = request.nextUrl.search;

  if (backendUrl) {
    try {
      const res = await fetch(`${backendUrl}/api/gallery${search}`, {
        next: { revalidate: 15 },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return NextResponse.json(data);
        }
      }
    } catch {
      // Fallback below
    }
  }

  // Fallback empty list so gallery gracefully falls back to default images without 404
  return NextResponse.json([]);
}
