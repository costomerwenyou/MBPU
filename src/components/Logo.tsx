"use client";

import React from "react";

interface LogoProps {
  className?: string;
  light?: boolean;
}

export default function Logo({ className = "h-12 w-auto", light = false }: LogoProps) {
  return (
    <img
      src="/MB PU logo.png"
      alt="MB PU Science College Logo"
      className={className}
      style={{
        filter: light ? "brightness(0) invert(1)" : "none",
      }}
    />
  );
}
