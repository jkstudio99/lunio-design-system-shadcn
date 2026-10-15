"use client";
import Link from "next/link";
import {useState} from "react";
import {ArrowLeft,ArrowUpRight,BookOpen,Check,CheckCircle2,ChevronDown,Copy,Download,ExternalLink,Layers3,Menu,Monitor,PanelTop,Smartphone,Sparkles, X} from "lucide-react";
import {BrandSwitcher} from "@/components/brand-switcher";
import {ThemeToggle} from "@/components/theme-toggle";
import {useBrand} from "@/components/brand-provider";
import {brands,tokens} from "@/lib/design-system";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Sheet,SheetContent,SheetTrigger,SheetHeader,SheetTitle,SheetDescription} from "@/components/ui/sheet";
const sections=[{label:"Colors",href:"/docs/colors"},{label:"Typography",href:"/docs/typography"},{label:"Components",href:"/docs/components"},{label:"Commerce",href:"/docs/commerce"}];
export function Showcase(){
 const {brand}=useBrand();const current=tokens.brands[brand];
 const [tab,setTab]=useState<"preview"|"design">("preview");const [device,setDevice]=useState<"desktop"|"mobile">("desktop");const [copied,setCopied]=useState(false);const [mobileOpen,setMobileOpen]=useState(false);
 const code="npm install\nnpm run tokens:build\nnpm run tokens:check\nnpm run dev";
 const copy=async()=>{try{await navigator.clipboard.writeText(code);setCopied(true);setTimeout(()=>setCopied(false),1800)}catch{setCopied(false)}};
 return <div className="showcase-shell">
  <header className="shell-border border-x-0 border-t-0"><div className="shell-container flex min-h-[76px] items-center justify-between gap-4">
   <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-85" aria-label="Lunio Design System Home">
     {/* eslint-disable-next-line @next/next/no-img-element */}
     <img src="/images/lunio/lunio-primary.svg" alt="Lunio" className="logo-theme-light h-[28px] w-auto object-contain" />
     {/* eslint-disable-next-line @next/next/no-img-element */}
     <img src="/images/lunio/lunio-white.svg" alt="Lunio" className="logo-theme-dark h-[28px] w-auto object-contain" />
     <span className="text-[15px] font-semibold tracking-tight text-muted-foreground">/design</span>
     <span className="hidden sm:inline-flex rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">v1.3</span>
   </Link>
   <nav className="hidden items-center gap-7 text-[13px] lg:flex">
     <Link href="/docs/getting-started" className="shell-link">Documentation</Link>
     <Link href="/docs/components" className="shell-link">Components</Link>
     <Link href="/docs/typography" className="shell-link">Tokens</Link>
     <Link href="/docs/source" className="shell-link">DESIGN.md</Link>
   </nav>
   <div className="flex items-center gap-2">
     <BrandSwitcher/>
     <ThemeToggle/>
     <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
       <SheetTrigger asChild>
         <Button variant="outline" size="icon" className="border-border bg-background text-foreground lg:hidden" aria-label="Open mobile navigation">
           <Menu size={18}/>
         </Button>
       </SheetTrigger>
       <SheetContent side="right" className="w-[min(90vw,340px)]">
         <SheetHeader>
           <SheetTitle>Lunio Design System</SheetTitle>
           <SheetDescription>Navigate to the foundations and components</SheetDescription>
         </SheetHeader>
         <nav className="flex flex-col gap-2 px-4">
           {sections.map(item => (
             <Button key={item.label} asChild variant="ghost" className="justify-start" onClick={()=>setMobileOpen(false)}>
               <Link href={item.href}>{item.label}</Link>
             </Button>
           ))}
         </nav>
       </SheetContent>
     </Sheet>
   </div>
  </div></header>
  <main className="shell-container pb-32">
   <div className="showcase-hero">
    <Link href="/docs/getting-started" className="mb-6 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
      <ArrowLeft size={14}/> Back to system documentation
    </Link>
    <div className="flex flex-wrap items-start justify-between gap-5">
      <div>
        <div className="eyebrow mb-4 text-primary">DESIGN SYSTEM ANALYSIS / LUNIO</div>
        <h1 className="max-w-[840px] text-[clamp(34px,4.4vw,62px)] leading-[1.04] tracking-[-.055em] font-bold">
          One design language.<br/><span className="text-muted-foreground">Four brand experiences.</span>
        </h1>
        <p className="mt-5 max-w-[680px] text-[15px] leading-7 text-muted-foreground">
          A comprehensive, token-first design language for Lunio Taiwan, Nooz Helix, Nooz Sunset and Lunio Bedding. MiSansTC across every interface.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link href="/docs/source" className="shell-action inline-flex items-center gap-2">
          <BookOpen size={14}/> Read DESIGN.md
        </Link>
        <a href="/DESIGN.md" download className="shell-action inline-flex items-center gap-2">
          <Download size={14}/> Download source
        </a>
      </div>
    </div>
   </div>
   <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_290px]">
    <div className="shell-card p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="eyebrow text-muted-foreground">Usage</div>
        <span className="text-[11px] text-muted-foreground">Next.js 16 · Tailwind v4 · shadcn/ui</span>
      </div>
      <div className="relative rounded-lg border border-border/80 bg-slate-50/90 dark:bg-[#161C28] dark:border-[#2A344A] px-5 py-5 font-mono text-[12px] leading-6 text-foreground shadow-xs">
        <span className="text-primary font-bold">$ </span>npm run tokens:build<br/>
        <span className="text-primary font-bold">$ </span>npm run tokens:check<br/>
        <span className="text-primary font-bold">$ </span>npm run dev
        <Button variant="ghost" size="icon-sm" onClick={copy} aria-label="Copy installation commands" className="absolute right-4 top-4 text-muted-foreground hover:bg-accent hover:text-foreground">
          {copied ? <Check size={16}/> : <Copy size={16}/>}
        </Button>
      </div>
      <p className="mt-4 text-[12px] text-muted-foreground">
        Start the platform locally, then connect the approved typography and color tokens to Lunio&apos;s existing Next.js frontend.
      </p>
    </div>
    <div className="shell-card flex flex-col justify-between gap-5 p-5 md:p-6">
      <div>
        <div className="eyebrow mb-4 text-muted-foreground">System status</div>
        <div className="text-[29px] font-bold text-foreground">12 <span className="text-[13px] font-normal text-muted-foreground">type roles</span></div>
        <div className="mt-3 flex flex-wrap gap-2">
          {brands.map(b => (
            <span key={b.id} className="inline-flex size-7 items-center justify-center rounded-md border border-black/10 dark:border-white/20 shadow-sm" style={{background: b.primary}} title={b.name}>
              <span className="sr-only">{b.name}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-2 border-t border-border pt-4 text-[12px] text-muted-foreground">
        <div className="flex items-center justify-between"><span>5 font weights</span><CheckCircle2 size={15} className="text-primary"/></div>
        <div className="flex items-center justify-between"><span>4 brand modes</span><CheckCircle2 size={15} className="text-primary"/></div>
        <div className="flex items-center justify-between"><span>Bedding CI</span><span className="text-primary font-medium">Approved</span></div>
      </div>
    </div>
   </section>
   <section className="mt-12">
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="eyebrow text-muted-foreground">EXPERIENCE</div>
        <h2 className="mt-1 text-[24px] font-bold">Live preview</h2>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex rounded-lg border border-border bg-muted p-1">
          <Button variant="ghost" onClick={()=>setDevice('desktop')} aria-pressed={device==='desktop'} className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs ${device==='desktop' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}><Monitor size={14}/>Desktop</Button>
          <Button variant="ghost" onClick={()=>setDevice('mobile')} aria-pressed={device==='mobile'} className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs ${device==='mobile' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}><Smartphone size={14}/>375px</Button>
        </div>
        <Button variant="outline" onClick={()=>setTab('preview')} className={`shell-action ${tab==='preview'?'!border-primary !text-primary':''}`}>Live Preview</Button>
        <Button variant="outline" onClick={()=>setTab('design')} className={`shell-action ${tab==='design'?'!border-primary !text-primary':''}`}>DESIGN.md</Button>
      </div>
    </div>
    <div className={`mx-auto transition-all duration-300 ${device==='mobile'?'max-w-[375px]':'max-w-full'}`}>
     {tab==='preview' ? (
       <div className="preview-browser">
         <div className="preview-browser-toolbar">
           <span className="hidden sm:flex items-center gap-1">
             <i className="size-2 rounded-full bg-[#ff7979]"/>
             <i className="size-2 rounded-full bg-[#ffc96e]"/>
             <i className="size-2 rounded-full bg-[#7bcc9a]"/>
           </span>
           <span className="mr-auto text-[15px] font-extrabold tracking-tight">lunio<span className="text-primary">.</span></span>
           {device==='desktop' && (
             <div className="flex items-center gap-5 text-[12px] font-semibold text-muted-foreground">
               <Link href="/docs/colors" className="hover:text-foreground transition-colors">Colors</Link>
               <Link href="/docs/typography" className="hover:text-foreground transition-colors">Typography</Link>
               <Link href="/docs/components" className="hover:text-foreground transition-colors">Components</Link>
               <Link href="/docs/commerce" className="hover:text-foreground transition-colors">Responsive</Link>
             </div>
           )}
           <Badge>Design system</Badge>
         </div>
         <div className="preview-content">
           <div className="preview-hero-grid">
             <div>
               <div className="eyebrow mb-5 text-primary">THE LUNIO DESIGN LANGUAGE</div>
               <div className="demo-display">Design for a<br/>better everyday.</div>
               <p className="mt-6 max-w-[390px] text-[14px] leading-[1.8] text-muted-foreground">
                 從每一天開始，打造一致、舒適且易於使用的體驗。共享規範，呈現獨特的品牌個性。
               </p>
               <div className="mt-7 flex flex-wrap items-center gap-2">
                 <Button onClick={()=>document.getElementById('preview-foundations')?.scrollIntoView({behavior:'smooth'})}>
                   Explore foundations <ArrowUpRight size={16}/>
                 </Button>
                 <Button asChild variant="outline">
                   <Link href="/docs/components">UI components</Link>
                 </Button>
               </div>
             </div>
             <div className="mattress-stage">
               <div className="absolute left-5 top-5 rounded-md border border-white/80 bg-white/70 dark:bg-card/90 dark:border-border dark:text-[var(--interactive-text)] px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm backdrop-blur-xs">
                 {current.short} / Collection
               </div>
               <div className="mattress-base"><div className="mattress-pillow"/></div>
               <div className="absolute bottom-5 right-5 text-[10px] font-semibold text-muted-foreground">
                 SOFT  ·  RESPONSIVE  ·  INTENTIONAL
               </div>
             </div>
           </div>
           <div id="preview-foundations" className="mt-14 border-t border-border pt-8">
             <div className="mb-5 flex items-end justify-between">
               <div>
                 <div className="eyebrow text-primary">FOUNDATIONS</div>
                 <h3 className="mt-2 text-[27px] font-bold">Built from one system.</h3>
               </div>
               <Link href="/docs/colors" className="text-[12px] font-semibold text-primary hover:underline">
                 View tokens ↗
               </Link>
             </div>
             <div className="preview-category">
               <div className="preview-mini-card">
                 <div className="mb-4 flex h-[105px] items-center justify-center rounded-lg bg-[var(--brand-surface)]">
                   <div className="size-14 rounded-full bg-primary shadow-[0_8px_25px_#00000018]"/>
                   <div className="-ml-3 size-12 rounded-full bg-[var(--accent)] opacity-80"/>
                 </div>
                 <div className="text-xs font-bold">Color system</div>
                 <p className="mt-1 text-[11px] text-muted-foreground">Theme-specific semantic tokens.</p>
               </div>
               <div className="preview-mini-card">
                 <div className="mb-4 flex h-[105px] items-center justify-center rounded-lg bg-muted">
                   <span className="text-[65px] font-extrabold leading-none tracking-[-.08em] text-foreground">Aa</span>
                 </div>
                 <div className="text-xs font-bold">Typography</div>
                 <p className="mt-1 text-[11px] text-muted-foreground">MiSansTC 400 / 500 / 600 / 700 / 800.</p>
               </div>
               <div className="preview-mini-card">
                 <div className="preview-mini-art mb-4"/>
                 <div className="text-xs font-bold">Components</div>
                 <p className="mt-1 text-[11px] text-muted-foreground">Consistent commerce interactions.</p>
               </div>
             </div>
           </div>
         </div>
       </div>
     ) : (
       <div className="preview-browser min-h-[560px] p-6 sm:p-10">
         <div className="eyebrow mb-4 text-primary">DESIGN.md · v1.3</div>
         <h3 className="text-[30px] font-bold">The design language behind the UI</h3>
         <p className="mt-2 text-[14px] leading-7 text-muted-foreground">
           The same documented design tokens drive the Figma specs and generated CSS.
         </p>
         <div className="code-panel mt-8">{`# Lunio Multi-Brand Design System\n\n> MiSansTC · WCAG 2.2 AA target\n\nBrand colors\n  Lunio    →  #1C46B4\n  Helix    →  #7347AE\n  Sunset   →  #F28131\n  Bedding  →  #1C46B4\n\nTypography  →  12 semantic roles\nFont weights → 400 / 500 / 600 / 700 / 800\nRadius → Control 8px · Container 16px\nSpacing → 4px rhythm\n\nComponents → Button / Card / Input / Select /\n              Size Selector / PDP Sticky Bar`}</div>
         <Link className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-primary hover:underline" href="/docs/source">
           Read complete DESIGN.md <ArrowUpRight size={16}/>
         </Link>
       </div>
     )}
    </div>
    <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
      <span>Reference-inspired structure · Original Lunio content and theme</span>
      <Link href="/docs/getting-started" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
        Explore all documentation <ArrowUpRight size={14}/>
      </Link>
    </div>
   </section>
   <div className="mt-24 grid gap-8 border-t border-border pt-10 md:grid-cols-3">
     <div>
       <div className="eyebrow mb-3 text-muted-foreground">DESIGN PRINCIPLE</div>
       <h3 className="text-[18px] font-bold">One font, everywhere.</h3>
       <p className="mt-3 text-[13px] leading-6 text-muted-foreground">Five weights. Twelve roles. No arbitrary typography overrides from page to page.</p>
     </div>
     <div>
       <div className="eyebrow mb-3 text-muted-foreground">THEMING</div>
       <h3 className="text-[18px] font-bold">Scoped by brand.</h3>
       <p className="mt-3 text-[13px] leading-6 text-muted-foreground">Lunio, Helix, Sunset and Lunio Bedding share anatomy while maintaining color expression.</p>
     </div>
     <div>
       <div className="eyebrow mb-3 text-muted-foreground">DESIGN TO CODE</div>
       <h3 className="text-[18px] font-bold">Built to ship.</h3>
       <p className="mt-3 text-[13px] leading-6 text-muted-foreground">Semantic tokens, accessible states and e-commerce contracts for a maintainable Next.js storefront.</p>
     </div>
   </div>
  </main>
  <footer className="border-t border-border py-8">
    <div className="shell-container flex flex-wrap items-center justify-between gap-3 text-[12px] text-muted-foreground">
      <div>LUNIO DESIGN SYSTEM © 2026 · Internal design reference</div>
      <div className="flex gap-4">
        <Link href="/docs/release" className="hover:text-foreground transition-colors">Release notes</Link>
        <a href="https://www.figma.com/design/46bJYM9raivd3wEwTxaaJI/Lunio-TW-Mattress?node-id=1036-636" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Figma ↗</a>
      </div>
    </div>
  </footer>
 </div>
}
