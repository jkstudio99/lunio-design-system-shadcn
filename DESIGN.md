# Lunio Multi-Brand Design System Platform (DESIGN.md)

> Comprehensive design specification, semantic tokens, and component guidelines for **lunio.com.tw**, **Nooz Helix**, and **Nooz Sunset**. Standardized on **MiSansTC**, **4px rhythm grid**, and **WCAG 2.2 AA**.

> **Document version:** v1.2 — Senior E-commerce UX/UI & Frontend Review (2026-10-15)
> **Status:** Design-system specifications updated in Figma; NOT a live Next.js deployment or WCAG conformance certification. Follow the release gates in Sections 6, 9 and 10.

---

## 1. Brand Identity & Semantic Architecture

The platform isolates brand themes via scoped CSS custom properties (`[data-brand="..."]`). Changing the brand updates surface, primary color, ink, and accents without altering component code or business logic.

### Brand Palette & Contrast Verification

| Brand Token | Hex Code | On-Primary | WCAG AA Ratio | Role & Application |
|---|---|---|---|---|
| **Lunio Taiwan (Primary)** | `#1C46B4` | `#FFFFFF` | **8.13:1** (Pass AAA) | Flagship electric blue for primary CTAs, active highlights, key brand surfaces. |
| **Lunio Accent** | `#2E62ED` | `#FFFFFF` | **5.14:1** (Pass AA) | Interactive hover states, secondary highlights, promo badge backgrounds. |
| **Lunio Surface** | `#F5F7FD` | `#1A1829` | **16.25:1** (Pass AAA) | Soft tinted canvas background for cards and pill containers. |
| **Nooz Helix (Primary)** | `#7347AE` | `#FFFFFF` | **6.48:1** (Pass AA) | Luxury hotel-grade pocket spring line. Deep velvet purple CTA. |
| **Nooz Helix Accent** | `#9362D9` | `#FFFFFF` (not allowed for normal text) | **4.21:1** (FAIL AA for normal text with white) | Interactive focus rings, badge accents, and card borders. |
| **Nooz Helix Surface** | `#F8F5FC` | `#1E172B` | **16.05:1** (Pass AAA) | Soft lilac container backgrounds. |
| **Nooz Sunset (Primary)** | `#F28131` | `#FFFFFF` (not allowed) | **2.64:1** (FAIL AA even for large text with white) | Ergonomic spine support line. High-energy coral orange CTA. |
| **Nooz Sunset Accent** | `#FF9A52` | `#1C1526` | **8.44:1** (Pass AAA) | Warm amber accents for badges and highlights. |
| **Nooz Sunset Surface** | `#FEF7F2` | `#241810` | **16.32:1** (Pass AAA) | Gentle peach card and header backgrounds. |


#### Accessible semantic foreground decisions (v1.2)

- **Sunset primary:** preserve `#F28131` as the approved brand fill; set `color/on-primary` to `#1C1526` (calculated **6.72:1**) instead of `#FFFFFF` (**2.64:1**, fail). Do not hardcode `text-white` in brand-scoped primary buttons.
- **Helix accent:** `#9362D9` with `#FFFFFF` is **4.21:1** (fails normal-text AA), and with `#000000` is **4.99:1** (passes normal-text AA). Use `color/on-accent` that resolves to a dark foreground where the accent serves as a text background.
- **Sunset accent:** `#FF9A52` with `#1C1526` has **8.44:1**, suitable for foreground text; do not claim that every accent/icon/gradient is accessible without checking its actual context.
- **Status palette:** Success/Error/Warning/Info values in Figma are still **proposed** and not included in the original approved brand palette.
- **Lunio Bedding:** official 4th brand theme using Lunio Taiwan primary color (`#1C46B4`) for bedding accessories (bed sheets, mattress protectors, comforters).
- **Color checks:** contrast figures are calculated from the WCAG relative luminance formula for opaque colors. Banners with photography, overlays and hover states require separate checks.

### Official Brand Assets

All brand marks are authored as lossless SVG vectors and crisp transparent PNGs (Retina / @4x) with colors matching exact CI tokens:

| Brand | Primary Logo (Fill) | White Logo (Reversal) | Vector Assets (SVG) | Master Size | Official Color |
|---|---|---|---|---|---|
| **Lunio Taiwan** | `/images/lunio/lunio-primary.png` | `/images/lunio/lunio-white.png` | `lunio-primary.svg` · `lunio-white.svg` | 1200 × 600 px | `#1C46B4` (Corporate: `#002355`) |
| **Nooz Helix** | `/images/nooz/nooz-primary.png` | `/images/nooz/Nooz-white.png` | `nooz-helix.svg` · `nooz-white.svg` | 1133 × 359 px | `#7347AE` (Deep velvet purple) |
| **Nooz Sunset** | `/images/nooz/Nooz-sunset.png` | `/images/nooz/Nooz-white.png` | `nooz-sunset.svg` · `nooz-white.svg` | 1133 × 359 px | `#F28131` (Sunset orange) |
| **Lunio Bedding** | `/images/lunio-bedding/lunio-bedding-primary@4x.png` | `/images/lunio-bedding/lunio-bedding-white@4x.png` | `lunio-bedding-primary.svg` · `lunio-bedding-white.svg` | 1080 × 248 px | `#1C46B4` (Lunio electric blue) |

---

## 2. Typography System (MiSansTC)

Single authoritative font stack for Traditional Chinese and Latin glyphs:
`font-family: var(--font-sans, "MiSansTC", "PingFang TC", "Microsoft JhengHei", sans-serif);`

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

**Usage policy:** Use the five approved MiSansTC weights only. Typography role styles should be used instead of hardcoding a new weight on each page. The `h4` semantic variable is **600 / Semibold** on both viewports; the earlier Figma role data conflicted with the documented H4 mapping. The previous v1.1 five-weight addition did not change font sizes; **v1.2 now updates selected Body, Label and Caption sizes for readability** as listed in the 12-role table below.

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
| **price-xl** | 26px / 32px | 32px / 38px | 800 | `typo-price-xl` | PDP primary price |
| **price-md** | 20px / 26px | 24px / 30px | 700 | `typo-price-md` | Card price, installment amount |


### v1.2 Readability Policy and Responsive Semantics

The following are **internal Lunio readability and design-system decisions**, not a claim that WCAG prescribes a universal minimum font size:

1. Primary interactive labels (button text, mobile navigation, form labels and mattress selectors) use **16px / 24px** on Mobile 375 and Desktop 1440. Keep controls at a **minimum height of 44px** on mobile, but permit growth when the user zooms or text wraps; avoid relying on a fixed `height: 44px` everywhere.
2. Main product descriptions and review text use `body-md` **16px / 26px** on Mobile 375; secondary details use `body-sm` **14px / 22px**. `caption` **12px / 18px** is limited to non-essential micro metadata. Shipping terms, price conditions and legal disclosures should not be placed in tiny captions solely to fit the design.
3. Product titles inside a **343px horizontal Product Row** use `h4` **18px / 26px** rather than `h3` 22px / 30px. On a spacious Desktop card, `h3` can be used after a layout review.
4. **Figma Styles:** 12 semantic roles × 2 responsive modes; controls should map to the same token role regardless of page. **Do not use visual H1/H2 sizes to determine semantic HTML heading levels**; choose the HTML heading level from document structure.
5. **Breakpoints:** 375px and 1440px are reference viewports. The existing 1024px desktop breakpoint is a *proposal* and must be validated against Tablet 768–1023; use flexible grids and `minmax(0,1fr)` to avoid overflow.
6. The user must be able to resize text **up to 200%**, and typical vertically scrolling content must reflow at **320 CSS px** without two-dimensional scrolling unless WCAG exceptions apply. All Commerce Components require 320 / 375 / 768 / 1024 / 1440 and zoom QA.

**Example: semantic global CSS**

```css
:root {
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-heavy: 800;
  --type-body-md-size: 1rem;
  --type-body-md-line-height: 1.625rem;
  --type-body-sm-size: .875rem;
  --type-body-sm-line-height: 1.375rem;
  --type-label-size: 1rem;
  --type-label-line-height: 1.5rem;
}
.typo-body-md { font-size: var(--type-body-md-size); line-height: var(--type-body-md-line-height); font-weight: var(--font-weight-regular); }
.typo-body-sm { font-size: var(--type-body-sm-size); line-height: var(--type-body-sm-line-height); font-weight: var(--font-weight-regular); }
.typo-label { font-size: var(--type-label-size); line-height: var(--type-label-line-height); font-weight: var(--font-weight-semibold); }
```


---

## 3. Spatial Rhythm, Radius & Elevation

### 4px Base Grid
- `s-1: 4px` · `s-2: 8px` · `s-3: 12px` · `s-4: 16px` · `s-5: 20px` · `s-6: 24px` · `s-8: 32px` · `s-10: 40px` · `s-12: 48px` · `s-16: 64px` · `s-20: 80px` · `s-24: 96px`

### Standard Radii
- **8px Controls**: `rounded-[8px]` for Buttons, Inputs, Selects, and Quantity Steppers.
- **16px Containers**: `rounded-2xl` (`16px`) for Cards, Modals, and Accordions.
- **Pill Badges & CTAs**: `rounded-full` for chips, status tags, and floating action buttons.

### Elevation Hierarchy
- **Level 0 (Flat)**: Background canvas `#FAFAFC` and surface containers.
- **Level 1 (Hairline)**: Catalog grid items with `border border-[#E6E4EE] shadow-2xs`.
- **Level 2 (Soft Elevation)**: Hover states, active selections, dropdown menus with `shadow-md`.
- **Level 3 (Floating)**: Sticky Buy Bar, bottom drawers, and modal dialogs with `shadow-xl`.

---

## 4. Taiwan Bed Sizes / Product Variation Contract (床墊規格)

**Do not hardcode the same physical dimensions or mattress thickness for every product.** Read actual size labels, dimensions, pricing, and availability from the WooCommerce variant/SKU record or a verified product-specific attribute. Taiwanese traditional size nicknames are *labels*, not a globally reliable dimension mapping.

The current Lunio Sunset Pro public product page documents the following **product-specific examples** (verify live SKUs before publish):

| Traditional label | Example width × length × thickness (Sunset Pro) | Source |
|---|---|---|
| 標準單人 3 尺 | **89 × 188 × 24 cm** | Sunset Pro product page |
| 單人加大 3.5 尺 | **104 × 188 × 24 cm** | Sunset Pro product page |
| 標準雙人 5 尺 | **150 × 188 × 24 cm** | Sunset Pro product page |
| 雙人加大 6 尺 | **180 × 188 × 24 cm** | Sunset Pro product page |
| 雙人特大 7 尺 | **180 × 210 × 24 cm** | Sunset Pro product page |

The source page also notes handmade dimensions may vary approximately ±2 cm. These examples **do not guarantee the dimensions of Gen4, Quantum Max or other bedding**. A product may vary by model, materials, region and manufacturing tolerance.

**Recommended normalized UI product model**: `productId`, `slug`, `brandId`, `title`, `image`, `variationId`, `sizeLabel`, `dimensionsCm?`, `regularPriceMinor`, `salePriceMinor`, `currencyCode`, `stockStatus`, `onSale`, `saleBadge?`, `isDefaultVariation`, `hasGiftBundle?`. Price and product quantities are data, not theme tokens.

**Selection flow:** `unselected → selecting → selected variation → price/stock updated → enabled purchase`. Unavailable variation shows sold-out status and prevents the buy CTA. A variable product card with no selected variation displays a correctly labeled **price range or from-price**, not a made-up amount. Test screen-reader announcements of variation availability and price changes.

---

## 5. Core E-Commerce UI Components

### Buttons
- **Primary**: Scoped brand fill with tested semantic foreground (`bg-primary text-primary-foreground`, **NOT** `text-white` across brands). Use mobile `min-h-11`, not fixed height; must support 200% text resizing and long Chinese labels.
- **Outline**: 1px semantic border and `color/interactive-text` foreground with readable hover/focus states; Sunset outline text must be dark enough on white.
- **Pill Variant**: `rounded-full` with tokenized 24px horizontal padding (`px-6`). Badge dimensions are proposal values unless explicitly approved.


### Product Card and Size Selector
- **Mobile Product Row:** horizontal image + content with `h4` (18/26) for the name; data-driven `price-md`, stock and variant state. Do not set an inflexible card height that clips the full product name; provide a path to all important details on PDP.
- **Size Selector:** states are `Default`, `Selected`, `Disabled`, `Sold Out`; minimum 44px touch target; should implement one actual choice pattern (native `<select>`, accessible radio group or Radix selection controls) rather than clickable unsemantic `div` elements. The Figma library contains a four-variant example under `Lunio DS / Size Selector — DESIGN.md v1.2`.
- **Form errors:** visible text adjacent to the field, plus `aria-invalid`/`aria-describedby`; border color alone does not convey an error. Include Focus, Error, Disabled and Loading/Saving behavior in frontend QA.
- **PriceBlock:** distinguish `regular`, `sale`, `from/range`, `selected variation`, `sold out` and `bundle` representations. Display a clear size basis. Crossed-out prices must come from actual commerce data.
- **Promotion & gift items:** WooCommerce cart can contain free gifts and bundle components; style `free`, `discounted`, and `included` amounts distinctly and validate cart arithmetic.

### Select Dropdown
- Custom uncrowded chevron (`right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground`).
- Standard 8px radius (`rounded-[8px]`), padding `pl-3.5 pr-10 py-2.5`, height 44px (`h-11`).

### Quantity Stepper
- 44×44px touch targets on decrement (`-`) and increment (`+`) buttons.
- Accessible live region output (`aria-live="polite"`).

### Sticky Mobile Buy Bar
- Fixed to viewport bottom (`fixed bottom-0 inset-x-0 z-40`).
- Safe-area inset support (`padding-bottom: calc(16px + env(safe-area-inset-bottom))` or another approved additive spacing token). Do not use safe-area inset **alone** as the entire vertical padding.
- Real-time selected-variation price summary and clearly labeled CTA. Do not cover product content; reserve bottom padding for page content, and test mobile browser bars/keyboard and cart state.


### Mobile Mega Menu · 375px
- Typical content width at 375px with 16px left and right padding is **343px**. Four 80px tabs plus three 8px gaps consume **344px**, creating overflow even before borders. Prefer CSS Grid `grid-template-columns: repeat(4, minmax(0, 1fr))` with `gap: 8px` (roughly **79.75px per tab at 375px**), and test a 320px viewport as well.
- `Hamburger → 床墊 → Product list` is a two-tap discovery path. The brand/type filters (`全部`, `Lunio`, `Nooz`, `薄床墊`) update the visible group in the **same drawer**; only choosing a product navigates to the PDP.
- Distinguish **Brand** from **Product Type** in product data: Lunio/Nooz versus Thin Mattress. Test Back, Close, empty/loading/error states and keyboard tab order. Sticky header and tabs, with one content scroll container.
- Original source components can remain in the **Source Archive**, but should not be presented as approved WCAG-compliant components; official controls use the new 16/24 Label role and minimum tap targets.

---

## 6. Accessibility & Quality Standards (WCAG 2.2 AA)

- **Contrast Minimum (1.4.3)**: Normal text requires at least 4.5:1; large text at least 3:1. This applies to the text/background color pairing, including CTA labels. Documented exceptions must use accessible foreground tokens.
- **Focus Visible (2.4.7)**: Keyboard navigation must display clear `focus-visible:ring-2` with `ring-offset-2`.
- **Target Size (2.5.8)**: WCAG 2.2 AA normative target is **24×24 CSS px or a permitted exception**. Lunio adopts an intentionally **stricter internal guideline of 44×44px** for common mobile tap targets.
- **Reflow (1.4.10)**: Content should reflow at **320 CSS px** without requiring two-dimensional scrolling, subject to WCAG exceptions. Also test **Resize Text 200% (1.4.4)**, Text Spacing (1.4.12), labels, semantics, keyboard and focus visibility.


### Accessibility and Senior UX Acceptance Tests

| Scope | Acceptance criterion | Test method |
|---|---|---|
| Global typography | MiSansTC Regular, Medium, Semibold, Bold and Heavy load correctly; CSS uses one token ramp | Browser DevTools rendered fonts at 375/1440 |
| 375 Mobile | Normal product descriptions readable, CTA/size labels 16px by internal standard, no clipped prices | Browser screenshot and text zoom |
| 320 Reflow | No unnecessary horizontal scroll; filter tabs use fluid widths | Chrome responsive test at 320 CSS px |
| Semantic form fields | Every field has a visible label; errors are textual and exposed to assistive tech | Tab/Shift+Tab and VoiceOver/NVDA |
| Brand contrast | Actual text/background pairs pass 4.5:1 normal / 3:1 large (or applicable exceptions) | WCAG contrast checker + manual overlays |
| PDP variations | Changing SKU updates dimensions, price, stock, cart state, sticky bar | E2E tests with WooCommerce backend |
| Cart / Checkout | Discounted and gift lines, shipping and totals remain accurate; payment errors can be recovered | E2E integration regression |

Accessibility evaluation must include keyboard, screen reader, text resizing, real DOM semantics and contrast over actual content. Figma-only checks cannot establish WCAG 2.2 AA conformance.

---

## 7. Developer CLI Commands

```bash
# Build token artifacts (tokens.css, DTCG JSON, Typography CSV)
npm run tokens:build

# Validate token contrast ratios
npm run tokens:check

# Run TypeScript compilation
npm run typecheck

# Production Next.js build
npm run build
```

---

## 8. Version History

### v1.1 — 2026-10-15 · MiSansTC Font Weight Foundation
- Added the five shared font weights **Regular 400, Medium 500, Semibold 600, Bold 700, Heavy 800** and their corresponding Figma variables and web mappings.
- Bound the 12 typography-role weight variables to the five shared weight primitives, retaining the responsive Mobile 375 and Desktop 1440 modes.
- Mapped all 24 Text Styles to the semantic roles; H4 uses the exact explicit Semibold face while its role variable remains aliased to 600. Added five-weight specimens to both Typography documentation pages.
- Corrected `h4` from a previous Figma value of 500 to **600 Semibold**, matching the approved H4 role in the original DESIGN.md.
- **No changes** to previously approved font sizes, line heights, palettes, spacing, product specifications or frontend behavior.
- Production handoff: update the token generator and local font files, validate renderings and run accessibility regression checks before releasing.


### v1.2 — 2026-10-15 · Senior Frontend & UX/UI Review
- **Typography readability (Figma updated):** Mobile Body-MD 16/26, Body-SM 14/22, Label 16/24, Caption 12/18; Desktop Label 16/24 and Caption 13/20. Kept Display/Headings/Prices unchanged. Corrected H4 Figma face to MiSans TC Semibold with semantic `600` variable alias (Figma face binding workaround).
- **Color audit (docs corrected):** recalculated the contrast pairs and documented inaccessible white-on-Sunset and white-on-Helix-accent combinations with safe semantic foreground decisions.
- **Commerce anatomy (Figma updated):** compact ProductCard now uses Mobile H4 and a verified source mattress image, plus a newly created four-state `Size Selector` component. The system requires variation-driven dimensions and pricing.
- **Mega Menu:** fluid 4-column filters, minimum mobile tap area 44px, one scrolling content panel; avoid the 344px filter row overflow inside 343px content width.
- **Documentation:** updated 00/07/08/09 with review notes, Commerce and Accessibility acceptance gates. No production code was changed from Figma alone.
- **Open sign-offs:** Lunio Bedding CI approved (#1C46B4); provisional status colors, safe-area behavior, WooCommerce gift bundles, typography cache, shipping and payment details.

---

## 9. Frontend Implementation Contract (Next.js + shadcn/ui)

### 9.1 Source-of-truth architecture
- **Figma:** approved visual specs, brand modes, text styles, component anatomy and interaction examples.
- **Shared Token Package:** versioned JSON source converted into CSS/custom properties, and consumed by **both** the design-system Docs app and the live Next.js storefront. **Avoid copying independent global CSS files.**
- **WordPress / WooCommerce:** dynamic product IDs, SKUs, variation dimensions, public descriptions, price in minor units, discounts, stock, shipping, order and payment information.
- **Next.js storefront:** accessible semantic HTML, responsive layouts, media, tokenized component styles, data adapters, cart, checkout and interaction states.

### 9.2 Critical gap in the existing starter package

The earlier `lunio-design-system-platform.zip` remains tagged **v0.1.0** and uses older typography values (e.g. Display Mobile 32/42, Desktop 56/68, weight700), which **do not match the updated Figma v1.2 definitions**. A build of that starter is **not proof** that the storefront has adopted this new spec.

**Required before live adoption:** update `packages/tokens/src/tokens.json`, regenerate outputs, review `@theme inline` mappings with existing shadcn/ui variables, and verify `npm run tokens:check` / typecheck / build. Brand color values must be kept in sync with signed-off `DESIGN.md` values, and class variants should map to those same tokens.

### 9.3 Recommended role usage by commerce UI

| Context | Mobile 375 | Desktop 1440 | Notes |
|---|---|---|---|
| Main Hero | `display` 40/48 Heavy | `display` 48/56 Heavy | Keep actual text reflow and contrast over images |
| PDP Product Name | `h1` 32/40 Bold when space allows; use a smaller visual style by context | `h1` 40/48 Bold | Do not alter HTML heading semantics based on font size |
| Product Row Title | `h4` 18/26 Semibold | `h4` 20/28 (or context-approved H3 grid) | Narrow two-column row must accommodate Traditional Chinese wrapping |
| Body Description | `body-md` 16/26 Regular | `body-md` 16/26 Regular | Important feature and sizing content uses Body MD |
| Form labels/CTA | `label` 16/24 Semibold | `label` 16/24 Semibold | `min-height:44px` touch targets on mobile |
| Secondary Details | `body-sm` 14/22 Regular | `body-sm` 14/22 Regular | Keep legible even when data is dynamic |
| Primary PDP Price | `price-xl` 26/32 Heavy | `price-xl` 32/38 Heavy | Show selected-variation price; real data only |
| PLP / Card Price | `price-md` 20/26 Bold | `price-md` 24/30 Bold | Can show from-price or full range with basis |

### 9.4 Minimal UI component contracts

**Button**: Props `variant`, `size`, `loading`, `disabled`, `children`, `aria-label`; supports semantic `--primary-foreground`, visible focus and adequate label size. If product is sold out, disable purchase but keep details readable.

**ProductCard**: Receives fully normalized Product View Model; exposes `productHref`, product image, title, brand, price mode and stock status; link click routes to PDP. Never format price in a component with a hardcoded currency/price.

**SizeSelector**: Receives variation options, selected option, price and availability; Keyboard Arrow/Enter/Space support depends on actual chosen radio/select primitive. Changing option updates all relevant visible and announced fields.

**PDPStickyBar**: Reads the same selected variation state as the main PDP form; CTA cannot disagree with the main Add-to-cart button. Uses additive safe-area padding `calc(var(--space-4) + env(safe-area-inset-bottom))`, avoids covering content and handles mobile keyboard.

**MegaMenu**: Accessible Sheet/Dialog semantics, focus management, Esc close, single internal scroll container, filter tabs not changing URL, and 320/375px reflow. Keep Brand and Type data fields separate.

### 9.5 Suggested CI/PR gate

1. `npm run tokens:build` and token snapshot test; reject silent changes to generated CSS.
2. TypeScript typecheck/build; lint for new arbitrary font sizes (`text-[Npx]`, inline `fontSize`) outside exceptions.
3. Automated screenshots at 375 / 768 / 1440 and horizontal overflow check at 320px.
4. Keyboard and screen-reader audit of Form Error, Button Focus, Size Selector and Mega Menu.
5. WooCommerce E2E cart and checkout regression on known simple/variable product fixtures, plus bundle/free gift scenario.
6. Brand Owner + Design Lead sign-off for new primitive colors, type roles or component contracts; pin token package version.

---

## 10. Senior Review Findings and Release Status

| ID | Priority | Finding | Correction / Decision | Status |
|---|---|---|---|---|
| UX-01 | P0 | 13px mobile label/Body-SM and 11px caption are too small for key shopping UI | Raised Label 16/24, Body SM 14/22, Body MD 16/26; caption reserved for nonessential | Figma done / Frontend pending |
| DS-02 | P0 | H4 role aliases 600 but Figma text face displayed Bold | H4 set explicitly to MiSans TC Semibold; role primitive remains 600 | Figma done / Figma limitation documented |
| DS-03 | P0 | Earlier Docs Starter code uses v0.1 tokens distinct from Figma v1.2 | Update token JSON and regenerate CSS for code consumers | Pending code migration |
| A11Y-04 | P0 | Documented contrast ratios were incorrect for Helix Accent and Sunset Primary | Corrected calculation and safe semantic foreground specifications | Figma/docs corrected; browser QA pending |
| DATA-05 | P0 | Hardcoded dimensions (e.g. 90/105cm) disagree with product pages (89/104cm) | Use selected WooCommerce SKU dimensions with explicit example scope | Figma/docs corrected; API contract pending |
| UX-06 | P1 | Four 80px tabs plus 8px gaps overflow 343px content by 1px | Adopt responsive 4-column minmax grid, 44px tall targets | Figma docs; Next.js QA pending |
| UX-07 | P1 | Product Row title H3 is oversized for compact 375 layout | Mapped narrow Product Card to H4 18/26 | Figma done / visual QA pending |
| COMP-08 | P1 | Approved Size Selector lacked selected/disabled/sold-out variants | Created four-state Figma Component Set | Figma done / code pending |
| A11Y-09 | P1 | Form error color/focus alone is insufficient | Specify textual errors, semantics and focus acceptance | Documentation done / component/browser audit pending |
| COMP-10 | P1 | Sticky PDP Bar might cover content or mismatch selected price | Shared variation state + additive safe-area padding + content offset | Documentation done / integration pending |
| BRAND-11 | P2 | Lunio Bedding CI set to Lunio TW primary (#1C46B4) | Official bedding brand palette signed off; status colors remain provisional | Signed off |
| QA-12 | P2 | No verified live Visual Regression, WCAG or payment-gateway tests | Establish baseline, automation and manual QA before release | Pending |

**Release status:** `DESIGN SYSTEM v1.2 — FIGMA REVIEWED, NOT PRODUCTION CERTIFIED`. A local Figma screenshot and CSS tokens are not evidence of a deployed accessible website. Validate in browser with realistic Traditional Chinese content and WooCommerce data.

### References
- [Lunio shop](https://lunio.com.tw/shop/)
- [Lunio Quantum Max PDP](https://lunio.com.tw/product/lunio-quantum/)
- [Lunio Nooz Sunset PDP](https://lunio.com.tw/product/nooz-sunset/)
- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C Resize Text](https://www.w3.org/WAI/WCAG21/Understanding/resize-text)
- [W3C Reflow](https://www.w3.org/WAI/WCAG21/Understanding/reflow)


---

## UI Implementation Addendum — shadcn/ui + Radix (v1.3, 2026-10-15)

The approved UI implementation foundation is **shadcn/ui with Radix primitives** (source-owned in `components/ui/`), Tailwind CSS v4, Lucide icons, and Lunio Multi-brand Semantic CSS Tokens. This supersedes any former "shadcn-style" examples. UI source remains editable; preserve Radix accessibility contracts.

- Core components: Button, Input, Card, Tabs, Select, Label, Dialog, Sheet, Command, Badge, Checkbox, Separator, Skeleton, Textarea, Popover and Scroll Area.
- Lunio-specific variants: Pill Button, Success Badge, Semantic Brand Scoping and responsive Typography Roles.
- Commerce compositions: ProductCard, SizeSelector, QuantityStepper, PDPStickyBar and MobileMegaMenu. Components do not create fake prices, inventory or SKUs; connect WooCommerce through a data adapter.
- Radix portals (Dialog, Select, Sheet) inherit active brand from the root `data-brand`; nested scoped cards must pass their theme to portal containers when necessary.
- Preserve MiSansTC Regular 400, Medium 500, Semibold 600, Bold 700 and Heavy 800. Mobile 375 and Desktop 1440 typography tokens are unchanged by this UI-library adoption.
- WCAG: Normal Text Contrast >=4.5:1, 200% text resize, 320px reflow, visible keyboard focus. Not automatic certification.
- Engineering acceptance: `npm run tokens:check`, `npm run shadcn:check`, `npm run typecheck`, `npm run build` and manual commerce/accessibility tests.

See `docs/SHADCN_IMPLEMENTATION_TH.md` for the full implementation map.
