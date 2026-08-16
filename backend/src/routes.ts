import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import fs from "fs";
import { db } from "./lib/db";

const router = Router();

// Fast in-memory cache
const memoryCache: Record<string, { data: any; expiry: number }> = {};

function getCached(key: string) {
  const cached = memoryCache[key];
  if (cached && Date.now() < cached.expiry) {
    return cached.data;
  }
  return null;
}

function setCache(key: string, data: any, ttlSeconds: number = 15) {
  memoryCache[key] = {
    data,
    expiry: Date.now() + ttlSeconds * 1000,
  };
}

function clearCache(pattern?: string) {
  if (!pattern) {
    Object.keys(memoryCache).forEach((k) => delete memoryCache[k]);
    return;
  }
  Object.keys(memoryCache).forEach((k) => {
    if (k.includes(pattern)) delete memoryCache[k];
  });
}

// Multer storage configuration for uploads
const uploadDir = path.join(__dirname, "../../frontend/public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

interface UploadedFile {
  originalname: string;
  filename: string;
}

const storage = multer.diskStorage({
  destination: (_req: Request, _file: UploadedFile, cb: (error: Error | null, destination: string) => void) => {
    cb(null, uploadDir);
  },
  filename: (_req: Request, file: UploadedFile, cb: (error: Error | null, filename: string) => void) => {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}-${cleanName}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// --- GALLERY ---
router.get("/gallery", async (req: Request, res: Response) => {
  try {
    const category = (req.query.category as string) || "All";
    const cacheKey = `gallery_${category}`;
    const cached = getCached(cacheKey);
    if (cached) {
      res.setHeader("Cache-Control", "public, max-age=10, stale-while-revalidate=30");
      res.json(cached);
      return;
    }

    const where = category !== "All" ? { category } : {};
    const items = await db.galleryItem.findMany({ where, orderBy: { createdAt: "desc" } });
    setCache(cacheKey, items, 15);
    res.setHeader("Cache-Control", "public, max-age=10, stale-while-revalidate=30");
    res.json(items);
  } catch (error) {
    console.error("Gallery fetch error:", error);
    res.status(200).json([]);
  }
});

// --- INQUIRIES ---
router.get("/inquiries", async (_req: Request, res: Response) => {
  try {
    const cacheKey = "inquiries_all";
    const cached = getCached(cacheKey);
    if (cached) {
      res.json(cached);
      return;
    }
    const inquiries = await db.inquiry.findMany({ orderBy: { createdAt: "desc" } });
    setCache(cacheKey, inquiries, 10);
    res.json(inquiries);
  } catch (error) {
    console.error("Inquiries fetch error:", error);
    res.status(200).json([]);
  }
});

router.post("/inquiries", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, course, message } = req.body;
    if (!name || !email || !phone || !course) {
      res.status(400).json({ error: "Name, email, phone, and course are required fields" });
      return;
    }
    const inquiry = await db.inquiry.create({
      data: { name, email, phone, course, message: message || "" },
    });
    clearCache("inquiries");
    res.json({ success: true, inquiry });
  } catch (error) {
    console.error("Inquiry creation error:", error);
    res.status(500).json({ error: "Failed to submit inquiry" });
  }
});

// --- NEWS ---
router.get("/news", async (_req: Request, res: Response) => {
  try {
    const cacheKey = "news_all";
    const cached = getCached(cacheKey);
    if (cached) {
      res.setHeader("Cache-Control", "public, max-age=10, stale-while-revalidate=30");
      res.json(cached);
      return;
    }
    const news = await db.news.findMany({ orderBy: { createdAt: "desc" } });
    setCache(cacheKey, news, 15);
    res.setHeader("Cache-Control", "public, max-age=10, stale-while-revalidate=30");
    res.json(news);
  } catch (error) {
    console.error("News fetch error:", error);
    res.status(200).json([]);
  }
});

// --- RESULTS ---
router.get("/results", async (_req: Request, res: Response) => {
  try {
    const cacheKey = "results_all";
    const cached = getCached(cacheKey);
    if (cached) {
      res.setHeader("Cache-Control", "public, max-age=10, stale-while-revalidate=30");
      res.json(cached);
      return;
    }
    const results = await db.result.findMany({ orderBy: { createdAt: "desc" } });
    setCache(cacheKey, results, 15);
    res.setHeader("Cache-Control", "public, max-age=10, stale-while-revalidate=30");
    res.json(results);
  } catch (error) {
    console.error("Results fetch error:", error);
    res.status(200).json([]);
  }
});

// --- SETTINGS ---
router.get("/settings", async (_req: Request, res: Response) => {
  try {
    const cacheKey = "settings_all";
    const cached = getCached(cacheKey);
    if (cached) {
      res.setHeader("Cache-Control", "public, max-age=10, stale-while-revalidate=30");
      res.json(cached);
      return;
    }
    const setting = await db.setting.findUnique({ where: { key: "is_admission_open" } });
    const payload = { isAdmissionOpen: setting?.value === "true" };
    setCache(cacheKey, payload, 15);
    res.setHeader("Cache-Control", "public, max-age=10, stale-while-revalidate=30");
    res.json(payload);
  } catch (error) {
    console.error("Settings fetch error:", error);
    res.status(200).json({ isAdmissionOpen: false });
  }
});

// --- UPLOAD ---
router.post("/upload", upload.array("files"), (req: Request, res: Response) => {
  try {
    const files = req.files as UploadedFile[] | undefined;
    if (!files || files.length === 0) {
      res.status(400).json({ error: "No file provided" });
      return;
    }
    const uploadedUrls = files.map((file) => `/uploads/${file.filename}`);
    res.json({ success: true, url: uploadedUrls[0], urls: uploadedUrls });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "File upload failed" });
  }
});

// --- ADMIN ROUTES ---
router.post("/admin/verify-credentials", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: "Missing credentials" });
      return;
    }
    const user = await db.user.findUnique({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    res.json({ id: user.id, name: user.username });
  } catch (error) {
    console.error("Verify credentials error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/admin/gallery", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (Array.isArray(body.items)) {
      const validItems = body.items.filter(
        (item: { url?: string; type?: string; category?: string }) => item.url && item.type && item.category
      );
      if (validItems.length === 0) {
        res.status(400).json({ error: "No valid items provided" });
        return;
      }
      await db.galleryItem.createMany({ data: validItems });
      const createdItems = await db.galleryItem.findMany({ orderBy: { createdAt: "desc" }, take: validItems.length });
      clearCache("gallery");
      res.json({ success: true, galleryItems: createdItems });
      return;
    }
    const { url, type, category } = body;
    if (!url || !type || !category) {
      res.status(400).json({ error: "URL, type, and category are required" });
      return;
    }
    const galleryItem = await db.galleryItem.create({ data: { url, type, category } });
    clearCache("gallery");
    res.json({ success: true, galleryItem });
  } catch (error) {
    console.error("Create gallery item error:", error);
    res.status(500).json({ error: "Failed to create gallery item" });
  }
});

router.delete("/admin/gallery", async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    if (!id) {
      res.status(400).json({ error: "Gallery Item ID required" });
      return;
    }
    await db.galleryItem.delete({ where: { id } });
    clearCache("gallery");
    res.json({ success: true });
  } catch (error) {
    console.error("Delete gallery item error:", error);
    res.status(500).json({ error: "Failed to delete gallery item" });
  }
});

router.post("/admin/news", async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: "News text required" });
      return;
    }
    const newsItem = await db.news.create({ data: { text } });
    clearCache("news");
    res.json({ success: true, newsItem });
  } catch (error) {
    console.error("Create news error:", error);
    res.status(500).json({ error: "Failed to create news" });
  }
});

router.delete("/admin/news", async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    if (!id) {
      res.status(400).json({ error: "News ID required" });
      return;
    }
    await db.news.delete({ where: { id } });
    clearCache("news");
    res.json({ success: true });
  } catch (error) {
    console.error("Delete news error:", error);
    res.status(500).json({ error: "Failed to delete news" });
  }
});

router.post("/admin/results", async (req: Request, res: Response) => {
  try {
    const { name, photo, score } = req.body;
    if (!name || !photo || !score) {
      res.status(400).json({ error: "Name, photo, and score required" });
      return;
    }
    const topperItem = await db.result.create({ data: { name, photo, score } });
    clearCache("results");
    res.json({ success: true, topperItem });
  } catch (error) {
    console.error("Create result error:", error);
    res.status(500).json({ error: "Failed to create result" });
  }
});

router.delete("/admin/results", async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    if (!id) {
      res.status(400).json({ error: "Result ID required" });
      return;
    }
    await db.result.delete({ where: { id } });
    clearCache("results");
    res.json({ success: true });
  } catch (error) {
    console.error("Delete result error:", error);
    res.status(500).json({ error: "Failed to delete result" });
  }
});

router.post("/admin/settings", async (req: Request, res: Response) => {
  try {
    const { key, value } = req.body;
    if (!key || value === undefined) {
      res.status(400).json({ error: "Key and value required" });
      return;
    }
    const updatedSetting = await db.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    clearCache("settings");
    res.json({ success: true, setting: updatedSetting });
  } catch (error) {
    console.error("Update setting error:", error);
    res.status(500).json({ error: "Failed to update setting" });
  }
});

export default router;
