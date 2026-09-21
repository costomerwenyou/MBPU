"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Award,
  Star,
  Sparkles,
  Maximize2,
  X,
  CheckCircle2,
  Percent,
  ChevronRight,
  Medal,
  Zap,
} from "lucide-react";
import SafeImage from "@/components/SafeImage";

interface Topper {
  id: string;
  name: string;
  photo: string;
  score: string;
  badge?: string;
  category?: string;
}

export default function Results() {
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; score: string } | null>(null);

  useEffect(() => {
    async function fetchToppers() {
      try {
        const res = await fetch("/api/results");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setToppers(data);
          }
        }
      } catch (err) {
        console.error("Error loading toppers:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchToppers();
  }, []);

  const defaultToppers: Topper[] = [
    {
      id: "1",
      name: "Divyashree S D",
      score: "94.99 Percentile - NEET (UG) 2026",
      badge: "🩺 NEET Top Ranker",
      photo: "/s1.jpeg",
      category: "NEET",
    },
    {
      id: "2",
      name: "Bhoomika G",
      score: "93.68 Percentile - NEET (UG) 2026",
      badge: "🎯 NEET Achiever",
      photo: "/s2.jpeg",
      category: "NEET",
    },
    {
      id: "3",
      name: "Rahul Sharma",
      score: "JEE Advanced AIR 124",
      badge: "🚀 IIT Qualifier",
      photo: "/s3.jpeg",
      category: "JEE",
    },
    {
      id: "4",
      name: "Aditya Hegde",
      score: "98.8% - PCMCs Topper",
      badge: "🏆 1st Rank PCMCs",
      photo: "/s1.jpeg",
      category: "BOARD",
    },
    {
      id: "5",
      name: "Neha R. Rao",
      score: "98.4% - PCMB Topper",
      badge: "⭐ State Board Top 10",
      photo: "/s2.jpeg",
      category: "BOARD",
    },
    {
      id: "6",
      name: "Karthik Nair",
      score: "KCET Rank 8 - Engineering",
      badge: "🥇 KCET Top 10",
      photo: "/s3.jpeg",
      category: "CET",
    },
  ];

  const displayedToppers = toppers.length > 0 ? toppers : defaultToppers;

  const categories = [
    { id: "ALL", label: "All Results" },
    { id: "NEET", label: "NEET (UG)" },
    { id: "JEE", label: "JEE Main / Adv" },
    { id: "CET", label: "KCET Ranks" },
    { id: "BOARD", label: "Board Toppers" },
  ];

  const filteredToppers =
    activeCategory === "ALL"
      ? displayedToppers
      : displayedToppers.filter(
        (t) => (t.category || "").toUpperCase() === activeCategory
      );

  return (
    <div className="min-h-screen bg-muted/20 pb-24 overflow-hidden">
      {/* Lightbox Modal for Full Screen Result Image Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col items-center"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 text-white p-2 rounded-full z-20 transition-all cursor-pointer"
                aria-label="Close image modal"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="w-full h-full p-4 flex items-center justify-center overflow-auto max-h-[78vh]">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-h-[75vh] w-auto object-contain rounded-xl shadow-xl"
                />
              </div>
              <div className="w-full p-4 bg-slate-950 border-t border-white/10 text-center">
                <h3 className="text-xl font-bold text-white">{selectedImage.title}</h3>
                <p className="text-sm font-semibold text-amber-400 mt-1">{selectedImage.score}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <section className="relative text-white py-24 sm:py-32 overflow-hidden mb-16 bg-primary">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105"
          style={{
            backgroundImage: "url('/result.jpeg')",
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/85 to-primary z-0" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:28px_28px] opacity-30 z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-secondary/15 border border-secondary/30 text-secondary text-xs sm:text-sm font-extrabold px-4 py-2 rounded-full uppercase tracking-widest mb-6"
          >
            <Sparkles className="h-4 w-4" />
            <span>Excellence & Achievements</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase leading-tight"
          >
            Academic <span className="text-secondary">Results</span> & Rankers
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Celebrating our students who set benchmark performances in NEET, JEE, KCET, and Karnataka State Board Examinations.
          </motion.p>

          {/* Key Stat Badges Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-secondary text-primary font-black">
                <Percent className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-xl font-extrabold text-white">99.02%</span>
                <span className="text-[11px] text-white/70 block uppercase tracking-wider font-medium">Board Pass Rate</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-secondary text-primary font-black">
                <Medal className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-xl font-extrabold text-white">200+</span>
                <span className="text-[11px] text-white/70 block uppercase tracking-wider font-medium">JEE Ranks</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-secondary text-primary font-black">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-xl font-extrabold text-white">70+</span>
                <span className="text-[11px] text-white/70 block uppercase tracking-wider font-medium">NEET Ranks</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-secondary text-primary font-black">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-xl font-extrabold text-white">Top 10</span>
                <span className="text-[11px] text-white/70 block uppercase tracking-wider font-medium">State Ranks</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex p-3 bg-secondary/15 rounded-full text-secondary mb-4">
            <Trophy className="h-7 w-7" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight mb-3 uppercase">
            Our Wall of Honor
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
            Browse through our toppers and official rank certificates showcasing outstanding performance in competitive and board exams.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeCategory === cat.id
                  ? "bg-primary text-secondary shadow-lg shadow-primary/20 scale-105"
                  : "bg-white text-muted-foreground hover:bg-muted hover:text-primary border border-border"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Interactive Result Showcase Grid */}
        {loading ? (
          <div className="text-center py-20">
            <span className="animate-pulse font-medium text-muted-foreground text-lg">
              Loading Academic Results...
            </span>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          >
            <AnimatePresence>
              {filteredToppers.map((topper, idx) => {
                const fallbackImg = ["/s1.jpeg", "/s2.jpeg", "/s3.jpeg"][idx % 3];
                const imgSrc = topper.photo || fallbackImg;

                return (
                  <motion.div
                    key={`${topper.id}-${idx}`}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="bg-white rounded-3xl overflow-hidden border border-border/70 shadow-lg hover:shadow-2xl transition-all duration-500 group flex flex-col"
                  >
                    {/* Image Poster Box */}
                    <div
                      onClick={() =>
                        setSelectedImage({
                          src: imgSrc,
                          title: topper.name,
                          score: topper.score,
                        })
                      }
                      className="relative w-full aspect-[3/4] bg-slate-900 overflow-hidden cursor-pointer group"
                    >
                      <SafeImage
                        src={imgSrc}
                        fallbackSrc={fallbackImg}
                        alt={topper.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        containerClassName="w-full h-full"
                      />

                      {/* Top Rank Badge */}
                      {topper.badge && (
                        <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md text-amber-400 font-extrabold text-xs px-3.5 py-1.5 rounded-full border border-amber-400/40 shadow-md z-10">
                          {topper.badge}
                        </div>
                      )}

                      {/* Hover Overlay with Fullscreen Icon */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 z-10">
                        <span className="text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                          <Maximize2 className="h-3.5 w-3.5 text-secondary" />
                          <span>View Poster</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                      <div>
                        <h3 className="text-xl font-extrabold text-primary tracking-tight uppercase group-hover:text-secondary transition-colors">
                          {topper.name}
                        </h3>
                        <p className="text-sm font-bold text-amber-600 mt-1 uppercase tracking-wide">
                          {topper.score}
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground font-medium">
                        <span className="flex items-center space-x-1">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          <span>Verified Performance</span>
                        </span>
                        <button
                          onClick={() =>
                            setSelectedImage({
                              src: imgSrc,
                              title: topper.name,
                              score: topper.score,
                            })
                          }
                          className="text-primary font-bold hover:text-secondary flex items-center space-x-1 transition-colors cursor-pointer"
                        >
                          <span>Preview</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Auto Scrolling Marquee Bar */}
        <section className="mb-20">
          <div className="text-center mb-6">
            <h3 className="text-xl font-extrabold text-primary uppercase tracking-wider inline-flex items-center space-x-2">
              <Zap className="h-5 w-5 text-secondary" />
              <span>Continuous Hall of Champions</span>
            </h3>
          </div>
          <div className="relative py-6 bg-primary rounded-3xl shadow-xl overflow-hidden border border-white/10">
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

            <div className="flex select-none">
              <div className="animate-marquee whitespace-nowrap flex space-x-6 pl-6">
                {[...displayedToppers, ...displayedToppers, ...displayedToppers, ...displayedToppers].map((topper, index) => (
                  <div
                    key={`marquee-${topper.id}-${index}`}
                    className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 w-[260px] shrink-0 text-left"
                  >
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-secondary shrink-0">
                      <SafeImage
                        src={topper.photo || ["/s1.jpeg", "/s2.jpeg", "/s3.jpeg"][index % 3]}
                        fallbackSrc={["/s1.jpeg", "/s2.jpeg", "/s3.jpeg"][index % 3]}
                        alt={topper.name}
                        className="object-cover w-full h-full"
                        containerClassName="w-full h-full"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-extrabold text-white text-sm tracking-tight truncate uppercase">
                        {topper.name}
                      </h4>
                      <p className="text-xs font-bold text-secondary truncate mt-0.5">
                        {topper.score}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Summary Card */}
        <section className="bg-primary text-white p-8 sm:p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px] opacity-35" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-secondary/20 border border-secondary/40 text-secondary text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4">
                <Award className="h-4 w-4" />
                <span>Proven Academic Excellence</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 uppercase leading-tight">
                Consistently Securing Top Ranks
              </h3>
              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed mb-6">
                Our focused training model ensures that students maintain high levels of academic retention. This is proven by our outstanding 99.02% board pass results across all streams and unmatched qualifiers count in NEET & JEE every year.
              </p>
              <div className="flex items-center space-x-3 text-secondary">
                <CheckCircle2 className="h-6 w-6" />
                <span className="font-bold tracking-wider text-sm sm:text-base uppercase">
                  Accredited integrated coaching model
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors">
                <span className="block text-3xl sm:text-4xl font-black text-secondary">99.02%</span>
                <span className="text-xs text-white/70 font-semibold block uppercase mt-1">
                  Overall Board Pass Rate
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors">
                <span className="block text-3xl sm:text-4xl font-black text-secondary">98.4%</span>
                <span className="text-xs text-white/70 font-semibold block uppercase mt-1">
                  Top PCMB Score
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors">
                <span className="block text-3xl sm:text-4xl font-black text-secondary">180+</span>
                <span className="text-xs text-white/70 font-semibold block uppercase mt-1">
                  NEET Qualifiers
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors">
                <span className="block text-3xl sm:text-4xl font-black text-secondary">75+</span>
                <span className="text-xs text-white/70 font-semibold block uppercase mt-1">
                  JEE Qualifiers
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
