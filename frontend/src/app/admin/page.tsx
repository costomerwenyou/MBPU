import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboardClient from "@/components/AdminDashboardClient";
import { getDbPool } from "@/lib/db";

export const dynamic = "force-dynamic";

async function fetchApi(endpoint: string) {
  try {
    const baseUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://mbpu.onrender.com";
    const res = await fetch(`${baseUrl}${endpoint}`, { next: { revalidate: 10 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    return null;
  }
}

export default async function AdminPage() {
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Session check warning in /admin:", error);
  }

  if (!session) {
    redirect("/admin/login");
  }

  let news: any[] = [];
  let results: any[] = [];
  let gallery: any[] = [];
  let inquiries: any[] = [];
  const settingsMap: Record<string, string> = { is_admission_open: "false" };

  // 1. Direct Supabase Query (instant & immune to Render 503)
  let loadedFromDb = false;
  try {
    const pool = getDbPool();
    const [newsRes, resultsRes, galleryRes, inquiriesRes, settingsRes] = await Promise.all([
      pool.query('SELECT id, text, "createdAt" FROM "News" ORDER BY "createdAt" DESC'),
      pool.query('SELECT id, name, photo, score, "createdAt" FROM "Result" ORDER BY "createdAt" DESC'),
      pool.query('SELECT id, url, type, category, description, "createdAt" FROM "GalleryItem" ORDER BY "createdAt" DESC'),
      pool.query('SELECT id, name, email, phone, course, message, "createdAt" FROM "Inquiry" ORDER BY "createdAt" DESC'),
      pool.query('SELECT key, value FROM "Setting"'),
    ]);

    news = newsRes.rows || [];
    results = resultsRes.rows || [];
    gallery = galleryRes.rows || [];
    inquiries = inquiriesRes.rows || [];
    if (settingsRes.rows) {
      for (const row of settingsRes.rows) {
        settingsMap[row.key] = row.value;
      }
    }
    loadedFromDb = true;
  } catch (dbErr) {
    console.warn("Direct DB fetch in /admin warning, falling back to HTTP proxy:", dbErr);
  }

  // 2. HTTP Fallback if DB was unavailable
  if (!loadedFromDb) {
    const [newsApi, resultsApi, galleryApi, inquiriesApi, settingsData] = await Promise.all([
      fetchApi("/api/news"),
      fetchApi("/api/results"),
      fetchApi("/api/gallery"),
      fetchApi("/api/inquiries"),
      fetchApi("/api/settings"),
    ]);

    news = newsApi || [];
    results = resultsApi || [];
    gallery = galleryApi || [];
    inquiries = inquiriesApi || [];
    settingsMap.is_admission_open = String(settingsData?.isAdmissionOpen ?? "false");
  }

  return (
    <AdminDashboardClient
      initialSettings={settingsMap}
      initialNews={news}
      initialResults={results}
      initialGallery={gallery}
      initialInquiries={inquiries}
      adminUser={session.user?.name || "Admin"}
    />
  );
}
