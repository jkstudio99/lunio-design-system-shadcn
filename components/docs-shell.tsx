"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, BookOpen, ChevronRight, FileCode2, Menu, Search } from "lucide-react";
import { BrandSwitcher } from "@/components/brand-switcher";
import { docsNav, allDocs } from "@/lib/design-system";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";

function NavList({ onChoose }: { onChoose?: () => void }) {
  const path = usePathname();
  return <nav aria-label="Documentation sections" className="space-y-6">{docsNav.map(g => <div key={g.group}>
    <p className="mb-2 px-3 text-[10px] font-bold tracking-[.17em] text-[#99a4b5]">{g.group}</p>
    <div className="space-y-1">{g.links.map(l => <Link key={l.slug} href={`/docs/${l.slug}`} onClick={onChoose} aria-current={path === `/docs/${l.slug}` ? "page" : undefined} data-active={path === `/docs/${l.slug}`} className="docs-sidebar-link"><span className="min-w-[30px] text-[10px] text-[#9da8b8]">{l.number}</span><span className="flex-1">{l.title}</span>{path === `/docs/${l.slug}` && <ChevronRight size={14}/>}</Link>)}</div>
  </div>)}</nav>;
}

export function DocsShell({ children }: { children: ReactNode }) {
  const router = useRouter();
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
  return <div className="min-h-screen bg-[#fafafc]">
    <header className="docs-topbar">
      <div className="flex items-center gap-3">
        <Sheet open={navigationOpen} onOpenChange={setNavigationOpen}>
          <SheetTrigger asChild><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open documentation navigation"><Menu className="size-5"/></Button></SheetTrigger>
          <SheetContent side="left" className="w-[min(88vw,330px)] overflow-y-auto" aria-describedby="docs-mobile-nav-description">
            <SheetHeader><SheetTitle>Documentation</SheetTitle><SheetDescription id="docs-mobile-nav-description">Lunio Design System navigation</SheetDescription></SheetHeader>
            <div className="px-4 pb-7"><NavList onChoose={() => setNavigationOpen(false)}/></div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="inline-flex items-center gap-2.5 text-[16px] font-bold tracking-[-.04em]"><span className="mark !size-9 !min-w-9 !text-[15px]">L.</span><span>lunio<span className="font-medium text-[#929caf]">/design</span></span></Link>
        <Badge variant="outline" className="hidden sm:inline-flex">v1.3 · shadcn/ui</Badge>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <Button variant="outline" size="sm" onClick={() => setSearchOpen(true)} className="hidden min-w-[155px] items-center justify-between gap-5 text-muted-foreground sm:flex"><span className="flex items-center gap-2"><Search size={14}/> Quick search</span><kbd className="rounded border px-1 text-[10px]">⌘K</kbd></Button>
        <BrandSwitcher/>
        <Button variant="link" size="sm" asChild className="hidden lg:inline-flex"><Link href="/">Showcase <ArrowUpRight size={14}/></Link></Button>
      </div>
    </header>
    <div className="docs-layout">
      <aside className="docs-sidebar"><div className="mb-6 px-3"><div className="eyebrow text-primary">DOCUMENTATION</div><p className="mt-2 text-[12px] leading-5 text-[#8d9aab]">The design-to-code source for Lunio and its sub-brands.</p></div><NavList/><Separator className="my-6"/><div className="px-3"><div className="flex items-center gap-2 text-[11px] font-semibold text-[#8190a5]"><BookOpen size={15}/> SOURCE OF TRUTH</div><div className="mt-2 text-[12px] text-[#a0aaba]">DESIGN.md v1.2 · shadcn/ui</div><a href="https://www.figma.com/design/46bJYM9raivd3wEwTxaaJI/Lunio-TW-Mattress?node-id=1036-636" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-primary">Open Figma <ArrowUpRight size={14}/></a></div></aside>
      <main className="min-w-0">{children}</main>
    </div>
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent className="top-[18vh] max-w-xl translate-y-0 p-0" showCloseButton={false}>
        <DialogHeader className="sr-only"><DialogTitle>Search documentation</DialogTitle><DialogDescription>Search sections and open a documentation page</DialogDescription></DialogHeader>
        <Command>
          <CommandInput autoFocus placeholder="Search tokens, components or documentation…" aria-label="Search documentation"/>
          <CommandList><CommandEmpty>No matching documentation.</CommandEmpty><CommandGroup heading="Documentation">{allDocs.map(d => <CommandItem key={d.slug} value={`${d.title} ${d.slug}`} onSelect={() => {setSearchOpen(false);router.push(`/docs/${d.slug}`);}}><FileCode2 className="size-4 text-primary"/><span className="flex-1">{d.title}</span><ChevronRight className="size-4 text-muted-foreground"/></CommandItem>)}</CommandGroup></CommandList>
        </Command>
        <p className="border-t border-border px-4 py-3 text-xs text-muted-foreground">⌘K / Ctrl+K to open · ESC to close</p>
      </DialogContent>
    </Dialog>
  </div>;
}
