# Lunio 多品牌設計系統平台規範手冊

> 為 **lunio.com.tw**、**Nooz Helix**、**Nooz Sunset** 與 **Lunio Bedding** 量身打造的完整設計規範、語意 Token 與電商元件準則。全站嚴格標準化採用 **MiSans TC**、**4px 空間格線律動**、**標準 8px 控制元件 / 16px 容器** 與 **WCAG 2.2 AA**。

> **文件版本:** v1.4.0 — 資深電商 UX/UI 與前端架構規範 (2026-10-15)

---

## 1. 品牌識別與語意架構

本平台透過 CSS 作用域自訂屬性 (`[data-brand="..."]`) 實現主題隔離。切換品牌僅需更新底色表面、主要色彩、墨水色與強調色，無須改動元件程式碼或商業邏輯。

### 品牌調色盤與對比度審查

| 品牌 Token | 色碼（Hex） | 前景文字色 | WCAG AA 對比度 | 角色與應用說明 |
|---|---|---|---|---|
| **Lunio Taiwan（主要色彩）** | `#1C46B4` | `#FFFFFF` | **8.13:1**（通過 AAA） | 旗艦款電光藍，用於主要轉換按鈕、重要標籤與核心視覺底色。 |
| **Lunio Accent（強調色）** | `#2E62ED` | `#FFFFFF` | **5.14:1**（通過 AA） | 互動懸停狀態、次要高亮與促銷徽章背景。 |
| **Lunio Surface（表面底色）** | `#F5F7FD` | `#1A1829` | **16.25:1**（通過 AAA） | 柔和微藍底色，用於卡片容器與膠囊標籤。 |
| **Nooz Helix（主要色彩）** | `#7347AE` | `#FFFFFF` | **6.48:1**（通過 AA） | 飯店級袋裝獨立筒系列。奢華絲絨紫主要按鈕。 |
| **Nooz Helix Accent（強調色）** | `#9362D9` | `#000000`（白字 4.21:1 不合格） | **4.99:1**（黑字通過 AA） | 聚焦外框、徽章亮點與卡片邊框。 |
| **Nooz Helix Surface（表面底色）** | `#F8F5FC` | `#1E172B` | **16.05:1**（通過 AAA） | 柔和淡紫卡片底色。 |
| **Nooz Sunset（主要色彩）** | `#F28131` | `#1C1526`（白字 2.64:1 不合格） | **6.72:1**（深色墨水通過 AA） | 人體工學護腰減壓系列。高活力晨曦橘主要按鈕，強制搭配深色文字。 |
| **Nooz Sunset Accent（強調色）** | `#FF9A52` | `#1C1526` | **8.44:1**（通過 AAA） | 溫暖琥珀強調色，用於狀態與標記。 |
| **Nooz Sunset Surface（表面底色）** | `#FEF7F2` | `#241810` | **16.32:1**（通過 AAA） | 柔和暖杏色卡片與頁首底色。 |
| **Lunio Bedding（主要色彩）** | `#1C46B4` | `#FFFFFF` | **8.13:1**（通過 AAA） | 寢具與配件系列（天絲床包、保潔墊、四季被）。 |
| **Lunio Bedding Accent（強調色）** | `#2E62ED` | `#FFFFFF` | **5.14:1**（通過 AA） | 互動懸停狀態、次要高亮與促銷徽章背景。 |
| **Lunio Bedding Surface（表面底色）** | `#F5F7FD` | `#1A1829` | **16.25:1**（通過 AAA） | 柔和微藍寢具商品展示底色。 |

### 官方品牌標誌資產 (Official Brand Assets)

全標誌提供高解析透明底 PNG（支援 Retina / @4x）與無損向量 SVG 格式，色彩精準對應官方 CI 與設計系統 Token：

| 品牌 | 主要標誌 (Primary Fill) | 反白標誌 (White Reversal) | 向量格式 (SVG) | 規格尺寸 | 品牌標準色 |
|---|---|---|---|---|---|
| **Lunio Taiwan** | `/images/lunio/lunio-primary.png` | `/images/lunio/lunio-white.png` | `/images/lunio/lunio-primary.svg` · `/images/lunio/lunio-white.svg` | 1200 × 600 px | `#1C46B4` (企業款 `#002355`) |
| **Nooz Helix** | `/images/nooz/nooz-primary.png` | `/images/nooz/Nooz-white.png` | `/images/nooz/nooz-helix.svg` · `/images/nooz/nooz-white.svg` | 1133 × 359 px | `#7347AE` (深絲絨紫) |
| **Nooz Sunset** | `/images/nooz/Nooz-sunset.png` | `/images/nooz/Nooz-white.png` | `/images/nooz/nooz-sunset.svg` · `/images/nooz/nooz-white.svg` | 1133 × 359 px | `#F28131` (晨曦橘) |
| **Lunio Bedding** | `/images/lunio-bedding/lunio-bedding-primary@4x.png` | `/images/lunio-bedding/lunio-bedding-white@4x.png` | `/images/lunio-bedding/lunio-bedding-primary.svg` | 1080 × 248 px | `#1C46B4` |


---

## 2. MiSans TC 字體排印系統

全站繁體中文與西文字元之唯一權威專屬字體家族：
`font-family: "MiSans TC", "MiSansTC", var(--font-sans), "PingFang TC", "Microsoft JhengHei", sans-serif;`

### 12 組語意化文字角色

| 排版角色 | 手機端（375px） | 桌面端（1440px） | 字重 | 工具類別 | 應用場景 |
|---|---|---|---|---|---|
| **display** | 40px / 48px | 48px / 56px | 800 | `typo-display` | 首頁大視覺主標題 |
| **h1** | 32px / 40px | 40px / 48px | 700 | `typo-h1` | 商品詳情頁主標題、大區塊主標 |
| **h2** | 26px / 34px | 32px / 40px | 700 | `typo-h2` | 功能特色標題、章節標題 |
| **h3** | 22px / 30px | 24px / 32px | 700 | `typo-h3` | 商品卡片標題、對話框標題 |
| **h4** | 18px / 26px | 20px / 28px | 600 | `typo-h4` | 服務承諾標題、評論者姓名 |
| **body-lg** | 17px / 26px | 18px / 28px | 400 | `typo-body-lg` | 前言介紹、引言段落 |
| **body-md** | 15px / 24px | 16px / 26px | 400 | `typo-body-md` | 標準說明文字、顧客評價內文 |
| **body-sm** | 13px / 20px | 14px / 22px | 400 | `typo-body-sm` | 規格細節、次要補充備註 |
| **label** | 13px / 18px | 13px / 18px | 600 | `typo-label` | 按鈕文字、導覽連結、分頁標籤 |
| **caption** | 11px / 16px | 12px / 16px | 500 | `typo-caption` | 微型徽章、法規說明、備註 |
| **price-xl** | 26px / 32px | 32px / 38px | 800 | `typo-price-xl` | 商品頁主要售價大字 |
| **price-md** | 20px / 26px | 24px / 30px | 700 | `typo-price-md` | 卡片售價、分期月付金額 |

---

## 3. 空間格線律動、圓角與立體層級

### 4px 基礎律動
- `s-1: 4px` · `s-2: 8px` · `s-3: 12px` · `s-4: 16px` · `s-5: 20px` · `s-6: 24px` · `s-8: 32px` · `s-10: 40px` · `s-12: 48px` · `s-16: 64px` · `s-20: 80px` · `s-24: 96px`

### 標準圓角規範
- **4px 晶片標籤與分頁按鈕**: `rounded` (`rounded-[4px]`) 用於分頁標籤、晶片與微型標籤。
- **8px 控制元件與卡片**: `rounded-lg` (`rounded-[8px]`) 用於按鈕、輸入框、下拉選擇器、數量步進器與展示卡片容器。
- **16px 浮動容器**: 用於底部常駐購買抽屜與重點彈出對話框。

### 立體陰影層級
- **Level 0（平面）**: 背景畫布底色 `#F9FAFB` 與表面容器。
- **Level 1（髮絲邊框）**: 商品目錄卡片與預設容器 (`border border-[#E5E7EB] shadow-2xs`)。
- **Level 2（柔和立體）**: 懸停狀態、選取中卡片與下拉選單 (`shadow-md`)。
- **Level 3（浮動層級）**: 常駐購買列、底部抽屜與對話框 (`shadow-xl`)。

---

## 4. 台灣標準床墊規格

所有床墊元件皆精準對應台灣市場標準公分規格：
1. **3尺標準單人**: 90 × 188 × 24 cm
2. **3.5尺單人加大**: 105 × 188 × 24 cm
3. **5尺標準雙人**: 150 × 188 × 24 cm *（全台最熱銷規格）*
4. **6尺雙人加大**: 180 × 188 × 24 cm
5. **7尺雙人特大**: 180 × 210 × 24 cm

---

## 5. 官方六大核心商品與定價（lunio.com.tw）

1. **Lunio Quantum Max 乳膠石墨烯床墊**: NT$ 23,900（原價 NT$ 31,900）· 骨科醫師推薦
2. **Lunio Gen 3 旗艦乳膠床墊**: NT$ 31,900（原價 NT$ 42,900）· 100% 泰國天然乳膠
3. **Nooz Helix 獨立筒乳膠床墊**: NT$ 8,990（原價 NT$ 19,800）· 飯店級袋裝獨立筒
4. **Nooz Sunset 減壓床墊**: NT$ 7,990（原價 NT$ 16,800）· 紮實護腰減壓首選
5. **涼感天絲防蟎四季被**: NT$ 3,280（原價 NT$ 4,980）· 100% 奧地利蘭精天絲
6. **天然人體工學乳膠記憶枕**: NT$ 1,980（原價 NT$ 3,200）· 曲線護頸告別落枕

---

## 6. 官方五大安心服務承諾

- **全台免運費到府安裝**: 專業物流團隊免費搬運上樓，免收樓層費。
- **免費協助舊床回收**: 搬運同尺寸舊床至指定回收處，無後顧之憂。
- **100晚試睡體驗**: 享整整 100 晚在家試睡，躺感不適全額退費。
- **10年原廠保固**: 堅持嚴苛品質檢驗，提供原廠安心保固。
- **12期0利率無痛月付**: 支援全台主流銀行信用卡分期，輕鬆無負擔。

---

## 7. 無障礙與品質驗收標準（WCAG 2.2 AA）

- **對比度最低限度（1.4.3）**: 所有一般內文與主要按鈕對比度皆達 ≥ 4.5:1，大標題與裝飾元素 ≥ 3:1。
- **焦點外觀可見（2.4.7）**: 鍵盤遍歷具備清晰高對比之聚焦光圈 (`focus-visible:ring-2`)。
- **目標尺寸（2.5.8）**: 行動端主要控制項統一標準化為 44×44px 最低觸控尺寸。
- **重新排版（1.4.10）**: 於 320px CSS 寬度下保持流暢單欄排版，絕不產生水平捲動。
- **文字縮放（1.4.4）**: 瀏覽器字級縮放至 200% 無文字截斷或功能缺失。
- **驗證程序**:
  1. 手機端 375px 視圖測試：確認漢堡選單抽屜平滑開啟、尺寸晶片與常駐購買列觸控達標。
  2. 桌面端鍵盤與縮放測試：Tab 鍵完整遍歷頁面、VoiceOver / NVDA 報讀無障礙。

---

## 8. Figma 變數與交付自動化流程

Figma 作為設計創作環境；本專案庫中具備版本控管的 Token JSON 是程式碼的唯一真實來源。透過自動化 CLI 腳本同步設計變更，杜絕手動修改 CSS。

### Figma 變數集合與模式
1. **字體排印集合**: 手機 375 與桌面 1440 模式，涵蓋 12 組語意化角色。
2. **品牌模式集合**: Lunio、Nooz Helix、Nooz Sunset 模式，映射主要色彩、前景色、強調色與底色。
3. **基礎數值集合**: 4px 空間格線 Token（s-1 至 s-24）、標準 8px 圓角與立體陰影。

### 自動產出之 Token 匯出資產
執行 `npm run tokens:build` 後將於 `packages/tokens/dist/` 目錄產出以下版本化資產：
- `packages/tokens/dist/tokens.css`: 編譯後之 CSS 語意變數，供主題、響應式字體與排版使用。
- `packages/tokens/dist/tokens.json`: 供 Next.js 元件與 TypeScript 型別直接引入調用之規範 JSON。
- `packages/tokens/dist/figma-dtcg.json`: 符合 W3C DTCG 標準格式之 Token 檔案，供 Figma Variables 外掛匯入。
- `packages/tokens/dist/figma-typography.csv`: CSV 對應表，將文字角色映射至各裝置尺寸，供快速建立 Figma 文字樣式。

### 推薦 Figma 檔案目錄架構
```text
00 / 開始使用與版本紀錄
01 / 品牌基礎與多品牌主題模式
02 / 字體排印 · 手機端 375
03 / 字體排印 · 桌面端 1440
04 / 色彩 · 語意 Token 與系統狀態色
05 / 間距、格線系統與版面框架
06 / 核心 UI 控制元件
07 / 台灣電商前台商務模式
08 / 無障礙規範與最佳實踐準則
09 / 正式上線發布摘要
```

---

## 9. 設計系統治理規範與無痛遷移藍圖

活的設計系統需透過正式審查規則、程式碼層級自動把關與分階段遷移藍圖維持品質——確保 lunio.com.tw 官方線上商城的卓越體驗與穩定營運。

### 五階段變更生命週期
1. **01 需求審查**: 確認缺失的 UI 模式或 Token 不一致性。
2. **02 設計提案**: 於 Figma 中依循 4px 格線與 WCAG AA 繪製原型。
3. **03 核准 Token**: 設計主管與前端技術主管共同審查 Token 變更。
4. **04 程式碼與 PR**: 以 React 實作、編譯 Token、通過 TypeScript 檢查。
5. **05 QA 與發布**: 無障礙檢驗、視覺回歸測試、標註版本標籤發布。

### 版本發布驗收準則
- **僅限 MiSans TC**: 面向顧客的前台 UI 元件嚴禁使用非標準字體。
- **杜絕任意字級數值**: 所有文字樣式必須嚴格對應至 `typo-*` 角色。
- **WCAG 2.2 AA 對比度**: 主要按鈕與文字組合必須全數通過 4.5:1。
- **響應式完整驗證**: 全面於手機端 375px 與桌面端 1440px 完成測試。
- **雙人簽核流程**: Pull Request 必須取得設計負責人與前端負責人共同審查批准。
- **自動化構建全數通過**: `npm run tokens:build`、`npm run tokens:check`、`npm run typecheck` 與 `npm run build` 四者執行結果皆為 0 錯誤。

### lunio.com.tw 分階段無痛遷移藍圖
- **第一階段（基礎架構與品牌 Token）**: 部署 tokens.css、全面統一至 MiSans TC 字體排印階層。
- **第二階段（核心 UI 控制元件）**: 遷移按鈕、徽章標籤、輸入框、頁首導航列與品牌切換器。
- **第三階段（商品目錄與展示卡片）**: 全面上線響應式 ProductCard、SizeVariantSelector 與五大安心承諾 TrustServices。
- **第四階段（商品詳情頁、規格對比與結帳流程）**: 部署常駐購買列 StickyBuyBar、床墊對比表 MattressComparison 與全站無障礙回歸審查。

---

## 10. 開發者 CLI 指令

```bash
# 編譯 Token（產出 CSS 變數、DTCG JSON 與字體排印 CSV）
npm run tokens:build

# 依據架構驗證 Token 對比度與型別
npm run tokens:check

# 驗證 shadcn/ui 元件契約、Radix 依賴與杜絕 Raw button/select 標籤
npm run shadcn:check

# 執行 TypeScript 型別檢查
npm run typecheck

# 執行完整驗證測試
npm run check

# 執行生產環境編譯（Turbopack SSG 15 routes）
npm run build
```
