"use client";

import React from "react";
import Link from "next/link";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Button } from "@/components/ui/Button";
import { Sparkles, ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-[#F8F9FA] text-[var(--ink)] flex flex-col items-center justify-center p-6 text-center outline-none"
    >
      {/* Decorative Floating Card */}
      <GlassSurface
        elevation="card"
        className="max-w-lg w-full p-8 sm:p-12 rounded-3xl border border-[var(--navy)]/10 shadow-2xl space-y-6"
      >
        <div className="w-20 h-20 bg-[var(--navy)] text-[var(--gold)] rounded-full flex items-center justify-center mx-auto shadow-lg">
          <Sparkles className="w-10 h-10 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--orange)]">
            Error 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--navy)] tracking-tight">
            This party moved venues!
          </h1>
          <p className="text-xs sm:text-sm text-[var(--ink)]/70 max-w-sm mx-auto leading-relaxed">
            The page or celebration link you are looking for has relocated, completed its final
            toast, or does not exist.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/">
            <Button variant="navy" size="md" className="w-full sm:w-auto font-bold">
              <Home className="w-4 h-4 mr-1.5" /> Return to Homepage
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button
              variant="orange"
              size="md"
              className="w-full sm:w-auto font-bold text-[var(--ink)]"
            >
              <Compass className="w-4 h-4 mr-1.5" /> Open Workspace
            </Button>
          </Link>
        </div>
      </GlassSurface>

      <p className="text-xs text-[var(--ink)]/40 mt-8">
        Festora AI Celebration Platform • Navigating you back to the magic
      </p>
    </main>
  );
}
