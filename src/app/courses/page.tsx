"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, CheckCircle2, ChevronRight, Award } from "lucide-react";
import Link from "next/link";

export default function Courses() {
  const combinations = [
    {
      code: "PCMB",
      name: "Physics, Chemistry, Mathematics, Biology",
      description:
        "The standard stream for students seeking professional careers in medicine, biotechnology, agricultural science, pharmacy, or pure sciences.",
      subjects: [
        "Physics - Theoretical & Practical",
        "Chemistry - Organic, Inorganic & Physical",
        "Mathematics - Calculus, Algebra & Geometry",
        "Biology - Botany, Zoology & Physiology",
      ],
      coachingPathways: ["NEET (Medical)", "KCET (Agriculture/Veterinary)", "B.Sc/Pure Science Research"],
      color: "border-l-4 border-secondary",
    },
    {
      code: "PCMCs",
      name: "Physics, Chemistry, Mathematics, Computer Science",
      description:
        "The ideal combination for students planning to study Engineering, Information Technology, Computer Applications, Data Science, or Artificial Intelligence.",
      subjects: [
        "Physics - Classical, Modern & Wave Mechanics",
        "Chemistry - Chemical Kinetics, Thermodynamics & Lab",
        "Mathematics - Vectors, Matrices & Calculus",
        "Computer Science - Programming in C++ / Python & Databases",
      ],
      coachingPathways: ["JEE Main & Advanced (IIT/NIT)", "KCET / COMEDK (Engineering)", "B.Tech/BE Computer Science"],
      color: "border-l-4 border-primary",
    },
  ];

  const coachingFeatures = [
    {
      badge: "JEE Mains & Advanced",
      focus: "For IIT & NIT Admissions",
      detail:
        "Rigorous training in advanced mathematics, analytical physics, and physical/organic chemistry with periodic simulated computer-based tests.",
    },
    {
      badge: "NEET",
      focus: "For MBBS & BDS Admissions",
      detail:
        "Deep conceptual lectures in Zoology and Botany, quick MCQ tricks in Physics and Chemistry, and standard full-length test series matching NTA guidelines.",
    },
    {
      badge: "KCET / CET",
      focus: "For State-level Engineering & Pharma",
      detail:
        "Specialized sessions concentrating on speed, precision, state board syllabus mapping, and previous years' question paper analysis.",
    },
  ];

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
            Our Courses & Streams
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-white/80 max-w-xl mx-auto font-light"
          >
            Explore pre-university combinations aligned with global career opportunities.
          </motion.p>
        </div>
      </section>

      {/* Combinations Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-secondary mb-3">
            Core Combinations
          </h2>
          <h3 className="text-3xl font-extrabold text-primary tracking-tight">
            Choose Your Pre-University Direction
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {combinations.map((comb, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-3xl p-8 shadow-xl border border-border/80 ${comb.color} hover:shadow-2xl transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-primary tracking-wider">
                    {comb.code}
                  </span>
                  <div className="p-2.5 bg-muted rounded-xl text-secondary">
                    <BookOpen className="h-6 w-6" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">
                  {comb.name}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-light">
                  {comb.description}
                </p>

                <h5 className="font-bold text-sm text-primary uppercase tracking-wider mb-3">
                  Syllabus Includes
                </h5>
                <ul className="space-y-2 mb-6">
                  {comb.subjects.map((sub, i) => (
                    <li key={i} className="flex items-center space-x-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4.5 w-4.5 text-secondary shrink-0" />
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-border/60 mt-6">
                <h5 className="font-bold text-sm text-secondary uppercase tracking-wider mb-3">
                  Potential Career Streams
                </h5>
                <div className="flex flex-wrap gap-2">
                  {comb.coachingPathways.map((path, i) => (
                    <span
                      key={i}
                      className="bg-muted text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-border"
                    >
                      {path}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integrated Coaching Section */}
        <section className="bg-primary text-white p-8 sm:p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px] opacity-35" />
          <div className="relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center space-x-2 bg-secondary/15 border border-secondary/35 text-secondary text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
                <GraduationCap className="h-4 w-4" />
                <span>Integrated Coaching</span>
              </span>
              <h3 className="text-3xl font-extrabold sm:text-4xl tracking-tight mb-4 uppercase">
                NEET, JEE & KCET Training
              </h3>
              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
                Save time and streamline your preparation. Our integrated model merges college board lessons with intensive entrance tutoring in a unified daily schedule.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coachingFeatures.map((feat, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
                >
                  <div className="inline-block bg-secondary text-primary text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4">
                    {feat.badge}
                  </div>
                  <h4 className="font-bold text-white mb-2">{feat.focus}</h4>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                    {feat.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/admission">
                <button className="bg-secondary text-primary font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-lg hover:bg-accent transition-colors cursor-pointer shadow-md inline-flex items-center space-x-2">
                  <span>Enquire for Integrated Batches</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
