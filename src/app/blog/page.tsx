"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Calendar, User, ArrowRight, Sparkles, BookOpen } from "lucide-react";

const ARTICLES = [
  {
    slug: "how-to-plan-royal-jaipur-wedding",
    title: "The Ultimate Guide to Planning a Royal Destination Wedding in Jaipur",
    excerpt:
      "Budget splits, palace permit logistics, and authentic Rajasthani catering timelines decoded for the modern couple.",
    coverImage:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop",
    authorName: "Priya Sharma",
    date: "Oct 24, 2026",
    readTime: "6 min read",
    category: "Weddings",
  },
  {
    slug: "how-ai-prevents-wedding-budget-overruns",
    title: "How AI Budget Optimization Saves 15% on High-End Celebrations",
    excerpt:
      "Why traditional spreadsheets fail and how predictive formulas eliminate hidden vendor fee surprises.",
    coverImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop",
    authorName: "Marcus Vance",
    date: "Oct 20, 2026",
    readTime: "8 min read",
    category: "Financial Logistics",
  },
  {
    slug: "seating-harmony-social-conflict-resolution",
    title: "Mastering the Reception Floorplan: Resolving Social Dynamics with AI",
    excerpt:
      "Algorithmic guest grouping that optimizes elder comfort, side-by-side family harmony, and energetic dance floor proximity.",
    coverImage:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop",
    authorName: "Aarav Desai",
    date: "Oct 15, 2026",
    readTime: "5 min read",
    category: "Spatial Design",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[var(--ink)]">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* Hero Header */}
        <section className="pt-36 pb-16 px-6 max-w-7xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--navy)]/8 border border-[var(--navy)]/10 text-xs font-bold text-[var(--navy)]">
            <BookOpen className="w-3.5 h-3.5 text-[var(--orange)]" /> Festora Editorial & Event
            Intelligence
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[var(--navy)] max-w-3xl mx-auto">
            Insights for unforgettable celebrations.
          </h1>

          <p className="text-base text-[var(--ink)]/70 max-w-2xl mx-auto">
            Expert guides, destination blueprints, and GenAI event methodologies penned by seasoned
            luxury planners and financial architects.
          </p>
        </section>

        {/* Articles Grid */}
        <section className="py-12 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group bg-white rounded-3xl overflow-hidden border border-[var(--navy)]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-[var(--navy)]/10">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="navy">{article.category}</Badge>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-[var(--ink)]/50">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[var(--navy)] group-hover:text-[var(--orange)] transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-[var(--ink)]/70 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[var(--navy)]/8 flex items-center justify-between mt-4">
                  <span className="text-xs font-bold text-[var(--navy)] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[var(--orange)]" /> {article.authorName}
                  </span>

                  <span className="text-xs font-bold text-[var(--orange)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
