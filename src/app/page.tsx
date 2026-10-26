"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Play,
  Star,
  Clock,
  IndianRupee,
  Sparkles,
  Bot,
  ShieldCheck,
  PieChart,
  Users,
  Send,
  Check,
  ChevronDown,
  Calendar,
  Layers,
  Heart,
  Briefcase,
  PartyPopper,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { BentoCard } from "@/components/ui/Card";
import { StatBlock } from "@/components/ui/StatBlock";
import { Marquee } from "@/components/ui/Marquee";
import { AccordionItem } from "@/components/ui/Tabs";
import { Dialog } from "@/components/ui/Dialog";
import { fireFestoraConfetti } from "@/components/ui/Confetti";
import { Opening3DAnimation } from "@/components/ui/Opening3DAnimation";
import { HeroPriceDeck } from "@/components/ui/HeroPriceDeck";

export default function LandingPage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  // Live AI Demo state
  const [chatMessages, setChatMessages] = useState<
    { role: "ai" | "user"; text: string; time?: string }[]
  >([
    {
      role: "ai",
      text: "Namaste! I am your Festora AI coordinator. What celebration are we designing today? (e.g. 150-guest Jaipur royal wedding, 7th birthday carnival, or Diwali corporate gala)",
      time: "Just now",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setChatMessages((prev) => [
      ...prev,
      { role: "user", text: userText, time: "Just now" },
    ]);
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      let aiReply = `Synthesizing logistics for "${userText}"... I have generated a structured preliminary blueprint: 42% venue & catering allocation, 3 vetted regional vendors, and a 6-phase production timeline.`;
      if (userText.toLowerCase().includes("wedding")) {
        aiReply = `Perfect! For a royal wedding celebration, Festora AI has locked in: 1) Sangeet & Mehendi multi-day timeline, 2) Mandap floral rigging specs, and 3) Jain & Marwari catering splits. View your full draft in Onboarding!`;
      } else if (userText.toLowerCase().includes("birthday")) {
        aiReply = `Delightful! For a milestone birthday, Festora AI recommends: 1) Themed immersive photo booths, 2) Interactive dessert stations, and 3) Live DJ & magician booking pipeline.`;
      }

      setChatMessages((prev) => [
        ...prev,
        { role: "ai", text: aiReply, time: "Just now" },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handlePromptChipClick = (promptText: string) => {
    setChatInput(promptText);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-bg text-ink overflow-x-hidden">
      {/* 3D Cinematic Opening Animation */}
      <Opening3DAnimation />

      {/* 1. FIXED LIQUID GLASS NAVBAR */}
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 w-full pt-28 outline-none">
        {/* 2. HERO SECTION */}
        <section className="relative pt-12 pb-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
          {/* Ambient Drifting Liquid Glowing Blobs */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-orange/15 blur-3xl pointer-events-none animate-blob-slow" />
          <div className="absolute top-1/2 -left-32 w-96 h-96 rounded-full bg-gold/15 blur-3xl pointer-events-none animate-blob-reverse" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-navy/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              {/* Oversized Tight Grotesk Headline */}
              <h1 className="font-grotesk text-5xl sm:text-7xl lg:text-[88px] font-extrabold leading-[0.98] tracking-tight text-navy">
                Plan the day. <br />
                <span className="text-orange">Keep the magic.</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-ink/75 max-w-xl leading-relaxed">
                Festora AI orchestrates every detail from concept to final toast. Eliminate coordination friction, discover verified world-class vendors, and execute flawless celebrations effortlessly.
              </p>

              {/* CTA Cluster */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/onboarding">
                  <Button
                    variant="orange"
                    size="lg"
                    iconRight={<ArrowRight className="w-4 h-4" />}
                  >
                    Start Planning Free
                  </Button>
                </Link>
                <Button
                  variant="glass"
                  size="lg"
                  icon={<Play className="w-4 h-4 text-navy fill-current" />}
                  onClick={() => setDemoModalOpen(true)}
                >
                  Watch Demo
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4 pt-4 border-t border-navy/10 w-full max-w-lg">
                <div className="flex -space-x-3">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                    alt="Planner portrait"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                    alt="Planner portrait"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces"
                    alt="Planner portrait"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center text-gold gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-ink/70">
                    Trusted by 15,000+ top-tier planners globally
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual with Hover Blur & Collapsible Price Deck */}
            <div className="lg:col-span-5 relative group">
              <div className="relative w-full min-h-[540px] sm:min-h-[580px] rounded-card-lg overflow-hidden shadow-2xl bg-navy flex flex-col justify-between p-5 sm:p-6 transition-all duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&auto=format&fit=crop"
                  alt="Luxury Celebration Setting"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center brightness-90 group-hover:brightness-[0.65] group-hover:blur-md group-hover:scale-105 transition-all duration-700 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-navy/40 pointer-events-none transition-opacity duration-500 group-hover:opacity-95" />

                {/* Top Floating Glass UI Card: Timeline Status */}
                <GlassSurface
                  variant="strong"
                  className="relative p-3.5 sm:p-4 shadow-xl border border-white/70 backdrop-blur-md z-10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center text-navy shrink-0">
                        <Clock className="w-5 h-5 text-navy" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-navy">Timeline Optimized</p>
                        <p className="text-[11px] text-ink/70">All vendor arrivals synchronized</p>
                      </div>
                    </div>
                    <Badge variant="orange">98% Match</Badge>
                  </div>
                </GlassSurface>

                {/* Interactive Collapsible Price Deck: Card-by-Card Display of All Prices */}
                <div className="relative z-20 mt-auto pt-4">
                  <HeroPriceDeck />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. MARQUEE STRIP */}
        <Marquee />

        {/* 4. STATS BAND */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatBlock
              eyebrow="Time Efficiency"
              value="40%"
              description="Average time saved on manual vendor follow-ups, timeline synchronizations, and contract reconciliations."
              accentColor="orange"
            />
            <StatBlock
              eyebrow="Curated Network"
              value="2.3x"
              description="More verified high-caliber catering, decor, and photography artists matched compared to legacy directories."
              accentColor="gold"
            />
            <StatBlock
              eyebrow="Financial Precision"
              value="92%"
              description="Of celebrations planned with Festora AI stay strictly within target budget without surprise fees."
              accentColor="navy"
            />
          </div>
        </section>

        {/* 5. FEATURES BENTO GRID */}
        <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-orange block mb-2">
              Comprehensive Suite
            </span>
            <h2 className="font-grotesk text-4xl sm:text-5xl font-extrabold text-navy">
              Everything your celebration needs, in one place
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Feature 1 (8-Col) */}
            <BentoCard
              title="AI Copilot for Real-Time Logistics"
              subtitle="Our generative engine automatically detects scheduling conflicts when vendor arrivals shift, instantly notifying all stakeholders."
              icon={<Bot className="w-6 h-6 text-navy" />}
              badge={<Badge variant="orange">Real-Time Sync</Badge>}
              className="md:col-span-8 min-h-[380px]"
              bgImage="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop"
            >
              <div className="mt-8 flex flex-wrap gap-2">
                <Badge variant="default">Dependency Mapping</Badge>
                <Badge variant="gold">Critical Path Alerts</Badge>
                <Badge variant="default">WhatsApp Broadcasts</Badge>
              </div>
            </BentoCard>

            {/* Feature 2 (4-Col) */}
            <BentoCard
              title="Curated Vetted Vendors"
              subtitle="Hand-picked caterers, photographers, decor artists, and venues with verified reviews and quote comparisons."
              icon={<ShieldCheck className="w-6 h-6 text-navy" />}
              badge={<Badge variant="gold">60+ Partners</Badge>}
              className="md:col-span-4 min-h-[380px]"
            >
              <div className="p-4 rounded-card bg-bg border border-navy/10 mt-6">
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span>Match Rate Threshold</span>
                  <span className="text-orange">95%+</span>
                </div>
                <div className="w-full bg-navy/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-orange h-full rounded-full w-[95%]" />
                </div>
              </div>
            </BentoCard>

            {/* Feature 3 (4-Col) */}
            <BentoCard
              title="Dynamic Budgeting"
              subtitle="Smart allocation formulas that track deposits, taxes, and gratuities without messy, broken spreadsheets."
              icon={<PieChart className="w-6 h-6 text-navy" />}
              badge={<Badge variant="default">Multi-Currency</Badge>}
              className="md:col-span-4 min-h-[380px]"
            >
              <div className="p-4 rounded-card bg-bg border border-navy/10 mt-6">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-ink/70">Safe Buffer</span>
                  <span className="font-bold text-navy">₹5.08 Lakhs</span>
                </div>
              </div>
            </BentoCard>

            {/* Feature 4 (8-Col) */}
            <BentoCard
              title="Seamless Client & Team Collaboration"
              subtitle="Invite co-planners, family members, or clients with granular role permissions. Share moodboards, approve quotes, and assign tasks with single taps."
              icon={<Users className="w-6 h-6 text-navy" />}
              badge={<Badge variant="orange">Multi-Role</Badge>}
              className="md:col-span-8 min-h-[380px]"
              bgImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"
            >
              <div className="mt-8 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <span className="w-8 h-8 rounded-full bg-navy text-bg flex items-center justify-center text-xs font-bold border-2 border-white">
                    JD
                  </span>
                  <span className="w-8 h-8 rounded-full bg-orange text-ink flex items-center justify-center text-xs font-bold border-2 border-white">
                    AR
                  </span>
                  <span className="w-8 h-8 rounded-full bg-gold text-ink flex items-center justify-center text-xs font-bold border-2 border-white">
                    SC
                  </span>
                </div>
                <span className="text-xs font-medium text-ink/70">
                  Real-time cursor collaboration & commenting active
                </span>
              </div>
            </BentoCard>
          </div>
        </section>

        {/* 6. HOW IT WORKS (Sticky Methodology) */}
        <section id="how-it-works" className="py-24 bg-navy text-bg my-12 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
            <div className="text-center mb-16">
              <span className="text-xs uppercase font-bold tracking-widest text-gold block mb-2">
                Methodology
              </span>
              <h2 className="font-grotesk text-4xl sm:text-5xl font-extrabold text-bg">
                From concept to execution in 4 steps
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div className="bg-white/8 backdrop-blur-md p-8 rounded-card border border-white/10 hover:border-gold/40 transition-colors">
                  <span className="text-gold font-bold text-xs uppercase tracking-widest mb-2 block">
                    STEP 01
                  </span>
                  <h3 className="font-grotesk text-2xl font-bold text-bg mb-2">
                    Define Your Vision
                  </h3>
                  <p className="text-bg/75 text-sm leading-relaxed">
                    Input event goals, guest count, aesthetic style preferences, and overall target budget into our intelligent 7-step intake wizard.
                  </p>
                </div>

                <div className="bg-white/8 backdrop-blur-md p-8 rounded-card border border-white/10 hover:border-gold/40 transition-colors">
                  <span className="text-gold font-bold text-xs uppercase tracking-widest mb-2 block">
                    STEP 02
                  </span>
                  <h3 className="font-grotesk text-2xl font-bold text-bg mb-2">
                    AI Blueprint Generation
                  </h3>
                  <p className="text-bg/75 text-sm leading-relaxed">
                    Festora AI instantly compiles a tailored master blueprint: budget splits, vendor shortlists, milestone timeline, and cultural ritual checklists.
                  </p>
                </div>
              </div>

              <div className="space-y-8 md:mt-12">
                <div className="bg-white/8 backdrop-blur-md p-8 rounded-card border border-white/10 hover:border-gold/40 transition-colors">
                  <span className="text-gold font-bold text-xs uppercase tracking-widest mb-2 block">
                    STEP 03
                  </span>
                  <h3 className="font-grotesk text-2xl font-bold text-bg mb-2">
                    One-Click Booking & Syncing
                  </h3>
                  <p className="text-bg/75 text-sm leading-relaxed">
                    Compare quotes, review contracts, secure dates, and sync all vendor production schedules into a unified master timeline automatically.
                  </p>
                </div>

                <div className="bg-white/8 backdrop-blur-md p-8 rounded-card border border-white/10 hover:border-gold/40 transition-colors">
                  <span className="text-gold font-bold text-xs uppercase tracking-widest mb-2 block">
                    STEP 04
                  </span>
                  <h3 className="font-grotesk text-2xl font-bold text-bg mb-2">
                    Flawless Day-Of Execution
                  </h3>
                  <p className="text-bg/75 text-sm leading-relaxed">
                    Rely on our real-time mobile run sheet to manage cues, vendor check-ins, tap-to-call contacts, and last-minute contingencies smoothly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. EVENT TYPES PHOTO CARDS */}
        <section id="event-types" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-orange block mb-2">
                Specializations
              </span>
              <h2 className="font-grotesk text-4xl sm:text-5xl font-extrabold text-navy">
                Designed for every extraordinary occasion
              </h2>
            </div>
            <p className="text-ink/70 text-sm max-w-md">
              Trained on thousands of high-end events across diverse traditions, cultures, and formats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Weddings */}
            <div className="group relative h-[480px] rounded-card-lg overflow-hidden bg-navy shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop"
                alt="Luxury Indian Wedding"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end">
                <Badge variant="gold" className="w-fit mb-3">Weddings</Badge>
                <h3 className="font-grotesk text-3xl font-bold text-bg mb-2">
                  Bespoke Nuptials
                </h3>
                <p className="text-bg/80 text-sm leading-relaxed">
                  From intimate destination elopements to grand 3-day multi-ceremony celebrations with Sangeet, Mehendi, and Pheras.
                </p>
              </div>
            </div>

            {/* Card 2: Corporate */}
            <div className="group relative h-[480px] rounded-card-lg overflow-hidden bg-navy shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop"
                alt="Corporate Gala & Summit"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end">
                <Badge variant="orange" className="w-fit mb-3">Corporate</Badge>
                <h3 className="font-grotesk text-3xl font-bold text-bg mb-2">
                  Conferences & Galas
                </h3>
                <p className="text-bg/80 text-sm leading-relaxed">
                  Brand experiences, keynote summits, product launches, and VIP award receptions with seamless guest registration.
                </p>
              </div>
            </div>

            {/* Card 3: Social & Milestones */}
            <div className="group relative h-[480px] rounded-card-lg overflow-hidden bg-navy shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop"
                alt="Milestone Birthday Party"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end">
                <Badge variant="default" className="w-fit mb-3 bg-bg text-navy">Private Milestones</Badge>
                <h3 className="font-grotesk text-3xl font-bold text-bg mb-2">
                  Milestone Parties
                </h3>
                <p className="text-bg/80 text-sm leading-relaxed">
                  Decade birthdays, anniversaries, neighbourhood Diwali melas, and private club gatherings with custom themes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. LIVE INTERACTIVE AI DEMO CHAT PANEL */}
        <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto w-full">
          <div className="bg-navy text-bg p-8 md:p-12 rounded-card-lg relative overflow-hidden shadow-2xl border border-white/10">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-orange/15 blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-gold animate-ping" />
                <h3 className="font-grotesk font-bold text-xl text-bg">
                  Festora AI Assistant (Live Preview)
                </h3>
              </div>
              <Badge variant="gold">Interactive Demo</Badge>
            </div>

            {/* Suggestion Chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                type="button"
                onClick={() =>
                  handlePromptChipClick("Plan a 150-guest royal wedding in Jaipur with ₹45 Lakhs budget")
                }
                className="text-xs px-3 py-1.5 rounded-pill bg-white/10 hover:bg-white/20 text-bg transition-colors cursor-pointer"
              >
                ✨ 150-guest Jaipur wedding
              </button>
              <button
                type="button"
                onClick={() =>
                  handlePromptChipClick("Organize a 7th birthday superhero carnival for 40 kids")
                }
                className="text-xs px-3 py-1.5 rounded-pill bg-white/10 hover:bg-white/20 text-bg transition-colors cursor-pointer"
              >
                🎉 7th birthday carnival
              </button>
              <button
                type="button"
                onClick={() =>
                  handlePromptChipClick("Annual corporate awards gala for 300 tech executives")
                }
                className="text-xs px-3 py-1.5 rounded-pill bg-white/10 hover:bg-white/20 text-bg transition-colors cursor-pointer"
              >
                🏢 300-person Corporate gala
              </button>
            </div>

            {/* Message History */}
            <div className="space-y-4 mb-6 max-h-[320px] overflow-y-auto pr-2">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "ai" && (
                    <div className="w-8 h-8 rounded-full bg-gold text-ink flex items-center justify-center font-bold text-xs shrink-0">
                      AI
                    </div>
                  )}
                  <div
                    className={`p-4 rounded-card text-sm leading-relaxed max-w-lg ${
                      msg.role === "user"
                        ? "bg-orange text-ink font-semibold"
                        : "bg-white/10 text-bg border border-white/10"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-white/20 text-bg flex items-center justify-center font-bold text-xs shrink-0">
                      You
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 items-center text-xs text-gold animate-pulse pl-11">
                  Festora AI is synthesizing budget allocations & timelines...
                </div>
              )}
            </div>

            {/* Input Composer */}
            <form onSubmit={handleSendChat} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask Festora AI anything about your upcoming event..."
                className="flex-1 bg-white/10 border border-white/15 px-6 py-4 rounded-pill text-bg placeholder:text-bg/40 focus:outline-none focus:ring-2 focus:ring-gold text-sm"
              />
              <Button variant="orange" type="submit" icon={<Send className="w-4 h-4" />}>
                Send
              </Button>
            </form>
          </div>
        </section>

        {/* 9. TESTIMONIALS */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-orange block mb-2">
              Testimonials
            </span>
            <h2 className="font-grotesk text-4xl sm:text-5xl font-extrabold text-navy">
              Loved by elite celebration planners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-card-lg border border-navy/12 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-gold gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-base text-ink leading-relaxed mb-6">
                  &ldquo;Festora AI cut our planning time in half. The vendor matching algorithm and automatic contract milestone tracking are genuinely revolutionary.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-navy/8">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
                  alt="Claire Dupond"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-navy text-sm">Claire Dupond</p>
                  <p className="text-xs text-ink/60">Principal, Atelier Lumiere</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-card-lg border border-navy/12 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-gold gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-base text-ink leading-relaxed mb-6">
                  &ldquo;We managed a 500-guest summit in Mumbai with zero friction. The real-time timeline rescheduling saved us during unexpected monsoon showers.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-navy/8">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                  alt="Marcus Vance"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-navy text-sm">Marcus Vance</p>
                  <p className="text-xs text-ink/60">VP Events, Nexus Global</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-card-lg border border-navy/12 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-gold gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-base text-ink leading-relaxed mb-6">
                  &ldquo;The budget optimization scenarios alone saved our clients over ₹6 Lakhs while boosting decor quality. An absolute masterpiece tool.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-navy/8">
                <Image
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop"
                  alt="Elena Rostova"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-navy text-sm">Elena Rostova</p>
                  <p className="text-xs text-ink/60">Founder, Vela Celebrations</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. PRICING SECTION */}
        <section id="pricing" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-orange block mb-2">
              Investment
            </span>
            <h2 className="font-grotesk text-4xl sm:text-5xl font-extrabold text-navy">
              Simple, transparent pricing
            </h2>
            <div className="mt-6 inline-flex p-1 rounded-pill bg-navy/8 border border-navy/12">
              <button
                type="button"
                onClick={() => setBillingPeriod("monthly")}
                className={`px-5 py-2 rounded-pill text-xs font-semibold tracking-wide transition-all ${
                  billingPeriod === "monthly"
                    ? "bg-navy text-bg shadow-sm"
                    : "text-ink/70 hover:text-ink"
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setBillingPeriod("yearly")}
                className={`px-5 py-2 rounded-pill text-xs font-semibold tracking-wide transition-all ${
                  billingPeriod === "yearly"
                    ? "bg-navy text-bg shadow-sm"
                    : "text-ink/70 hover:text-ink"
                }`}
              >
                Yearly (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Starter Tier */}
            <div className="bg-white p-8 rounded-card-lg border border-navy/12 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-ink/60">
                  Starter
                </span>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="font-grotesk text-5xl font-extrabold text-navy">₹0</span>
                  <span className="text-xs text-ink/60 font-semibold">/ forever</span>
                </div>
                <p className="text-sm text-ink/70 mb-8">
                  Perfect for personal celebrations, birthdays, and family parties.
                </p>
                <ul className="space-y-4 mb-8 text-sm text-ink">
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-navy shrink-0" /> Up to 50 guests
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-navy shrink-0" /> Basic AI timeline generator
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-navy shrink-0" /> Standard vendor directory
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-navy shrink-0" /> Export to CSV
                  </li>
                </ul>
              </div>
              <Link href="/onboarding">
                <Button variant="outline" className="w-full">
                  Get Started Free
                </Button>
              </Link>
            </div>

            {/* Professional Tier (Highlighted Liquid Glass Card) */}
            <GlassSurface
              variant="strong"
              className="p-8 border-2 border-orange/40 shadow-2xl flex flex-col justify-between relative scale-105"
            >
              <div className="absolute -top-3.5 right-8">
                <Badge variant="orange">Most Popular</Badge>
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-orange">
                  Professional
                </span>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="font-grotesk text-5xl font-extrabold text-navy">
                    {billingPeriod === "monthly" ? "₹3,999" : "₹3,199"}
                  </span>
                  <span className="text-xs text-ink/60 font-semibold">/ month</span>
                </div>
                <p className="text-sm text-ink/70 mb-8">
                  Built for professional event planners and high-end luxury weddings.
                </p>
                <ul className="space-y-4 mb-8 text-sm text-ink">
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-orange shrink-0" /> Unlimited guests & RSVPs
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-orange shrink-0" /> Advanced AI Copilot with tool execution
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-orange shrink-0" /> Verified elite vendor quoting
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-orange shrink-0" /> Real-time budget optimizer (3 scenarios)
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-orange shrink-0" /> Public celebration website & QR code
                  </li>
                </ul>
              </div>
              <Link href="/onboarding">
                <Button variant="orange" size="lg" className="w-full">
                  Start 14-Day Free Trial
                </Button>
              </Link>
            </GlassSurface>

            {/* Enterprise Tier */}
            <div className="bg-white p-8 rounded-card-lg border border-navy/12 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-ink/60">
                  Agency & Enterprise
                </span>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="font-grotesk text-5xl font-extrabold text-navy">
                    {billingPeriod === "monthly" ? "₹14,999" : "₹11,999"}
                  </span>
                  <span className="text-xs text-ink/60 font-semibold">/ month</span>
                </div>
                <p className="text-sm text-ink/70 mb-8">
                  For event agencies, banquet venues, and enterprise management teams.
                </p>
                <ul className="space-y-4 mb-8 text-sm text-ink">
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-navy shrink-0" /> Multi-team client workspaces
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-navy shrink-0" /> White-label public portals
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-navy shrink-0" /> Custom API & CRM integrations
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-navy shrink-0" /> Dedicated concierge account manager
                  </li>
                </ul>
              </div>
              <Link href="/contact">
                <Button variant="outline" className="w-full">
                  Contact Agency Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 11. FAQ ACCORDION */}
        <section className="py-24 px-6 md:px-12 max-w-3xl mx-auto w-full">
          <div className="text-center mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-orange block mb-2">
              Support
            </span>
            <h2 className="font-grotesk text-4xl sm:text-5xl font-extrabold text-navy">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-4">
            <AccordionItem
              title="How does Festora AI match vendors?"
              isOpen={activeFaq === 0}
              onToggle={() => setActiveFaq(activeFaq === 0 ? null : 0)}
            >
              Our algorithm analyzes verified historical events, aesthetic preferences, geographic availability across top Indian cities, and pricing tiers to curate the ideal vendor shortlist tailored specifically to your budget.
            </AccordionItem>

            <AccordionItem
              title="Can I invite my clients and family members?"
              isOpen={activeFaq === 1}
              onToggle={() => setActiveFaq(activeFaq === 1 ? null : 1)}
            >
              Yes! Festora AI includes granular role-based permissions. You can invite partners as Co-Owners, clients with Reviewer access, vendors with timeline sync rights, and guests with RSVP view only.
            </AccordionItem>

            <AccordionItem
              title="Does the AI Assistant make real changes to my plan?"
              isOpen={activeFaq === 2}
              onToggle={() => setActiveFaq(activeFaq === 2 ? null : 2)}
            >
              Yes! Through structured tool-calling, the assistant can add tasks, adjust budget allocations, recommend vendors, and group guests. Every modification displays a diff-and-confirm step so you stay in total control.
            </AccordionItem>
          </div>
        </section>

        {/* 12. FINAL CALL TO ACTION */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-card-lg bg-navy p-12 md:p-20 text-center text-bg shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange/20 via-gold/15 to-transparent blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-xs uppercase font-bold tracking-widest text-gold block mb-3">
                Get Started Today
              </span>
              <h2 className="font-grotesk text-4xl sm:text-6xl font-extrabold text-bg mb-6">
                Ready to transform your event planning?
              </h2>
              <p className="text-base sm:text-lg text-bg/80 mb-10 leading-relaxed">
                Join thousands of elite planners and families creating unforgettable celebrations with Festora AI.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/onboarding">
                  <Button
                    variant="orange"
                    size="lg"
                    onClick={() => fireFestoraConfetti()}
                    iconRight={<ArrowRight className="w-4 h-4" />}
                  >
                    Start Planning Free
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Schedule a Live Tour
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 13. GIANT WORDMARK FOOTER */}
      <Footer />

      {/* Demo Video Walkthrough Modal */}
      <Dialog
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        title="Festora AI Interactive Tour"
        description="Experience autonomous event blueprinting in 60 seconds."
      >
        <div className="space-y-4">
          <div className="aspect-video w-full rounded-card overflow-hidden bg-navy shadow-2xl relative border border-navy/20">
            <video
              src="/demo-video.mp4"
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-ink/70">
              Watch Festora AI orchestrate timelines, budgets, and vendors in real time.
            </p>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => setDemoModalOpen(false)}>
                Close
              </Button>
              <Link href="/onboarding">
                <Button variant="orange" size="sm" onClick={() => setDemoModalOpen(false)}>
                  Start Planning
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
