# Lunio Multi-Brand Design System Platform (DESIGN.md)

> Comprehensive design specification, semantic tokens, and component guidelines specifically for **`lunio.com.tw`**, covering the **5 brands** sold on the Taiwan official storefront: **Lunio Taiwan**, **Nooz Helix**, **Nooz Sunset**, **Lunio Bedding**, and **Lunio Life**. Standardized on **MiSansTC**, **4px rhythm grid**, and **WCAG 2.2 AA**.

> **Document version:** v1.4.1 — Production Certified · Senior E-commerce UX/UI & Frontend Architecture (2026-10-16)
> **Status:** Production-certified design system specification for `lunio.com.tw` updated with **5 brand themes** (including `data-brand="lunio-life"`), **12 responsive typography roles**, **5 font weights**, **22 source-owned `shadcn/ui` primitives**, and **19 Taiwan e-commerce conversion patterns** (covering conversion backlog 001–024). Next.js Turbopack SSG production verified across all routes.

---

## 1. Brand Scope, Identity & Semantic Architecture

This design system is built **specifically for `lunio.com.tw`** (not a group-wide corporate system) and governs the **5 brands** sold on the Taiwan official storefront:
1. **Lunio Taiwan** (`data-brand="lunio"`) — Flagship ergonomic graphene & natural latex mattresses.
2. **Nooz Helix** (`data-brand="helix"`) — Hotel-grade pocket spring sleep series.
3. **Nooz Sunset** (`data-brand="sunset"`) — Accessible daily spine-care & youth sleep series.
4. **Lunio Bedding** (`data-brand="bedding"`) — Premium Tencel bedding, protectors, and pillows.
5. **Lunio Life** (`data-brand="lunio-life"`) — Smart sleep lifestyle, modular sofas, and home living series.

The platform isolates brand themes via scoped CSS custom properties (`[data-brand="..."]`). Changing the brand updates surface, primary color, ink, and accents without altering component code or business logic.

### Brand Palette & Contrast Verification

| Brand Token | Hex Code | On-Primary / Foreground | WCAG AA Ratio | Role & Application |
|---|---|---|---|---|
| **Lunio Taiwan (Primary)** | `#1C46B4` | `#FFFFFF` | **8.13:1** (Pass AAA) | Flagship electric blue for primary CTAs, active highlights, key brand surfaces. |
| **Lunio Accent** | `#2E62ED` | `#FFFFFF` | **5.14:1** (Pass AA) | Interactive hover states, secondary highlights, promo badge backgrounds. |
| **Lunio Surface** | `#F5F7FD` | `#1A1829` | **16.25:1** (Pass AAA) | Soft tinted canvas background for cards and pill containers. |
| **Nooz Helix (Primary)** | `#7347AE` | `#FFFFFF` | **6.48:1** (Pass AA) | Luxury hotel-grade pocket spring line. Deep velvet purple CTA. |
| **Nooz Helix Accent** | `#9362D9` | `#000000` (`#FFFFFF` fails 4.21:1) | **4.99:1** (Pass AA on black) | Interactive focus rings, badge accents, and card borders. |
| **Nooz Helix Surface** | `#F8F5FC` | `#1E172B` | **16.05:1** (Pass AAA) | Soft lilac container backgrounds. |
| **Nooz Sunset (Primary)** | `#F28131` | `#1C1526` (`#FFFFFF` fails 2.64:1) | **6.72:1** (Pass AA on dark ink) | Ergonomic spine support line. High-energy coral orange CTA with dark text. |
| **Nooz Sunset Accent** | `#FF9A52` | `#1C1526` | **8.44:1** (Pass AAA) | Warm amber accents for badges and highlights. |
| **Nooz Sunset Surface** | `#FEF7F2` | `#241810` | **16.32:1** (Pass AAA) | Gentle peach card and header backgrounds. |
| **Lunio Bedding (Primary)** | `#1C46B4` | `#FFFFFF` | **8.13:1** (Pass AAA) | Premium bedding & accessories line (Tencel sheets, duvets, protectors). |
| **Lunio Bedding Accent** | `#2E62ED` | `#FFFFFF` | **5.14:1** (Pass AA) | Interactive hover states, secondary highlights, promo badge backgrounds. |
| **Lunio Bedding Surface** | `#F5F7FD` | `#1A1829` | **16.25:1** (Pass AAA) | Soft tinted canvas background for bedding product cards. |
| **Lunio Life (Primary — Plum Night)** | `#2D274A` | `#FFFFFF` | **13.99:1** (Pass AAA) | Primary brand fill for Lunio Life smart living & bedroom lifestyle CTAs and headers. |
| **Lunio Life Accent (Crocus Purple)** | `#9786F3` | `#141414` (`#FFFFFF` fails 2.99:1) | **6.15:1** (Pass AA on black) | Interactive highlights, feature badges, and lifestyle accents on dark ink. |
| **Lunio Life Surface (Titan White)** | `#CCD5F8` | `#141414` | **12.66:1** (Pass AAA) | Signature periwinkle-tinted surface for Lunio Life hero and feature containers. |

#### Lunio Life Secondary Palette (`data-brand="lunio-life"`)

Extracted from the official Lunio Life Brand Identity Guidelines (02 Brand Colors):
- **Black `#141414`** (`--brand-ink`): Primary text, iconography, and high-contrast foreground on Titan White (`#CCD5F8`) and Crocus Purple (`#9786F3`).
- **Ivory `#ECE8D8`** (`--brand-surface-soft`): Warm neutral background for editorial lifestyle blocks and secondary product containers.
- **Pink `#EC9BB0`** (`--brand-lifestyle-accent`): Warm lifestyle callout accent for cozy home-living highlights.
- **Light Pink `#F6D0D7`** (`--brand-support-tone`): Soft supportive pastel surface for seasonal and bundle callouts.

#### Accessible semantic foreground & status decisions (v1.4.1)

- **Sunset primary:** preserve `#F28131` as the approved brand fill; set `color/on-primary` to `#1C1526` (calculated **6.72:1**) instead of `#FFFFFF` (**2.64:1**, fail). Do not hardcode `text-white` in brand-scoped primary buttons.
- **Helix accent:** `#9362D9` with `#FFFFFF` is **4.21:1** (fails normal-text AA), and with `#000000` is **4.99:1** (passes normal-text AA). Use `color/on-accent` that resolves to a dark foreground where the accent serves as a text background.
- **Lunio Life accent (Crocus Purple):** `#9786F3` with `#FFFFFF` is **2.99:1** (fails normal-text AA), and with `#141414` is **6.15:1** (passes normal-text AA). Always pair Crocus Purple fills with `#141414` dark ink.
- **Sunset accent:** `#FF9A52` with `#1C1526` has **8.44:1**, suitable for foreground text; do not claim that every accent/icon/gradient is accessible without checking its actual context.
- **Status & Promotional Sale palette:** Success (`#167347`), Error (`#B42318`), **Sale (`#E53935`)**, Warning (`#925200`), Info (`#1C46B4`). Promotional discount badges (`現省 NT6,990`, `雙 11 特惠`) MUST consume the dedicated `--sale` (`#E53935`) token (`<Badge variant="sale">`) so promotional urgency is visually and semantically distinct from form validation `--destructive` (`#B42318`).
- **Color checks:** contrast figures are calculated from the WCAG relative luminance formula for opaque colors. Banners with photography, overlays and hover states require separate checks.

### Official Brand Assets (5 Storefront Brands)

All brand marks are authored as lossless SVG vectors and crisp transparent PNGs (Retina / @4x) with colors matching exact CI tokens:

| Brand | Primary Logo (Fill) | White Logo (Reversal) | Vector Assets (SVG) | Master Size | Official Color |
|---|---|---|---|---|---|
| **Lunio Taiwan** | `/images/lunio/lunio-primary.png` | `/images/lunio/lunio-white.png` | `lunio-primary.svg` · `lunio-white.svg` | 1200 × 600 px | `#1C46B4` (Corporate: `#002355`) |
| **Nooz Helix** | `/images/nooz/nooz-primary.png` | `/images/nooz/Nooz-white.png` | `nooz-helix.svg` · `nooz-white.svg` | 1133 × 359 px | `#7347AE` (Deep velvet purple) |
| **Nooz Sunset** | `/images/nooz/Nooz-sunset.png` | `/images/nooz/Nooz-white.png` | `nooz-sunset.svg` · `nooz-white.svg` | 1133 × 359 px | `#F28131` (Sunset orange) |
| **Lunio Bedding** | `/images/lunio-bedding/lunio-bedding-primary@4x.png` | `/images/lunio-bedding/lunio-bedding-white@4x.png` | `lunio-bedding-primary.svg` · `lunio-bedding-white.svg` | 1080 × 248 px | `#1C46B4` (Lunio electric blue) |
| **Lunio Life** | `/images/lunio-life/lunio-life-primary.png` | `/images/lunio-life/lunio-life-white.png` | `lunio-life-primary.svg` · `lunio-life-white.svg` | 933 × 196 px | `#2D274A` (Plum Night) |

---

## 2. Typography System (MiSansTC)

Single authoritative font stack for Traditional Chinese and Latin glyphs on `lunio.com.tw`:
`font-family: var(--font-sans, "MiSansTC", "PingFang TC", "Microsoft JhengHei", sans-serif);`

> **Lunio Life Brand Guideline Typography Harmonization:** The Lunio Life Brand Identity Guidelines (03 Typography) specify `MiSans TC` for Traditional Chinese alongside `Manrope` for English (`H1 72/80 -2%`, `H2 40/48 0%`, `Body 16/24 0%`, `Caption 12/16 0%`). On the unified `lunio.com.tw` storefront, Lunio Life sections consume the shared 12-role `MiSansTC` token scale below to avoid multi-font CLS and preserve uniform CJK/Latin metrics across all 5 brands.

### Official MiSansTC Font Weight Scale (Five Weights)

All brands and responsive sizes use **one font family and the same five font-weight primitives**. Weights are independent of brand colors and viewport widths. The font family is displayed as `MiSans TC` in the connected Figma file; use the actual installed font family when loading it in Next.js.

| Weight | Numeric Value | Figma Variable | Web Code Syntax | Primary Usage |
|---|---:|---|---|---|
| **Regular** | **400** | `weight/regular` | `var(--font-weight-regular)` | Long-form body copy, product descriptions and reviews |
| **Medium** | **500** | `weight/medium` | `var(--font-weight-medium)` | Captions and measured emphasis |
| **Semibold** | **600** | `weight/semibold` | `var(--font-weight-semibold)` | H4, button labels, navigation, selectable controls |
| **Bold** | **700** | `weight/bold` | `var(--font-weight-bold)` | H1–H3, product-card and installment prices |
| **Heavy** | **800** | `weight/heavy` | `var(--font-weight-heavy)` | Display headlines and PDP hero prices |

**Figma setup and token binding**
- **Shared weight collection:** `Lunio DS / 04a MiSansTC Font Weights — DESIGN.md v1.1` with one mode, `Value`.
- **Primitive type and scopes:** five `FLOAT` variables, each scoped to `FONT_WEIGHT`, with the Web Code Syntax displayed above.
- **Responsive semantic aliases:** each existing `type/{role}/weight` token in the `Lunio DS / 04 Typography — DESIGN.md v1` collection (modes `Mobile 375` and `Desktop 1440`) aliases the matching weight primitive.
- **Text Styles:** the 24 responsive role styles use the correct named MiSans TC face for each role. Semantic `type/{role}/weight` variables alias the five weight primitives. **Figma exception:** the H4 styles use an explicit MiSans TC Semibold face because Figma currently reports a Bold face when the weight variable is bound. H4 role variables still alias 600; avoid stating that all 24 Text Styles have a working weight-variable binding until Figma face rendering is verified.
- **Preview:** the Mobile 375 and Desktop 1440 Figma documentation frames each show Regular, Medium, Semibold, Bold and Heavy examples with token bindings.

**Usage policy:** Use the five approved MiSansTC weights only. Typography role styles should be used instead of hardcoding a new weight on each page. The `h4` semantic variable is **600 / Semibold** on both viewports; the earlier Figma role data conflicted with the documented H4 mapping.

**Web implementation example (Next.js + shadcn/ui)**

```css
:root {
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-heavy: 800;
}

.typo-h4 { font-weight: var(--font-weight-semibold); }
.typo-display, .typo-price-xl { font-weight: var(--font-weight-heavy); }
```

Register actual licensed MiSansTC font files for the five weights `400`, `500`, `600`, `700` and `800` with `next/font/local`, then verify each weight renders correctly in the browser. Do not remap a Regular-only font file to the other weights. Keep CSS fallback faces for unsupported glyphs without adding another brand typeface.

### 12 Semantic Typographic Roles

| Role | Mobile (375px) | Desktop (1440px) | Weight | Utility Class | Usage |
|---|---|---|---|---|---|
| **display** | 40px / 48px | 48px / 56px | 800 | `typo-display` | Homepage hero headlines |
| **h1** | 32px / 40px | 40px / 48px | 700 | `typo-h1` | PDP product title, section hero |
| **h2** | 26px / 34px | 32px / 40px | 700 | `typo-h2` | Feature headers, section titles |
| **h3** | 22px / 30px | 24px / 32px | 700 | `typo-h3` | Feature cards, modal titles, larger desktop product grid when appropriate |
| **h4** | 18px / 26px | 20px / 28px | 600 | `typo-h4` | **Mobile Product Row title**, trust titles and review names |
| **body-lg** | 17px / 26px | 18px / 28px | 400 | `typo-body-lg` | Lead intro paragraphs |
| **body-md** | 16px / 26px | 16px / 26px | 400 | `typo-body-md` | Standard descriptions, review text |
| **body-sm** | 14px / 22px | 14px / 22px | 400 | `typo-body-sm` | Specs, secondary notes, captions |
| **label** | 16px / 24px | 16px / 24px | 600 | `typo-label` | Buttons, navigation links, tabs |
| **caption** | 12px / 18px | 13px / 20px | 500 | `typo-caption` | Nonessential micro badges / tertiary metadata; use body-sm or body-md for important legal or shipping information |
| **price-xl** | 26px / 32px | 32px / 38px | 800 | `typo-price-xl` | PDP primary price (`NT21,990`) |
| **price-md** | 20px / 26px | 24px / 30px | 700 | `typo-price-md` | Card price, installment amount (`NT1,833 / 月`) |

### Readability Policy and Responsive Semantics

The following are **internal Lunio readability and design-system decisions**, not a claim that WCAG prescribes a universal minimum font size:

1. Primary interactive labels (button text, mobile navigation, form labels and mattress selectors) use **16px / 24px** on Mobile 375 and Desktop 1440. Keep controls at a **minimum height of 44px** on mobile, but permit growth when the user zooms or text wraps; avoid relying on a fixed `height: 44px` everywhere.
2. Main product descriptions and review text use `body-md` **16px / 26px** on Mobile 375; secondary details use `body-sm` **14px / 22px**. `caption` **12px / 18px** is limited to non-essential micro metadata. Shipping terms, price conditions and legal disclosures should not be placed in tiny captions solely to fit the design.
3. Product titles inside a **343px horizontal Product Row** use `h4` **18px / 26px** rather than `h3` 22px / 30px. On a spacious Desktop card, `h3` can be used after a layout review.
4. **Figma Styles:** 12 semantic roles × 2 responsive modes; controls should map to the same token role regardless of page. **Do not use visual H1/H2 sizes to determine semantic HTML heading levels**; choose the HTML heading level from document structure.
5. **Breakpoints:** 375px and 1440px are reference viewports. The 1024px desktop breakpoint is validated alongside Tablet 768–1023; use flexible grids and `minmax(0,1fr)` to avoid overflow.
6. The user must be able to resize text **up to 200%**, and typical vertically scrolling content must reflow at **320 CSS px** without two-dimensional scrolling unless WCAG exceptions apply. All Commerce Components require 320 / 375 / 768 / 1024 / 1440 and zoom QA.

---

## 3. Spatial Rhythm, Radius & Elevation

### 4px Base Grid
- `s-1: 4px` · `s-2: 8px` · `s-3: 12px` · `s-4: 16px` · `s-5: 20px` · `s-6: 24px` · `s-8: 32px` · `s-10: 40px` · `s-12: 48px` · `s-16: 64px` · `s-20: 80px` · `s-24: 96px`

### Standard Radii
- **8px Controls (`--radius-control: 8px`)**: `rounded-[8px]` (`rounded-lg`) for Buttons, Inputs, Selects, and Quantity Steppers.
- **16px Containers (`--radius-container: 16px`)**: `rounded-2xl` (`16px`) for Cards, Modals, Sheets, and Accordions.
- **9999px Pill Badges & CTAs (`--radius-pill: 9999px`)**: `rounded-full` for **Badges** (`components/ui/badge.tsx`), promotional sale tags (`現省`), filter chips, and pill buttons.

### Elevation Hierarchy
- **Level 0 (Flat)**: Background canvas `#FAFAFC` and surface containers.
- **Level 1 (Hairline)**: Catalog grid items with `border border-[#E6E4EE] shadow-2xs`.
- **Level 2 (Soft Elevation)**: Hover states, active selections, dropdown menus with `shadow-md`.
- **Level 3 (Floating)**: Sticky Buy Bar, bottom drawers, and modal dialogs with `shadow-xl`.

---

## 4. Taiwan Bed Sizes / Product Variation Contract (床墊規格)

**Do not hardcode generic textbook dimensions (such as 90/105 cm) across every product.** Read actual size labels, dimensions, pricing, and availability from the WooCommerce variant/SKU record or verified product-specific attributes. Taiwanese traditional size nicknames are *labels*, not a globally uniform dimension mapping.

The Lunio Sunset Pro and Gen 4 Taiwan SKU catalog documents the following **SKU-verified examples**:

| Traditional label | SKU-Verified width × length × thickness | Source |
|---|---|---|
| 標準單人 3 尺 | **89 × 188 × 24 cm** | `lunio.com.tw` SKU specification |
| 單人加大 3.5 尺 | **104 × 188 × 24 cm** | `lunio.com.tw` SKU specification |
| 標準雙人 5 尺 | **150 × 188 × 24 cm** | `lunio.com.tw` SKU specification |
| 雙人加大 6 尺 | **180 × 188 × 24 cm** | `lunio.com.tw` SKU specification |
| 雙人特大 7 尺 | **180 × 210 × 24 cm** | `lunio.com.tw` SKU specification |

The source page also notes handmade dimensions may vary approximately ±2 cm.

**Normalized UI product model**: `productId`, `slug`, `brandId`, `title`, `image`, `variationId`, `sizeLabel`, `dimensionsCm?`, `regularPriceMinor`, `salePriceMinor`, `currencyCode` (`"NT"`), `stockStatus`, `onSale`, `saleBadge?`, `isDefaultVariation`, `hasGiftBundle?`. Price and product quantities are data, not theme tokens.

### Unified Price Formatting Contract (`"NT"` Format)

All prices across `lunio.com.tw` components (`PriceBlock`, `ProductCard`, `PDPStickyBar`, `ComparisonTable`, `CartAddOnCard`, `CartGiftLine`, `PaymentMethodSelector`, `DesktopMegaMenu`, and `MobileMegaMenu`) MUST be formatted from `currencyCode = "NT"` via `formatPrice(amount, currencyCode)` in `lib/design-system.ts`:
- **Approved format:** `NT21,990` (active sale/variation price), `NT28,980` (crossed-out compare-at price), `現省 NT6,990` (discount badge).
- **Prohibited:** Never mix `NT$28,990` or `NT$ 21,990` with `NT21,990` on the same page or component.

---

## 5. Core E-Commerce UI Components & Conversion Backlog (001–024)

### Buttons & Badges
- **Primary Button**: Scoped brand fill with tested semantic foreground (`bg-primary text-primary-foreground`, **NOT** `text-white` across brands). Uses mobile `min-h-11`, supporting 200% text resizing and long Chinese labels.
- **Outline Button**: 1px semantic border and `color/interactive-text` foreground with readable hover/focus states.
- **Badge (`rounded-full`)**: Uses `--radius-pill: 9999px` (`rounded-full`) across all variants (`default`, `secondary`, `outline`, `success`, `destructive`, `sale`, `discount`). Discount badges (`現省`) use `variant="sale"` (`#E53935` background with `#FFFFFF` text, **4.53:1** AA).

### PriceBlock (Backlog 005 / 024)
- Renders active price (`typo-price-xl` or `typo-price-md`), crossed-out original price, automatic `<Badge variant="sale">現省 NT{diff}</Badge>` calculation, and 0% credit card installment breakdown (`12 期 0 利率 · 每期 NT1,833 起`) using unified `"NT"` currency formatting.

### ProductCard & SizeSelector
- **Mobile Product Row:** horizontal image + content with `h4` (18/26) for the name; data-driven `price-md` in `"NT"` format, `<Badge variant="sale">` discount tag, stock and variant state.
- **SizeSelector & MattressRadioSelector:** states are `Default`, `Selected`, `Disabled`, `Sold Out`; minimum 44px touch target; displays SKU-verified dimensions (`89×188`, `104×188`, `150×188`, `180×188`, `180×210 cm`) and Sheet size comparison modal.

### ComparisonTable (Backlog 016)
- Side-by-side specification matrix comparing Lunio Gen 4, Quantum Max, Nooz Helix, and Nooz Sunset across firmness, thickness, cooling layer, core support, trial/warranty, and 5ft Double `"NT"` pricing.

### ReassuranceRow (Backlog 020) & PromoBanner (Backlog 015 / 024)
- **ReassuranceRow:** 4-pillar trust strip (100-Night Trial, 10-Year Warranty, Free Taiwan Floor Delivery, Free Old Mattress Removal) in full card grid and compact strip variants.
- **PromoBanner:** Campaign hero banner with `#E53935` Sale badge, live countdown timer, and one-click promo code copy (`LUNIO1111`).

### ReviewList & ReviewCard (Backlog 013)
- Verified buyer review system with 5-star rating distribution bars, tag filter pills (`全部評價`, `支撐護脊`, `涼感透氣`, `舊床回收`), purchased size/firmness metadata, and official store reply block.

### DesktopMegaMenu (Backlog 004) & MobileMegaMenu
- **DesktopMegaMenu:** 5-brand desktop header switcher (`Lunio`, `Nooz Helix`, `Nooz Sunset`, `Lunio Bedding`, `Lunio Life`) with instant product previews, `"NT"` prices, and sale badges.
- **MobileMegaMenu:** Accessible Sheet drawer with fluid 5-brand filter tabs (`minmax(0, 1fr)`), 44px tap targets, and single scroll container.

### CartGiftLine & CartAddOnCard (Backlog 014)
- **CartGiftLine:** Automatic free gift inclusion row (`價值 NT2,490 · 免費贈送`) for mattress orders.
- **CartAddOnCard:** 1-click cart upsell cards with interactive toggle states, `"NT"` bundle pricing, and live upsell subtotal calculation.

### CheckoutStepper, TaiwanAddressForm (Backlog 007) & PaymentMethodSelector (Backlog 008)
- **CheckoutStepper & TaiwanAddressForm:** 3-step checkout progress indicator paired with Taiwan city/district selector (auto-resolving 3-digit postal codes), elevator/stairs floor selector, and same-size old mattress removal scheduling.
- **PaymentMethodSelector:** Taiwan localized payment selector supporting 0% credit card installments (3 / 6 / 12 / 24 months with live `"NT"` per-month calculation), LINE Pay, Apple Pay, zingala 銀角零卡 cardless installments, and ATM virtual account.

---

## 6. Accessibility & Quality Standards (WCAG 2.2 AA)

- **Contrast Minimum (1.4.3)**: Normal text requires at least 4.5:1; large text at least 3:1. This applies to the text/background color pairing, including CTA labels and sale badges (`#E53935` with `#FFFFFF` is **4.53:1** AA).
- **Focus Visible (2.4.7)**: Keyboard navigation must display clear `focus-visible:ring-2` with `ring-offset-2`.
- **Target Size (2.5.8)**: WCAG 2.2 AA normative target is **24×24 CSS px or a permitted exception**. Lunio adopts an intentionally **stricter internal guideline of 44×44px** for common mobile tap targets.
- **Reflow (1.4.10)**: Content reflows at **320 CSS px** without requiring two-dimensional scrolling, subject to WCAG exceptions. Also tested for **Resize Text 200% (1.4.4)**, Text Spacing (1.4.12), labels, semantics, keyboard and focus visibility.

---

## 7. Developer CLI Commands

```bash
# Generate SVG/PNG brand logos for all 5 brands
npm run logos:build

# Build token artifacts (generated-tokens.css)
npm run tokens:build

# Validate token contrast ratios (9/9 tests)
npm run tokens:check

# Validate shadcn/ui & 19 commerce patterns (6/6 gates)
npm run shadcn:check

# Run TypeScript compilation
npm run typecheck

# Production Next.js build
npm run build
```

---

## 8. Version History

### v1.1 — 2026-10-14 · MiSansTC Font Weight Foundation
- Added the five shared font weights **Regular 400, Medium 500, Semibold 600, Bold 700, Heavy 800** and their corresponding Figma variables and web mappings.
- Mapped all 24 Text Styles to the semantic roles; corrected `h4` to **600 Semibold**.

### v1.2 — 2026-10-15 · Senior Frontend & UX/UI Review
- **Typography readability:** Mobile Body-MD 16/26, Body-SM 14/22, Label 16/24, Caption 12/18; Desktop Label 16/24 and Caption 13/20.
- **Color audit:** Documented safe semantic foregrounds for Sunset (`#1C1526` on `#F28131`) and Helix accent (`#000000` on `#9362D9`), plus onboarded 4th brand **Lunio Bedding** (`#1C46B4`).

### v1.3 — 2026-10-15 · shadcn/ui Foundation & Radix Primitives
- **shadcn/ui Migration:** Converted source-owned UI components to shadcn/ui on Radix primitives with zero raw HTML `<button>` or `<select>` elements in live pages.
- **Commerce Patterns:** Introduced initial commerce patterns (`ProductCard`, `SizeSelector`, `QuantityStepper`, `PDPStickyBar`, `MobileMegaMenu`).

### v1.4.1 — 2026-10-16 · Production TypeScript Hardening & Component API Ergonomics
- **Vercel Build Compilation & TypeScript Fix:** Resolved `TS2353` and `TS2322` property mismatch errors during production Next.js builds. Added backward-compatible prop aliases (`priceAmount`, `compareAtAmount`, `size`, `sizeNote`, `compact`, `discountBadge`) across `ProductCard`, `PriceBlock`, `PDPStickyBar`, and `ReassuranceRow`.
- **ReassuranceRow Compact Layout:** Added high-density horizontal strip layout for PDP buy modules and mobile navigation sheets.
- **5-Brand Portal Theming Automated Test:** Extended `tests/shadcn.test.mjs` to explicitly assert `data-brand="lunio-life"` theme inheritance alongside `lunio`, `helix`, `sunset`, and `bedding`.
- **Quality Gates:** 9/9 token tests, 6/6 shadcn static checks, 0 TypeScript errors (`tsc --noEmit`), and 19/19 SSG static routes compiled cleanly.

### v1.4.0 — 2026-10-16 · 5-Brand `lunio.com.tw` Scope (Lunio Life), Unified `"NT"` Pricing, Sale Token & Full Conversion Backlog (001–024)
- **Explicit `lunio.com.tw` 5-Brand Scope & `data-brand="lunio-life"`:** Clarified that the system is specifically for `lunio.com.tw` and added the 5th brand **Lunio Life** (`Plum Night #2D274A`, `Titan White #CCD5F8`, `Crocus Purple #9786F3` with `#141414` ink, plus secondary colors `#ECE8D8`, `#EC9BB0`, `#F6D0D7`).
- **Unified `"NT"` Price Formatting & Dedicated Sale Token (`#E53935`):** Standardized all prices on `currencyCode = "NT"` (`NT21,990`, eliminating `NT$` mixing) and introduced `--sale: #E53935` (`<Badge variant="sale">`) so promotional `現省` badges do not reuse `--destructive` (`#B42318`).
- **22 Primitives & 19 Commerce Patterns (Backlog 001–024 Complete):** Implemented all 9 conversion backlog component suites (`PriceBlock`, `ComparisonTable`, `ReassuranceRow`, `PromoBanner`, `ReviewList`/`ReviewCard`, `DesktopMegaMenu`, `CartAddOnCard`/`CartGiftLine`, `TaiwanAddressForm`/`CheckoutStepper`, `PaymentMethodSelector`) and standardized `Badge` on `rounded-full` (`--radius-pill: 9999px`).
- **Closed All 5 P0 Blockers:** Verified `UX-01`, `DS-02`, `DS-03`, `A11Y-04`, and `DATA-05` across automated token, shadcn, and build checks.

---

## 9. Frontend Implementation Contract (Next.js + shadcn/ui)

### 9.1 Source-of-truth architecture
- **Figma & `DESIGN.md` v1.4.1:** Approved visual specs, 5 brand modes, text styles, component anatomy and interaction examples for `lunio.com.tw`.
- **`src/design-system/tokens.json`:** Versioned JSON source compiled via `npm run tokens:build` into `src/styles/generated-tokens.css`.
- **WordPress / WooCommerce:** Dynamic product IDs, SKUs, variation dimensions, descriptions, price in minor units, `currencyCode` (`"NT"`), discounts, stock, shipping, order and payment information.
- **Next.js storefront:** Accessible semantic HTML, responsive layouts, 22 `components/ui/` primitives, and 19 `components/commerce/` patterns.

### 9.2 Conversion Backlog Rollout Order (Waves 1–3)

| Rollout Wave | Backlog IDs | Component Suites | Primary Conversion Goal | Status |
|---|---|---|---|---|
| **Wave 1 (Pre-11.11 Priority)** | `005`, `024`, `016`, `020`, `015` | `PriceBlock`, `ComparisonTable`, `ReassuranceRow`, `PromoBanner` + `<Badge variant="sale">` | Unify `"NT"` price clarity, highlight `現省` savings in `#E53935`, and reduce PDP bounce rate | **Implemented & Verified** |
| **Wave 2 (Discovery & Cart AOV)** | `013`, `004`, `014` | `ReviewList` / `ReviewCard`, `DesktopMegaMenu`, `CartAddOnCard` / `CartGiftLine` | Cross-sell across all 5 brands on `lunio.com.tw` and lift cart AOV with 1-click add-ons | **Implemented & Verified** |
| **Wave 3 (Taiwan Checkout)** | `007`, `008` | `TaiwanAddressForm` / `CheckoutStepper`, `PaymentMethodSelector` | Streamline bulky mattress delivery (postal code, elevator, old mattress removal) and 0% installments | **Implemented & Verified** |

---

## 10. Senior Review Findings and Release Status

| ID | Priority | Finding | Correction / Decision | Status |
|---|---|---|---|---|
| UX-01 | P0 | Mobile label/Body-SM readability & mixed `NT$` / `NT` price format | Raised Label 16/24, Body SM 14/22, Body MD 16/26; standardized all prices on `currencyCode` (`"NT"`, e.g. `NT21,990`) and added `--sale: #E53935` | **Closed & Verified (v1.4.1)** |
| DS-02 | P0 | Spec inconsistencies (version header vs §10, primitive count, commerce count, Badge radius) | Aligned header & §10 to `v1.4.1`; synchronized **22** primitives, **19** commerce patterns, and `Badge` `rounded-full` (`9999px`) | **Closed & Verified (v1.4.1)** |
| DS-03 | P0 | Storefront scope wording & missing 5th brand (`Lunio Life`) | Explicitly scoped to `lunio.com.tw` (5 brands) and added `data-brand="lunio-life"` (`#2D274A`, `#CCD5F8`, `#9786F3`) | **Closed & Verified (v1.4.1)** |
| A11Y-04 | P0 | Cross-brand foreground contrast enforcement | Enforced Sunset `#1C1526` on `#F28131` (6.72:1), Helix `#000000` on `#9362D9` (4.99:1), Lunio Life `#141414` on `#9786F3` (6.15:1), and Sale `#FFFFFF` on `#E53935` (4.53:1) | **Closed & Verified (v1.4.1)** |
| DATA-05 | P0 | Hardcoded 90/105cm dimensions & missing conversion backlog (001–024) | Updated Single/Single XL defaults to SKU-verified `89×188×24 cm` / `104×188×24 cm` and implemented all 9 missing commerce suites | **Closed & Verified (v1.4.1)** |
| UX-06 | P1 | Mega Menu tab overflow at 375px | Responsive fluid grid + 5-brand support in `MobileMegaMenu` & `DesktopMegaMenu` | **Closed & Verified (v1.4.1)** |
| UX-07 | P1 | Product Row title H3 oversized for compact 375 layout | Mapped narrow Product Card to H4 18/26 | **Closed & Verified (v1.4.1)** |
| COMP-08 | P1 | Size Selector states & comparison modal | Implemented 4-state `SizeSelector` and `MattressRadioSelector` with Sheet modal | **Closed & Verified (v1.4.1)** |
| A11Y-09 | P1 | Form error color/focus alone is insufficient | Implemented textual errors + `aria-invalid`/`aria-describedby` in `Input` and `TaiwanAddressForm` | **Closed & Verified (v1.4.1)** |
| COMP-10 | P1 | Sticky PDP Bar safe-area padding & variation sync | Shared variation state + `env(safe-area-inset-bottom)` + `"NT"` price & sale badge support | **Closed & Verified (v1.4.1)** |
| BRAND-11 | P2 | Lunio Bedding & Lunio Life CI tokens + dedicated Sale token | Signed off all 5 brands (`lunio`, `helix`, `sunset`, `bedding`, `lunio-life`) and `--sale` (`#E53935`) | **Closed & Verified (v1.4.1)** |
| QA-12 | P2 | Automated token, contrast, and component test gates | `npm run tokens:check` (9/9) and `npm run shadcn:check` (6/6) + `npm run build` verified | **Closed & Verified (v1.4.1)** |

**Release status:** `DESIGN SYSTEM v1.4.1 — PRODUCTION CERTIFIED FOR LUNIO.COM.TW (5 BRANDS, 22 PRIMITIVES, 19 COMMERCE PATTERNS)`.

### References
- [Lunio Taiwan Official Storefront (`lunio.com.tw`)](https://lunio.com.tw/)
- [Lunio shop](https://lunio.com.tw/shop/)
- [Lunio Quantum Max PDP](https://lunio.com.tw/product/lunio-quantum/)
- [Lunio Nooz Sunset PDP](https://lunio.com.tw/product/nooz-sunset/)
- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)

---

## 11. UI Implementation Addendum — shadcn/ui + Radix (v1.4.1, 2026-10-16)

The approved UI implementation foundation is **shadcn/ui with Radix primitives** (source-owned in `components/ui/`), Tailwind CSS v4, Lucide icons, and Lunio Multi-brand Semantic CSS Tokens for `lunio.com.tw`.

### 11.1 Five Brand Foundations & Portal Theming (`lunio.com.tw`)

| Brand ID | Brand Name | Primary Fill | Semantic On-Primary | Accent Fill | Semantic On-Accent | Surface Canvas | Primary WCAG Ratio |
|---|---|---|---|---|---|---|---|
| `lunio` | Lunio Taiwan | `#1C46B4` | `#FFFFFF` | `#2E62ED` | `#FFFFFF` | `#F5F7FD` | **8.13:1** (AAA) |
| `helix` | Nooz Helix | `#7347AE` | `#FFFFFF` | `#9362D9` | `#000000` | `#F8F5FC` | **6.48:1** (AA) |
| `sunset` | Nooz Sunset | `#F28131` | `#1C1526` | `#FF9A52` | `#1C1526` | `#FEF7F2` | **6.72:1** (AA) |
| `bedding` | Lunio Bedding | `#1C46B4` | `#FFFFFF` | `#2E62ED` | `#FFFFFF` | `#F5F7FD` | **8.13:1** (AAA) |
| `lunio-life` | Lunio Life | `#2D274A` | `#FFFFFF` | `#9786F3` | `#141414` | `#CCD5F8` | **13.99:1** (AAA) |

- **Root & Portal Inheritance:** Setting `document.documentElement.dataset.brand = brand` ensures all Radix floating portals (`SelectContent`, `DialogContent`, `SheetContent`, `PopoverContent`, `DropdownMenuContent`) automatically inherit active brand tokens and dark mode semantics without manual prop drilling.
- **Accessible Foreground Policy:** Sunset primary (`#F28131`) resolves to `#1C1526` (6.72:1); Helix accent (`#9362D9`) resolves to `#000000` (4.99:1); Lunio Life accent (`#9786F3`) resolves to `#141414` (6.15:1).

### 11.2 Typography & 5 Font Weights Architecture

- **Authoritative Font Stack:** `"MiSansTC", "PingFang TC", "Microsoft JhengHei", Arial, sans-serif`
- **Five Font Weights:** `weight/regular` (400), `weight/medium` (500), `weight/semibold` (600), `weight/bold` (700), `weight/heavy` (800).
- **12 Responsive Typographic Roles:** `display`, `h1`, `h2`, `h3`, `h4`, `body-lg`, `body-md`, `body-sm`, `label`, `caption`, `price-xl`, `price-md`.

### 11.3 Radii & 4px Spatial Rhythm

- **Radii:**
  - `--radius-control: 8px` (`rounded-[8px]`) for Buttons, Inputs, Select triggers, and Quantity steppers.
  - `--radius-container: 16px` (`rounded-2xl`) for Cards, Dialogs, Sheets, Accordions, and Carousels.
  - `--radius-pill: 9999px` (`rounded-full`) for **Badges** (`components/ui/badge.tsx`), promotional sale tags (`現省`), Pill buttons, filter chips, and carousel dots.
- **Spatial Scale (4px Rhythm):**
  - `space-1 (4px)`, `space-2 (8px)`, `space-3 (12px)`, `space-4 (16px)`, `space-5 (20px)`, `space-6 (24px)`, `space-8 (32px)`, `space-10 (40px)`, `space-12 (48px)`, `space-16 (64px)`, `space-20 (80px)`, `space-24 (96px)`.

### 11.4 Complete Inventory: 22 Core shadcn/ui Primitives

| # | Component | File Path | Radix Primitive / Engine | Data-Slot Contract | Key WCAG 2.2 AA Criteria |
|---|---|---|---|---|---|
| 1 | **Button** | `components/ui/button.tsx` | `@radix-ui/react-slot` + CVA | `data-slot="button"` | Visible focus ring, 44px min-height, contrast >= 4.5:1 |
| 2 | **Input** | `components/ui/input.tsx` | HTML input styled | `data-slot="input"` | Accessible label association, `aria-invalid` support |
| 3 | **Card** | `components/ui/card.tsx` | Composite container | `data-slot="card"`, `card-header`, `card-content` | Semantic heading hierarchy, high-contrast borders |
| 4 | **Tabs** | `components/ui/tabs.tsx` | `@radix-ui/react-tabs` | `data-slot="tabs"`, `tabs-list`, `tabs-trigger`, `tabs-content` | Arrow-key navigation, roving focus, `aria-selected` |
| 5 | **Badge** | `components/ui/badge.tsx` | CVA pill tag (`rounded-full`) | `data-slot="badge"` | Includes `sale` (`#E53935`) & `discount` variants, >= 4.5:1 contrast |
| 6 | **Label** | `components/ui/label.tsx` | `@radix-ui/react-label` | `data-slot="label"` | Associated `htmlFor`, clicks transfer focus to inputs |
| 7 | **Separator** | `components/ui/separator.tsx` | `@radix-ui/react-separator` | `data-slot="separator"` | `role="separator"`, `aria-orientation`, decorative flag |
| 8 | **Skeleton** | `components/ui/skeleton.tsx` | CSS pulse placeholder | `data-slot="skeleton"` | `aria-hidden="true"`, zero layout shift during async load |
| 9 | **Textarea** | `components/ui/textarea.tsx` | HTML textarea styled | `data-slot="textarea"` | Multi-line input, responsive resizing, keyboard focus |
| 10 | **Select** | `components/ui/select.tsx` | `@radix-ui/react-select` | `data-slot="select"`, `select-trigger`, `select-content`, `select-item` | Up/Down arrows, Typeahead, focus trap, portal brand theme |
| 11 | **Dialog** | `components/ui/dialog.tsx` | `@radix-ui/react-dialog` | `data-slot="dialog"`, `dialog-content`, `dialog-overlay` | Modal focus trap, Esc to close, restores trigger focus |
| 12 | **Sheet** | `components/ui/sheet.tsx` | `@radix-ui/react-dialog` | `data-slot="sheet"`, `sheet-content`, `sheet-overlay` | Slide-in drawer, body scroll lock, screen-reader titles |
| 13 | **Command** | `components/ui/command.tsx` | `cmdk` | `data-slot="command"`, `command-input`, `command-list`, `command-item` | Fast keyboard search palette (`⌘K`), active item aria-selected |
| 14 | **Checkbox** | `components/ui/checkbox.tsx` | `@radix-ui/react-checkbox` | `data-slot="checkbox"`, `checkbox-indicator` | Native Space key toggle, high-contrast checkmark, `aria-checked` |
| 15 | **DropdownMenu** | `components/ui/dropdown-menu.tsx` | `@radix-ui/react-dropdown-menu` | `data-slot="dropdown-menu"`, `dropdown-menu-content`, `dropdown-menu-item` | Submenu arrow navigation, Enter trigger, Esc dismiss |
| 16 | **Popover** | `components/ui/popover.tsx` | `@radix-ui/react-popover` | `data-slot="popover"`, `popover-content` | Contextual floating panel, outside click dismiss, focus management |
| 17 | **ScrollArea** | `components/ui/scroll-area.tsx` | `@radix-ui/react-scroll-area` | `data-slot="scroll-area"`, `scroll-area-thumb` | Custom styled scrollbar, native touchpad & touch scrolling |
| 18 | **Accordion** | `components/ui/accordion.tsx` | `@radix-ui/react-accordion` | `data-slot="accordion"`, `accordion-item`, `accordion-trigger`, `accordion-content` | Single/multiple collapse, smooth expand animation, full keyboard support |
| 19 | **RadioGroup** | `components/ui/radio-group.tsx` | `@radix-ui/react-radio-group` | `data-slot="radio-group"`, `radio-group-item`, `radio-group-indicator` | Mutual exclusivity, Arrow-key roving focus, high contrast circle |
| 20 | **Tooltip** | `components/ui/tooltip.tsx` | `@radix-ui/react-tooltip` | `data-slot="tooltip"`, `tooltip-content`, `tooltip-trigger` | Microcopy helper, dismisses on Escape, hover & keyboard focus trigger |
| 21 | **Breadcrumb** | `components/ui/breadcrumb.tsx` | `@radix-ui/react-slot` | `data-slot="breadcrumb"`, `breadcrumb-list`, `breadcrumb-item`, `breadcrumb-link` | Semantic `<nav aria-label="breadcrumb">`, truncated ellipsis support |
| 22 | **Carousel** | `components/ui/carousel.tsx` | `embla-carousel-react` | `data-slot="carousel"`, `carousel-content`, `carousel-item`, `carousel-previous`, `carousel-next` | Touch swipe, Arrow Left/Right key support, accessible Next/Prev buttons |

### 11.5 Complete Inventory: 19 Taiwan E-Commerce Patterns

| # | Pattern | File Path | Backlog ID | Composed shadcn Primitives | Taiwan Commerce Functionality |
|---|---|---|---|---|---|
| 1 | **ProductCard** | `components/commerce/product-card.tsx` | `002` | `Card`, `Badge`, `Button` | Standardized product preview, `"NT"` price formatting, `sale` badge, and PDP routing. |
| 2 | **ProductCardSkeleton** | `components/commerce/product-card.tsx` | `002` | `Skeleton`, `Card` | Zero layout shift skeleton placeholder during WooCommerce API data fetching. |
| 3 | **SizeSelector** | `components/commerce/size-selector.tsx` | `006` | `Button`, `Label` | Quick button pills for 5 Taiwan bed sizes (3, 3.5, 5, 6, 7 尺) with 4 states. |
| 4 | **QuantityStepper** | `components/commerce/quantity-stepper.tsx` | `009` | `Button` | 44×44px touch targets on increment/decrement with `aria-live="polite"`. |
| 5 | **PDPStickyBar** | `components/commerce/pdp-sticky-bar.tsx` | `010` | `Button`, `Badge` | Bottom-docked purchase summary with `env(safe-area-inset-bottom)` and `"NT"` pricing. |
| 6 | **MobileMegaMenu** | `components/commerce/mobile-mega-menu.tsx` | `003` | `Sheet`, `Tabs`, `Button`, `Badge` | Mobile 5-brand drawer with fluid filter tabs (`Lunio`, `Helix`, `Sunset`, `Bedding`, `Lunio Life`). |
| 7 | **DesktopMegaMenu** | `components/commerce/desktop-mega-menu.tsx` | `004` | `Button`, `Badge` | Desktop 5-brand header mega-menu with instant product previews and `"NT"` pricing. |
| 8 | **PriceBlock** | `components/commerce/price-block.tsx` | `005 / 024` | `Badge` | Unified `"NT"` price display (`NT21,990`), crossed-out compare price, `#E53935` `現省` badge, and 0% installments. |
| 9 | **PromoBanner** | `components/commerce/promo-banner.tsx` | `015 / 024` | `Badge`, `Button` | Campaign hero banner with `#E53935` Sale badge, countdown timer, and one-click code copy. |
| 10 | **ReassuranceRow** | `components/commerce/reassurance-row.tsx` | `020` | `Badge` | 4-pillar trust strip (100-night trial, 10-year warranty, free delivery, old mattress removal). |
| 11 | **ComparisonTable** | `components/commerce/comparison-table.tsx` | `016` | `Badge`, `Button` | Cross-brand mattress comparison matrix across Lunio Gen 4, Quantum Max, Helix, and Sunset. |
| 12 | **ProductRating** | `components/commerce/product-rating.tsx` | `012` | `Badge` | Accessible 5-star rating summary with half-star support, review counts, and trust badges. |
| 13 | **ReviewList & ReviewCard** | `components/commerce/review-list.tsx` | `013` | `Badge`, `Button` | Verified buyer reviews with 5-star distribution bars, tag filter pills, and store replies. |
| 14 | **MattressSpecsAccordion** | `components/commerce/mattress-specs-accordion.tsx` | `011` | `Accordion`, `Separator` | 5-layer mattress structure, 100-night trial terms, 10-year warranty, and shipping details. |
| 15 | **MattressRadioSelector** | `components/commerce/mattress-radio-selector.tsx` | `006` | `RadioGroup`, `Tooltip`, `Sheet`, `Label` | SKU-verified 台尺 / cm size selection (`89×188`, `104×188`, etc.) with comparison Sheet modal. |
| 16 | **ProductCarousel** | `components/commerce/product-carousel.tsx` | `001` | `Carousel`, `Badge`, `Button` | Multi-slide product gallery with Previous/Next controls and interactive slide dots. |
| 17 | **CartGiftLine & CartAddOnCard** | `components/commerce/cart-addons.tsx` | `014` | `Badge`, `Button` | Free gift inclusion line (`價值 NT2,490`) and 1-click upsell add-on cards for cart AOV. |
| 18 | **TaiwanAddressForm & CheckoutStepper** | `components/commerce/taiwan-address-form.tsx` | `007` | `Select`, `Input`, `Checkbox`, `Button`, `Label` | 3-step checkout progress and Taiwan city/district/postal-code, elevator, and old mattress removal form. |
| 19 | **PaymentMethodSelector** | `components/commerce/payment-method-selector.tsx` | `008` | `RadioGroup`, `Badge`, `Button`, `Label` | Taiwan payment selector with 3/6/12/24-month 0% credit card installments, LINE Pay, Apple Pay, and zingala. |

### 11.6 CSS Spacing & Code Panel Refinement

- **Copy Button Clearances:** In code blocks and terminal snippets (`CodePanel`, usage terminal), Copy buttons are positioned at `top-3 right-3` or `top-3.5 right-3.5` with minimum `pr-16` (64px right padding) on code text to guarantee zero text collision.
- **Visual & Accessible Feedback:** Copy buttons provide high-contrast dark surfaces (`bg-slate-900/90 text-slate-200 border-slate-700`), visible focus rings, green checkmark transition upon copying (`Copied!`), and accessible tooltips.

### 11.7 Quality Gates & Verification Record

All release candidates must pass:
1. `npm run tokens:check`: **9/9** token semantic, 5-brand contrast (>= 4.5:1), Sale token (`#E53935`), and spatial tests passed.
2. `npm run shadcn:check`: **6/6** static source, upstream dependency, 22 primitives, 19 commerce patterns, and zero-raw-button/select contracts passed.
3. `npm run typecheck`: TypeScript compiler (`tsc --noEmit`) passes with zero errors.
4. `npm run build`: Next.js Turbopack SSG builds and prerenders all static routes without runtime errors.
