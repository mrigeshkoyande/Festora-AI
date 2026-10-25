"use client";

import React, { useRef, useCallback } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// "elevation" is accepted as an alias for "variant" for backward compatibility
type GlassVariant = "card" | "strong" | "dark" | "pill" | "floating";

export interface GlassSurfaceProps extends HTMLMotionProps<"div"> {
  variant?: GlassVariant;
  /** @deprecated use variant instead */
  elevation?: GlassVariant;
  interactive?: boolean;
  withSheen?: boolean;
  liquidRefraction?: boolean;
  children?: React.ReactNode;
  /** When true, children render with display:contents so they participate directly in the parent flex/grid. */
  transparent?: boolean;
}

export function GlassSurface({
  variant,
  elevation,
  interactive = true,
  withSheen = true,
  liquidRefraction = false,
  transparent = false,
  className,
  children,
  ...props
}: GlassSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  // Resolve variant: explicit variant wins, then elevation, then "card"
  const resolvedVariant: GlassVariant = variant ?? elevation ?? "card";

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (containerRef.current) {
        containerRef.current.style.setProperty("--mx", `${x}px`);
        containerRef.current.style.setProperty("--my", `${y}px`);
      }
    });
  }, [interactive]);

  const variantClasses: Record<GlassVariant, string> = {
    card:     "glass rounded-card",
    strong:   "glass-strong rounded-card",
    dark:     "glass-dark rounded-card text-bg",
    pill:     "glass-strong rounded-pill px-6 py-2.5",
    floating: "glass-strong rounded-card shadow-2xl",
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        variantClasses[resolvedVariant],
        interactive && "glass-interactive",
        liquidRefraction && "liquid-refraction",
        className
      )}
      {...props}
    >
      {/* children render inline — they participate in the parent flex/grid
          The glass ::before/::after sheen effects are on the motion.div (pointer-events:none, z-index:1/2 in CSS),
          so content just needs to be on top. We use a wrapper only when not transparent. */}
      {transparent ? (
        children
      ) : (
        <div style={{ position: "relative", zIndex: 10 }}>{children}</div>
      )}
    </motion.div>
  );
}
