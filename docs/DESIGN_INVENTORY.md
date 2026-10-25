# Festora AI — Design Inventory & Stitch Screen Analysis

> **Source Reference:** Stitch Export (`/design-reference`)  
> **Mandatory Color Overrides Applied:** All Stitch colors (`#ffb59f`, `#ff6b3d`, `#131314`, etc.) are mapped to the Festora AI Mandatory 5-Color System (`--navy: #2C3E50`, `--orange: #E67E22`, `--gold: #F1C40F`, `--bg: #F8F9FA`, `--ink: #1E272E`).

---

## 1. Global System Tokens & Overrides

| Stitch Attribute | Stitch Value (Overridden) | Festora AI Mandatory Token | Role & Semantic Application |
|---|---|---|---|
| Primary Fill | `#ffb59f` / `#ff6b3d` | `--navy` (`#2C3E50`) / `--orange` (`#E67E22`) | Primary actions on light surfaces use `--orange` or `--navy`. Heads/navs use `--navy`. |
| Urgent / Active | `#ff6b3d` | `--orange` (`#E67E22`) | Urgent tasks, active bookings, primary CTAs on light surfaces. |
| Accent / Featured | `#e2c384` / `#d0b174` | `--gold` (`#F1C40F`) | Highlights, AI suggestions, pending states, sparkle moments. |
| Canvas Background | `#131314` (Dark-first) | `--bg` (`#F8F9FA`) | **Light-First** Default page canvas; alternating rich navy (`#2C3E50`) sections. |
| Primary Text | `#e5e2e3` | `--ink` (`#1E272E`) | High-contrast body text on light backgrounds; `#F8F9FA` text on Navy. |
| Success State | Varied | Solid Navy (`#2C3E50`) + Checkmark | **No green** allowed anywhere in product. |
| Error State | `#ffb4ab` / `#93000a` | Orange-to-Ink + Icon + Label | **No red** allowed anywhere in product. |

---

## 2. Screen Inventory

### Screen 1: Landing Page (`festora_ai_landing_page`)
- **Route:** `/`
- **Purpose:** High-conversion, agency-grade marketing landing page showcasing Festora AI's autonomous event planning platform.
- **Sections & Component Composition:**
  1. **Floating Liquid Glass Navbar:**
     - Pill container with backdrop blur, border sheen, and specular reflection.
     - Brand Logo (`/public/brand/logo.png`) + "Festora AI" wordmark in tight Grotesk.
     - Nav Links: Features, How It Works, Event Types, Pricing, Stories.
     - Actions: Log In text button, "Start planning free" Pill CTA (`--orange`), Avatar / profile anchor.
  2. **Hero Section:**
     - Ambient liquid glowing blobs (orange, gold, navy) drifting in background.
     - AI Pill Badge: `auto_awesome` icon + "Next-Gen Event Architecture powered by AI".
     - Oversized tight Grotesk Headline: *"Plan the day. Keep the magic."* (96–140px desktop, negative tracking).
     - Subtitle explaining AI orchestration from concept to final toast.
     - CTA Cluster: Primary pill button ("Start planning free" with arrow), secondary glass/pill button ("Watch demo" / interactive video modal).
     - Social Proof: Avatar stack of luxury planners + 5-gold-star rating + "Trusted by 15,000+ top-tier planners globally".
     - Hero Visual Composition: Curved photo frame (4/5 aspect ratio) overlapping 2 floating Liquid Glass UI cards:
       - Card A (Top): "Timeline Optimized — All vendor arrivals synchronized (98% Match)".
       - Card B (Bottom): "Budget Health — $4,250 saved via AI negotiation (On Track)".
  3. **Marquee Strip:**
     - Infinite smooth marquee: Luxury Weddings, Corporate Galas, VIP Birthdays, Product Launches, Charity Balls, Immersive Festivals.
  4. **Animated Stats Band:**
     - 3-column agency stat cards with count-up animation:
       - **40%**: Average time saved on manual logistics.
       - **2.3x**: More elite verified vendors compared to traditional directories.
       - **92%**: Planners staying strictly within allocated budgets.
  5. **Features Bento Grid:**
     - Card 1 (8-col): AI Copilot for Real-Time Logistics with backdrop image preview.
     - Card 2 (4-col): Curated Vetted Vendors with verification badge.
     - Card 3 (4-col): Dynamic Budgeting with allocation formula.
     - Card 4 (8-col): Seamless Client & Team Collaboration with multi-cursor seating preview.
  6. **Methodology ("How It Works"):**
     - Sticky 4-step agency workflow:
       - Step 01: Define Your Vision (Intake wizard).
       - Step 02: AI Blueprint Generation (Instant master plan).
       - Step 03: One-Click Booking & Syncing (Unified contracts).
       - Step 04: Flawless Day-Of Execution (Real-time run sheet).
  7. **Event Types Photo Showcase:**
     - 3 immersive portrait cards: Bespoke Nuptials, Conferences & Galas, Milestone Parties.
  8. **Live AI Demo Panel:**
     - Real-time interactive chat widget connected directly to API endpoint:
     - Prompt suggestions and sample live output showing simulated AI blueprinting.
  9. **Testimonials Carousel:**
     - 3 executive reviews with photos, 5-gold-star ratings, author credentials.
  10. **Pricing Matrix:**
      - Starter ($0/mo), Professional ($49/mo - Featured Glass Highlight), Enterprise ($199/mo).
  11. **Interactive FAQ Accordion:**
      - Smooth expanding questions answering vendor matching, collaboration, trials.
  12. **Final Call-to-Action & Giant Wordmark Footer:**
      - Gradient liquid background, dual CTAs, legal links, giant Festora AI wordmark.

---

### Screen 2: Authentication & Social Sign-In (`festora_ai_log_in_sign_up`)
- **Route:** `/login` & `/signup`
- **Purpose:** Seamless access with Google Auth, Magic Links, or credentials.
- **Components & Layout:**
  - Split-screen editorial layout (adapted to responsive card/split format).
  - Visual Side: Rich celebration imagery with floating glass testimonial badge.
  - Form Side:
    - Pill Tab Switcher: "Sign In" vs "Sign Up".
    - Social Auth: Google and Apple pill buttons with clean SVG icons.
    - Divider: "or continue with email".
    - Fields: Full Name (on sign up), Email Address, Password.
    - Checkbox: Terms of Service agreement.
    - Primary Pill CTA: "Continue" / "Get Started".

---

### Screen 3: Multi-Step Onboarding Wizard (`festora_ai_onboarding_wizard`)
- **Route:** `/onboarding`
- **Purpose:** 7-step guided event intake generating the first AI master plan.
- **Steps & Interactions:**
  - Progress indicator bar at top (14.28% per step).
  - **Step 1: Event Type** — Grand Wedding, Corporate Gala, Private Milestone (interactive selectable cards with radio highlights).
  - **Step 2: Fundamentals** — Event Title, Target Date picker, City/Destination input, Guest Count slider (50–2,000 guests).
  - **Step 3: Budget Allocation (INR/USD)** — Total budget range slider with quick buttons (₹15 Lakhs, ₹45 Lakhs, ₹1 Crore+).
  - **Step 4: Style & Vibe** — Mood chips (Royal Heritage, Boho Chic, Minimalist Elegance, Neon Futuristic, Botanical Garden, Art Deco Glamour, Rustic Vintage) + accent color picker.
  - **Step 5: Experiential Priorities** — Drag-and-drop or rank ordering: Gastronomy, Decor, Entertainment, Hospitality.
  - **Step 6: Special Requirements** — Dietary rules (e.g. Jain counter), cultural rituals (e.g. Marwari welcome), accessibility, valet parking, kids play area.
  - **Step 7: AI Processing Engine** — Animated pulsing AI generation screen ("Festora AI is crafting your plan...") with confetti burst transition to Dashboard.

---

### Screen 4: Command Center Dashboard (`festora_ai_dashboard`)
- **Route:** `/dashboard`
- **Purpose:** Central operational hub with real-time countdown, health ring, and quick actions.
- **Sections & Bento Grid:**
  - Sticky Sidebar Navigation with active pill highlights (`Dashboard`, `AI Assistant`, `Budget`, `Timeline`, `Vendors`, `Guests`, `Ideas`, `Seating`, `Run Sheet`, `Settings`).
  - Header: Welcome back, countdown ("47 days to go"), primary "Ask AI Assistant" and "Add Task" buttons.
  - Quick Action Pills: Log Expense, Import Guests, Contact Vendors, View Timeline, Seating Chart.
  - **Card 1: Countdown Widget** — Days remaining, event date, target milestones completed.
  - **Card 2: Plan Health Score Ring** — SVG circular progress ring (0–100, e.g. 92/100) + status and risk assessment.
  - **Card 3: Budget Overview Donut** — Total spent vs allocated, safe remaining funds.
  - **Card 4: AI Recommendations Feed** — Pinned insights, e.g. catering confirmation pending, RSVP surges.
  - **Card 5: RSVP Tracking Bar** — Segmented progress (Confirmed in Navy, Pending in Gold, Declined in Orange/Ink).
  - **Card 6: Upcoming Tasks** — Interactive checkboxes, priority chips, due date flags.
  - **Card 7: Vendor Bookings Pipeline** — Status cards for each hired service.

---

### Screen 5: Budget & Expense Intelligence (`festora_ai_budget_planner`)
- **Route:** `/budget`
- **Purpose:** Precise financial management, AI scenario optimization, receipts, and exports.
- **Components & Layout:**
  - Header Actions: Export Report (PDF/CSV/QuickBooks), Add Expense, **AI Optimize** button.
  - Metric Cards: Total Budget, Allocated (94.8%), Actual Spent, Remaining Safe Buffer.
  - Charts:
    - Donut breakdown by category (Venue & Catering, Production & AV, Marketing, Talent).
    - Monthly Stacked Bar Cash Flow forecast.
  - Data Table: Category line items with expandable sub-rows, progress bars, and status badges.
  - Slide-Over Drawer: **AI Budget Optimizer** with 3 scenarios:
    1. *Save 15% Budget Cut* (off-peak rate re-allocation).
    2. *Premium Experience Boost* (+15% impact into keynote & VIP gifts).
    3. *Zero-Risk Buffer Protection* (freeze discretionary spend).
  - Modals:
    - Add New Expense Modal with Drag-and-Drop Receipt Upload (AI Auto-Scan).
    - Export Financial Data Modal (PDF, CSV, Accounting Sync).

---

### Screen 6: Master Timeline & Production Tasks (`festora_ai_timeline_tasks`)
- **Route:** `/timeline`
- **Purpose:** Phased production roadmap, calendar view, and Kanban execution.
- **Components & Layout:**
  - Header Actions: Regenerate with AI, Sync to Google Calendar/ICS, Add Task.
  - View Switcher: **Gantt / Roadmap**, **Calendar** (data-dense grid on `#F8F9FA`), **Kanban**.
  - Metrics: Total tasks, overdue tasks (highlighted in Orange/Ink), completion rate.
  - Gantt View:
    - Phase 1: Conceptualization & Budgeting.
    - Phase 2: Vendor Curation & Tastings.
    - Phase 3: Production Design & Day-Of Run Sheet.
    - Dependencies, assignees avatars, status chips.
  - Task Detail Drawer: slide-over drawer for editing dates, dependencies, subtasks, and notes.

---

### Screen 7: Vendor Marketplace & Pipeline (`festora_ai_vendor_marketplace`)
- **Route:** `/vendors`
- **Purpose:** Discovery, comparison, and booking pipeline for 60+ verified wedding & event vendors.
- **Components & Layout:**
  - Tabs: **My Checklist & Pipeline** vs **Discover Vendors**.
  - Checklist Pipeline: Categorized status tracking (Contract Signed, Proposal Review, Sourcing, Deposit Paid).
  - Discovery Grid:
    - Filter Bar: Category, Price Range, Location, AI Match Score sort.
    - Comparison bar: compare up to 3 vendors side-by-side.
    - Vendor Cards: Match score badge (e.g. 98% Match), gallery, rating, starting price, "View Profile".
  - Vendor Profile Modal: full portfolio, package tiers, reviews, and quote request form.

---

### Screen 8: Guests & RSVP Intelligence (`festora_ai_guests_rsvp`)
- **Route:** `/guests`
- **Purpose:** Guest list management, dietary tracking, invitation dispatcher, and public RSVP portal.
- **Components & Layout:**
  - Stat Cards: Total Invited, Confirmed, Declined, Pending.
  - Guest Data Table: Group sides (Family, Wedding Party, Friends, Colleagues), contact details, RSVP status, meal preference, plus-one tracking, table assignment.
  - Bulk Actions: Change table, mark confirmed, send reminders.
  - Mobile RSVP Preview Phone Frame: live synchronized preview of the guest-facing RSVP page.
  - Send Invitations Drawer: Email & WhatsApp/SMS dispatch with live template preview.

---

### Screen 9: AI Planning Assistant & Copilot (`festora_ai_ai_assistant`)
- **Route:** `/ai-assistant`
- **Purpose:** Full-featured generative planning chat with streaming responses, tool calling, and plan context.
- **Components & Layout:**
  - Left / Main Chat Interface:
    - Context bar showing active event sync.
    - Message history with interactive embedded widgets (dynamic budget proposals, caterer shortlists, timeline adjustments).
    - AI Action toolbar: Regenerate, Refine, Thumbs feedback, Copy.
    - Suggestion Chips: "Generate luxury mood board grid", "Draft 3-day timeline", "Optimize VIP seating", "Draft formal invitation".
    - Glass Composer: Multi-line prompt input, attachment button, image inspiration, voice dictation, and Send button.
  - Right Plan Context Sidebar:
    - Active event summary card with photo and vital stats.
    - Pinned Context Items: current budget, selected vendors, risk flags.

---

### Screen 10: Seating Planner & Floor Layout (`festora_ai_seating`)
- **Route:** `/seating`
- **Purpose:** Interactive 2D seating canvas with round and rectangular tables, guest allocation, AI auto-arranger, and PDF export.
- **Components & Layout:**
  - Toolbar: Add Round Table (8/10/12 seats), Add Rectangular Table, AI Auto-Arrange Guests, Export Seating PDF.
  - Unassigned Guests Drawer: Quick search, side/group badges (Bride's side, Groom's side, VIPs).
  - Canvas: 2D draggable tables with seat nodes, occupancy stats, and relationship conflict alerts.
  - Table Details Panel: Table name, capacity, dietary flags breakdown, notes.

---

### Screen 11: Day-Of Run Sheet & Live Production (`festora_ai_run_sheet`)
- **Route:** `/run-sheet`
- **Purpose:** Minute-by-minute execution run sheet with real-time current time tracker, tap-to-call vendor shortcuts, and offline mode.
- **Components & Layout:**
  - Header: Live clock, Active milestone badge, Share Emergency Run Sheet link + QR.
  - Filter: All items, Ceremony, Reception, Logistics, Vendor Cues.
  - Timeline Cards: Exact time slot, cue title, lead contact with one-tap phone call, audio/lighting notes, completed checkbox.
  - Live Tracker: Glowing orange indicator bar showing the exact time progression.

---

### Screen 12: Ideas, Themes & Moodboard (`festora_ai_ideas`)
- **Route:** `/ideas`
- **Purpose:** Curated moodboards, color palette generators, food & beverage concepts, invitation wording generator.
- **Components & Layout:**
  - Palette Swatches Generator: 5-color harmony preview with hex codes and CSS export.
  - Visual Moodboard Bento: High-res decor, floral, table setting, and lighting aesthetics.
  - AI Invitation Copywriter: Formal, whimsical, royal, or modern wording with one-click copy and save.
  - Return Gift & Entertainment Ideas: Curated suggestions mapped to budget tiers.

---

### Screen 13: Collaboration & Workspace Settings (`festora_ai_settings`)
- **Route:** `/settings`
- **Purpose:** Manage event details, team members, collaborator roles (Owner, Collaborator, Vendor, Guest-view), notifications, and billing.
- **Components & Layout:**
  - Tab navigation: Event Details, Team & Roles, Notifications, Billing & Plan, Danger Zone.
  - Team management: Member list with role dropdowns, invite modal by email.
  - Notification preferences: WhatsApp, SMS, Email frequency switches.

---

### Screen 14: Public Event Celebration Microsite (`festora_ai_microsite`)
- **Route:** `/celebration/[slug]`
- **Purpose:** Guest-facing wedding/celebration website with love story, schedule, interactive venue map, RSVP form, and gift registry.
- **Components & Layout:**
  - Hero with couple/celebrant portrait, countdown timer, event date & venue.
  - Love Story / Event Concept narrative section.
  - Multi-day Schedule with calendar reminder download.
  - Interactive RSVP Form submitting directly to guest database.
  - Venue location map & accommodation recommendations.

