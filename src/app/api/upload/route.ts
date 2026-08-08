import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save in public/uploads/
    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    // Clean filename
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${Date.now()}-${cleanName}`;
    const filePath = join(uploadDir, filename);

    await writeFile(filePath, buffer);

    const publicPath = `/uploads/${filename}`;
    return NextResponse.json({ success: true, url: publicPath });
  } catch (error) {
    console.error("Local file upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
