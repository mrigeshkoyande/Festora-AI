import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Marquee({
  items = [
    "Luxury Weddings",
    "Corporate Galas",
    "VIP Milestone Birthdays",
    "Destination Celebrations",
    "Cultural Festivals",
    "Charity Balls",
    "Intimate Soirées",
    "Grand Receptions",
  ],
  className,
}: {
  items?: string[];
  className?: string;
}) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className={cn("relative w-full overflow-hidden py-5 bg-navy text-bg select-none", className)}
    >
      <button
        type="button"
        onClick={() => setIsPaused((paused) => !paused)}
        aria-pressed={isPaused}
        aria-label={
          isPaused
            ? "Resume celebration categories animation"
            : "Pause celebration categories animation"
        }
        className="absolute right-3 top-2 z-10 rounded-full border border-bg/40 bg-navy/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-bg focus:outline-none focus:ring-2 focus:ring-gold"
      >
        {isPaused ? "Resume" : "Pause"}
      </button>
      <div
        className="flex w-max animate-marquee gap-10 whitespace-nowrap font-grotesk font-semibold text-sm tracking-wider uppercase"
        style={{ animationPlayState: isPaused ? "paused" : "running" }}
        aria-hidden="true"
      >
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-gold fill-current" />
            <span className="text-bg/90">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
