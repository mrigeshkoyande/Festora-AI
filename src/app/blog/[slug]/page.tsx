"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Clock,
  Sparkles,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export default function BlogPostDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[var(--ink)]">
      <Navbar />

      <article className="pt-36 pb-20 px-6 max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--navy)] hover:text-[var(--orange)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Stories
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          <Badge variant="navy">Royal Heritage Weddings</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--navy)] leading-tight">
            The Ultimate Guide to Planning a Royal Destination Wedding in Jaipur
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--ink)]/60 pt-1">
            <span className="flex items-center gap-1.5 font-bold text-[var(--navy)]">
              <User className="w-3.5 h-3.5 text-[var(--orange)]" /> Priya Sharma (Principal Planner)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> October 24, 2026
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> 6 min read
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden border border-[var(--navy)]/10 shadow-xl max-h-[460px]">
          <img
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&auto=format&fit=crop"
            alt="Royal Jaipur Wedding"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[var(--navy)]/10 shadow-sm space-y-6 text-sm sm:text-base leading-relaxed text-[var(--ink)]/80">
          <p className="font-semibold text-lg text-[var(--navy)] leading-relaxed">
            Planning a luxury wedding in Rajasthan requires balancing regal 400-year-old palace architecture with contemporary culinary hospitality and precise spatial timing.
          </p>

          <h2 className="text-2xl font-bold text-[var(--navy)] pt-4">
            1. Locking Your Palace Venue & Acoustic Sound Restrictions
          </h2>
          <p>
            Jaipur&apos;s premier palace estates—such as Samode Palace, Fairmont, and Rambagh—enforce strict district decibel regulations. Outdoor amplified music must taper down by 22:00 IST to protect heritage wildlife corridors.
          </p>
          <p>
            When drafting your master timeline in Festora AI, always schedule acoustic brass and folk ensembles (like Manganiyar or Langa artists) for sunset poolside pheras, transitioning to enclosed Durbar ballrooms for post-midnight celebrations.
          </p>

          <h2 className="text-2xl font-bold text-[var(--navy)] pt-4">
            2. The 35/25/15 Budget Allocation Formula
          </h2>
          <p>
            Based on historical data from over 400 destination celebrations across Jaipur and Udaipur, top-tier budgets follow a deterministic distribution:
          </p>
          <ul className="space-y-2 list-disc pl-6 text-sm">
            <li><strong>35% — Palace Estate Buyout & Guest Hospitality:</strong> Accommodations and exclusive courtyard buyout fees.</li>
            <li><strong>25% — Multi-Course Gastronomy & Mixology:</strong> Specialized royal Rajputana and dedicated pure-Jain culinary counters.</li>
            <li><strong>15% — Floral & Spatial Decor:</strong> Scented marigold rigging, temple mandaps, and architectural brass lantern rigging.</li>
            <li><strong>15% — Cinematography & Heirloom Albums:</strong> Multi-camera documentary teams and aerial drone capture.</li>
            <li><strong>10% — Contingency & Logistics:</strong> Valet coordination, airport shuttles, and generator backups.</li>
          </ul>

          <div className="p-6 bg-[var(--bg)] rounded-2xl border border-[var(--navy)]/10 my-6">
            <h4 className="text-sm font-bold text-[var(--navy)] flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[var(--orange)]" /> Festora AI Pro-Tip
            </h4>
            <p className="text-xs text-[var(--ink)]/70">
              Run the AI Budget Optimizer in &quot;Balanced&quot; mode prior to paying vendor advances. This automatically locks off-peak negotiated rates and protects your 10% emergency reserve.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-8 bg-[var(--navy)] text-white rounded-3xl text-center space-y-4">
          <h3 className="text-2xl font-bold">Ready to build your royal celebration blueprint?</h3>
          <p className="text-xs text-white/80 max-w-md mx-auto">
            Generate your custom Jaipur wedding timeline, budget breakdown, and vendor checklist in 60 seconds.
          </p>
          <div className="pt-2">
            <Link href="/onboarding">
              <Button variant="orange" size="md" className="font-bold text-[var(--ink)] shadow-lg">
                Start Planning Free <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
