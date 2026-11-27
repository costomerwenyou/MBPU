"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Video, Play, Filter } from "lucide-react";
import SafeImage from "@/components/SafeImage";

interface GalleryItem {
  id: string;
  url: string;
  type: string; // "image" or "video"
  category: string; // "Activity", "Sports", "Events"
  description?: string;
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "College", "Class", "Hostel", "Activity", "Sports", "Events"];

  const categoryOrderList = ["College", "Class", "Hostel", "Activity", "Sports", "Events"];

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch(`/api/gallery${activeCategory !== "All" ? `?category=${activeCategory}` : ""}`);
        if (res.ok) {
          const data = await res.json();
          setItems(data);
        }
      } catch (err) {
        console.error("Error loading gallery:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, [activeCategory]);

  // Group items by category in horizontal row order
  const groupedCategories = categoryOrderList
    .map((cat) => ({
      name: cat,
      items: items.filter((item) => item.category === cat),
    }))
    .filter((group) =>
      activeCategory === "All" ? group.items.length > 0 : group.name === activeCategory
    );

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase"
          >
            Media Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-white/80 max-w-xl mx-auto font-light"
          >
            A visual overview of campus activities, events, and sports milestones.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Tabs / Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-border pb-6 mb-12 gap-4">
          <div className="flex items-center space-x-2 text-primary font-bold text-sm uppercase tracking-wider">
            <Filter className="h-4.5 w-4.5 text-secondary" />
            <span>Filter Categories</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all cursor-pointer ${activeCategory === cat
                    ? "bg-secondary text-primary shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted-foreground/10 hover:text-primary"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Category Sections & Grids */}
        {loading ? (
          <div className="text-center py-20">
            <span className="animate-pulse font-medium text-muted-foreground">Loading Gallery...</span>
          </div>
        ) : groupedCategories.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-3xl bg-muted/10 p-8 my-8">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-3 text-muted-foreground">
              <ImageIcon className="h-7 w-7" />
            </div>
            <h3 className="text-base font-bold text-primary">No Images Found</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
              {activeCategory === "All"
                ? "No gallery images have been uploaded yet."
                : `No images uploaded under "${activeCategory}" yet.`}
            </p>
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-16">
            {groupedCategories.map((group) => (
              <section key={group.name} className="space-y-6">
                {activeCategory === "All" && (
                  <div className="flex items-center justify-between border-b border-border pb-3.5">
                    <div className="flex items-center space-x-3">
                      <div className="w-2.5 h-6 bg-secondary rounded-full" />
                      <h3 className="text-xl sm:text-2xl font-black text-primary uppercase tracking-tight">
                        {group.name}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full uppercase tracking-wider">
                      {group.items.length} {group.items.length === 1 ? "Photo" : "Photos"}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="relative group rounded-3xl overflow-hidden shadow-md border border-border bg-muted/20 aspect-[4/3]"
                    >
                      <SafeImage
                        src={item.url}
                        fallbackSrc="/RM403321.JPG"
                        alt={`${item.category} item`}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Hover Info Overlay */}
                      <div className="absolute inset-0 bg-primary/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 z-10">
                        <span className="bg-secondary text-primary font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider self-start">
                          {item.category}
                        </span>

                        <div className="flex items-center justify-between text-white mt-auto pt-2 gap-3">
                          <p className="text-xs sm:text-sm font-semibold tracking-wide leading-snug line-clamp-2">
                            {item.description || (item.type === "video" ? "College Video Clip" : "College Campus Life")}
                          </p>
                          {item.type === "video" ? (
                            <div className="p-3 bg-secondary text-primary rounded-full shadow-lg shrink-0">
                              <Play className="h-4.5 w-4.5 fill-current" />
                            </div>
                          ) : (
                            <div className="p-3 bg-white/10 text-white rounded-full shrink-0">
                              <ImageIcon className="h-4.5 w-4.5" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Icon Indicator for small screen static display */}
                      <div className="absolute top-4 right-4 z-20 p-2 bg-primary/85 backdrop-blur-sm rounded-full border border-white/10 text-white block group-hover:hidden transition-all shadow-md">
                        {item.type === "video" ? (
                          <Video className="h-4 w-4" />
                        ) : (
                          <ImageIcon className="h-4 w-4" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
