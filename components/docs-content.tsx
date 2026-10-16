"use client";
import Link from "next/link";
import {useState,type ReactNode} from "react";
import {ArrowLeft,ArrowRight,ArrowUpRight,Calendar,Check,CheckCircle2,ChevronDown,ChevronRight,ClipboardCheck,Copy,Download,Eye,FileCode2,GitCommit,HelpCircle,History,Info,Layers,Layers3,Minus,Monitor,Moon,Plus,RefreshCw,RotateCcw,ShieldCheck,ShoppingBag,Smartphone,Sparkles,Star,Tag,TriangleAlert,Truck,X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Card,CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Tabs,TabsContent,TabsList,TabsTrigger} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge";
import {Label} from "@/components/ui/label";
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {Checkbox} from "@/components/ui/checkbox";
import {Sheet,SheetTrigger,SheetContent,SheetHeader,SheetTitle,SheetDescription} from "@/components/ui/sheet";
import {Separator} from "@/components/ui/separator";
import {Accordion,AccordionItem,AccordionTrigger,AccordionContent} from "@/components/ui/accordion";
import {RadioGroup,RadioGroupItem} from "@/components/ui/radio-group";
import {Tooltip,TooltipTrigger,TooltipContent,TooltipProvider} from "@/components/ui/tooltip";
import {Breadcrumb,BreadcrumbList,BreadcrumbItem,BreadcrumbLink,BreadcrumbPage,BreadcrumbSeparator,BreadcrumbEllipsis} from "@/components/ui/breadcrumb";
import {Skeleton} from "@/components/ui/skeleton";
import {Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious} from "@/components/ui/carousel";
import {QuantityStepper} from "@/components/commerce/quantity-stepper";
import {SizeSelector} from "@/components/commerce/size-selector";
import {ProductCard,ProductCardSkeleton} from "@/components/commerce/product-card";
import {PDPStickyBar} from "@/components/commerce/pdp-sticky-bar";
import {MobileMegaMenu} from "@/components/commerce/mobile-mega-menu";
import {ProductRating} from "@/components/commerce/product-rating";
import {MattressSpecsAccordion} from "@/components/commerce/mattress-specs-accordion";
import {MattressRadioSelector} from "@/components/commerce/mattress-radio-selector";
import {ProductCarousel} from "@/components/commerce/product-carousel";
import {PriceBlock} from "@/components/commerce/price-block";
import {ComparisonTable} from "@/components/commerce/comparison-table";
import {ReassuranceRow} from "@/components/commerce/reassurance-row";
import {PromoBanner} from "@/components/commerce/promo-banner";
import {ReviewList,ReviewCard} from "@/components/commerce/review-list";
import {TaiwanAddressForm,CheckoutStepper} from "@/components/commerce/taiwan-address-form";
import {PaymentMethodSelector} from "@/components/commerce/payment-method-selector";
import {CartAddOnCard,CartGiftLine} from "@/components/commerce/cart-addons";
import {DesktopMegaMenu} from "@/components/commerce/desktop-mega-menu";
import {IconsGallery} from "@/components/docs-icons";
import {CustomIconsStudio} from "@/components/docs-custom-icons";
import {useBrand} from "@/components/brand-provider";
import {useLanguage} from "@/components/language-provider";
import {allDocs,brands,contrastRatio,roleNames,tokens,type TypeRole} from "@/lib/design-system";

const sections:Record<string,{number:string;kicker:string;title:string;intro:string}>={
 "getting-started":{number:"00",kicker:"START HERE",title:"Getting started",intro:"The design system for lunio.com.tw, covering the 5 brands sold on it: Lunio TW, Nooz Helix, Nooz Sunset, Lunio Bedding, and Lunio Life."},
 brands:{number:"01",kicker:"BRAND FOUNDATION",title:"Brands & 5-brand storefront modes",intro:"One underlying system for lunio.com.tw with distinct palettes for Lunio Taiwan, Nooz Helix, Nooz Sunset, Lunio Bedding, and Lunio Life."},
 typography:{number:"02—03",kicker:"TYPOGRAPHY",title:"MiSansTC typography",intro:"Twelve semantic roles, five font weights, two reference viewports. No page-specific type styling."},
 colors:{number:"04",kicker:"COLORS",title:"Color & semantic tokens",intro:"Brand values stay distinct; UI components consume accessible foreground/background pairs, not hard-coded hex."},
 spacing:{number:"05",kicker:"SPATIAL FOUNDATION",title:"Spacing, grid & elevation",intro:"A deliberate 4px rhythm with consistent 8px control radius, 16px container radius, and 9999px pill badges."},
 icons:{number:"06",kicker:"ICONOGRAPHY",title:"Icons & iconography",intro:"Curated Lucide icons purpose-built for lunio.com.tw e-commerce storefronts, bedding specifications, trust guarantees, and mobile navigation."},
 "custom-icons":{number:"07",kicker:"CUSTOM ICONS STUDIO",title:"Custom icons studio & upload",intro:"Interactive SVG upload, real-time sanitization, token color preview, JSX component code generation, and official Lunio brand custom marks."},
 components:{number:"08",kicker:"INTERFACE COMPONENTS",title:"Core UI components (22 primitives)",intro:"22 source-owned shadcn/ui primitives on Radix UI: buttons, pill badges (incl. #E53935 sale variant), forms, selectors, and dialogs."},
 commerce:{number:"09",kicker:"COMMERCE PATTERNS",title:"E-commerce components (19 patterns)",intro:"19 Taiwan e-commerce patterns: PriceBlock (NT format), ComparisonTable, ReassuranceRow, PromoBanner, ReviewList, DesktopMegaMenu, CartAddOnCard, TaiwanAddressForm, PaymentMethodSelector, and PDP modules."},
 accessibility:{number:"10",kicker:"ACCESSIBILITY",title:"Accessibility & UI quality",intro:"WCAG 2.2 AA as a measurable release goal. Check actual interactions, not tokens alone."},
 release:{number:"11",kicker:"OPERATIONS",title:"Production release",intro:"Production readiness, P0 closure record, conversion backlog rollout order (Wave 1–3), and deployment gates for lunio.com.tw."},
 changelog:{number:"12",kicker:"VERSION HISTORY",title:"Changelog & versions",intro:"Complete release notes, milestones, component additions, and migration history across every version of Lunio Design System."}
};

function Subheading({title,desc}:{title:string;desc?:string}){
  return <div className="mb-5"><h2 className="text-[22px] font-extrabold tracking-[-.035em] text-foreground">{title}</h2>{desc&&<p className="mt-1.5 text-[13px] leading-6 text-muted-foreground">{desc}</p>}</div>;
}

function CopyButton({value,label="Copy",ariaLabel="Copy code to clipboard",className}:{value:string;label?:string;ariaLabel?:string;className?:string}){
  const { isZh } = useLanguage();
  const [copied,setCopied]=useState(false);
  async function onCopy(){try{await navigator.clipboard.writeText(value);setCopied(true);setTimeout(()=>setCopied(false),1600)}catch{setCopied(false)}}
  return <Tooltip>
    <TooltipTrigger asChild>
      <Button
        onClick={onCopy}
        type="button"
        variant="outline"
        size="sm"
        aria-label={copied ? (isZh ? "已複製程式碼至剪貼簿" : "Copied code to clipboard") : ariaLabel}
        className={cn(
          "h-8 px-2.5 text-xs font-medium border border-slate-700/80 bg-slate-900/90 text-slate-200 hover:bg-slate-800 hover:text-white dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors shadow-xs gap-1.5 focus-visible:ring-2 focus-visible:ring-primary",
          copied&&"border-emerald-600 bg-emerald-950/50 text-emerald-400 dark:border-emerald-500",
          className
        )}
      >
        {copied?<Check size={14} className="text-emerald-400"/>:<Copy size={14}/>}
        <span>{copied ? (isZh ? "已複製！" : "Copied!") : (label === "Copy" ? (isZh ? "複製" : "Copy") : label)}</span>
      </Button>
    </TooltipTrigger>
    <TooltipContent side="top" className="text-xs">
      {copied ? (isZh ? "已成功複製到剪貼簿" : "Copied to clipboard successfully") : (isZh ? "點擊複製程式碼" : "Click to copy code")}
    </TooltipContent>
  </Tooltip>;
}

function CodePanel({code,label="CSS / React"}:{code:string;label?:string}){
  return <div className="space-y-2">
    <div className="flex items-center justify-between">
      <div className="text-[10px] font-bold uppercase tracking-[.16em] text-muted-foreground">{label}</div>
    </div>
    <div className="relative group">
      <pre className="code-panel pr-16">{code}</pre>
      <div className="absolute top-3 right-3 z-10">
        <CopyButton value={code} ariaLabel={`Copy ${label} code snippet`}/>
      </div>
    </div>
  </div>;
}

function SpecNote({children}:{children:ReactNode}){return <div className="doc-notice"><div className="flex items-start gap-2"><Info size={17} className="mt-1 shrink-0"/><div>{children}</div></div></div>}

function Overview(){
  const { isZh } = useLanguage();
  return <div className="space-y-9">
    <div className="docs-grille">
      <div className="docs-block">
        <div className="mb-4 flex size-11 items-center justify-center rounded-lg border border-border/80 bg-primary/10 dark:bg-primary/15 dark:border-primary/25 text-primary">
          <Layers3 size={22}/>
        </div>
        <div className="text-[18px] font-bold text-foreground">
          {isZh ? "專屬於 lunio.com.tw 的設計語言" : "Built specifically for lunio.com.tw."}
        </div>
        <p className="mt-2 text-[13px] leading-7 text-muted-foreground">
          {isZh ? "本系統為 lunio.com.tw 台灣官網專屬設計標準（非集團全區域通用系統），涵蓋站上銷售之 5 大品牌：Lunio TW、Nooz Helix、Nooz Sunset、Lunio Bedding 與整併自 luniolife.com.tw 之 Lunio Life。" : "This is the design system for lunio.com.tw (not a group-wide system), covering the 5 brands sold on it: Lunio TW, Nooz Helix, Nooz Sunset, Lunio Bedding, and Lunio Life (merged from luniolife.com.tw)."}
        </p>
      </div>
      <div className="docs-block">
        <div className="mb-4 flex size-11 items-center justify-center rounded-lg border border-border/80 bg-primary/10 dark:bg-primary/15 dark:border-primary/25 text-primary">
          <FileCode2 size={22}/>
        </div>
        <div className="text-[18px] font-bold text-foreground">
          {isZh ? "即時同步規範手冊" : "A living contract."}
        </div>
        <p className="mt-2 text-[13px] leading-7 text-muted-foreground">
          {isZh ? "DESIGN.md 定義設計意圖，JSON 自動生成 CSS 變數。22 個 shadcn/ui 原生基底與 19 個台灣電商元件直接套用語意類別，統一以 NT 格式（如 NT21,990）渲染售價。" : "DESIGN.md specifies intent. JSON generates CSS. 22 shadcn/ui primitives and 19 Taiwan commerce patterns consume semantic tokens and format prices consistently as NT (e.g. NT21,990)."}
        </p>
      </div>
    </div>
    <div className="docs-block">
      <Subheading
        title={isZh ? "系統架構" : "Architecture"}
        desc={isZh ? "明確劃分每個應用層級與模組的單一職責。" : "Keep the responsibilities of each application explicit."}
      />
      <div className="grid gap-3 md:grid-cols-4">
        {[
          ["01", "DESIGN.md + Figma", isZh ? "視覺與設計決策" : "Visual decisions"],
          ["02", isZh ? "JSON Token 核心源" : "JSON Token Source", isZh ? "單一編寫基準層" : "One authoring layer"],
          ["03", isZh ? "Next.js 文件 + UI" : "Next.js Docs + UI", isZh ? "22 基底 + 19 電商模組" : "22 primitives + 19 commerce"],
          ["04", "WooCommerce API", isZh ? "商品規格與訂單基準" : "Product and order truth"]
        ].map(s=>(
          <div key={s[0]} className="rounded-xl border border-border/80 bg-slate-50/70 dark:bg-[#182030] dark:border-[#2A344A] p-4 transition-all hover:border-primary/50 dark:hover:border-primary/50 shadow-xs">
            <span className="text-[11px] font-bold text-primary">{s[0]}</span>
            <p className="mt-4 text-[14px] font-bold text-foreground">{s[1]}</p>
            <p className="mt-1 text-[12px] text-muted-foreground">{s[2]}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="docs-block">
      <Subheading
        title={isZh ? "首次執行" : "First run"}
        desc={isZh ? "在本地終端機依序執行以下指令啟動系統開發環境。" : "Run these commands sequentially to start the local design system environment."}
      />
      <CodePanel label="TERMINAL" code={'npm install\nnpm run tokens:build\nnpm run tokens:check\nnpm run dev'}/>
      <p className="mt-4 text-[13px] text-muted-foreground">
        {isZh ? (
          <>開啟 <strong className="font-semibold text-foreground">http://localhost:3001</strong>。MiSansTC WOFF2 授權字型檔依據 public/fonts/README.md 規範加入。</>
        ) : (
          <>Open <strong className="font-semibold text-foreground">http://localhost:3001</strong>. Actual MiSansTC WOFF2 files are not distributed; follow public/fonts/README.md.</>
        )}
      </p>
    </div>
    <div className="docs-block">
      <Subheading
        title={isZh ? "設計系統資產清單" : "Design system inventory"}
        desc={isZh ? "lunio.com.tw 跨品牌架構下已通過測試驗證的完整規範清單。" : "Comprehensive inventory of lunio.com.tw multi-brand foundations, primitives, and commerce patterns."}
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          ["05", isZh ? "品牌主題模式 (含 Lunio Life)" : "Storefront brand modes"],
          ["12", isZh ? "字體排印角色 (5 字重)" : "Type roles (5 weights)"],
          ["22", isZh ? "shadcn/Radix 核心基底" : "shadcn/Radix primitives"],
          ["19", isZh ? "台灣電商轉換元件" : "Taiwan commerce patterns"]
        ].map(x=>(
          <div key={x[1]} className="rounded-xl border border-border/80 bg-slate-50/70 dark:bg-[#182030] dark:border-[#2A344A] p-5 transition-all hover:border-primary/50 dark:hover:border-primary/50 shadow-xs">
            <div className="text-[31px] font-extrabold tracking-[-.05em] text-primary">{x[0]}</div>
            <div className="mt-1 text-xs font-medium text-muted-foreground">{x[1]}</div>
          </div>
        ))}
      </div>
    </div>
    <SpecNote>
      {isZh
        ? "本設計系統為 lunio.com.tw 專屬設計與工程標準（v1.4.1 Production Certified），涵蓋 Lunio Taiwan、Nooz Helix、Nooz Sunset、Lunio Bedding 與 Lunio Life 五大品牌，並新增獨立促銷紅 Token (--sale: #E53935) 與統一 NT 售價格式 (NT21,990)。"
        : "This design system is the official standard for lunio.com.tw (v1.4.1 Production Certified), covering Lunio Taiwan, Nooz Helix, Nooz Sunset, Lunio Bedding, and Lunio Life, with a dedicated sale token (--sale: #E53935) and canonical NT price formatting (NT21,990)."}
    </SpecNote>
  </div>;
}

const brandLogos = [
  { brand: "Lunio Taiwan", token: "#1C46B4", primarySrc: "/images/lunio/lunio-primary.png", whiteSrc: "/images/lunio/lunio-white.png", svgSrc: "/images/lunio/lunio-primary.svg", descZh: "Lunio 旗艦款電光藍標誌，用於全站 Header、品牌導覽與主要視覺。", descEn: "Lunio flagship Electric Blue logo for storefront header, brand navigation and key visuals.", bg: "#1C46B4" },
  { brand: "Nooz Helix", token: "#7347AE", primarySrc: "/images/nooz/nooz-primary.png", whiteSrc: "/images/nooz/Nooz-white.png", svgSrc: "/images/nooz/nooz-helix.svg", descZh: "Nooz Helix 獨立筒系列，深絲絨紫專屬識別。", descEn: "Nooz Helix pocket spring collection with signature Deep Velvet Purple identity.", bg: "#7347AE" },
  { brand: "Nooz Sunset", token: "#F28131", primarySrc: "/images/nooz/Nooz-sunset.png", whiteSrc: "/images/nooz/Nooz-white.png", svgSrc: "/images/nooz/nooz-sunset.svg", descZh: "Nooz Sunset 人體工學減壓系列，高活力晨曦橘識別（高解析 Retina 原檔）。", descEn: "Nooz Sunset ergonomic pressure-relief collection with vibrant Sunrise Orange identity (Retina assets).", bg: "#F28131" },
  { brand: "Lunio Bedding", token: "#1C46B4", primarySrc: "/images/lunio-bedding/lunio-bedding-primary@4x.png", whiteSrc: "/images/lunio-bedding/lunio-bedding-white@4x.png", svgSrc: "/images/lunio-bedding/lunio-bedding-primary.svg", descZh: "Lunio 寢具周邊專用識別（天絲床包、保潔墊、四季被）。", descEn: "Lunio Bedding accessories identity for Tencel sheet sets, mattress protectors, and duvets.", bg: "#1C46B4" },
  { brand: "Lunio Life", token: "#2D274A", primarySrc: "/images/lunio-life/lunio-life-logo-primary.png", whiteSrc: "/images/lunio-life/lunio-life-logo-white.png", svgSrc: "/images/lunio-life/lunio-life-primary.svg", descZh: "Lunio Life 居家生活品牌識別（Plum Night #2D274A），用於整併至 lunio.com.tw 之電動床架、沙發與居家分類頁。", descEn: "Lunio Life identity (Plum Night #2D274A) for smart adjustable beds, sofas, and Lunio Life PDPs/category pages merged into lunio.com.tw.", bg: "#2D274A" }
];

const lunioLifeCiPalette = [
  { group: "Primary Colors", name: "Plum Night", hex: "#2D274A", roleZh: "品牌主錨點色 · 標題與主要按鈕 (13.99:1 AAA)", roleEn: "Anchor Primary · Headlines & Primary Fill (13.99:1 AAA)", textHex: "#FFFFFF" },
  { group: "Primary Colors", name: "Titan White", hex: "#CCD5F8", roleZh: "淺色對比背景 · 寬敞感表面底色 (12.66:1 AAA)", roleEn: "Light Contrast Background · Brand Surface (12.66:1 AAA)", textHex: "#141414" },
  { group: "Primary Colors", name: "Crocus Purple", hex: "#9786F3", roleZh: "重點強調與 CTA · 搭配 #141414 深黑字 (6.15:1 AA)", roleEn: "CTA / Emphasis Accent · Paired with #141414 Black (6.15:1 AA)", textHex: "#141414" },
  { group: "Secondary Colors", name: "Black", hex: "#141414", roleZh: "核心內文與介面文字 (Text / UI Ink)", roleEn: "Core Text & UI Foreground Ink", textHex: "#FFFFFF" },
  { group: "Secondary Colors", name: "Ivory", hex: "#ECE8D8", roleZh: "溫潤柔和背景 (Soft Background --brand-surface-soft)", roleEn: "Warm Soft Background (--brand-surface-soft)", textHex: "#141414" },
  { group: "Secondary Colors", name: "Pink", hex: "#EC9BB0", roleZh: "生活風格點綴色 (Lifestyle Accent --brand-lifestyle-accent)", roleEn: "Lifestyle Accent (--brand-lifestyle-accent)", textHex: "#141414" },
  { group: "Secondary Colors", name: "Light Pink", hex: "#F6D0D7", roleZh: "輔助柔和色調 (Support Tone --brand-support-tone)", roleEn: "Support Tone (--brand-support-tone)", textHex: "#141414" },
];

function BrandPage(){
  const {brand, setBrand}=useBrand();
  const {isZh}=useLanguage();
  return <div className="space-y-9">
    <div className="docs-block">
      <Subheading
        title={isZh ? "官方品牌標誌資產 (5 Storefront Brands on lunio.com.tw)" : "Official Brand Logos & Assets (5 Storefront Brands)"}
        desc={isZh ? "lunio.com.tw 全站嚴格標準化使用五大官方 CI 標誌，提供高解析透明底 PNG 與無損向量 SVG 格式，色彩精準對應 Token。" : "Standardized official CI logos across the 5 brands sold on lunio.com.tw, provided in high-resolution transparent PNG and lossless vector SVG formats."}
      />
      <div className="grid gap-6 md:grid-cols-2">
        {brandLogos.map(l => (
          <div key={l.brand} className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3">
              <div>
                <span className="text-[15px] font-bold text-foreground">{l.brand}</span>
                <span className="ml-2 font-mono text-xs font-semibold text-primary">{l.token}</span>
              </div>
              <span className="rounded-md border border-border bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">PNG / SVG</span>
            </div>
            <p className="mt-2.5 text-[12px] leading-5 text-muted-foreground">{isZh ? l.descZh : l.descEn}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center justify-center rounded-lg border border-border/80 bg-white dark:bg-slate-100 p-4 text-center shadow-xs">
                <span className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">{isZh ? "主色標誌" : "Primary Fill"}</span>
                <div className="flex h-12 w-full items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.primarySrc} alt={`${l.brand} Primary Logo`} className="max-h-9 max-w-[130px] object-contain" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg p-4 text-center shadow-xs" style={{ background: l.bg }}>
                <span className="mb-2 text-[10px] font-bold uppercase tracking-wider text-white/70">{isZh ? "反白標誌" : "White Reversal"}</span>
                <div className="flex h-12 w-full items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.whiteSrc} alt={`${l.brand} White Logo`} className="max-h-9 max-w-[130px] object-contain drop-shadow-xs" />
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/50 pt-3">
              <span className="font-mono text-[11px] text-muted-foreground">{l.primarySrc}</span>
              <div className="flex items-center gap-1.5">
                <CopyButton value={l.primarySrc} label={isZh ? "路徑" : "Path"} />
                <Button variant="outline" size="sm" asChild className="h-8 px-2.5 text-xs text-muted-foreground">
                  <a href={l.svgSrc} download aria-label={`Download ${l.brand} SVG`}>SVG</a>
                </Button>
                <Button variant="outline" size="sm" asChild className="h-8 px-2.5 text-xs text-muted-foreground">
                  <a href={l.primarySrc} download aria-label={`Download ${l.brand} PNG`}>PNG</a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Dedicated Lunio Life CI Guideline Section */}
    <div className="docs-block" data-brand="lunio-life">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <Subheading
          title={isZh ? "Lunio Life 品牌識別規範 (Brand Identity Guidelines · data-brand=\"lunio-life\")" : "Lunio Life Brand Identity Guidelines (data-brand=\"lunio-life\")"}
          desc={isZh ? "因應 luniolife.com.tw 整併入 lunio.com.tw，所有屬於 Lunio Life 之商品頁 (PDP) 與分類頁均套用 data-brand=\"lunio-life\"，展現 Trendy、Charming、Innovation、Alive 四大品牌個性。" : "As luniolife.com.tw merges into lunio.com.tw, Lunio Life PDPs and category pages apply data-brand=\"lunio-life\" to express its Trendy, Charming, Innovation, and Alive personality."}
        />
        <Button
          type="button"
          variant={brand === "lunio-life" ? "default" : "outline"}
          size="sm"
          onClick={() => setBrand("lunio-life")}
        >
          {brand === "lunio-life"
            ? (isZh ? "✓ 已套用 Lunio Life 主題" : "✓ Lunio Life Theme Active")
            : (isZh ? "預覽全站切換為 Lunio Life" : "Preview Lunio Life Globally")}
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-5">
        {[
          { trait: "Trendy", zh: "時尚潮流 · 現代居家美學" },
          { trait: "Charming", zh: "迷人溫潤 · 柔和親膚色調" },
          { trait: "Innovation", zh: "創新科技 · 智能睡眠生活" },
          { trait: "Alive", zh: "充滿活力 · 讓舒適與時尚成為日常" },
        ].map((p) => (
          <div key={p.trait} className="rounded-xl border border-border/80 bg-card p-3.5 shadow-2xs">
            <div className="text-xs font-extrabold uppercase tracking-wider text-primary">{p.trait}</div>
            <div className="mt-1 text-xs text-muted-foreground">{p.zh}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {lunioLifeCiPalette.map((swatch) => (
          <div key={swatch.name} className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-2xs">
            <div
              className="flex h-20 flex-col justify-between p-3 border-b border-border/60"
              style={{ backgroundColor: swatch.hex, color: swatch.textHex }}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                {swatch.group}
              </span>
              <span className="font-mono text-xs font-bold">{swatch.hex}</span>
            </div>
            <div className="p-3">
              <div className="text-xs font-bold text-foreground">{swatch.name}</div>
              <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                {isZh ? swatch.roleZh : swatch.roleEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="docs-grille">{brands.map(b=><div key={b.id} data-brand={b.id} className="docs-block"><div className="brand-swatch"/><div className="mt-4 flex items-center justify-between gap-2"><div className="text-[16px] font-bold">{b.name}</div>{b.id===brand&&<span className="rounded-full bg-primary px-2 py-1 text-[10px] font-bold text-primary-foreground">{isZh ? "目前使用" : "ACTIVE"}</span>}</div><div className="mt-3 flex flex-wrap gap-2">{[[isZh ? "主色" : "Primary",b.primary],[isZh ? "強調色" : "Accent",b.accent],[isZh ? "表面色" : "Surface",b.surface],[isZh ? "文字色" : "Ink",b.ink]].map(p=><span key={p[0]} className="token-code">{p[0]} {p[1]}</span>)}</div><p className="mt-3 text-[12px] text-muted-foreground">{isZh ? (bStatusZh[b.status] || b.status) : b.status}</p></div>)}</div>
    <div className="docs-block">
      <Subheading
        title={isZh ? "品牌作用域主題模式" : "Scoped theme modes"}
        desc={isZh ? "單一頁面可同時展示特定品牌商品，無需重複複製任何元件結構。" : "One page can contain brand-specific products without duplicating any component."}
      />
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {brands.map(b=>(
          <div key={b.id} data-brand={b.id} className="rounded-[16px] border border-border/80 bg-[var(--brand-surface)] dark:border-[#2A344A] p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="eyebrow text-[var(--brand-ink)]">{b.name}</div>
              <p className="mt-3 text-[13px] font-bold text-[var(--brand-ink)]">{isZh ? "通用商品卡片模組" : "Reusable Product Card"}</p>
            </div>
            <Button className="mt-4 w-full text-xs">{isZh ? "檢視元件" : "Inspect"}</Button>
          </div>
        ))}
      </div>
    </div>
    <div className="docs-block">
      <Subheading
        title={isZh ? "語意化 API 規範" : "Semantic API"}
        desc={isZh ? "元件始終依賴語意角色，透過 CSS 變數無縫適配當前品牌作用域。" : "UI always references semantic roles; CSS custom properties adapt to the brand scope."}
      />
      <CodePanel code={'<div data-brand="lunio">...</div>\n<div data-brand="helix">...</div>\n<div data-brand="sunset">...</div>\n<div data-brand="bedding">...</div>\n<div data-brand="lunio-life">...</div>\n\n/* UI always references roles */\n.button { background: var(--primary); color: var(--primary-foreground); }'}/>
    </div>
    <SpecNote>
      {isZh
        ? "Lunio Life 整併進 lunio.com.tw 後，其專屬商品詳情頁 (PDP) 與分類頁直接掛載 data-brand=\"lunio-life\"（Plum Night #2D274A、Crocus Purple #9786F3、Titan White #CCD5F8），全站其餘頁面則維持預設 Lunio Taiwan CI (#1C46B4)。"
        : "With luniolife.com.tw merging into lunio.com.tw, Lunio Life PDPs and category pages mount data-brand=\"lunio-life\" (Plum Night #2D274A, Crocus Purple #9786F3, Titan White #CCD5F8) while the rest of the storefront keeps Lunio Taiwan CI (#1C46B4)."}
    </SpecNote>
  </div>;
}

const bStatusZh: Record<string, string> = {
  "Specified in DESIGN.md": "已明訂於 DESIGN.md 官方規範",
};

const roleLabelsZh: Record<TypeRole, string> = {
  display: "display · 主視覺超大展示標題",
  h1: "h1 · 頁面與商品主標題",
  h2: "h2 · 章節區塊主標題",
  h3: "h3 · 卡片與彈窗標題",
  h4: "h4 · 手機版商品列標題",
  "body-lg": "body-lg · 導言大段落內文",
  "body-md": "body-md · 標準閱讀內文",
  "body-sm": "body-sm · 次要輔助內文",
  label: "label · 互動按鈕與表單標籤",
  caption: "caption · 微型註記與說明",
  "price-xl": "price-xl · PDP 主售價特大字級",
  "price-md": "price-md · 商品卡片售價字級",
};

const weightLabelsZh: Record<string, string> = {
  regular: "常規體 Regular",
  medium: "中等體 Medium",
  semibold: "半粗體 Semibold",
  bold: "粗體 Bold",
  extrabold: "特粗體 ExtraBold",
};

const useCaseZh: Record<string, string> = {
  "Hero / Display": "首頁主視覺大標題、大檔促銷橫幅",
  "Page Title / PDP Heading": "頁面主標題、商品詳情頁 (PDP) 主標題",
  "Section Heading": "章節區塊標題、主打特色標題",
  "Modal / Card Header": "彈窗標題、商品卡片與側邊欄標題",
  "Mobile Product Row": "手機版橫向商品列標題",
  "Lead Paragraph": "導言大段落、核心產品宣言",
  "Body Copy": "標準閱讀內文、商品詳情說明敘述",
  "Supporting Copy": "次要輔助說明、規格明細與顧客評價",
  "Interactive Labels": "按鈕文字、表單標籤、分頁與規格篩選鈕",
  "Tertiary Caption": "輔助微文案、時間戳記、法規免責註記",
  "Main PDP Price": "商品詳情頁 (PDP) 主售價特大字級",
  "Product Card Price": "商品卡片與底部常駐列售價字級",
  "Main banner headline, strong promotional hero": "首頁主視覺大標題、大檔促銷 Hero",
  "Page title, collection header": "頁面主標題、床墊系列分類標題",
  "Section title, featured product title": "區塊標題、主打商品名稱",
  "Card title, modal title, drawer header": "商品卡標題、彈窗標題、側邊欄頂部",
  "Section subheader, feature callout": "區塊副標題、床墊特色強調",
  "Standard body text, product description": "標準內文、商品規格詳情敘述",
  "Secondary body, specs table, review body": "次要內文、規格明細表、顧客評價",
  "Form labels, table headers, breadcrumb": "表單標籤、表格標頭、麵包屑導覽",
  "Button text, tab labels, pill filters": "按鈕文字、分頁標籤、規格篩選鈕",
  "Footnotes, timestamps, legal disclaimer": "註解說明、發布時間、法規免責聲明",
  "Badge labels, category tags": "狀態徽章、商品特色標籤",
  "Fine print, copyright, SKU code": "微型註記、版權聲明、商品條碼"
};

function TypographyPage(){
  const {isZh}=useLanguage();
  const [device,setDevice]=useState<"mobile"|"desktop">("mobile");
  const [role,setRole]=useState<TypeRole>("h1");
  const defaultZh = "讓每一天，都有好睡眠。";
  const defaultEn = "Design for a better everyday sleep.";
  const [customSample,setCustomSample]=useState<string|null>(null);
  const sample = customSample !== null && customSample !== defaultZh && customSample !== defaultEn
    ? customSample
    : (isZh ? defaultZh : defaultEn);
  const [weight,setWeight]=useState<number|null>(null);
  const current=tokens.typography[role];
  const size=current[device][0],lh=current[device][1];
  return <div className="space-y-9">
    <div className="docs-block">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Subheading
          title={isZh ? "字體排印互動演練場" : "Typography playground"}
          desc={isZh ? "切換排印角色、視區尺寸或測試文字；所有數值直接提取自 tokens.json。" : "Change role, viewport or specimen text; values come from JSON tokens."}
        />
        <div className="flex items-center gap-2 rounded-[8px] border border-border p-1">
          <Button variant={device==='mobile'?'default':'outline'} onClick={()=>setDevice('mobile')} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold ${device==='mobile'?'bg-primary text-primary-foreground':'text-muted-foreground'}`}>
            <Smartphone size={15}/>{isZh ? "手機版 375px" : "375px"}
          </Button>
          <Button variant={device==='desktop'?'default':'outline'} onClick={()=>setDevice('desktop')} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold ${device==='desktop'?'bg-primary text-primary-foreground':'text-muted-foreground'}`}>
            <Monitor size={15}/>{isZh ? "電腦版 1440px" : "1440px"}
          </Button>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-[12px] font-bold text-foreground">
          {isZh ? "語意排印角色" : "Semantic role"}
          <Select value={role} onValueChange={v=>{setRole(v as TypeRole);setWeight(null)}}>
            <SelectTrigger className="mt-2" aria-label={isZh ? "選擇字體排印語意角色" : "Typography role"}><SelectValue placeholder={isZh ? "選擇排印角色" : "Select role"}/></SelectTrigger>
            <SelectContent>{roleNames.map(s=><SelectItem key={s} value={s}>{isZh ? (roleLabelsZh[s] || s) : s}</SelectItem>)}</SelectContent>
          </Select>
        </label>
        <label className="text-[12px] font-bold text-foreground">
          {isZh ? "測試範例文本" : "Sample text"}
          <Input className="mt-2" value={sample} onChange={e=>setCustomSample(e.target.value)}/>
        </label>
      </div>
      <div className="mt-6 rounded-[14px] border border-border/80 bg-slate-50/70 dark:bg-[#182030] dark:border-[#2A344A] p-7 shadow-xs" style={{maxWidth:device==='mobile'?375:undefined}}>
        <span className="eyebrow text-primary">{isZh ? `即時字級預覽 / ${device==='mobile'?'手機版 375px':'電腦版 1440px'}` : `LIVE SPECIMEN / ${device==='mobile'?'375px':'1440px'}`}</span>
        <div className="mt-7 break-words text-[var(--brand-ink)]" style={{fontSize:`${size}px`,lineHeight:`${lh}px`,fontWeight:weight??current.weight}}>
          {sample||(isZh ? defaultZh : defaultEn)}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4 rounded-lg border border-border/80 bg-slate-50/50 dark:bg-[#182030] dark:border-[#2A344A] p-4 text-center shadow-xs">
        <div>
          <div className="text-[22px] font-bold text-primary">{size}px</div>
          <div className="text-[11px] text-muted-foreground">{isZh ? "字級大小" : "Font size"}</div>
        </div>
        <div>
          <div className="text-[22px] font-bold text-primary">{lh}px</div>
          <div className="text-[11px] text-muted-foreground">{isZh ? "行高高度" : "Line height"}</div>
        </div>
        <div>
          <div className="text-[22px] font-bold text-primary">{weight??current.weight}</div>
          <div className="text-[11px] text-muted-foreground">{isZh ? "字重規格" : "Weight"}</div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <span className="token-code">.typo-{role}</span>
        <CopyButton value={`className="typo-${role}"`} label={isZh ? "複製 Class" : "Copy class"}/>
      </div>
    </div>
    <div className="docs-block">
      <Subheading
        title={isZh ? "5 組官方 MiSansTC 字重" : "Five official MiSansTC weights"}
        desc={isZh ? "字體家族全品牌統一，不隨主題更動。400 至 800 字重為全站共享的底層排印尺度。" : "The font family never changes with brand. Weight 400–800 is the shared primitive scale."}
      />
      <div className="space-y-3">
        {Object.entries(tokens.weights).map(([k,v])=>(
          <Button type="button" variant="outline" aria-pressed={weight===v} key={k} onClick={()=>setWeight(v)} className={`flex w-full flex-wrap items-center justify-between gap-3 rounded-lg border p-4 text-left transition ${weight===v?'border-2 border-primary bg-primary/10 dark:bg-primary/15 shadow-xs':'border-border/80 hover:border-primary/40'}`}>
            <div>
              <div className="text-xs font-semibold text-muted-foreground">{isZh ? `${weightLabelsZh[k] || k.toUpperCase()} / ${v}` : `${k.toUpperCase()} / ${v}`}</div>
              <div className="mt-1 text-[23px] text-foreground" style={{fontWeight:v}}>{isZh ? "生活，應該更舒適。" : "Everyday life should be comfortable."}</div>
            </div>
            <span className="token-code">--font-weight-{k}</span>
          </Button>
        ))}
      </div>
    </div>
    <div className="docs-block overflow-x-auto">
      <Subheading
        title={isZh ? "響應式字體排印規範表" : "Responsive typography specification"}
        desc={isZh ? "來源：DESIGN.md v1.4；各欄位數值為 字級 / 行高 (px)。" : "Source: reviewed DESIGN.md v1.4; values are font size / line height in px."}
      />
      <table className="token-table min-w-[670px]">
        <thead>
          <tr>
            <th>{isZh ? "角色 (Role)" : "Role"}</th>
            <th>{isZh ? "手機版 375" : "Mobile 375"}</th>
            <th>{isZh ? "電腦版 1440" : "Desktop 1440"}</th>
            <th>{isZh ? "字重" : "Weight"}</th>
            <th>{isZh ? "應用場景" : "Use case"}</th>
          </tr>
        </thead>
        <tbody>
          {roleNames.map(key=>{
            const t=tokens.typography[key];
            return <tr key={key}>
              <td className="font-bold">{isZh ? (roleLabelsZh[key] || key) : key}</td>
              <td>{t.mobile[0]} / {t.mobile[1]}</td>
              <td>{t.desktop[0]} / {t.desktop[1]}</td>
              <td>{t.weight}</td>
              <td className="text-muted-foreground">{isZh ? (useCaseZh[t.use] || t.use) : t.use}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
    <SpecNote>
      {isZh
        ? "即時字體排印在 public/fonts 中加入 MiSansTC WOFF2 授權字型檔時生效。在此之前以系統後備字型顯示；Token 尺寸數值與字重 CSS 均已生效可用。"
        : "Live typography uses MiSansTC only when your licensed WOFF2 files have been added to public/fonts. Until then, system fallback displays; the token dimensions and font-weight CSS remain available. Pixel-perfect Figma comparison requires the actual font files."}
    </SpecNote>
  </div>;
}

function ColorsPage(){
  const {brand}=useBrand();
  const {isZh}=useLanguage();
  const current=tokens.brands[brand];
  const entries=[
    [isZh ? "主色 (Primary)" : "Primary",current.primary,'--primary'],
    [isZh ? "主前景色 (On Primary)" : "On Primary",current.onPrimary,'--primary-foreground'],
    [isZh ? "強調色 (Accent)" : "Accent",current.accent,'--accent'],
    [isZh ? "強調前景色 (On Accent)" : "On Accent",current.onAccent,'--accent-foreground'],
    [isZh ? "表面底色 (Surface)" : "Surface",current.surface,'--brand-surface'],
    [isZh ? "文字顏色 (Ink)" : "Ink",current.ink,'--brand-ink'],
    [isZh ? "畫布底色 (Canvas)" : "Canvas",tokens.foundation.canvas,'--background'],
    [isZh ? "邊框線色 (Border)" : "Border",tokens.foundation.border,'--border']
  ];
  const checks=brands.map(b=>({name:b.name,primary:contrastRatio(b.primary,b.onPrimary),accent:contrastRatio(b.accent,b.onAccent),status:b.status}));
  return <div className="space-y-9">
    <div className="docs-block">
      <Subheading
        title={isZh ? `${current.name} · 語意化調色盤` : `${current.name} · semantic palette`}
        desc={isZh ? "使用頂部導覽列的品牌切換器，可即時檢視各品牌的精確語意色彩數值。" : "Use the Brand Switcher in the top bar to inspect each brand's exact semantic values."}
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {entries.map(([label,hex,key])=>(
          <div key={label} className="overflow-hidden rounded-lg border border-border/80 bg-slate-50/50 dark:bg-[#182030] dark:border-[#2A344A] shadow-xs">
            <div className="h-28 relative border-b border-border/70" style={{background:hex}}/>
            <div className="p-4">
              <div className="text-[13px] font-bold">{label}</div>
              <div className="mt-1 font-mono text-xs text-muted-foreground">{hex}</div>
              <div className="mt-2"><CopyButton label={key} value={`var(${key})`}/></div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="docs-block overflow-x-auto">
      <Subheading
        title={isZh ? "無障礙文字前景色搭配檢驗" : "Accessible foreground pairings"}
        desc={isZh ? "依據 WCAG 相對亮度演算法計算不透明色。一般文字對比度要求至少達到 4.5:1。" : "Calculated using WCAG relative luminance for opaque colors. Minimum 4.5:1 for ordinary text."}
      />
      <table className="token-table min-w-[620px]">
        <thead>
          <tr>
            <th>{isZh ? "品牌" : "Brand"}</th>
            <th>{isZh ? "主要色對比 (Primary)" : "Primary pair"}</th>
            <th>{isZh ? "強調色對比 (Accent)" : "Accent pair"}</th>
            <th>{isZh ? "核准狀態" : "Status"}</th>
          </tr>
        </thead>
        <tbody>
          {checks.map(b=>(
            <tr key={b.name}>
              <td className="font-semibold">{b.name}</td>
              <td><span className="font-bold">{b.primary.toFixed(2)}:1</span> <span className="text-[#147b53] dark:text-[#4ADE80] font-bold">{isZh ? "通過 AA" : "PASS"}</span></td>
              <td>{b.accent.toFixed(2)}:1 <span className="text-[#147b53] dark:text-[#4ADE80] font-bold">{isZh ? "通過 AA" : "PASS"}</span></td>
              <td className="text-xs text-muted-foreground">{isZh ? (bStatusZh[b.status] || b.status) : b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-xs text-muted-foreground">
        {isZh
          ? "Sunset 晨曦橘必須搭配深墨色文字 (#1C1526)。Helix 強調薰衣草紫 (#9362D9) 與 Lunio Life 強調番紅花紫 (#9786F3) 皆必須搭配深黑文字 (#000000 / #141414)。切勿在所有品牌中盲目預設套用白色文字。"
          : "Sunset uses dark text (#1C1526) on orange. Helix accent (#9362D9) and Lunio Life Crocus Purple accent (#9786F3) use dark/black text (#000000 / #141414). Do not default to white text for all brands."}
      </p>
    </div>
    <div className="docs-block">
      <Subheading
        title={isZh ? "狀態與促銷色彩 Token" : "Status & promotional sale tokens"}
        desc={isZh ? "符合 WCAG 2.2 AA 對比標準之語意化狀態提示色。促銷紅 (Sale #E53935) 與表單錯誤紅 (Error #B42318) 嚴格分離。" : "WCAG 2.2 AA compliant semantic status tokens. Promotional Sale (#E53935) is strictly decoupled from form Error (#B42318)."}
      />
      <div className="flex flex-wrap gap-3">
        {[
          [isZh ? "成功 (Success)" : "Success",tokens.foundation.success],
          [isZh ? "錯誤 (Error)" : "Error",tokens.foundation.error],
          [isZh ? "促銷優惠 (Sale)" : "Sale",tokens.foundation.sale],
          [isZh ? "警示 (Warning)" : "Warning",tokens.foundation.warning],
          [isZh ? "資訊 (Info)" : "Info",tokens.foundation.info]
        ].map(([k,v])=>(
          <div key={k} className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-slate-50/80 dark:bg-[#182030] dark:border-[#2A344A] px-3 py-2 text-[12px] shadow-xs">
            <span className="size-3 rounded-full" style={{background:v}}/>
            {k} <span className="font-mono text-muted-foreground">{v}</span>
          </div>
        ))}
      </div>
    </div>
    <CodePanel label={isZh ? "設計 TOKEN 範例" : "DESIGN TOKEN EXAMPLE"} code={'[data-brand="lunio-life"] {\n  --primary: #2D274A; /* Plum Night */\n  --primary-foreground: #FFFFFF; /* 13.99:1 AAA */\n  --accent: #9786F3; /* Crocus Purple */\n  --accent-foreground: #141414; /* 6.15:1 AA */\n}\n\n:root {\n  --sale: #E53935; /* 現省 / 促銷紅，與 --destructive (#B42318) 分離 */\n  --sale-foreground: #FFFFFF;\n}'}/>
  </div>;
}

function SpacingPage(){
  const {isZh}=useLanguage();
  return <div className="space-y-9">
    <div className="docs-block">
      <Subheading
        title={isZh ? "4px 空間節奏" : "4px rhythm"}
        desc={isZh ? "間距是全站統一的底層基準，而非各頁面隨意定義的隨機數值。" : "Spacing is a foundation, not a series of page-specific measurements."}
      />
      <div className="space-y-4">
        {Object.entries(tokens.spacing).map(([k,v])=>(
          <div key={k} className="flex items-center gap-4">
            <span className="w-16 font-mono text-[12px] font-bold text-foreground">s-{k}</span>
            <span className="w-14 text-[12px] text-muted-foreground">{v}px</span>
            <div className="h-5 rounded-[3px] bg-primary/85" style={{width:`${v*3}px`,maxWidth:'65%'}}/>
          </div>
        ))}
      </div>
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      <div className="docs-block">
        <Subheading
          title={isZh ? "控制元件圓角" : "Control radius"}
          desc={isZh ? "按鈕 · 輸入框 · 下拉選單 · 計數器" : "Button · Input · Select · Stepper"}
        />
        <div className="flex size-24 items-center justify-center border-2 border-primary bg-primary/10 dark:bg-primary/15 text-[16px] font-bold text-primary" style={{borderRadius:tokens.radii.control}}>8px</div>
      </div>
      <div className="docs-block">
        <Subheading
          title={isZh ? "容器元件圓角" : "Container radius"}
          desc={isZh ? "卡片 · 彈窗 · 側邊欄抽屜 · 折疊面版" : "Card · Modal · Sheet · Accordion"}
        />
        <div className="flex size-24 items-center justify-center border-2 border-primary bg-primary/10 dark:bg-primary/15 text-[16px] font-bold text-primary" style={{borderRadius:tokens.radii.container}}>16px</div>
      </div>
      <div className="docs-block">
        <Subheading
          title={isZh ? "膠囊與徽章圓角" : "Pill & Badge radius"}
          desc={isZh ? "徽章 (Badge) · 促銷標籤 · 篩選膠囊 (rounded-full)" : "Badge · Sale Tag · Filter Pill (rounded-full)"}
        />
        <div className="flex h-12 w-32 items-center justify-center border-2 border-primary bg-primary/10 dark:bg-primary/15 text-[14px] font-bold text-primary" style={{borderRadius:tokens.radii.pill}}>9999px</div>
      </div>
    </div>
    <div className="docs-block">
      <Subheading
        title={isZh ? "響應式中斷點 (Breakpoints)" : "Responsive breakpoints"}
        desc={isZh ? "全站採用三段主流中斷點規格，保證在各種裝置上具備最佳版面閱讀性。" : "Responsive viewports ensuring maximum legibility across mobile, tablet, and desktop."}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ['375px', isZh ? "手機版參考視區" : "Mobile reference", isZh ? "單欄垂直堆疊佈局，互動控制項高度最低需達 44px" : "Stacked structure and 44px minimum controls"],
          ['1024px', isZh ? "排印與版面中斷點" : "Typography breakpoint", isZh ? "電腦版字級 Token 與多欄網格佈局在此切換" : "Desktop size tokens switch here"],
          ['1440px', isZh ? "電腦版參考視區" : "Desktop reference", isZh ? "全站主內容最大寬度上限與多欄式商品網格系統" : "Content max-width and multicolumn systems"]
        ].map(x=>(
          <div key={x[0]} className="rounded-lg border border-border/80 bg-slate-50/60 dark:bg-[#182030] dark:border-[#2A344A] p-5 shadow-xs">
            <div className="text-[26px] font-bold text-primary">{x[0]}</div>
            <div className="mt-2 font-bold">{x[1]}</div>
            <div className="mt-2 text-[12px] leading-6 text-muted-foreground">{x[2]}</div>
          </div>
        ))}
      </div>
    </div>
    <SpecNote>
      {isZh
        ? "375px 與 1440px 為官方標準參考視區，並非唯一支援的螢幕寬度。在發布前請務必檢驗 320px 緊縮重排與中階平板寬度的響應表現。"
        : "Responsive 375px/1440px are reference viewports, not the only supported widths. Always test 320 CSS px reflow plus intermediate tablet widths."}
    </SpecNote>
  </div>;
}

function ComponentsPage(){
 const {isZh}=useLanguage();
 const [state,setState]=useState<'default'|'disabled'|'loading'>('default');
 const [qty,setQty]=useState(1);
 const [error,setError]=useState(false);
 const [mattressSize,setMattressSize]=useState('5');
 const [terms,setTerms]=useState(false);
 const [radioSize,setRadioSize]=useState('5.0');
 const [radioFeel,setRadioFeel]=useState('medium-firm');
 const [skeletonDemo,setSkeletonDemo]=useState(false);

 return <div className="space-y-9">
  <div className="docs-block">
    <Subheading
      title={isZh ? "shadcn/ui — 按鈕變體 (Button Variants)" : "shadcn/ui — Button variants"}
      desc={isZh ? "官方源代碼擁有的 shadcn/ui 按鈕，基於 Radix Slot + CVA 建置。所有狀態與外觀直接套用 Lunio 語意化變數。" : "Official source-owned shadcn/ui Button on Radix Slot + CVA. States and appearance consume Lunio semantic variables."}
    />
   <Tabs value={state} onValueChange={(v)=>setState(v as typeof state)}>
    <TabsList aria-label="Button state">
      <TabsTrigger value="default">{isZh ? "預設狀態" : "default"}</TabsTrigger>
      <TabsTrigger value="disabled">{isZh ? "停用狀態" : "disabled"}</TabsTrigger>
      <TabsTrigger value="loading">{isZh ? "載入中" : "loading"}</TabsTrigger>
    </TabsList>
    <TabsContent value={state} className="mt-5">
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border/80 bg-slate-50/70 dark:bg-[#182030] dark:border-[#2A344A] p-6 shadow-xs">
        <Button disabled={state!=='default'}>{state==='loading'?(isZh ? "處理中…" : "Loading…"):(isZh ? "立即選購" : "Buy Now")} <ArrowRight size={17}/></Button>
        <Button variant="outline" disabled={state!=='default'}>{isZh ? "了解更多" : "Learn More"}</Button>
        <Button variant="pill" disabled={state!=='default'}>{isZh ? "官網限定" : "Official Exclusive"}</Button>
        <Button variant="secondary">{isZh ? "次要按鈕" : "Secondary"}</Button>
        <Button variant="ghost">{isZh ? "返回" : "Back"}</Button>
        <Button variant="link">{isZh ? "連結按鈕" : "Link button"}</Button>
      </div>
    </TabsContent>
   </Tabs>
   <CodePanel code={'import { Button } from "@/components/ui/button";\n\n<Button variant="default">立即選購</Button>\n<Button variant="outline">了解更多</Button>\n<Button variant="pill">官網限定</Button>'}/>
  </div>

  <div className="docs-grille">
   <Card className="gap-0 py-0"><CardContent className="p-6">
    <Subheading title={isZh ? "輸入框 + 標籤 + 表單驗證" : "Input + Label + validation"}/>
    <Label htmlFor="full-name">{isZh ? "收件人姓名" : "Full Name"}</Label>
    <Input id="full-name" placeholder={isZh ? "請輸入姓名" : "Enter recipient full name"} className="mt-2" aria-invalid={error} aria-describedby="full-name-message"/>
    <p id="full-name-message" className={`mt-2 typo-body-sm ${error?'text-destructive':'text-muted-foreground'}`}>
      {error ? (isZh ? "此欄位為必填項目" : "This field is required") : (isZh ? "範例必填欄位與無障礙驗證" : "Example required field and validation")}
    </p>
    <Button className="mt-5" variant="outline" onClick={()=>setError(!error)}>
      {error ? (isZh ? "清除錯誤狀態" : "Clear error") : (isZh ? "模擬驗證錯誤" : "Show error")}
    </Button>
   </CardContent></Card>
   <Card className="gap-0 py-0"><CardContent className="p-6">
    <Subheading title={isZh ? "下拉選單 + 數量計數器" : "Radix Select + quantity"}/>
    <Label htmlFor="size-selector-demo">{isZh ? "床墊尺寸" : "Mattress Size"}</Label>
    <Select value={mattressSize} onValueChange={setMattressSize}>
     <SelectTrigger id="size-selector-demo" className="mt-2"><SelectValue placeholder={isZh ? "選擇尺寸" : "Select size"}/></SelectTrigger>
     <SelectContent position="popper">
      {[
        ['3', isZh ? "標準單人 3 尺" : "Standard Single 3 ft"],
        ['3.5', isZh ? "單人加大 3.5 尺" : "Single XL 3.5 ft"],
        ['5', isZh ? "標準雙人 5 尺" : "Standard Double 5 ft"],
        ['6', isZh ? "雙人加大 6 尺" : "Queen Size 6 ft"],
        ['7', isZh ? "雙人特大 7 尺" : "King Size 7 ft"]
      ].map(([v,text])=><SelectItem key={v} value={v}>{text}</SelectItem>)}
     </SelectContent>
    </Select>
    <Label className="mt-5 mb-2">{isZh ? "購買數量" : "Quantity"}</Label>
    <QuantityStepper value={qty} onChange={setQty}/>
   </CardContent></Card>
  </div>

  <div className="docs-block">
    <Subheading
      title={isZh ? "手風琴折疊 — 常見問答與商品規格" : "Accordion — FAQs & specifications"}
      desc={isZh ? "基於 @radix-ui/react-accordion 的官方 shadcn/ui 手風琴，具備平滑 CSS 動畫與無障礙鍵盤導覽。" : "Official shadcn/ui Accordion powered by @radix-ui/react-accordion with smooth animations and keyboard control."}
    />
   <Accordion type="single" collapsible defaultValue="faq-1" className="w-full">
    <AccordionItem value="faq-1">
     <AccordionTrigger>{isZh ? "Lunio Gen 4 石墨烯天然乳膠床墊適合哪些睡姿？" : "Which sleeping positions is Lunio Gen 4 Mattress best suited for?"}</AccordionTrigger>
     <AccordionContent>
      {isZh
        ? "適合仰睡、側睡與趴睡。泰國天然乳膠的高彈力特性，搭配 Wave-Zone 分區減壓平衡棉，能依據肩膀與臀部重量自然下沉，維持脊椎健康生理曲線。"
        : "Suitable for back, side, and stomach sleepers. Premium Thai natural latex paired with Wave-Zone pressure-relief foam conforms naturally to shoulders and hips while maintaining ergonomic spinal alignment."}
     </AccordionContent>
    </AccordionItem>
    <AccordionItem value="faq-2">
     <AccordionTrigger>{isZh ? "100 晚安心試睡體驗如何申請退換？" : "How does the 100-night risk-free trial and return process work?"}</AccordionTrigger>
     <AccordionContent>
      {isZh
        ? "自簽收次日起享有 100 晚臥室安心試睡。建議試睡滿 30 晚使骨骼肌肉充分適應。試睡期間搭配保潔墊保持清潔，若仍不滿意，專人免費到府收回並全額退款。"
        : "Enjoy 100 nights of trial sleeping starting the day after delivery. We recommend sleeping on it for at least 30 nights. Keep it clean with a mattress protector; if not satisfied, our team provides free home pickup and a 100% full refund."}
     </AccordionContent>
    </AccordionItem>
    <AccordionItem value="faq-3">
     <AccordionTrigger>{isZh ? "全台免運配送與舊床回收服務範圍？" : "What does free delivery and old mattress removal cover across Taiwan?"}</AccordionTrigger>
     <AccordionContent>
      {isZh
        ? "全台灣本島皆享免運費專人配送到府定位，並免費協助將同尺寸舊床墊搬運至一樓交由環保局大型廢棄物回收。"
        : "Free home delivery and bedroom positioning across Taiwan main island. We also provide free assistance moving your old same-size mattress down to the ground floor for municipal waste collection."}
     </AccordionContent>
    </AccordionItem>
   </Accordion>
   <CodePanel code={'import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";\n\n<Accordion type="single" collapsible>\n  <AccordionItem value="specs">\n    <AccordionTrigger>床墊規格說明</AccordionTrigger>\n    <AccordionContent>泰國原產天然乳膠 + 航太石墨烯調溫棉...</AccordionContent>\n  </AccordionItem>\n</Accordion>'}/>
  </div>

  <div className="docs-block">
    <Subheading
      title={isZh ? "單選群組與提示 — 台灣床墊尺寸與軟硬度" : "RadioGroup & Tooltip — Taiwan size & firmness"}
      desc={isZh ? "具備高對比指示器狀態的 @radix-ui/react-radio-group，搭配上下文即時 @radix-ui/react-tooltip。" : "Accessible @radix-ui/react-radio-group with high-contrast indicator states and contextual @radix-ui/react-tooltip."}
    />
   <div className="grid gap-6 md:grid-cols-2">
    <div className="rounded-xl border border-border/80 bg-slate-50/70 dark:bg-[#182030] dark:border-[#2A344A] p-5">
     <div className="flex items-center justify-between mb-3">
      <Label className="font-bold">{isZh ? "台灣標準床墊尺寸 (SKU 實測)" : "Taiwan Standard Mattress Sizes (SKU-Verified)"}</Label>
      <Tooltip>
       <TooltipTrigger asChild>
        <Button variant="ghost" size="sm" className="h-auto p-0 typo-caption font-normal text-primary hover:bg-transparent hover:underline outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={isZh ? "查看台灣床墊尺與公分換算尺寸指南" : "View Taiwan mattress size conversion guide"}>
         <HelpCircle size={14} className="mr-1"/> {isZh ? "尺寸指南" : "Size Guide"}
        </Button>
       </TooltipTrigger>
       <TooltipContent>
        {isZh ? "台灣規格：單人 89×188、單大 104×188、雙人 150×188 (依 SKU 實測)。請務必丈量床架內徑。" : "Taiwan SKU specs: Single 89×188, Single XL 104×188, Double 150×188 cm. Measure bed frame inner space."}
       </TooltipContent>
      </Tooltip>
     </div>
     <RadioGroup value={radioSize} onValueChange={setRadioSize} className="gap-2.5">
      {[
        ['3.0', isZh ? '標準單人 3 尺 (89×188 cm)' : 'Standard Single 3 ft (89×188 cm)'],
        ['3.5', isZh ? '單人加大 3.5 尺 (104×188 cm)' : 'Single XL 3.5 ft (104×188 cm)'],
        ['5.0', isZh ? '標準雙人 5 尺 (150×188 cm)' : 'Standard Double 5 ft (150×188 cm)'],
        ['6.0', isZh ? '雙人加大 6 尺 (180×188 cm)' : 'Queen Size 6 ft (180×188 cm)'],
        ['7.0', isZh ? '雙人特大 7 尺 (180×210 cm)' : 'King Size 7 ft (180×210 cm)']
      ].map(([v,label])=>(
       <Label key={v} htmlFor={`comp-size-${v}`} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${radioSize===v?'border-primary ring-1 ring-primary bg-primary/5 dark:bg-primary/10 shadow-xs':'border-border/80 bg-card hover:border-primary/40'}`}>
        <RadioGroupItem value={v} id={`comp-size-${v}`}/>
        <span className="typo-label font-medium">{label}</span>
       </Label>
      ))}
     </RadioGroup>
    </div>

    <div className="rounded-xl border border-border/80 bg-slate-50/70 dark:bg-[#182030] dark:border-[#2A344A] p-5">
     <div className="flex items-center justify-between mb-3">
      <Label className="font-bold">{isZh ? "床墊睡感軟硬度" : "Mattress Firmness"}</Label>
      <Tooltip>
       <TooltipTrigger asChild>
        <Button variant="ghost" size="sm" className="h-auto p-0 typo-caption font-normal text-muted-foreground hover:bg-transparent hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={isZh ? "睡感評估提示" : "Firmness assessment note"}>
         <Info size={14} className="mr-1"/> {isZh ? "睡感評估" : "Firmness Guide"}
        </Button>
       </TooltipTrigger>
       <TooltipContent>
        {isZh ? "90% 台灣睡眠者首選適中微挺睡感。" : "90% of Taiwan sleepers prefer the medium-firm comfort level."}
       </TooltipContent>
      </Tooltip>
     </div>
     <RadioGroup value={radioFeel} onValueChange={setRadioFeel} className="gap-2.5">
      {[
       ['medium-firm', isZh ? '適中微挺 (Medium-Firm)' : 'Medium-Firm Comfort', isZh ? '人體工學黃金比例，平衡包覆與支撐' : 'Ergonomic golden balance of contouring & support'],
       ['firm-support', isZh ? '深度強化支撐 (Firm Support)' : 'Firm Orthopedic Support', isZh ? '強化腰椎護脊，扎實挺拔不塌陷' : 'Reinforced lumbar protection, robust without sinking']
      ].map(([v,title,desc])=>(
       <Label key={v} htmlFor={`comp-feel-${v}`} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition ${radioFeel===v?'border-primary ring-1 ring-primary bg-primary/5 dark:bg-primary/10 shadow-xs':'border-border/80 bg-card hover:border-primary/40'}`}>
        <RadioGroupItem value={v} id={`comp-feel-${v}`} className="mt-0.5"/>
        <div>
         <div className="typo-label font-semibold text-foreground">{title}</div>
         <div className="typo-caption text-muted-foreground mt-0.5">{desc}</div>
        </div>
       </Label>
      ))}
     </RadioGroup>
    </div>
   </div>
   <CodePanel code={'import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";\nimport { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";\n\n<RadioGroup value={selected} onValueChange={setSelected}>\n  <RadioGroupItem value="5.0" id="size-5" />\n</RadioGroup>'}/>
  </div>

  <div className="docs-block">
    <Subheading
      title={isZh ? "麵包屑 — 無障礙商城路徑導覽" : "Breadcrumb — Accessible store navigation"}
      desc={isZh ? "語意化 <nav> 結合 @radix-ui/react-slot，支援 ARIA 標籤、響應式省略截斷與 Next.js Link 路由。" : "Semantic <nav> on @radix-ui/react-slot with ARIA labels, responsive ellipsis truncation and Next.js Link routing."}
    />
   <div className="space-y-4 rounded-xl border border-border/80 bg-slate-50/70 dark:bg-[#182030] dark:border-[#2A344A] p-5">
    <Breadcrumb>
     <BreadcrumbList>
      <BreadcrumbItem>
       <BreadcrumbLink asChild><Link href="/">{isZh ? "首頁" : "Home"}</Link></BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
       <BreadcrumbLink asChild><Link href="/docs/commerce">{isZh ? "床墊系列" : "Mattresses"}</Link></BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
       <BreadcrumbLink asChild><Link href="/docs/commerce">{isZh ? "天然乳膠床墊" : "Latex Series"}</Link></BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
       <BreadcrumbPage>{isZh ? "Lunio Gen 4 石墨烯乳膠床墊" : "Lunio Gen 4 Graphene Latex Mattress"}</BreadcrumbPage>
      </BreadcrumbItem>
     </BreadcrumbList>
    </Breadcrumb>
    <Separator className="bg-border/60" />
    <div>
     <span className="typo-caption text-muted-foreground mb-2 block">{isZh ? "長路徑省略截斷展示 (BreadcrumbEllipsis)：" : "Long path truncation preview (BreadcrumbEllipsis):"}</span>
     <Breadcrumb>
      <BreadcrumbList>
       <BreadcrumbItem>
        <BreadcrumbLink asChild><Link href="/">{isZh ? "首頁" : "Home"}</Link></BreadcrumbLink>
       </BreadcrumbItem>
       <BreadcrumbSeparator />
       <BreadcrumbItem>
        <BreadcrumbEllipsis />
       </BreadcrumbItem>
       <BreadcrumbSeparator />
       <BreadcrumbItem>
        <BreadcrumbPage>{isZh ? "Lunio Gen 4 石墨烯乳膠床墊" : "Lunio Gen 4 Graphene Latex"}</BreadcrumbPage>
       </BreadcrumbItem>
      </BreadcrumbList>
     </Breadcrumb>
    </div>
   </div>
   <CodePanel code={'import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "@/components/ui/breadcrumb";\n\n<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem><BreadcrumbLink asChild><Link href="/">首頁</Link></BreadcrumbLink></BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem><BreadcrumbPage>Lunio Gen 4</BreadcrumbPage></BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>'}/>
  </div>

  <div className="docs-block">
    <Subheading
      title={isZh ? "骨架屏 — 非同步 UI 載入狀態" : "Skeleton — Asynchronous UI loading state"}
      desc={isZh ? "在向 WooCommerce 獲取商品目錄、價格與顧客評價時實現零佈局位移 (Zero Layout Shift)。" : "Zero layout shift while fetching WooCommerce product catalog, prices and customer reviews."}
    />
   <div className="flex items-center gap-3 mb-4">
    <Button variant="outline" size="sm" onClick={()=>setSkeletonDemo(!skeletonDemo)}>
     <RefreshCw size={14} className={skeletonDemo?'animate-spin':''}/>
     {skeletonDemo ? (isZh ? '切換為已載入展示 (Loaded)' : 'Switch to Loaded View') : (isZh ? '切換為載入中骨架屏 (Skeleton)' : 'Switch to Loading Skeleton')}
    </Button>
    <span className="typo-caption text-muted-foreground">
      {skeletonDemo ? (isZh ? '目前正在顯示 Skeleton 佔位骨架屏' : 'Currently showing Skeleton placeholder') : (isZh ? '目前正在顯示已載入完成資料' : 'Currently showing loaded data')}
    </span>
   </div>
   <div className="grid gap-5 sm:grid-cols-2">
    {skeletonDemo ? (
     <>
      <ProductCardSkeleton />
      <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs">
       <div className="space-y-3">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-1/2" />
       </div>
       <div className="pt-6">
        <Skeleton className="h-10 w-full rounded-md" />
       </div>
      </div>
     </>
    ) : (
     <>
      <ProductCard product={{name: isZh ? "Gen 4 石墨烯乳膠床墊" : "Gen 4 Graphene Latex Mattress", description: isZh ? "泰國天然乳膠與專利石墨烯調溫舒壓棉" : "Thai natural latex & graphene thermoregulation foam", priceAmount: 21990, compareAtAmount: 28980, currencyCode: "NT", discountBadge: isZh ? "現省 NT6,990" : "SAVE NT6,990", badge: isZh ? "熱銷推薦" : "TOP SELLER"}}/>
      <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs">
       <div className="space-y-2">
        <Badge variant="outline">{isZh ? "評價載入完成" : "Reviews Loaded"}</Badge>
        <h4 className="typo-h4 text-foreground">{isZh ? "10,000+ 睡眠者五星好評推薦" : "10,000+ Five-Star Sleepers"}</h4>
        <p className="typo-body-sm text-muted-foreground">{isZh ? "「換了 Lunio Gen 4 之後，早上醒來腰部酸痛感真的完全消失了，支撐力非常優秀！」" : "“After switching to Lunio Gen 4, morning lower back stiffness completely vanished. The ergonomic support is outstanding!”"}</p>
       </div>
       <div className="pt-4 border-t border-border/60 flex items-center justify-between">
        <span className="typo-caption text-muted-foreground">{isZh ? "台北市 · 廖小姐 (已驗證買家)" : "Taipei City · Ms. Liao (Verified Buyer)"}</span>
        <span className="typo-caption text-amber-500 font-bold">★★★★★ 5.0</span>
       </div>
      </div>
     </>
    )}
   </div>
  </div>

  <div className="docs-block">
    <Subheading
      title={isZh ? "輪播元件 — 商品多視圖展示" : "Carousel — Product media showcase"}
      desc={isZh ? "支援觸控滑動與鍵盤無障礙導覽，基於 embla-carousel-react 與 shadcn 按鈕建置。" : "Touch & keyboard enabled carousel powered by embla-carousel-react and shadcn Button."}
    />
   <ProductCarousel />
   <CodePanel code={'import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";\n\n<Carousel opts={{ align: "start", loop: true }}>\n  <CarouselContent>\n    <CarouselItem className="md:basis-1/2">...</CarouselItem>\n  </CarouselContent>\n  <CarouselPrevious />\n  <CarouselNext />\n</Carousel>'}/>
  </div>

  <div className="docs-block">
    <Subheading
      title={isZh ? "徽章 (rounded-full)、核取方塊與文字區域" : "Badge (rounded-full), Checkbox and Textarea"}
      desc={isZh ? "採用共享 shadcn/ui 基底，Badge 統一採用膠囊圓角 (--radius-pill: 9999px)。促銷優惠使用專屬 sale (#E53935) 變體，與表單錯誤紅 (destructive #B42318) 嚴格分離。" : "Shared shadcn/ui primitives. Badge standardizes on rounded-full (--radius-pill: 9999px). Promotional discounts use the dedicated sale (#E53935) variant, decoupled from destructive error (#B42318)."}
    />
   <div className="flex flex-wrap gap-3">
    <Badge>{isZh ? "官網限定" : "Official Exclusive"}</Badge>
    <Badge variant="sale">{isZh ? "現省 NT6,990" : "SAVE NT6,990"}</Badge>
    <Badge variant="discount">{isZh ? "雙 11 特惠" : "11.11 SALE"}</Badge>
    <Badge variant="outline">{isZh ? "網路熱銷" : "Top Seller"}</Badge>
    <Badge variant="success">{isZh ? "現貨供應" : "In Stock"}</Badge>
    <Badge variant="destructive">{isZh ? "已售完" : "Sold Out"}</Badge>
    <Badge variant="secondary">{isZh ? "限時活動" : "Limited Promo"}</Badge>
   </div>
   <Separator className="my-6"/>
   <div className="grid gap-5 sm:grid-cols-2">
    <div>
      <Label htmlFor="component-feedback">{isZh ? "設計意見回饋" : "Design Feedback"}</Label>
      <Textarea className="mt-2" id="component-feedback" placeholder={isZh ? "請填寫意見…" : "Enter your feedback…"} rows={3}/>
    </div>
    <div className="flex items-start gap-3">
      <Checkbox id="component-terms" checked={terms} onCheckedChange={(v)=>setTerms(v===true)}/>
      <Label htmlFor="component-terms" className="leading-6">{isZh ? "我已閱讀設計系統的使用規範與版權宣告。" : "I have reviewed the design system guidelines and copyright."}</Label>
    </div>
   </div>
  </div>

  <SpecNote>
    {isZh
      ? "shadcn/ui 將元件原始碼安裝至 components/ui/ (共 22 個核心基底) 並以 Radix 原生基底確保無障礙標準。此頁為 UI 規格展示，非實際 WooCommerce 購物車結帳流程。"
      : "shadcn/ui installs component source into components/ui/ (22 core primitives) and uses Radix primitives for accessibility. This documentation is a UI specimen, not a live cart or checkout."}
  </SpecNote>
 </div>;
}

function CommercePage(){
 const {isZh}=useLanguage();
 const [size,setSize]=useState('5');
 const [radioSize,setRadioSize]=useState('5.0');
 const [feel,setFeel]=useState('medium-firm');
 const [loadingCard,setLoadingCard]=useState(false);
 const [checkoutStep,setCheckoutStep]=useState<1|2|3>(1);
 const sizes = isZh ? [
   ['3','標準單人','3尺'],
   ['3.5','單人加大','3.5尺'],
   ['5','標準雙人','5尺'],
   ['6','雙人加大','6尺'],
   ['7','雙人特大','7尺']
 ] : [
   ['3','Standard Single','3 ft'],
   ['3.5','Single XL','3.5 ft'],
   ['5','Standard Double','5 ft'],
   ['6','Queen Size','6 ft'],
   ['7','King Size','7 ft']
 ];

 return <div className="space-y-9">
  <div className="docs-block">
   <Subheading
     title={isZh ? "全館活動橫幅與現省優惠徽章 — PromoBanner (Backlog 015 / 024)" : "Campaign Hero Banner & Sale Badge — PromoBanner (Backlog 015 / 024)"}
     desc={isZh ? "針對雙 11 與大型檔期打造的轉化橫幅，整合專屬促銷紅 Sale Token (#E53935)、倒數計時器與複製折扣碼。" : "High-conversion campaign banner for 11.11 and major promotions, combining the dedicated Sale token (#E53935), countdown timer, and one-click promo code copy."}
   />
   <PromoBanner />
  </div>

  <div className="docs-block">
   <Subheading
     title={isZh ? "桌面版 5 品牌巨型導覽選單 — DesktopMegaMenu (Backlog 004)" : "Desktop 5-Brand Mega Menu — DesktopMegaMenu (Backlog 004)"}
     desc={isZh ? "適用於 lunio.com.tw 電腦版頂部導覽，支援 Lunio TW、Nooz Helix、Nooz Sunset、Lunio Bedding 與 Lunio Life 五大品牌商品快速切換與價格預覽。" : "Desktop header mega-menu for lunio.com.tw supporting instant switching and NT price previews across all 5 storefront brands."}
   />
   <DesktopMegaMenu />
  </div>

  <div className="docs-block">
   <Subheading
     title={isZh ? "電商 PDP 導覽與麵包屑" : "E-commerce PDP Navigation & Breadcrumb"}
     desc={isZh ? "適用於床墊集合頁與商品詳情頁 (PDP) 的標準麵包屑導覽。" : "Standard breadcrumb navigation for mattress collection pages and PDP."}
   />
   <Breadcrumb>
    <BreadcrumbList>
     <BreadcrumbItem>
      <BreadcrumbLink asChild><Link href="/">{isZh ? "首頁" : "Home"}</Link></BreadcrumbLink>
     </BreadcrumbItem>
     <BreadcrumbSeparator />
     <BreadcrumbItem>
      <BreadcrumbLink asChild><Link href="/docs/commerce">{isZh ? "旗艦床墊系列" : "Mattress Collection"}</Link></BreadcrumbLink>
     </BreadcrumbItem>
     <BreadcrumbSeparator />
     <BreadcrumbItem>
      <BreadcrumbPage>{isZh ? "Lunio Gen 4 科技石墨烯乳膠床墊" : "Lunio Gen 4 Graphene Latex Mattress"}</BreadcrumbPage>
     </BreadcrumbItem>
    </BreadcrumbList>
   </Breadcrumb>
  </div>

  <div className="docs-block">
   <Subheading
     title={isZh ? "商品多視圖媒體輪播 — shadcn Carousel" : "Product media showcase — shadcn Carousel"}
     desc={isZh ? "展示床墊外觀、五層結構剖面與臥室生活場景的互動式圖片藝廊。" : "Interactive visual gallery for mattress highlights, internal layers, and bedroom scenes."}
   />
   <ProductCarousel />
  </div>

  <div className="docs-block">
   <Subheading
     title={isZh ? "標準化價格顯示與分期模組 — PriceBlock (Backlog 005 / 024)" : "Unified Price Display & Installment Block — PriceBlock (Backlog 005 / 024)"}
     desc={isZh ? "全站統一採用 currencyCode ('NT') 輸出格式 (如 NT21,990，絕不混用 NT$28,990)，搭配獨立促銷紅 (#E53935)『現省』徽章與 0 利率分期試算。" : "Standardizes all storefront prices on currencyCode ('NT', e.g., NT21,990, never mixing NT$28,990) with a dedicated #E53935 '現省' sale badge and 0% installment breakdown."}
   />
   <div className="grid gap-5 lg:grid-cols-2">
    <PriceBlock
      priceAmount={21990}
      compareAtAmount={28980}
      currencyCode="NT"
      size="xl"
      installmentMonths={12}
      sizeNote={isZh ? "標準雙人 5 尺 (150 × 188 × 26 cm)" : "Standard Double 5 ft (150 × 188 × 26 cm)"}
    />
    <div className="flex flex-col justify-between rounded-2xl border border-border/80 bg-slate-50/70 dark:bg-[#182030] dark:border-[#2A344A] p-5">
      <div>
        <span className="eyebrow text-primary">{isZh ? "卡片緊湊版價格 (MD)" : "COMPACT CARD PRICE (MD)"}</span>
        <p className="mt-1 typo-caption text-muted-foreground">
          {isZh ? "用於商品列表卡、加購卡與底部購買列：" : "Used inside product cards, add-ons, and sticky bars:"}
        </p>
      </div>
      <div className="my-4">
        <PriceBlock
          priceAmount={7590}
          compareAtAmount={11800}
          currencyCode="NT"
          size="md"
          installmentMonths={6}
        />
      </div>
      <CodePanel label="PRICE SPEC" code={'import { PriceBlock } from "@/components/commerce/price-block";\n\n<PriceBlock priceAmount={21990} compareAtAmount={28980} currencyCode="NT" size="xl" />'} />
    </div>
   </div>
  </div>

  <div className="docs-block">
   <Subheading
     title={isZh ? "四大安心保證承諾列 — ReassuranceRow (Backlog 020)" : "4-Pillar Trust Reassurance Strip — ReassuranceRow (Backlog 020)"}
     desc={isZh ? "整合 100 晚試睡、10 年保固、本島免運上樓與免費舊床搬運回收，支援完整卡片列與緊湊膠囊列兩種佈局。" : "Highlights 100-night trial, 10-year warranty, free floor delivery, and old mattress removal in both full grid and compact strip variants."}
   />
   <div className="space-y-4">
    <ReassuranceRow />
    <ReassuranceRow compact />
   </div>
  </div>

  <div className="docs-block">
   <Subheading
     title={isZh ? "顧客真實評價摘要 — ProductRating" : "Customer rating summary — ProductRating"}
     desc={isZh ? "符合 WCAG AA 要求的評分模組，包含星級顯示、評價則數與 4 大安心標章。" : "WCAG AA compliant rating pattern featuring star reviews, review count and assurance tags."}
   />
   <ProductRating
     score={4.9}
     reviewCount={12850}
     featuredBadges={isZh ? ["100晚安心試睡", "10年原廠保固", "全台免運配送到府", "舊床免費搬運回收"] : ["100-Night Trial", "10-Year Warranty", "Free Taiwan Delivery", "Free Mattress Removal"]}
   />
  </div>

  <div className="docs-block">
   <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
    <Subheading
      title={isZh ? "商品卡片與骨架屏載入狀態" : "Product card & Skeleton loading state"}
      desc={isZh ? "WooCommerce 為商品名稱、規格價格、庫存與優惠折扣的單一真實來源，價格統一由 currencyCode ('NT') 渲染。" : "WooCommerce is the single source of truth for product names, variation prices, stock and discounts, rendered from currencyCode ('NT')."}
    />
    <Button variant="outline" size="sm" onClick={()=>setLoadingCard(!loadingCard)}>
     <RefreshCw size={14} className={loadingCard?'animate-spin':''}/>
     {loadingCard ? (isZh ? '展示已載入卡片' : 'Show Loaded Cards') : (isZh ? '模擬資料載入中 (Skeleton)' : 'Simulate Loading (Skeleton)')}
    </Button>
   </div>
   <div className="grid gap-5 md:grid-cols-2">
    {loadingCard ? (
     <>
      <ProductCardSkeleton />
      <ProductCardSkeleton />
     </>
    ) : (
     <>
      <ProductCard product={{
        name: isZh ? "Gen 4 石墨烯乳膠床墊" : "Gen 4 Graphene Latex Mattress",
        description: isZh ? "泰國天然乳膠與專利石墨烯調溫舒壓棉" : "Thai natural latex & graphene thermoregulation foam",
        priceAmount: 21990,
        compareAtAmount: 28980,
        currencyCode: "NT",
        discountBadge: isZh ? "現省 NT6,990" : "SAVE NT6,990",
        badge: isZh ? "LUNIO 旗艦款" : "LUNIO FLAGSHIP"
      }}/>
      <Card className="gap-0 border border-border/80 bg-slate-50/70 dark:bg-[#182030] dark:border-[#2A344A] py-0 shadow-xs">
        <CardContent className="p-5">
          <p className="eyebrow text-primary">{isZh ? "手機版橫向商品列 / 375px" : "MOBILE PRODUCT ROW / 375"}</p>
          <div className="mt-6 flex gap-3">
            <div className="flex size-[132px] shrink-0 items-center justify-center rounded-xl border border-border/60 bg-muted/70 dark:bg-[#131926]">
              <div className="h-[35px] w-[85px] -rotate-[5deg] rounded-lg bg-gradient-to-br from-white to-[#9ba6b7] shadow-[0_13px_0_-4px_#6b7791]"/>
            </div>
            <div className="flex min-w-0 flex-col gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <h3 className="typo-h4 break-words text-foreground">{isZh ? "Gen 4 石墨烯乳膠床墊" : "Gen 4 Graphene Latex"}</h3>
                <Badge variant="sale">{isZh ? "現省 NT6,990" : "SAVE NT6,990"}</Badge>
              </div>
              <p className="typo-body-sm text-muted-foreground">{isZh ? "天然乳膠五層結構" : "Natural latex 5-layer anatomy"}</p>
              <div className="flex items-baseline gap-2">
                <p className="typo-price-md text-primary tabular-nums">NT21,990</p>
                <span className="typo-caption text-muted-foreground line-through tabular-nums">NT28,980</span>
              </div>
              <p className="typo-caption text-muted-foreground">{isZh ? "依規格與庫存顯示" : "Displayed by variation and stock"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
     </>
    )}
   </div>
  </div>

  <div className="docs-block">
   <Subheading
     title={isZh ? "跨品牌床墊規格比較表 — ComparisonTable (Backlog 016)" : "Cross-Brand Mattress Comparison Matrix — ComparisonTable (Backlog 016)"}
     desc={isZh ? "支援顧客在同一視圖橫向比較 Lunio Gen 4、Quantum Max、Nooz Helix 與 Nooz Sunset 的躺感、厚度、涼感技術與雙人 5 尺售價。" : "Enables side-by-side comparison of Lunio Gen 4, Quantum Max, Nooz Helix, and Nooz Sunset across firmness, thickness, cooling tech, and 5ft Double NT pricing."}
   />
   <ComparisonTable />
  </div>

  <div className="docs-block">
   <Subheading
     title={isZh ? "單選尺寸與軟硬度選擇器 (附提示指南)" : "RadioGroup mattress selector with Tooltips"}
     desc={isZh ? "台灣床墊規格 (台尺/公分，依 SKU 實測校正) 與睡感選擇，內建即時尺寸與軟硬度指南 Tooltip。" : "Taiwan SKU-verified mattress dimensions (尺/cm) & feel options with contextual size help tooltips."}
   />
   <MattressRadioSelector selectedSize={radioSize} onSelectSize={setRadioSize} selectedFeel={feel} onSelectFeel={setFeel} />
  </div>

  <div className="docs-block">
   <Subheading
     title={isZh ? "規格尺寸膠囊快速選擇器 (Button Pills)" : "Variation size selector — Quick Button Pills"}
     desc={isZh ? "具備選中狀態的 shadcn/ui 按鈕膠囊；實際庫存、尺寸公分與售價在正式環境中均串接 WooCommerce API。" : "Interactive shadcn/ui Buttons with selected states; size availability, exact dimensions and price always come from WooCommerce in production."}
   />
   <SizeSelector options={sizes.map(([id,label,sublabel])=>({id,label,sublabel}))} selected={size} onSelect={setSize}/>
   <p className="mt-4 typo-body-sm text-muted-foreground" aria-live="polite">
     {isZh
       ? `已選定：${sizes.find(s=>s[0]===size)?.[1]} · 最終尺寸、庫存狀態與促銷價格須由 WooCommerce API 即時提供。`
       : `Selected: ${sizes.find(s=>s[0]===size)?.[1]} · Final dimensions, availability and price must be retrieved from WooCommerce.`}
   </p>
  </div>

  <div className="docs-block">
   <Subheading
     title={isZh ? "床墊規格拆解與常見問答 — shadcn Accordion" : "Mattress Specifications & FAQs — shadcn Accordion"}
     desc={isZh ? "5 層床墊內部結構深度解析、100 晚安心試睡條款、10 年保固與配送回收說明。" : "5-layer mattress structure breakdown, 100-night trial terms, 10-year warranty, and shipping details."}
   />
   <MattressSpecsAccordion />
  </div>

  <div className="docs-block">
   <Subheading
     title={isZh ? "已驗證買家評價列表與篩選 — ReviewList & ReviewCard (Backlog 013)" : "Verified Buyer Reviews & Filter — ReviewList & ReviewCard (Backlog 013)"}
     desc={isZh ? "包含五星分佈長條圖、標籤快速篩選、買家購買尺寸與睡感標記，以及官方客服回覆區塊。" : "Features 5-star distribution bars, tag filter pills, verified buyer mattress size/firmness metadata, and official store replies."}
   />
   <ReviewList />
  </div>

  <div className="docs-block">
   <Subheading
     title={isZh ? "購物車滿額贈品與一鍵加購 — CartGiftLine & CartAddOnCard (Backlog 014)" : "Cart Free Gift & 1-Click Upsell Add-Ons — CartGiftLine & CartAddOnCard (Backlog 014)"}
     desc={isZh ? "提升客單價 (AOV) 的隨床加購配件卡與自動隨貨贈品明細列，統一使用 NT 價格格式與現省徽章。" : "AOV-boosting accessory upsell cards and automatic free gift inclusion lines using standardized NT formatting and sale badges."}
   />
   <div className="space-y-4">
    <CartGiftLine />
    <CartAddOnCard />
   </div>
  </div>

  <div className="docs-block">
   <Subheading
     title={isZh ? "手機版巨型導覽選單 — shadcn Sheet + Tabs (5 品牌支援)" : "Mobile Mega Menu — shadcn Sheet + Tabs (5 Brands)"}
     desc={isZh ? "點擊開啟無障礙抽屜面版，可直接在抽屜內跨 5 大品牌 (含 Lunio Life) 快速切換，無需重整跳頁。" : "Click to open an accessible modal sheet, then switch between all 5 brands (including Lunio Life) without navigating away."}
   />
   <div className="max-w-[385px] rounded-xl border border-border/80 bg-slate-50/70 dark:bg-[#182030] dark:border-[#2A344A] p-5 shadow-xs">
     <div className="flex items-center justify-between">
       <span className="typo-h4">Lunio</span>
       <MobileMegaMenu/>
     </div>
     <p className="mt-3 typo-body-sm text-muted-foreground">
       {isZh ? "點擊選單按鈕測試鍵盤焦點捕捉 (Focus Trap) 與 Esc 鍵關閉無障礙行為。" : "Click menu button to test keyboard, focus trap and Escape-to-close behavior."}
     </p>
   </div>
  </div>

  <div className="docs-block">
   <Subheading
     title={isZh ? "台灣宅配地址、電梯樓層與舊床回收表單 — CheckoutStepper & TaiwanAddressForm (Backlog 007)" : "Taiwan Delivery Address, Elevator & Old Mattress Form — CheckoutStepper & TaiwanAddressForm (Backlog 007)"}
     desc={isZh ? "專為台灣大型床墊物流設計的結帳表單：自動對應縣市/行政區 3 碼郵遞區號、電梯樓層評估與同尺寸舊床搬運下樓勾選。" : "Purpose-built for Taiwan bulky mattress logistics: auto-resolves 3-digit postal codes by city/district, captures elevator/floor access, and schedules old mattress removal."}
   />
   <div className="space-y-5">
    <CheckoutStepper currentStep={checkoutStep} onStepChange={setCheckoutStep} />
    <TaiwanAddressForm />
   </div>
  </div>

  <div className="docs-block">
   <Subheading
     title={isZh ? "台灣多元金流與零利率分期選擇器 — PaymentMethodSelector (Backlog 008)" : "Taiwan Payment & 0% Installment Selector — PaymentMethodSelector (Backlog 008)"}
     desc={isZh ? "支援信用卡 3/6/12/24 期 0 利率即時試算、LINE Pay、Apple Pay、zingala 銀角零卡無卡分期與 ATM 虛擬帳號。" : "Supports 3/6/12/24-month 0% credit card installment calculation, LINE Pay, Apple Pay, zingala cardless installments, and ATM transfer."}
   />
   <PaymentMethodSelector totalAmount={21990} currencyCode="NT" />
  </div>

  <div className="docs-block">
   <Subheading
     title={isZh ? "結帳訂單明細拆解 — shadcn Separator" : "Checkout order breakdown — shadcn Separator"}
     desc={isZh ? "清晰結構化呈現床墊購買金額、官方隨貨滿額贈品、專人免運配送服務與最終結帳總額（全數統一採用 NT 貨幣格式）。" : "Structured breakdown of mattress purchase, bundle gifts, delivery services and final total using unified NT currency formatting."}
   />
   <div className="max-w-lg rounded-2xl border border-border/80 bg-slate-50/70 dark:bg-[#182030] dark:border-[#2A344A] p-6 shadow-xs space-y-4">
    <div className="flex items-center justify-between">
      <span className="typo-h4 text-foreground">{isZh ? "訂單結帳明細" : "Order Summary"}</span>
      <Badge variant="outline">{isZh ? "購物車 1 件" : "1 Item in Cart"}</Badge>
    </div>
    <Separator />
    <div className="space-y-3 typo-body-sm">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-semibold text-foreground">{isZh ? "Lunio Gen 4 科技石墨烯乳膠床墊" : "Lunio Gen 4 Graphene Latex Mattress"}</span>
          <p className="typo-caption text-muted-foreground">{isZh ? "標準雙人 5 尺 (150 × 188 cm) · 適中微挺" : "Standard Double 5 ft (150 × 188 cm) · Medium-Firm"}</p>
        </div>
        <span className="font-bold text-foreground tabular-nums">NT21,990</span>
      </div>
      <div className="flex items-center justify-between text-muted-foreground">
        <div>
          <span>{isZh ? "專屬官網贈品：天絲防蟎保潔墊" : "Exclusive Free Gift: Tencel Mattress Protector"}</span>
          <p className="typo-caption text-emerald-600 dark:text-emerald-400">{isZh ? "買床墊隨貨贈送 (價值 NT2,490)" : "Included with mattress order (Valued at NT2,490)"}</p>
        </div>
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{isZh ? "免費" : "FREE"}</span>
      </div>
      <div className="flex items-center justify-between text-muted-foreground">
        <div>
          <span>{isZh ? "全台本島專人配送到府定位" : "Taiwan Main Island Home Delivery & Positioning"}</span>
          <p className="typo-caption">{isZh ? "含免運費、搬運上樓與包裝定位" : "Includes zero shipping fee, floor delivery & positioning"}</p>
        </div>
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{isZh ? "NT0 (免運)" : "NT0 (FREE)"}</span>
      </div>
      <div className="flex items-center justify-between text-muted-foreground">
        <div>
          <span>{isZh ? "舊床墊大型廢棄物搬運回收" : "Old Mattress Ground Floor Removal Assistance"}</span>
          <p className="typo-caption">{isZh ? "同尺寸床墊免費協助搬運至一樓" : "Free assistance moving same-size old mattress to 1F"}</p>
        </div>
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{isZh ? "免費" : "FREE"}</span>
      </div>
    </div>
    <Separator />
    <div className="flex items-center justify-between pt-1">
      <div>
        <span className="typo-h3 font-bold text-foreground">{isZh ? "結帳總計" : "Order Total"}</span>
        <p className="typo-caption text-muted-foreground">{isZh ? "含 5% 營業稅、100晚試睡與10年原廠保固" : "Includes 5% VAT, 100-night trial & 10-year warranty"}</p>
      </div>
      <span className="typo-price-xl text-primary tabular-nums">NT21,990</span>
    </div>
   </div>
  </div>

  <div className="docs-block">
   <Subheading
     title={isZh ? "PDP 底部常駐購買懸浮列 (Sticky Bar)" : "PDP sticky purchase summary"}
     desc={isZh ? "所選之床墊規格、睡感即時連動底部購買列之價格 (NT 格式)、現省徽章與庫存狀態。" : "Selected variation controls real-time NT price, sale badge, and stock status."}
   />
   <PDPStickyBar
     sizeLabel={isZh ? `${size} 尺` : `${size} ft`}
     priceAmount={21990}
     compareAtAmount={28980}
     currencyCode="NT"
     discountBadge={isZh ? "現省 NT6,990" : "SAVE NT6,990"}
     inStock
     ready={true}
     demo
   />
   <p className="mt-4 typo-body-sm text-muted-foreground">
     {isZh
       ? "正式電商站實作：底部固定定位、env(safe-area-inset-bottom) 安全區域邊距、足夠的頁尾內距與正式金流庫存邏輯。"
       : "Storefront: fixed bottom positioning, env(safe-area-inset-bottom), sufficient content padding and real payment/stock logic."}
   </p>
  </div>
 </div>;
}

function AccessibilityPage(){
  const {isZh}=useLanguage();
  return <div className="space-y-9">
    <div className="docs-block overflow-x-auto">
      <Subheading
        title={isZh ? "WCAG 2.2 AA 驗收標準" : "WCAG 2.2 AA acceptance criteria"}
        desc={isZh ? "全站遵循國際無障礙指引 2.2 AA 級標準，確保弱視、色弱與鍵盤使用者順暢購物。" : "Measurable accessibility target across all brands, themes, and interactive commerce states."}
      />
      <table className="token-table min-w-[640px]">
        <thead>
          <tr>
            <th>{isZh ? "標準規範條例" : "Criterion"}</th>
            <th>{isZh ? "最低合規要求" : "Minimum"}</th>
            <th>{isZh ? "檢驗場景與方式" : "Test"}</th>
          </tr>
        </thead>
        <tbody>
          {[
            [isZh ? "1.4.3 對比度 (Contrast)" : "1.4.3 Contrast", isZh ? "一般文字 4.5:1 / 大字 3:1" : "4.5:1 text / 3:1 large", isZh ? "所有真實介面表面，包含圖片覆蓋層與漸層" : "Every real surface including image overlays"],
            [isZh ? "1.4.4 文字縮放 (Resize Text)" : "1.4.4 Resize Text", "200%", isZh ? "文字放大時價格、表單標籤或 CTA 按鈕不得被截斷" : "No truncated price, form label or CTA"],
            [isZh ? "1.4.10 響應重排 (Reflow)" : "1.4.10 Reflow", "320 CSS px", isZh ? "螢幕緊縮至 320px 時不得出現非預期的水平捲軸" : "No unexpected horizontal scroll"],
            [isZh ? "1.4.12 文字間距 (Text Spacing)" : "1.4.12 Text Spacing", isZh ? "覆寫樣式測試" : "Override test", isZh ? "覆蓋文字行距字距時，內容依然完整可見且可操作" : "Content stays visible and usable"],
            [isZh ? "2.4.7 焦點可見 (Focus Visible)" : "2.4.7 Focus Visible", isZh ? "清晰聚焦外框" : "Visible focus", isZh ? "全站鍵盤旅程、抽屜面版與所有表單具備清晰聚焦外框" : "Keyboard journey, sheet, forms"],
            [isZh ? "2.5.8 目標尺寸 (Target Size)" : "2.5.8 Target Size", isZh ? "24×24px (含例外)" : "24×24 with exceptions", isZh ? "內部設計偏好：手機版觸控目標一律 ≥ 44×44px" : "Internal preference ≥44×44 mobile"]
          ].map(x=>(
            <tr key={x[0]}>
              <td className="font-bold">{x[0]}</td>
              <td>{x[1]}</td>
              <td className="text-muted-foreground">{x[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="docs-grille">
      <div className="do-good">
        <div className="do-good-title flex items-center gap-2 font-bold text-[#13764b] dark:text-[#4ADE80]">
          <CheckCircle2 size={20}/> {isZh ? "建議實踐規範 (DO)" : "DO"}
        </div>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-[13px] leading-6 text-[#416b57] dark:text-[#86EFAC]">
          <li>{isZh ? "一律使用語意化排印角色與品牌色彩變數。" : "Use semantic typography and brand variables."}</li>
          <li>{isZh ? "確保 Sunset 晨曦橘底色上採用深墨色文字保持極佳辨識度。" : "Ensure readable text on Sunset Orange."}</li>
          <li>{isZh ? "確保動態價格與完整商品規格資訊隨時可見。" : "Preserve dynamic prices and full product information."}</li>
          <li>{isZh ? "完整支援 200% 瀏覽器縮放與真實鍵盤 Tab/Enter 導覽。" : "Support 200% zoom and real keyboard navigation."}</li>
          <li>{isZh ? "表單發生錯誤時，除顏色變化外必須同時提供明確的錯誤文字提示。" : "Provide error text alongside error color."}</li>
        </ul>
      </div>
      <div className="do-bad">
        <div className="do-bad-title flex items-center gap-2 font-bold text-[#ae3931] dark:text-[#F87171]">
          <X size={20}/> {isZh ? "禁止實踐行為 (DON'T)" : "DON'T"}
        </div>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-[13px] leading-6 text-[#8a5553] dark:text-[#FCA5A5]">
          <li>{isZh ? "切勿在 Sunset 品牌主色 (#F28131) 上使用白色文字（對比度僅 2.64:1，不及格）。" : "Use white text on Sunset Primary (#F28131)."}</li>
          <li>{isZh ? "切勿在 Helix 強調色 (薰衣草紫) 上使用常規字級白色文字。" : "Use white normal-size text on Helix Accent."}</li>
          <li>{isZh ? "切勿在電商購買 CTA 按鈕上寫死隨意覆蓋的文字大小 (如 text-[13px])。" : "Hardcode `text-[13px]` on a commerce CTA."}</li>
          <li>{isZh ? "切勿預設徽章、產品照片或背景漸層自然符合對比度標準。" : "Assume badges, photography or gradients always pass contrast."}</li>
          <li>{isZh ? "切勿將僅僅通過自動化 Token 檢查等同於通過全站 AA 無障礙認證。" : "Call an automated token test an AA certification."}</li>
        </ul>
      </div>
    </div>
    <SpecNote>
      {isZh
        ? "目前 tokens.json 中的所有前景色/背景色搭配在配置之 UI 角色中均通過 4.5:1 對比度，但全站層級的 WCAG 稽核仍須包含實際鍵盤導覽、螢幕報讀軟體、不同尺寸響應重排與正式電商動態狀態的綜合檢驗。"
        : "Current color pairs in tokens pass 4.5:1 for the configured UI roles, but a website-wide WCAG audit still requires keyboard, screen reader, responsive and real commerce-state testing."}
    </SpecNote>
  </div>;
}

function ReleasePage(){
  const {isZh}=useLanguage();
  const items = isZh ? [
    ['01 · 審查盤點 (Audit)', '截取目前前端計算文字指標與 Figma 最新設計稿截圖'],
    ['02 · 官方核准 (Approve)', '品牌負責人核准 5 大品牌 (含 Lunio Life) 資產及調色盤規範'],
    ['03 · 工程整合 (Integrate)', '在 Next.js 鎖定具版本號的設計 Token，並重構 22 個共享基底與 19 個電商模式'],
    ['04 · 品質驗證 (Validate)', 'QA 檢驗 375/1440 視區、320px 重排、200% 縮放與鍵盤導覽'],
    ['05 · 回歸測試 (Regression)', '測試 WooCommerce 規格變化、NT 統一價格格式、庫存、運費、購物車與結帳'],
    ['06 · 正式發布 (Release)', '記錄更新日誌、建立復原路徑 (Rollback) 並指派維護負責人']
  ] : [
    ['01 · Audit', 'Capture current frontend computed text metrics and Figma screenshots'],
    ['02 · Approve', 'Brand owner validates 5-brand (incl. Lunio Life) assets and color rules'],
    ['03 · Integrate', 'Pin versioned design tokens in Next.js across 22 primitives and 19 commerce patterns'],
    ['04 · Validate', 'Check QA at 375/1440, 320 reflow, 200% resize and keyboard'],
    ['05 · Regression', 'Test WooCommerce variations, unified NT pricing, stock, shipping, cart and payment'],
    ['06 · Release', 'Document change log, rollback path and responsible owners']
  ];

  const rolloutWaves = isZh ? [
    ['Wave 1 · 雙 11 檔期前優先上線', '005 / 024 / 016 / 020 / 015', 'PriceBlock (統一 NT 價格與分期)、ComparisonTable (跨品牌床墊比較表)、ReassuranceRow (4 大安心保證列)、PromoBanner + Sale Badge (#E53935 現省徽章)', '已實作並通過驗證'],
    ['Wave 2 · 全站探索與購物車客單提升', '013 / 004 / 014', 'ReviewList & ReviewCard (買家五星評價篩選)、DesktopMegaMenu (電腦版 5 品牌巨型選單)、CartAddOnCard & CartGiftLine (購物車滿額贈品與一鍵加購)', '已實作並通過驗證'],
    ['Wave 3 · 台灣在地化結帳與金流', '007 / 008', 'TaiwanAddressForm & CheckoutStepper (台灣縣市郵遞區號、電梯樓層、舊床回收評估)、PaymentMethodSelector (3/6/12/24 期 0 利率、LINE Pay、銀角零卡)', '已實作並通過驗證']
  ] : [
    ['Wave 1 · Pre-11.11 Conversion Core', '005 / 024 / 016 / 020 / 015', 'PriceBlock (unified NT format & installments), ComparisonTable, ReassuranceRow (4 trust pillars), PromoBanner + Sale Badge (#E53935)', 'Implemented & Verified'],
    ['Wave 2 · Discovery & Cart AOV', '013 / 004 / 014', 'ReviewList & ReviewCard (verified buyer reviews), DesktopMegaMenu (5-brand header menu), CartAddOnCard & CartGiftLine (free gift & upsells)', 'Implemented & Verified'],
    ['Wave 3 · Taiwan Localized Checkout', '007 / 008', 'TaiwanAddressForm & CheckoutStepper (postal code, elevator/floor, old mattress removal), PaymentMethodSelector (0% installments, LINE Pay, zingala)', 'Implemented & Verified']
  ];

  const p0Closures = isZh ? [
    ['UX-01', '全站價格格式與促銷語意統一', '全面統一由 currencyCode ("NT") 渲染 (如 NT21,990，移除 NT$28,990 混用)，並新增獨立 --sale (#E53935) 促銷 Token 與 --destructive 錯誤紅分離。', '已結案 (Closed)'],
    ['DS-02', 'DESIGN.md 規範與實作數量同步', '修正版本標頭與 §10 為 v1.4.1 Production Certified；同步 22 個 shadcn/ui 原生基底、19 個台灣電商模式與 Badge rounded-full (9999px) 規格。', '已結案 (Closed)'],
    ['DS-03', '5 大商城品牌範疇與 Lunio Life 導入', '明確定義本系統專屬於 lunio.com.tw 商城之 5 大銷售品牌，並完整導入 data-brand="lunio-life" (Plum Night #2D274A / Titan White #CCD5F8 / Crocus Purple #9786F3)。', '已結案 (Closed)'],
    ['A11Y-04', '跨品牌前景色對比度 WCAG 2.2 AA 強制保護', '驗證 Sunset 主色搭配深墨色 #1C1526 (6.72:1)、Helix 強調色搭配純黑 #000000 (4.99:1)、Lunio Life 強調色搭配純黑 #141414 (6.15:1) 全數通過 AA。', '已結案 (Closed)'],
    ['DATA-05', '台灣床墊 SKU 實測尺寸與動態資料邊界', '修正標準單人 3 尺 (89×188×24 cm) 與單人加大 3.5 尺 (104×188×24 cm) 為 SKU 實測規格，並完整實作 001–024 轉化待辦元件。', '已結案 (Closed)']
  ] : [
    ['UX-01', 'Unified NT Price Formatting & Sale Token', 'Standardized all prices on currencyCode ("NT", e.g., NT21,990, eliminating NT$ mixing) and added dedicated --sale (#E53935) token separate from --destructive.', 'Closed & Verified'],
    ['DS-02', 'Spec Consistencies & Component Counts', 'Synchronized header and §10 to v1.4.1 Production Certified; aligned 22 shadcn/ui primitives, 19 commerce patterns, and Badge rounded-full (9999px).', 'Closed & Verified'],
    ['DS-03', 'lunio.com.tw 5-Brand Scope & Lunio Life CI', 'Clarified scope specifically for lunio.com.tw covering 5 brands and added data-brand="lunio-life" (Plum Night #2D274A / Titan White #CCD5F8 / Crocus Purple #9786F3).', 'Closed & Verified'],
    ['A11Y-04', 'Cross-Brand WCAG 2.2 AA Contrast Enforcement', 'Enforced Sunset dark ink #1C1526 (6.72:1), Helix accent black #000000 (4.99:1), and Lunio Life Crocus Purple dark ink #141414 (6.15:1) in automated tests.', 'Closed & Verified'],
    ['DATA-05', 'SKU-Verified Taiwan Dimensions & Backlog 001–024', 'Aligned Single 3ft (89×188×24 cm) and Single XL 3.5ft (104×188×24 cm) to SKU-verified specs and completed all 9 missing conversion backlog suites.', 'Closed & Verified']
  ];

  return <div className="space-y-9">
    <div className="docs-block overflow-x-auto">
      <Subheading
        title={isZh ? "P0 生產環境放行項目結案紀錄 (Production Readiness)" : "P0 Production Readiness Closure Record"}
        desc={isZh ? "v1.4.1 正式版已全數關閉 5 項 P0 核心審查議題，通過自動化 Token、無障礙對比與型別檢驗。" : "All 5 P0 blockers have been resolved and verified in v1.4.1 across automated token, contrast, and typecheck gates."}
      />
      <table className="token-table min-w-[680px]">
        <thead>
          <tr>
            <th>ID</th>
            <th>{isZh ? "審查項目" : "P0 Item"}</th>
            <th>{isZh ? "修正內容與工程實作" : "Resolution & Implementation"}</th>
            <th>{isZh ? "狀態" : "Status"}</th>
          </tr>
        </thead>
        <tbody>
          {p0Closures.map(([id,title,resolution,status])=>(
            <tr key={id}>
              <td className="font-mono font-bold text-primary whitespace-nowrap">{id}</td>
              <td className="font-semibold whitespace-nowrap">{title}</td>
              <td className="text-xs text-muted-foreground leading-relaxed">{resolution}</td>
              <td className="whitespace-nowrap"><Badge variant="success">{status}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="docs-block overflow-x-auto">
      <Subheading
        title={isZh ? "電商轉化待辦元件上線波次規劃 (Backlog 001–024 Rollout Order)" : "Conversion Backlog Rollout Order (Wave 1–3 · Backlog 001–024)"}
        desc={isZh ? "9 組轉化關鍵電商元件已全數於 components/commerce/ 實作完成，並依業務影響力劃分為三波部署順序。" : "All 9 conversion backlog component suites are implemented in components/commerce/ and sequenced across 3 deployment waves."}
      />
      <table className="token-table min-w-[680px]">
        <thead>
          <tr>
            <th>{isZh ? "部署波次" : "Rollout Wave"}</th>
            <th>{isZh ? "待辦編號" : "Backlog IDs"}</th>
            <th>{isZh ? "包含元件與轉換目標" : "Components & Conversion Scope"}</th>
            <th>{isZh ? "實作狀態" : "Status"}</th>
          </tr>
        </thead>
        <tbody>
          {rolloutWaves.map(([wave,ids,scope,status])=>(
            <tr key={wave}>
              <td className="font-bold whitespace-nowrap">{wave}</td>
              <td className="font-mono text-xs text-primary whitespace-nowrap">{ids}</td>
              <td className="text-xs text-muted-foreground leading-relaxed">{scope}</td>
              <td className="whitespace-nowrap"><Badge variant="success">{status}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="docs-block">
      <Subheading
        title={isZh ? "生產環境發布檢查清單" : "Release checklist"}
        desc={isZh ? "設計系統的更新不會自動推播部署至 lunio.com.tw 線上環境，須嚴格執行發布流程。" : "Design System updates are not automatically deployed to lunio.com.tw."}
      />
      <div className="space-y-2">
        {items.map(([name,desc],i)=>(
          <div key={name} className="flex gap-4 rounded-lg border border-border/80 bg-slate-50/60 dark:bg-[#182030] dark:border-[#2A344A] px-4 py-4 transition-colors hover:border-primary/40 shadow-xs">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 dark:bg-primary/15 text-xs font-bold text-primary">
              {String(i+1).padStart(2,'0')}
            </span>
            <div>
              <div className="font-bold text-[14px]">{name}</div>
              <p className="mt-1 text-[12px] leading-6 text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="docs-block">
      <Subheading
        title={isZh ? "工程驗證指令" : "Engineering commands"}
        desc={isZh ? "在本地端執行完整檢查清單驗證 Token 編譯、無障礙規範與 TypeScript 靜態分析。" : "Run full automated quality gates to compile tokens, audit contrast, and verify TypeScript."}
      />
      <CodePanel label="CI / LOCAL" code={'npm install\nnpm run tokens:build\nnpm run tokens:check\nnpm run shadcn:check\nnpm run typecheck\nnpm run build\nnpm run dev'}/>
    </div>
    <div className="docs-grille">
      <div className="docs-block">
        <div className="eyebrow text-primary">{isZh ? "官方核准設計源" : "APPROVED SOURCE"}</div>
        <div className="mt-3 text-[19px] font-bold">DESIGN.md v1.4.1</div>
        <p className="mt-3 text-[13px] leading-6 text-muted-foreground">
          {isZh ? "lunio.com.tw 五大品牌 (Lunio、Helix、Sunset、Bedding、Lunio Life) 字體排印與色彩權威來源。" : "Authoritative typography and 5-brand color specification for lunio.com.tw."}
        </p>
        <Link href="/docs/source" className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-primary">
          {isZh ? "閱讀完整規格說明手冊" : "Read complete specification"} <ArrowUpRight size={16}/>
        </Link>
      </div>
      <div className="docs-block">
        <div className="eyebrow text-primary">{isZh ? "FIGMA 設計庫" : "FIGMA LIBRARY"}</div>
        <div className="mt-3 text-[19px] font-bold">Code 018 · Lunio DS</div>
        <p className="mt-3 text-[13px] leading-6 text-muted-foreground">
          {isZh ? "變數 (Variables)、文字樣式與元件範例均建立於專案現有的 Figma 設計檔中。" : "Variables, text styles and component examples are authored in the project's existing Figma file."}
        </p>
        <a href="https://www.figma.com/design/46bJYM9raivd3wEwTxaaJI/Lunio-TW-Mattress?node-id=1036-636" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-primary">
          {isZh ? "開啟 Figma 官方設計文件" : "Open Figma documentation"} <ArrowUpRight size={16}/>
        </a>
      </div>
    </div>
  </div>;
}

const releaseListZh = [
  {
    version: "v1.4.1",
    date: "2026-10-16",
    badge: "最新版本 · Production Certified",
    badgeClass: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    title: "TypeScript 生產型別強化、Vercel Build 修正與元件 API 彈性擴充",
    description: "全面修正 Vercel 生產建置 TypeScript 型別不相容問題，為 ProductCard、PriceBlock、PDPStickyBar 與 ReassuranceRow 提供向下相容的屬性別名與緊湊版佈局支援，並在自動化測試套件中納入第 5 品牌 Lunio Life 的主題繼承驗證。",
    highlights: [
      "解決 Vercel Build TS2353/TS2322 錯誤：全面相容 priceAmount、compareAtAmount、size、sizeNote、compact 與 discountBadge",
      "ReassuranceRow 新增 compact 緊湊膠囊佈局，無縫適配 PDP 購買區域與手機版抽屜",
      "擴充 tests/shadcn.test.mjs 自動化驗證閘門，確保 data-brand=\"lunio-life\" 與其餘 4 大品牌一致具備完整 Radix Portal 主題繼承",
      "通過 9/9 Token 測試、6/6 shadcn 測試、零 TypeScript 錯誤與 19/19 SSG 靜態路由編譯"
    ],
    sections: [
      {
        tag: "生產建置與型別強化",
        items: [
          "CommerceProductSummary 與 ProductCard 全面支援 priceAmount 與 compareAtAmount 屬性別名",
          "PriceBlockProps 與 PriceBlock 支援 salePrice / priceAmount、regularPrice / compareAtAmount 以及 size (sm/md/lg/xl) 與 sizeNote 規格尺寸",
          "PDPStickyBarProps 與 PDPStickyBar 支援 priceAmount、compareAtAmount 與 discountBadge",
          "ReassuranceRow 支援 compact?: boolean 屬性與 4 欄緊湊列模式"
        ]
      },
      {
        tag: "測試套件與規範同步",
        items: [
          "tests/shadcn.test.mjs 新增 lunio-life 品牌檢查，覆蓋全部 5 大商城品牌",
          "同步 DESIGN.md、tokens.json 與 package.json 至 v1.4.1"
        ]
      }
    ]
  },
  {
    version: "v1.4.0",
    date: "2026-10-16",
    badge: "5 品牌架構與 19 個電商元件",
    badgeClass: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    title: "lunio.com.tw 五大品牌體系 (含 Lunio Life)、22 個 UI 基底與 19 個台灣電商轉化模式",
    description: "明確定義系統專屬於 lunio.com.tw 台灣官方商城之 5 大銷售品牌，正式導入第 5 品牌 Lunio Life (#2D274A / #CCD5F8 / #9786F3)，統一全站 NT 價格格式與獨立促銷紅 Sale Token (#E53935)，並完成全部 19 個電商轉化元件。",
    highlights: [
      "新增第 5 品牌模式 data-brand=\"lunio-life\"：Plum Night #2D274A (13.99:1 AAA)、Titan White #CCD5F8、Crocus Purple #9786F3 (搭配 #141414 達 6.15:1 AA)",
      "全站價格統一由 currencyCode (\"NT\") 格式化輸出 (如 NT21,990，消除 NT$28,990 混用)，並新增獨立 --sale (#E53935) 促銷 Token",
      "完成 22 個原始碼自有 shadcn/ui 核心基底與 19 個台灣電商轉換模式 (涵蓋待辦清單 001–024)",
      "新增 9 大電商轉化套件：PriceBlock、ComparisonTable、ReassuranceRow、PromoBanner、ReviewList、DesktopMegaMenu、CartAddOnCard/CartGiftLine、TaiwanAddressForm/CheckoutStepper、PaymentMethodSelector",
      "統一 Badge 為膠囊圓角 rounded-full (--radius-pill: 9999px)，同步修正 DESIGN.md §3 與 §11.3",
      "全數結案 5 項 P0 生產就緒指標 (UX-01、DS-02、DS-03、A11Y-04、DATA-05)，通過 9/9 Token 測試與零 TypeScript 錯誤"
    ],
    sections: [
      {
        tag: "第 5 品牌：Lunio Life 與規範修正",
        items: [
          "導入 Lunio Life 官方 CI：Plum Night (#2D274A)、Titan White (#CCD5F8)、Crocus Purple (#9786F3) 與次要色彩 (#141414、#ECE8D8、#EC9BB0、#F6D0D7)",
          "新增獨立促銷紅 Sale Token (#E53935)，專門用於『現省』折扣徽章，不與表單錯誤紅 (#B42318) 混用",
          "統一全站價格渲染函數 formatPrice(amount, currencyCode) 輸出 NT21,990 格式"
        ]
      },
      {
        tag: "新增轉化電商元件 (Wave 1–3)",
        items: [
          "Wave 1 (雙 11 前)：PriceBlock [005/024]、ComparisonTable [016]、ReassuranceRow [020]、PromoBanner + Sale Badge [015/024]",
          "Wave 2 (探索與客單)：ReviewList & ReviewCard [013]、DesktopMegaMenu [004]、CartAddOnCard & CartGiftLine [014]",
          "Wave 3 (台灣結帳)：TaiwanAddressForm & CheckoutStepper [007]、PaymentMethodSelector [008]"
        ]
      },
      {
        tag: "22 個 shadcn/ui 核心基底與無障礙",
        items: [
          "完整對齊 components/ui/ 下 22 個核心檔案，包含 Accordion、RadioGroup、Tooltip、Breadcrumb、Carousel、Separator 等",
          "校正台灣床墊 SKU 實測尺寸：標準單人 3 尺 (89×188×24 cm) 與單人加大 3.5 尺 (104×188×24 cm)",
          "手機版 PDP 底部常駐列完整支援安全區域邊距 (env(safe-area-inset-bottom))"
        ]
      }
    ]
  },
  {
    version: "v1.3.0",
    date: "2026-10-15",
    badge: "架構重大升級",
    badgeClass: "bg-primary/15 text-primary border-primary/30",
    title: "shadcn/ui 與 Radix Primitives 全面遷移",
    description: "以正式原始碼自有的 shadcn/ui 元件與 Radix UI 原生基底，全面替換舊有的手寫按鈕、下拉選單與側邊欄抽屜。",
    highlights: [
      "嚴格落實在正式頁面中 0 裸原生 HTML button 或 select 標籤",
      "在 components/ui/ 下新增 17 個核心 shadcn 基底元件",
      "推出首批 5 個台灣電商模式：ProductCard、SizeSelector、QuantityStepper、PDPStickyBar、MobileMegaMenu",
      "建置自動化靜態測試套件 tests/shadcn.test.mjs，具備 6 道驗證閘門"
    ],
    sections: [
      {
        tag: "遷移之 UI 基底",
        items: [
          "Button、Input、Card、Tabs、Badge、Label、Separator、Skeleton、Textarea",
          "Select (@radix-ui/react-select)、Dialog (@radix-ui/react-dialog)、Sheet (@radix-ui/react-dialog)",
          "Command (cmdk)、Checkbox (@radix-ui/react-checkbox)、DropdownMenu (@radix-ui/react-dropdown-menu)、Popover、ScrollArea"
        ]
      },
      {
        tag: "首發電商元件套件",
        items: [
          "ProductCard 與 ProductCardSkeleton，徹底杜絕非同步載入版面跳動",
          "SizeSelector 支援台灣標準床墊台尺規格切換",
          "QuantityStepper 具備 44px 觸控點擊範圍與 aria-live 即時語音播報",
          "PDPStickyBar 提升手機版轉換率，具備即時規格與價格連動",
          "MobileMegaMenu 具備多品牌切換的分頁導覽抽屜"
        ]
      }
    ]
  },
  {
    version: "v1.2.0",
    date: "2026-10-15",
    badge: "無障礙與設計審查",
    badgeClass: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    title: "資深 UX/UI 與無障礙對比度深度審查",
    description: "針對所有品牌色彩搭配進行嚴謹的 WCAG 2.2 AA 審查。正式確立 Sunset 橘色主色搭配深墨色文字，以及 Helix 強調色搭配純黑文字。",
    highlights: [
      "Sunset 主色無障礙前景色：將原本對比度不足的白色文字 (2.64:1 不及格) 修正為深墨色 #1C1526 (6.72:1 通過 AA)",
      "Helix 強調色前景色：在薰衣草紫 #9362D9 上強制採用純黑文字 (4.99:1 通過 AA)",
      "正式確立第 4 個品牌主題：Lunio Bedding (#1C46B4)，專注於頂級天絲寢具配件",
      "在自動化測試套件中導入色彩對比度驗證演算法"
    ],
    sections: [
      {
        tag: "無障礙修正",
        items: [
          "在 Sunset 晨曦橘 (#F28131) 上強制規範 color/on-primary 為深墨色 (#1C1526)",
          "在 Helix 薰衣草紫 (#9362D9) 上強制規範 color/on-accent 為純黑色 (#000000)",
          "將對比度檢驗加入自動化測試流程"
        ]
      },
      {
        tag: "品牌架構",
        items: [
          "新增 Lunio Bedding (第 4 品牌)，涵蓋天絲床包、保潔墊與四季被",
          "同步 DESIGN.md 與 tokens.json 中的跨品牌調色盤"
        ]
      }
    ]
  },
  {
    version: "v1.1.0",
    date: "2026-10-14",
    badge: "字體排印與節奏",
    badgeClass: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    title: "MiSansTC 字體排印體系與 4px 空間節奏網格",
    description: "全面標準化 MiSansTC 字體家族、5 組官方字重、12 組響應式排印角色，以及嚴謹的 4px 空間律動。",
    highlights: [
      "以 MiSansTC 作為繁體中文與歐文字形的唯一權威字體家族",
      "五組官方字重尺度：Regular (400)、Medium (500)、Semibold (600)、Bold (700)、Heavy (800)",
      "12 組響應式排印角色，從 Display 超大展示字級至 Micro Caption 微型註記",
      "嚴格遵守 4px 網格節奏與圓角規範 (8px 控制項、16px 容器、9999px 膠囊)"
    ],
    sections: [
      {
        tag: "字體排印",
        items: [
          "標準化 font-family: 'MiSansTC', 'PingFang TC', 'Microsoft JhengHei', sans-serif",
          "自動生成電腦版 (1440px) 與手機版 (375px) 的響應式 clamp 工具類別"
        ]
      },
      {
        tag: "空間基礎",
        items: [
          "4px 空間尺度：從 space-1 (4px) 至 space-24 (96px)",
          "控制項圓角：8px (rounded-lg)，用於按鈕、輸入框、下拉選單",
          "容器圓角：16px (rounded-2xl)，用於卡片、抽屜、對話框"
        ]
      }
    ]
  },
  {
    version: "v1.0.0",
    date: "2026-10-10",
    badge: "初版發布",
    badgeClass: "bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30",
    title: "初版多品牌平台基礎架構建立",
    description: "Lunio 多品牌設計系統首度發布，建立 Token 編譯架構與支援 Lunio Taiwan、Nooz Helix、Nooz Sunset 的多品牌作用域。",
    highlights: [
      "在 tokens.json 中建立統一的設計 Token 來源，並配備 build-tokens.mjs 編譯腳本",
      "透過 [data-brand='...'] CSS 屬性實現動態多品牌作用域切換",
      "官方權威品牌標誌資產 (Retina @4x PNG 與無損向量 SVG 格式)",
      "基於 Next.js Turbopack 建置的即時展示與文件網站"
    ],
    sections: [
      {
        tag: "平台基礎架構",
        items: [
          "生成 CSS 自訂屬性的 Token 編譯管線",
          "Lunio、Nooz Helix 與 Nooz Sunset 品牌專屬主題",
          "基準互動式設計系統文件頁面"
        ]
      }
    ]
  }
];

const releaseListEn = [
  {
    version: "v1.4.1",
    date: "2026-10-16",
    badge: "Latest · Production Certified",
    badgeClass: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    title: "TypeScript Production Hardening, Vercel Build Fix & Component API Ergonomics",
    description: "Resolved all TypeScript property incompatibility errors during Vercel production Next.js builds, added backward-compatible prop aliases and compact layout variants across ProductCard, PriceBlock, PDPStickyBar, and ReassuranceRow, and extended automated test gates to verify 5th brand Lunio Life theme inheritance.",
    highlights: [
      "Resolved Vercel Build TS2353/TS2322 errors: added full support for priceAmount, compareAtAmount, size, sizeNote, compact, and discountBadge aliases",
      "Introduced ReassuranceRow compact capsule strip layout for high-density PDP buy sections and mobile sheets",
      "Enhanced tests/shadcn.test.mjs automated quality gate to assert data-brand=\"lunio-life\" alongside the existing 4 brands",
      "Verified across 9/9 token tests, 6/6 shadcn tests, 0 TypeScript errors, and 19/19 SSG static routes"
    ],
    sections: [
      {
        tag: "Production Build & TypeScript Hardening",
        items: [
          "CommerceProductSummary and ProductCard support priceAmount and compareAtAmount aliases",
          "PriceBlockProps and PriceBlock support salePrice / priceAmount, regularPrice / compareAtAmount, and size (sm/md/lg/xl) / sizeNote",
          "PDPStickyBarProps and PDPStickyBar support priceAmount, compareAtAmount, and discountBadge",
          "ReassuranceRow supports compact?: boolean prop and 4-column inline strip layout"
        ]
      },
      {
        tag: "Test Gates & Spec Alignment",
        items: [
          "tests/shadcn.test.mjs adds lunio-life assertion covering all 5 storefront brands",
          "Synchronized DESIGN.md, tokens.json, and package.json to v1.4.1"
        ]
      }
    ]
  },
  {
    version: "v1.4.0",
    date: "2026-10-16",
    badge: "5-Brand Scope & 19 Commerce Patterns",
    badgeClass: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    title: "lunio.com.tw 5-Brand Architecture (incl. Lunio Life), 22 Primitives & 19 Commerce Patterns",
    description: "Explicitly scoped the design system to lunio.com.tw covering 5 brands, onboarded the 5th brand Lunio Life (#2D274A / #CCD5F8 / #9786F3), standardized all storefront prices on currencyCode ('NT') with a dedicated Sale token (#E53935), and completed all 19 Taiwan commerce patterns.",
    highlights: [
      "Added 5th brand mode data-brand=\"lunio-life\": Plum Night #2D274A (13.99:1 AAA), Titan White #CCD5F8, Crocus Purple #9786F3 (6.15:1 AA with #141414 ink)",
      "Standardized all prices on currencyCode (\"NT\", e.g., NT21,990, eliminating NT$ mixing) and added dedicated --sale (#E53935) token decoupled from --destructive",
      "Synchronized 22 source-owned shadcn/ui primitives and 19 Taiwan e-commerce patterns (completing conversion backlog 001–024)",
      "Implemented 9 conversion backlog suites: PriceBlock, ComparisonTable, ReassuranceRow, PromoBanner, ReviewList, DesktopMegaMenu, CartAddOnCard/CartGiftLine, TaiwanAddressForm/CheckoutStepper, PaymentMethodSelector",
      "Standardized Badge on rounded-full (--radius-pill: 9999px) across DESIGN.md §3, §11.3, and components/ui/badge.tsx",
      "Closed all 5 P0 production readiness items (UX-01, DS-02, DS-03, A11Y-04, DATA-05) with 9/9 token checks passing and 0 TypeScript errors"
    ],
    sections: [
      {
        tag: "5th Brand: Lunio Life & Spec Alignment",
        items: [
          "Onboarded Lunio Life CI: Plum Night (#2D274A), Titan White (#CCD5F8), Crocus Purple (#9786F3), and secondary tokens (#141414, #ECE8D8, #EC9BB0, #F6D0D7)",
          "Added dedicated Sale token (#E53935) for '現省' discount badges, decoupled from form Error (#B42318)",
          "Unified storefront price helper formatPrice(amount, currencyCode) outputting NT21,990"
        ]
      },
      {
        tag: "New Conversion Commerce Suites (Wave 1–3)",
        items: [
          "Wave 1 (Pre-11.11): PriceBlock [005/024], ComparisonTable [016], ReassuranceRow [020], PromoBanner + Sale Badge [015/024]",
          "Wave 2 (Discovery & Cart AOV): ReviewList & ReviewCard [013], DesktopMegaMenu [004], CartAddOnCard & CartGiftLine [014]",
          "Wave 3 (Taiwan Checkout): TaiwanAddressForm & CheckoutStepper [007], PaymentMethodSelector [008]"
        ]
      },
      {
        tag: "22 shadcn/ui Primitives & SKU Accuracy",
        items: [
          "Aligned documentation to all 22 core files in components/ui/ including Accordion, RadioGroup, Tooltip, Breadcrumb, Carousel, Separator",
          "Updated Taiwan mattress dimensions to SKU-verified specs: Single 3ft (89×188×24 cm) and Single XL 3.5ft (104×188×24 cm)",
          "Safe-area bottom insets (env(safe-area-inset-bottom)) for mobile PDP sticky bar"
        ]
      }
    ]
  },
  {
    version: "v1.3.0",
    date: "2026-10-15",
    badge: "Major Architecture",
    badgeClass: "bg-primary/15 text-primary border-primary/30",
    title: "shadcn/ui & Radix Primitives Migration",
    description: "Replaced handcrafted UI buttons, selects, and drawers with genuine source-owned shadcn/ui components on Radix UI primitives.",
    highlights: [
      "Strict zero raw HTML button or select elements policy in live pages",
      "Added 17 core shadcn primitives under components/ui/",
      "Introduced first 5 Taiwan commerce patterns: ProductCard, SizeSelector, QuantityStepper, PDPStickyBar, MobileMegaMenu",
      "Automated static testing suite tests/shadcn.test.mjs with 6 verification gates"
    ],
    sections: [
      {
        tag: "Migrated Primitives",
        items: [
          "Button, Input, Card, Tabs, Badge, Label, Separator, Skeleton, Textarea",
          "Select (@radix-ui/react-select), Dialog (@radix-ui/react-dialog), Sheet (@radix-ui/react-dialog)",
          "Command (cmdk), Checkbox (@radix-ui/react-checkbox), DropdownMenu (@radix-ui/react-dropdown-menu), Popover, ScrollArea"
        ]
      },
      {
        tag: "Initial Commerce Suite",
        items: [
          "ProductCard & ProductCardSkeleton for zero layout shift",
          "SizeSelector with Taiwan standard mattress dimensions",
          "QuantityStepper with 44px touch targets and aria-live announcements",
          "PDPStickyBar for mobile conversion with live variation pricing",
          "MobileMegaMenu with multi-brand tabbed navigation drawer"
        ]
      }
    ]
  },
  {
    version: "v1.2.0",
    date: "2026-10-15",
    badge: "Accessibility & Review",
    badgeClass: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    title: "Senior UX/UI & Accessible Contrast Review",
    description: "Conducted deep WCAG 2.2 AA review of all brand color pairings. Established accessible dark text for Sunset primary and black text for Helix accent.",
    highlights: [
      "Sunset Primary Accessible Foreground: Fixed low contrast white text (2.64:1 fail) to dark ink #1C1526 (6.72:1 pass AA)",
      "Helix Accent Foreground: Enforced black ink on lavender #9362D9 (4.99:1 pass AA)",
      "Established official 4th brand theme: Lunio Bedding (#1C46B4) for premium bedding accessories",
      "Automated contrast checking formula in test suite"
    ],
    sections: [
      {
        tag: "Accessibility Fixes",
        items: [
          "Mandated color/on-primary dark ink (#1C1526) on Sunset Orange (#F28131)",
          "Mandated color/on-accent black ink (#000000) on Helix Lavender (#9362D9)",
          "Added contrast validation checks to automated test runner"
        ]
      },
      {
        tag: "Brand Architecture",
        items: [
          "Added Lunio Bedding (4th brand) with Tencel bed sheets, mattress protectors, and duvets",
          "Synchronized brand palettes across DESIGN.md and tokens.json"
        ]
      }
    ]
  },
  {
    version: "v1.1.0",
    date: "2026-10-14",
    badge: "Typography & Rhythm",
    badgeClass: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    title: "MiSansTC Typography & 4px Rhythm Grid",
    description: "Standardized on MiSansTC font family, 5 font weights, 12 responsive typographic roles, and a deliberate 4px spatial rhythm.",
    highlights: [
      "MiSansTC single authoritative font stack for Traditional Chinese and Latin glyphs",
      "Five official weights scale: Regular (400), Medium (500), Semibold (600), Bold (700), Heavy (800)",
      "12 responsive typography roles from Display to Micro Caption",
      "Strict 4px grid rhythm and radii rules (8px control, 16px container, 9999px pill)"
    ],
    sections: [
      {
        tag: "Typography",
        items: [
          "Standardized font-family: 'MiSansTC', 'PingFang TC', 'Microsoft JhengHei', sans-serif",
          "Generated responsive clamp utilities for desktop (1440px) and mobile (375px)"
        ]
      },
      {
        tag: "Spatial Foundation",
        items: [
          "4px spatial scale: space-1 (4px) to space-24 (96px)",
          "Control radius: 8px (rounded-lg) for buttons, inputs, selects",
          "Container radius: 16px (rounded-2xl) for cards, sheets, dialogs"
        ]
      }
    ]
  },
  {
    version: "v1.0.0",
    date: "2026-10-10",
    badge: "Initial Release",
    badgeClass: "bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30",
    title: "Initial Multi-Brand Platform Foundation",
    description: "First release of Lunio Multi-Brand Design System establishing token architecture and multi-brand scope for Lunio Taiwan, Nooz Helix, and Nooz Sunset.",
    highlights: [
      "Unified design token source in tokens.json with automated build-tokens.mjs script",
      "Dynamic multi-brand scoping via [data-brand='...'] CSS attributes",
      "Authoritative brand marks (Retina @4x PNGs and lossless SVG vectors)",
      "Next.js Turbopack documentation showcase site"
    ],
    sections: [
      {
        tag: "Platform Foundation",
        items: [
          "Token compilation pipeline generating CSS custom properties",
          "Brand themes for Lunio, Nooz Helix, and Nooz Sunset",
          "Baseline interactive documentation pages"
        ]
      }
    ]
  }
];

function ReleaseCard({ release }: { release: typeof releaseListZh[0] }) {
  const { isZh } = useLanguage();
  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs transition hover:border-primary/40">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[20px] font-extrabold text-foreground">{release.version}</span>
          <span className={cn("rounded-md border px-2 py-0.5 text-[11px] font-semibold", release.badgeClass)}>
            {release.badge}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar size={14} />
          <span>{release.date}</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="typo-h3 text-foreground">{release.title}</h3>
        <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{release.description}</p>
      </div>
      <div className="mt-5 rounded-lg border border-border/60 bg-muted/40 p-4">
        <div className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-primary">
          {isZh ? "核心里程碑亮點" : "Key Highlights"}
        </div>
        <ul className="space-y-1.5 text-[12px] leading-5 text-foreground">
          {release.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-500" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {release.sections.map((sec, i) => (
          <div key={i} className="rounded-lg border border-border/60 p-3.5 bg-background">
            <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">{sec.tag}</div>
            <ul className="space-y-1 text-[12px] text-muted-foreground">
              {sec.items.map((it, j) => (
                <li key={j} className="flex items-start gap-1.5">
                  <span className="text-primary font-bold">·</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChangelogPage() {
  const { isZh } = useLanguage();
  const releaseList = isZh ? releaseListZh : releaseListEn;

  return (
    <div className="space-y-9">
      <div className="docs-block">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {isZh ? "目前版本：v1.4.1 (Production Certified)" : "Current: v1.4.1 (Production Certified)"}
              </span>
              <span className="text-xs text-muted-foreground">
                {isZh ? "發布日期：2026-10-16" : "Released 2026-10-16"}
              </span>
            </div>
            <h2 className="mt-2 text-[24px] font-extrabold tracking-tight text-foreground">
              {isZh ? "版本發布說明與歷程記錄" : "Release Notes & Version History"}
            </h2>
            <p className="mt-1 text-[13px] leading-6 text-muted-foreground">
              {isZh ? "完整追蹤 lunio.com.tw 五大品牌、22 個 UI 原生基底、19 個電商模式與架構改進的歷次版本演進。" : "Comprehensive release record tracking lunio.com.tw's 5 brands, 22 UI primitives, 19 commerce patterns, and architectural improvements."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="outline" size="sm" className="gap-2">
              <a href="/CHANGELOG.md" download>
                <Download size={14} /> {isZh ? "下載 CHANGELOG.md" : "Download CHANGELOG.md"}
              </a>
            </Button>
            <Button asChild variant="outline" size="sm" className="gap-2">
              <a href="/DESIGN.md" download>
                <FileCode2 size={14} /> {isZh ? "下載 DESIGN.md" : "Download DESIGN.md"}
              </a>
            </Button>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg border border-border/80 bg-muted/30 p-3.5 text-center">
            <div className="text-[24px] font-bold text-primary">5</div>
            <div className="text-[11px] font-medium text-muted-foreground">{isZh ? "官方商城品牌數" : "Storefront Brands"}</div>
          </div>
          <div className="rounded-lg border border-border/80 bg-muted/30 p-3.5 text-center">
            <div className="text-[24px] font-bold text-primary">22</div>
            <div className="text-[11px] font-medium text-muted-foreground">{isZh ? "shadcn 原生基底" : "shadcn Primitives"}</div>
          </div>
          <div className="rounded-lg border border-border/80 bg-muted/30 p-3.5 text-center">
            <div className="text-[24px] font-bold text-primary">19</div>
            <div className="text-[11px] font-medium text-muted-foreground">{isZh ? "台灣電商模式" : "Commerce Patterns"}</div>
          </div>
          <div className="rounded-lg border border-border/80 bg-muted/30 p-3.5 text-center">
            <div className="text-[24px] font-bold text-primary">100%</div>
            <div className="text-[11px] font-medium text-muted-foreground">{isZh ? "P0 與品質閘門通過" : "P0 & Quality Gates Pass"}</div>
          </div>
        </div>
      </div>

      <div className="docs-block">
        <Subheading
          title={isZh ? "瀏覽各版本發布紀錄" : "Browse Releases"}
          desc={isZh ? "可點選特定版本標籤篩選，或檢視完整時間軸歷程。" : "Filter release notes by specific version tag or view the entire chronological timeline."}
        />
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 flex flex-wrap h-auto p-1 bg-muted/60">
            <TabsTrigger value="all" className="text-xs">{isZh ? "全部版本 (6)" : "All Releases (6)"}</TabsTrigger>
            <TabsTrigger value="v1.4.1" className="text-xs">{isZh ? "v1.4.1 (最新)" : "v1.4.1 (Latest)"}</TabsTrigger>
            <TabsTrigger value="v1.4.0" className="text-xs">v1.4.0</TabsTrigger>
            <TabsTrigger value="v1.3.0" className="text-xs">v1.3.0</TabsTrigger>
            <TabsTrigger value="v1.2.0" className="text-xs">v1.2.0</TabsTrigger>
            <TabsTrigger value="v1.1.0" className="text-xs">v1.1.0</TabsTrigger>
            <TabsTrigger value="v1.0.0" className="text-xs">v1.0.0</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {releaseList.map(r => (
              <ReleaseCard key={r.version} release={r} />
            ))}
          </TabsContent>

          {releaseList.map(r => (
            <TabsContent key={r.version} value={r.version} className="space-y-6">
              <ReleaseCard release={r} />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="docs-block">
        <Subheading
          title={isZh ? "安裝與驗證指令" : "Installation & Verification Commands"}
          desc={isZh ? "在本地終端機執行以下指令以安裝或驗證最新版本。" : "Run these commands in terminal to install or verify the latest release."}
        />
        <CodePanel label="TERMINAL / BASH" code={`npm install\nnpm run tokens:build\nnpm run check\nnpm run build`} />
      </div>

      <SpecNote>
        {isZh
          ? "語意化版本號 (Semantic Versioning) 保證任何重大 Token 或介面調整皆會遞增主/次版本號。所有更新皆保證與已核准之品牌 Token 及 Radix data-slot 規格完全向下相容。"
          : "Semantic versioning guarantees that breaking token or interface changes increment the major/minor numbers. All updates preserve backward compatibility for approved brand tokens and Radix data-slot conventions."}
      </SpecNote>
    </div>
  );
}

function IconsPage() {
  const { isZh } = useLanguage();
  return (
    <div className="space-y-12">
      <div className="docs-block">
        <Subheading
          title={isZh ? "Lunio 官方精選圖示庫 (lunio.com.tw)" : "Lunio Curated Icon Gallery (lunio.com.tw)"}
          desc={isZh ? "精選 50+ 組專為台灣床墊與寢具電商量身打造之 Lucide React 向量圖示。支援自訂尺寸、筆畫寬度切換與一鍵複製 JSX 程式碼。" : "Curated 50+ Lucide React vector icons tailored for Taiwan mattress and bedding e-commerce. Supports size previews, stroke customization, and one-click JSX copying."}
        />
        <IconsGallery />
      </div>

      <div className="docs-block">
        <Subheading
          title={isZh ? "台灣電商四大安心保證實務展示" : "Taiwan E-Commerce Trust Badges Live Demo"}
          desc={isZh ? "lunio.com.tw 在商品詳情頁 (PDP) 與購物車重點展示之四大安心保證模組，結合語意 Token 與標準化圖示。" : "The four signature trust assurance modules displayed across lunio.com.tw PDP and checkout, combining semantic tokens and standardized iconography."}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-border bg-card p-4 transition hover:border-primary/50 shadow-xs flex flex-col items-center text-center">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Moon size={24} strokeWidth={2} aria-hidden="true" />
            </div>
            <h4 className="text-sm font-bold text-foreground">{isZh ? "100 晚安心試睡" : "100-Night Sleep Trial"}</h4>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{isZh ? "在家親身感受無重力好眠，不滿意專人協助回收退款" : "Experience zero-gravity sleep at home with full return assistance"}</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 transition hover:border-primary/50 shadow-xs flex flex-col items-center text-center">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Truck size={24} strokeWidth={2} aria-hidden="true" />
            </div>
            <h4 className="text-sm font-bold text-foreground">{isZh ? "全台免運送到府" : "Free Nationwide Delivery"}</h4>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{isZh ? "台灣本島專車免運送到府，公寓樓層費全免專人搬運" : "Free white-glove specialized delivery with zero stairs surcharge"}</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 transition hover:border-primary/50 shadow-xs flex flex-col items-center text-center">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
              <ShieldCheck size={24} strokeWidth={2} aria-hidden="true" />
            </div>
            <h4 className="text-sm font-bold text-foreground">{isZh ? "10 年原廠核心保固" : "10-Year Factory Warranty"}</h4>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{isZh ? "天然乳膠與高錳鋼彈簧結構，享有 10 年抗下陷保固承諾" : "Guaranteed anti-sag structural durability on latex and pocket coils"}</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 transition hover:border-primary/50 shadow-xs flex flex-col items-center text-center">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
              <RotateCcw size={24} strokeWidth={2} aria-hidden="true" />
            </div>
            <h4 className="text-sm font-bold text-foreground">{isZh ? "免費舊床回收協助" : "Free Mattress Recycling"}</h4>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{isZh ? "專車配送時免費協助將舊床搬運至一樓或配合環保局回收" : "Free assistance moving old mattress downstairs upon delivery"}</p>
          </div>
        </div>
      </div>

      <div className="docs-block">
        <Subheading
          title={isZh ? "尺寸階層與排版對應規範" : "Icon Size Hierarchy & Typography Pairing"}
          desc={isZh ? "全站圖示嚴格遵循 4px 空間律動，與 MiSans TC 文字階層形成最佳視覺比例。" : "Icons strictly adhere to the 4px rhythm, creating balanced visual hierarchy alongside MiSans TC typography."}
        />
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border text-[11px] font-semibold text-muted-foreground">
              <tr>
                <th className="p-3.5">{isZh ? "尺寸 (Size)" : "Size"}</th>
                <th className="p-3.5">{isZh ? "Tailwind 類別" : "Tailwind Class"}</th>
                <th className="p-3.5">{isZh ? "文字角色配對" : "Paired Typography"}</th>
                <th className="p-3.5">{isZh ? "電商建議應用情境" : "Recommended Context"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="p-3.5 font-mono font-bold text-foreground">16px</td>
                <td className="p-3.5 font-mono text-primary">size-4 (16×16px)</td>
                <td className="p-3.5">{isZh ? "Caption (12px) / Label (14px)" : "Caption (12px) / Label (14px)"}</td>
                <td className="p-3.5 text-muted-foreground">{isZh ? "表單輸入框前後綴、麵包屑箭頭、輔助提示徽章" : "Input prefixes/suffixes, breadcrumb chevrons, compact helper badges"}</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono font-bold text-foreground">20px</td>
                <td className="p-3.5 font-mono text-primary">size-5 (20×20px)</td>
                <td className="p-3.5">{isZh ? "Body MD (16px) / Button (14px)" : "Body MD (16px) / Button (14px)"}</td>
                <td className="p-3.5 text-muted-foreground">{isZh ? "標準按鈕 (Button)、PDP 常駐購買列、全站導覽抽屜" : "Standard interactive buttons, sticky purchase bar, navigation drawer items"}</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono font-bold text-foreground">24px</td>
                <td className="p-3.5 font-mono text-primary">size-6 (24×24px)</td>
                <td className="p-3.5">{isZh ? "H4 (20px) / H3 (24px)" : "H4 (20px) / H3 (24px)"}</td>
                <td className="p-3.5 text-muted-foreground">{isZh ? "規格特色分類卡片、手風琴標題、彈窗標題" : "Category feature cards, accordion triggers, modal headers"}</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono font-bold text-foreground">32px</td>
                <td className="p-3.5 font-mono text-primary">size-8 (32×32px)</td>
                <td className="p-3.5">{isZh ? "H2 (28px) / H1 (36px)" : "H2 (28px) / H1 (36px)"}</td>
                <td className="p-3.5 text-muted-foreground">{isZh ? "安心信任保證模組、購物車空狀態、全館活動橫幅" : "Trust guarantee modules, empty cart states, campaign banners"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="docs-block">
        <Subheading
          title={isZh ? "無障礙 WCAG 2.2 AA 規範" : "Accessibility & WCAG 2.2 AA Rules"}
          desc={isZh ? "確保圖示在螢幕閱讀器與鍵盤導航下具備完善的語意可達性。" : "Ensure icons are accessible for screen readers and keyboard navigation."}
        />
        <div className="space-y-4">
          <SpecNote>
            {isZh
              ? "若圖示僅作為文字輔助的裝飾性用途（例如按鈕內有文字「加入購物車」並附帶購物袋圖示），必須加上 aria-hidden=\"true\" 避免螢幕閱讀器重複報讀。"
              : "When an icon is purely decorative alongside visible text (e.g. 'Add to Cart' with a shopping bag), add aria-hidden=\"true\" to prevent duplicate screen reader announcements."}
          </SpecNote>

          <CodePanel
            label="REACT / ACCESSIBILITY PATTERN"
            code={`// 1. 裝飾性圖示 (有文字並列)
<Button className="gap-2">
  <ShoppingBag className="size-5" aria-hidden="true" />
  <span>加入購物車</span>
</Button>

// 2. 獨立圖示按鈕 (無文字，例如關閉或收藏按鈕)
<Button variant="ghost" size="icon" aria-label="收藏商品">
  <Heart className="size-5" aria-hidden="true" />
  <span className="sr-only">加入願望清單</span>
</Button>`}
          />
        </div>
      </div>
    </div>
  );
}

function CustomIconsPage() {
  return <CustomIconsStudio />;
}

const pages:Record<string,()=>ReactNode>={"getting-started":Overview,brands:BrandPage,typography:TypographyPage,colors:ColorsPage,spacing:SpacingPage,icons:IconsPage,"custom-icons":CustomIconsPage,components:ComponentsPage,commerce:CommercePage,accessibility:AccessibilityPage,release:ReleasePage,changelog:ChangelogPage};

const titlesZh: Record<string, string> = {
  "getting-started": "快速入門指南",
  brands: "多品牌規範",
  typography: "字體排印系統",
  colors: "色彩與語意 Token",
  spacing: "空間與佈局律動",
  icons: "圖示系統與規範",
  "custom-icons": "自訂圖示上傳與規範",
  components: "核心 UI 元件庫",
  commerce: "台灣電商元件",
  accessibility: "無障礙檢驗標準",
  release: "生產環境發布",
  changelog: "更新日誌與版本",
  source: "完整 DESIGN.md",
};

export function DocsContent({slug}:{slug:string}){
  const { isZh, t } = useLanguage();
  const meta = sections[slug];
  const localizedSection = (t.sections as Record<string, { kicker: string; title: string; intro: string }>)[slug];
  const content = pages[slug];
  const index = allDocs.findIndex(d=>d.slug===slug);
  if(!meta||!content)return null;
  const prev = index>0 ? allDocs[index-1] : undefined;
  const next = allDocs[index+1];
  const Content = content;
  const kicker = localizedSection?.kicker || meta.kicker;
  const title = localizedSection?.title || meta.title;
  const intro = localizedSection?.intro || meta.intro;
  const prevTitle = prev ? (isZh ? (titlesZh[prev.slug] || prev.title) : prev.title) : "";
  const nextTitle = next ? (isZh ? (titlesZh[next.slug] || next.title) : next.title) : "";
  return <article className="docs-article">
    <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
      <span className="eyebrow text-primary">{meta.number} / {kicker}</span>
      <span className="text-[11px] text-muted-foreground">LUNIO DS · v1.4.1</span>
    </div>
    <h1 className="typo-h1 max-w-4xl tracking-[-.03em]">{title}</h1>
    <p className="typo-body-md mt-4 max-w-3xl text-muted-foreground">{intro}</p>
    <div className="my-9 h-px bg-border"/>
    <Content/>
    {(prev||next)&&<nav aria-label={isZh ? "章節分頁導覽" : "Documentation pagination"} className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
      {prev ? (
        <Link href={`/docs/${prev.slug}`} className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 transition hover:border-primary hover:shadow-xs">
          <ArrowLeft size={20} className="shrink-0 text-primary transition-transform group-hover:-translate-x-1"/>
          <div className="min-w-0 flex-1 text-right sm:text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">{isZh ? "上一節" : "PREVIOUS"} · {prev.number}</span>
            <div className="mt-1.5 truncate text-[15px] font-bold text-foreground transition-colors group-hover:text-primary">{prevTitle}</div>
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
      {next && (
        <Link href={`/docs/${next.slug}`} className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 transition hover:border-primary hover:shadow-xs sm:text-right">
          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">{isZh ? "下一節" : "UP NEXT"} · {next.number}</span>
            <div className="mt-1.5 truncate text-[15px] font-bold text-foreground transition-colors group-hover:text-primary">{nextTitle}</div>
          </div>
          <ArrowRight size={20} className="shrink-0 text-primary transition-transform group-hover:translate-x-1"/>
        </Link>
      )}
    </nav>}
  </article>;
}
