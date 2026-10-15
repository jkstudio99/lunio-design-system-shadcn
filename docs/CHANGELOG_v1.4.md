# Lunio Design System v1.4.0 — Release Notes & Changelog

**Release Date:** 2026-10-15  
**Version:** v1.4.0  
**Stack:** Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS v4, shadcn/ui (New York), Radix UI Primitives, Lucide Icons, embla-carousel-react, cmdk

---

## 1. Overview & Major Milestones

Lunio Design System v1.4.0 is an enterprise release delivering full interactive verification, expanded component primitives and e-commerce patterns, updated Taiwan bed size contracts, spatial padding refinement (including code snippet copy button clearance), and synchronized documentation across all channels.

---

## 2. Component Additions (20+ Primitives & Commerce Patterns)

### 2.1 New shadcn/ui Core Primitives (`components/ui/`)
- **`accordion.tsx`** (`@radix-ui/react-accordion`):
  - Collapsible panels with `data-slot="accordion"`, `accordion-item`, `accordion-trigger`, and `accordion-content`.
  - Smooth animation (`data-[state=open]:animate-accordion-down`, `data-[state=closed]:animate-accordion-up`), keyboard Enter/Space expansion, Down/Up roving arrows.
- **`radio-group.tsx`** (`@radix-ui/react-radio-group`):
  - Mutually exclusive selection with `data-slot="radio-group"`, `radio-group-item`, and `radio-group-indicator`.
  - Accessible high-contrast indicator circle, keyboard arrow roving navigation.
- **`tooltip.tsx`** (`@radix-ui/react-tooltip`):
  - Accessible microcopy hover/focus tooltip with built-in `TooltipProvider`, `TooltipTrigger`, `TooltipContent`, and subtle animation.
- **`breadcrumb.tsx`** (`@radix-ui/react-slot`):
  - Semantic `<nav aria-label="breadcrumb">` with `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, and `BreadcrumbEllipsis`.
- **`carousel.tsx`** (`embla-carousel-react`):
  - Touch-swipeable and keyboard-controllable carousel primitive with `CarouselContent`, `CarouselItem`, `CarouselPrevious`, and `CarouselNext`.
- **`separator.tsx`** (`@radix-ui/react-separator`):
  - Semantic divider supporting horizontal and vertical orientations with `data-slot="separator"`.

### 2.2 New Taiwan E-Commerce Patterns (`components/commerce/`)
- **`mattress-specs-accordion.tsx`**:
  - Full PDP product specifications: 5-layer structure breakdown (Tencel, Graphene, Thai Latex, Wave-Zone, Diamond Base), 100-night trial terms, 10-year warranty, and free delivery/old mattress recycling terms.
- **`mattress-radio-selector.tsx`**:
  - Taiwan standard mattress selection (3.0, 3.5, 5.0, 6.0, 7.0 尺) with exact cm dimensions, room suitability recommendations, contextual Tooltips, feel options (Medium-Firm vs Firm Support), and an interactive Sheet modal for full dimensional comparison.
- **`product-carousel.tsx`**:
  - High-fidelity product gallery composing `Carousel`, `Badge`, and `Button` with previous/next triggers and slide progress indicators.
- **`product-rating.tsx`**:
  - 5-star customer review rating pattern supporting half-stars, total review count formatting, and trust badges (100-night trial, 10-year warranty, free delivery).

---

## 3. UI/CSS Spacing & Margin/Padding Polish

- **Code Block & Terminal Copy Buttons:**
  - Standardized copy buttons in `CodePanel` (`components/docs-content.tsx`), usage terminal (`components/showcase.tsx`), and DESIGN.md preview.
  - Implemented `absolute top-3 right-3` / `top-3.5 right-3.5` placement.
  - Added minimum `pr-16` (64px right padding) on pre/code containers to guarantee zero collision between code text and the copy button.
  - Upgraded buttons to high-contrast dark surfaces (`bg-slate-900/90 text-slate-200 border-slate-700 hover:bg-slate-800`), visible focus rings, green checkmark transition upon copying, and accessible tooltips.
- **Page Layout Spacing:**
  - Audited layout padding and container widths across `/`, `/design-system`, and all `/docs/*` subpages for 320px, 375px, 768px, 1024px, and 1440px viewports.
  - Ensured consistent 16px container padding, 4px grid rhythm, and safe-area inset compliance for bottom floating bars.

---

## 4. Documentation & Version Synchronization

- Upgraded version string to **`v1.4.0`** across:
  - `package.json` and `package-lock.json`
  - `src/design-system/tokens.json` (`v1.4.0`, source: `DESIGN.md v1.4`)
  - `DESIGN.md` and `public/DESIGN.md` (Document version: v1.4.0)
  - `components/docs-shell.tsx` (`v1.4 · shadcn/ui`, `DESIGN.md v1.4`)
  - `components/docs-content.tsx` (`LUNIO DS · v1.4`, `DESIGN.md v1.4`)
  - `components/showcase.tsx` (`v1.4`, `DESIGN.md · v1.4`)
  - `app/docs/source/page.tsx` (`reviewed v1.4 specifications`)
  - `README.md`, `README_TH.md`, `AGENTS.md`
  - `docs/VALIDATION.md`, `docs/SHADCN_IMPLEMENTATION_TH.md`, `docs/CHANGELOG_v1.4.md`

---

## 5. Engineering Quality Gates

- `npm run tokens:check`: **7/7 PASS** (brand themes, weights, roles, contrast, rhythm, radii).
- `npm run shadcn:check`: **6/6 PASS** (registry, dependencies, data-slots, zero raw HTML buttons/selects, token styling, commerce patterns).
- `npm run typecheck`: **0 errors** (`tsc --noEmit`).
- `npm run build`: **Compiled successfully**; all 15 static Next.js Turbopack routes prerendered without errors.
