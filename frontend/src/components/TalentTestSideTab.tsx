"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { talentTestConfig } from "@/config/talentTest";

export default function TalentTestSideTab() {
  const pathname = usePathname();
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const isTalentTestPage = pathname === talentTestConfig.pagePath;

  // Check expiration & observe hero visibility
  useEffect(() => {
    setMounted(true);
    const targetMs = new Date(talentTestConfig.testDate).getTime();
    if (Date.now() >= targetMs) {
      setIsExpired(true);
      return;
    }

    // On all pages other than the talent-test page: always visible
    if (!isTalentTestPage) {
      setIsVisible(true);
      return;
    }

    // On the dedicated talent-test page: hide while hero banner is in view, show when scrolled past
    const heroEl = document.getElementById(talentTestConfig.anchorId);
    if (!heroEl) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If hero is intersecting (visible), hide the tab. When scrolled past, show it.
          setIsVisible(!entry.isIntersecting);
        });
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [pathname, isTalentTestPage]);

  // Don't render until client mount or if the test has expired
  if (!mounted || isExpired) {
    return null;
  }

  // Handle smooth scroll if already on the talent-test page
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTalentTestPage) {
      e.preventDefault();
      const target = document.getElementById(talentTestConfig.anchorId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", `#${talentTestConfig.anchorId}`);
      }
    }
  };

  return (
    <aside
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 pointer-events-none transition-all duration-300 motion-reduce:transition-opacity ${
        isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full pointer-events-none motion-reduce:translate-x-0"
      }`}
      style={{
        paddingRight: "env(safe-area-inset-right, 0px)",
      }}
      aria-hidden={!isVisible}
    >
      <Link
        href={talentTestConfig.pagePath}
        onClick={handleClick}
        className="pointer-events-auto group flex flex-col items-center gap-2.5 py-4 w-11 sm:w-12 bg-[#0b1f44] hover:bg-[#142e61] text-white border-y border-l-2 border-l-[#ffc233] border-white/20 rounded-l-[14px] rounded-r-none shadow-2xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc233] cursor-pointer"
        aria-label={talentTestConfig.sideTabAriaLabel}
      >
        {/* Gold "NEW" indicator chip */}
        <span
          className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#ffc233] text-[#0b1f44] shrink-0 shadow-sm"
          aria-hidden="true"
        >
          NEW
        </span>

        {/* Vertical Text reading top-to-bottom */}
        <span
          className="font-black tracking-wider text-white group-hover:text-[#ffc233] select-none whitespace-nowrap text-xs sm:text-sm py-1 transition-colors"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
          }}
        >
          {talentTestConfig.tabLabel}
        </span>
      </Link>
    </aside>
  );
}
