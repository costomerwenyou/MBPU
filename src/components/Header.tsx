"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Don't show regular header on admin pages
  const isAdminPage = pathname.startsWith("/admin");

  useEffect(() => {
    // Fetch admission setting
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setIsAdmissionOpen(data.isAdmissionOpen);
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
      }
    };
    fetchSettings();

    // Scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAdminPage) return null;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Facilities", href: "/facilities" },
    { name: "Results", href: "/results" },
    { name: "Gallery", href: "/gallery" },
  ];

  if (isAdmissionOpen) {
    navLinks.push({ name: "Admission", href: "/admission" });
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-gradient-to-r from-white via-primary/95 to-primary backdrop-blur-md shadow-lg border-b border-border/10 py-3"
          : "bg-gradient-to-r from-white/90 via-primary/90 to-primary/85 backdrop-blur-sm py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & College Name */}
          <Link href="/" className="flex items-center group">
            <Logo className="h-10 sm:h-11 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium tracking-wide uppercase transition-colors duration-200 py-1 ${isActive
                    ? "text-secondary font-bold"
                    : "text-white/80 hover:text-white"
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {isAdmissionOpen && (
              <Link href="/admission">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-secondary text-primary font-bold text-sm px-5 py-2.5 rounded-full uppercase tracking-wider shadow-md hover:bg-accent transition-colors cursor-pointer"
                >
                  Apply Now
                </motion.button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-3">
            {isAdmissionOpen && (
              <Link href="/admission">
                <button className="bg-secondary text-primary font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider">
                  Apply
                </button>
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-secondary focus:outline-none transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-primary/98 border-t border-border/10 overflow-hidden shadow-inner"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium tracking-wide uppercase transition-all ${isActive
                      ? "bg-secondary text-primary font-bold"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
