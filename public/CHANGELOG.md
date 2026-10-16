# Lunio Design System — Comprehensive Changelog & Version History

All notable changes to the **Lunio Multi-Brand Design System Platform** across every version release are documented in this file.

The project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [v1.4.1] — 2026-10-16

### 🚀 Highlights & Production Readiness
- **Vercel Build Compilation & TypeScript Strictness**: Resolved TypeScript compilation errors (`TS2353`, `TS2322`) during Next.js production builds on Vercel.
- **Component Prop Ergonomics & Compatibility**: Added backward-compatible prop aliases (`priceAmount`, `compareAtAmount`, `size`, `sizeNote`, `compact`, `discountBadge`) across `ProductCard`, `PriceBlock`, `PDPStickyBar`, and `ReassuranceRow`.
- **ReassuranceRow Compact Layout**: Introduced compact strip variant for high-density PDP buy sections and mobile navigation sheets.
- **Automated Test Gate Coverage**: Added `data-brand="lunio-life"` check to `tests/shadcn.test.mjs` verifying Radix portal theme inheritance across all 5 storefront brands.
- **Documentation & Spec Synchronization**: Synchronized documentation, tokens, and package manifests to v1.4.1.

### 🐛 Fixed
- `components/commerce/product-card.tsx`: Added `priceAmount?: number` and `compareAtAmount?: number` to `CommerceProductSummary` and `ProductCard` to eliminate prop mismatch.
- `components/commerce/price-block.tsx`: Added flexible input support for `salePrice` / `priceAmount`, `regularPrice` / `compareAtAmount`, `size?: string`, and `sizeNote?: string` with responsive compact sizing.
- `components/commerce/reassurance-row.tsx`: Added `compact?: boolean` prop and compact capsule layout.
- `components/commerce/pdp-sticky-bar.tsx`: Added `priceAmount`, `compareAtAmount`, and `discountBadge` support with real-time `NT21,990` formatting and `#E53935` sale badge.
- `tests/shadcn.test.mjs`: Added assertion for `data-brand="lunio-life"` alongside other 4 brands.

---

## [v1.4.0] — 2026-10-16

### 🚀 Highlights & Milestones
- **Full Interactive Verification**: Passed end-to-end interactive testing for 20+ shadcn/ui primitives and 9 Taiwan e-commerce patterns with zero runtime/console errors.
- **Component Inventory Expansion**: Added Accordion, RadioGroup, Tooltip, Breadcrumb, Carousel, ProductRating, Skeleton, Separator, Sheet, Dialog, Popover.
- **Taiwan Bedding Commerce Patterns**: Added `MattressSpecsAccordion` (5-layer structure breakdown, 100-night trial, 10-year warranty), `MattressRadioSelector` (Taiwan 3.0, 3.5, 5.0, 6.0, 7.0 尺 dimensions with comparison sheet), `ProductCarousel` (multi-slide gallery), and `ProductRating` (5-star ratings with half-stars and trust badges).
- **CSS Spacing & Copy Button Clearance**: Audited and fixed code panel right clearance to `padding: 22px 64px 22px 22px` (`pr-16`) with high-contrast dark buttons (`absolute top-3 right-3`) and accessible shadcn `Tooltip` feedback.
- **Light / Dark / System Theme Mode**: Complete dark mode styling with zero card washout, high-contrast borders, and proper semantic text luminance.
- **Document Synchronization**: Updated `DESIGN.md` (root, public, and Chinese guides) with complete v1.4.0 specifications for all 4 brands.

### 📦 Added
- `components/ui/accordion.tsx`: Collapsible accordion primitive with smooth CSS keyframes and roving arrow keys.
- `components/ui/radio-group.tsx`: Mutually exclusive selection group with high-contrast indicator.
- `components/ui/tooltip.tsx`: Accessible microcopy hover/focus tooltip with built-in provider and trigger.
- `components/ui/breadcrumb.tsx`: Semantic `<nav aria-label="breadcrumb">` with ellipsis truncation.
- `components/ui/carousel.tsx`: Touch swipe and keyboard accessible carousel engine powered by `embla-carousel-react`.
- `components/ui/separator.tsx`: Semantic divider supporting horizontal and vertical orientations.
- `components/commerce/mattress-specs-accordion.tsx`: 5-layer mattress structure, 100-night trial, warranty terms.
- `components/commerce/mattress-radio-selector.tsx`: Taiwan mattress size selection with dimensions and Sheet modal comparison.
- `components/commerce/product-carousel.tsx`: Interactive multi-slide image gallery.
- `components/commerce/product-rating.tsx`: 5-star customer review rating pattern with half-star display.
- `docs/CHANGELOG_v1.4.md`: Detailed v1.4.0 release notes.

### 🎨 Changed
- `app/globals.css`: Increased `.code-panel` right padding from 56px to 64px (`padding: 22px 64px 22px 22px`) to eliminate code-text collision with the floating copy button.
- `components/docs-content.tsx`: Upgraded `CopyButton` and `CodePanel` with accessible shadcn `Tooltip` ("點擊複製程式碼" / "已成功複製到剪貼簿") and dark hover states.
- `components/showcase.tsx`: Upgraded usage terminal and DESIGN.md preview code block with copy buttons and `pr-16` text clearance.
- `DESIGN.md` & `public/DESIGN.md`: Added Section 11 detailing all 20+ shadcn primitives and 9 commerce patterns.
- `package.json` & `package-lock.json`: Bumped version to `1.4.0`.
- `src/design-system/tokens.json`: Updated version metadata to `1.4.0`.

### 🧪 Verification
- `npm run tokens:check`: **7/7 PASS**
- `npm run shadcn:check`: **6/6 PASS**
- `npm run typecheck`: **0 errors**
- `npm run build`: **15/15 static SSG routes compiled successfully**

---

## [v1.3.0] — 2026-10-15

### 🚀 Highlights & Milestones
- **shadcn/ui & Radix Migration**: Complete migration from handcrafted buttons, selects, and drawers to source-owned shadcn/ui components on Radix UI primitives.
- **Strict Quality Rule**: Enforced zero raw HTML `<button>` or `<select>` elements in live application pages.
- **Automated Contract Checks**: Introduced `tests/shadcn.test.mjs` verifying upstream dependencies, data-slot conventions, and component composition.

### 📦 Added
- Source-owned components under `components/ui/`: `Button`, `Input`, `Card`, `Tabs`, `Badge`, `Label`, `Separator`, `Skeleton`, `Textarea`, `Select`, `Dialog`, `Sheet`, `Command`, `Checkbox`, `DropdownMenu`, `Popover`, `ScrollArea`.
- E-commerce patterns under `components/commerce/`: `ProductCard`, `ProductCardSkeleton`, `SizeSelector`, `QuantityStepper`, `PDPStickyBar`, `MobileMegaMenu`.
- Test suite: `tests/shadcn.test.mjs` with 6 verification gates.
- Documentation: `docs/SHADCN_IMPLEMENTATION_TH.md` and `docs/CHANGELOG_v1.3.md`.

### 🎨 Changed
- Replaced handwritten drawer and select controls in `components/docs-shell.tsx`, `components/brand-switcher.tsx`, and `components/showcase.tsx`.
- Extended `scripts/build-tokens.mjs` to generate shadcn semantic color variables (`--card`, `--popover`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--ring`).

---

## [v1.2.0] — 2026-10-15

### 🚀 Highlights & Milestones
- **Accessible Foreground Contrast Review**: Senior e-commerce UX/UI review discovered that white text on Nooz Sunset Primary (`#F28131`) yielded only 2.64:1 (FAIL AA). Mandated dark ink (`#1C1526`) on Sunset primary, achieving **6.72:1** (Pass AA).
- **Helix Accent Foreground**: Mandated black ink (`#000000`) on Helix lavender accent (`#9362D9`), achieving **4.99:1** (Pass AA).
- **Lunio Bedding Theme**: Established official 4th brand theme (`#1C46B4`) for bedding accessories (Tencel bed sheets, mattress protectors, comforters).

### 🎨 Changed
- `DESIGN.md`: Documented contrast figures, semantic foreground decisions, and status palette.
- `src/design-system/tokens.json`: Updated brand entries and contrast calculations.
- `components/brand-switcher.tsx`: Added Lunio Bedding to official brand selector.

---

## [v1.1.0] — 2026-10-14

### 🚀 Highlights & Milestones
- **MiSansTC Typography System**: Standardized on MiSansTC as the single authoritative font stack for Traditional Chinese and Latin glyphs.
- **Five Font Weights Scale**: Established strict scale: `400 Regular`, `500 Medium`, `600 Semibold`, `700 Bold`, and `800 Heavy`.
- **12 Responsive Typographic Roles**: Standardized across Mobile (375px) and Desktop (1440px) viewports: `display`, `h1`, `h2`, `h3`, `h4`, `body-lg`, `body-md`, `body-sm`, `label`, `caption`, `price-xl`, `price-md`.
- **4px Spatial Rhythm**: Enforced 4px grid rhythm (`space-1` to `space-24`) and standardized radii (`--radius-control: 8px`, `--radius-container: 16px`, `--radius-pill: 9999px`).

---

## [v1.0.0] — 2026-10-10

### 🚀 Highlights & Milestones
- **Initial Multi-Brand Platform**: Established unified token architecture for `lunio.com.tw`, `Nooz Helix`, and `Nooz Sunset`.
- **Token Pipeline**: Automated CSS variables and DTCG JSON compilation via `scripts/build-tokens.mjs`.
- **Dynamic Scoping**: Isolated brand themes using `[data-brand="..."]` CSS attributes.
- **Brand Assets**: Provided lossless vector SVGs and @4x transparent PNGs for all brand marks.
