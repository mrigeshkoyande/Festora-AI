# AGENTS.md — Festora AI Autonomous Agent Architecture & Guidelines

> This document provides behavioral guidelines, architectural conventions, and validation requirements for autonomous AI agents and engineers extending the Festora AI codebase.

---

## 1. Core Mission & Problem Statement

Festora AI is a production-grade, GenAI-powered celebration and event planning web application.  
**Core Goal:** Help users organize weddings, milestone birthdays, and community events with budgets, timelines, vendor checklists, and personalized ideas.

---

## 2. Mandatory Rules & Inviolable Constraints

### A. The 5-Color System (Non-Negotiable)
Under no circumstances may an agent introduce colors outside this mandatory palette:
- `--navy: #2C3E50` (Primary foundation, headings, navigation, primary actions)
- `--orange: #E67E22` (Secondary, urgent milestones, active bookings, primary CTAs on light surfaces)
- `--gold: #F1C40F` (Accent, pending states, AI suggestions, featured badges)
- `--bg: #F8F9FA` (Neutral light canvas, data grids, tabular layouts)
- `--ink: #1E272E` (Neutral dark body text, and text ON orange and gold fills)

**Critical Semantic Rules:**
1. **Never use green for success:** Always use Solid Navy (`#2C3E50`) with a checkmark icon.
2. **Never use red for errors:** Always use Orange-to-Ink (`#E67E22` / `#1E272E`) with a warning icon and text label.
3. **Text on Orange or Gold fills:** Must **ALWAYS** be `#1E272E` (never white).
4. **Validation:** Run `node scripts/check-contrast.mjs` before committing changes. If any off-palette hex value or contrast failure occurs, the build must fail.

### B. Liquid Glass vs Solid Surface Boundary
- **Signature Glass Surfaces:** Pill navigation, 3D intro gyroscopes, command palette (⌘K), modals, drawers, toasts, and AI chat composer use `<GlassSurface>` (`.glass`, `.glass-strong`).
- **Data-Dense Views:** Dense data tables, calendar grids, Kanban cards, and budget line items strictly sit on solid `#F8F9FA` / white surfaces to ensure 100% legibility and zero visual blur behind dense figures.

### C. Logo Integrity
- Never distort, recolor, or crop `/public/brand/logo.png`.
- When displayed over dark backgrounds, place the logo inside a clean white/glass protective chip.

---

## 3. Directory Structure & Key Pathways

```
Festora-AI/
├── docs/
│   ├── DESIGN_INVENTORY.md   # Screen inventory mapping Stitch files to 5-color tokens
│   ├── DESIGN_SYSTEM.md      # Design system documentation & contrast tables
│   ├── FEATURES.md           # 32-feature matrix (Sections A–G)
│   └── ARCHITECTURE.md       # High-level system architecture
├── prisma/
│   ├── schema.prisma         # Relational database schema (25+ models)
│   └── seed.ts               # Seeds 3 demo events, 60+ vendors, tasks, blogs
├── public/
│   ├── brand/                # Logo, icons, OG image, email header
│   └── manifest.json         # PWA web manifest
├── scripts/
│   └── check-contrast.mjs    # Automated WCAG AA contrast & hex scanner
├── src/
│   ├── app/
│   │   ├── page.tsx          # Landing page with 3D intro, live AI demo, bento
│   │   ├── onboarding/       # 7-step guided intake wizard
│   │   ├── dashboard/        # Operational command center
│   │   ├── budget/           # Financial intelligence & 3-scenario AI optimizer
│   │   ├── timeline/         # Gantt roadmap, calendar grid, Kanban boards
│   │   ├── vendors/          # Directory, checklist pipeline, 3-way compare
│   │   ├── guests/           # Roster, meal preferences, mobile RSVP preview
│   │   ├── ai-assistant/     # Generative chat with tool calling & plan context
│   │   ├── seating/          # 2D interactive seating canvas & auto-arranger
│   │   ├── run-sheet/        # Day-of live timeline with tap-to-call vendor shortcuts
│   │   ├── ideas/            # Moodboard bento, color swatches, AI copywriter
│   │   ├── settings/         # Team roles, notifications, AI credit usage
│   │   ├── celebration/[slug]# Guest-facing public celebration website
│   │   ├── features/         # Features showcase page
│   │   ├── pricing/          # Dedicated pricing matrix with monthly/annual toggle
│   │   ├── about/            # Design manifesto & agency story
│   │   ├── blog/             # Editorial guides & articles
│   │   ├── contact/          # Concierge inquiry form & studio addresses
│   │   └── not-found.tsx     # Custom 404 page ("This party moved venues")
│   ├── components/
│   │   ├── layout/           # Fixed Navbar, Footer, WorkspaceShell
│   │   └── ui/               # GlassSurface, 3D Intro, Button, Badge, Dialog, etc.
│   └── lib/
│       ├── ai/provider.ts    # Dual-engine AI (Gemini 1.5 Flash + Deterministic)
│       ├── db.ts             # Prisma client singleton
│       └── utils.ts          # ClassValue cn helper
└── README.md                 # Primary project documentation
```

---

## 4. AI Dual-Engine Architecture (`src/lib/ai/provider.ts`)

Festora AI employs a robust dual-engine approach to ensure 100% uptime:
1. **Gemini 1.5 Flash Engine:** Active when `GEMINI_API_KEY` is present in the environment. Performs contextual generation, semantic vendor matching, and natural language tool calls.
2. **Deterministic Fallback Engine:** Executes when offline or if third-party API limits are hit. Outputs schema-validated JSON with:
   - Mathematically verified 100% budget sums
   - Culturally appropriate rituals (e.g. Jaipur royal weddings, Marwari baraat, pure Jain counters)
   - Phase-aligned timeline schedules

---

## 5. Routine Agent Workflows

### Running Database Migrations & Seeds:
```bash
npx prisma db push
npx prisma db seed
```

### Verifying Contrast & Palette Compliance:
```bash
node scripts/check-contrast.mjs
```

### Building the Production Application:
```bash
npm run build
```

---

## 6. Testing & Quality Checkpoints

Before concluding any development phase:
1. Run `node scripts/check-contrast.mjs` and ensure 0 violations.
2. Confirm no off-palette hex values exist in `src/`.
3. Verify that the fixed navbar remains docked with proper frosted glass blur on scroll.
4. Ensure responsive behavior across desktop (1440px), tablet (834px), and mobile (390px).
