import { NextResponse } from "next/server";

export async function GET() {
  const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;
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
