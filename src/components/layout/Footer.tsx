import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full bg-navy text-bg pt-20 pb-12 overflow-hidden border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center shadow-sm shrink-0">
                <Image
                  src="/brand/logo.png"
                  alt="Festora AI Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <span className="font-grotesk font-extrabold text-2xl tracking-tight text-bg">
                Festora AI
              </span>
            </div>
            <p className="text-bg/70 text-sm max-w-sm leading-relaxed">
              Autonomous, GenAI-powered celebration & event planning web application. Orchestrating high-end weddings, milestone birthdays, and corporate galas with mathematical precision.
            </p>
            <div className="text-xs text-gold font-semibold uppercase tracking-wider">
              Plan the day. Keep the magic.
            </div>
          </div>

          {/* Nav Col 1 */}
          <div className="md:col-span-2 md:col-start-7 flex flex-col gap-3">
            <span className="font-grotesk text-xs uppercase tracking-widest text-gold font-bold">
              Product
            </span>
            <Link href="/features" className="text-sm text-bg/80 hover:text-bg transition-colors">
              Features
            </Link>
            <Link href="/#how-it-works" className="text-sm text-bg/80 hover:text-bg transition-colors">
              How It Works
            </Link>
            <Link href="/pricing" className="text-sm text-bg/80 hover:text-bg transition-colors">
              Pricing Plans
            </Link>
            <Link href="/vendors" className="text-sm text-bg/80 hover:text-bg transition-colors">
              Vendor Directory
            </Link>
            <Link href="/dashboard" className="text-sm text-bg/80 hover:text-bg transition-colors">
              Client Dashboard
            </Link>
          </div>

          {/* Nav Col 2 */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <span className="font-grotesk text-xs uppercase tracking-widest text-gold font-bold">
              Event Types
            </span>
            <Link href="/onboarding" className="text-sm text-bg/80 hover:text-bg transition-colors">
              Royal Weddings
            </Link>
            <Link href="/onboarding" className="text-sm text-bg/80 hover:text-bg transition-colors">
              Corporate Galas
            </Link>
            <Link href="/onboarding" className="text-sm text-bg/80 hover:text-bg transition-colors">
              Milestone Birthdays
            </Link>
            <Link href="/onboarding" className="text-sm text-bg/80 hover:text-bg transition-colors">
              Community Festivals
            </Link>
          </div>

          {/* Nav Col 3 */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <span className="font-grotesk text-xs uppercase tracking-widest text-gold font-bold">
              Company
            </span>
            <Link href="/about" className="text-sm text-bg/80 hover:text-bg transition-colors">
              About Festora
            </Link>
            <Link href="/blog" className="text-sm text-bg/80 hover:text-bg transition-colors">
              Editorial Blog
            </Link>
            <Link href="/contact" className="text-sm text-bg/80 hover:text-bg transition-colors">
              Concierge Contact
            </Link>
            <Link href="/privacy" className="text-sm text-bg/80 hover:text-bg transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-bg/80 hover:text-bg transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Giant Wordmark */}
        <div className="pt-12 pb-6 text-center select-none overflow-hidden">
          <div className="font-grotesk font-black text-6xl sm:text-8xl md:text-[140px] leading-none tracking-tighter text-bg/10 hover:text-bg/15 transition-colors">
            FESTORA AI
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-bg/60">
          <p>© {new Date().getFullYear()} Festora AI. All rights reserved. Crafted with liquid glass & intelligence.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-bg transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-bg transition-colors">
              Terms
            </Link>
            <Link href="/sitemap.xml" className="hover:text-bg transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
