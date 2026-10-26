"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WorkspaceShell } from "@/components/layout/WorkspaceShell";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Dialog } from "@/components/ui/Dialog";
import {
  Sparkles,
  Palette,
  Copy,
  Check,
  Plus,
  Share2,
  Heart,
  Bookmark,
  Layers,
  Utensils,
  Gift,
  FileText
} from "lucide-react";

interface MoodItem {
  id: string;
  title: string;
  category: "Decor" | "Gastronomy" | "Stationery" | "Lighting";
  image: string;
  description: string;
  tags: string[];
}

const MOOD_ITEMS: MoodItem[] = [
  {
    id: "m-1",
    title: "Hand-Carved Stone Mandap with Marigold Cascades",
    category: "Decor",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop",
    description: "Symmetric temple mandap architecture draped in scented Indian jasmine and golden marigolds suspended over reflection pool.",
    tags: ["Royal Heritage", "Floral Rigging", "Sunset Ceremony"]
  },
  {
    id: "m-2",
    title: "Candlelit Mughal Courtyard Dining",
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop",
    description: "500 handcrafted brass lanterns casting intricate shadow geometry across stone archways and velvet banquettes.",
    tags: ["Ambient Glow", "Brass Lanterns", "Dinner Banquet"]
  },
  {
    id: "m-3",
    title: "Live Sigri & Clay Tandoor Chaat Stalls",
    category: "Gastronomy",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop",
    description: "Authentic copper and terracotta live cooking stations with specialized pure-vegetarian and Jain options.",
    tags: ["Live Counters", "Pure Jain", "Rajasthani Chaat"]
  },
  {
    id: "m-4",
    title: "Gold-Leaf Foil Pressed Invitation Boxes",
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop",
    description: "Handmade cotton deckled paper, Pichwai painted envelope inserts, and personalized brass seal monograms.",
    tags: ["24k Gold Foil", "Deckled Edge", "Pichwai Art"]
  }
];

export default function IdeasPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedTone, setSelectedTone] = useState<"royal" | "modern" | "poetic">("royal");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const paletteColors = [
    { name: "Deep Royal Navy", hex: "#2C3E50", role: "Primary Foundation" },
    { name: "Marigold Ochre", hex: "#E67E22", role: "Urgent & Active Moments" },
    { name: "Imperial Gold", hex: "#F1C40F", role: "Celebration Accents" },
    { name: "Marble Canvas", hex: "#F8F9FA", role: "Light Neutral Surface" },
    { name: "Charcoal Ink", hex: "#1E272E", role: "Typography & Fills" }
  ];

  const copyHexCode = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const wordingVariants = {
    royal:
      "Under the patronage of the golden Rajasthan skies, Shri & Smt. Rajesh Mehta request the honour of your auspicious presence to witness and bless the nuptial vows of their daughter Ananya with Rohan, son of Shri & Smt. Ashok Verma at Samode Palace, Jaipur.",
    modern:
      "Together with their families, Ananya Mehta and Rohan Verma invite you to join them in celebrating love, laughter, and their new beginning at Samode Palace, Jaipur on November 18, 2026.",
    poetic:
      "As dusk melts into starry night across the Thar desert, two souls unite in timeless love. We warmly welcome your blessings as Ananya and Rohan begin their journey as husband and wife."
  };

  const filteredItems = MOOD_ITEMS.filter((item) => activeCategory === "All" || item.category === activeCategory);

  return (
    <WorkspaceShell activeTab="ideas">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--navy)]">Aesthetic Architecture</span>
            <span className="text-xs text-[var(--ink)]/50">•</span>
            <span className="text-xs font-semibold text-[var(--gold)] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Curated Moodboards & Palette
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--navy)]">
            Themes, Moodboards & Wording
          </h1>
          <p className="text-sm text-[var(--ink)]/70 mt-1">
            Visual inspiration, color swatches, culinary concept menus, and AI-generated invitation copy.
          </p>
        </div>

        <Button
          variant="orange"
          size="sm"
          onClick={() => showToast("AI is generating 4 new decor and lighting ideas...")}
          className="font-bold text-[var(--ink)] shadow-md"
        >
          <Sparkles className="w-4 h-4 mr-1.5" />
          Generate New Concepts
        </Button>
      </div>

      {/* Mandatory Color Palette Swatch Card */}
      <GlassSurface elevation="card" className="p-6 rounded-3xl border border-[var(--navy)]/10 mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-[var(--orange)]" />
            <h3 className="text-sm font-extrabold text-[var(--navy)] uppercase tracking-wider">
              Signature Royal Jaipur Event Palette
            </h3>
          </div>
          <span className="text-xs text-[var(--ink)]/60">5-Color Verified Harmony</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {paletteColors.map((color) => (
            <div
              key={color.hex}
              onClick={() => copyHexCode(color.hex)}
              className="p-3 bg-white rounded-2xl border border-[var(--navy)]/10 shadow-sm cursor-pointer hover:shadow-md transition-all group"
            >
              <div
                className="w-full h-16 rounded-xl mb-2.5 shadow-inner border border-black/10 flex items-center justify-center text-xs font-bold transition-transform group-hover:scale-105"
                style={{ backgroundColor: color.hex }}
              >
                {copiedHex === color.hex && (
                  <span className="bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">
                    Copied!
                  </span>
                )}
              </div>
              <div className="text-xs font-bold text-[var(--navy)]">{color.name}</div>
              <div className="text-[10px] font-mono font-semibold text-[var(--ink)]/60 mt-0.5 flex justify-between items-center">
                <span>{color.hex}</span>
                <Copy className="w-3 h-3 text-[var(--ink)]/40 group-hover:text-[var(--navy)]" />
              </div>
            </div>
          ))}
        </div>
      </GlassSurface>

      {/* Main Split: Moodboard Bento Grid (8 cols) + AI Wording Atelier (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Moodboard Bento (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {["All", "Decor", "Lighting", "Gastronomy", "Stationery"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-[var(--navy)] text-white shadow-md"
                    : "bg-white text-[var(--navy)] border border-[var(--navy)]/15 hover:bg-[var(--navy)]/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Bento Visual Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl overflow-hidden border border-[var(--navy)]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/80 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3">
                      <Badge variant="navy">{item.category}</Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <p className="text-xs text-[var(--ink)]/70 leading-relaxed">{item.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-bold bg-[var(--bg)] text-[var(--navy)] px-2 py-0.5 rounded-md border border-[var(--navy)]/10">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-[var(--navy)]/8 flex justify-between items-center mt-2">
                  <button
                    onClick={() => showToast(`Saved "${item.title}" to event moodboard`)}
                    className="text-xs font-bold text-[var(--navy)] hover:text-[var(--orange)] flex items-center gap-1 transition-colors"
                  >
                    <Bookmark className="w-3.5 h-3.5" /> Save Concept
                  </button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => showToast(`Attached concept to Phase 3 vendor briefing!`)}
                    className="text-xs font-bold text-[var(--navy)]"
                  >
                    + Add to Brief
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: AI Invitation Copywriter (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <GlassSurface elevation="card" className="p-5 rounded-2xl border border-[var(--navy)]/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--navy)]/10">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--orange)]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--navy)]">
                  AI Invitation Copywriter
                </h3>
              </div>
              <Badge variant="gold" className="text-[10px]">Instant Draft</Badge>
            </div>

            {/* Tone Selector */}
            <div className="grid grid-cols-3 gap-2">
              {(["royal", "modern", "poetic"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTone(t)}
                  className={`py-1.5 text-xs font-bold rounded-xl capitalize transition-all ${
                    selectedTone === t
                      ? "bg-[var(--navy)] text-white shadow"
                      : "bg-white border border-[var(--navy)]/15 text-[var(--navy)]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Rendered Wording */}
            <div className="p-4 bg-white rounded-xl border border-[var(--navy)]/15 shadow-sm text-xs leading-relaxed text-[var(--ink)] italic">
              &ldquo;{wordingVariants[selectedTone]}&rdquo;
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] text-[var(--ink)]/50">Customized for Jaipur</span>
              <Button
                variant="orange"
                size="sm"
                onClick={() => {
                  navigator.clipboard?.writeText(wordingVariants[selectedTone]);
                  showToast("Invitation copy copied to clipboard!");
                }}
                className="font-bold text-[var(--ink)]"
              >
                <Copy className="w-3.5 h-3.5 mr-1" /> Copy Wording
              </Button>
            </div>
          </GlassSurface>

          {/* Return Gifts & Hospitality Concepts */}
          <div className="bg-white rounded-2xl p-5 border border-[var(--navy)]/10 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-[var(--navy)] uppercase tracking-wider flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-[var(--orange)]" />
              Return Gift Ideas (₹1,500 - ₹3,000 / guest)
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-[var(--bg)] rounded-xl border border-[var(--navy)]/10">
                <div className="font-bold text-[var(--navy)]">Handmade Pichwai Silver Coins</div>
                <div className="text-[11px] text-[var(--ink)]/60">Custom 20g 999-silver Lakshmi-Ganesh coin in velvet gift box.</div>
              </div>
              <div className="p-2.5 bg-[var(--bg)] rounded-xl border border-[var(--navy)]/10">
                <div className="font-bold text-[var(--navy)]">Kashmiri Saffron & Organic Wild Honey</div>
                <div className="text-[11px] text-[var(--ink)]/60">Artisanal brass pot pairing with raw honeycomb from the Himalayas.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TOAST MESSAGE */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[var(--navy)] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20 animate-in fade-in slide-in-from-bottom-4 text-xs font-bold">
          <Check className="w-4 h-4 text-[var(--gold)]" />
          {toastMessage}
        </div>
      )}
    </WorkspaceShell>
  );
}
