"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function StatBlock({
  eyebrow,
  value,
  description,
  accentColor = "navy",
  className,
}: {
  eyebrow: string;
  value: string;
  description: string;
  accentColor?: "navy" | "orange" | "gold";
  className?: string;
}) {
  const accentClasses = {
    navy: "text-navy",
    orange: "text-orange",
    gold: "text-gold",
  };

  return (
    <div
      className={cn(
        "rounded-card-lg p-8 transition-all relative overflow-hidden",
        "bg-white border border-navy/12 shadow-sm hover:shadow-md hover:border-navy/25 flex flex-col justify-between",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-bold uppercase tracking-widest text-navy/70">
          {eyebrow}
        </span>
        <span
          className={cn("w-2 h-2 rounded-full", {
            "bg-navy": accentColor === "navy",
            "bg-orange": accentColor === "orange",
            "bg-gold": accentColor === "gold",
          })}
        />
      </div>
      <div className="my-3">
        <div
          className={cn(
            "font-grotesk text-6xl md:text-7xl font-extrabold tracking-tight",
            accentClasses[accentColor],
          )}
        >
          {value}
        </div>
      </div>
      <p className="text-sm text-ink/75 leading-relaxed mt-2">{description}</p>
    </div>
  );
}
