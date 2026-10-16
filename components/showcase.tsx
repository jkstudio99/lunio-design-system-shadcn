"use client";
import Link from "next/link";
import {useState} from "react";
import {ArrowLeft,BookOpen,Check,CheckCircle2,ChevronRight,Copy,Download,Menu,Search,X} from "lucide-react";
import {BrandSwitcher, MobileBrandGrid} from "@/components/brand-switcher";
import {ThemeToggle, MobileThemeSelector} from "@/components/theme-toggle";
import {LanguageToggle, MobileLanguageSelector} from "@/components/language-toggle";
import {useLanguage} from "@/components/language-provider";
import {brands} from "@/lib/design-system";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Sheet,SheetClose,SheetContent,SheetTrigger,SheetHeader,SheetTitle,SheetDescription} from "@/components/ui/sheet";
export function Showcase(){
 const {isZh,t}=useLanguage();
 const [copied,setCopied]=useState(false);const [mobileOpen,setMobileOpen]=useState(false);
 const code="npm install\nnpm run tokens:build\nnpm run tokens:check\nnpm run dev";
 const copy=async()=>{try{await navigator.clipboard.writeText(code);setCopied(true);setTimeout(()=>setCopied(false),1800)}catch{setCopied(false)}};
 return <div className="showcase-shell">
  <header className="shell-border border-x-0 border-t-0">
    <div className="shell-container flex min-h-[58px] sm:min-h-[76px] items-center justify-between gap-2 sm:gap-4">
      <Link href="/" className="flex items-center gap-1.5 sm:gap-2.5 transition-opacity hover:opacity-85 shrink-0" aria-label="Lunio Design System Home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/lunio/lunio-primary.svg" alt="Lunio" className="logo-theme-light h-[22px] sm:h-[28px] w-auto object-contain" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/lunio/lunio-white.svg" alt="Lunio" className="logo-theme-dark h-[22px] sm:h-[28px] w-auto object-contain" />
        <span className="text-[13px] sm:text-[15px] font-semibold tracking-tight text-muted-foreground">/design</span>
        <span className="hidden sm:inline-flex rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">v1.4</span>
      </Link>
      <nav className="hidden items-center gap-7 text-[13px] lg:flex">
        <Link href="/docs/getting-started" className="shell-link">{isZh ? "快速入門" : "Documentation"}</Link>
        <Link href="/docs/components" className="shell-link">{isZh ? "元件庫" : "Components"}</Link>
        <Link href="/docs/typography" className="shell-link">{isZh ? "設計 Token" : "Tokens"}</Link>
        <Link href="/docs/changelog" className="shell-link">{isZh ? "更新日誌" : "Changelog"}</Link>
        <Link href="/docs/source" className="shell-link">DESIGN.md</Link>
      </nav>
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Mobile quick search link */}
        <Button asChild variant="outline" size="sm" className="flex sm:hidden h-8 px-2.5 items-center gap-1.5 rounded-lg border-border/80 bg-muted/40 text-muted-foreground hover:text-foreground text-xs font-normal">
          <Link href="/docs/getting-started">
            <Search size={13} className="text-primary" />
            <span>{isZh ? "搜尋規範..." : "Search..."}</span>
          </Link>
        </Button>
        <BrandSwitcher className="hidden sm:inline-flex" />
        <ThemeToggle className="hidden sm:inline-flex" />
        <LanguageToggle className="hidden sm:inline-flex" />
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="size-9 border-border bg-background text-foreground lg:hidden" aria-label="Open mobile navigation">
              <Menu size={18}/>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" showCloseButton={false} className="w-[min(90vw,350px)] gap-0 p-0 flex flex-col border-l border-border">
            <SheetHeader className="h-[58px] px-4 py-0 border-b border-border/80 flex flex-row items-center justify-between gap-3 space-y-0 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/lunio/lunio-primary.svg" alt="Lunio" className="logo-theme-light h-[22px] w-auto object-contain" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/lunio/lunio-white.svg" alt="Lunio" className="logo-theme-dark h-[22px] w-auto object-contain" />
                <Badge variant="outline" className="text-[10px] font-mono px-1.5 py-0">v1.4</Badge>
              </div>
              <SheetTitle className="sr-only">Lunio Design System</SheetTitle>
              <SheetDescription className="sr-only">Mobile navigation</SheetDescription>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="size-9 shrink-0 rounded-lg border border-border/70 bg-muted/30 text-muted-foreground hover:bg-accent hover:text-foreground"
                  aria-label={isZh ? "關閉導覽選單" : "Close navigation menu"}
                >
                  <X className="size-4" />
                </Button>
              </SheetClose>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* 4-Brand Grid */}
              <div className="rounded-xl border border-border/80 bg-card p-3 shadow-2xs">
                <div className="flex items-center justify-between mb-2 px-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {isZh ? "切換品牌體驗" : "Brand Theme"}
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-primary">
                    {isZh ? "4 大品牌" : "4 BRANDS"}
                  </span>
                </div>
                <MobileBrandGrid onSelect={() => {}} />
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                <div className="mb-2 px-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {isZh ? "主要章節導覽" : "Documentation"}
                </div>
                {[
                  { label: isZh ? "快速入門指南" : "Getting started", href: "/docs/getting-started", num: "00" },
                  { label: isZh ? "品牌基礎與規範" : "Brand foundations", href: "/docs/brands", num: "01" },
                  { label: isZh ? "字體排印系統" : "MiSansTC Typography", href: "/docs/typography", num: "02" },
                  { label: isZh ? "色彩與語意 Token" : "Colors & WCAG Target", href: "/docs/colors", num: "04" },
                  { label: isZh ? "空間與佈局律動" : "Spacing 4px Rhythm", href: "/docs/spacing", num: "05" },
                  { label: isZh ? "官方圖示庫 (Lucide)" : "Lucide Icon System", href: "/docs/icons", num: "06" },
                  { label: isZh ? "自訂圖示工作室" : "Custom Icons Studio", href: "/docs/custom-icons", num: "07" },
                  { label: isZh ? "核心 UI 元件庫" : "Core UI components", href: "/docs/components", num: "08" },
                  { label: isZh ? "台灣電商元件" : "Commerce patterns", href: "/docs/commerce", num: "09" },
                  { label: isZh ? "無障礙檢驗標準" : "Accessibility (WCAG AA)", href: "/docs/accessibility", num: "10" },
                  { label: isZh ? "生產環境發布" : "Production checklist", href: "/docs/release", num: "11" },
                  { label: isZh ? "更新日誌與版本" : "Changelog & versions", href: "/docs/changelog", num: "12" },
                  { label: isZh ? "完整規範手冊" : "Full DESIGN.md", href: "/docs/source", num: "MD" },
                ].map((item) => (
                  <Button
                    key={item.href}
                    asChild
                    variant="ghost"
                    className="w-full justify-between h-10 px-3 text-xs font-medium hover:bg-accent/60"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Link href={item.href}>
                      <span className="flex items-center gap-2.5">
                        <span className="font-mono text-[10px] text-muted-foreground">{item.num}</span>
                        <span>{item.label}</span>
                      </span>
                      <ChevronRight size={14} className="text-muted-foreground" />
                    </Link>
                  </Button>
                ))}
              </div>
            </div>

            {/* Footer with Language and Theme */}
            <div className="border-t border-border/80 p-3.5 bg-muted/20 space-y-3">
              <div>
                <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {isZh ? "顯示語言" : "Language"}
                </div>
                <MobileLanguageSelector />
              </div>
              <div>
                <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {isZh ? "色彩主題" : "Theme Mode"}
                </div>
                <MobileThemeSelector />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
  <main className="shell-container pb-32">
   <div className="showcase-hero">
    <Link href="/docs/getting-started" className="mb-6 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
      <ArrowLeft size={14}/> {isZh ? "返回設計系統手冊" : "Back to system documentation"}
    </Link>
    <div className="flex flex-wrap items-start justify-between gap-5">
      <div>
        <div className="eyebrow mb-4 text-primary">{isZh ? "LUNIO 多品牌設計系統規範" : "DESIGN SYSTEM ANALYSIS / LUNIO"}</div>
        <h1 className="max-w-[840px] text-[clamp(34px,4.4vw,62px)] leading-[1.04] tracking-[-.055em] font-bold">
          {t.showcase.heroTitleLine1}<br/><span className="text-muted-foreground">{t.showcase.heroTitleLine2}</span>
        </h1>
        <p className="mt-5 max-w-[680px] text-[15px] leading-7 text-muted-foreground">
          {t.showcase.heroSubtitle}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link href="/docs/source" className="shell-action inline-flex items-center gap-2">
          <BookOpen size={14}/> {t.showcase.readSpec}
        </Link>
        <a href="/DESIGN.md" download className="shell-action inline-flex items-center gap-2">
          <Download size={14}/> {t.showcase.downloadSpec}
        </a>
      </div>
    </div>
   </div>
   <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_290px]">
    <div className="shell-card p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="eyebrow text-muted-foreground">{t.showcase.usageTitle}</div>
        <span className="text-[11px] text-muted-foreground">{t.showcase.usageStack}</span>
      </div>
      <div className="relative rounded-lg border border-border/80 bg-slate-50/90 dark:bg-[#161C28] dark:border-[#2A344A] px-5 py-5 pr-16 font-mono text-[12px] leading-6 text-foreground shadow-xs">
        <span className="text-primary font-bold"> </span>npm run tokens:build<br/>
        <span className="text-primary font-bold"> </span>npm run tokens:check<br/>
        <span className="text-primary font-bold"> </span>npm run dev
        <div className="absolute right-3.5 top-3.5 z-10">
          <Button
            variant="outline"
            size="sm"
            onClick={copy}
            aria-label={copied ? (isZh ? "已複製安裝指令至剪貼簿" : "Copied installation commands to clipboard") : (isZh ? "複製安裝指令" : "Copy installation commands")}
            className="h-8 px-2.5 text-xs font-medium border-border/80 bg-background/95 text-foreground hover:bg-accent hover:text-foreground shadow-xs gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-primary"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            <span>{copied ? (isZh ? "已複製！" : "Copied!") : (isZh ? "複製" : "Copy")}</span>
          </Button>
        </div>
      </div>
      <p className="mt-4 text-[12px] text-muted-foreground">
        {t.showcase.usageDesc}
      </p>
    </div>
    <div className="shell-card flex flex-col justify-between gap-5 p-5 md:p-6">
      <div>
        <div className="eyebrow mb-4 text-muted-foreground">{t.showcase.statusTitle}</div>
        <div className="text-[29px] font-bold text-foreground">12 <span className="text-[13px] font-normal text-muted-foreground">{t.showcase.typeRoles}</span></div>
        <div className="mt-3 flex flex-wrap gap-2">
          {brands.map(b => (
            <span key={b.id} className="inline-flex size-7 items-center justify-center rounded-md border border-black/10 dark:border-white/20 shadow-sm" style={{background: b.primary}} title={b.name}>
              <span className="sr-only">{b.name}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-2 border-t border-border pt-4 text-[12px] text-muted-foreground">
        <div className="flex items-center justify-between"><span>{isZh ? "5 組官方字重" : "5 font weights"}</span><CheckCircle2 size={15} className="text-primary"/></div>
        <div className="flex items-center justify-between"><span>{isZh ? "4 大品牌模式" : "4 brand modes"}</span><CheckCircle2 size={15} className="text-primary"/></div>
        <div className="flex items-center justify-between"><span>{isZh ? "寢具 CI 識別" : "Bedding CI"}</span><span className="text-primary font-medium">{isZh ? "已核准" : "Approved"}</span></div>
      </div>
    </div>
   </section>
   <div className="mt-14 grid gap-8 border-t border-border pt-10 md:grid-cols-3">
     <div>
       <div className="eyebrow mb-3 text-muted-foreground">{isZh ? "設計原則" : "DESIGN PRINCIPLE"}</div>
       <h3 className="text-[18px] font-bold">{isZh ? "MiSans TC 單一字體體系" : "One font, everywhere."}</h3>
       <p className="mt-3 text-[13px] leading-6 text-muted-foreground">{isZh ? "5 組官方字重、12 組響應式角色，杜絕各頁面隨意覆蓋字級。" : "Five weights. Twelve roles. No arbitrary typography overrides from page to page."}</p>
     </div>
     <div>
       <div className="eyebrow mb-3 text-muted-foreground">{isZh ? "多品牌主題" : "THEMING"}</div>
       <h3 className="text-[18px] font-bold">{isZh ? "品牌作用域主題隔離" : "Scoped by brand."}</h3>
       <p className="mt-3 text-[13px] leading-6 text-muted-foreground">{isZh ? "Lunio、Helix、Sunset 與 Lunio Bedding 共享元件架構，精準展現專屬調色盤。" : "Lunio, Helix, Sunset and Lunio Bedding share anatomy while maintaining color expression."}</p>
     </div>
     <div>
       <div className="eyebrow mb-3 text-muted-foreground">{isZh ? "設計代碼落地" : "DESIGN TO CODE"}</div>
       <h3 className="text-[18px] font-bold">{isZh ? "為台灣電商量身打造" : "Built to ship."}</h3>
       <p className="mt-3 text-[13px] leading-6 text-muted-foreground">{isZh ? "語意化 Token、Radix 無障礙互動與台尺床墊規格，賦能高維護性 Next.js 購物網站。" : "Semantic tokens, accessible states and e-commerce contracts for a maintainable Next.js storefront."}</p>
     </div>
   </div>
  </main>
  <footer className="border-t border-border py-8">
    <div className="shell-container flex flex-wrap items-center justify-between gap-3 text-[12px] text-muted-foreground">
      <div>{isZh ? "LUNIO 設計系統 © 2026 · 內部設計與工程參考手冊" : "LUNIO DESIGN SYSTEM © 2026 · Internal design reference"}</div>
      <div className="flex gap-4">
        <Link href="/docs/release" className="hover:text-foreground transition-colors">{isZh ? "版本發布說明" : "Release notes"}</Link>
        <a href="https://www.figma.com/design/46bJYM9raivd3wEwTxaaJI/Lunio-TW-Mattress?node-id=1036-636" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Figma ↗</a>
      </div>
    </div>
  </footer>
 </div>
}
