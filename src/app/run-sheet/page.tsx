"use client";

import React, { useState, useEffect } from "react";
import { WorkspaceShell } from "@/components/layout/WorkspaceShell";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Dialog } from "@/components/ui/Dialog";
import {
  Clock,
  Phone,
  Check,
  Share2,
  QrCode,
  AlertTriangle,
  Sparkles,
  Printer,
  ChevronRight,
  Radio,
  Volume2,
  Calendar,
  ShieldCheck
} from "lucide-react";

interface CueItem {
  id: string;
  timeSlot: string;
  title: string;
  description: string;
  leadContact: string;
  phoneContact: string;
  category: "Ceremony" | "Logistics" | "Entertainment" | "Banqueting";
  technicalNotes?: string;
  isCompleted: boolean;
  isCurrent?: boolean;
}

const INITIAL_CUES: CueItem[] = [
  {
    id: "cue-1",
    timeSlot: "14:00 - 15:00",
    title: "Vendor Technical AV & Sound Rigging",
    description: "Sound engineers complete wireless mic frequency check across Elephant Gate and Courtyard.",
    leadContact: "Ravi Shankar (AV Lead)",
    phoneContact: "+91 98201 12345",
    category: "Logistics",
    technicalNotes: "Check interference with Samode Palace stone walls. Set master limiter to 85dB.",
    isCompleted: true
  },
  {
    id: "cue-2",
    timeSlot: "15:00 - 16:30",
    title: "Baraat Procession & Elephant Gate Welcome",
    description: "Groom procession with royal chobdars, dholak troupe, and rose petal shower.",
    leadContact: "Rohan Verma / Priya Sharma",
    phoneContact: "+91 98190 54321",
    category: "Ceremony",
    technicalNotes: "Cue Manganiyar folk ensemble to start Khartal rhythm as groom crosses outer arch.",
    isCompleted: true
  },
  {
    id: "cue-3",
    timeSlot: "16:30 - 17:30",
    title: "Varmala & Sunset High Tea Service",
    description: "Exchange of garlands at the lotus pond pavilion followed by Rajasthani high tea.",
    leadContact: "Chef Laurent / Khyber Gastronomy",
    phoneContact: "+91 98333 44556",
    category: "Ceremony",
    technicalNotes: "Coordinate with Joseph Radhik drone team for golden-hour sunset light at 17:15.",
    isCompleted: false,
    isCurrent: true
  },
  {
    id: "cue-4",
    timeSlot: "17:45 - 19:30",
    title: "Traditional Vedic Pheras & Sacred Fire Rituals",
    description: "Mandap ceremony with family elders around the sacred havan kund.",
    leadContact: "Pandit Shastri",
    phoneContact: "+91 98222 33445",
    category: "Ceremony",
    technicalNotes: "Soft sitar acoustic backing; no amplified bass during chanting.",
    isCompleted: false
  },
  {
    id: "cue-5",
    timeSlot: "20:00 - 23:30",
    title: "Royal Gala Dinner & Folk Fusion Concert",
    description: "Grand banquet opens with 45 culinary specialities and live sitar-tabla fusion.",
    leadContact: "Chef Laurent (Khyber)",
    phoneContact: "+91 98333 44556",
    category: "Banqueting",
    technicalNotes: "Verify Jain counter warmers are preheated at 19:45.",
    isCompleted: false
  }
];

export default function RunSheetPage() {
  const [cues, setCues] = useState<CueItem[]>(INITIAL_CUES);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState("16:45:20");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTimeStr(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleComplete = (id: string) => {
    setCues(cues.map((c) => (c.id === id ? { ...c, isCompleted: !c.isCompleted } : c)));
  };

  const filteredCues = cues.filter((c) => filterCategory === "All" || c.category === filterCategory);

  return (
    <WorkspaceShell activeTab="run-sheet">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--navy)]">Live Production</span>
            <span className="text-xs text-[var(--ink)]/50">•</span>
            <span className="text-xs font-semibold text-[var(--orange)] flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 animate-pulse" /> Real-Time Run Sheet
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--navy)]">
            Day-Of Run Sheet & Minute-by-Minute
          </h1>
          <p className="text-sm text-[var(--ink)]/70 mt-1">
            Execution timeline with direct tap-to-call vendor contacts, technical AV cues, and offline capability.
          </p>
        </div>

        {/* Live Clock & Actions */}
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-2xl border border-[var(--navy)]/15 shadow-sm flex items-center gap-2 text-xs">
            <Clock className="w-4 h-4 text-[var(--orange)]" />
            <span className="font-mono font-bold text-[var(--navy)]">{currentTimeStr} IST</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.print()}
            className="border border-[var(--navy)]/15 font-bold text-[var(--navy)]"
          >
            <Printer className="w-4 h-4 mr-1.5" /> Print
          </Button>

          <Button
            variant="orange"
            size="sm"
            onClick={() => setIsShareModalOpen(true)}
            className="font-bold text-[var(--ink)] shadow-md"
          >
            <Share2 className="w-4 h-4 mr-1.5" />
            Share Emergency Run Sheet
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {["All", "Ceremony", "Logistics", "Banqueting", "Entertainment"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              filterCategory === cat
                ? "bg-[var(--navy)] text-white shadow-md"
                : "bg-white text-[var(--navy)] border border-[var(--navy)]/15 hover:bg-[var(--navy)]/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Timeline Stream */}
      <div className="space-y-4 max-w-4xl">
        {filteredCues.map((cue, index) => {
          return (
            <div
              key={cue.id}
              className={`p-5 rounded-3xl border transition-all duration-300 relative ${
                cue.isCurrent
                  ? "bg-white border-2 border-[var(--orange)] shadow-xl"
                  : cue.isCompleted
                  ? "bg-[var(--bg)] border-[var(--navy)]/10 opacity-75"
                  : "bg-white border-[var(--navy)]/10 shadow-sm"
              }`}
            >
              {/* Active Milestone Indicator Banner */}
              {cue.isCurrent && (
                <div className="absolute -top-3 left-6 bg-[var(--orange)] text-[var(--ink)] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-ping" /> Active Milestone Now
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                {/* Left: Time & Content */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-[var(--navy)] text-white">
                      {cue.timeSlot}
                    </span>
                    <Badge variant={cue.isCompleted ? "navy" : cue.isCurrent ? "orange" : "gold"}>
                      {cue.category}
                    </Badge>
                  </div>

                  <h3 className={`text-base font-bold ${cue.isCompleted ? "line-through text-[var(--ink)]/50" : "text-[var(--navy)]"}`}>
                    {cue.title}
                  </h3>

                  <p className="text-xs text-[var(--ink)]/70 leading-relaxed">
                    {cue.description}
                  </p>

                  {/* Technical AV & Sound Note */}
                  {cue.technicalNotes && (
                    <div className="p-3 bg-[var(--bg)] rounded-xl border border-[var(--navy)]/10 text-[11px] text-[var(--ink)] flex items-start gap-2">
                      <Volume2 className="w-4 h-4 text-[var(--navy)] flex-shrink-0 mt-0.5" />
                      <span><strong>Technical Cue:</strong> {cue.technicalNotes}</span>
                    </div>
                  )}
                </div>

                {/* Right: Contact Lead & Status Toggle */}
                <div className="flex flex-col items-start md:items-end justify-between gap-3 min-w-[200px]">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase font-bold text-[var(--ink)]/50 block">Lead Coordinator</span>
                    <span className="font-bold text-xs text-[var(--navy)]">{cue.leadContact}</span>
                    <a
                      href={`tel:${cue.phoneContact}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--orange)] hover:underline mt-1 block"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {cue.phoneContact}
                    </a>
                  </div>

                  <button
                    onClick={() => toggleComplete(cue.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      cue.isCompleted
                        ? "bg-[var(--navy)] text-white shadow"
                        : "bg-white border border-[var(--navy)]/20 text-[var(--navy)] hover:bg-[var(--navy)]/5"
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    {cue.isCompleted ? "Completed" : "Mark Done"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SHARE EMERGENCY RUN SHEET MODAL */}
      <Dialog
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="Emergency Live Run Sheet Share"
        className="max-w-md"
      >
        <div className="space-y-4 text-center">
          <p className="text-xs text-[var(--ink)]/70">
            Share this lightweight offline-capable live run sheet with your production crew, catering managers, and photographers.
          </p>

          <div className="p-6 bg-[var(--bg)] rounded-2xl border border-[var(--navy)]/15 inline-block mx-auto">
            <QrCode className="w-32 h-32 text-[var(--navy)] mx-auto" />
            <span className="text-[10px] font-bold text-[var(--ink)]/60 mt-2 block">
              Scan for Offline Day-Of Mobile View
            </span>
          </div>

          <div className="p-3 bg-[var(--bg)] rounded-xl border border-[var(--navy)]/10 text-xs font-mono text-[var(--navy)] break-all">
            https://festora.ai/live/ananya-rohan-run-sheet?pin=8821
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setIsShareModalOpen(false)}>
              Close
            </Button>
            <Button
              variant="orange"
              size="sm"
              onClick={() => {
                alert("Link copied to clipboard!");
                setIsShareModalOpen(false);
              }}
              className="font-bold text-[var(--ink)]"
            >
              Copy Link
            </Button>
          </div>
        </div>
      </Dialog>
    </WorkspaceShell>
  );
}
