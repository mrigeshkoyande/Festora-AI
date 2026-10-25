"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  Bot,
  IndianRupee,
  Calendar,
  Store,
  Users,
  Armchair,
  FileSpreadsheet,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { Dialog } from "./Dialog";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const items = [
    { label: "Dashboard Overview", path: "/dashboard", icon: <LayoutDashboard className="w-4 h-4 text-navy" /> },
    { label: "AI Planning Assistant", path: "/ai-assistant", icon: <Bot className="w-4 h-4 text-orange" /> },
    { label: "Budget & Expense Intelligence", path: "/budget", icon: <IndianRupee className="w-4 h-4 text-gold" /> },
    { label: "Master Timeline & Tasks", path: "/timeline", icon: <Calendar className="w-4 h-4 text-navy" /> },
    { label: "Vendor Marketplace", path: "/vendors", icon: <Store className="w-4 h-4 text-navy" /> },
    { label: "Guests & RSVP Management", path: "/guests", icon: <Users className="w-4 h-4 text-navy" /> },
    { label: "Interactive Seating Chart", path: "/seating", icon: <Armchair className="w-4 h-4 text-navy" /> },
    { label: "Day-Of Run Sheet", path: "/run-sheet", icon: <FileSpreadsheet className="w-4 h-4 text-orange" /> },
    { label: "Ideas & Moodboard Studio", path: "/ideas", icon: <Sparkles className="w-4 h-4 text-gold" /> },
    { label: "Onboarding Intake Wizard", path: "/onboarding", icon: <Sparkles className="w-4 h-4 text-navy" /> },
    { label: "Settings & Collaborators", path: "/settings", icon: <Settings className="w-4 h-4 text-navy" /> },
  ];

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(path);
  };

  return (
    <>
      {/* Floating ⌘K shortcut trigger pill on bottom right */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-4 py-2.5 rounded-pill glass-strong border border-navy/20 shadow-lg text-xs font-semibold text-navy hover:scale-105 transition-all cursor-pointer"
      >
        <Search className="w-3.5 h-3.5 text-navy" />
        <span>Quick Navigation</span>
        <kbd className="px-1.5 py-0.5 rounded bg-navy/10 text-[10px] font-mono text-ink">
          ⌘K
        </kbd>
      </button>

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} maxWidth="max-w-2xl">
        <div className="flex flex-col gap-4">
          <div className="relative flex items-center border-b border-navy/10 pb-3">
            <Search className="w-5 h-5 text-navy/50 mr-3" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools, events, tasks, or budgets... (Type to filter)"
              className="w-full text-base font-medium text-ink placeholder:text-ink/40 bg-transparent focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-ink/40 hover:text-ink">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto space-y-1 pr-1">
            {filteredItems.length === 0 ? (
              <div className="py-8 text-center text-sm text-ink/60">
                No matching tools or pages found.
              </div>
            ) : (
              filteredItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleSelect(item.path)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-navy/8 transition-colors text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-bg flex items-center justify-center border border-navy/10">
                      {item.icon}
                    </div>
                    <span className="font-medium text-sm text-ink group-hover:text-navy">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-xs text-ink/40 group-hover:text-navy">Jump to →</span>
                </button>
              ))
            )}
          </div>

          <div className="pt-3 border-t border-navy/10 flex items-center justify-between text-[11px] text-ink/50">
            <span>Use ↑↓ keys to navigate</span>
            <span>ESC to close</span>
          </div>
        </div>
      </Dialog>
    </>
  );
}
