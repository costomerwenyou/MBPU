import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Maganur Basappa PU College",
  description: "Privacy Policy for Maganur Basappa Pre-University Science College, Davangere.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white border border-border rounded-3xl p-8 sm:p-12 shadow-sm">
        <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-2">
          Legal & Compliance (Draft - Subject to Legal Review)
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-6 uppercase tracking-tight">
          Privacy Policy
        </h1>
        
        <div className="prose prose-slate max-w-none space-y-6 text-sm sm:text-base text-slate-700 font-light leading-relaxed">
          <p>
            Maganur Basappa Pre-University Science College (&ldquo;MB PU College&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting the privacy and personal data of students, parents, applicants, and website visitors.
          </p>

          <h2 className="text-xl font-bold text-primary pt-4 border-t border-slate-100">
            1. Information We Collect
          </h2>
          <p>
            We collect information provided directly by you when filling out admission inquiry forms, contacting our administrative office, or interacting with our portal. This includes:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Full Name of student/guardian</li>
            <li>Email address and mobile phone number</li>
            <li>Selected academic stream (PCMB / PCMCs)</li>
            <li>Any additional notes or queries submitted via inquiry forms</li>
          </ul>

          <h2 className="text-xl font-bold text-primary pt-4 border-t border-slate-100">
            2. How We Use Your Information
          </h2>
          <p>
            The collected information is used solely for educational and administrative purposes, including:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Responding to admission inquiries and providing counseling details</li>
            <li>Processing course enrollments and academic notifications</li>
            <li>Improving campus services, communication, and website experience</li>
          </ul>

          <h2 className="text-xl font-bold text-primary pt-4 border-t border-slate-100">
            3. Data Protection and Security
          </h2>
          <p>
            We implement strict administrative, technical, and organizational security measures to protect your personal data against unauthorized access, disclosure, alteration, or destruction. We do not sell or rent personal information to third parties.
          </p>

          <h2 className="text-xl font-bold text-primary pt-4 border-t border-slate-100">
            4. Contact Information
          </h2>
          <p>
            For privacy inquiries or data update requests, please contact our administrative office at:
            <br />
            <strong>Email:</strong> admissions@mbpu.edu.in
            <br />
            <strong>Address:</strong> Basavamantapa, Taralabalu Extension, Badavana, Vidyanagar, Davangere, Karnataka 577005, India.
          </p>
        </div>
      </div>
    </div>
  );
}
