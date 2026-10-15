# คู่มือใช้งาน Lunio Design System — ภาษาไทย

## 1. โปรเจกต์นี้คืออะไร

สร้าง Next.js Project ใหม่โดยดูโครงสร้างหน้าจาก getdesign.md/hp/design-md: หน้า Showcase ภายนอกสีเข้ม, การ์ด Usage, ส่วน Preview พื้นขาว, และหน้า Documentation แยกเป็นหมวดหมู่ที่ค้นหาได้ แทนสี ฟอนต์ และ UI ด้วย Lunio DESIGN.md v1.3 โดยไม่ใช้แบรนด์ HP

## 2. เริ่มต้นบน Mac

```bash
cd lunio-design-system-nextjs
npm install
npm run tokens:build
npm run tokens:check
npm run dev
```

ไปที่ http://localhost:3001 และคลิก Documentation หรือทดลองเปลี่ยนแบรนด์ที่แถบด้านบน

## 3. ใส่ MiSansTC ให้ตรง Figma

จัดหา WOFF2 ที่มีสิทธิ์ใช้งานของบริษัท 5 ไฟล์ (Regular / Medium / Semibold / Bold / Heavy) แล้ววางใน `public/fonts` ตาม `public/fonts/README.md` ระบบเตรียม CSS `@font-face` ไว้แล้ว หากยังไม่มีไฟล์ จะใช้ System Fallback และ **ยังไม่สามารถเคลมว่า Typography ตรง Figma 100% ได้**

## 4. แก้ Figma-to-Code Design Tokens

- เปิด `DESIGN.md` เป็นสเปกเชิงนโยบายและการใช้
- แก้ JSON ที่ `src/design-system/tokens.json`
- รัน `npm run tokens:build` สร้าง `src/styles/generated-tokens.css`
- รัน `npm run tokens:check` ตรวจจำนวน role, font weights, spacing และ Contrast
- `components/ui/button.tsx` และ Component เดียวกันจะใช้สีผ่าน `bg-primary`/`text-primary-foreground` ซึ่งเปลี่ยนตาม Brand Mode

> Nooz Sunset สีส้มไม่ใช้ตัวอักษรสีขาวใน Primary CTA; เฉพาะ Semantic Token `onPrimary` สีเข้มเท่านั้น

## 5. สลับแบรนด์

ใช้ Brand Switcher: Lunio / Nooz Helix / Nooz Sunset / Hypercool Bedding (Hypercool เป็น draft pending CI) ทุกแบรนด์ใช้ MiSansTC 5 น้ำหนักชุดเดียว ไม่มีการสร้างฟอนต์คนละชุด

## 6. อะไรใช้งานได้จริง / อะไรเป็นตัวอย่าง

ใช้งานได้ภายในเว็บ Docs หลัง npm install: Brand Switcher, ค้นหา Section ผ่าน ⌘K, Toggle mobile/desktop, Typography Playground, Copy Token/Class, Quantity Stepper Demo, Size Selector Demo, Mega Menu Demo และหน้าเอกสาร Markdown

เป็นตัวอย่าง UI ยังไม่เชื่อมจริง: Cart/Checkout/Prices, WordPress/WooCommerce API, Figma Code Connect. ไม่มีข้อมูลราคาสมมติใน Production ProductCard

## 7. ส่งให้ทีม Developer ใช้งาน

ตั้งกฎใน `AGENTS.md`: ใช้ DESIGN.md + semantic tokens เท่านั้น ห้าม hard-code font sizes คนละหน้า ทำ PR พร้อม screenshot Mobile 375, Desktop 1440 ทดสอบ Reflow 320px และ 200% Text Resize หลังเชื่อม Checkout ต้องทำ Commerce Regression ด้วย

## 8. ก่อน Deploy

```bash
npm run tokens:check
npm run typecheck
npm run build
```

ให้ QA ตรวจผ่านจริงแล้ว Deploy Next.js Docs ไป Hosting/Vercel แยกจาก WordPress API อย่าเปิด Internal Design Docs ให้สาธารณะโดยไม่มี Authentication หากบริษัทต้องการเก็บเอกสารภายใน


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
