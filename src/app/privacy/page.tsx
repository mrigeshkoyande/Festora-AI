"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[var(--ink)]">
      <Navbar />

      <main className="pt-36 pb-20 px-6 max-w-4xl mx-auto space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--navy)]">
            <Lock className="w-3.5 h-3.5 text-[var(--orange)]" /> Data Protection & Confidentiality
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[var(--navy)]">Privacy Policy</h1>
          <p className="text-xs text-[var(--ink)]/50">Last updated: October 25, 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[var(--navy)]/10 shadow-sm space-y-6 text-xs sm:text-sm leading-relaxed text-[var(--ink)]/80">
          <h2 className="text-lg font-bold text-[var(--navy)]">1. Confidentiality of Celebration Data</h2>
          <p>
            At Festora AI, we understand that wedding guest lists, budgets, personal dietary health requirements, and private family phone numbers represent highly sensitive personal information. We enforce strict multi-tenant Row-Level Security (RLS) and end-to-end encryption for all stored financial and guest records.
          </p>

          <h2 className="text-lg font-bold text-[var(--navy)]">2. How We Use Generative AI</h2>
          <p>
            When you invoke the Festora AI Copilot or Budget Optimizer, your event parameters are processed via private enterprise endpoints. Your private guest identities, budget amounts, and vendor contracts are **never used to train public foundation models**.
          </p>

          <h2 className="text-lg font-bold text-[var(--navy)]">3. Data Sharing with Verified Vendors</h2>
          <p>
            We only share contact details with vendors when you explicitly submit a Request for Quote (RFQ) or confirm a direct booking. We do not sell, rent, or monetize your celebration data to third-party advertising brokers.
          </p>

          <h2 className="text-lg font-bold text-[var(--navy)]">4. Your Rights & Data Export</h2>
          <p>
            You hold complete ownership of your event blueprint. You may export your entire event dataset (guests, budgets, seating allocations, contracts) at any time in standard CSV or PDF formats, or request permanent cryptographic erasure from our servers.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
