"use client";

import React, { useEffect, useState } from "react";
import { Megaphone, AlertCircle } from "lucide-react";

interface NewsItem {
  id: string;
  text: string;
  createdAt: string;
}

export default function NewsTicker() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news");
        if (res.ok) {
          const data = await res.json();
          setNews(data);
        }
      } catch (err) {
        console.error("Failed to load news ticker items:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="bg-secondary text-primary py-2.5 px-4 font-medium flex items-center justify-center text-xs sm:text-sm">
        <span className="animate-pulse">Loading announcements...</span>
      </div>
    );
  }

  // Fallback news if database ticker is empty
  const tickerItems =
    news.length > 0
      ? news
      : [
          { id: "1", text: "Admissions open for the academic year 2026-27! Apply today." },
          { id: "2", text: "MB PU College achieves 98.4% pass rate in the Board Exams." },
          { id: "3", text: "Special integrated batch coaching starting for NEET / JEE aspirants." },
        ];

  return (
    <div className="bg-secondary text-primary py-2.5 border-b border-border/10 flex items-center relative overflow-hidden z-20">
      {/* Label */}
      <div className="bg-primary text-white font-bold text-xs sm:text-sm px-4 py-1.5 rounded-r-lg uppercase tracking-wider flex items-center space-x-2 shrink-0 z-30 shadow-md">
        <Megaphone className="h-4 w-4 text-secondary animate-bounce" />
        <span>Announcements</span>
      </div>

      {/* Marquee Wrapper */}
      <div className="flex overflow-hidden w-full items-center select-none">
        <div className="animate-marquee whitespace-nowrap flex space-x-12 pl-4 text-xs sm:text-sm font-semibold tracking-wide">
          {/* Double the array elements to ensure seamless wrap-around loop */}
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-primary shrink-0" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
