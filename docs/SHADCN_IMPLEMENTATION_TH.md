# Lunio Design System — shadcn/ui Migration Guide (v1.3)

## สถานะและเป้าหมาย

เวอร์ชัน 1.3 นำโครงสร้าง **shadcn/ui ที่เป็น Source-owned Components ใช้ Radix UI primitives** มาทดแทน Button/Input/Card/Tabs ที่เคยสร้างเอง และแทน native Select + manual Dialog + manual Sheet ด้วย Components ที่มี keyboard/focus behavior จาก Radix. ทุก UI ใช้ **MiSansTC 5 weights**, Lunio semantic CSS variables และ multi-brand modes เดิม.

> หมายเหตุ: shadcn/ui ไม่ใช่ไลบรารีที่ import จาก `shadcn/ui` ใน Runtime แต่เป็น Component source code ที่ติดตั้ง/บริหารอยู่ใน `components/ui/` พร้อม dependencies ตาม Component จริง. ชุดโค้ดที่ให้เป็นการนำ source มาไว้ใน repo ตามสถาปัตยกรรมนี้; ไม่ได้อ้างว่ารัน CLI ติดตั้งสำเร็จในสภาพแวดล้อมที่เชื่อม npm ไม่ได้.

## Stack

| Layer | Implementation |
|---|---|
| Application | Next.js 16 App Router, React 19, TypeScript |
| UI Component architecture | **shadcn/ui, New York style, Radix UI** |
| Tailwind | Tailwind CSS v4, semantic custom properties |
| Icons | lucide-react |
| Component Variants | class-variance-authority + tailwind-merge |
| Command palette | cmdk + shadcn Dialog |
| Brand and foundation tokens | `src/design-system/tokens.json` → generated CSS |
| Font | MiSansTC, weights 400/500/600/700/800 (files supplied by client) |
| Data | Docs prototypes only; WooCommerce Store API in real storefront |

## Step 1 — ติดตั้งและรัน

ต้องมี Node.js เวอร์ชันที่ Next.js 16 รองรับ และเปิดการเข้าถึง npm Registry ได้:

```bash
cd lunio-design-system-shadcn
npm install
npm run tokens:build
npm run tokens:check
npm run shadcn:check
npm run typecheck
npm run build
npm run dev
```

เปิด `http://localhost:3001`. ถ้า dependency ติดตั้งแล้ว สามารถใช้ `npm run ui:add -- accordion` หรือ `npx shadcn@latest add accordion` เพื่อเพิ่ม component จาก Registry ตามปกติ ตรวจ diff ก่อนรับ overwrite เพราะ Brand Variants ของเราอยู่ใน source code.

## Step 2 — Component Library

| shadcn source component | File | Library primitive / function |
|---|---|---|
| Button (default/outline/secondary/ghost/link/pill/destructive) | `components/ui/button.tsx` | Radix Slot + CVA |
| Input | `components/ui/input.tsx` | Native input styled to shadcn patterns |
| Card (Header/Title/Description/Content/Footer) | `components/ui/card.tsx` | shadcn slots |
| Tabs | `components/ui/tabs.tsx` | Radix Tabs |
| Select | `components/ui/select.tsx` | Radix Select with portal, keyboard navigation |
| Label | `components/ui/label.tsx` | Radix Label |
| Sheet | `components/ui/sheet.tsx` | Radix Dialog semantics |
| Dialog | `components/ui/dialog.tsx` | Radix Dialog, modal focus control |
| Command | `components/ui/command.tsx` | cmdk for search |
| Badge | `components/ui/badge.tsx` | CVA + brand variants |
| Checkbox | `components/ui/checkbox.tsx` | Radix Checkbox |
| Separator | `components/ui/separator.tsx` | Radix Separator |
| Scroll Area | `components/ui/scroll-area.tsx` | Radix ScrollArea |
| Popover | `components/ui/popover.tsx` | Radix Popover |
| Skeleton | `components/ui/skeleton.tsx` | shadcn structure |
| Textarea | `components/ui/textarea.tsx` | shadcn structure |

> `Pill` เป็น **Lunio-specific extension** ของ Button ที่ยังใช้โครงสร้าง shadcn/ui และ shared tokens ไม่ใช่ Registry variant มาตรฐาน. `Badge success` ก็เป็น extension ของ Lunio.

## Step 3 — ตัวอย่างการใช้งาน

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

export function ProductInquiry() {
  return <div className="space-y-4">
    <div><Label htmlFor="customer">姓名</Label><Input id="customer" placeholder="請輸入姓名" /></div>
    <Select defaultValue="5">
      <SelectTrigger aria-label="床墊尺寸"><SelectValue /></SelectTrigger>
      <SelectContent><SelectItem value="3">3 尺</SelectItem><SelectItem value="5">5 尺</SelectItem></SelectContent>
    </Select>
    <Button>立即選購</Button>
  </div>
}
```

## Step 4 — Multi-brand scope และ Portal

ให้ตั้งแบรนด์ผ่าน `BrandProvider`. `document.documentElement.dataset.brand` ทำให้ Dropdown/Menu/Dialog ที่ Radix render ไปที่ `<body>` ด้วย Portal **ยังได้รับ Theme เดียวกับที่เลือกอยู่**. ภายในหน้าเอกสารยังวาง Component ที่ `data-brand="helix"` หรือ `sunset` แยกกันได้; หาก component นั้นมี portal ต้องส่ง Brand mode ไปยัง Portal Container แยกกรณีแบรนด์เฉพาะการ์ดในหน้าเดียว.

| Brand | Primary | Foreground on primary |
|---|---|---|
| Lunio | `#1C46B4` | White |
| Nooz Helix | `#7347AE` | White |
| Nooz Sunset | `#F28131` | `#1C1526` |
| Lunio Bedding | `#1C46B4` | White |

ข้อควรระวัง: `Nooz Sunset` บนปุ่มสีส้มต้องไม่ใช้ข้อความสีขาว. `--interactive-text` สำหรับ Sunset บนพื้นขาวเป็นสีเข้มเพื่อให้ผ่าน Contrast.

## Step 5 — Commerce Patterns (Source-owned reusable components)

- `components/commerce/product-card.tsx`: รับ `CommerceProductSummary` จาก WooCommerce Adapter (ไม่มี Hardcoded ราคา)
- `components/commerce/size-selector.tsx`: รับ `options`, `selected`, `onSelect`; รองรับ Disabled/Sold Out; ใช้ shadcn Button
- `components/commerce/quantity-stepper.tsx`: รับ `value`, `onChange`, `min/max`; ใช้ shadcn Button และ Live Region
- `components/commerce/pdp-sticky-bar.tsx`: รับ real price, availability, variation, add-to-cart callback; Demo mode ปิดการซื้อ
- `components/commerce/mobile-mega-menu.tsx`: ใช้ shadcn Sheet + Tabs; Demo ไม่ดึง WooCommerce API จนกว่าเชื่อมกับ Storefront

**ห้ามใช้ค่าราคาใน Figma เป็นราคา Live**; ราคาจริงต้องมาจาก WooCommerce. สำหรับ Product Card/Size Variation ให้ใช้ Server-side Adapter ที่แยก Data และ UI.

## Step 6 — Accessibility Testing

1. เปิด Dialog/Search ด้วย `⌘K` หรือ `Ctrl+K`. เลือกด้วย Keyboard; Esc ปิด Dialog.
2. เปิด Sheet เมนูบนมือถือด้วย Tab/Enter; ตรวจ Focus Trap, Escape-to-close และ Body Scroll Lock.
3. เปิด Select และนำทางด้วยปุ่มลูกศร/Enter; ตรวจ Aria Label / Focus Visible.
4. ตรวจ Brand Switcher ทุกธีม; Dropdown แสดงสีและตัวอักษรถูกต้อง.
5. ทดสอบ 375px, 1440px, 320px Reflow; ขยายข้อความ 200%; ทดสอบ Safari iOS และ Chrome.
6. ตรวจ Normal Text Contrast ≥ 4.5:1 ในทุก state โดยเฉพาะ Sunset Orange; QA ไม่อาจสรุปจาก automated tests เพียงอย่างเดียว.
7. เมื่อ Integrate กับ WooCommerce ต้อง Regression Cart, Variation, Inventory, Discounts, Shipping, Tax, Payment.

## Step 7 — Engineering Governance

- ห้ามสร้าง `<button>` / `<select>` manual ใน Feature Page หากมี UI primitive ของ shadcn/ui ครอบคลุม use case อยู่แล้ว (ยกเว้น native semantic elements ที่จำเป็นและได้รับอนุมัติ).
- เพิ่ม `npm run shadcn:check` ใน CI เพื่อป้องกันการย้อนกลับไปใช้ custom primitive.
- อนุมัติปรับขนาดฟอนต์ผ่าน `tokens.json`; ห้ามใช้ arbitrary classes ใหม่ใน Commerce Components.
- เนื่องจากเป็นโปรเจกต์ที่ใช้ Source-owned Components, คุณสามารถแก้ style ของ shadcn ได้เอง แต่ต้องรักษา Radix behavior และ Event/Ref forwarding contract.
- ตรวจ diff ของ `npx shadcn@latest add` และห้าม overwrite `button.tsx` ที่ผูก Brand Semantic Tokens โดยไม่ทำ Review.

## Build and QA status

ตรวจผ่านในสภาพแวดล้อมสร้างไฟล์: `node --test`, Token Builder/Checker, Syntax Parse ของ TS/TSX และ Source/Usage Contract Tests.

ยังไม่ได้ยืนยัน: `npm install`, full TypeScript Typecheck, Next.js Production Build, visual/browser accessibility QA เพราะ npm Registry ติดต่อไม่ได้ในสภาพแวดล้อมนี้. ให้ทีมรันทุกคำสั่งใน Step 1 อีกครั้งก่อน deploy.

Official shadcn docs: https://ui.shadcn.com/docs/installation/next · https://ui.shadcn.com/docs/theming
