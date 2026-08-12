import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import AdminDashboardClient from "@/components/AdminDashboardClient";

export const dynamic = "force-dynamic";

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

  // Fetch all CMS database records on the server safely
  let settings: any[] = [];
  let news: any[] = [];
  let results: any[] = [];
  let gallery: any[] = [];
  let inquiries: any[] = [];

  try {
    [settings, news, results, gallery, inquiries] = await Promise.all([
      db.setting.findMany(),
      db.news.findMany({ orderBy: { createdAt: "desc" } }),
      db.result.findMany({ orderBy: { createdAt: "desc" } }),
      db.galleryItem.findMany({ orderBy: { createdAt: "desc" } }),
      db.inquiry.findMany({ orderBy: { createdAt: "desc" } }),
    ]);
  } catch (error) {
    console.error("Database connection warning in /admin:", error);
  }

  // Map settings array to a clean key-value object
  const settingsMap = settings.reduce((acc: Record<string, string>, curr: any) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

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
