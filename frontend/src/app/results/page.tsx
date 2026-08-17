"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Star } from "lucide-react";
import SafeImage from "@/components/SafeImage";

interface Topper {
  id: string;
  name: string;
  photo: string;
  score: string;
}

export default function Results() {
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchToppers() {
      try {
        const res = await fetch("/api/results");
        if (res.ok) {
          const data = await res.json();
          setToppers(data);
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
      name: "Aditya Hegde",
      score: "98.8% - PCMCs Topper",
      photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      id: "2",
      name: "Neha R. Rao",
      score: "98.4% - PCMB Topper",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      id: "3",
      name: "Rahul Sharma",
      score: "JEE Advanced - AIR 124",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      id: "4",
      name: "Sanjana Gowda",
      score: "NEET - 710/720",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      id: "5",
      name: "Karthik Nair",
      score: "KCET Rank 8",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80",
    },
  ];

  const displayedToppers = toppers.length > 0 ? toppers : defaultToppers;

  return (
    <div className="min-h-screen bg-muted/30 pb-20 overflow-hidden">
      {/* Header Banner */}
      <section className="relative text-white py-24 sm:py-32 overflow-hidden mb-16 bg-primary">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-80 scale-105"
          style={{
            backgroundImage: "url('/result.jpeg')",
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/80 to-primary z-0" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] opacity-35 z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase"
          >
            Academic Results
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-white/80 max-w-xl mx-auto font-light"
          >
            Celebrating the brilliance and hard work of our top-performing students.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex p-3 bg-secondary/10 rounded-full text-secondary mb-4">
            <Trophy className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-extrabold text-primary tracking-tight mb-4 uppercase">
            Our Hall of Fame
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
            Year after year, our students break milestones in Board Examinations and secure outstanding ranks in national and state competitive evaluations.
          </p>
        </div>

        {/* Auto Scrolling Carousel */}
        {loading ? (
          <div className="text-center py-12">
            <span className="animate-pulse font-medium text-muted-foreground">Loading Results Carousel...</span>
          </div>
        ) : (
          <div className="relative py-8 bg-white border border-border rounded-[2rem] shadow-inner mb-16 overflow-hidden">
            {/* Soft edge blur overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex select-none">
              <div className="animate-marquee whitespace-nowrap flex space-x-8 pl-8">
                {/* Quadruple the array elements to ensure seamless wrap-around loop regardless of count */}
                {[...displayedToppers, ...displayedToppers, ...displayedToppers, ...displayedToppers].map((topper, index) => (
                  <div
                    key={`${topper.id}-${index}`}
                    className="inline-block bg-muted/30 border border-border/80 rounded-2xl p-5 w-[220px] sm:w-[260px] shrink-0 text-center shadow-sm hover:shadow-lg hover:border-secondary/35 transition-all duration-300 group"
                  >
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 rounded-full overflow-hidden border-2 border-secondary shadow-md group-hover:scale-105 transition-transform duration-300">
                      <SafeImage
                        src={topper.photo}
                        alt={topper.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="font-bold text-primary text-base sm:text-lg tracking-tight truncate">
                      {topper.name}
                    </h3>
                    <div className="mt-2 inline-flex items-center space-x-1.5 bg-secondary text-primary font-extrabold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider">
                      <Star className="h-3 w-3 fill-current" />
                      <span>{topper.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stats Summary Card */}
        <section className="bg-primary text-white p-8 sm:p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px] opacity-35" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 uppercase">
                Consistently Securing Top Ranks
              </h3>
              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed mb-6">
                Our focused training model ensures that students maintain high levels of academic retention. This is proven by our 100% board passing results in multiple combinations and high qualifiers count in NEET & JEE every year.
              </p>
              <div className="flex items-center space-x-3 text-secondary">
                <Award className="h-6 w-6" />
                <span className="font-bold tracking-wider text-sm sm:text-base uppercase">
                  Accredited high achievers training
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <span className="block text-3xl font-black text-secondary">100%</span>
                <span className="text-xs text-white/70 font-semibold block uppercase mt-1">
                  Pass Rate (PCMCs)
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <span className="block text-3xl font-black text-secondary">98%</span>
                <span className="text-xs text-white/70 font-semibold block uppercase mt-1">
                  Pass Rate (PCMB)
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <span className="block text-3xl font-black text-secondary">180+</span>
                <span className="text-xs text-white/70 font-semibold block uppercase mt-1">
                  NEET Qualifiers
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <span className="block text-3xl font-black text-secondary">75+</span>
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
