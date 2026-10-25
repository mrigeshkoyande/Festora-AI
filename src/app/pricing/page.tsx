"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  HelpCircle,
  Zap
} from "lucide-react";

export default function PricingPage() {
  const [annualBilling, setAnnualBilling] = useState(true);

  const tiers = [
    {
      name: "Starter Celebration",
      price: "$0",
      period: "forever free",
      tagline: "Ideal for intimate birthdays, family dinners, and single milestone events.",
      isPopular: false,
      features: [
        "1 Active Event Planning Workspace",
        "Up to 75 Guests & Basic RSVP Tracking",
        "Standard Checklist & Due Date Reminders",
        "10 AI Planning Prompts per month",
        "Community Support"
      ],
      cta: "Get Started Free",
      href: "/onboarding",
      variant: "ghost" as const
    },
    {
      name: "Festora Professional",
      price: annualBilling ? "$39" : "$49",
      period: "per month, billed annually",
      tagline: "The premier suite for grand weddings, luxury galas, and complex multi-day events.",
      isPopular: true,
      features: [
        "Unlimited Events & Multi-Day Itineraries",
        "Up to 500 Guests with WhatsApp RSVP API",
        "3-Scenario AI Budget Optimizer & OCR Receipts",
        "5,000 AI Copilot Generations / month",
        "Curated Vendor Directory & 3-Way Comparisons",
        "Interactive 2D Seating Chart & AI Auto-Arranger",
        "Day-Of Live Run Sheet with Offline PWA Mode",
        "Custom Public Celebration Microsite"
      ],
      cta: "Start 14-Day Free Trial",
      href: "/onboarding",
      variant: "orange" as const
    },
    {
      name: "Planner & Agency",
      price: annualBilling ? "$159" : "$199",
      period: "per month, billed annually",
      tagline: "Full-service multi-client architecture for professional event firms and studios.",
      isPopular: false,
      features: [
        "Unlimited Events across Unlimited Client Accounts",
        "Unlimited Guests & Multi-Tenant Workspaces",
        "White-Label Public Microsites & Custom Domains",
        "Dedicated Account Executive & SLA",
        "Unlimited Gemini 1.5 Flash AI Generations",
        "Custom ERP / Accounting & Zapier Integrations",
        "Custom Contract Escrow & Vendor Payout Routing"
      ],
      cta: "Contact Enterprise Sales",
      href: "/contact",
      variant: "ghost" as const
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[var(--ink)]">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-36 pb-16 px-6 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--navy)]/8 border border-[var(--navy)]/10 text-xs font-bold text-[var(--navy)]">
          <CreditCard className="w-3.5 h-3.5 text-[var(--orange)]" /> Transparent, Predictable Investment
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--navy)] max-w-4xl mx-auto leading-[1.05]">
          Predictable pricing for monumental events.
        </h1>

        <p className="text-base sm:text-lg text-[var(--ink)]/70 max-w-2xl mx-auto">
          No hidden surprise broker fees or commission cuts on your vendor contracts. Choose the plan that fits your celebration scale.
        </p>

        {/* Billing Switcher */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-bold ${!annualBilling ? "text-[var(--navy)]" : "text-[var(--ink)]/50"}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setAnnualBilling(!annualBilling)}
            className="w-14 h-8 bg-[var(--navy)] rounded-full p-1 relative transition-colors cursor-pointer"
          >
            <div
              className={`w-6 h-6 rounded-full bg-[var(--gold)] transition-transform ${
                annualBilling ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`text-xs font-bold flex items-center gap-1.5 ${annualBilling ? "text-[var(--navy)]" : "text-[var(--ink)]/50"}`}>
            Annual Billing
            <Badge variant="gold" className="text-[10px] px-2 py-0.5">Save 20%</Badge>
          </span>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="py-8 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                tier.isPopular
                  ? "bg-white border-2 border-[var(--orange)] shadow-2xl scale-105 z-10"
                  : "bg-white border border-[var(--navy)]/15 shadow-sm hover:shadow-lg"
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[var(--orange)] text-[var(--ink)] font-black text-xs px-4 py-1 rounded-full uppercase tracking-wider shadow">
                  Most Popular for Weddings
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-extrabold text-[var(--navy)]">{tier.name}</h3>
                  <p className="text-xs text-[var(--ink)]/60 mt-1 min-h-[36px]">{tier.tagline}</p>
                </div>

                <div className="pt-2 pb-4 border-b border-[var(--navy)]/10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black text-[var(--navy)]">{tier.price}</span>
                    <span className="text-xs text-[var(--ink)]/50 font-bold">/ month</span>
                  </div>
                  <span className="text-[10px] text-[var(--ink)]/50 block mt-1">{tier.period}</span>
                </div>

                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--navy)]">What's Included:</span>
                  <ul className="space-y-2.5">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-[var(--ink)]/80">
                        <span className="w-4 h-4 rounded-full bg-[var(--navy)] text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <Link href={tier.href}>
                  <Button
                    variant={tier.variant}
                    size="md"
                    className={`w-full font-bold shadow-md ${
                      tier.isPopular ? "text-[var(--ink)]" : "text-[var(--navy)] border border-[var(--navy)]/20"
                    }`}
                  >
                    {tier.cta} <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center space-y-4">
        <div className="p-6 bg-white rounded-3xl border border-[var(--navy)]/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <ShieldCheck className="w-8 h-8 text-[var(--navy)] shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-[var(--navy)]">30-Day Happiness Guarantee</h4>
              <p className="text-xs text-[var(--ink)]/60">
                Cancel anytime with 1-click. Full refund if Festora does not save you at least 10 hours in your first 30 days.
              </p>
            </div>
          </div>
          <Badge variant="navy" className="shrink-0 font-bold px-3 py-1">
            Zero Risk
          </Badge>
        </div>
      </section>

      <Footer />
    </div>
  );
}
