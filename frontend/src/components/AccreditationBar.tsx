"use client";

import React from "react";
import { Award, ShieldCheck, CheckSquare, GraduationCap } from "lucide-react";

export default function AccreditationBar() {
  const achievements = [
    {
      title: "PU Board Affiliated",
      desc: "Govt. of Karnataka Approved",
      icon: ShieldCheck,
    },
    {
      title: "Accredited A+ Grade",
      desc: "Premium quality standards",
      icon: Award,
    },
    {
      title: "Top 10 PU College",
      desc: "Ranked among elite science colleges",
      icon: GraduationCap,
    },
    {
      title: "Exams Prep Partner",
      desc: "JEE & NEET integrated centers",
      icon: CheckSquare,
    },
  ];

  return (
    <div className="bg-primary/95 text-white border-y border-border/10 relative z-20 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {achievements.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-3.5 px-4 pt-4 md:pt-0 first:pt-0 justify-center text-center sm:text-left"
              >
                <div className="p-2.5 bg-secondary/15 rounded-xl text-secondary shrink-0">
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <div>
                  <span className="block font-black text-sm uppercase tracking-wider text-white">
                    {item.title}
                  </span>
                  <span className="block text-xs text-white/60 font-medium">
                    {item.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
