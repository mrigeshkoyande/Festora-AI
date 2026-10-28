"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "navy" | "orange" | "gold" | "secondary" | "glass" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  icon,
  iconRight,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: "min-h-11 min-w-11 px-4 py-2 text-xs font-semibold gap-1.5",
    md: "min-h-11 min-w-11 px-6 py-3 text-sm font-semibold gap-2",
    lg: "min-h-11 min-w-11 px-8 py-4 text-base font-semibold gap-2.5",
  };

  const variantClasses = {
    // Primary / Navy: Navy solid, white/light text
    primary: "bg-navy text-bg hover:opacity-95 shadow-md shadow-navy/20",
    navy: "bg-navy text-bg hover:opacity-95 shadow-md shadow-navy/20",
    // Orange: Secondary urgent action, STRICTLY ink text (#1E272E)
    orange: "bg-orange text-ink hover:opacity-95 shadow-lg shadow-orange/25 font-bold",
    // Gold: Featured / VIP action, STRICTLY ink text (#1E272E)
    gold: "bg-gold text-ink hover:opacity-95 shadow-md shadow-gold/25 font-bold",
    // Secondary: Light surface pill with subtle border
    secondary: "bg-bg text-ink border border-navy/15 hover:bg-white shadow-sm",
    // Glass: Liquid glass pill
    glass: "glass text-navy hover:bg-white/60 shadow-sm",
    // Outline: Hairline border
    outline: "border border-navy/25 text-navy hover:bg-navy/5",
    // Ghost: Subtle highlight
    ghost: "text-navy hover:bg-navy/8",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "inline-flex items-center justify-center rounded-pill transition-colors cursor-pointer select-none",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="inline-flex shrink-0">{iconRight}</span>}
    </motion.button>
  );
}
