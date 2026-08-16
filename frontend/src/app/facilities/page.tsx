"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FlaskConical,
  Tv,
  Home,
  Heart,
  Monitor,
  Users,
  TreePine,
  Trophy,
} from "lucide-react";

export default function Facilities() {
  const facilityItems = [
    {
      title: "State-of-the-Art Laboratory",
      description:
        "Spacious, highly equipped Physics, Chemistry, and Biology labs complying with board standards and competitive practical syllabi.",
      icon: FlaskConical,
      image: "/lab.JPG",
      className: "md:col-span-2 md:row-span-2",
    },
    {
      title: "Auditorium",
      description:
        "A spacious hall with 500+ seating capacity and premium acoustics for hosting guest seminars, annual days, and cultural festivals.",
      icon: Tv,
      image: "/auditorum.png",
      className: "md:col-span-1 md:row-span-1",
    },
    {
      title: "Hostel Facilities",
      description:
        "Safe, hygienic, and separate boarding accommodation for boys and girls with study halls, hot water, and nutritious food service.",
      icon: Home,
      image: "/hostel1.JPG",
      className: "md:col-span-1 md:row-span-2",
    },
    {
      title: "Yoga & Wellness Center",
      description:
        "Daily mindfulness and yoga sessions conducted by certified coaches to encourage stress relief and emotional wellbeing.",
      icon: Heart,
      image: "/yoga.png",
      className: "md:col-span-1 md:row-span-1",
    },
    {
      isLogoCard: true,
      title: "MBPU Science College",
      description: "Moulding Brilliance, Shaping Careers",
      className: "md:col-span-1 md:row-span-1",
    },
    {
      title: "Smart Classrooms",
      description:
        "Interactive smart boards, high-speed Wi-Fi, and visual projection tools making learning highly engaging, concept-driven, and fun.",
      icon: Monitor,
      image: "/class.JPG",
      className: "md:col-span-2 md:row-span-1",
    },
    {
      title: "Conference Room",
      description:
        "Dedicated formal workspace for group projects, panel interviews, faculty meetings, and presentations.",
      icon: Users,
      image: "https://images.unsplash.com/photo-1517502884422-41eaaced0168?auto=format&fit=crop&w=600&q=80",
      className: "md:col-span-1 md:row-span-1",
    },
    {
      title: "Play Ground",
      description:
        "A spacious open grass layout supporting outdoor physical education, assemblies, track sports, and recreation.",
      icon: TreePine,
      image: "/ground.jpg",
      className: "md:col-span-2 md:row-span-1",
    },
    {
      title: "Sports & Games Room",
      description:
        "Indoor arena including Table Tennis, Chess, Carrom, and outdoor courts for Basketball and Volleyball.",
      icon: Trophy,
      image: "/sports.png",
      className: "md:col-span-1 md:row-span-1",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      {/* Header Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase"
          >
            Campus Facilities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-white/80 max-w-xl mx-auto font-light"
          >
            Experience a modern infrastructure designed to foster academic and physical excellence.
          </motion.p>
        </div>
      </section>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {facilityItems.map((item, index) => {
            if (item.isLogoCard) {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`relative overflow-hidden rounded-3xl flex items-center justify-center p-4 text-center group ${item.className}`}
                >
                  <img
                    src="/logo icon.png"
                    alt="MB PU Science College Logo Icon"
                    className="max-h-48 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              );
            }

            const Icon = item.icon!;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`relative overflow-hidden rounded-3xl group shadow-lg border border-border bg-white flex flex-col justify-end p-6 ${item.className}`}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/45 to-transparent z-10 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                {/* Content */}
                <div className="relative z-20 text-white space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-secondary text-primary rounded-xl shadow-md">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-secondary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light line-clamp-2 sm:line-clamp-none opacity-90 group-hover:opacity-100 transition-opacity">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
