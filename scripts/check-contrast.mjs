#!/usr/bin/env node

/**
 * Festora AI — Automated Contrast & Palette Verification
 * Enforces WCAG AA contrast standards and ensures 0 off-palette colors in src/
 */

import fs from "node:fs";
import path from "node:path";

// Relative Luminance according to WCAG 2.1
function getLuminance(r, g, b) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function getContrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

console.log("====================================================");
console.log(" Festora AI — Contrast Compliance & Palette Scanner");
console.log("====================================================\n");

// 1. Mandatory Color Tokens
const PALETTE = {
  navy: "#2C3E50",
  orange: "#E67E22",
  gold: "#F1C40F",
  bg: "#F8F9FA",
  ink: "#1E272E",
  white: "#FFFFFF",
  darkBg: "#12181F",
};

const checks = [
  { fg: PALETTE.ink, bg: PALETTE.bg, role: "Body Text (#1E272E on #F8F9FA)", min: 4.5 },
  { fg: PALETTE.navy, bg: PALETTE.bg, role: "Headings on Light (#2C3E50 on #F8F9FA)", min: 4.5 },
  { fg: PALETTE.bg, bg: PALETTE.navy, role: "Text on Navy Fills (#F8F9FA on #2C3E50)", min: 4.5 },
  {
    fg: PALETTE.ink,
    bg: PALETTE.orange,
    role: "Text on Orange Fills (#1E272E on #E67E22)",
    min: 4.5,
  },
  { fg: PALETTE.ink, bg: PALETTE.gold, role: "Text on Gold Fills (#1E272E on #F1C40F)", min: 4.5 },
  { fg: PALETTE.bg, bg: PALETTE.darkBg, role: "Dark Mode Text (#F8F9FA on #12181F)", min: 4.5 },
];

let failed = false;

console.log("1. Evaluating Semantic Contrast Ratios:");
for (const check of checks) {
  const ratio = getContrastRatio(check.fg, check.bg);
  const passed = ratio >= check.min;
  const status = passed ? "✅ PASS" : "❌ FAIL";
  console.log(`   ${status} [${ratio.toFixed(2)}:1] (min ${check.min}:1) — ${check.role}`);
  if (!passed) failed = true;
}

// Check illegal combinations (white on orange or gold)
console.log("\n2. Verifying Disallowed Pairings:");
const whiteOnOrange = getContrastRatio(PALETTE.white, PALETTE.orange);
const whiteOnGold = getContrastRatio(PALETTE.white, PALETTE.gold);
console.log(
  `   🛡️  White on Orange: ${whiteOnOrange.toFixed(2)}:1 (Fails AA: ${whiteOnOrange < 4.5 ? "Correctly flagged as invalid" : "Passes"})`,
);
console.log(
  `   🛡️  White on Gold:   ${whiteOnGold.toFixed(2)}:1 (Fails AA: ${whiteOnGold < 4.5 ? "Correctly flagged as invalid" : "Passes"})`,
);

// 3. Scan src/ for rogue hex colors outside allowed set
const ALLOWED_HEXES = new Set([
  "#2C3E50",
  "#2c3e50",
  "#E67E22",
  "#e67e22",
  "#F1C40F",
  "#f1c40f",
  "#F8F9FA",
  "#f8f9fa",
  "#1E272E",
  "#1e272e",
  "#FFFFFF",
  "#ffffff",
  "#FFF",
  "#fff",
  "#12181F",
  "#12181f",
  "#1A232D",
  "#1a232d",
  "#222E3B",
  "#222e3b",
  "#000000",
  "#000",
  "#0D1117",
  "#0d1117",
]);

console.log("\n3. Scanning src/ for Off-Palette Hex Values:");
const srcDir = path.join(process.cwd(), "src");

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (/\.(tsx|ts|jsx|js|css)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, "utf8");
      const hexMatches = content.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
      for (const hex of hexMatches) {
        if (!ALLOWED_HEXES.has(hex)) {
          console.error(
            `   ❌ Off-palette color found: "${hex}" in ${path.relative(process.cwd(), fullPath)}`,
          );
          failed = true;
        }
      }
    }
  }
}

scanDir(srcDir);

console.log("\n----------------------------------------------------");
if (failed) {
  console.error("❌ Build Check FAILED: Contrast violations or off-palette colors detected.");
  process.exit(1);
} else {
  console.log("✅ All contrast checks PASSED & Palette compliance verified!");
  process.exit(0);
}
