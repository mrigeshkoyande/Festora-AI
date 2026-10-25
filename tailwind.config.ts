import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mandatory 5-Color System
        navy: {
          DEFAULT: "var(--navy)", // #2C3E50
          50: "color-mix(in srgb, var(--navy) 6%, white)",
          100: "color-mix(in srgb, var(--navy) 12%, white)",
          200: "color-mix(in srgb, var(--navy) 20%, white)",
          300: "color-mix(in srgb, var(--navy) 35%, white)",
          400: "color-mix(in srgb, var(--navy) 55%, white)",
          500: "var(--navy)",
          600: "color-mix(in srgb, var(--navy) 85%, var(--ink))",
          700: "color-mix(in srgb, var(--navy) 70%, var(--ink))",
          800: "color-mix(in srgb, var(--navy) 50%, var(--ink))",
          900: "color-mix(in srgb, var(--navy) 25%, var(--ink))",
          tint8: "rgba(44, 62, 80, 0.08)",
          tint16: "rgba(44, 62, 80, 0.16)",
          tint24: "rgba(44, 62, 80, 0.24)",
          tint40: "rgba(44, 62, 80, 0.40)",
          tint64: "rgba(44, 62, 80, 0.64)",
        },
        orange: {
          DEFAULT: "var(--orange)", // #E67E22
          soft: "rgba(230, 126, 34, 0.12)",
          tint24: "rgba(230, 126, 34, 0.24)",
          hover: "color-mix(in srgb, var(--orange) 90%, var(--ink))",
        },
        gold: {
          DEFAULT: "var(--gold)", // #F1C40F
          soft: "rgba(241, 196, 15, 0.16)",
          tint24: "rgba(241, 196, 15, 0.24)",
          hover: "color-mix(in srgb, var(--gold) 90%, var(--ink))",
        },
        bg: {
          DEFAULT: "var(--bg)", // #F8F9FA
        },
        ink: {
          DEFAULT: "var(--ink)", // #1E272E
          tint8: "rgba(30, 39, 46, 0.08)",
          tint16: "rgba(30, 39, 46, 0.16)",
          tint24: "rgba(30, 39, 46, 0.24)",
          tint40: "rgba(30, 39, 46, 0.40)",
          tint60: "rgba(30, 39, 46, 0.60)",
          tint80: "rgba(30, 39, 46, 0.80)",
        },
      },
      fontFamily: {
        grotesk: ["var(--font-grotesk)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "28px",
        "card-lg": "36px",
        pill: "9999px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(30, 39, 46, 0.18), 0 2px 6px rgba(30, 39, 46, 0.10)",
        "glass-strong": "0 16px 48px rgba(30, 39, 46, 0.24), 0 4px 12px rgba(30, 39, 46, 0.12)",
        "glass-elevated": "0 24px 64px rgba(30, 39, 46, 0.28), 0 8px 24px rgba(30, 39, 46, 0.16)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blobDrift1: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(40px, -30px) scale(1.12)" },
        },
        blobDrift2: {
          "0%, 100%": { transform: "translate(0, 0) scale(1.05)" },
          "50%": { transform: "translate(-50px, 40px) scale(0.95)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "blob-slow": "blobDrift1 18s ease-in-out infinite",
        "blob-reverse": "blobDrift2 22s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
