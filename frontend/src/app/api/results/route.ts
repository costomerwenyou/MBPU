import { NextResponse } from "next/server";

export async function GET() {
  const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;
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
