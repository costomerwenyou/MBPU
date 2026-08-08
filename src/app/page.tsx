import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Users, Lightbulb } from "lucide-react";
import Hero from "@/components/Hero";
import NewsTicker from "@/components/NewsTicker";
import Stats from "@/components/Stats";
import AccreditationBar from "@/components/AccreditationBar";
import FAQSection from "@/components/FAQSection";
import CampusVideo from "@/components/CampusVideo";

export default function Home() {
  const coreFeatures = [
    {
      title: "Comprehensive Curriculum",
      description: "Rigorous training in basic sciences and computer applications using advanced labs and state-of-the-art facilities.",
      icon: BookOpen,
      href: "/courses",
      linkText: "Explore Courses",
    },
    {
      title: "Integrated Academy Coaching",
      description: "Elite coaching for JEE, NEET, and KCET from day one, delivered by veteran scholars and educators.",
      icon: GraduationCap,
      href: "/courses",
      linkText: "Coaching Programs",
    },
    {
      title: "Expert Mentorship",
      description: "Personalized attention and structured counselling for every student to help them reach their potential.",
      icon: Users,
      href: "/about",
      linkText: "Meet Faculty",
    },
    {
      title: "Holistic Development",
      description: "Nurturing values, analytical skills, physical education, sports, and technical exposure.",
      icon: Lightbulb,
      href: "/facilities",
      linkText: "View Facilities",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Announcements Scrolling News Ticker */}
      <NewsTicker />

      {/* Hero Header Section */}
      <Hero />

      {/* Trust & Accreditation Indicators */}
      <AccreditationBar />

      {/* Legacy Statistics Grid */}
      <Stats />

      {/* Why Choose Us / Core Focus */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-extrabold uppercase tracking-widest text-secondary mb-3">
              Why Choose Us
            </h2>
            <p className="text-3xl font-extrabold text-primary sm:text-4xl tracking-tight">
              Shaping Brilliant Academic Careers
            </p>
            <p className="mt-4 text-lg text-muted-foreground font-light leading-relaxed">
              MB PU College combines traditional board education with modern, high-intensity prep for professional careers in medical and engineering fields.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreFeatures.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div
                  key={index}
                  className="relative group p-8 rounded-2xl border border-border bg-white hover:shadow-2xl hover:border-secondary/20 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="p-3 bg-muted rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 w-fit mb-6">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {feat.description}
                    </p>
                  </div>
                  <Link
                    href={feat.href}
                    className="inline-flex items-center space-x-2 text-sm font-bold text-secondary group-hover:text-primary transition-colors mt-auto w-fit"
                  >
                    <span>{feat.linkText}</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Campus Video Tour Section */}
      <CampusVideo />

      {/* FAQ Section for SEO */}
      <FAQSection />

      {/* CTA Section */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-6 uppercase tracking-wide">
            Ready to Take the Next Step?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Empower your potential. Join a legacy of top board performers and national rank holders. Check details on criteria or combination availability.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/courses">
              <button className="w-full sm:w-auto bg-secondary text-primary font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-lg hover:bg-accent transition-colors cursor-pointer shadow-md">
                Learn About Courses
              </button>
            </Link>
            <Link href="/about">
              <button className="w-full sm:w-auto bg-transparent border border-white/20 hover:border-white text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-lg transition-colors cursor-pointer">
                About the College
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
