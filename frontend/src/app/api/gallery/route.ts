import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://mbpu.onrender.com";
  const search = request.nextUrl.search;

  if (backendUrl) {
    try {
      const res = await fetch(`${backendUrl}/api/gallery${search}`, {
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

  // Fallback empty list so gallery gracefully falls back to default images without 404
  return NextResponse.json([]);
}
