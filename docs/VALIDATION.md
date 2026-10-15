# Validation · Lunio Design System v1.3

**Status:** Source code integration finished; not production certified.

## Verified
- `npm run tokens:build`: SUCCESS, generated CSS for four themes / 12 typography roles.
- `npm run tokens:check`: 7/7 PASS.
- `npm run shadcn:check`: 6/6 PASS.
- Node syntax parsing of 37 TypeScript/TSX files: zero errors.
- No native `<button>` or `<select>` remains in Showcase, Docs Shell, Docs Content and Brand Switcher.
- Radix UI sources / package dependencies / components.json have been mapped in static contract tests.

## Limitations
- The environment could not resolve registry.npmjs.org (`EAI_AGAIN`). `npm install`, full `tsc --noEmit`, `next build` and browser rendering remain unverified.
- Full `tsc` without installed packages yields missing modules (`next`, `react`, Radix, `lucide-react` etc.). These errors cannot certify or disprove code typing. Install dependencies then rerun.
- MiSansTC font files are not supplied. A fallback font will render until licensed files are added to `public/fonts`.
- Automated token contrast tests are not equivalent to a complete WCAG 2.2 AA audit.

## Required local commands
```bash
npm install
npm run tokens:build
npm run tokens:check
npm run shadcn:check
npm run typecheck
npm run build
npm run dev
```

## Manual QA
1. Open http://localhost:3001 at widths 375px and 1440px.
2. Verify typography and brand switching for Lunio, Helix, Sunset, Lunio Bedding.
3. Press Cmd/Ctrl+K for Docs Search; verify arrow-key navigation and Escape.
4. On mobile open Sheet Navigation and Commerce Mega Menu, check focus lock, close and scroll.
5. Open every Select with keyboard; test Option selection and outside click.
6. Test keyboard focus, high zoom 200%, 320 CSS px reflow, contrast for each brand.
7. Import real MiSansTC files, compare screenshots to approved Figma text styles.
8. Before storefront integration, run WooCommerce cart, variation, inventory, shipping, tax and payment regression.
