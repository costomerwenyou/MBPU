"use client";

import React, { useState } from "react";
import { Play, Sparkles, Award, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const YOUTUBE_VIDEO_ID = "J7KqYEM5Vv0";

export default function CampusVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Column 1: Video Player (Left/7-cols) */}
          <div className="lg:col-span-7 relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-secondary to-primary/20 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-1000" />

            <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl aspect-video border border-border/50">
              {isPlaying ? (
                /* YouTube Iframe — autoplay kicks in after user clicks */
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                  title="MB PU Science College Campus Tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  {/* YouTube Thumbnail as poster */}
                  <img
                    src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                    alt="Campus Tour Video"
                    className="w-full h-full object-cover"
                  />

                  {/* Play Button Overlay */}
                  <div
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-black/50 z-10"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-20 h-20 bg-secondary hover:bg-secondary/95 text-primary rounded-full flex items-center justify-center shadow-2xl focus:outline-none"
                    >
                      <Play className="h-9 w-9 fill-current ml-1" />
                    </motion.button>
                  </div>
                </>
              )}

              {/* Top Banner Tag */}
              <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-md text-white font-extrabold text-[10px] sm:text-xs px-3.5 py-1.5 rounded-full uppercase tracking-widest border border-white/10 flex items-center space-x-1.5 z-10 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Virtual Campus Tour</span>
              </div>
            </div>
          </div>

          {/* Column 2: Copy & Value Props (Right/5-cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-widest text-secondary mb-3">
                Experience Campus Life
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight leading-tight">
                Step Inside MB PU Science College
              </h3>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
                Take a virtual tour and observe the exceptional infrastructure, interactive training methodologies, and vibrant academic culture that makes our college a launching pad for future leaders.
              </p>
            </div>

            {/* Icons List */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-secondary/15 text-primary rounded-xl shrink-0 mt-1">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-base">Modern Tech-Enabled Classrooms</h4>
                  <p className="text-sm text-muted-foreground">Smart projection setups, comfortable seating, and optimal acoustic designs.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-secondary/15 text-primary rounded-xl shrink-0 mt-1">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-base">State-of-the-Art Labs</h4>
                  <p className="text-sm text-muted-foreground">Fully equipped physics, chemistry, biology, and computer science workstations.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-secondary/15 text-primary rounded-xl shrink-0 mt-1">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-base">Integrated Academy Centers</h4>
                  <p className="text-sm text-muted-foreground">Dedicated zones for competitive prep evaluations, test-series, and reviews.</p>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            {/* <div className="pt-2">
              <a
                href="/admission"
                className="inline-flex items-center justify-center bg-primary hover:bg-primary/95 text-white font-extrabold text-sm px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 uppercase tracking-wider"
              >
                Schedule Physical Visit
              </a>
            </div> */}
          </div>

        </div>
      </div>
    </section>
  );
}
