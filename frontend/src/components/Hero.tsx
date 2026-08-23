"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  photo?: string;
}

export default function Hero() {
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [toppersList, setToppersList] = useState<TopperItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultToppers = [
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

  // Continuous auto-rotation every 3.5 seconds
  useEffect(() => {
    if (activeToppers.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeToppers.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [activeToppers.length]);

  const currentTopper = activeToppers[currentIndex] || defaultToppers[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeToppers.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeToppers.length) % activeToppers.length);
  };

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-primary text-white py-16 lg:py-24">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Side: Content & Action Buttons */}
          <div className="lg:col-span-8 text-left space-y-8">
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

          {/* Right Side: Single Person Continuous Topper Showcase Console (Transparent / Frameless) */}
          <div className="lg:col-span-4 relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-xs sm:max-w-sm rounded-3xl p-2 bg-transparent overflow-hidden group"
            >
              {/* Toppers Console Header Tag */}
              <div className="flex items-center justify-between px-3 py-2 bg-transparent border-b border-white/15 mb-3">
                <div className="flex items-center space-x-1.5">
                  <Trophy className="h-3.5 w-3.5 text-secondary" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">
                    Star Topper Spotlight
                  </span>
                </div>
                <Link
                  href="/results"
                  className="text-[10px] font-bold text-secondary hover:text-white flex items-center space-x-1 transition-colors"
                >
                  <span>View All</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>

              {/* Single Person Auto-Rotating Card Container */}
              <div className="relative overflow-hidden rounded-2xl bg-transparent p-2 text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTopper.id || currentIndex}
                    initial={{ opacity: 0, x: 15, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -15, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col items-center"
                  >
                    {/* Single Person Image Frame */}
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-secondary via-accent to-secondary shadow-lg mb-3 group-hover:scale-105 transition-transform duration-500">
                      <SafeImage
                        src={currentTopper.photo || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&h=400&q=80"}
                        alt={currentTopper.name}
                        className="w-full h-full object-cover rounded-full"
                        containerClassName="w-full h-full rounded-full"
                      />
                      {/* Top Rank Badge */}
                      <div className="absolute -bottom-2 inset-x-0 mx-auto w-max bg-secondary text-primary font-extrabold text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-full shadow-md">
                        {"badge" in currentTopper ? (currentTopper as any).badge : "🏆 Rank Holder"}
                      </div>
                    </div>

                    {/* Single Person Name & Score Details */}
                    <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight mt-1">
                      {currentTopper.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-black text-secondary mt-0.5">
                      {currentTopper.score}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
