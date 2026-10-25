---
name: Editorial Agency System
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#3a393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1c1b1c'
  surface-container: '#201f20'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353436'
  on-surface: '#e5e2e3'
  on-surface-variant: '#e1bfb6'
  inverse-surface: '#e5e2e3'
  inverse-on-surface: '#313031'
  outline: '#a88a81'
  outline-variant: '#59413a'
  surface-tint: '#ffb59f'
  primary: '#ffb59f'
  on-primary: '#5f1600'
  primary-container: '#ff6b3d'
  on-primary-container: '#611700'
  inverse-primary: '#ae3203'
  secondary: '#e2c384'
  on-secondary: '#402d00'
  secondary-container: '#594411'
  on-secondary-container: '#d0b174'
  tertiary: '#c9c6c0'
  on-tertiary: '#31312c'
  tertiary-container: '#9c9a94'
  on-tertiary-container: '#32322e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbd1'
  primary-fixed-dim: '#ffb59f'
  on-primary-fixed: '#3a0a00'
  on-primary-fixed-variant: '#862300'
  secondary-fixed: '#ffdfa0'
  secondary-fixed-dim: '#e2c384'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#594411'
  tertiary-fixed: '#e5e2db'
  tertiary-fixed-dim: '#c9c6c0'
  on-tertiary-fixed: '#1c1c18'
  on-tertiary-fixed-variant: '#474742'
  background: '#131314'
  on-background: '#e5e2e3'
  surface-variant: '#353436'
typography:
  display-xl:
    fontFamily: Bricolage Grotesque
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.05'
    letterSpacing: -0.03em
  display-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.15'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Bricolage Grotesque
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Bricolage Grotesque
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: 0.05em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 2rem
  margin: 3rem
  space-xs: 0.375rem
  space-sm: 0.75rem
  space-md: 1.5rem
  space-lg: 3rem
  space-xl: 6rem
---

## Brand & Style

This design system embodies a premium digital-agency aesthetic. It is confident, editorial, spacious, and thoroughly modern. The brand personality is authoritative yet approachable, striking a balance between high-end architectural portfolio and cutting-edge product studio. 

The emotional response is one of elevated discovery—evoking exclusivity, creative rigor, and tactile sophistication through precise typography, deliberate asymmetry, and rhythmic contrast between immersive dark environments and crisp light editorial spaces.

## Colors

The color architecture is built on a dark-first foundation utilizing a near-black canvas (`#0A0A0B`) complemented by layered, tactile grays (`#141416`, `#1C1C1F`) for containers and cards. Alternating sections feature an off-white warmth (`#F4F1EA`) to break monotony and create editorial rhythm. 

Warm celebratory accents drive interactive focus: a vivid coral/amber (`#FF6B3D`) for primary calls-to-action and a refined champagne gold (`#E9C98A`) for secondary highlights, status indicators, and subtle luxury details. Hairline borders are rendered at 8% to 10% white opacity to define surfaces without heavy visual noise.

## Typography

Typography relies on oversized, expressive grotesk headings paired with a hyper-clean, neutral sans-serif for body text. Headlines command attention through high weight contrasts and tight tracking, while body copy prioritizes absolute legibility with generous line heights. 

On mobile viewports, large display tokens (`display-xl` and `display-lg`) must scale down gracefully to prevent awkward wrapping—maxing out at 40px and 32px respectively—ensuring the editorial impact remains intact across all device form factors.

## Layout & Spacing

The layout is governed by a fluid 12-column grid system paired with expansive outer margins and generous vertical pacing to deliver the signature airy, editorial agency feel. Content blocks breathe deeply, utilizing substantial whitespace to emphasize high-value portfolio pieces and typography.

Across breakpoints, the grid adapts dynamically: outer margins collapse from 6rem on desktop to 2rem on tablet and 1.25rem on mobile. Gutters scale proportionally to maintain structural rhythm without crowding content elements.

## Elevation & Depth

Elevation is achieved primarily through tonal layering and hyper-subtle low-contrast outlines rather than heavy drop shadows. Surfaces step forward using incremental lightness shifts across the dark gray palette (`#0A0A0B` to `#141416` and `#1C1C1F`). 

Boundaries are defined by ultra-fine hairline borders set at 8% to 10% white opacity, creating a razor-sharp, premium architectural finish. When interactive elements require focus or active states, ambient glows tinted with the vivid coral accent are introduced with extreme diffusion and low opacity.

## Shapes

The shape language is defined by generous, ultra-smooth radiuses that contrast sharply with the dense, brutalist scale of the headings. Cards and primary containers utilize a heavy 28px to 36px corner radius, establishing a friendly, tactile, pill-adjacent silhouette. 

All interactive triggers, buttons, and badges strictly adopt fully pill-shaped geometries (9999px border-radius), reinforcing a modern, approachable consumer-grade polish within an otherwise sophisticated enterprise framework.

## Components

### Buttons
Buttons are strictly pill-shaped with generous horizontal padding. Primary variants utilize the vivid coral/amber fill (`#FF6B3D`) with high-contrast dark text, while secondary variants adopt ghost styling with hairline white borders and champagne gold hover states.

### Cards
Cards feature oversized corner radiuses (28–36px), solid layered gray backgrounds (`#141416`), and 10% white opacity hairline borders. They serve as immersive containers for case studies, media previews, and metric callouts, often incorporating subtle internal glow on hover.

### Input Fields
Inputs maintain pill or heavily rounded geometry, utilizing dark neutral wells (`#0A0A0B`), inner hairline borders, and clear typographic hierarchy for placeholder and input states. Focus rings glow softly in champagne gold.

### Chips & Badges
Compact, pill-shaped tags used for metadata, categories, and status indicators. They utilize translucent gray fills with champagne gold or coral text accents.

### Checkboxes & Radio Buttons
Clean, minimalist geometry utilizing custom circular containers with smooth scaling check animations rendered in the primary coral accent.

### Lists & Navigation
Navigation is expansive and minimalist, featuring floating pill-shaped header bars with glassmorphic backdrop blurs, subtle borders, and smooth micro-interactions on list items.