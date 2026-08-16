"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Compass, Flag, Award, Quote, MapPin, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const leaders = [
  {
    name: "Sharana Sangameshwara Gowdaru",
    role: "Honorable Secretary of Maganur Basappa Public Trust",
    quote:
      "Welcome to Maganur Basappa PU College, where we are committed to fostering academic excellence, holistic development, and strong values in our students. Our mission is to provide a dynamic learning environment that empowers students to reach their full potential, both academically and personally, while preparing them for future success. With a dedicated faculty, comprehensive curriculum, and emphasis on extracurricular activities, we aim to nurture responsible, innovative, and well-rounded individuals. We invite you to explore our college and join us in this journey of growth, learning, and achievement.",
    photo:
      "/Secretary.jpg",
  },
  {
    name: "Dr. G.N.H.Kumar (M.A, Ph.D)",
    role: "Director",
    quote:
      "Welcome to Maganur Basappa PU College! Our goal is to provide students with a nurturing environment where they can thrive academically, socially, and personally. We focus on delivering a strong educational foundation while promoting critical thinking, creativity, and ethical values. With an emphasis on both academic rigor and extracurricular development, we strive to prepare our students for the challenges of tomorrow. At Maganur Basappa, we believe that every student has the potential to excel and make a positive impact on society. I encourage you to explore our programs and become part of a community that fosters growth, leadership, and excellence.",
    photo:
      "/Director.jpg",
  },
  {
    name: "Dr. Prasad Bangera S",
    role: "Principal",
    quote:
      "Welcome to Maganur Basappa PU College, where academic excellence and personal growth go hand in hand. As the principal, I am proud to lead an institution that is dedicated to shaping the future of our students through quality education, innovation, and character development. We strive to provide a comprehensive learning experience that not only prepares students for higher education but also helps them become responsible, well-rounded individuals ready to face the challenges of the world. With a team of passionate educators and a focus on both scholastic and co-scholastic activities, we ensure that every student’s potential is nurtured.",
    photo:
      "/principle.jpg",
  },
];

const whyChooseUs = [
  {
    title: "Prime Location",
    detail: "Conveniently situated in Taralabalu Badavane, in the heart of Davangere",
  },
  {
    title: "Experienced Faculty",
    detail: "Qualified lecturers committed to student success and personalised mentorship",
  },
  {
    title: "Modern Infrastructure",
    detail: "Well-equipped campus and facilities for academic and extracurricular growth",
  },
  {
    title: "Competitive Exam Support",
    detail: "Dedicated coaching for NEET, JEE, and KCET aspirants integrated with board prep",
  },
  {
    title: "Holistic Development",
    detail: "A nurturing environment that encourages talent, discipline, and confidence",
  },
  {
    title: "Strong Track Record",
    detail: "Recognised as one of the top-rated PU colleges in Davangere and Karnataka with 5000+ alumni",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimalistic Header Banner with Old Dark Primary Background */}
      <section className="bg-primary text-white py-16 relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-black uppercase tracking-[0.25em] text-secondary inline-block mb-3"
          >
            About MBPU Science College
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            Shaping Bright Futures in Karnataka
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Maganur Basappa P.U. Science College is a premier institution in Davangere, dedicated to academic rigour, holistic student growth, and competitive excellence.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* H2: Campus & Growth */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-extrabold uppercase tracking-widest text-secondary mb-3">Our Campus</p>
            <h2 className="text-3xl font-extrabold text-primary mb-6 tracking-tight">
              A Campus Built for Academic and Personal Growth
            </h2>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed font-light">
              <p>
                The campus at Maganur Basappa PU College is thoughtfully designed and equipped with state-of-the-art facilities, creating an ideal setting for both academic learning and personal development. From well-equipped classrooms and science labs to a calm, student-friendly atmosphere, every aspect of the campus supports focused learning and holistic growth.
              </p>
              <p>
                Students receive comprehensive academic guidance throughout their PU journey, ensuring a well-rounded education that prepares them confidently for higher studies, competitive exams, and future careers.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[350px] sm:h-[450px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src="/RM403321.JPG"
              alt="Maganur Basappa PU College campus Davangere"
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>

        {/* H2: Mission, Vision, Goals */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-extrabold uppercase tracking-widest text-secondary mb-3">Our Purpose</p>
            <h2 className="text-3xl font-extrabold text-primary tracking-tight">
              Our Mission, Vision &amp; Goals
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
              Everything we do at Maganur Basappa PU College is guided by a clear purpose: to nurture confident, capable, and future-ready students.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Our Vision",
                icon: Compass,
                color: "bg-secondary text-primary",
                body: "Maganur Basappa Pre University College envisions becoming a premier institution in Karnataka, dedicated to fostering holistic development. We empower students to explore their unique talents, achieve academic excellence, and grow into responsible individuals — nurturing intellectual curiosity and preparing every student to contribute meaningfully to society.",
              },
              {
                title: "Our Mission",
                icon: Target,
                color: "bg-primary text-white",
                body: "Our mission is to provide a nurturing and innovative educational environment that promotes academic rigour, personal growth, and skill development. Through state-of-the-art facilities and highly qualified faculty, we ensure every student at MBPU College is well-prepared for higher studies and future challenges — while building a genuine passion for lifelong learning.",
              },
              {
                title: "Our Goal",
                icon: Flag,
                color: "bg-secondary text-primary",
                body: "Our goal is to deliver comprehensive education that integrates academic achievement with personal development — preparing students for success in higher education and beyond. We strive to create vibrant campus environments, provide ongoing mentorship, build strong foundations for competitive exams, and foster responsible, well-rounded individuals.",
              },
            ].map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-border flex flex-col items-center text-center group"
                >
                  <div className={`p-4 rounded-full mb-6 ${pillar.color} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* H2: Our Team - Exact 2-Column Reference Layout */}
        <section className="mb-24 space-y-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-secondary bg-secondary/10 border border-secondary/20 px-4 py-1.5 rounded-full inline-block mb-3">
              Leadership &amp; Mentorship
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight uppercase">
              Our Visionary Leadership Team
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
              Meet the educational leaders guiding Maganur Basappa P.U. Science College towards academic excellence and student success across Karnataka.
            </p>
          </div>

          <div className="space-y-10 max-w-6xl mx-auto">
            {leaders.map((leader, index) => {
              const bgColors = [
                "bg-gradient-to-tr from-secondary via-amber-400 to-yellow-500",
                "bg-gradient-to-tr from-primary via-blue-700 to-sky-500",
                "bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500",
              ];
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#f8f9fa] border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center overflow-hidden"
                >
                  {/* Left Column: Bold Title + Quote Text */}
                  <div className={`lg:col-span-7 space-y-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="inline-block bg-primary/10 border border-primary/20 text-primary text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full">
                      {leader.role} — Leadership
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                      {leader.name}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      &ldquo;{leader.quote}&rdquo;
                    </p>
                  </div>

                  {/* Right Column: Rotated Diamond Shape + Portrait Cutout */}
                  <div className={`lg:col-span-5 flex items-center justify-center relative py-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                      {/* Rotated Diamond Background Shape */}
                      <div
                        className={`absolute inset-0 ${bgColors[index % bgColors.length]} rounded-[2.5rem] rotate-45 shadow-lg transition-transform duration-500 hover:rotate-[50deg] hover:scale-105`}
                      />
                      {/* Cutout Image Layered Over Shape */}
                      <img
                        src={leader.photo}
                        alt={`${leader.name} - ${leader.role}, Maganur Basappa P.U. Science College`}
                        className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 object-cover rounded-2xl shadow-2xl border-4 border-white"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* H2: Why Choose Us */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-sm font-extrabold uppercase tracking-widest text-secondary mb-3">Your Best Choice</p>
            <h2 className="text-3xl font-extrabold text-primary tracking-tight">
              Why Choose Maganur Basappa PU College, Davangere?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
              Choosing a PU college is one of the most important decisions in a student&apos;s academic journey. At MBPU College, our mission and vision aren&apos;t just statements — they shape our classrooms, faculty mentorship, and campus culture every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex items-start space-x-4 bg-white border border-border/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-secondary/30 transition-all"
              >
                <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-primary text-base mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-light">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* H2: Location */}
        <div className="bg-primary text-white rounded-[2.5rem] p-8 sm:p-12 mb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px] opacity-35" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-widest text-secondary mb-3">Find Us</p>
              <h2 className="text-3xl font-extrabold tracking-tight mb-6">Location</h2>
              <div className="flex items-start space-x-4 text-white/80">
                <MapPin className="h-6 w-6 text-secondary shrink-0 mt-1" />
                <address className="not-italic text-base leading-relaxed">
                  <strong className="text-white font-bold block mb-1">Maganur Basappa P.U. Science College</strong>
                  Basavamantapa, Taralabalu Extension,<br />
                  Badavana, Vidyanagar, Davangere,<br />
                  Karnataka 577005, India
                </address>
              </div>
              <div className="mt-6">
                <a
                  href="https://maps.app.goo.gl/2qpUQhqkBBpWAQnh6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-secondary text-primary font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-full hover:bg-white transition-colors shadow-md"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 h-60 sm:h-72">
              <iframe
                title="Maganur Basappa P.U. Science College Davangere location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3209.753722626625!2d75.91854529999999!3d14.4399089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bba2541ebe0eabd%3A0x9d4a5ca1ccae4217!2sMaganur%20Basappa%20P.U.%20Science%20College!5e1!3m2!1sen!2sin!4v1786212874614!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>

        {/* H2: Admissions CTA */}
        <div className="text-center mb-24">
          <p className="text-sm font-extrabold uppercase tracking-widest text-secondary mb-3">Join Us</p>
          <h2 className="text-3xl font-extrabold text-primary tracking-tight mb-4">Admissions</h2>
          <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto mb-8">
            Admissions are open for students seeking quality Pre University education in Davangere. To learn more about courses, facilities, and the admission process at Maganur Basappa PU College, get in touch with the college office directly or visit the campus.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/admission">
              <button className="bg-primary text-white font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors cursor-pointer">
                Enquire Now
              </button>
            </Link>
            <Link href="/courses">
              <button className="bg-secondary text-primary font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-md hover:bg-accent transition-colors cursor-pointer">
                View Courses
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
