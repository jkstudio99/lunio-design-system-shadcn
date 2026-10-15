# Figma sync จาก DESIGN.md v1.4

วันที่ 15 ตุลาคม 2026 อัปเดตไฟล์ Lunio TW Mattress หน้า Code 018 จาก DESIGN.md v1.4.0 และ src/design-system/tokens.json โดยรักษาค่าโทเคนต้นฉบับและ IDs เดิม

[เปิดเอกสารฉบับปัจจุบันใน Figma](https://www.figma.com/design/46bJYM9raivd3wEwTxaaJI/Lunio-TW-Mattress?node-id=1222-60)

## สิ่งที่เปลี่ยนใน Figma

- สร้างเอกสารแก้ไขได้ 14 บท มีสารบัญเชื่อมไปแต่ละบท ครอบคลุมแบรนด์, semantic variables, typography, spacing, 22 UI primitives, states, 10 commerce compositions, responsive patterns, accessibility และ developer handoff
- ดูแล Variables 145 รายการใน 6 collections รวมรายการเก่าที่เก็บไว้เพื่อ compatibility เพิ่ม 14 รายการและอัปเดต mapping เดิม 118 รายการในรอบหลัก
- เปลี่ยนชื่อ mode ที่สี่จาก Hypercool Bedding เป็น Lunio Bedding โดยคง mode ID เดิม สีหลักเป็น #1C46B4
- แก้ Sunset on-primary และ on-accent เป็น #1C1526 และ Helix on-accent เป็น #000000 พร้อม semantic aliases
- เติม scopes, descriptions และ Web Code Syntax ที่ตรงกับ CSS จริง แยก muted foreground ออกจาก muted surface
- ผูก typography weight roles กับ 5 weight primitives และแก้ named faces ทั้ง 24 Text Styles โดยคง style IDs เดิม
- ใช้ explicit MiSans TC named faces ใน Styles เนื่องจาก weight binding เดิมแสดง face ไม่ตรงหลายบทบาท ส่วน semantic weight variables ยัง alias 400/500/600/700/800 ตามสเปก
- ตัวอย่าง typography 24 รายการ bind size และ line-height กับ semantic variables ภายใต้ responsive mode ที่ระบุชัดเจน
- เก็บเอกสารฉบับก่อนหน้าไว้ทางซ้ายพร้อมชื่อ Archive และเก็บ legacy variables โดยไม่ลบ IDs

## ผลตรวจสอบ

อ่านค่ากลับจาก Figma และเทียบกับ JSON แล้วผ่านทั้ง 4 modes, ค่า typography 72 ค่า, Text Styles 24 รายการ, spacing 12 ขั้น และ radius 3 บทบาท ตรวจ alias chain โดยไม่พบวงจรหรือ reference ที่หาย

เอกสารประกอบด้วยข้อความแก้ไขได้ 941 nodes และ auto-layout frames 987 nodes มี semantic solid paints 1,073 รายการ ไม่มี solid paint ที่หลุด binding ในฉบับใหม่ ไม่พบ chapter overlap หรือ child bounds overflow หลังแก้ขนาด title text boxes

ตรวจภาพของทั้ง 14 บท และปรับตัวอย่าง mobile filters, hover และ focus ring หลังตรวจภาพ ไม่ถือภาพ Figma เป็นหลักฐาน WCAG conformance ของเว็บจริง

รันคำสั่งต่อไปนี้ผ่านใน working tree ปัจจุบัน

| คำสั่ง | ผล |
|---|---|
| npm run tokens:build | ผ่าน |
| npm run tokens:check | ผ่าน 7/7 |
| npm run shadcn:check | ผ่าน 6/6 |
| npm run typecheck | ผ่าน |
| npm run build | ผ่าน Next.js 16.4.1 สร้าง 19 static pages |

Build มีคำเตือนเกี่ยวกับ package-lock.json ใน directory แม่ซึ่งอยู่นอก Git repository โดยไม่ทำให้ build ล้มเหลว

## ข้อค้นพบที่เอกสาร Figma ระบุไว้

DESIGN.md ยังมีสถานะ v1.2 และข้อความรับรองบางส่วนปะปนกับ addendum v1.4 จึงแยกประวัติออกจากสถานะปัจจุบันที่เป็น Engineering pilot

PDPStickyBar ปัจจุบันยังเป็น summary ใน normal flow ส่วน fixed positioning, safe-area และ shared SKU state เป็นงาน integration ที่ต้องตรวจใน storefront จริง ProductCard ยังไม่มี PDP link ภายใน และ MattressRadioSelector ใช้ขนาดตัวอย่างที่ยังต้องต่อข้อมูล WooCommerce

Dark palette ใน generator เป็น engineering mapping ที่ยังไม่อยู่ใน approved token JSON ฉบับนี้บันทึกค่าจริงและสถานะรอ design review ในบท 13 โดยไม่สร้าง approved dark-brand modes จากข้อสมมติ

ไฟล์ webfont ที่มี license ยังไม่รวมใน repository ต้องยืนยันสิทธิ์และติดตั้งทั้ง 5 weights ก่อน release ยังต้องตรวจ browser reflow, text zoom, keyboard, screen reader, cart, shipping และ payment integration

## หลักฐานและวิธีตรวจซ้ำ

ไฟล์ .audit/figma-v1.4/evidence.json เก็บผลอ่านค่าจริงและ IDs ส่วน verify-variables.js และ verify-documentation.js เป็น read-only scripts สำหรับ Figma Plugin API ผ่าน use_figma ไม่ใช่ Node.js scripts ทั่วไป โหลด figma-use skill ก่อนรันและใช้ file key 46bJYM9raivd3wEwTxaaJI

Sync script ใช้ข้อมูลจาก snapshot ของ token JSON ในรอบนี้ หากต้นฉบับเปลี่ยนให้สร้าง snapshot ใหม่ก่อนรัน Creation scripts ของเอกสารใช้ chapter wrapper IDs ของรอบนี้และต้องใช้กับ wrapper ว่างเท่านั้น

Decision trail อยู่ที่ .audit/figma-v1.4/trail.tsv ส่วน decisions.tsv เป็นบันทึกวางแผนเริ่มต้น หลักที่ใช้คือ Model the Domain เพื่อจัด mapping ด้วย collection/name, Build the Lever เพื่อเก็บ scripts ตรวจซ้ำ, Sequence Work into Verifiable Units เพื่อแยก variable sync ออกจากเอกสาร และ Prove It Works เพื่ออ่าน artifact จริงและตรวจภาพ

SHA-256 ของ DESIGN.md และ token JSON ก่อนและหลังงานตรงกัน

```text
DESIGN.md
94f85b76a5c5c30f9ac4fb6922c9a5d20ad62b8f98cb0f461c55c69fc58ffa50
src/design-system/tokens.json
d7b996d7efed259cd5efd085edeb60e25e4fcfb7aee07ed40b364e22a84e31cc
```
