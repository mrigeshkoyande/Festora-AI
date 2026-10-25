"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  IndianRupee,
  Calendar,
  Store,
  Users,
  Lightbulb,
  Armchair,
  FileSpreadsheet,
  Settings,
  Search,
  Bell,
  User,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { GlassSurface } from "@/components/ui/GlassSurface";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export interface WorkspaceShellProps {
  children: React.ReactNode;
  activeTab?: string;
}

export function WorkspaceShell({ children, activeTab }: WorkspaceShellProps) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: "AI Assistant", href: "/ai-assistant", icon: <Bot className="w-5 h-5 text-orange" /> },
    { label: "Budget", href: "/budget", icon: <IndianRupee className="w-5 h-5 text-gold" /> },
    { label: "Timeline", href: "/timeline", icon: <Calendar className="w-5 h-5" /> },
    { label: "Vendors", href: "/vendors", icon: <Store className="w-5 h-5" /> },
    { label: "Guests", href: "/guests", icon: <Users className="w-5 h-5" /> },
    { label: "Ideas", href: "/ideas", icon: <Lightbulb className="w-5 h-5 text-gold" /> },
    { label: "Seating", href: "/seating", icon: <Armchair className="w-5 h-5" /> },
    { label: "Run Sheet", href: "/run-sheet", icon: <FileSpreadsheet className="w-5 h-5" /> },
    { label: "Settings", href: "/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-bg text-ink flex">
      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-72 bg-white z-40 flex-col py-6 px-4 border-r border-navy/10 shadow-sm">
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-3 px-3 mb-8">
          <div className="w-9 h-9 rounded-full bg-white p-1 flex items-center justify-center border border-navy/10 shadow-sm">
            <Image
              src="/brand/logo.png"
              alt="Festora Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="font-grotesk font-extrabold text-xl text-navy">
            Festora AI
          </span>
        </Link>

        {/* Sidebar Nav Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
          {navItems.map((item) => {
            const isActive = activeTab
              ? item.href === `/${activeTab}` || item.href.includes(activeTab)
              : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all",
                  isActive
                    ? "bg-navy text-bg shadow-sm"
                    : "text-ink/75 hover:bg-navy/6 hover:text-navy"
                )}
              >
                <span className={cn(isActive ? "text-bg" : "text-navy/70")}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Active Event Card */}
        <div className="mt-auto p-4 rounded-card bg-bg border border-navy/10">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
              Active Event
            </span>
            <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
          </div>
          <p className="text-xs font-bold text-navy truncate">
            Ananya & Rohan's Wedding
          </p>
          <p className="text-[11px] text-ink/60 mt-0.5">Jaipur • 47 days to go</p>
        </div>
      </aside>

      {/* Mobile Sidebar Drawer */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="relative w-72 bg-white h-full z-10 flex flex-col p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/brand/logo.png" alt="Logo" width={28} height={28} />
                <span className="font-grotesk font-extrabold text-lg text-navy">
                  Festora AI
                </span>
              </Link>
              <button onClick={() => setMobileSidebarOpen(false)}>
                <X className="w-5 h-5 text-ink/60" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all",
                    pathname === item.href
                      ? "bg-navy text-bg"
                      : "text-ink/75 hover:bg-navy/8"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-72 min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 h-18 bg-white/80 backdrop-blur-md border-b border-navy/10 px-6 md:px-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-full hover:bg-navy/8 text-navy"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("open-command-palette"));
                }
              }}
              className="flex items-center gap-2 text-ink/50 bg-bg px-4 py-2 rounded-pill border border-navy/10 w-64 md:w-80 cursor-pointer hover:border-navy/30 transition-colors"
            >
              <Search className="w-4 h-4 text-navy/60" />
              <span className="text-xs">Search planning items... (⌘K)</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-full hover:bg-navy/8 text-navy relative" title="Notifications">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange" />
            </button>
            <Link
              href="/dashboard"
              className="w-9 h-9 rounded-full bg-navy text-bg flex items-center justify-center font-bold text-xs shadow-sm hover:opacity-90"
              title="Priya Sharma Profile"
            >
              PS
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 px-6 md:px-10 py-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
