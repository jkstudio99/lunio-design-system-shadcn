# AI Agent Instructions — Lunio Design System

This Next.js project is a living documentation platform for the Lunio multi-brand UI.

## Source hierarchy
1. `DESIGN.md` is the authored design specification; preserve its brand language and provenance.
2. `src/design-system/tokens.json` is the machine-readable implementation mapping reviewed from DESIGN.md v1.3.
3. `npm run tokens:build` generates `src/styles/generated-tokens.css`.
4. The components in `components/ui` and the docs must only consume semantic role variables.

## Rules
- One font family: MiSansTC, with five styles (400, 500, 600, 700, 800). Never commit unlicensed font files.
- Preserve Lunio #1C46B4, Helix #7347AE, Sunset #F28131, Lunio Bedding #1C46B4, and on-primary semantic foreground. White on Sunset primary is not accessible.
- Lunio Bedding CI uses official Lunio Taiwan primary #1C46B4.
- No new arbitrary per-page typography sizes or hardcoded product pricing.
- E-commerce data (SKUs, prices, stock, dimensions) is supplied by WooCommerce; examples in this docs app are explicitly illustrative.
- Internal mobile CTA target preferred size >=44px. Test at 375, 1440 and 320 CSS px reflow.
- Changes to tokens require tests, Figma review and a migration note in DESIGN.md / docs.
- Do not deploy docs or storefront without confirming font licensing, npm build and accessibility / commerce regression.

## Before committing
Run `npm run tokens:build`, `npm run tokens:check`, `npm run typecheck`, and `npm run build` (network-enabled environment for npm install).


## shadcn/ui v1.3 Implementation

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
