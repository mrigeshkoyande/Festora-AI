"use client";

import React, { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function useOverlayAccessibility(isOpen: boolean, onClose: () => void) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFirstControl = () => {
      const firstFocusable = containerRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      (firstFocusable ?? containerRef.current)?.focus();
    };
    const frame = window.requestAnimationFrame(focusFirstControl);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !containerRef.current) return;

      const focusable = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusable.length === 0) {
        event.preventDefault();
        containerRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocusRef.current?.isConnected) previousFocusRef.current.focus();
    };
  }, [isOpen, onClose]);

  return containerRef;
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "max-w-xl",
  className,
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  maxWidth?: string;
  className?: string;
}) {
  const generatedTitleId = useId();
  const generatedDescId = useId();
  const dialogRef = useOverlayAccessibility(isOpen, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/50 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            aria-labelledby={title ? generatedTitleId : undefined}
            aria-describedby={description ? generatedDescId : undefined}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className={cn(
              "relative w-full rounded-card-lg bg-white border border-navy/15 shadow-2xl p-6 sm:p-8 z-10 my-8 focus:outline-none",
              maxWidth,
              className,
            )}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                {title && (
                  <h3 id={generatedTitleId} className="font-grotesk text-2xl font-bold text-navy">
                    {title}
                  </h3>
                )}
                {description && (
                  <p id={generatedDescId} className="text-sm text-ink/70 mt-1">
                    {description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="min-h-11 min-w-11 p-2 rounded-full hover:bg-navy/8 text-ink/60 hover:text-ink transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-navy"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function Drawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = "max-w-xl",
  className,
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: string;
  className?: string;
}) {
  const generatedTitleId = useId();
  const drawerRef = useOverlayAccessibility(isOpen, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer Slide Panel */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            aria-labelledby={title ? generatedTitleId : undefined}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={cn(
              "absolute inset-y-0 right-0 w-full bg-white border-l border-navy/15 shadow-2xl flex flex-col z-10 focus:outline-none",
              width,
              className,
            )}
          >
            {/* Header */}
            <div className="p-6 border-b border-navy/10 flex items-center justify-between bg-bg/60">
              <div>
                {title && (
                  <h2 id={generatedTitleId} className="font-grotesk text-xl font-bold text-navy">
                    {title}
                  </h2>
                )}
                {subtitle && <p className="text-xs text-ink/70 mt-0.5">{subtitle}</p>}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close drawer"
                className="min-h-11 min-w-11 p-2 rounded-full hover:bg-navy/8 text-ink/60 hover:text-ink transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-navy"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
