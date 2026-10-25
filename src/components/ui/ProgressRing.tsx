import React from "react";
import { cn } from "@/lib/utils";

export function ProgressRing({
  value = 92,
  size = 96,
  strokeWidth = 8,
  accentColor = "#2C3E50",
  className,
}: {
  value?: number;
  size?: number;
  strokeWidth?: number;
  accentColor?: string;
  className?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(100, Math.max(0, value));
  const offset = circumference - (clampedValue / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(44, 62, 80, 0.12)"
          strokeWidth={strokeWidth}
        />
        {/* Progress stroke */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={accentColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-grotesk font-extrabold text-2xl text-navy leading-none">
          {clampedValue}
        </span>
        <span className="text-[10px] font-bold text-ink/60 uppercase tracking-wider mt-0.5">
          / 100
        </span>
      </div>
    </div>
  );
}
