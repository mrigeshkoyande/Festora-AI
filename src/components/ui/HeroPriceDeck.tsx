"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IndianRupee,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Building2,
  Utensils,
  Camera,
  Layers,
  Check,
  ShieldCheck,
  Percent,
} from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

// Celebration budget line items with real negotiated price allocations
const BUDGET_PRICES = [
  {
    id: "venue",
    title: "Royal Palace & Heritage Lawns",
    category: "Venue & Hospitality",
    amount: "₹18,50,000",
    share: "41%",
    badge: "Contract Locked",
    badgeVariant: "orange" as const,
    icon: Building2,
    detail: "3-day exclusive hire with 150 guest suites",
  },
  {
    id: "decor",
    title: "Mandap, Stage & Floral Rigging",
    category: "Bespoke Decor",
    amount: "₹9,20,000",
    share: "20%",
    badge: "Design Approved",
    badgeVariant: "gold" as const,
    icon: Sparkles,
    detail: "Imported Dutch florals & architectural lighting",
  },
  {
    id: "catering",
    title: "Gourmet Live Counters & Royal Thali",
    category: "Catering & Bar",
    amount: "₹8,30,000",
    share: "19%",
    badge: "Menu Finalized",
    badgeVariant: "navy" as const,
    icon: Utensils,
    detail: "Pure Jain + global fusion covers for 150 guests",
  },
  {
    id: "media",
    title: "Cinematic Film & 4K Drone Coverage",
    category: "Photography & Cinema",
    amount: "₹4,80,000",
    share: "11%",
    badge: "Artist Booked",
    badgeVariant: "gold" as const,
    icon: Camera,
    detail: "Same-day teaser, raw rushes, and 3-day multi-cam",
  },
  {
    id: "savings",
    title: "Festora AI Algorithmic Savings",
    category: "AI Negotiation",
    amount: "-₹4,20,000",
    share: "Saved",
    badge: "AI Guaranteed",
    badgeVariant: "orange" as const,
    icon: IndianRupee,
    detail: "Automated vendor quote benchmarking & rebate",
  },
];

// Subscription software tiers for Festora AI
const PLAN_PRICES = [
  {
    id: "starter",
    title: "Starter Plan",
    category: "Personal Gatherings",
    amount: "₹0",
    share: "Forever",
    badge: "Free Tier",
    badgeVariant: "navy" as const,
    icon: Layers,
    detail: "Up to 50 guests, AI timeline generator, CSV export",
  },
  {
    id: "pro",
    title: "Professional Planner",
    category: "Luxury Weddings",
    amount: "₹3,999",
    share: "/ month",
    badge: "Most Popular",
    badgeVariant: "orange" as const,
    icon: Sparkles,
    detail: "Unlimited RSVPs, 3-scenario AI optimizer, live run-sheet",
  },
  {
    id: "enterprise",
    title: "Agency & Enterprise",
    category: "Banquets & Agencies",
    amount: "₹14,999",
    share: "/ month",
    badge: "Full Suite",
    badgeVariant: "gold" as const,
    icon: ShieldCheck,
    detail: "Multi-client workspaces, white-label, dedicated concierge",
  },
];

export function HeroPriceDeck({
  className,
  onHoverStateChange,
}: {
  className?: string;
  onHoverStateChange?: (hovered: boolean) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mode, setMode] = useState<"budget" | "plans">("budget");
  const [selectedId, setSelectedId] = useState<string>("venue");

  const items = mode === "budget" ? BUDGET_PRICES : PLAN_PRICES;

  return (
    <div
      className={cn("w-full transition-all duration-300", className)}
      onMouseEnter={() => onHoverStateChange?.(true)}
      onMouseLeave={() => onHoverStateChange?.(false)}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          /* COLLAPSED STACKED CARD VIEW */
          <motion.div
            key="collapsed-deck"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative cursor-pointer select-none"
            onClick={() => setIsExpanded(true)}
          >
            {/* Background Layer Card 2 (Bottom Peek) */}
            <div
              className="absolute -top-3 left-4 right-4 h-16 rounded-card-md bg-white/40 border border-white/40 backdrop-blur-sm shadow-md pointer-events-none transform scale-[0.93] transition-transform duration-300 group-hover:-top-4"
              style={{ zIndex: 1 }}
            />

            {/* Background Layer Card 1 (Middle Peek) */}
            <div
              className="absolute -top-1.5 left-2 right-2 h-16 rounded-card-md bg-white/60 border border-white/60 backdrop-blur-sm shadow-lg pointer-events-none transform scale-[0.97] transition-transform duration-300 group-hover:-top-2"
              style={{ zIndex: 2 }}
            />

            {/* Front Master Card */}
            <GlassSurface
              variant="strong"
              className="relative p-4 rounded-card-md border border-white/80 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-orange/60"
              style={{ zIndex: 3 }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-orange/20 border border-orange/30 flex items-center justify-center text-ink shrink-0">
                    <IndianRupee className="w-5 h-5 text-ink" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-navy">AI Price Intelligence</p>
                      <Badge variant="orange" className="text-[10px] py-0.5 px-2">
                        {items.length} Price Cards
                      </Badge>
                    </div>
                    <p className="text-sm font-extrabold text-navy mt-0.5">
                      ₹45.0 Lakhs{" "}
                      <span className="text-[11px] font-medium text-ink/70">• ₹4.2L AI saved</span>
                    </p>
                  </div>
                </div>

                {/* Animated Expand Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-navy text-bg text-xs font-bold shadow-md hover:bg-navy/90 transition-all shrink-0"
                >
                  <span>Expand Prices</span>
                  <ChevronDown className="w-3.5 h-3.5 text-bg animate-bounce" />
                </button>
              </div>

              {/* Sub-label teaser */}
              <div className="mt-2.5 pt-2 border-t border-navy/10 flex items-center justify-between text-[11px] text-ink/70">
                <span className="flex items-center gap-1 font-semibold text-navy">
                  <Sparkles className="w-3 h-3 text-orange" />
                  Tap to view card-by-card breakdown
                </span>
                <span className="text-orange font-bold">All 100% Verified</span>
              </div>
            </GlassSurface>
          </motion.div>
        ) : (
          /* EXPANDED CARD-BY-CARD COLLAPSIBLE CONTAINER */
          <motion.div
            key="expanded-deck"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative"
            style={{ zIndex: 10 }}
          >
            <GlassSurface
              variant="strong"
              className="p-4 sm:p-5 rounded-card-md border-2 border-white/80 shadow-2xl backdrop-blur-2xl max-h-[380px] sm:max-h-[420px] flex flex-col justify-between"
            >
              {/* Header & Controls */}
              <div className="flex items-center justify-between pb-3 border-b border-navy/10">
                {/* Mode Switcher */}
                <div className="inline-flex p-0.5 rounded-pill bg-navy/8 border border-navy/12">
                  <button
                    type="button"
                    onClick={() => setMode("budget")}
                    className={cn(
                      "px-3 py-1 rounded-pill text-[11px] font-bold tracking-wide transition-all",
                      mode === "budget"
                        ? "bg-navy text-bg shadow-sm"
                        : "text-ink/70 hover:text-ink",
                    )}
                  >
                    Event Prices
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("plans")}
                    className={cn(
                      "px-3 py-1 rounded-pill text-[11px] font-bold tracking-wide transition-all",
                      mode === "plans" ? "bg-navy text-bg shadow-sm" : "text-ink/70 hover:text-ink",
                    )}
                  >
                    Platform Plans
                  </button>
                </div>

                {/* Collapse Button */}
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-pill bg-navy/10 hover:bg-navy/20 text-navy text-[11px] font-bold transition-all"
                >
                  <span>Collapse</span>
                  <ChevronUp className="w-3.5 h-3.5 text-navy" />
                </button>
              </div>

              {/* Cards List: Staggered Card-by-Card Animation */}
              <div className="space-y-2 overflow-y-auto py-2.5 pr-1 max-h-[260px] sm:max-h-[290px] scrollbar-thin">
                {items.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = selectedId === item.id;
                  const isNegative = item.amount.startsWith("-");

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 14, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: idx * 0.06,
                        ease: "easeOut",
                      }}
                      onClick={() => setSelectedId(item.id)}
                      className={cn(
                        "p-2.5 sm:p-3 rounded-card-sm border transition-all cursor-pointer flex items-center justify-between gap-2.5 shadow-sm",
                        isSelected
                          ? "bg-white border-orange shadow-md scale-[1.01]"
                          : "bg-white/70 hover:bg-white border-navy/10 hover:border-navy/25",
                      )}
                    >
                      {/* Left: Icon & Category */}
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                            isSelected
                              ? "bg-orange/20 border-orange/40 text-ink"
                              : "bg-navy/10 border-navy/15 text-navy",
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-ink/60">
                              {item.category}
                            </span>
                            <Badge
                              variant={item.badgeVariant}
                              className="text-[9px] py-0 px-1.5 font-bold"
                            >
                              {item.badge}
                            </Badge>
                          </div>
                          <p className="text-xs font-bold text-navy truncate">{item.title}</p>
                          <p className="text-[10px] text-ink/65 truncate hidden sm:block">
                            {item.detail}
                          </p>
                        </div>
                      </div>

                      {/* Right: Price & Share */}
                      <div className="text-right shrink-0">
                        <span
                          className={cn(
                            "font-grotesk text-sm sm:text-base font-extrabold tracking-tight block",
                            isNegative ? "text-orange" : "text-navy",
                          )}
                        >
                          {item.amount}
                        </span>
                        <span className="text-[10px] font-bold text-ink/60">{item.share}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Total Footer Summary */}
              <div className="pt-2 border-t border-navy/10 flex items-center justify-between text-xs">
                <span className="text-ink/70 font-medium">
                  {mode === "budget" ? "Total Celebration Ceiling:" : "Selected Tier Billing:"}
                </span>
                <span className="font-extrabold text-navy font-grotesk text-sm">
                  {mode === "budget" ? "₹45,00,000 (100% Balanced)" : "Billed Annually (-20%)"}
                </span>
              </div>
            </GlassSurface>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
