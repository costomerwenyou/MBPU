import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import AdminDashboardClient from "@/components/AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  // Fetch all CMS database records on the server
  const settings = await db.setting.findMany();
  const news = await db.news.findMany({ orderBy: { createdAt: "desc" } });
  const results = await db.result.findMany({ orderBy: { createdAt: "desc" } });
  const gallery = await db.galleryItem.findMany({ orderBy: { createdAt: "desc" } });
  const inquiries = await db.inquiry.findMany({ orderBy: { createdAt: "desc" } });

  // Map settings array to a clean key-value object
  const settingsMap = settings.reduce((acc, curr) => {
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
