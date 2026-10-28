"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Heart, ShieldCheck, Compass, ArrowRight, Award, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[var(--ink)]">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* Hero Section */}
        <section className="pt-36 pb-20 px-6 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--navy)]/8 border border-[var(--navy)]/10 text-xs font-bold text-[var(--navy)]">
            <Heart className="w-3.5 h-3.5 text-[var(--orange)]" /> The Festora Manifesto
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--navy)] leading-[1.05]">
            Plan the day.
            <br />
            Keep the magic.
          </h1>

          <p className="text-base sm:text-xl text-[var(--ink)]/75 max-w-2xl mx-auto leading-relaxed">
            We believe the most memorable moments in human life should be celebrated with boundless
            joy, not consumed by logistical chaos and runaway spreadsheets.
          </p>
        </section>

        {/* Narrative Section */}
        <section className="py-16 px-6 max-w-4xl mx-auto space-y-12">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[var(--navy)]/10 shadow-sm space-y-6 text-sm sm:text-base leading-relaxed text-[var(--ink)]/80">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--navy)]">
              Why We Built Festora AI
            </h2>
            <p>
              Planning a celebration—whether a multi-day royal wedding in Jaipur, an intimate 50th
              milestone anniversary, or a vibrant neighbourhood festival—has historically forced
              hosts into an exhausting compromise: either spend hundreds of hours wrestling
              fragmented spreadsheets and WhatsApp groups, or surrender control to expensive
              intermediaries with opaque vendor markups.
            </p>
            <p>
              We set out to create an entirely new paradigm: an intelligent autonomous planning
              copilot that pairs high-taste architectural design with mathematical logistical rigor.
              An operating system that gives you complete visibility, protects your financial
              buffer, and ensures every vendor cue arrives in flawless harmony.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[var(--navy)]/10">
              <div>
                <div className="text-3xl font-black text-[var(--navy)]">15,000+</div>
                <div className="text-xs text-[var(--ink)]/60 font-semibold mt-1">
                  Events Orchestrated
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[var(--navy)]">₹12.4 Cr</div>
                <div className="text-xs text-[var(--ink)]/60 font-semibold mt-1">
                  Client Budget Saved
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[var(--navy)]">99.4%</div>
                <div className="text-xs text-[var(--ink)]/60 font-semibold mt-1">
                  On-Time Vendor Arrival
                </div>
              </div>
            </div>
          </div>

          {/* Core Principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-[var(--navy)]/10 shadow-sm space-y-3">
              <span className="p-2.5 rounded-xl bg-[var(--navy)] text-[var(--gold)] inline-block">
                <Compass className="w-5 h-5" />
              </span>
              <h3 className="text-base font-bold text-[var(--navy)]">Mathematical Rigor</h3>
              <p className="text-xs text-[var(--ink)]/70 leading-relaxed">
                Every budget category sums to exactly 100%. No hidden variances. Every timeline
                dependency is chronologically validated against sunrise and sunset cues.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[var(--navy)]/10 shadow-sm space-y-3">
              <span className="p-2.5 rounded-xl bg-[var(--navy)] text-[var(--gold)] inline-block">
                <Award className="w-5 h-5" />
              </span>
              <h3 className="text-base font-bold text-[var(--navy)]">Artisan Quality</h3>
              <p className="text-xs text-[var(--ink)]/70 leading-relaxed">
                We curate only verified luxury vendors with proven track records. Direct client
                communication with zero hidden commission commissions.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[var(--navy)]/10 shadow-sm space-y-3">
              <span className="p-2.5 rounded-xl bg-[var(--navy)] text-[var(--gold)] inline-block">
                <Globe className="w-5 h-5" />
              </span>
              <h3 className="text-base font-bold text-[var(--navy)]">Cultural Authenticity</h3>
              <p className="text-xs text-[var(--ink)]/70 leading-relaxed">
                Deep understanding of diverse heritage rituals—from Marwari baraats and Jain food
                rules to multi-faith ceremonies and modern celebrations.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Band */}
        <section className="py-20 px-6 bg-[var(--navy)] text-white text-center mt-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ready to experience effortless celebration planning?
            </h2>
            <div className="pt-2">
              <Link href="/onboarding">
                <Button
                  variant="orange"
                  size="md"
                  className="font-bold text-[var(--ink)] shadow-xl"
                >
                  Start Planning Free <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
