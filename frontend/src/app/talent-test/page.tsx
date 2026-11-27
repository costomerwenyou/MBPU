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
            <div className="inline-flex items-center space-x-2 text-xs font-black text-[#0b1f44] bg-amber-100 border border-amber-300 px-3.5 py-1.5 rounded-full w-fit">
              <Clock className="h-3.5 w-3.5 shrink-0 text-amber-700" />
              <span>To Be Given Soon</span>
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
          <div className="space-y-3.5 pt-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-[#0b1f44] uppercase tracking-wider">
                Syllabus
              </h4>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-[#0b1f44] text-xs font-black uppercase tracking-wider shadow-xs">
                <Clock className="h-3.5 w-3.5 text-amber-700" />
                <span>To Be Given Soon</span>
              </span>
            </div>

            <div className="bg-slate-50/80 border border-dashed border-slate-300 rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center justify-center space-y-2.5">
              <div className="p-3 bg-amber-100 text-amber-700 rounded-full mb-1">
                <Clock className="h-6 w-6" />
              </div>
              <h5 className="text-base sm:text-lg font-black text-[#0b1f44]">
                To Be Given Soon
              </h5>
              <p className="text-xs sm:text-sm text-slate-600 max-w-[50ch] leading-relaxed font-medium">
                The detailed subject-wise syllabus scope and chapter blueprint for Class 10 (Physics, Chemistry, Mathematics & Biology) will be published here soon.
              </p>
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
