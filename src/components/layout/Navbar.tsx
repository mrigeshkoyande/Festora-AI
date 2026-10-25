"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X, User, Sparkles, Play, Box } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Features",    href: "/features" },
    { label: "How It Works",href: "/#how-it-works" },
    { label: "Event Types", href: "/#event-types" },
    { label: "Pricing",     href: "/pricing" },
    { label: "Stories",     href: "/blog" },
  ];

  return (
    <>
      {/* ── Fixed full-width header shell ───────────────────────────── */}
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled ? "py-2" : "py-3"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Single glass pill row ─────────────────────────────────── */}
          <GlassSurface
            variant="strong"
            liquidRefraction
            transparent
            className={cn(
              "flex flex-row flex-nowrap items-center justify-between gap-3 px-4 sm:px-5 py-2.5 rounded-full border border-white/60",
              scrolled ? "shadow-xl" : "shadow-lg"
            )}
          >
            {/* ── Brand (left) ───────────────────────────────────────── */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group min-w-0">
              <div className="w-8 h-8 rounded-full bg-white/95 p-[3px] flex items-center justify-center shadow-sm border border-[#2C3E50]/10 overflow-hidden shrink-0">
                <Image
                  src="/brand/logo.png"
                  alt="Festora AI"
                  width={28}
                  height={28}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-grotesk font-extrabold text-[16px] tracking-tight text-[#2C3E50] hidden sm:block whitespace-nowrap">
                Festora&nbsp;AI
              </span>
            </Link>

            {/* ── Desktop centre nav links ──────────────────────────── */}
            <nav className="hidden lg:flex items-center flex-nowrap gap-0.5 bg-[#2C3E50]/6 px-1 py-1 rounded-full border border-[#2C3E50]/8">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap",
                      active
                        ? "bg-[#2C3E50] text-[#F8F9FA] shadow-sm"
                        : "text-[#1E272E]/70 hover:text-[#2C3E50] hover:bg-white/60"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* ── Desktop right actions (right) ─────────────────────── */}
            <div className="hidden md:flex items-center flex-nowrap gap-1.5 shrink-0">
              {/* 3-D intro replay — only on xl+ */}
              <button
                onClick={() => {
                  sessionStorage.removeItem("festora_intro_seen");
                  window.location.reload();
                }}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-[#2C3E50] bg-[#2C3E50]/6 hover:bg-[#2C3E50]/12 border border-[#2C3E50]/12 transition-colors whitespace-nowrap"
              >
                <Box className="w-3 h-3 text-[#E67E22]" />
                3D
              </button>

              <Link
                href="/login"
                className="px-3 py-1.5 rounded-full text-[11px] font-semibold text-[#1E272E] hover:bg-[#2C3E50]/6 transition-colors whitespace-nowrap"
              >
                Log&nbsp;In
              </Link>

              <Link
                href="/onboarding"
                className="flex items-center gap-1 px-3 py-2 rounded-full text-[11px] font-bold bg-[#E67E22] text-[#1E272E] hover:brightness-105 shadow-md shadow-[#E67E22]/25 transition-all whitespace-nowrap"
              >
                Start Free
                <ArrowRight className="w-3 h-3" />
              </Link>

              <Link
                href="/dashboard"
                className="w-8 h-8 rounded-full bg-[#2C3E50] flex items-center justify-center text-[#F8F9FA] hover:opacity-90 shadow-sm text-[11px] font-bold shrink-0"
                title="Open Workspace"
              >
                PS
              </Link>
            </div>

            {/* ── Mobile hamburger ──────────────────────────────────── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden ml-auto p-1.5 rounded-full hover:bg-[#2C3E50]/10 text-[#2C3E50] transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </GlassSurface>
        </div>

        {/* ── Mobile drop-down ──────────────────────────────────────── */}
        {mobileOpen && (
          <div className="md:hidden max-w-sm mx-4 mt-2">
            <GlassSurface
              variant="strong"
              className="p-5 rounded-3xl border border-white/70 shadow-2xl flex flex-col gap-3"
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2 rounded-2xl text-sm font-semibold text-[#1E272E] hover:bg-[#2C3E50]/8 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="border-t border-[#2C3E50]/10 pt-3 flex flex-col gap-2">
                <button
                  onClick={() => {
                    sessionStorage.removeItem("festora_intro_seen");
                    window.location.reload();
                  }}
                  className="w-full py-2 rounded-full text-xs font-bold text-[#2C3E50] border border-[#2C3E50]/20 flex items-center justify-center gap-1.5"
                >
                  <Box className="w-3.5 h-3.5 text-[#E67E22]" />
                  Replay 3D Intro
                </button>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-2 rounded-full text-xs font-bold text-center text-[#1E272E] border border-[#2C3E50]/15 hover:bg-[#2C3E50]/5 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/onboarding"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-2 rounded-full text-xs font-bold text-center bg-[#E67E22] text-[#1E272E] shadow"
                >
                  Start Planning Free
                </Link>
              </div>
            </GlassSurface>
          </div>
        )}
      </header>
    </>
  );
}
