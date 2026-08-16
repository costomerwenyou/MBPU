import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboardClient from "@/components/AdminDashboardClient";

export const dynamic = "force-dynamic";

async function fetchApi(endpoint: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
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

  // Fetch all endpoints in parallel
  const [news, results, gallery, inquiries, settingsData] = await Promise.all([
    fetchApi("/api/news"),
    fetchApi("/api/results"),
    fetchApi("/api/gallery"),
    fetchApi("/api/inquiries"),
    fetchApi("/api/settings"),
  ]);

  const settingsMap: Record<string, string> = {
    is_admission_open: String(settingsData?.isAdmissionOpen ?? "false"),
  };

  return (
    <AdminDashboardClient
      initialSettings={settingsMap}
      initialNews={news || []}
      initialResults={results || []}
      initialGallery={gallery || []}
      initialInquiries={inquiries || []}
      adminUser={session.user?.name || "Admin"}
    />
  );
}
