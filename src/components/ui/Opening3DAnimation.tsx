"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Star, Calendar, Users } from "lucide-react";
import Image from "next/image";

// 2-second cinematic intro sequence for complete 3D visibility
const AUTO_DISMISS_MS = 2000;

// Floating feature nodes data
const NODES = [
  { icon: Sparkles,  label: "AI Blueprinting",     color: "#F1C40F", x: -52, y: -70 },
  { icon: Calendar,  label: "Smart Timeline",       color: "#E67E22", x: 58,  y: -60 },
  { icon: Users,     label: "Guest Intelligence",   color: "#F1C40F", x: -60, y: 60  },
  { icon: Zap,       label: "Budget Precision",     color: "#E67E22", x: 52,  y: 72  },
  { icon: Star,      label: "Vendor Network",       color: "#F1C40F", x: 0,   y: -88 },
];

export function Opening3DAnimation({ onComplete }: { onComplete?: () => void }) {
  const [mounted, setMounted]   = useState(false);
  const [phase, setPhase]       = useState<"loading" | "reveal" | "hold" | "exit">("loading");
  const [isVisible, setIsVisible] = useState(true);
  const [stars, setStars] = useState<{ left: string; top: string; delay: number; duration: number }[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    // Generate star positions client-side only to avoid hydration mismatch
    setStars(
      Array.from({ length: 40 }, () => ({
        left: `${Math.random() * 100}%`,
        top:  `${Math.random() * 100}%`,
        delay: Math.random() * 2,
        duration: 1 + Math.random() * 1.5,
      }))
    );

    const seen = sessionStorage.getItem("festora_intro_seen");
    if (seen === "true") {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    const t1 = setTimeout(() => setPhase("reveal"), 150);
    const t2 = setTimeout(() => setPhase("hold"), 700);
    const t3 = setTimeout(handleDismiss, AUTO_DISMISS_MS);
    timerRef.current = t3;

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDismiss = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    sessionStorage.setItem("festora_intro_seen", "true");
    setPhase("exit");
    // Wait for exit animation then unmount
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 350);
  };

  if (!mounted || !isVisible) return null;

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#2C3E50", perspective: "1200px" }}
        >
          {/* ── Ambient Nebula Orbs ──────────────────────────────────── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full"
              style={{ background: "radial-gradient(circle, #E67E22 0%, transparent 70%)", filter: "blur(90px)" }}
            />
            <motion.div
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.14, 0.24, 0.14] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1.5 }}
              className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full"
              style={{ background: "radial-gradient(circle, #F1C40F 0%, transparent 70%)", filter: "blur(90px)" }}
            />
            {/* Subtle star field — generated client-side to avoid hydration mismatch */}
            {stars.map((star, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: star.duration, delay: star.delay }}
                className="absolute w-0.5 h-0.5 rounded-full bg-white"
                style={{ left: star.left, top: star.top }}
              />
            ))}
          </div>

          {/* ── 3D Gyroscopic Ring System ──────────────────────────── */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center mb-10 shrink-0"
               style={{ transformStyle: "preserve-3d" }}>

            {/* Ring 1 — Gold, tilted 65° X */}
            <motion.div
              animate={{ rotateZ: 360 }}
              transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid rgba(241,196,15,0.45)",
                boxShadow: "0 0 28px 4px rgba(241,196,15,0.18), inset 0 0 18px rgba(241,196,15,0.06)",
                transform: "rotateX(65deg) rotateY(20deg)",
                transformStyle: "preserve-3d",
              }}
            />

            {/* Ring 2 — Orange, tilted 25° X, 65° Y, reverse */}
            <motion.div
              animate={{ rotateZ: -360 }}
              transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
              className="absolute inset-6 rounded-full"
              style={{
                border: "2px solid rgba(230,126,34,0.55)",
                boxShadow: "0 0 24px 4px rgba(230,126,34,0.18), inset 0 0 12px rgba(230,126,34,0.06)",
                transform: "rotateX(25deg) rotateY(65deg)",
                transformStyle: "preserve-3d",
              }}
            />

            {/* Ring 3 — White horizontal disc */}
            <motion.div
              animate={{ rotateZ: 360 }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              className="absolute inset-12 rounded-full"
              style={{
                border: "1.5px solid rgba(255,255,255,0.25)",
                transform: "rotateX(78deg)",
                transformStyle: "preserve-3d",
              }}
            />

            {/* Orbiting Dot on Ring 1 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
              className="absolute inset-0 rounded-full"
              style={{ transform: "rotateX(65deg) rotateY(20deg)", transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#F1C40F] shadow-[0_0_12px_4px_rgba(241,196,15,0.5)]"
              />
            </motion.div>

            {/* Floating Feature Nodes */}
            {NODES.map(({ icon: Icon, label, color, x, y }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={phase !== "loading"
                  ? {
                      opacity: 1,
                      scale: 1,
                      y: [y, y - 8, y],
                      x: [x, x + (idx % 2 === 0 ? 4 : -4), x],
                    }
                  : { opacity: 0 }}
                transition={{
                  opacity: { delay: 0.8 + idx * 0.15, duration: 0.5 },
                  scale:   { delay: 0.8 + idx * 0.15, duration: 0.5 },
                  y: { repeat: Infinity, duration: 3 + idx * 0.4, ease: "easeInOut", delay: 0.8 + idx * 0.15 },
                  x: { repeat: Infinity, duration: 3.5 + idx * 0.4, ease: "easeInOut", delay: 0.8 + idx * 0.15 },
                }}
                className="absolute flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 backdrop-blur-lg text-[10px] font-extrabold whitespace-nowrap shadow-xl"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color,
                  left: "50%",
                  top: "50%",
                  marginLeft: x,
                  marginTop: y,
                  transform: "translate(-50%,-50%)",
                }}
              >
                <Icon className="w-3 h-3 shrink-0" style={{ color }} />
                {label}
              </motion.div>
            ))}

            {/* Central Logo Emblem */}
            <motion.div
              initial={{ scale: 0.3, rotateY: 180, opacity: 0 }}
              animate={phase !== "loading" ? { scale: 1, rotateY: 0, opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 1.0, type: "spring", stiffness: 130, damping: 16 }}
              className="relative z-20 w-32 h-32 rounded-[28px] flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.96)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.55), 0 0 0 2px rgba(255,255,255,0.9), 0 0 60px rgba(241,196,15,0.2)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute inset-0 rounded-[28px]"
                   style={{ background: "linear-gradient(135deg, rgba(241,196,15,0.12) 0%, transparent 50%, rgba(230,126,34,0.12) 100%)" }} />
              <Image
                src="/brand/logo.png"
                alt="Festora Logo"
                width={80}
                height={80}
                className="object-contain relative z-10 drop-shadow-md"
                priority
              />
            </motion.div>
          </div>

          {/* ── Typography cascade ────────────────────────────────── */}
          <div className="text-center z-20 max-w-lg px-6 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={phase !== "loading" ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/20 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#F1C40F]"
              style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}
            >
              <Sparkles className="w-3 h-3 text-[#F1C40F]" />
              Next-Generation Event Architecture
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={phase !== "loading" ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="text-5xl sm:text-6xl font-black tracking-tight text-white leading-none"
            >
              FESTORA AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={phase !== "loading" ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.35, duration: 0.7 }}
              className="text-sm text-white/70 max-w-sm mx-auto leading-relaxed"
            >
              Autonomous celebration orchestration for luxury weddings,
              milestone birthdays, and community festivals.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={phase !== "loading" ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.7, duration: 0.7 }}
              className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <button
                onClick={handleDismiss}
                className="px-8 py-3.5 rounded-full font-extrabold text-sm cursor-pointer flex items-center gap-2 transition-all hover:brightness-110 active:scale-95"
                style={{
                  background: "#E67E22",
                  color: "#1E272E",
                  boxShadow: "0 12px 28px rgba(230,126,34,0.45)",
                }}
              >
                Enter Festora Studio
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleDismiss}
                className="text-xs font-semibold text-white/55 hover:text-white/90 transition-colors px-4 py-2 cursor-pointer"
              >
                Skip Intro
              </button>
            </motion.div>

            {/* Progress bar auto-dismiss indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={phase !== "loading" ? { opacity: 1 } : {}}
              transition={{ delay: 2.0, duration: 0.4 }}
              className="flex items-center justify-center gap-2 pt-1"
            >
              <div className="h-[2px] w-24 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.12)" }}>
                <motion.div
                  initial={{ width: "0%" }}
                  animate={phase !== "loading" ? { width: "100%" } : {}}
                  transition={{ delay: 2.0, duration: (AUTO_DISMISS_MS - 2000) / 1000, ease: "linear" }}
                  className="h-full rounded-full"
                  style={{ background: "rgba(241,196,15,0.7)" }}
                />
              </div>
              <span className="text-[10px] text-white/40 font-medium">Auto-entering…</span>
            </motion.div>
          </div>

          {/* Loading spinner while phase = "loading" */}
          {phase === "loading" && (
            <div className="absolute inset-0 flex items-center justify-center z-30">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/80"
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
