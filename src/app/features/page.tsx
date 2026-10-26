"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Sparkles,
  DollarSign,
  Calendar,
  Users,
  Grid,
  FileText,
  Clock,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  Zap,
  TrendingDown,
  Layers,
  HeartHandshake
} from "lucide-react";

export default function FeaturesPage() {
  const featureBlocks = [
    {
      title: "Autonomous AI Plan Architecture",
      subtitle: "From vision to minute-by-minute execution in under 60 seconds.",
      desc: "Festora's deep reasoning engine synthesizes event type, cultural nuances, guest count, and budgets into a complete phased roadmap with mathematical allocation formulas.",
      icon: Sparkles,
      tag: "GenAI Core",
      bullets: [
        "Dynamic multi-phase timeline generation",
        "Deterministic 100% budget sum guarantees",
        "Cultural ritual detection (Vedic pheras, Jain dietary, Sangeet choreography)",
        "Automated vendor contract timeline dependencies"
      ],
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop"
    },
    {
      title: "Predictive Budget Optimization",
      subtitle: "Stop spreadsheet drift. Unlock 12-18% safe vendor savings.",
      desc: "Simulate 3 budget scenarios with a single click: Conservative cut, Balanced, or VIP Luxury. Track committed vs actual expenses with automated receipt OCR ingestion.",
      icon: DollarSign,
      tag: "Financial Intelligence",
      bullets: [
        "3-scenario one-click budget optimizer",
        "Overspend real-time alerts and buffer protections",
        "Multi-currency support (INR, USD, EUR, GBP, AED)",
        "Instant PDF, CSV, and QuickBooks export formats"
      ],
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop"
    },
    {
      title: "Curated Artisan Vendor Marketplace",
      subtitle: "60+ pre-vetted luxury celebration specialists across 6 cities.",
      desc: "Direct quote requests with zero broker markups. Compare up to 3 vendors side-by-side on portfolio, verified client reviews, pricing tiers, and availability.",
      icon: HeartHandshake,
      tag: "Vendor Network",
      bullets: [
        "Side-by-side 3-vendor comparison matrix",
        "Direct RFQ dispatch with automated event parameters",
        "Integrated pipeline tracker (Shortlisted to Paid)",
        "Zero broker commissions or hidden agency fees"
      ],
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop"
    },
    {
      title: "Interactive Seating & Spatial Logistics",
      subtitle: "Harmonious table arrangements without the social friction.",
      desc: "Drag-and-drop 2D canvas with round and banquet table geometries. Festora AI auto-arranges guests based on relationship sides, VIP proximity, and dietary tags.",
      icon: Grid,
      tag: "Spatial Logistics",
      bullets: [
        "2D interactive round and rectangular table canvas",
        "AI Auto-Arranger based on guest groups and sides",
        "Real-time dietary requirement badge indicators",
        "High-resolution floorplan PDF printout for venue staff"
      ],
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[var(--ink)]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--navy)]/8 border border-[var(--navy)]/10 text-xs font-bold text-[var(--navy)]">
          <Sparkles className="w-3.5 h-3.5 text-[var(--orange)]" /> Production-Grade Event Technology
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--navy)] max-w-4xl mx-auto leading-[1.05]">
          Architected for unforgettable celebrations.
        </h1>

        <p className="text-base sm:text-lg text-[var(--ink)]/70 max-w-2xl mx-auto leading-relaxed">
          Explore the autonomous intelligence, real-time collaboration, and financial rigor that powers luxury weddings, galas, and milestone festivals globally.
        </p>

        <div className="pt-4 flex justify-center gap-4">
          <Link href="/onboarding">
            <Button variant="orange" size="md" className="font-bold text-[var(--ink)] shadow-lg">
              Start Planning Free <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="ghost" size="md" className="border border-[var(--navy)]/20 font-bold text-[var(--navy)]">
              View Pricing Tiers
            </Button>
          </Link>
        </div>
      </section>

      {/* Deep-Dive Feature Blocks */}
      <section className="py-16 px-6 max-w-7xl mx-auto space-y-20">
        {featureBlocks.map((block, index) => {
          const isReversed = index % 2 === 1;
          const Icon = block.icon;
          return (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                isReversed ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Text Side (6 cols) */}
              <div className={`space-y-6 ${isReversed ? "lg:col-span-6 lg:order-2" : "lg:col-span-6"}`}>
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-[var(--navy)] text-[var(--gold)]">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--orange)]">
                    {block.tag}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--navy)] leading-tight">
                  {block.title}
                </h2>

                <p className="text-sm font-semibold text-[var(--navy)]/80">
                  {block.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[var(--ink)]/70 leading-relaxed">
                  {block.desc}
                </p>

                <ul className="space-y-2.5 pt-2">
                  {block.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs text-[var(--ink)]">
                      <span className="w-4 h-4 rounded-full bg-[var(--navy)] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="w-3 h-3" />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual Side (6 cols) */}
              <div className={`relative ${isReversed ? "lg:col-span-6 lg:order-1" : "lg:col-span-6"}`}>
                <div className="relative rounded-3xl overflow-hidden border border-[var(--navy)]/15 shadow-2xl bg-[var(--navy)] h-[400px]">
                  <Image
                    src={block.image}
                    alt={block.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/60 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA Band */}
      <section className="py-24 px-6 bg-[var(--navy)] text-white text-center mt-20">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
            Experience the Future of Celebration Planning
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Plan your celebration with zero stress.
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto">
            Join thousands of couples, families, and professional planners who craft flaw-free events with Festora AI.
          </p>
          <div className="pt-2">
            <Link href="/onboarding">
              <Button variant="orange" size="md" className="font-bold text-[var(--ink)] shadow-xl">
                Start Crafting Your Blueprint <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
