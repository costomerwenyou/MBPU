"use client";

import React from "react";
import Link from "next/link";

interface TalentButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  text?: string;
  size?: "sm" | "md" | "lg";
}

export default function TalentButton({
  href = "/talent-test",
  onClick,
  className = "",
  text = "MB TALENT TEST 2027",
  size = "md",
}: TalentButtonProps) {
  // Size-specific dimensions and paddings
  const sizeStyles = {
    sm: {
      container: "h-9 sm:h-10 px-5 sm:px-6",
      text: "text-xs sm:text-[13px] tracking-tight",
      icon: "h-4 w-4 sm:h-4.5 sm:w-4.5",
      chevron: "h-3.5 w-3.5 sm:h-4 sm:w-4",
      leftSlash: "-left-2.5 top-0 h-5 w-1.5",
      rightSlash: "-right-2.5 bottom-0 h-5 w-1.5",
      slant: "-skew-x-[20deg]",
    },
    md: {
      container: "h-11 sm:h-12 px-6 sm:px-8",
      text: "text-sm sm:text-base tracking-tight",
      icon: "h-5 w-5 sm:h-5.5 sm:w-5.5",
      chevron: "h-4 w-4 sm:h-5 sm:w-5",
      leftSlash: "-left-3.5 top-0.5 h-6 sm:h-7 w-2",
      rightSlash: "-right-3.5 bottom-0.5 h-6 sm:h-7 w-2",
      slant: "-skew-x-[20deg]",
    },
    lg: {
      container: "h-14 sm:h-16 px-8 sm:px-11",
      text: "text-base sm:text-lg md:text-xl tracking-tight",
      icon: "h-6 w-6 sm:h-7 sm:w-7",
      chevron: "h-5 w-5 sm:h-6 sm:w-6",
      leftSlash: "-left-4 sm:-left-5 top-0.5 h-8 sm:h-10 w-2.5 sm:w-3",
      rightSlash: "-right-4 sm:-right-5 bottom-0.5 h-8 sm:h-10 w-2.5 sm:w-3",
      slant: "-skew-x-[20deg]",
    },
  }[size];

  const content = (
    <div
      className={`group relative inline-flex items-center justify-center select-none cursor-pointer transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] ${className}`}
    >
      {/* Outer Ambient Pulsating Golden Glow */}
      <div
        aria-hidden="true"
        className={`absolute -inset-1.5 sm:-inset-2 ${sizeStyles.slant} rounded-lg bg-gradient-to-r from-amber-500/80 via-yellow-400 to-amber-500/80 blur-lg sm:blur-xl opacity-85 animate-talent-glow pointer-events-none group-hover:opacity-100 group-hover:blur-2xl transition-all duration-300`}
      />

      {/* Secondary Inner Core Glow */}
      <div
        aria-hidden="true"
        className={`absolute -inset-0.5 ${sizeStyles.slant} rounded-md bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 blur-xs opacity-70 pointer-events-none group-hover:opacity-95 transition-all duration-300`}
      />

      {/* Top-Left Floating Accent Slash with Intense Glow */}
      <span
        aria-hidden="true"
        className={`absolute ${sizeStyles.leftSlash} ${sizeStyles.slant} rounded-[1.5px] bg-gradient-to-b from-[#fef08a] via-[#fde047] to-[#f59e0b] shadow-[0_0_12px_rgba(250,204,21,1),0_0_24px_rgba(245,158,11,0.8)] transition-all duration-300 group-hover:-translate-x-1 group-hover:shadow-[0_0_20px_rgba(250,204,21,1),0_0_35px_rgba(245,158,11,1)]`}
      />

      {/* Main Banner Body */}
      <div className="relative">
        {/* Background Parallelogram with Glowing Gradient */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 ${sizeStyles.slant} rounded-[2px] bg-gradient-to-r from-[#f59e0b] via-[#fde047] to-[#eab308] border-t-2 border-yellow-100 border-b border-amber-600/90 shadow-[0_0_25px_rgba(250,204,21,0.85),0_0_55px_rgba(245,158,11,0.6),0_6px_20px_rgba(0,0,0,0.4),inset_0_1px_3px_rgba(255,255,255,0.85)] transition-all duration-300 group-hover:brightness-110 group-hover:shadow-[0_0_38px_rgba(250,204,21,1),0_0_75px_rgba(245,158,11,0.8)]`}
        />

        {/* Right Arrow Shade / Chevron Accent Overlay */}
        <div
          aria-hidden="true"
          className={`absolute inset-y-0 right-0 w-1/4 ${sizeStyles.slant} bg-gradient-to-r from-transparent via-[#f59e0b]/30 to-[#d97706]/40 pointer-events-none rounded-r-[2px]`}
        />

        {/* Shimmer sweep effect */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 ${sizeStyles.slant} overflow-hidden pointer-events-none rounded-[2px]`}
        >
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/50 to-transparent transform -translate-x-full animate-talent-shimmer group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        </div>

        {/* Unskewed Foreground Content */}
        <div
          className={`relative z-10 flex items-center space-x-2.5 sm:space-x-3 ${sizeStyles.container}`}
        >
          {/* Trophy Cup Icon with Center Golden Dot */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`${sizeStyles.icon} text-[#020b18]`}
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Cup bowl */}
              <path d="M6 3h12v6c0 3.314-2.686 6-6 6s-6-2.686-6-6V3z" />
              {/* Stem */}
              <path d="M10.5 15h3v4h-3z" />
              {/* Base */}
              <path d="M7 19h10v2.5H7z" />
              {/* Left handle */}
              <path
                d="M6 4.5H3.5A2.5 2.5 0 0 0 1 7v1A3.5 3.5 0 0 0 4.5 11.5H6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              {/* Right handle */}
              <path
                d="M18 4.5h2.5A2.5 2.5 0 0 1 23 7v1a3.5 3.5 0 0 1-3.5 3.5H18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              {/* Center golden dot */}
              <circle cx="12" cy="8.2" r="1.3" fill="#fde047" />
            </svg>
          </div>

          {/* Bold Uppercase Text */}
          <span
            className={`font-[900] uppercase text-[#020b18] whitespace-nowrap drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)] ${sizeStyles.text}`}
          >
            {text}
          </span>

          {/* Right Chevron Arrow */}
          <div className="relative flex items-center justify-center shrink-0 pl-0.5">
            {/* Luminous Chevron */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${sizeStyles.chevron} text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)] transition-transform duration-200 group-hover:translate-x-1`}
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom-Right Floating Accent Slash with Intense Glow */}
      <span
        aria-hidden="true"
        className={`absolute ${sizeStyles.rightSlash} ${sizeStyles.slant} rounded-[1.5px] bg-gradient-to-b from-[#f59e0b] via-[#eab308] to-[#d97706] shadow-[0_0_12px_rgba(250,204,21,1),0_0_24px_rgba(245,158,11,0.8)] transition-all duration-300 group-hover:translate-x-1 group-hover:shadow-[0_0_20px_rgba(250,204,21,1),0_0_35px_rgba(245,158,11,1)]`}
      />
    </div>
  );

  if (onClick && !href) {
    return (
      <button type="button" onClick={onClick} className="inline-block p-0 bg-transparent border-0 cursor-pointer">
        {content}
      </button>
    );
  }

  const isExternal = href?.startsWith("http") || href?.startsWith("tel:") || href?.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        onClick={onClick}
        className="inline-block cursor-pointer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className="inline-block cursor-pointer">
      {content}
    </Link>
  );
}
