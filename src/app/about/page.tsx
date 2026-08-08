"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Compass, Flag, Award, Quote, MapPin, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const leaders = [
  {
    name: "Sri. M. B. Patil",
    role: "Secretary",
    quote:
      "Education is the most powerful weapon which you can use to change the world. At Maganur Basappa PU College, we provide the platform to hone your analytical minds and build a prosperous, responsible career.",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    name: "Dr. Sandeep Patil",
    role: "Director",
    quote:
      "Integrated academic approaches prepare students not just for today's board exams, but for tomorrow's national competitive milestones. Our systems are built around academic rigour and personal growth.",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    name: "Prof. Anupama R.",
    role: "Principal",
    quote:
      "Every student is a bundle of infinite possibilities. Our dedicated faculty members are committed to providing personalized guidance to unfold this latent brilliance and help you succeed.",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80",
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
      {/* Header Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* H1 — used once per page as recommended */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight"
          >
            Maganur Basappa PU College, Davangere —{" "}
            <span className="text-secondary">Shaping Bright Futures</span> in Karnataka
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-white/80 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Maganur Basappa Pre University College (MBPU College), located in the heart of Taralabalu Badavane, Davangere, stands as one of the leading Pre University colleges in the region — a preferred choice for parents and students searching for the best PU college in Davangere and Karnataka.
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

        {/* H2: Faculty */}
        <div className="bg-muted/30 border border-border/50 rounded-3xl p-8 sm:p-12 mb-24">
          <div className="max-w-3xl mx-auto mb-10 text-center">
            <p className="text-sm font-extrabold uppercase tracking-widest text-secondary mb-3">Our Team</p>
            <h2 className="text-3xl font-extrabold text-primary tracking-tight">
              Experienced Faculty Dedicated to Student Success
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
              At the core of Maganur Basappa PU College&apos;s reputation is its team of highly qualified and experienced lecturers. The faculty is dedicated not only to imparting subject knowledge but also to fostering genuine curiosity and a lifelong passion for learning in every student. Personalized attention and mentorship help students build strong fundamentals across Science streams.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {leaders.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-border/50 flex flex-col justify-between hover:shadow-xl transition-shadow relative"
              >
                <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/5" />
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={leader.photo}
                      alt={`${leader.name} - ${leader.role}, Maganur Basappa PU College Davangere`}
                      className="w-16 h-16 rounded-full object-cover border-2 border-secondary shadow-md"
                    />
                    <div>
                      <h4 className="font-bold text-primary text-lg">{leader.name}</h4>
                      <p className="text-sm text-secondary font-semibold">{leader.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic leading-relaxed font-light">
                    &ldquo;{leader.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center space-x-2 mt-6 pt-4 border-t border-border/40">
                  <Award className="h-4 w-4 text-secondary" />
                  <span className="text-xs font-semibold text-primary">
                    MBPU College Leadership
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

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
                title="Maganur Basappa PU College Davangere location map"
                src="https://maps.google.com/maps?q=Taralabalu+Badavane+Vidyanagar+Davangere+577005&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
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
