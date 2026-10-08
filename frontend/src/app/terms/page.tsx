import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Maganur Basappa PU College",
  description: "Terms and conditions of use for Maganur Basappa Pre-University Science College website.",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white border border-border rounded-3xl p-8 sm:p-12 shadow-sm">
        <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-2">
          Legal & Compliance (Draft - Subject to Legal Review)
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-6 uppercase tracking-tight">
          Terms of Service
        </h1>

        <div className="prose prose-slate max-w-none space-y-6 text-sm sm:text-base text-slate-700 font-light leading-relaxed">
          <p>
            Welcome to the official portal of Maganur Basappa Pre-University Science College, Davangere (&ldquo;MB PU College&rdquo;). By accessing or using this website, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h2 className="text-xl font-bold text-primary pt-4 border-t border-slate-100">
            1. Use of Website
          </h2>
          <p>
            The content on this website is provided for informational and educational purposes regarding our academic streams (PCMB, PCMCs), entrance coaching (NEET, JEE, KCET), facilities, and admission procedures.
          </p>

          <h2 className="text-xl font-bold text-primary pt-4 border-t border-slate-100">
            2. Intellectual Property
          </h2>
          <p>
            All logos, trademarks, text, graphics, images, and content displayed on this website are the property of Maganur Basappa Public Trust / MB PU College or its licensors and are protected under applicable copyright and intellectual property laws.
          </p>

          <h2 className="text-xl font-bold text-primary pt-4 border-t border-slate-100">
            3. Disclaimer of Claims
          </h2>
          <p>
            Academic performance statistics, topper scores, and rank disclosures presented on the website are compiled from board and entrance examination results. Actual individual student outcomes depend on student effort and attendance.
          </p>

          <h2 className="text-xl font-bold text-primary pt-4 border-t border-slate-100">
            4. Contact and Notice
          </h2>
          <p>
            If you have questions regarding these terms, please reach out to:
            <br />
            <strong>Email:</strong> admissions@mbpu.edu.in
            <br />
            <strong>Address:</strong> Maganur Basappa P.U. Science College, Basavamantapa, Taralabalu Extension, Badavana, Vidyanagar, Davangere, Karnataka 577005.
          </p>
        </div>
      </div>
    </div>
  );
}
