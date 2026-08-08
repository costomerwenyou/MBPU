"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";

export default function Hero() {
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);

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
    checkAdmissions();
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-primary text-white">
      {/* Background Image with Dark Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 transition-all duration-[10s]"
        style={{
          backgroundImage:
            "url('/RM403321.JPG')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/90 to-transparent z-0" />

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

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 bg-secondary/15 border border-secondary/35 text-secondary text-xs sm:text-sm font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-6"
        >
          <GraduationCap className="h-4 w-4" />
          <span>Accredited A+ PU College</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 uppercase"
        >
          Moulding <span className="text-secondary">Brilliance</span>,<br />
          Shaping <span className="text-secondary">Careers</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
        >
          Welcome to Bengaluru&apos;s premier educational institution, empowering
          students with rigorous academic curriculums and elite integrated
          coaching for competitive excellence in engineering and medicine.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/courses">
            <button className="w-full sm:w-auto bg-white text-primary font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-lg shadow-md hover:bg-secondary hover:text-primary transition-colors cursor-pointer flex items-center justify-center space-x-2">
              <span>View Courses</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>

          {isAdmissionOpen ? (
            <Link href="/admission">
              <button className="w-full sm:w-auto bg-secondary text-primary font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-lg shadow-md hover:bg-accent transition-colors cursor-pointer">
                Enquire Now
              </button>
            </Link>
          ) : (
            <button
              disabled
              className="w-full sm:w-auto bg-white/10 text-white/50 border border-white/10 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-lg cursor-not-allowed"
            >
              Admissions Closed
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
