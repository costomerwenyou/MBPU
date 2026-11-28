"use client";

import React, { useEffect, useState } from "react";
import { talentTestConfig } from "@/config/talentTest";
import TalentButton from "@/components/TalentButton";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isExpired: boolean;
}

export default function TalentTestHero() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
    isExpired: false,
  });

  useEffect(() => {
    setMounted(true);
    const targetMs = new Date(talentTestConfig.testDate).getTime();

    const calculateTimeLeft = (): TimeLeft => {
      const difference = targetMs - Date.now();

      if (difference <= 0) {
        return {
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
          isExpired: true,
        };
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      return {
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
        isExpired: false,
      };
    };

    // Calculate immediately on mount
    setTimeLeft(calculateTimeLeft());

    const intervalId = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);
      if (updated.isExpired) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section
      id={talentTestConfig.anchorId}
      aria-labelledby="talent-test-heading"
      className="relative w-full bg-white border-b border-[#e2e8f0] scroll-mt-20"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-8 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] items-center gap-6 lg:gap-8">
        {/* Left Column: Headline, Details, CTA & Quick Facts */}
        <div className="flex flex-col items-start gap-3.5 sm:gap-4">
          {/* Audience Chip */}
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider bg-[#ffc233] text-[#0b1f44] shadow-sm">
            {talentTestConfig.chip}
          </span>

          {/* Headline */}
          <h2
            id="talent-test-heading"
            className="text-[clamp(2.2rem,5vw,3.8rem)] font-[900] tracking-[-0.03em] leading-[1.04] text-[#0b1f44]"
          >
            {talentTestConfig.headline}
          </h2>

          {/* Subtext - Crisp dark slate for maximum readability */}
          <p className="text-sm sm:text-lg text-[#334155] font-medium max-w-[50ch] leading-relaxed">
            {talentTestConfig.subtext}
          </p>

          {/* Primary CTA Button */}
          <div className="pt-1">
            <TalentButton
              text="REGISTER FOR TALENT TEST"
              href={talentTestConfig.registerHref}
              size="lg"
            />
          </div>

          {/* Quick Facts */}
          <div
            className="w-full pt-4 mt-1 border-t border-[#cbd5e1] flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#1e293b]"
            aria-label="Talent test format facts"
          >
            {talentTestConfig.facts.map((fact, index) => (
              <React.Fragment key={index}>
                <div className="inline-flex items-center">
                  <span className="font-black text-[#0b1f44] mr-1.5 text-sm sm:text-base">
                    {fact.value}
                  </span>
                  <span className="font-semibold text-[#334155]">{fact.label}</span>
                </div>
                {index < talentTestConfig.facts.length - 1 && (
                  <span
                    className="hidden sm:inline text-[#94a3b8] font-bold select-none"
                    aria-hidden="true"
                  >
                    |
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Column: Prize Card & Live Countdown */}
        <div className="bg-[#0b1f44] text-white border border-white/20 rounded-[20px] p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl">
          {/* Top 10 Students Chip */}
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#ffc233] text-[#0b1f44] shadow-sm mb-3">
            {talentTestConfig.prize.chip}
          </span>

          {/* Prize Amount */}
          <div className="text-[clamp(2.6rem,5.2vw,3.8rem)] font-[900] text-[#ffc233] tracking-[-0.03em] leading-none mb-2">
            {talentTestConfig.prize.amount}
          </div>

          {/* Caption */}
          <p className="text-sm sm:text-base font-bold text-white capitalize mb-4">
            {talentTestConfig.prize.caption}
          </p>

          <div className="w-full h-px bg-white/20 mb-4" role="separator" />

          {/* Countdown Heading - High visibility Gold */}
          <div className="text-xs uppercase tracking-widest text-[#ffc233] font-black mb-3">
            {mounted && timeLeft.isExpired
              ? talentTestConfig.expiredCountdownHeading
              : talentTestConfig.activeCountdownHeading}
          </div>

          {/* 4 Countdown Boxes */}
          <div
            className="grid grid-cols-4 gap-2 sm:gap-2.5 w-full max-w-[320px]"
            aria-label="Remaining time to MB Talent Test"
            aria-live="polite"
          >
            <div className="bg-white/10 border border-white/20 rounded-[12px] p-2.5 flex flex-col items-center justify-center">
              <span
                suppressHydrationWarning
                className="text-xl sm:text-2xl font-[900] text-white [font-variant-numeric:tabular-nums]"
              >
                {timeLeft.days}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-white/90 font-bold mt-0.5">
                Days
              </span>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-[12px] p-2.5 flex flex-col items-center justify-center">
              <span
                suppressHydrationWarning
                className="text-xl sm:text-2xl font-[900] text-white [font-variant-numeric:tabular-nums]"
              >
                {timeLeft.hours}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-white/90 font-bold mt-0.5">
                Hrs
              </span>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-[12px] p-2.5 flex flex-col items-center justify-center">
              <span
                suppressHydrationWarning
                className="text-xl sm:text-2xl font-[900] text-white [font-variant-numeric:tabular-nums]"
              >
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-white/90 font-bold mt-0.5">
                Min
              </span>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-[12px] p-2.5 flex flex-col items-center justify-center">
              <span
                suppressHydrationWarning
                className="text-xl sm:text-2xl font-[900] text-white [font-variant-numeric:tabular-nums]"
              >
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-white/90 font-bold mt-0.5">
                Sec
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
