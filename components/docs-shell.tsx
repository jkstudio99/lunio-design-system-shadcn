"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, BookOpen, ChevronRight, FileCode2, Menu, Search } from "lucide-react";
import { BrandSwitcher, MobileBrandGrid } from "@/components/brand-switcher";
import { ThemeToggle, MobileThemeSelector } from "@/components/theme-toggle";
import { LanguageToggle, MobileLanguageSelector } from "@/components/language-toggle";
import { useLanguage } from "@/components/language-provider";
import { docsNav, allDocs } from "@/lib/design-system";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";

const titlesZh: Record<string, string> = {
  "getting-started": "快速入門指南",
  brands: "多品牌規範",
  typography: "字體排印系統",
  colors: "色彩與語意 Token",
  spacing: "空間與佈局律動",
  components: "核心 UI 元件庫",
  commerce: "台灣電商元件",
  accessibility: "無障礙檢驗標準",
  release: "生產環境發布",
  changelog: "更新日誌與版本",
  source: "完整 DESIGN.md",
};

const groupsZh: Record<string, string> = {
  INTRODUCTION: "簡介與指南",
  FOUNDATIONS: "設計基礎體系",
  COMPONENTS: "介面與電商元件",
  STANDARDS: "品質與發布標準",
};

function NavList({ onChoose }: { onChoose?: () => void }) {
  const path = usePathname();
  const { isZh } = useLanguage();
  return (
    <nav aria-label="Documentation sections" className="space-y-6">
      {docsNav.map((g) => (
        <div key={g.group}>
          <p className="mb-2 px-3 text-[10px] font-bold tracking-[.17em] text-muted-foreground">
            {isZh ? (groupsZh[g.group] || g.group) : g.group}
          </p>
          <div className="space-y-1">
            {g.links.map((l) => {
              const displayTitle = isZh ? (titlesZh[l.slug] || l.title) : l.title;
              return (
                <Link
                  key={l.slug}
                  href={`/docs/{l.slug}`}
                  onClick={onChoose}
                  aria-current={path === `/docs/{l.slug}` ? "page" : undefined}
                  data-active={path === `/docs/{l.slug}`}
                  className="docs-sidebar-link"
                >
                  <span className="min-w-[30px] text-[10px] font-mono text-muted-foreground">{l.number}</span>
                  <span className="flex-1">{displayTitle}</span>
                  {path === `/docs/{l.slug}` && <ChevronRight size={14} />}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function DocsShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isZh } = useLanguage();
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); setSearchOpen(open => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return <div className="min-h-screen bg-background text-foreground transition-colors">
    <header className="docs-topbar">
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        <Sheet open={navigationOpen} onOpenChange={setNavigationOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden size-9 shrink-0 text-foreground hover:bg-accent/50"
              aria-label="Open documentation navigation / 開啟導覽選單"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[min(90vw,350px)] p-0 flex flex-col border-r border-border"
            aria-describedby="docs-mobile-nav-description"
          >
            <SheetHeader className="p-3.5 border-b border-border/80 flex flex-row items-center justify-between gap-3 space-y-0">
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/lunio/lunio-primary.svg"
                  alt="Lunio"
                  className="logo-theme-light h-[22px] w-auto object-contain"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/lunio/lunio-white.svg"
                  alt="Lunio"
                  className="logo-theme-dark h-[22px] w-auto object-contain"
                />
                <Badge variant="outline" className="text-[10px] font-mono px-1.5 py-0">v1.4</Badge>
              </div>
              <SheetTitle className="sr-only">{isZh ? "文檔導覽" : "Documentation"}</SheetTitle>
              <SheetDescription id="docs-mobile-nav-description" className="sr-only">
                Lunio Design System mobile navigation
              </SheetDescription>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Drawer Search trigger */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setNavigationOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full justify-between text-muted-foreground h-9 px-3 border-border/80 bg-muted/20"
              >
                <span className="flex items-center gap-2 text-xs font-normal">
                  <Search size={14} className="text-primary" />
                  {isZh ? "快速搜尋元件與規範..." : "Quick search docs..."}
                </span>
                <kbd className="rounded border px-1.5 py-0.5 text-[10px] font-mono bg-background">⌘K</kbd>
              </Button>

              {/* Visual 4-Brand Grid for Mobile */}
              <div className="rounded-xl border border-border/80 bg-card p-3 shadow-2xs">
                <div className="flex items-center justify-between mb-2 px-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {isZh ? "切換品牌體驗" : "Brand Theme"}
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-primary">
                    4 BRANDS
                  </span>
                </div>
                <MobileBrandGrid onSelect={() => {}} />
              </div>

              {/* Navigation list */}
              <div>
                <div className="mb-2 px-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {isZh ? "文檔章節導覽" : "Documentation Sections"}
                </div>
                <NavList onChoose={() => setNavigationOpen(false)} />
              </div>
            </div>

            {/* Drawer footer with Language, Theme and Figma links */}
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
              <div className="pt-2 flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/60">
                <a
                  href="https://www.figma.com/design/46bJYM9raivd3wEwTxaaJI/Lunio-TW-Mattress?node-id=1036-636"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                >
                  {isZh ? "開啟 Figma 設計庫" : "Open Figma Library"} <ArrowUpRight size={13} />
                </a>
                <Link
                  href="/docs/source"
                  onClick={() => setNavigationOpen(false)}
                  className="hover:underline"
                >
                  DESIGN.md v1.4
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-85 shrink-0"
          aria-label="Lunio Design System Home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/lunio/lunio-primary.svg"
            alt="Lunio"
            className="logo-theme-light h-[22px] sm:h-[26px] w-auto object-contain"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/lunio/lunio-white.svg"
            alt="Lunio"
            className="logo-theme-dark h-[22px] sm:h-[26px] w-auto object-contain"
          />
          <span className="text-[13px] sm:text-[14px] font-semibold tracking-tight text-muted-foreground">/design</span>
        </Link>
        <Badge variant="outline" className="hidden md:inline-flex text-[10px] font-mono">v1.4 · shadcn/ui</Badge>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Mobile Full Search Bar */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSearchOpen(true)}
          className="flex sm:hidden h-8 px-2.5 items-center justify-between gap-1.5 rounded-lg border-border/80 bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/70 shadow-2xs text-xs font-normal max-w-[150px] min-w-[110px]"
          aria-label={isZh ? "快速搜尋文檔與元件" : "Quick search documentation"}
        >
          <span className="flex items-center gap-1.5 truncate">
            <Search size={13} className="text-primary shrink-0" />
            <span className="truncate">{isZh ? "搜尋規範..." : "Search..."}</span>
          </span>
          <kbd className="rounded border border-border/70 bg-background px-1 py-0 text-[9px] font-mono text-muted-foreground shrink-0">⌘K</kbd>
        </Button>

        {/* Desktop Search Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSearchOpen(true)}
          className="hidden min-w-[155px] items-center justify-between gap-5 text-muted-foreground sm:flex"
        >
          <span className="flex items-center gap-2"><Search size={14} className="text-primary" /> {isZh ? "快速搜尋" : "Quick search"}</span>
          <kbd className="rounded border px-1 text-[10px]">⌘K</kbd>
        </Button>

        <BrandSwitcher className="hidden sm:inline-flex" />
        <ThemeToggle className="hidden sm:inline-flex" />
        <LanguageToggle className="hidden sm:inline-flex" />

        <Button variant="link" size="sm" asChild className="hidden xl:inline-flex text-xs">
          <Link href="/">{isZh ? "首頁展示" : "Showcase"} <ArrowUpRight size={14} /></Link>
        </Button>
      </div>
    </header>
    <div className="docs-layout">
      <aside className="docs-sidebar">
        <div className="mb-6 px-3">
          <div className="eyebrow text-primary">{isZh ? "設計系統手冊" : "DOCUMENTATION"}</div>
          <p className="mt-2 text-[12px] leading-5 text-muted-foreground">
            {isZh ? "Lunio 及其子品牌之 Design-to-Code 權威規範與元件來源。" : "The design-to-code source for Lunio and its sub-brands."}
          </p>
        </div>
        <NavList/>
        <Separator className="my-6"/>
        <div className="px-3">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
            <BookOpen size={15}/> {isZh ? "單一信任來源" : "SOURCE OF TRUTH"}
          </div>
          <div className="mt-2 text-[12px] text-muted-foreground">DESIGN.md v1.4 · shadcn/ui</div>
          <a href="https://www.figma.com/design/46bJYM9raivd3wEwTxaaJI/Lunio-TW-Mattress?node-id=1036-636" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-primary">
            {isZh ? "開啟 Figma" : "Open Figma"} <ArrowUpRight size={14}/>
          </a>
        </div>
      </aside>
      <main className="min-w-0">{children}</main>
    </div>
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent className="top-[18vh] max-w-xl translate-y-0 p-0" showCloseButton={false}>
        <DialogHeader className="sr-only">
          <DialogTitle>{isZh ? "搜尋設計系統文檔" : "Search documentation"}</DialogTitle>
          <DialogDescription>Search sections and open a documentation page</DialogDescription>
        </DialogHeader>
        <Command>
          <CommandInput autoFocus placeholder={isZh ? "搜尋 Token、元件或文檔…" : "Search tokens, components or documentation…"} aria-label={isZh ? "搜尋文檔" : "Search documentation"}/>
          <CommandList>
            <CommandEmpty>{isZh ? "查無相符的文檔內容。" : "No matching documentation."}</CommandEmpty>
            <CommandGroup heading={isZh ? "文檔章節" : "Documentation"}>
              {allDocs.map((d) => {
                const title = isZh ? (titlesZh[d.slug] || d.title) : d.title;
                return (
                  <CommandItem key={d.slug} value={`{d.title} {title} {d.slug}`} onSelect={() => {setSearchOpen(false);router.push(`/docs/{d.slug}`);}}>
                    <FileCode2 className="size-4 text-primary"/>
                    <span className="flex-1">{title}</span>
                    <ChevronRight className="size-4 text-muted-foreground"/>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
        <p className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
          {isZh ? "按下 ⌘K / Ctrl+K 開啟搜尋 · ESC 鍵關閉" : "⌘K / Ctrl+K to open · ESC to close"}
        </p>
      </DialogContent>
    </Dialog>
  </div>;
}
