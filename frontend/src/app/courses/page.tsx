"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  ChevronRight,
  Stethoscope,
  Cpu,
  Sprout,
  CheckCircle2,
  Compass,
} from "lucide-react";
import Link from "next/link";

export default function Courses() {
  const combinations = [
    {
      code: "PCMB",
      name: "Physics, Chemistry, Mathematics, Biology",
      description:
        "Designed for students aspiring for Medical (MBBS/BDS), AYUSH, Agriculture, Veterinary, Pharmacy, or Biological Research careers.",
      pathways: [
        "NEET (Medical / Dental / AYUSH)",
        "KCET (Agriculture / Veterinary / Pharma)",
        "Pure Science & Biotechnology Research",
      ],
      border: "border-l-4 border-rose-500",
    },
    {
      code: "PCMCs",
      name: "Physics, Chemistry, Mathematics, Computer Science",
      description:
        "Tailored for students aiming for Engineering, Computer Science, Artificial Intelligence, Data Science, and Architectural fields.",
      pathways: [
        "JEE Main & Advanced (IIT / NIT / IIIT)",
        "KCET / COMEDK (State Engineering)",
        "B.Tech CSE, AI/ML & Software Tech",
      ],
      border: "border-l-4 border-blue-500",
    },
  ];

  const careerStreams = [
    {
      title: "NEET",
      category: "Medical & Healthcare",
      icon: Stethoscope,
      accentBg: "bg-rose-50 border-rose-200 text-rose-700",
      dotColor: "text-rose-500",
      courses: [
        "Medical (MBBS)",
        "Dental (BDS)",
        "Ayurvedic Medicine (BAMS)",
        "Homeopathy (BHMS)",
        "Unani Medicine (BUMS)",
        "Naturopathy & Yoga (BNYS)",
        "Veterinary Science (B.V.Sc & AH)",
        "Physiotherapy (BPT)",
        "B.Sc Nursing & Allied Health",
      ],
    },
    {
      title: "JEE",
      category: "Engineering & Tech",
      icon: Cpu,
      accentBg: "bg-blue-50 border-blue-200 text-blue-700",
      dotColor: "text-blue-500",
      courses: [
        "BE / B.Tech (CSE, AI/ML, Data Science)",
        "BE / B.Tech (ECE, EEE, Mechanical, Civil)",
        "Integrated M.Tech / Dual Degree",
        "Bachelor of Architecture (B.Arch)",
        "Aerospace & Robotics Engineering",
        "Pure Science Research (IISc / IISER)",
      ],
    },
    {
      title: "KCET",
      category: "State Tech, Agri & Pharma",
      icon: Sprout,
      accentBg: "bg-emerald-50 border-emerald-200 text-emerald-700",
      dotColor: "text-emerald-500",
      courses: [
        "BE / B.Tech (State Engineering)",
        "B.Pharm (Bachelor of Pharmacy)",
        "Pharm.D (Doctor of Pharmacy)",
        "B.Sc Agriculture (Hons.)",
        "B.Sc Sericulture",
        "B.Sc Horticulture",
        "B.Sc Forestry",
        "B.Sc Food Tech & Biotech",
        "B.V.Sc (Veterinary Science)",
        "B.Sc Community Science & Fisheries",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Header Banner */}
      <section className="bg-primary text-white py-16 text-center relative overflow-hidden mb-12 shadow-md">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight"
          >
            Courses & Career Streams
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-base sm:text-lg text-white/80 font-light max-w-xl mx-auto"
          >
            Karnataka State PU Board approved combinations with integrated competitive coaching.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Combinations */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xs font-extrabold text-secondary uppercase tracking-widest mb-1">
              Academic Offerings
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-primary">
              Pre-University Combinations
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {combinations.map((comb, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-7 shadow-sm border border-slate-200 ${comb.border} hover:shadow-md transition-shadow flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-primary">
                      {comb.code}
                    </span>
                    <BookOpen className="h-6 w-6 text-slate-400" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    {comb.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mb-6">
                    {comb.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Primary Targets
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {comb.pathways.map((p, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 text-slate-800 text-xs font-medium px-3 py-1 rounded-full border border-slate-200"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Potential Career Streams */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center space-x-1.5 bg-secondary/15 text-secondary text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-2">
              <Compass className="h-3.5 w-3.5" />
              <span>Career Guidance</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-primary">
              Potential Career Streams
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-light mt-2">
              Degree programs unlocked after qualifying NEET, JEE, or KCET.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careerStreams.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2.5">
                        <div className="p-2 rounded-xl bg-slate-100 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h4 className="text-xl font-extrabold text-slate-900">
                          {item.title}
                        </h4>
                      </div>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${item.accentBg}`}
                      >
                        {item.category}
                      </span>
                    </div>

                    {/* Stream List */}
                    <ul className="space-y-2.5 mt-4">
                      {item.courses.map((course, i) => (
                        <li key={i} className="flex items-center space-x-2.5 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className={`h-4 w-4 shrink-0 ${item.dotColor}`} />
                          <span>{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Integrated Coaching Banner */}
        <section className="bg-primary text-white p-8 sm:p-12 rounded-3xl text-center relative overflow-hidden shadow-xl">
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="inline-flex items-center space-x-2 bg-secondary/20 text-secondary text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-4">
              <GraduationCap className="h-4 w-4" />
              <span>Integrated Coaching</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
              Integrated Entrance Coaching Program
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed mb-8 max-w-xl mx-auto">
              Combine PU Board curriculum with intensive NEET, JEE, and KCET entrance preparation in a single unified daily schedule.
            </p>
            <Link href="/admission">
              <button className="bg-secondary text-primary font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl hover:bg-accent transition-colors cursor-pointer shadow-md inline-flex items-center space-x-2">
                <span>Enquire for Admissions</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
