"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GraduationCap, Lock, User, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid username or password.");
        setLoading(false);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-muted/20 px-4 py-12 -mt-20">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-border shadow-2xl rounded-3xl p-8"
      >
        <div className="text-center mb-8">
          <div className="inline-flex bg-secondary p-3 rounded-2xl text-primary mb-4 shadow-md">
            <GraduationCap className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-black text-primary tracking-wide uppercase">
            MB PU Admin CMS
          </h2>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
            Access Portal Settings & Content Managers
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center space-x-2 text-xs font-semibold mb-6">
            <AlertCircle className="h-4.5 w-4.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-4.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-11 pr-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-11 pr-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-3.5 rounded-xl hover:bg-secondary hover:text-primary transition-colors cursor-pointer disabled:bg-primary/50 disabled:cursor-not-allowed mt-4 shadow-md"
          >
            {loading ? "Signing in..." : "Log In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
