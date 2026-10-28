"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[var(--ink)]">
      <Navbar />

      <main className="pt-36 pb-20 px-6 max-w-4xl mx-auto space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--navy)]">
            <FileText className="w-3.5 h-3.5 text-[var(--orange)]" /> Legal Agreement
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[var(--navy)]">Terms of Service</h1>
          <p className="text-xs text-[var(--ink)]/50">Last updated: October 25, 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[var(--navy)]/10 shadow-sm space-y-6 text-xs sm:text-sm leading-relaxed text-[var(--ink)]/80">
          <h2 className="text-lg font-bold text-[var(--navy)]">1. Acceptance of Terms</h2>
          <p>
            By accessing or subscribing to the Festora AI platform (&quot;Service&quot;), you agree
            to be bound by these Terms of Service. If you are entering into this agreement on behalf
            of an event planning firm or enterprise client, you represent that you possess the
            requisite authority.
          </p>

          <h2 className="text-lg font-bold text-[var(--navy)]">2. AI Assistance Disclaimer</h2>
          <p>
            Festora AI generates estimates, timelines, and vendor recommendations based on
            historical patterns and predictive algorithms. While we strive for absolute logistical
            precision, all vendor contracts, permits, liquor licensing, and structural safety
            requirements remain the final legal responsibility of the host or licensed event
            planner. Always review AI-generated schedules before locking binding deposits.
          </p>

          <h2 className="text-lg font-bold text-[var(--navy)]">3. Subscription & Refunds</h2>
          <p>
            Festora Pro and Agency plans are billed on a recurring monthly or annual basis. You may
            cancel your subscription at any time via your workspace billing portal. We offer a
            30-day money-back guarantee for first-time annual subscriptions.
          </p>

          <h2 className="text-lg font-bold text-[var(--navy)]">4. Vendor Relationships</h2>
          <p>
            Festora AI operates as a discovery and comparison platform. Contractual obligations
            entered into between clients and independent third-party vendors (venues, caterers,
            photographers, musicians) are direct legal agreements between those parties.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
