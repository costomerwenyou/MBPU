"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Logo from "@/components/Logo";

export default function Footer() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  if (isAdminPage) return null;

  return (
    <footer className="bg-primary text-white border-t border-border/10">
      {/* Top section: Info columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand/About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center bg-white px-4 py-2.5 rounded-2xl w-fit shadow-md hover:scale-[1.02] transition-transform">
              <Logo className="h-9 w-auto" />
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">
              MB Pre-University College is dedicated to providing quality academic education and moulding brilliance in students, preparing them for highly competitive engineering and medical careers.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#"
                className="text-white/60 hover:text-secondary hover:scale-110 transition-all"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-secondary hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-secondary hover:scale-110 transition-all"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-secondary hover:scale-110 transition-all"
                aria-label="Youtube"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.002 3.002 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-secondary uppercase tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-white hover:underline transition-all">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white hover:underline transition-all">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white hover:underline transition-all">
                  Courses & Combinations
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-white hover:underline transition-all">
                  College Facilities
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-white hover:underline transition-all">
                  Academic Toppers
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white hover:underline transition-all">
                  Photo & Video Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses & Integrated Programs */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-secondary uppercase tracking-widest">
              Courses
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>PCMB (Physics, Chemistry, Mathematics, Biology)</li>
              <li>PCMCs (Physics, Chemistry, Mathematics, Computer Science)</li>
              <li className="pt-2 border-t border-white/10 mt-2">
                <span className="text-secondary font-semibold block">Integrated Coaching:</span>
                KCET, NEET, JEE Mains & Advanced.
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-secondary uppercase tracking-widest">
              Contact Info
            </h3>
            <ul className="space-y-3.5 text-sm text-white/70">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/2qpUQhqkBBpWAQnh6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline transition-all"
                >
                  Maganur Basappa P.U. Science College,
                  <br />
                  Basavamantapa, Taralabalu Extension,
                  <br />
                  Badavana, Vidyanagar, Davangere,
                  <br />
                  Karnataka 577005, India
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                <span>+91 98765 43210, +91 80 2345 6789</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                <span>admissions@mbpu.edu.in</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="bg-primary-foreground/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 space-y-3 sm:space-y-0">
          <p>© {new Date().getFullYear()} MB Pre-University College. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-all">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-all">Terms of Service</a>
            <Link href="/admin" className="hover:text-white transition-all underline">Admin CMS Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
