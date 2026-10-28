import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { LiquidGlassFilter } from "@/components/ui/LiquidGlassFilter";
import { CommandPalette } from "@/components/ui/CommandPalette";

const grotesk = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2C3E50",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://festora.ai"),
  title: "Festora AI — Autonomous Celebration & Event Planner",
  description:
    "A planning prototype for turning wedding, milestone, and community event details into structured budgets, timelines, guest plans, and run sheets.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Festora AI — Plan the Day. Keep the Magic.",
    description:
      "Event planning workflows from intake to budgets, timelines, guest logistics, and run sheets, with deterministic fallback planning when AI is unavailable.",
    url: "https://festora.ai",
    siteName: "Festora AI",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Festora AI Event Architecture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Festora AI — Autonomous Celebration & Event Planner",
    description: "Plan the day. Keep the magic. AI-powered wedding & celebration planning.",
    images: ["/brand/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col bg-bg text-ink selection:bg-orange selection:text-ink"
        suppressHydrationWarning
      >
        {/* Skip to Main Content Link for Keyboard & Screen Reader Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2.5 focus:bg-navy focus:text-bg focus:rounded-pill focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-gold font-grotesk text-xs font-bold transition-all"
        >
          Skip to main content
        </a>

        {/* SVG Liquid Refraction Filter */}
        <LiquidGlassFilter />

        {/* Main Application Container */}
        <div className="flex-1 flex flex-col">{children}</div>

        {/* Global ⌘K Command Palette */}
        <CommandPalette />
      </body>
    </html>
  );
}
