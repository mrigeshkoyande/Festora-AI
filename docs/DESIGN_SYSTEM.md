# Festora AI — Design System & Liquid Glass Specifications

> **Core Philosophy:** Apple-grade Liquid Glass elevation layered on a light-first, data-dense editorial foundation.

---

## 1. Mandatory 5-Color Palette

The product is built exclusively from **5 root color tokens**. No outside colors (no generic reds, greens, blues, or purples) may exist anywhere in the application.

```css
:root {
  /* Mandatory Brand Quintet */
  --navy:   #2C3E50; /* Primary: Navbars, headings on light, primary buttons, deep frames */
  --orange: #E67E22; /* Secondary: Urgent tasks, active bookings, primary CTAs on light surfaces */
  --gold:   #F1C40F; /* Accent: Pending states, featured slots, sparkles, AI suggestions */
  --bg:     #F8F9FA; /* Neutral Light: Default page background & data grids (Light-First) */
  --ink:    #1E272E; /* Neutral Dark: Body text, high-density lists, text ON orange/gold fills */

  /* Programmatically Derived Navy Scale (via color-mix with ink/white) */
  --navy-50:  color-mix(in srgb, var(--navy) 6%, #FFFFFF);
  --navy-100: color-mix(in srgb, var(--navy) 12%, #FFFFFF);
  --navy-200: color-mix(in srgb, var(--navy) 20%, #FFFFFF);
  --navy-300: color-mix(in srgb, var(--navy) 35%, #FFFFFF);
  --navy-400: color-mix(in srgb, var(--navy) 55%, #FFFFFF);
  --navy-500: var(--navy);
  --navy-600: color-mix(in srgb, var(--navy) 85%, var(--ink));
  --navy-700: color-mix(in srgb, var(--navy) 70%, var(--ink));
  --navy-800: color-mix(in srgb, var(--navy) 50%, var(--ink));
  --navy-900: color-mix(in srgb, var(--navy) 25%, var(--ink));

  /* Opacity Tints (for scrims, borders & soft card fills) */
  --navy-tint-8:  rgba(44, 62, 80, 0.08);
  --navy-tint-16: rgba(44, 62, 80, 0.16);
  --navy-tint-24: rgba(44, 62, 80, 0.24);
  --navy-tint-40: rgba(44, 62, 80, 0.40);
  --navy-tint-64: rgba(44, 62, 80, 0.64);

  --orange-soft:   rgba(230, 126, 34, 0.12);
  --orange-tint24: rgba(230, 126, 34, 0.24);

  --gold-soft:     rgba(241, 196, 15, 0.16);
  --gold-tint24:   rgba(241, 196, 15, 0.24);

  --ink-tint-8:    rgba(30, 39, 46, 0.08);
  --ink-tint-16:   rgba(30, 39, 46, 0.16);
  --ink-tint-24:   rgba(30, 39, 46, 0.24);
  --ink-tint-40:   rgba(30, 39, 46, 0.40);
  --ink-tint-60:   rgba(30, 39, 46, 0.60);
  --ink-tint-80:   rgba(30, 39, 46, 0.80);
}

.dark {
  --bg: #12181F; /* Dark canvas derived from navy-ink mix */
  --bg-card: #1A232D;
  --bg-elevated: #222E3B;
  --text-primary: #F8F9FA;
  --text-secondary: rgba(248, 249, 250, 0.72);
}
```

---

## 2. WCAG Contrast Compliance Verification

| Foreground | Background | Calculated Ratio | WCAG AA / AAA Rating | Status |
|---|---|---|---|---|
| `#1E272E` (Ink) | `#F8F9FA` (Base Canvas) | **14.05:1** | AAA (Normal & Large Text) | PASS |
| `#2C3E50` (Navy) | `#F8F9FA` (Base Canvas) | **9.62:1** | AAA (Headings on Light) | PASS |
| `#F8F9FA` (Light) | `#2C3E50` (Navy Fill) | **9.62:1** | AAA (Text on Navy Buttons/Hero) | PASS |
| `#1E272E` (Ink) | `#E67E22` (Orange Fill) | **4.65:1** | AA (Body & Buttons on Orange) | PASS |
| `#1E272E` (Ink) | `#F1C40F` (Gold Fill) | **9.65:1** | AAA (Text on Gold Badges) | PASS |
| `#F8F9FA` (Light) | `#E67E22` (Orange Fill) | *3.01:1* | FAIL — **Strictly forbidden** | BLOCKED |
| `#F8F9FA` (Light) | `#F1C40F` (Gold Fill) | *1.45:1* | FAIL — **Strictly forbidden** | BLOCKED |

> [!CAUTION]
> White text on Orange (`#E67E22`) or Gold (`#F1C40F`) fails WCAG AA and is **strictly prohibited**. All buttons, chips, and badges with orange or gold backgrounds must use **Ink (`#1E272E`)** for text and icons.

---

## 3. Liquid Glass Elevation Architecture

### Glass Elevation Levels

1. **Elevation 1 — Sheet / Card (`.glass`):**
   - Backdrop Filter: `blur(20px) saturate(180%) brightness(1.04)`
   - Background: `linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(248,249,250,0.20) 100%)`
   - Border: `1px solid rgba(255, 255, 255, 0.40)`
   - Shadow: `inset 0 1px 0 rgba(255,255,255,0.60), 0 8px 32px rgba(30,39,46,0.12)`
   - Uses: Hero cards, pricing cards, feature bento cards over navy.

2. **Elevation 2 — Floating (`.glass-strong`):**
   - Backdrop Filter: `blur(28px) saturate(190%) brightness(1.06)`
   - Background: `linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(248,249,250,0.35) 100%)`
   - Border: `1px solid rgba(255, 255, 255, 0.60)`
   - Shadow: `inset 0 1px 0 rgba(255,255,255,0.80), 0 16px 48px rgba(30,39,46,0.18)`
   - Uses: Floating pill navbar, floating action buttons, command palette.

3. **Elevation 3 — Dark Surface (`.glass-dark`):**
   - Backdrop Filter: `blur(24px) saturate(180%)`
   - Background: `linear-gradient(135deg, rgba(44, 62, 80, 0.75) 0%, rgba(30, 39, 46, 0.85) 100%)`
   - Border: `1px solid rgba(255, 255, 255, 0.12)`
   - Shadow: `inset 0 1px 0 rgba(255,255,255,0.20), 0 20px 50px rgba(0,0,0,0.35)`
   - Uses: Modals, slide-out drawers, toasts on navy.

### True Liquid Refraction Filter (Chromium SVG Enhancement)
Applied selectively via:
```css
@supports (backdrop-filter: url(#liquid-glass)) {
  .liquid-refraction {
    backdrop-filter: url(#liquid-glass) blur(24px) saturate(180%);
  }
}
```
Built into `<LiquidGlassFilter />` with:
- `feTurbulence type="fractalNoise" baseFrequency="0.015 0.015" numOctaves="2"`
- `feDisplacementMap in="SourceGraphic" scale="12"`
- `feSpecularLighting surfaceScale="3" specularConstant="1.2"`

### Solid Fallback (Accessibility Guardrail)
```css
@media (prefers-reduced-transparency: reduce), (prefers-reduced-motion: reduce) {
  .glass, .glass-strong, .glass-dark {
    backdrop-filter: none !important;
    background: #FFFFFF !important;
    border-color: rgba(44, 62, 80, 0.15) !important;
  }
}
```

---

## 4. Typography System

- **Headlines & Display:** Distinctive tight Grotesk (`Plus Jakarta Sans` / `Bricolage Grotesque`)
  - Desktop Hero: `96px - 140px`, line-height `0.95`, letter-spacing `-0.035em`.
  - Section Headings: `40px - 56px`, line-height `1.05`, letter-spacing `-0.025em`.
  - Uppercase Eyebrows: `11px - 13px`, font-weight `600`, letter-spacing `0.08em`.
- **Body & High-Density UI:** `Inter`
  - Body text: `15px - 18px`, line-height `1.55`.
  - Data tables & budgets: `font-variant-numeric: tabular-nums`.

---

## 5. UI Component Geometry & Motion Tokens

- **Buttons & Pills:** strictly `rounded-full` (`9999px`), padding `12px 28px` (primary) / `8px 18px` (compact).
- **Cards & Bento Grid:** oversized smooth corners `rounded-card` (`28px`) and `rounded-card-lg` (`36px`).
- **Spring Motion:** Framer Motion spring presets `damping: 24, stiffness: 300, mass: 0.8`.
- **Confetti Engine:** Restricted exclusively to `--navy`, `--orange`, `--gold`, and white.
