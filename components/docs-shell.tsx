"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, BookOpen, ChevronRight, FileCode2, Menu, Search } from "lucide-react";
import { BrandSwitcher } from "@/components/brand-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
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
                  href={`/docs/${l.slug}`}
                  onClick={onChoose}
                  aria-current={path === `/docs/${l.slug}` ? "page" : undefined}
                  data-active={path === `/docs/${l.slug}`}
                  className="docs-sidebar-link"
                >
                  <span className="min-w-[30px] text-[10px] font-mono text-muted-foreground">{l.number}</span>
                  <span className="flex-1">{displayTitle}</span>
                  {path === `/docs/${l.slug}` && <ChevronRight size={14} />}
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
      <div className="flex items-center gap-3">
        <Sheet open={navigationOpen} onOpenChange={setNavigationOpen}>
          <SheetTrigger asChild><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open documentation navigation"><Menu className="size-5"/></Button></SheetTrigger>
          <SheetContent side="left" className="w-[min(88vw,330px)] overflow-y-auto" aria-describedby="docs-mobile-nav-description">
            <SheetHeader><SheetTitle>{isZh ? "文檔導覽" : "Documentation"}</SheetTitle><SheetDescription id="docs-mobile-nav-description">Lunio Design System navigation</SheetDescription></SheetHeader>
            <div className="px-4 pb-7"><NavList onChoose={() => setNavigationOpen(false)}/></div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="inline-flex items-center gap-2 transition-opacity hover:opacity-85" aria-label="Lunio Design System Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/lunio/lunio-primary.svg" alt="Lunio" className="logo-theme-light h-[28px] w-auto object-contain" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/lunio/lunio-white.svg" alt="Lunio" className="logo-theme-dark h-[28px] w-auto object-contain" />
          <span className="text-[15px] font-semibold tracking-tight text-muted-foreground">/design</span>
        </Link>
        <Badge variant="outline" className="hidden sm:inline-flex">v1.4 · shadcn/ui</Badge>
      </div>
      <div className="flex items-center gap-2 sm:gap-2.5">
        <Button variant="outline" size="sm" onClick={() => setSearchOpen(true)} className="hidden min-w-[155px] items-center justify-between gap-5 text-muted-foreground sm:flex">
          <span className="flex items-center gap-2"><Search size={14}/> {isZh ? "快速搜尋" : "Quick search"}</span>
          <kbd className="rounded border px-1 text-[10px]">⌘K</kbd>
        </Button>
        <BrandSwitcher/>
        <ThemeToggle/>
        <LanguageToggle/>
        <Button variant="link" size="sm" asChild className="hidden lg:inline-flex">
          <Link href="/">{isZh ? "首頁展示" : "Showcase"} <ArrowUpRight size={14}/></Link>
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
                  <CommandItem key={d.slug} value={`${d.title} ${title} ${d.slug}`} onSelect={() => {setSearchOpen(false);router.push(`/docs/${d.slug}`);}}>
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
