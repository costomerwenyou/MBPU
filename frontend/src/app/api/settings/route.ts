import { NextResponse } from "next/server";
import { getDbPool } from "@/lib/db";

export async function GET() {
  // 1. Direct Supabase Database Query
  try {
    const pool = getDbPool();
    const res = await pool.query('SELECT key, value FROM "Setting"');
    if (res.rows) {
      const settingsMap: Record<string, string> = {};
      for (const row of res.rows) {
        settingsMap[row.key] = row.value;
      }
      return NextResponse.json({
        isAdmissionOpen: settingsMap["is_admission_open"] === "true",
      }, {
        headers: {
          "Cache-Control": "public, max-age=15, stale-while-revalidate=60",
        },
      });
    }
  } catch (dbErr) {
    console.warn("Direct DB settings fetch warning:", dbErr);
  }

  // 2. Fallback to backend URL
  const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://mbpu.onrender.com";
  if (backendUrl) {
    try {
      const res = await fetch(`${backendUrl}/api/settings`, {
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

  // Graceful fallback for production when backend server is offline or not configured
  return NextResponse.json({ isAdmissionOpen: false });
}
