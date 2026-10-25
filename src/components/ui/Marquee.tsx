import React from "react";
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
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden py-5 bg-navy text-bg select-none",
        className
      )}
    >
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-grotesk font-semibold text-sm tracking-wider uppercase">
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
