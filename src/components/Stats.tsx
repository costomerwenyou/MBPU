"use client";

import React from "react";
import { motion } from "framer-motion";
import { Percent, Award, Calendar, Trophy, Users } from "lucide-react";

export default function Stats() {
  const statItems = [
    {
      value: "5000+",
      label: "Passed Out Students",
      description: "Successful alumni across Karnataka and beyond",
      icon: Users,
    },
    {
      value: "98.22%",
      label: "Board Pass Rate",
      description: "Consistent top-tier academic performance",
      icon: Percent,
    },
    {
      value: "20+",
      label: "Years of Excellence",
      description: "Trusted institution in Davangere since inception",
      icon: Calendar,
    },
    {
      value: "70+",
      label: "NEET Rankings",
      description: "NEET qualifiers securing top medical seats",
      icon: Trophy,
    },
    {
      value: "100+",
      label: "JEE Rankings",
      description: "JEE qualifiers heading to IITs & NITs",
      icon: Award,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } },
  };

  return (
    <section className="py-16 bg-muted/50 border-y border-border/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-secondary mb-2">
            Our Legacy
          </h2>
          <p className="text-3xl font-extrabold text-primary sm:text-4xl tracking-tight">
            MB PU College at a Glance
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {statItems.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white p-8 rounded-2xl shadow-md border border-border/5 hover:shadow-xl hover:border-secondary/20 transition-all group flex flex-col items-center text-center"
              >
                <div className="p-3 bg-muted rounded-xl text-secondary group-hover:bg-secondary group-hover:text-primary transition-colors duration-300 mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-4xl font-extrabold text-primary mb-1 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-base font-bold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground leading-normal">
                  {stat.description}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
