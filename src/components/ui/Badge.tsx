import React from "react";
import { Check, AlertTriangle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BadgeProps {
  variant?: "default" | "orange" | "gold" | "success" | "error" | "sparkle" | "navy";
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant = "default", size = "sm", className, children }: BadgeProps) {
  const sizeClasses = {
    sm: "px-2.5 py-1 text-[11px] font-semibold gap-1",
    md: "px-3.5 py-1.5 text-xs font-semibold gap-1.5",
  };

  const variantClasses = {
    default: "bg-navy/10 text-navy border border-navy/15",
    navy: "bg-navy text-bg font-bold border border-navy/30",
    orange: "bg-orange/15 text-ink border border-orange/30 font-bold",
    gold: "bg-gold/25 text-ink border border-gold/40 font-bold",
    // Semantic success: Navy solid with check icon (No green)
    success: "bg-navy text-bg font-bold",
    // Semantic error: Orange with ink warning treatment (No red)
    error: "bg-orange/20 text-ink border border-orange/40 font-bold",
    sparkle: "bg-gold/20 text-ink border border-gold/40 font-bold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill tracking-wide select-none",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
    >
      {variant === "success" && <Check className="w-3 h-3 stroke-[3]" />}
      {variant === "error" && <AlertTriangle className="w-3 h-3 stroke-[2.5]" />}
      {variant === "sparkle" && <Sparkles className="w-3 h-3 text-ink fill-current" />}
      <span>{children}</span>
    </span>
  );
}

export function Chip({
  active = false,
  onClick,
  className,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-5 py-2.5 rounded-pill text-xs font-semibold tracking-wide transition-all border cursor-pointer",
        active
          ? "bg-navy text-bg border-navy shadow-sm scale-[1.02]"
          : "bg-white text-ink border-navy/15 hover:bg-bg hover:border-navy/30",
        className,
      )}
    >
      {children}
    </button>
  );
}
