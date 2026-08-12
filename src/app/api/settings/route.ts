import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const setting = await db.setting.findUnique({
      where: { key: "is_admission_open" },
    });
    return NextResponse.json({
      isAdmissionOpen: setting?.value === "true",
    });
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json({ isAdmissionOpen: false }, { status: 200 });
  }
}
