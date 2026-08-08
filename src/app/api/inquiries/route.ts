import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, course, message } = body;

    if (!name || !email || !phone || !course) {
      return NextResponse.json(
        { error: "Name, email, phone, and course are required fields" },
        { status: 400 }
      );
    }

    const inquiry = await db.inquiry.create({
      data: {
        name,
        email,
        phone,
        course,
        message: message || "",
      },
    });

    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    console.error("Failed to submit inquiry:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
