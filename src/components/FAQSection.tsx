"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Where is Maganur Basappa P.U. Science College located?",
      answer:
        "Maganur Basappa P.U. Science College is located at Basavamantapa, Taralabalu Extension, Badavana, Vidyanagar, Davangere, Karnataka 577005, India.",
    },
    {
      question: "What combinations are offered at Maganur Basappa P.U. Science College?",
      answer:
        "We offer two core science Pre-University combinations: PCMB (Physics, Chemistry, Mathematics, Biology) ideal for NEET/medical aspirants, and PCMCs (Physics, Chemistry, Mathematics, Computer Science) ideal for JEE/engineering aspirants.",
    },
    {
      question: "Does MBPU College provide integrated coaching for JEE, NEET, and KCET?",
      answer:
        "Yes. Maganur Basappa P.U. Science College specialises in a fully integrated coaching model — board syllabus training is seamlessly combined with intensive preparation for JEE Mains & Advanced (IIT/NIT), NEET (MBBS/BDS), and KCET (state engineering/pharmacy) in a single daily schedule.",
    },
    {
      question: "What makes Maganur Basappa P.U. Science College one of the best PU colleges in Davangere?",
      answer:
        "Its experienced and highly qualified faculty, modern campus infrastructure, personalized student guidance, dedicated competitive exam coaching, and a 20+ year track record of academic excellence make it a top choice for PU education in Davangere and Karnataka.",
    },
    {
      question: "Are there scholarship programs or fee waivers at MBPU College?",
      answer:
        "Yes, we support academic brilliance by offering merit-based scholarships and partial/full fee waivers to top-performing students scoring 95% and above in their SSLC, CBSE, or ICSE 10th standard board examinations.",
    },
    {
      question: "How do I apply or enquire about admissions at Maganur Basappa P.U. Science College?",
      answer:
        "When admissions are active, you can apply directly through our Admission page enquiry form. You can also reach the college office directly by visiting the campus at Basavamantapa, Taralabalu Extension, Badavana, Vidyanagar, Davangere, Karnataka 577005.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Structured Data Schema for Local SEO
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <section className="py-20 bg-muted/30 border-t border-border">
      {/* Injecting Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex p-3 bg-secondary/10 rounded-full text-secondary mb-4">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-secondary mb-3">
            Questions & Answers
          </h2>
          <h3 className="text-3xl font-extrabold text-primary tracking-tight uppercase">
            Frequently Asked Queries
          </h3>
          <p className="mt-4 text-sm text-muted-foreground font-light leading-relaxed">
            Quickly search key information about stream availability, integrated training academies, boarding, and fee structures.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-border/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-primary text-sm sm:text-base pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-secondary transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-muted-foreground border-t border-border/10 leading-relaxed font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
