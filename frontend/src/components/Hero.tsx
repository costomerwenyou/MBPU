"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Trophy,
  Award,
  Percent,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SafeImage from "@/components/SafeImage";

interface TopperItem {
  id: string;
  name: string;
  score: string;
  badge?: string;
  photo?: string;
}

type CardPosition =
  | "center"
  | "left-1"
  | "left-2"
  | "right-1"
  | "right-2"
  | "hidden";

function getCardPosition(
  cardIndex: number,
  currentIndex: number,
  total: number
): CardPosition {
  const offset = (cardIndex - currentIndex + total) % total;
  if (offset === 0) return "center";
  if (offset === 1) return "right-1";
  if (offset === 2) return "right-2";
  if (offset === total - 1) return "left-1";
  if (offset === total - 2) return "left-2";
  return "hidden";
}

const cardTransforms: Record<CardPosition, string> = {
  center: "scale(1.08) translateZ(0)",
  "left-2": "translateX(-240px) scale(0.75) translateZ(-250px)",
  "left-1": "translateX(-130px) scale(0.88) translateZ(-100px)",
  "right-1": "translateX(130px) scale(0.88) translateZ(-100px)",
  "right-2": "translateX(240px) scale(0.75) translateZ(-250px)",
  hidden: "translateX(0) scale(0.7) translateZ(-300px)",
};

const cardTransformsMobile: Record<CardPosition, string> = {
  center: "scale(1.05) translateZ(0)",
  "left-2": "translateX(-180px) scale(0.72) translateZ(-250px)",
  "left-1": "translateX(-95px) scale(0.85) translateZ(-100px)",
  "right-1": "translateX(95px) scale(0.85) translateZ(-100px)",
  "right-2": "translateX(180px) scale(0.72) translateZ(-250px)",
  hidden: "translateX(0) scale(0.7) translateZ(-300px)",
};

export default function Hero() {
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [toppersList, setToppersList] = useState<TopperItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);

  const defaultToppers: TopperItem[] = [
    {
      id: "1",
      name: "Aditya Hegde",
      score: "98.8% - PCMCs Topper",
      badge: "🏆 1st Rank PCMCs",
      photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&h=600&q=80",
    },
    {
      id: "2",
      name: "Neha R. Rao",
      score: "98.4% - PCMB Topper",
      badge: "⭐ State Board Top 10",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&h=600&q=80",
    },
    {
      id: "3",
      name: "Rahul Sharma",
      score: "JEE Advanced AIR 124",
      badge: "🎯 IIT Qualifier",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&h=600&q=80",
    },
    {
      id: "4",
      name: "Sanjana Gowda",
      score: "NEET 710 / 720",
      badge: "🩺 NEET Top Ranker",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=600&q=80",
    },
    {
      id: "5",
      name: "Karthik Nair",
      score: "KCET Rank 8",
      badge: "🥇 KCET Top 10",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=600&q=80",
    },
    {
      id: "6",
      name: "Julia Gimmel",
      score: "97.6% - Commerce Topper",
      badge: "🏅 State Rank 5",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
  ];

  useEffect(() => {
    async function checkAdmissions() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setIsAdmissionOpen(data.isAdmissionOpen);
        }
      } catch (err) {
        console.error("Error checking admission setting:", err);
      }
    }

    async function fetchToppers() {
      try {
        const res = await fetch("/api/results");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setToppersList(data);
          }
        }
      } catch (err) {
        console.error("Error fetching toppers:", err);
      }
    }

    checkAdmissions();
    fetchToppers();
  }, []);

  const activeToppers = toppersList.length > 0 ? toppersList : defaultToppers;
  const total = activeToppers.length;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const goTo = useCallback(
    (newIndex: number) => {
      if (isAnimating || total === 0) return;
      setIsAnimating(true);
      const normalized = (newIndex + total) % total;
      setCurrentIndex(normalized);

      const nameTimer = setTimeout(() => {
        setDisplayIndex(normalized);
      }, 300);

      const animTimer = setTimeout(() => {
        setIsAnimating(false);
      }, 800);

      return () => {
        clearTimeout(nameTimer);
        clearTimeout(animTimer);
      };
    },
    [isAnimating, total]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(currentIndex - 1);
      else if (e.key === "ArrowRight") goTo(currentIndex + 1);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, goTo]);

  // Continuous auto-rotation every 3.5 seconds
  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      goTo(currentIndex + 1);
    }, 3500);
    return () => clearInterval(timer);
  }, [total, currentIndex, goTo]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX;
    const swipeThreshold = 50;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) goTo(currentIndex + 1);
      else goTo(currentIndex - 1);
    }
  };

  const activeTopper = activeToppers[displayIndex] || activeToppers[0];
  const transforms = isMobile ? cardTransformsMobile : cardTransforms;
  const cardSize = isMobile
    ? { width: 170, height: 240 }
    : { width: 220, height: 300 };

  const nameLineWidth = isMobile ? 40 : 70;
  const nameLineOffset = isMobile ? 55 : 90;

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-primary text-white py-14 lg:py-20">
      {/* Background Image with Dark Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-35 scale-105 transition-all duration-[10s]"
        style={{
          backgroundImage: "url('/RM403321.JPG')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80 z-0" />

      {/* Grid Pattern overlay for tech aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30 z-0" />

      {/* Animated Glowing Orbs (Motion Graphics) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 80, -50, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full filter blur-[80px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 60, -80, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 right-20 w-[450px] h-[450px] bg-secondary/10 rounded-full filter blur-[100px]"
        />
      </div>

      {/* Hero 2-Column Grid Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Side: Content & Action Buttons */}
          <div className="lg:col-span-6 text-left space-y-7">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-secondary/15 border border-secondary/35 text-secondary text-xs sm:text-sm font-extrabold px-4 py-2 rounded-full uppercase tracking-widest"
            >
              <Sparkles className="h-4 w-4" />
              <span>Davangere&apos;s Premier PU College</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase leading-[1.1]"
            >
              Moulding <span className="text-secondary">Brilliance</span>,<br />
              Shaping <span className="text-secondary">Careers</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed font-light"
            >
              Welcome to Bengaluru&apos;s premier educational institution, empowering
              students with rigorous academic curriculums and elite integrated
              coaching for competitive excellence in Engineering and Medicine.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <Link href="/courses">
                <button className="w-full sm:w-auto bg-white text-primary font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg hover:bg-secondary hover:text-primary transition-colors cursor-pointer flex items-center justify-center space-x-2.5">
                  <span>View Courses</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>

              {isAdmissionOpen ? (
                <Link href="/admission">
                  <button className="w-full sm:w-auto bg-secondary text-primary font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg hover:bg-accent transition-colors cursor-pointer flex items-center justify-center">
                    Enquire Now
                  </button>
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full sm:w-auto bg-white/10 text-white/50 border border-white/10 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl cursor-not-allowed text-center"
                >
                  Admissions Closed
                </button>
              )}
            </motion.div>

            {/* Key Stat Badges Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-white/10 text-secondary">
                  <Percent className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-base font-extrabold block text-white">99.02%</span>
                  <span className="text-[11px] text-white/60 block leading-tight font-light">Board Pass Rate</span>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-white/10 text-secondary">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-base font-extrabold block text-white">200+</span>
                  <span className="text-[11px] text-white/60 block leading-tight font-light">JEE Ranks</span>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-white/10 text-secondary">
                  <Trophy className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-base font-extrabold block text-white">70+</span>
                  <span className="text-[11px] text-white/60 block leading-tight font-light">NEET Ranks</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Star Topper Spotlight - 3D Perspective Team Carousel */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative w-full max-w-lg rounded-3xl p-4 sm:p-6 bg-transparent border-0 shadow-none overflow-hidden group transition-all duration-500 flex flex-col items-center justify-center text-center"
            >
              {/* Subtle background ambient glow element */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-secondary/20 rounded-full blur-3xl group-hover:bg-secondary/35 transition-all duration-700 pointer-events-none" />


              {/* 3D Track */}
              <div className="w-full relative h-[360px] sm:h-[390px] flex items-center justify-center perspective-[1000px]">
                <button
                  onClick={() => goTo(currentIndex - 1)}
                  aria-label="Previous topper"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-900/75 hover:bg-amber-500 hover:text-slate-950 border border-white/20 text-white w-9 h-9 rounded-full flex items-center justify-center cursor-pointer z-20 text-xl transition-all shadow-lg backdrop-blur-md"
                >
                  ‹
                </button>

                <div className="w-full h-full flex justify-center items-center relative transform-style-3d transition-transform duration-800 cubic-bezier">
                  {activeToppers.map((topper, i) => {
                    const position = getCardPosition(i, currentIndex, total);
                    const isHidden = position === "hidden";
                    const zIndex =
                      position === "center"
                        ? 10
                        : position === "left-1" || position === "right-1"
                          ? 5
                          : 1;
                    const opacity = isHidden
                      ? 0
                      : position === "center"
                        ? 1
                        : position === "left-1" || position === "right-1"
                          ? 0.88
                          : 0.65;

                    return (
                      <div
                        key={topper.id || topper.name}
                        onClick={() => goTo(i)}
                        style={{
                          position: "absolute",
                          width: cardSize.width,
                          height: cardSize.height,
                          background: "transparent",
                          backdropFilter: "blur(12px)",
                          border: position === "center"
                            ? "2px solid rgba(245, 158, 11, 0.7)"
                            : "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: 20,
                          overflow: "hidden",
                          boxShadow: position === "center"
                            ? "0 25px 50px rgba(245, 158, 11, 0.25), 0 15px 35px rgba(0, 0, 0, 0.5)"
                            : "0 20px 40px rgba(0, 0, 0, 0.25)",
                          transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                          cursor: "pointer",
                          zIndex,
                          opacity,
                          pointerEvents: isHidden ? "none" : "auto",
                          transform: transforms[position],
                        }}
                      >
                        {topper.badge && (
                          <div className="absolute top-2.5 right-2.5 bg-slate-950/85 text-amber-400 font-extrabold text-[10px] px-2.5 py-1 rounded-full border border-amber-400/40 backdrop-blur-md z-12 shadow-md">
                            {topper.badge}
                          </div>
                        )}
                        <SafeImage
                          src={topper.photo || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&h=600&q=80"}
                          alt={topper.name}
                          className="w-full h-full object-cover"
                          containerClassName="w-full h-full"
                          style={{
                            filter: position === "center" ? "none" : "grayscale(100%)",
                            transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => goTo(currentIndex + 1)}
                  aria-label="Next topper"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900/75 hover:bg-amber-500 hover:text-slate-950 border border-white/20 text-white w-9 h-9 rounded-full flex items-center justify-center cursor-pointer z-20 text-xl transition-all shadow-lg backdrop-blur-md"
                >
                  ›
                </button>
              </div>

              {/* Active Topper Details */}
              <div className="text-center mt-5 relative z-10">
                <h2
                  className="text-xl sm:text-2xl font-extrabold text-white tracking-tight relative inline-block mb-1"
                  style={{
                    opacity: isAnimating ? 0 : 1,
                    transition: "opacity 0.5s ease-out",
                  }}
                >
                  <span
                    className="absolute top-full h-0.5 bg-secondary"
                    style={{
                      left: -nameLineOffset,
                      width: nameLineWidth,
                    }}
                  />
                  {activeTopper.name}
                  <span
                    className="absolute top-full h-0.5 bg-secondary"
                    style={{
                      right: -nameLineOffset,
                      width: nameLineWidth,
                    }}
                  />
                </h2>
                <p
                  className="text-xs sm:text-sm font-bold text-secondary uppercase tracking-[0.1em] pt-1"
                  style={{
                    opacity: isAnimating ? 0 : 0.95,
                    transition: "opacity 0.5s ease-out",
                  }}
                >
                  {activeTopper.score}
                </p>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-5 relative z-10">
                {activeToppers.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to topper ${i + 1}`}
                    className={`h-2.5 rounded-full cursor-pointer transition-all duration-300 ${i === currentIndex
                      ? "w-6 bg-secondary shadow-[0_0_10px_rgba(245,158,11,0.6)]"
                      : "w-2.5 bg-white/25 hover:bg-white/50"
                      }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
