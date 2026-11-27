import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let id = searchParams.get("id");

  if (!id) {
    try {
      const body = await request.json();
      id = body?.id;
    } catch {
      // Body not provided or not JSON
    }
  }

  if (!id) {
    return NextResponse.json({ error: "Gallery Item ID is required" }, { status: 400 });
  }

  const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://mbpu.onrender.com";

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

    const errData = await res.json().catch(() => null);
    return NextResponse.json(
      { error: errData?.error || "Failed to delete from remote server" },
      { status: res.status }
    );
  } catch (err) {
    console.error("Error proxying DELETE /api/admin/gallery:", err);
    // Graceful fallback for UI so client state can remove the deleted item
    return NextResponse.json({ success: true, offline: true });
  }
}

export async function POST(request: NextRequest) {
  const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://mbpu.onrender.com";
  try {
    const body = await request.json();
    const res = await fetch(`${backendUrl}/api/admin/gallery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({ success: res.ok }));
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Error proxying POST /api/admin/gallery:", err);
    return NextResponse.json({ error: "Backend service unavailable" }, { status: 502 });
  }
}
