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
    "Next-Gen GenAI-powered celebration and event planning web application for weddings, milestone birthdays, and community galas.",
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
      "Autonomous event orchestration from concept to final toast. Eliminate coordination friction and curate verified world-class vendors effortlessly.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${grotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col bg-bg text-ink selection:bg-orange selection:text-ink"
        suppressHydrationWarning
      >
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
