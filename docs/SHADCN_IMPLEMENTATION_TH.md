# Lunio Design System — shadcn/ui Migration & Implementation Guide (v1.4.1)

## สถานะและเป้าหมาย

เวอร์ชัน **v1.4.1** ขยายขอบเขต **shadcn/ui Source-owned Components (New York style) บน Radix UI Primitives** ให้ครอบคลุมทุกการมีปฏิสัมพันธ์ (Interaction) และแพทเทิร์น E-Commerce ของตลาดที่นอนในไต้หวัน โดยมี 22 Primitives พร้อมทั้ง 19 Commerce Compositions ครอบคลุม 5 แบรนด์ (Lunio, Helix, Sunset, Bedding, Lunio Life) ทุกคอมโพเนนต์ยึดถือ:
1. **MiSansTC 5 Weights** (`400`, `500`, `600`, `700`, `800`)
2. **Lunio Semantic CSS Variables** สำหรับ 5 แบรนด์ (Lunio, Nooz Helix, Nooz Sunset, Lunio Bedding, Lunio Life)
3. **WCAG 2.2 AA Contrast & Accessibility** (ขั้นต่ำ 4.5:1 สำหรับ Normal Text และ 3:1 สำหรับ Large Text)
4. **4px Spatial Rhythm** และมาตรฐานรัศมี (Control: 8px, Container: 16px, Pill: 9999px)
5. **No Raw HTML Buttons/Selects** ในหน้า Live Page

---

## Stack เทคโนโลยี

| Layer | Implementation |
|---|---|
| Application | Next.js 16 App Router (Turbopack SSG), React 19, TypeScript |
| UI Component Architecture | **shadcn/ui (New York style), Radix UI primitives** |
| Carousel Engine | **embla-carousel-react** |
| Command Palette | **cmdk** + shadcn Dialog |
| Styling & Theme | Tailwind CSS v4, semantic CSS custom properties |
| Icons | lucide-react |
| Variants Management | class-variance-authority + clsx + tailwind-merge |
| Token Source | `src/design-system/tokens.json` → `src/styles/generated-tokens.css` |
| Font Stack | MiSansTC (Regular, Medium, Semibold, Bold, Heavy) |

---

## Step 1 — คำสั่งรันและตรวจสอบ (Quality Gates)

```bash
# ติดตั้ง dependencies
npm install

# คอมไพล์ CSS Variables จาก tokens.json
npm run tokens:build

# ตรวจสอบ contrast, brand themes, 5 weights, 4px grid (7/7 tests)
npm run tokens:check

# ตรวจสอบ shadcn data-slot contracts, Radix dependencies, no-raw-button (6/6 tests)
npm run shadcn:check

# ตรวจสอบ TypeScript Types ทั่วทั้งโปรเจกต์
npm run typecheck

# ตรวจสอบรวมทุกอย่าง
npm run check

# Next.js Turbopack Production Build (15 Static Routes)
npm run build

# รัน Local Development Server (Port 3001)
npm run dev
```

เปิดทดสอบที่ `http://localhost:3001`

---

## Step 2 — รายการคอมโพเนนต์ Primitives (20+ UI Components)

| shadcn Source Component | ที่ตั้งไฟล์ | Library Primitive / Core Contract | สัญญาลักษณะ (Contract) |
|---|---|---|---|
| **Button** | `components/ui/button.tsx` | `@radix-ui/react-slot` + CVA | `data-slot="button"`, variants: default, outline, pill, secondary, ghost, link, destructive |
| **Input** | `components/ui/input.tsx` | HTML Input Styled | `data-slot="input"`, 44px min-height, focus ring |
| **Card** | `components/ui/card.tsx` | Composite Container | `data-slot="card"`, `card-header`, `card-title`, `card-description`, `card-content`, `card-footer` |
| **Tabs** | `components/ui/tabs.tsx` | `@radix-ui/react-tabs` | `data-slot="tabs"`, `tabs-list`, `tabs-trigger`, `tabs-content` |
| **Badge** | `components/ui/badge.tsx` | CVA + Brand Variants | `data-slot="badge"`, default, outline, secondary, destructive, success |
| **Label** | `components/ui/label.tsx` | `@radix-ui/react-label` | `data-slot="label"`, ผูก `htmlFor` กับ Input อย่างถูกต้อง |
| **Separator** | `components/ui/separator.tsx` | `@radix-ui/react-separator` | `data-slot="separator"`, เส้นแบ่งแนวนอน/แนวตั้ง |
| **Skeleton** | `components/ui/skeleton.tsx` | CSS Pulse Placeholder | `data-slot="skeleton"`, `aria-hidden="true"`, ป้องกัน Layout Shift |
| **Textarea** | `components/ui/textarea.tsx` | HTML Textarea Styled | `data-slot="textarea"`, รับข้อคิดเห็นหลายบรรทัด |
| **Select** | `components/ui/select.tsx` | `@radix-ui/react-select` | `data-slot="select"`, `select-trigger`, `select-content`, `select-item` |
| **Dialog** | `components/ui/dialog.tsx` | `@radix-ui/react-dialog` | `data-slot="dialog"`, modal focus trap, Esc to close |
| **Sheet** | `components/ui/sheet.tsx` | `@radix-ui/react-dialog` | `data-slot="sheet"`, ลิ้นชักเปิดข้าง (Left/Right/Top/Bottom) |
| **Command** | `components/ui/command.tsx` | `cmdk` | `data-slot="command"`, quick search palette (`⌘K`) |
| **Checkbox** | `components/ui/checkbox.tsx` | `@radix-ui/react-checkbox` | `data-slot="checkbox"`, Space toggle, high-contrast indicator |
| **DropdownMenu** | `components/ui/dropdown-menu.tsx` | `@radix-ui/react-dropdown-menu` | `data-slot="dropdown-menu"`, เมนูย่อยและการเลือกธีม |
| **Popover** | `components/ui/popover.tsx` | `@radix-ui/react-popover` | `data-slot="popover"`, หน้าต่างลอยแสดงข้อมูลเสริม |
| **ScrollArea** | `components/ui/scroll-area.tsx` | `@radix-ui/react-scroll-area` | `data-slot="scroll-area"`, แถบเลื่อนปรับแต่งตามธีม |
| **Accordion** | `components/ui/accordion.tsx` | `@radix-ui/react-accordion` | `data-slot="accordion"`, ยืดหดคำถาม/สเปกที่นอน พร้อมแอนิเมชัน |
| **RadioGroup** | `components/ui/radio-group.tsx` | `@radix-ui/react-radio-group` | `data-slot="radio-group"`, การเลือกขนาดที่นอน/ระดับความนุ่มแน่น |
| **Tooltip** | `components/ui/tooltip.tsx` | `@radix-ui/react-tooltip` | `data-slot="tooltip"`, ทูลทิปอธิบายคำศัพท์และขนาดเตียง |
| **Breadcrumb** | `components/ui/breadcrumb.tsx` | `@radix-ui/react-slot` | `data-slot="breadcrumb"`, เส้นทางนำทาง PDP พร้อมการย่อจุดไข่ปลา |
| **Carousel** | `components/ui/carousel.tsx` | `embla-carousel-react` | `data-slot="carousel"`, สไลด์โชว์รูปภาพและจุดบอกตำแหน่ง |

---

## Step 3 — Taiwan E-Commerce Patterns (9 Commerce Components)

| คอมโพเนนต์พาณิชย์ | ที่ตั้งไฟล์ | Primitives ที่ประกอบเข้าด้วยกัน | ฟังก์ชันและการใช้งาน |
|---|---|---|---|
| **ProductCard** | `components/commerce/product-card.tsx` | `Card`, `Badge`, `Button` | แสดงการ์ดสินค้า รองรับรูปภาพ, ป้ายโปรโมชัน, ราคาเริ่มต้น และลิงก์ไปยัง PDP |
| **ProductCardSkeleton** | `components/commerce/product-card.tsx` | `Skeleton`, `Card` | โครงร่างจำลองการโหลดขนาดเท่าการ์ดจริง ป้องกันกระตุกขณะดึง API |
| **SizeSelector** | `components/commerce/size-selector.tsx` | `Button`, `Label` | ปุ่ม Pill สำหรับเลือกขนาดเตียงมาตรฐานไต้หวัน 5 ไซส์ (3, 3.5, 5, 6, 7 尺) มีสถานะ Active, Disabled, Sold Out |
| **QuantityStepper** | `components/commerce/quantity-stepper.tsx` | `Button` | ปุ่มเพิ่ม/ลดจำนวนสินค้า ขนาดสัมผัส 44px และประกาศ `aria-live="polite"` |
| **PDPStickyBar** | `components/commerce/pdp-sticky-bar.tsx` | `Button` | แถบซื้อติดขอบล่างหน้าจอบนมือถือ คำนวณ `env(safe-area-inset-bottom)` |
| **MobileMegaMenu** | `components/commerce/mobile-mega-menu.tsx` | `Sheet`, `Tabs`, `Button` | ลิ้นชักเมนูบนมือถือพร้อมแท็บกรอง 4 แบรนด์ (Lunio, Helix, Sunset, Bedding) |
| **ProductRating** | `components/commerce/product-rating.tsx` | `Badge` | รีวิว 5 ดาว รองรับดาวครึ่งดวง, แสดงจำนวนรีวิว และป้ายการันตี (100 คืน, รับประกัน 10 ปี, ส่งฟรี) |
| **MattressSpecsAccordion** | `components/commerce/mattress-specs-accordion.tsx` | `Accordion`, `Separator` | สเปกโครงสร้างที่นอน 5 ชั้น, เงื่อนไขทดลองนอน 100 คืน, การรับประกัน และบริการเก็บที่นอนเก่า |
| **MattressRadioSelector** | `components/commerce/mattress-radio-selector.tsx` | `RadioGroup`, `Tooltip`, `Sheet`, `Label` | ฟอร์มเลือกไซส์ 台尺/cm และความนุ่มแน่น พร้อมทูลทิปและชีตเทียบขนาดห้อง |
| **ProductCarousel** | `components/commerce/product-carousel.tsx` | `Carousel`, `Badge`, `Button` | แกลเลอรีรูปภาพไฮไลท์เทคโนโลยีที่นอน เลื่อนได้ด้วยมือหรือปุ่มลูกศร |

---

## Step 4 — Multi-brand scope และ Portal

ระบบบริหารธีม 4 แบรนด์ผ่าน `BrandProvider` โดยการตั้งค่า `document.documentElement.dataset.brand = brand`:

| Brand | Primary Token | On-Primary Foreground | Contrast Ratio | เอกลักษณ์และบทบาท |
|---|---|---|---|---|
| **Lunio Taiwan** | `#1C46B4` | `#FFFFFF` | **8.13:1** (AAA) | แบรนด์เรือธง สีน้ำเงินเทคโนโลยี |
| **Nooz Helix** | `#7347AE` | `#FFFFFF` | **6.48:1** (AA) | ที่นอนสปริงพรีเมียม สีม่วงกำมะหยี่ |
| **Nooz Sunset** | `#F28131` | `#1C1526` (หมึกเข้ม) | **6.72:1** (AA) | ที่นอนโฟมลดแรงกดทับ สีส้มพระอาทิตย์ |
| **Lunio Bedding** | `#1C46B4` | `#FFFFFF` | **8.13:1** (AAA) | เครื่องนอนและอุปกรณ์เสริมพรีเมียม |

> **ข้อกำหนดสำคัญสำหรับ Sunset:** ห้ามใช้ตัวอักษรสีขาวบนพื้นสีส้ม `#F28131` เป็นอันขาด เพราะได้ค่า Contrast เพียง 2.64:1 ซึ่งสอบตก WCAG AA ระบบได้กำหนดให้ On-Primary ของ Sunset เป็น `#1C1526` ซึ่งให้ค่าคอนทราสต์ 6.72:1 ปลอดภัยสูงสุด

---

## Step 5 — การจัดวาง CSS Spacing และปุ่ม Copy ใน Code Panel

ในการอัปเดต v1.4.0 ได้มีการปรับปรุงรายละเอียด CSS Spacing ทุกหน้าโดยเฉพาะแผงแสดงโค้ด:
1. **ตำแหน่งปุ่ม Copy:** วางไว้ที่มุมขวาบนแบบสัมบูรณ์ (`absolute top-3 right-3` หรือ `top-3.5 right-3.5`)
2. **Padding กันข้อความชนปุ่ม:** ในทุกบล็อก `<pre>` หรือคอนเทนเนอร์โค้ด ได้กำหนดระยะเว้นขวาขั้นต่ำ **`pr-16` (64px)** เพื่อให้ข้อความโค้ดไม่ชนหรือซ้อนทับกับปุ่ม Copy อย่างเด็ดขาด
3. **สถานะและการแสดงผล:**
   - พื้นหลังปุ่มคมชัดตัดกับโค้ดมืด (`bg-slate-900/90 text-slate-200 border-slate-700 hover:bg-slate-800 hover:text-white`)
   - แสดงไอคอน Checkmark สีเขียวมรกตพร้อมคำว่า `Copied!` เมื่อคัดลอกสำเร็จ
   - มี `Tooltip` กำกับเพื่อรองรับ Accessibility

---

## Step 6 — ตัวอย่างโค้ดการใช้งาน

```tsx
import { MattressRadioSelector } from "@/components/commerce/mattress-radio-selector";
import { MattressSpecsAccordion } from "@/components/commerce/mattress-specs-accordion";
import { ProductCarousel } from "@/components/commerce/product-carousel";
import { ProductRating } from "@/components/commerce/product-rating";
import { PDPStickyBar } from "@/components/commerce/pdp-sticky-bar";

export function MattressPDP() {
  const [size, setSize] = React.useState("5.0");
  const [feel, setFeel] = React.useState("medium-firm");

  return (
    <div className="space-y-8">
      {/* 1. แกลเลอรีรูปภาพ */}
      <ProductCarousel />

      {/* 2. ดาวและรีวิว */}
      <ProductRating score={4.9} reviewCount={12850} />

      {/* 3. การเลือกขนาดและระดับความนุ่มแน่น */}
      <MattressRadioSelector
        selectedSize={size}
        onSelectSize={setSize}
        selectedFeel={feel}
        onSelectFeel={setFeel}
      />

      {/* 4. รายละเอียดโครงสร้างและข้อตกลง */}
      <MattressSpecsAccordion />

      {/* 5. แถบสั่งซื้อด้านล่าง */}
      <PDPStickyBar
        sizeLabel={`${size} 尺`}
        priceLabel="NT21,900"
        inStock={true}
        ready={true}
      />
    </div>
  );
}
```

---

## Step 7 — แหล่งอ้างอิงและเอกสารทางการ

- **Figma Library:** Code 018 · Lunio DS
- **System Specification:** [DESIGN.md](file:///Users/lunio/Desktop/DevPortal/lunio-design-system-shadcn/DESIGN.md)
- **Validation Record:** [VALIDATION.md](file:///Users/lunio/Desktop/DevPortal/lunio-design-system-shadcn/docs/VALIDATION.md)
- **Changelog:** [CHANGELOG_v1.4.md](file:///Users/lunio/Desktop/DevPortal/lunio-design-system-shadcn/docs/CHANGELOG_v1.4.md)
