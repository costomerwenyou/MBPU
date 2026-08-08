"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import {
  Settings,
  Megaphone,
  Trophy,
  Image as ImageIcon,
  Mail,
  LogOut,
  Plus,
  Trash2,
  Check,
  Upload,
  UserCheck,
} from "lucide-react";

interface NewsItem {
  id: string;
  text: string;
  createdAt: string | Date;
}

interface TopperItem {
  id: string;
  name: string;
  photo: string;
  score: string;
}

interface GalleryItem {
  id: string;
  url: string;
  type: string;
  category: string;
}

interface InquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
  createdAt: string | Date;
}

interface AdminDashboardClientProps {
  initialSettings: Record<string, string>;
  initialNews: NewsItem[];
  initialResults: TopperItem[];
  initialGallery: GalleryItem[];
  initialInquiries: InquiryItem[];
  adminUser: string;
}

export default function AdminDashboardClient({
  initialSettings,
  initialNews,
  initialResults,
  initialGallery,
  initialInquiries,
  adminUser,
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"settings" | "news" | "results" | "gallery" | "inquiries">("settings");

  // State managers
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(initialSettings["is_admission_open"] === "true");
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [results, setResults] = useState<TopperItem[]>(initialResults);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [inquiries] = useState<InquiryItem[]>(initialInquiries);

  // Form states
  const [newNewsText, setNewNewsText] = useState("");
  const [topperName, setTopperName] = useState("");
  const [topperScore, setTopperScore] = useState("");
  const [topperFile, setTopperFile] = useState<File | null>(null);
  const [galleryCategory, setGalleryCategory] = useState("Activity");
  const [galleryType, setGalleryType] = useState("image");
  const [galleryFile, setGalleryFile] = useState<File | null>(null);

  // Status/Loading indicators
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignOut = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  const showNotification = (msg: string, isError = false) => {
    if (isError) {
      setErrorMsg(msg);
      setTimeout(() => setErrorMsg(""), 4000);
    } else {
      setSuccessMsg(msg);
      setTimeout(() => setSuccessMsg(""), 4000);
    }
  };

  // Toggle Admission status
  const handleToggleAdmission = async (checked: boolean) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "is_admission_open", value: checked ? "true" : "false" }),
      });
      if (res.ok) {
        setIsAdmissionOpen(checked);
        showNotification(`Admissions successfully turned ${checked ? "OPEN" : "CLOSED"}.`);
      } else {
        showNotification("Failed to update settings.", true);
      }
    } catch (err) {
      showNotification("Error updating settings.", true);
    } finally {
      setLoading(false);
    }
  };

  // Add news
  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsText.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newNewsText }),
      });

      if (res.ok) {
        const data = await res.json();
        setNews([data.newsItem, ...news]);
        setNewNewsText("");
        showNotification("Announcement added successfully.");
      } else {
        showNotification("Failed to add announcement.", true);
      }
    } catch (err) {
      showNotification("Error adding announcement.", true);
    } finally {
      setLoading(false);
    }
  };

  // Delete news
  const handleDeleteNews = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    try {
      const res = await fetch(`/api/admin/news?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setNews(news.filter((item) => item.id !== id));
        showNotification("Announcement deleted.");
      } else {
        showNotification("Failed to delete.", true);
      }
    } catch (err) {
      showNotification("Error deleting.", true);
    }
  };

  // Upload file helper
  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.url;
  };

  // Add Topper Result
  const handleAddTopper = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topperName || !topperScore || !topperFile) {
      showNotification("Please fill in all fields and select a photo.", true);
      return;
    }

    setLoading(true);
    try {
      const photoUrl = await uploadFile(topperFile);

      const res = await fetch("/api/admin/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: topperName, score: topperScore, photo: photoUrl }),
      });

      if (res.ok) {
        const data = await res.json();
        setResults([data.topperItem, ...results]);
        setTopperName("");
        setTopperScore("");
        setTopperFile(null);
        showNotification("Student result added successfully.");
      } else {
        showNotification("Failed to add student result.", true);
      }
    } catch (err) {
      showNotification("Error adding student result.", true);
    } finally {
      setLoading(false);
    }
  };

  // Delete topper
  const handleDeleteTopper = async (id: string) => {
    if (!confirm("Delete student result card?")) return;
    try {
      const res = await fetch(`/api/admin/results?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setResults(results.filter((item) => item.id !== id));
        showNotification("Student result deleted.");
      } else {
        showNotification("Failed to delete.", true);
      }
    } catch (err) {
      showNotification("Error deleting.", true);
    }
  };

  // Add Gallery item
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryFile) {
      showNotification("Please select a file to upload.", true);
      return;
    }

    setLoading(true);
    try {
      const fileUrl = await uploadFile(galleryFile);

      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: fileUrl, type: galleryType, category: galleryCategory }),
      });

      if (res.ok) {
        const data = await res.json();
        setGallery([data.galleryItem, ...gallery]);
        setGalleryFile(null);
        showNotification("Gallery item uploaded successfully.");
      } else {
        showNotification("Failed to upload gallery item.", true);
      }
    } catch (err) {
      showNotification("Error uploading gallery item.", true);
    } finally {
      setLoading(false);
    }
  };

  // Delete Gallery item
  const handleDeleteGallery = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setGallery(gallery.filter((item) => item.id !== id));
        showNotification("Gallery item deleted.");
      } else {
        showNotification("Failed to delete.", true);
      }
    } catch (err) {
      showNotification("Error deleting.", true);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col lg:flex-row -mt-20">
      {/* Mobile Header (College Name only on mobile top) */}
      <div className="lg:hidden bg-primary text-white px-5 py-4 flex items-center justify-between border-b border-white/10 z-30">
        <span className="font-extrabold text-xs tracking-wider uppercase">
          College Control
        </span>
        <span className="text-[9px] text-secondary font-bold uppercase tracking-wider">
          {adminUser}
        </span>
      </div>

      {/* Desktop Sidebar (Desktop Only) */}
      <aside className="hidden lg:flex lg:w-72 bg-primary text-white p-6 shrink-0 shadow-lg lg:flex-col lg:justify-between lg:h-screen lg:sticky lg:top-0 z-30">
        <div>
          {/* Brand */}
          <div className="flex items-center space-x-3 pb-8 border-b border-white/10 mb-8">
            <div className="bg-secondary p-1.5 rounded-lg text-primary">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-wider uppercase block">
                College Control
              </span>
              <span className="text-[10px] text-secondary font-bold uppercase tracking-widest block">
                {adminUser} logged in
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === "settings" ? "bg-secondary text-primary" : "hover:bg-white/5"
              }`}
            >
              <Settings className="h-4.5 w-4.5" />
              <span>Settings</span>
            </button>
            <button
              onClick={() => setActiveTab("news")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === "news" ? "bg-secondary text-primary" : "hover:bg-white/5"
              }`}
            >
              <Megaphone className="h-4.5 w-4.5" />
              <span>Announcements</span>
            </button>
            <button
              onClick={() => setActiveTab("results")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === "results" ? "bg-secondary text-primary" : "hover:bg-white/5"
              }`}
            >
              <Trophy className="h-4.5 w-4.5" />
              <span>Results Toppers</span>
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === "gallery" ? "bg-secondary text-primary" : "hover:bg-white/5"
              }`}
            >
              <ImageIcon className="h-4.5 w-4.5" />
              <span>Gallery Manager</span>
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === "inquiries" ? "bg-secondary text-primary" : "hover:bg-white/5"
              }`}
            >
              <Mail className="h-4.5 w-4.5" />
              <span>Inquiries ({inquiries.length})</span>
            </button>
          </nav>
        </div>

        {/* Log Out */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider border border-white/10 hover:bg-white/5 text-white/80 hover:text-white transition-colors mt-8 cursor-pointer"
        >
          <LogOut className="h-4.5 w-4.5" />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Mobile Bottom Tab Bar (Mobile Only) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-primary text-white border-t border-white/10 flex items-center justify-around h-16 px-2 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.15)]">
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${
            activeTab === "settings" ? "text-secondary scale-110" : "text-white/60"
          }`}
          title="Settings"
        >
          <Settings className="h-5.5 w-5.5" />
        </button>
        <button
          onClick={() => setActiveTab("news")}
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${
            activeTab === "news" ? "text-secondary scale-110" : "text-white/60"
          }`}
          title="Announcements"
        >
          <Megaphone className="h-5.5 w-5.5" />
        </button>
        <button
          onClick={() => setActiveTab("results")}
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${
            activeTab === "results" ? "text-secondary scale-110" : "text-white/60"
          }`}
          title="Results"
        >
          <Trophy className="h-5.5 w-5.5" />
        </button>
        <button
          onClick={() => setActiveTab("gallery")}
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${
            activeTab === "gallery" ? "text-secondary scale-110" : "text-white/60"
          }`}
          title="Gallery"
        >
          <ImageIcon className="h-5.5 w-5.5" />
        </button>
        <button
          onClick={() => setActiveTab("inquiries")}
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all relative ${
            activeTab === "inquiries" ? "text-secondary scale-110" : "text-white/60"
          }`}
          title="Inquiries"
        >
          <Mail className="h-5.5 w-5.5" />
          {inquiries.length > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full leading-none scale-90">
              {inquiries.length}
            </span>
          )}
        </button>
        <button
          onClick={handleSignOut}
          className="flex flex-col items-center justify-center w-12 h-12 rounded-xl text-red-400 hover:text-red-300"
          title="Sign Out"
        >
          <LogOut className="h-5.5 w-5.5" />
        </button>
      </nav>

      {/* Main Workspace Workspace */}
      <main className="flex-1 p-5 sm:p-8 pt-4 sm:pt-6 pb-24 lg:pb-12">
        {/* Floating Notification */}
        {successMsg && (
          <div className="mb-6 bg-secondary/15 border border-secondary/35 text-secondary text-xs sm:text-sm font-bold px-5 py-3 rounded-xl flex items-center space-x-2 shadow-lg">
            <Check className="h-4.5 w-4.5" />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm font-bold px-5 py-3 rounded-xl flex items-center space-x-2 shadow-lg">
            <Trash2 className="h-4.5 w-4.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <section className="bg-white border border-border p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-primary mb-1 uppercase tracking-wide">
                Portal Settings
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                Control the admissions availability configuration across the public website instantly.
              </p>
            </div>

            <div className="p-6 bg-muted/40 border border-border/80 rounded-2xl flex items-center justify-between">
              <div>
                <h3 className="font-bold text-primary text-base">Admission Status Toggle</h3>
                <p className="text-xs text-muted-foreground mt-1 font-light leading-normal max-w-md">
                  Turning this toggle ON will show the &ldquo;Admission&rdquo; link and the &ldquo;Apply Now&rdquo; buttons on the website header/homepage.
                </p>
              </div>

              {/* Toggle switch */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAdmissionOpen}
                  onChange={(e) => handleToggleAdmission(e.target.checked)}
                  disabled={loading}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-muted-foreground/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
              </label>
            </div>
          </section>
        )}

        {/* News Manager Tab */}
        {activeTab === "news" && (
          <section className="space-y-8">
            <div className="bg-white border border-border p-6 sm:p-8 rounded-3xl shadow-xl">
              <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-wide">
                Add Scrolling News Text
              </h2>
              <form onSubmit={handleAddNews} className="space-y-4">
                <div>
                  <textarea
                    required
                    rows={2}
                    value={newNewsText}
                    onChange={(e) => setNewNewsText(e.target.value)}
                    placeholder="Enter the news text to scroll in the header ticker..."
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl hover:bg-secondary hover:text-primary transition-colors cursor-pointer inline-flex items-center space-x-1.5"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add News</span>
                </button>
              </form>
            </div>

            <div className="bg-white border border-border p-6 sm:p-8 rounded-3xl shadow-xl">
              <h3 className="text-lg font-bold text-primary mb-6">
                Active Announcements
              </h3>
              {news.length === 0 ? (
                <p className="text-sm text-muted-foreground">No custom news added yet. Falling back to defaults.</p>
              ) : (
                <div className="divide-y divide-border">
                  {news.map((item) => (
                    <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                      <p className="text-sm text-primary font-medium">{item.text}</p>
                      <button
                        onClick={() => handleDeleteNews(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-all"
                        title="Delete Announcement"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Toppers Manager Tab */}
        {activeTab === "results" && (
          <section className="space-y-8">
            <div className="bg-white border border-border p-6 sm:p-8 rounded-3xl shadow-xl">
              <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-wide">
                Add Topper Student Result
              </h2>
              <form onSubmit={handleAddTopper} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                      Student Name
                    </label>
                    <input
                      type="text"
                      required
                      value={topperName}
                      onChange={(e) => setTopperName(e.target.value)}
                      placeholder="e.g. Aditya Hegde"
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-secondary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                      Score / Rank Badge
                    </label>
                    <input
                      type="text"
                      required
                      value={topperScore}
                      onChange={(e) => setTopperScore(e.target.value)}
                      placeholder="e.g. 98.8% or JEE Rank 124"
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-secondary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                    Student Photo (Square suggested)
                  </label>
                  <div className="flex items-center space-x-3.5">
                    <label className="flex items-center space-x-2 px-4 py-3 bg-muted hover:bg-muted-foreground/10 text-primary font-bold text-xs uppercase tracking-wider rounded-xl border border-border cursor-pointer transition-colors">
                      <Upload className="h-4.5 w-4.5" />
                      <span>{topperFile ? "Change file" : "Select File"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) => setTopperFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </label>
                    <span className="text-xs text-muted-foreground truncate">
                      {topperFile ? topperFile.name : "No file selected"}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl hover:bg-secondary hover:text-primary transition-colors cursor-pointer inline-flex items-center space-x-1.5"
                >
                  <Plus className="h-4 w-4" />
                  <span>Save Result</span>
                </button>
              </form>
            </div>

            <div className="bg-white border border-border p-6 sm:p-8 rounded-3xl shadow-xl">
              <h3 className="text-lg font-bold text-primary mb-6">
                Current Registered Toppers
              </h3>
              {results.length === 0 ? (
                <p className="text-sm text-muted-foreground">No toppers uploaded yet. Falling back to defaults.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {results.map((topper) => (
                    <div
                      key={topper.id}
                      className="border border-border/80 rounded-2xl p-4 flex items-center justify-between space-x-3 bg-muted/10"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={topper.photo}
                          alt={topper.name}
                          className="w-12 h-12 rounded-full object-cover border border-secondary"
                        />
                        <div>
                          <h4 className="font-bold text-primary text-sm truncate max-w-[120px]">
                            {topper.name}
                          </h4>
                          <span className="text-xs bg-secondary text-primary px-2 py-0.5 rounded-full font-bold">
                            {topper.score}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteTopper(topper.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-all"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Gallery Manager Tab */}
        {activeTab === "gallery" && (
          <section className="space-y-8">
            <div className="bg-white border border-border p-6 sm:p-8 rounded-3xl shadow-xl">
              <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-wide">
                Upload Gallery Item
              </h2>
              <form onSubmit={handleAddGallery} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                      Category
                    </label>
                    <select
                      value={galleryCategory}
                      onChange={(e) => setGalleryCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-secondary transition-colors bg-white font-medium"
                    >
                      <option value="Hostel">Hostel</option>
                      <option value="College">College</option>
                      <option value="Class">Class</option>
                      <option value="Activity">Activity</option>
                      <option value="Sports">Sports</option>
                      <option value="Events">Events</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                      Media Type
                    </label>
                    <select
                      value={galleryType}
                      onChange={(e) => setGalleryType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-secondary transition-colors bg-white font-medium"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video / Play Clip</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                    Select Media File
                  </label>
                  <div className="flex items-center space-x-3.5">
                    <label className="flex items-center space-x-2 px-4 py-3 bg-muted hover:bg-muted-foreground/10 text-primary font-bold text-xs uppercase tracking-wider rounded-xl border border-border cursor-pointer transition-colors">
                      <Upload className="h-4.5 w-4.5" />
                      <span>{galleryFile ? "Change file" : "Select File"}</span>
                      <input
                        type="file"
                        accept={galleryType === "image" ? "image/*" : "video/*"}
                        required
                        onChange={(e) => setGalleryFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </label>
                    <span className="text-xs text-muted-foreground truncate">
                      {galleryFile ? galleryFile.name : "No file selected"}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl hover:bg-secondary hover:text-primary transition-colors cursor-pointer inline-flex items-center space-x-1.5"
                >
                  <Plus className="h-4 w-4" />
                  <span>Upload Item</span>
                </button>
              </form>
            </div>

            <div className="bg-white border border-border p-6 sm:p-8 rounded-3xl shadow-xl">
              <h3 className="text-lg font-bold text-primary mb-6">
                Active Gallery Media
              </h3>
              {gallery.length === 0 ? (
                <p className="text-sm text-muted-foreground">No media files uploaded yet. Falling back to defaults.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {gallery.map((item) => (
                    <div
                      key={item.id}
                      className="relative rounded-2xl overflow-hidden border border-border aspect-square group shadow-sm bg-muted/10"
                    >
                      <img
                        src={item.url}
                        alt="Gallery item preview"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 left-2 z-20 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {item.category}
                      </div>

                      <div className="absolute inset-0 bg-primary/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 z-10">
                        <button
                          onClick={() => handleDeleteGallery(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full shadow-lg transition-transform hover:scale-110"
                          title="Delete Item"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Inquiries Tab */}
        {activeTab === "inquiries" && (
          <section className="bg-white border border-border p-6 sm:p-8 rounded-3xl shadow-xl">
            <div>
              <h2 className="text-xl font-bold text-primary mb-1 uppercase tracking-wide">
                Admission Inquiry Logs
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed mb-6">
                View submitted enquiries from student applicants.
              </p>
            </div>

            {inquiries.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center border-t border-border mt-4">
                No student inquiries submitted yet.
              </p>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-5 border border-border rounded-2xl hover:border-secondary/40 transition-colors bg-muted/10 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                      <div>
                        <h3 className="font-bold text-primary text-base">{inq.name}</h3>
                        <span className="text-xs text-secondary font-bold uppercase tracking-wider">
                          Course Stream: {inq.course}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(inq.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-bold text-primary">Email: </span>
                        <a href={`mailto:${inq.email}`} className="text-secondary hover:underline">
                          {inq.email}
                        </a>
                      </div>
                      <div>
                        <span className="font-bold text-primary">Mobile: </span>
                        <a href={`tel:${inq.phone}`} className="text-secondary hover:underline">
                          {inq.phone}
                        </a>
                      </div>
                    </div>

                    {inq.message && (
                      <div className="bg-white p-3.5 rounded-xl border border-border text-sm text-muted-foreground leading-relaxed font-light">
                        <span className="font-semibold text-primary block mb-1">Message:</span>
                        &ldquo;{inq.message}&rdquo;
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
