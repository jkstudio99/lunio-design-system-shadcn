# MiSansTC font files (not included)

Place licensed webfonts here if your company permits web embedding:

- MiSansTC-Regular.woff2 (400)
- MiSansTC-Medium.woff2 (500)
- MiSansTC-Semibold.woff2 (600)
- MiSansTC-Bold.woff2 (700)
- MiSansTC-Heavy.woff2 (800)

`app/globals.css` defines @font-face rules for these files; browsers use their system fallback until added. No font files are distributed with this starter.

For production, convert to Next.js `next/font/local` after the files are present; do not reference missing localFont paths during builds.
