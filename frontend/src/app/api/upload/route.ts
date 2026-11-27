import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File | null;

    const allFiles = files.length > 0 ? files : singleFile ? [singleFile] : [];

    if (allFiles.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public/uploads");
    const uploadedUrls: string[] = [];

    try {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      for (const file of allFiles) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}-${cleanName}`;
        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, buffer);
        uploadedUrls.push(`/uploads/${filename}`);
      }

      return NextResponse.json({
        success: true,
        url: uploadedUrls[0],
        urls: uploadedUrls,
      });
    } catch (fsErr) {
      console.warn("Local filesystem write failed, using data URI fallback:", fsErr);

      for (const file of allFiles) {
        const bytes = await file.arrayBuffer();
        const base64 = Buffer.from(bytes).toString("base64");
        const mimeType = file.type || "image/jpeg";
        uploadedUrls.push(`data:${mimeType};base64,${base64}`);
      }

      return NextResponse.json({
        success: true,
        url: uploadedUrls[0],
        urls: uploadedUrls,
      });
    }
  } catch (error) {
    console.error("Upload error in /api/upload:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
