# Lunio Design System v1.3 — shadcn/ui Integration

Date: 2026-10-15

## Changed

- Converted the source-owned UI components to **shadcn/ui on Radix primitives**: Button, Input, Card, Tabs, Select, Label, Sheet, Dialog, Command, Badge, Checkbox, Separator, Skeleton, Textarea, Scroll Area, Popover.
- Removed handwritten `button`, `select`, drawer and dialog controls from Showcase, Docs, Brand Switcher and Commerce demos; keyboard and focus semantics now use Radix behavior.
- Added interactive, reusable Commerce patterns under `components/commerce/`: Product Card, Size Selector, Quantity Stepper, PDP Sticky Bar, Mobile Mega Menu.
- Preserved Lunio, Nooz Helix, Nooz Sunset brand tokens and provisional Hypercool; enabled root `data-brand` for portal theming and corrected Sunset on-white interactive text.
- Extended Token Generator to create the semantic variables required by shadcn's Tailwind CSS theme map, including Card, Popover, Secondary, Destructive, Background and Success.
- Added source-owned component contract tests (`npm run shadcn:check`), 6 passing, plus 7 existing brand token tests (13 total).
- Updated `DESIGN.md`, `public/DESIGN.md`, README, AGENTS and Thai migration guide.

## Validation completed

- Token generator: passed.
- Token semantics/contrast checks: 7/7 passed.
- shadcn/ui static component/usage tests: 6/6 passed.
- TS/TSX Syntax Parse: 37 files, 0 parse errors.

## Unverified (must run on a network-enabled machine)

- Dependency installation through npm Registry.
- Full React/TypeScript typecheck and Next.js production build.
- Browser screenshot review at Desktop 1440, Mobile 375, 320 reflow; keyboard and screen-reader audits.
- Actual licensed MiSansTC WOFF2 fonts (not distributed).
- WooCommerce API and live checkout integration (Docs is a UI demonstration, not a live store).

## Design system and accessibility scope

This is an engineering handoff, not a WCAG certification or full 1:1 screenshot match of HP getdesign.md or the production Lunio storefront.
