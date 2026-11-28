import React from "react";
import type { Metadata } from "next";
import TalentTestHero from "@/components/TalentTestHero";
import { talentTestConfig } from "@/config/talentTest";
import {
  Trophy,
  Award,
  Clock,
  MapPin,
  Calendar,
  Phone,
  LineChart,
  FileCheck2,
  FileText,
  AlertCircle,
  Atom,
  FlaskConical,
  Calculator,
  Dna,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "MB Talent Test 2027 | Win ₹10,000 & Scholarships | MB PU Science College",
  description:
    "Register for MB Talent Test 2027 for 10th standard students. Compete for ₹10,000 cash prizes, merit scholarships, and join Maganur Basappa PU Science College Davanagere.",
};

export default function TalentTestPage() {
  const testBenefits = [
    {
      icon: Trophy,
      title: "₹10,000 Cash Prizes",
      description:
        "Top 10 state and district rankers receive cash awards of ₹10,000 each along with honorary merit trophies.",
    },
    {
      icon: Award,
      title: "Merit Scholarships",
      description:
        "High performers qualify for substantial tuition fee concessions and scholarships for I & II PUC science admissions.",
    },
    {
      icon: FileCheck2,
      title: "OMR Competitive Experience",
      description:
        "Simulates actual competitive board, KCET, and NEET testing environments to eliminate exam anxiety.",
    },
    {
      icon: LineChart,
      title: "Self Analization",
      description:
        "Every participant receives a personalized subject-wise analytical evaluation highlighting key areas of improvement and strengths.",
    },
  ];

  const syllabusData = [
    {
      subject: "Physics",
      icon: Atom,
      theme: {
        badge: "bg-blue-100 text-blue-800 border-blue-200",
        iconBg: "bg-blue-50 text-blue-600 border-blue-200",
        cardBorder: "hover:border-blue-300",
        dot: "bg-blue-500",
      },
      topics: [
        "Light - Reflection and Refraction",
        "Electricity",
        "Human Eye and the Colourful World",
        "Force and Laws of Motion",
        "Work & Energy",
      ],
    },
    {
      subject: "Chemistry",
      icon: FlaskConical,
      theme: {
        badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
        iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
        cardBorder: "hover:border-emerald-300",
        dot: "bg-emerald-500",
      },
      topics: [
        "Carbon and its compounds",
        "Chemical Reactions & Equation",
        "Metals & Non-Metals",
        "Acid, Bases & Salts",
      ],
    },
    {
      subject: "Mathematics",
      icon: Calculator,
      theme: {
        badge: "bg-amber-100 text-amber-900 border-amber-200",
        iconBg: "bg-amber-50 text-amber-600 border-amber-200",
        cardBorder: "hover:border-amber-300",
        dot: "bg-amber-500",
      },
      topics: [
        "Real Numbers",
        "Polynomials (9th & 10th)",
        "Linear Equation in Two Variables",
        "Coordinate Geometry",
        "Quadratic Equations",
        "Triangles: Congruence and Similarity",
        "Trigonometry & Its Applications",
        "Arithmetic Progression",
        "Mensuration",
        "Circles",
      ],
    },
    {
      subject: "Biology",
      icon: Dna,
      theme: {
        badge: "bg-rose-100 text-rose-800 border-rose-200",
        iconBg: "bg-rose-50 text-rose-600 border-rose-200",
        cardBorder: "hover:border-rose-300",
        dot: "bg-rose-500",
      },
      topics: [
        "Life Processes",
        "Control and Coordination",
        "How do Organisms Reproduce",
        "Tissues in Action",
        "Cells - The Building Block of Life",
      ],
    },
    {
      subject: "English",
      icon: BookOpen,
      theme: {
        badge: "bg-purple-100 text-purple-800 border-purple-200",
        iconBg: "bg-purple-50 text-purple-600 border-purple-200",
        cardBorder: "hover:border-purple-300",
        dot: "bg-purple-500",
      },
      topics: ["Basic Grammar"],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100/60 pb-12 sm:pb-16 overflow-hidden">
      {/* Full Screen Talent Test Hero Section */}
      <TalentTestHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 mt-6 sm:mt-8">
        {/* Exam Syllabus & Model Question Paper Section */}
        <section className="bg-white rounded-[24px] p-5 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-black text-amber-600 uppercase tracking-widest block mb-1">
                60 Questions • 60 Minutes • +4 Marks
              </span>
              <h3 className="text-2xl sm:text-3xl font-[900] text-[#0b1f44] uppercase tracking-tight">
                Exam Syllabus & Model Question Paper
              </h3>
            </div>
            <div className="inline-flex items-center space-x-2 text-xs font-black text-emerald-900 bg-emerald-100 border border-emerald-300 px-3.5 py-1.5 rounded-full w-fit">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-700" />
              <span>Syllabus Released</span>
            </div>
          </div>

          {/* Model Question Paper & Blueprint Notification Box */}
          <div className="bg-gradient-to-r from-amber-50/90 via-orange-50/60 to-amber-50/90 border border-amber-300 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5 text-center sm:text-left">
              <div className="p-2.5 bg-amber-200/70 text-amber-800 rounded-xl shrink-0 hidden sm:block">
                <FileText className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-[#0b1f44]">
                  Model Question Papers & Sample OMR Answer Sheets
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  Official practice question paper sets, detailed subject blueprints, and printable sample OMR test sheets designed by senior PU professors will be released and downloadable here soon.
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <span className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-full bg-[#ffc233] text-[#0b1f44] text-xs font-black uppercase tracking-wider shadow-md">
                <AlertCircle className="h-4 w-4" />
                <span>To Be Given Soon</span>
              </span>
            </div>
          </div>

          {/* Syllabus Scope */}
          <div className="space-y-4 pt-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <h4 className="text-base sm:text-lg font-black text-[#0b1f44] uppercase tracking-wide">
                  Official Exam Syllabus
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Detailed subject-wise topics for 10th standard (including foundational 9th standard chapters)
                </p>
              </div>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-black uppercase tracking-wider self-start sm:self-auto shadow-xs">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                <span>5 Subjects Covered</span>
              </span>
            </div>

            {/* Subject-Wise Syllabus Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-1">
              {syllabusData.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className={`bg-slate-50/70 hover:bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 ${item.theme.cardBorder} transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between`}
                  >
                    <div>
                      {/* Subject Card Header */}
                      <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/80 mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2.5 rounded-xl border ${item.theme.iconBg}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h5 className="text-base sm:text-lg font-black text-[#0b1f44] uppercase tracking-tight">
                              {item.subject}
                            </h5>
                            <span className="text-[11px] font-bold text-slate-500 block">
                              {item.topics.length} {item.topics.length === 1 ? "Topic" : "Chapters"}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.theme.badge}`}
                        >
                          {item.subject}
                        </span>
                      </div>

                      {/* Topic List */}
                      <ul className="space-y-2">
                        {item.topics.map((topic, tIdx) => (
                          <li
                            key={tIdx}
                            className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700 font-medium leading-snug"
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${item.theme.dot} mt-1.5 shrink-0`} />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Take the MB Talent Test? */}
        <section className="space-y-5 sm:space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-black text-amber-600 uppercase tracking-widest mb-1.5">
              Why Take The Test?
            </h2>
            <h3 className="text-2xl sm:text-3xl font-[900] text-[#0b1f44] tracking-tight uppercase">
              Proven Stepping Stone for PU Science Success
            </h3>
            <p className="text-sm sm:text-base text-slate-700 font-medium mt-1.5 leading-relaxed">
              Designed by senior faculty at MB PU Science College to benchmark conceptual clarity in Class 10 Science and Mathematics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {testBenefits.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 hover:shadow-lg hover:border-amber-400 transition-all flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3.5">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-[#0b1f44] mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Schedule & Venue Information Card */}
        <section className="bg-[#0b1f44] text-white rounded-[24px] p-6 sm:p-8 relative overflow-hidden shadow-2xl border border-white/20">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-3.5">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#ffc233] text-[#0b1f44] shadow-sm">
                <Calendar className="h-3.5 w-3.5" />
                <span>Test Day Schedule</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-[900] text-white uppercase tracking-tight">
                Sunday, 13 December 2026
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                Reporting time is 09:00 AM IST for document verification and roll number allotment. The test commences strictly at 10:00 AM IST.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 text-xs sm:text-sm">
                <div className="flex items-center space-x-2 bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/15">
                  <Clock className="h-4 w-4 text-[#ffc233] shrink-0" />
                  <span className="text-white">
                    <strong className="text-[#ffc233]">Test Time: </strong>10:00 AM - 11:00 AM
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/15">
                  <MapPin className="h-4 w-4 text-[#ffc233] shrink-0" />
                  <span className="truncate text-white">
                    <strong className="text-[#ffc233]">Venue: </strong>MB PU Science College, Davanagere
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 p-5 rounded-2xl flex flex-col items-center text-center space-y-3 shadow-md">
              <span className="text-xs uppercase font-black tracking-widest text-[#ffc233]">
                Need Help Registering?
              </span>
              <p className="text-xs text-slate-200 font-medium">
                Call the official admissions desk to confirm your seat immediately:
              </p>
              <a
                href={talentTestConfig.registerHref}
                className="w-full inline-flex items-center justify-center space-x-2 py-3 px-5 rounded-full bg-[#ffc233] hover:bg-amber-300 text-[#0b1f44] font-black text-sm uppercase tracking-wider transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Phone className="h-4 w-4" />
                <span>Call +91 9180602860</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
