import { NextResponse } from "next/server";

export async function GET() {
  const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://mbpu.onrender.com";
  if (backendUrl) {
    try {
      const res = await fetch(`${backendUrl}/api/news`, {
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

  // Fallback empty list so public site gracefully displays without 404 console errors
  return NextResponse.json([]);
}
