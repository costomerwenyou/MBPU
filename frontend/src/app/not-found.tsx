import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="max-w-md w-full text-center bg-white border border-border rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="w-16 h-16 bg-secondary/15 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="h-8 w-8 text-secondary" />
        </div>
        <h1 className="text-4xl font-extrabold text-primary mb-2 tracking-tight">404</h1>
        <h2 className="text-xl font-bold text-slate-900 mb-3">Page Not Found</h2>
        <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <button className="w-full sm:w-auto bg-primary text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl hover:bg-secondary hover:text-primary transition-colors cursor-pointer flex items-center justify-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </button>
          </Link>
          <Link href="/courses">
            <button className="w-full sm:w-auto bg-slate-100 text-primary font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer">
              View Courses
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
