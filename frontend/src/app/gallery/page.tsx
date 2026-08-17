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
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Hostel", "College", "Class", "Activity", "Sports", "Events"];

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

  const defaultItems: GalleryItem[] = [
    {
      id: "h1",
      category: "Hostel",
      type: "image",
      url: "/hostel1.JPG",
    },
    {
      id: "h2",
      category: "Hostel",
      type: "image",
      url: "/hostel2.JPG",
    },
    {
      id: "c1",
      category: "College",
      type: "image",
      url: "/RM403321.JPG",
    },
    {
      id: "c2",
      category: "College",
      type: "image",
      url: "/auditorum.png",
    },
    {
      id: "cl1",
      category: "Class",
      type: "image",
      url: "/class.JPG",
    },
    {
      id: "cl2",
      category: "Class",
      type: "image",
      url: "/lab.JPG",
    },
    {
      id: "s1",
      category: "Sports",
      type: "image",
      url: "/sports.png",
    },
    {
      id: "s2",
      category: "Sports",
      type: "image",
      url: "/ground.jpg",
    },
    {
      id: "a1",
      category: "Activity",
      type: "image",
      url: "/yoga.png",
    },
    {
      id: "1",
      category: "Activity",
      type: "image",
      url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "2",
      category: "Sports",
      type: "image",
      url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "3",
      category: "Events",
      type: "image",
      url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const displayedItems = items.length > 0 ? items : defaultItems.filter(item => activeCategory === "All" || item.category === activeCategory);

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
                className={`text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-secondary text-primary shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted-foreground/10 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Layout Grid */}
        {loading ? (
          <div className="text-center py-20">
            <span className="animate-pulse font-medium text-muted-foreground">Loading Gallery...</span>
          </div>
        ) : (
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {displayedItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative group rounded-3xl overflow-hidden shadow-md border border-border bg-muted/20 break-inside-avoid"
                >
                  <SafeImage
                    src={item.url}
                    alt={`${item.category} item`}
                    className="object-cover w-full h-auto max-h-[500px]"
                  />

                  {/* Hover Info Overlay */}
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 z-10">
                    <span className="bg-secondary text-primary font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider self-start">
                      {item.category}
                    </span>

                    <div className="flex items-center justify-between text-white mt-auto">
                      <span className="text-sm font-semibold tracking-wider uppercase">
                        {item.type === "video" ? "Play Video" : "View Image"}
                      </span>
                      {item.type === "video" ? (
                        <div className="p-3 bg-secondary text-primary rounded-full shadow-lg">
                          <Play className="h-4.5 w-4.5 fill-current" />
                        </div>
                      ) : (
                        <div className="p-3 bg-white/10 text-white rounded-full">
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
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
