"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock, CheckCircle2, AlertTriangle, Send } from "lucide-react";

export default function Admission() {
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("PCMB");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkAdmissions() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setIsAdmissionOpen(data.isAdmissionOpen);
        }
      } catch (err) {
        console.error("Error checking admission setting:", err);
      } finally {
        setLoading(false);
      }
    }
    checkAdmissions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, course, message }),
      });

      if (res.ok) {
        setSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      {/* Header Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase"
          >
            Admissions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-white/80 max-w-xl mx-auto font-light"
          >
            Apply today to secure your seat in our high-achieving integrated streams.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-20">
            <span className="animate-pulse font-medium text-muted-foreground">Loading admissions details...</span>
          </div>
        ) : !isAdmissionOpen ? (
          /* Admissions Closed Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white border border-border rounded-3xl p-8 sm:p-12 text-center shadow-lg"
          >
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-6">
              <Lock className="h-7 w-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-4 tracking-tight uppercase">
              Admissions Closed
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light mb-8">
              Admissions for the current academic year are currently closed. Please check back later or get in touch with our office administration for special inquiries.
            </p>
            <div className="p-4 bg-muted rounded-2xl border border-border inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-primary">
              <AlertTriangle className="h-4.5 w-4.5 text-secondary" />
              <span>Contact office: admissions@mbpu.edu.in</span>
            </div>
          </motion.div>
        ) : (
          /* Admissions Open Screen */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Guidelines & Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-sm font-extrabold uppercase tracking-widest text-secondary mb-3">
                  Eligibility Criteria
                </h2>
                <h3 className="text-3xl font-extrabold text-primary tracking-tight mb-6 uppercase">
                  Admission guidelines
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed font-light">
                  To secure an admission at MB PU College, students must have completed their SSLC / 10th standard Board Examination or equivalent (ICSE, CBSE, IGCSE) and qualify on the entrance counseling evaluation.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3.5">
                  <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-primary text-base">Board Registration</h4>
                    <p className="text-sm text-muted-foreground font-light leading-normal">
                      Students must submit original transcripts, transfer certificates, and character reports during enrollment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-primary text-base">Integrated Counseling</h4>
                    <p className="text-sm text-muted-foreground font-light leading-normal">
                      Seats in PCMB/PCMCs integrated batches (NEET/JEE) are assigned based on student counseling performance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-primary text-base">Fee Waivers</h4>
                    <p className="text-sm text-muted-foreground font-light leading-normal">
                      Special scholarships and waivers are available for high-percentile students (95%+ in 10th exams).
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-xl"
            >
              <h3 className="text-xl font-bold text-primary mb-1">
                Admission Enquiry Form
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-6 font-light">
                Fill out the form below. Our admissions coordinator will reach out to you within 24 hours.
              </p>

              {success ? (
                <div className="bg-secondary/10 border border-secondary/20 p-6 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="h-10 w-10 text-secondary mx-auto" />
                  <h4 className="font-bold text-primary text-lg">Enquiry Submitted!</h4>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Thank you for your interest in MB PU College. Our admissions team will contact you shortly on the provided mobile number.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-xs font-bold text-primary underline mt-2"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-semibold">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aditya Patil"
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-secondary transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="aditya@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-secondary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-secondary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                      Stream/Combination Selected *
                    </label>
                    <select
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-secondary transition-colors bg-white"
                    >
                      <option value="PCMB">PCMB (Physics, Chemistry, Maths, Biology)</option>
                      <option value="PCMCs">PCMCs (Physics, Chemistry, Maths, Computer Science)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                      Message / Notes
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Add any specific questions here (e.g. regarding integrated NEET/JEE coaching)"
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-secondary transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-3.5 rounded-xl hover:bg-secondary hover:text-primary transition-colors cursor-pointer disabled:bg-primary/50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {submitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Enquiry</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
