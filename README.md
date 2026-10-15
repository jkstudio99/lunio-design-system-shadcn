# Lunio Design System · Next.js 16 + Tailwind v4 + shadcn/ui (Radix UI source components) UI

A premium multi-brand Living Design System for **Lunio Taiwan / Nooz Helix / Nooz Sunset / Hypercool Bedding**. Reference information architecture inspired by [getdesign.md HP analysis](https://getdesign.md/hp/design-md); original Lunio design tokens, styling and content are used instead of copying HP brand assets.

**Status:** Functional source starter and token tests. A full Next.js build has **not** been run in this offline environment (npm registry unavailable); run the production verification commands on your network-enabled Mac/CI before deployment.

## Start on macOS

```bash
unzip lunio-design-system-nextjs.zip
cd lunio-design-system-nextjs
npm install
npm run tokens:build
npm run tokens:check
npm run dev
```

Open **http://localhost:3001**. Running on port 3001 avoids conflict with your existing Lunio Storefront at 3000.

## Routes

- `/` and `/design-system` — Dark analysis shell and live white Lunio preview with brand / viewport controls
- `/docs/getting-started` — Architecture, tokens, first steps
- `/docs/brands` — Four brands with approved/provisional state
- `/docs/typography` — 12 roles, 5 weights, mobile/desktop interactive playground
- `/docs/colors` — Semantic palettes and contrast checks
- `/docs/spacing` — 4px rhythm, radius, breakpoint guide
- `/docs/components` — Button variants, forms, select, badges, quantity
- `/docs/commerce` — ProductCard, size selector, demo mobile mega menu and sticky bar
- `/docs/accessibility` — WCAG AA acceptance and Do/Don't
- `/docs/release` — Migration, QA, production checklist
- `/docs/source` — Entire authoritative DESIGN.md rendered in Markdown

## Structure

```text
app/                           Next.js 16 App Router
  page.tsx                     Design analysis homepage
  design-system/page.tsx       Alternate homepage route
  docs/layout.tsx              Shared doc sidebar and navigation
  docs/[slug]/page.tsx         Dynamic sections
  docs/source/page.tsx         Read root DESIGN.md on server
  globals.css                  Tailwind v4 bridge + site design
components/                   UI primitives, responsive docs, playground
lib/design-system.ts           Brand/types/documentation nav helpers
src/design-system/tokens.json  Machine-readable implementation source
src/styles/generated-tokens.css Auto-generated CSS
scripts/build-tokens.mjs       Deterministic token CSS generator
tests/tokens.test.mjs          Contrast and integrity tests
DESIGN.md                     Reviewed source design specification v1.4
AGENTS.md                     Codex/pstack style rules
```

## MiSansTC font weights (no fonts bundled)

The library supports **Regular 400 / Medium 500 / Semibold 600 / Bold 700 / Heavy 800**.

**This ZIP does not include font binaries.** Put properly licensed web-embeddable `MiSansTC-{Regular,Medium,Semibold,Bold,Heavy}.woff2` into `public/fonts/`. CSS `@font-face` is preconfigured. If files are missing, the browser falls back to system fonts: verify actual MiSansTC before Figma pixel comparison.

Optional advanced upgrade: after the font assets exist, use `next/font/local` in `app/layout.tsx`, remove the redundant `@font-face` declarations, and set `--font-sans` to the Next-provided variable. Never import missing files during builds.

## Tokens workflow

```bash
# Edit src/design-system/tokens.json — NEVER generated CSS
npm run tokens:build
npm run tokens:check
npm run typecheck
npm run build
```

Colors are set with `[data-brand="lunio|helix|sunset|bedding"]`, including nested scopes on the same page. The source DESIGN.md explicitly warns that **Nooz Sunset primary needs dark text** and **Helix Accent needs black text** to pass 4.5:1.

## shadcn/ui

This codebase includes **shadcn/ui (Radix UI source components) local components** (`Button` with CVA variants, `Card`, `Input`, and Radix `Tabs`) and `components.json`. Once dependencies are installed, you may add more official components with:

```bash
npx shadcn@latest add sheet dialog select badge skeleton
```

Before accepting CLI overwrites, compare the generated component tokens and dimensions to DESIGN.md v1.4. The existing code is hand-authored using shadcn conventions; **do not assume the complete shadcn component registry was installed or built here**.

## Deploy

Deploy separately from WordPress/WooCommerce (e.g., Vercel). The docs app does not require your WooCommerce API; all commerce examples are UI demonstrations, not working transactions. Add authentication if docs are intended for internal-only use. Set Node 22+ in the deployment environment and verify licensing and all QA steps before public release.

## Accuracy, reference and caveats

- The linked HP analysis has a dark analysis shell, installation/usage area, preview navigation and a white component sample gallery. The Lunio app recreates that **information architecture and contrast of surfaces**, not proprietary HP artwork, fonts, trademarked visual identity or byte-identical layout.
- Actual Nooz color Hexes come from reviewed Lunio DESIGN.md. Lunio Bedding uses approved CI tokens.
- Color ratios tests are calculated only for specified solid pairs; they do **not** constitute a complete WCAG 2.2 AA accessibility certification.
- Demo product UI displays placeholder `NT$ —` rather than invented live product prices. Real prices and physical dimensions depend on WooCommerce SKU/variation.
- Figma file: https://www.figma.com/design/46bJYM9raivd3wEwTxaaJI/Lunio-TW-Mattress?node-id=1036-636


## shadcn/ui v1.4 Implementation

The component library is now **source-owned shadcn/ui on Radix UI** (not just stylistically compatible). Core primitives live in `components/ui/`, compose commerce components in `components/commerce/`, and use the Lunio multi-brand tokens. See [`docs/SHADCN_IMPLEMENTATION_TH.md`](docs/SHADCN_IMPLEMENTATION_TH.md) for complete migration, source inventory, keyboard testing and install instructions.

```bash
npm install
npm run tokens:build
npm run tokens:check
npm run shadcn:check
npm run typecheck
npm run build
npm run dev
```

**Note:** npm registry was unavailable during artifact creation; full npm install / Next.js build must be run on a connected machine before production use.
