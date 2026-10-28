"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Tabs({
  tabs,
  activeTab,
  onChange,
  className,
}: {
  tabs: { id: string; label: string; count?: number }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn("inline-flex p-1.5 rounded-pill bg-navy/8 border border-navy/12", className)}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-5 py-2 rounded-pill text-xs font-semibold tracking-wide transition-all cursor-pointer select-none",
              isActive
                ? "bg-navy text-bg shadow-sm"
                : "text-ink/70 hover:text-ink hover:bg-white/60",
            )}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  "ml-2 px-2 py-0.5 rounded-full text-[10px]",
                  isActive ? "bg-bg/20 text-bg" : "bg-navy/10 text-navy",
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function AccordionItem({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-card border border-navy/12 bg-white overflow-hidden transition-all shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-6 text-left flex justify-between items-center font-grotesk font-bold text-lg text-navy hover:text-navy/80 cursor-pointer"
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-navy/70 transition-transform duration-300",
            isOpen && "rotate-180 text-orange",
          )}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-ink/80 text-sm leading-relaxed border-t border-navy/6 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}
