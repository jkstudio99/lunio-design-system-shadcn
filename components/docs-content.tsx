"use client";
import Link from "next/link";
import {useState,type ReactNode} from "react";
import {ArrowRight,ArrowUpRight,Check,CheckCircle2,ChevronDown,ChevronRight,ClipboardCheck,Copy,Eye,FileCode2,HelpCircle,Info,Layers,Layers3,Minus,Monitor,Plus,RefreshCw,RotateCcw,ShieldCheck,ShoppingBag,Smartphone,Star,TriangleAlert,Truck,X} from "lucide-react";
import {Button} from "@/components/ui/button";
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
import {useBrand} from "@/components/brand-provider";
import {allDocs,brands,contrastRatio,roleNames,tokens,type TypeRole} from "@/lib/design-system";
const sections:Record<string,{number:string;kicker:string;title:string;intro:string}>={
 "getting-started":{number:"00",kicker:"START HERE",title:"Getting started",intro:"Everything you need to understand, adopt and maintain the Lunio design language. Tokens first. Consistency always."},
 brands:{number:"01",kicker:"BRAND FOUNDATION",title:"Brands & multi-brand modes",intro:"One underlying system with distinct palettes for Lunio Taiwan, Nooz Helix, Nooz Sunset, and Lunio Bedding."},
 typography:{number:"02—03",kicker:"TYPOGRAPHY",title:"MiSansTC typography",intro:"Twelve semantic roles, five font weights, two reference viewports. No page-specific type styling."},
 colors:{number:"04",kicker:"COLORS",title:"Color & semantic tokens",intro:"Brand values stay distinct; UI components consume accessible foreground/background pairs, not hard-coded hex."},
 spacing:{number:"05",kicker:"SPATIAL FOUNDATION",title:"Spacing, grid & elevation",intro:"A deliberate 4px rhythm with consistent 8px control radius and 16px container radius."},
 components:{number:"06",kicker:"INTERFACE COMPONENTS",title:"Core UI components",intro:"Buttons, status badges, forms, selectors, and interactive states powered by the same semantic values."},
 commerce:{number:"07",kicker:"COMMERCE PATTERNS",title:"E-commerce components",intro:"Product cards, Taiwan mattress sizes, variation selection, mobile navigation and sticky purchase patterns."},
 accessibility:{number:"08",kicker:"ACCESSIBILITY",title:"Accessibility & UI quality",intro:"WCAG 2.2 AA as a measurable release goal. Check actual interactions, not tokens alone."},
 release:{number:"09",kicker:"OPERATIONS",title:"Production release",intro:"A shared contract between design, engineering, QA and brand ownership; a staged path to a maintainable storefront."}
};
function Subheading({title,desc}:{title:string;desc?:string}){return <div className="mb-5"><h2 className="text-[22px] font-extrabold tracking-[-.035em] text-foreground">{title}</h2>{desc&&<p className="mt-1.5 text-[13px] leading-6 text-muted-foreground">{desc}</p>}</div>}
function CopyButton({value,label="Copy"}:{value:string;label?:string}){const [copied,setCopied]=useState(false);async function onCopy(){try{await navigator.clipboard.writeText(value);setCopied(true);setTimeout(()=>setCopied(false),1500)}catch{setCopied(false)}}return <Button onClick={onCopy} type="button" variant="outline" size="sm" className="text-muted-foreground">{copied?<Check size={14}/>:<Copy size={14}/>} {copied?'Copied':label}</Button>}
function CodePanel({code,label="CSS / React"}:{code:string;label?:string}){return <div className="space-y-2"><div className="flex items-center justify-between"><div className="text-[10px] font-bold uppercase tracking-[.16em] text-muted-foreground">{label}</div><CopyButton value={code}/></div><pre className="code-panel">{code}</pre></div>}
function SpecNote({children}:{children:ReactNode}){return <div className="doc-notice"><div className="flex items-start gap-2"><Info size={17} className="mt-1 shrink-0"/><div>{children}</div></div></div>}
function Overview(){return <div className="space-y-9"><div className="docs-grille"><div className="docs-block"><div className="mb-4 flex size-11 items-center justify-center rounded-lg border border-border/80 bg-primary/10 dark:bg-primary/15 dark:border-primary/25 text-primary"><Layers3 size={22}/></div><div className="text-[18px] font-bold text-foreground">One design language.</div><p className="mt-2 text-[13px] leading-7 text-muted-foreground">Single MiSansTC scale, shared spacing and semantic UI roles, maintained independently of WooCommerce content.</p></div><div className="docs-block"><div className="mb-4 flex size-11 items-center justify-center rounded-lg border border-border/80 bg-primary/10 dark:bg-primary/15 dark:border-primary/25 text-primary"><FileCode2 size={22}/></div><div className="text-[18px] font-bold text-foreground">A living contract.</div><p className="mt-2 text-[13px] leading-7 text-muted-foreground">DESIGN.md specifies intent. JSON generates CSS. shadcn/ui components (Radix primitives) consume semantic classes without inventing new values.</p></div></div><div className="docs-block"><Subheading title="Architecture" desc="Keep the responsibilities of each application explicit."/><div className="grid gap-3 md:grid-cols-4">{[["01","DESIGN.md + Figma","Visual decisions"],["02","JSON Token Source","One authoring layer"],["03","Next.js Docs + UI","Reusable components"],["04","WooCommerce API","Product and order truth"]].map(s=><div key={s[0]} className="rounded-xl border border-border/80 bg-slate-50/70 dark:bg-[#182030] dark:border-[#2A344A] p-4 transition-all hover:border-primary/50 dark:hover:border-primary/50 shadow-xs"><span className="text-[11px] font-bold text-primary">{s[0]}</span><p className="mt-4 text-[14px] font-bold text-foreground">{s[1]}</p><p className="mt-1 text-[12px] text-muted-foreground">{s[2]}</p></div>)}</div></div><div className="docs-block"><Subheading title="First run"/><CodePanel label="TERMINAL" code={'npm install\nnpm run tokens:build\nnpm run tokens:check\nnpm run dev'}/><p className="mt-4 text-[13px] text-muted-foreground">Open <strong className="font-semibold text-foreground">http://localhost:3001</strong>. Actual MiSansTC WOFF2 files are not distributed; follow public/fonts/README.md.</p></div><div className="docs-block"><Subheading title="Design system inventory"/><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{[["04","Brand themes"],["12","Type roles"],["05","Font weights"],["03","Approved palettes"]].map(x=><div key={x[1]} className="rounded-xl border border-border/80 bg-slate-50/70 dark:bg-[#182030] dark:border-[#2A344A] p-5 transition-all hover:border-primary/50 dark:hover:border-primary/50 shadow-xs"><div className="text-[31px] font-extrabold tracking-[-.05em] text-primary">{x[0]}</div><div className="mt-1 text-xs font-medium text-muted-foreground">{x[1]}</div></div>)}</div></div><SpecNote>Reference structure is inspired by getdesign.md&apos;s public HP analysis. This project uses original Lunio UI styling, text and examples. Status colors remain provisional until formal CI sign-off.</SpecNote></div>}
const brandLogos = [
  { brand: "Lunio Taiwan", token: "#1C46B4", primarySrc: "/images/lunio/lunio-primary.png", whiteSrc: "/images/lunio/lunio-white.png", svgSrc: "/images/lunio/lunio-primary.svg", desc: "Lunio 旗艦款電光藍標誌，用於全站 Header、品牌導覽與主要視覺。", bg: "#1C46B4" },
  { brand: "Nooz Helix", token: "#7347AE", primarySrc: "/images/nooz/nooz-primary.png", whiteSrc: "/images/nooz/Nooz-white.png", svgSrc: "/images/nooz/nooz-helix.svg", desc: "Nooz Helix 獨立筒系列，深絲絨紫專屬識別。", bg: "#7347AE" },
  { brand: "Nooz Sunset", token: "#F28131", primarySrc: "/images/nooz/Nooz-sunset.png", whiteSrc: "/images/nooz/Nooz-white.png", svgSrc: "/images/nooz/nooz-sunset.svg", desc: "Nooz Sunset 人體工學減壓系列，高活力晨曦橘識別（高解析 Retina 原檔）。", bg: "#F28131" },
  { brand: "Lunio Bedding", token: "#1C46B4", primarySrc: "/images/lunio-bedding/lunio-bedding-primary@4x.png", whiteSrc: "/images/lunio-bedding/lunio-bedding-white@4x.png", svgSrc: "/images/lunio-bedding/lunio-bedding-primary.svg", desc: "Lunio 寢具周邊專用識別（天絲床包、保潔墊、四季被）。", bg: "#1C46B4" }
];

function BrandPage(){
  const {brand}=useBrand();
  return <div className="space-y-9">
    <div className="docs-block">
      <Subheading title="官方品牌標誌資產 (Official Brand Logos)" desc="全站嚴格標準化使用官方 CI 標誌，提供高解析透明底 PNG 與無損向量 SVG 格式，色彩精準對應 Token。"/>
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
            <p className="mt-2.5 text-[12px] leading-5 text-muted-foreground">{l.desc}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center justify-center rounded-lg border border-border/80 bg-white dark:bg-slate-100 p-4 text-center shadow-xs">
                <span className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">Primary Fill</span>
                <div className="flex h-12 w-full items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.primarySrc} alt={`${l.brand} Primary Logo`} className="max-h-9 max-w-[130px] object-contain" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg p-4 text-center shadow-xs" style={{ background: l.bg }}>
                <span className="mb-2 text-[10px] font-bold uppercase tracking-wider text-white/70">White Reversal</span>
                <div className="flex h-12 w-full items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.whiteSrc} alt={`${l.brand} White Logo`} className="max-h-9 max-w-[130px] object-contain drop-shadow-xs" />
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/50 pt-3">
              <span className="font-mono text-[11px] text-muted-foreground">{l.primarySrc}</span>
              <div className="flex items-center gap-1.5">
                <CopyButton value={l.primarySrc} label="Path" />
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
    <div className="docs-grille">{brands.map(b=><div key={b.id} data-brand={b.id} className="docs-block"><div className="brand-swatch"/><div className="mt-4 flex items-center justify-between gap-2"><div className="text-[16px] font-bold">{b.name}</div>{b.id===brand&&<span className="rounded-full bg-primary px-2 py-1 text-[10px] font-bold text-primary-foreground">ACTIVE</span>}</div><div className="mt-3 flex flex-wrap gap-2">{[["Primary",b.primary],["Accent",b.accent],["Surface",b.surface],["Ink",b.ink]].map(p=><span key={p[0]} className="token-code">{p[0]} {p[1]}</span>)}</div><p className="mt-3 text-[12px] text-muted-foreground">{b.status}</p></div>)}</div>
    <div className="docs-block"><Subheading title="Scoped theme modes" desc="One page can contain brand-specific products without duplicating any component."/><div className="grid gap-4 sm:grid-cols-3">{brands.slice(0,3).map(b=><div key={b.id} data-brand={b.id} className="rounded-[16px] border border-border/80 bg-[var(--brand-surface)] dark:border-[#2A344A] p-5 shadow-xs"><div className="eyebrow text-[var(--brand-ink)]">{b.name}</div><p className="mt-5 text-[14px] font-bold text-[var(--brand-ink)]">Reusable Product Card</p><Button className="mt-4 w-full">View component</Button></div>)}</div></div>
    <div className="docs-block"><Subheading title="Semantic API"/><CodePanel code={'<div data-brand="lunio">...</div>\n<div data-brand="helix">...</div>\n<div data-brand="sunset">...</div>\n\n/* UI always references roles */\n.button { background: var(--primary); color: var(--primary-foreground); }'}/></div>
    <SpecNote>Lunio Bedding palette shares Lunio Taiwan primary (#1C46B4) for full brand alignment across sleep products and bedding accessories.</SpecNote>
  </div>;
}
function TypographyPage(){const [device,setDevice]=useState<"mobile"|"desktop">("mobile");const [role,setRole]=useState<TypeRole>("h1");const [sample,setSample]=useState("讓每一天，都有好睡眠。");const [weight,setWeight]=useState<number|null>(null);const current=tokens.typography[role];const size=current[device][0],lh=current[device][1];return <div className="space-y-9"><div className="docs-block"><div className="flex flex-wrap items-center justify-between gap-3"><Subheading title="Typography playground" desc="Change role, viewport or specimen text; values come from JSON tokens."/><div className="flex items-center gap-2 rounded-[8px] border border-border p-1"><Button variant={device==='mobile'?'default':'outline'} onClick={()=>setDevice('mobile')} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold ${device==='mobile'?'bg-primary text-primary-foreground':'text-muted-foreground'}`}><Smartphone size={15}/>375px</Button><Button variant={device==='desktop'?'default':'outline'} onClick={()=>setDevice('desktop')} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold ${device==='desktop'?'bg-primary text-primary-foreground':'text-muted-foreground'}`}><Monitor size={15}/>1440px</Button></div></div><div className="grid gap-5 md:grid-cols-2"><label className="text-[12px] font-bold text-foreground">Semantic role<Select value={role} onValueChange={v=>{setRole(v as TypeRole);setWeight(null)}}><SelectTrigger className="mt-2" aria-label="Typography role"><SelectValue placeholder="Select role"/></SelectTrigger><SelectContent>{roleNames.map(s=><SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></label><label className="text-[12px] font-bold text-foreground">Sample text<Input className="mt-2" value={sample} onChange={e=>setSample(e.target.value)}/></label></div><div className="mt-6 rounded-[14px] border border-border/80 bg-slate-50/70 dark:bg-[#182030] dark:border-[#2A344A] p-7 shadow-xs" style={{maxWidth:device==='mobile'?375:undefined}}><span className="eyebrow text-primary">LIVE SPECIMEN / {device==='mobile'?'375':'1440'}</span><div className="mt-7 break-words text-[var(--brand-ink)]" style={{fontSize:`${size}px`,lineHeight:`${lh}px`,fontWeight:weight??current.weight}}>{sample||'讓每一天，都有好睡眠。'}</div></div><div className="mt-6 grid grid-cols-3 gap-4 rounded-lg border border-border/80 bg-slate-50/50 dark:bg-[#182030] dark:border-[#2A344A] p-4 text-center shadow-xs"><div><div className="text-[22px] font-bold text-primary">{size}px</div><div className="text-[11px] text-muted-foreground">Font size</div></div><div><div className="text-[22px] font-bold text-primary">{lh}px</div><div className="text-[11px] text-muted-foreground">Line height</div></div><div><div className="text-[22px] font-bold text-primary">{weight??current.weight}</div><div className="text-[11px] text-muted-foreground">Weight</div></div></div><div className="mt-4 flex flex-wrap items-center justify-between gap-2"><span className="token-code">.typo-{role}</span><CopyButton value={`className="typo-${role}"`} label="Copy class"/></div></div><div className="docs-block"><Subheading title="Five official MiSansTC weights" desc="The font family never changes with brand. Weight 400–800 is the shared primitive scale."/><div className="space-y-3">{Object.entries(tokens.weights).map(([k,v])=><Button type="button" variant="outline" aria-pressed={weight===v} key={k} onClick={()=>setWeight(v)} className={`flex w-full flex-wrap items-center justify-between gap-3 rounded-lg border p-4 text-left transition ${weight===v?'border-2 border-primary bg-primary/10 dark:bg-primary/15 shadow-xs':'border-border/80 hover:border-primary/40'}`}><div><div className="text-xs font-semibold text-muted-foreground">{k.toUpperCase()} / {v}</div><div className="mt-1 text-[23px] text-foreground" style={{fontWeight:v}}>生活，應該更舒適。</div></div><span className="token-code">--font-weight-{k}</span></Button>)}</div></div><div className="docs-block overflow-x-auto"><Subheading title="Responsive typography specification" desc="Source: reviewed DESIGN.md v1.2; values are font size / line height in px."/><table className="token-table min-w-[670px]"><thead><tr><th>Role</th><th>Mobile 375</th><th>Desktop 1440</th><th>Weight</th><th>Use case</th></tr></thead><tbody>{roleNames.map(key=>{const t=tokens.typography[key];return <tr key={key}><td className="font-bold">{key}</td><td>{t.mobile[0]} / {t.mobile[1]}</td><td>{t.desktop[0]} / {t.desktop[1]}</td><td>{t.weight}</td><td className="text-muted-foreground">{t.use}</td></tr>})}</tbody></table></div><SpecNote>Live typography uses MiSansTC only when your licensed WOFF2 files have been added to <span className="token-code">public/fonts</span>. Until then, system fallback displays; the token dimensions and font-weight CSS remain available. Pixel-perfect Figma comparison requires the actual font files.</SpecNote></div>}
function ColorsPage(){const {brand}=useBrand();const current=tokens.brands[brand];const entries=[['Primary',current.primary,'--primary'],['On Primary',current.onPrimary,'--primary-foreground'],['Accent',current.accent,'--accent'],['On Accent',current.onAccent,'--accent-foreground'],['Surface',current.surface,'--brand-surface'],['Ink',current.ink,'--brand-ink'],['Canvas',tokens.foundation.canvas,'--background'],['Border',tokens.foundation.border,'--border']];const checks=brands.map(b=>({name:b.name,primary:contrastRatio(b.primary,b.onPrimary),accent:contrastRatio(b.accent,b.onAccent),status:b.status}));return <div className="space-y-9"><div className="docs-block"><Subheading title={`${current.name} · semantic palette`} desc="Use the Brand Switcher in the top bar to inspect each brand's exact semantic values."/><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{entries.map(([label,hex,key])=><div key={label} className="overflow-hidden rounded-lg border border-border/80 bg-slate-50/50 dark:bg-[#182030] dark:border-[#2A344A] shadow-xs"><div className="h-28 relative border-b border-border/70" style={{background:hex}}/><div className="p-4"><div className="text-[13px] font-bold">{label}</div><div className="mt-1 font-mono text-xs text-muted-foreground">{hex}</div><div className="mt-2"><CopyButton label={key} value={`var(${key})`}/></div></div></div>)}</div></div><div className="docs-block overflow-x-auto"><Subheading title="Accessible foreground pairings" desc="Calculated using WCAG relative luminance for opaque colors. Minimum 4.5:1 for ordinary text."/><table className="token-table min-w-[620px]"><thead><tr><th>Brand</th><th>Primary pair</th><th>Accent pair</th><th>Status</th></tr></thead><tbody>{checks.map(b=><tr key={b.name}><td className="font-semibold">{b.name}</td><td><span className="font-bold">{b.primary.toFixed(2)}:1</span> <span className="text-[#147b53] dark:text-[#4ADE80] font-bold">PASS</span></td><td>{b.accent.toFixed(2)}:1 <span className="text-[#147b53] dark:text-[#4ADE80] font-bold">PASS</span></td><td className="text-xs text-muted-foreground">{b.status}</td></tr>)}</tbody></table><p className="mt-4 text-xs text-muted-foreground">Sunset uses dark text on orange. Helix accent uses black text on lavender. Do not default to white text for all brands.</p></div><div className="docs-block"><Subheading title="Status colors" desc="Implementation proposals requiring brand-owner approval."/><div className="flex flex-wrap gap-3">{[['Success',tokens.foundation.success],['Error',tokens.foundation.error],['Warning',tokens.foundation.warning],['Info',tokens.foundation.info]].map(([k,v])=><div key={k} className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-slate-50/80 dark:bg-[#182030] dark:border-[#2A344A] px-3 py-2 text-[12px] shadow-xs"><span className="size-3 rounded-full" style={{background:v}}/>{k} <span className="font-mono text-muted-foreground">{v}</span></div>)}</div></div><CodePanel label="DESIGN TOKEN EXAMPLE" code={'[data-brand="sunset"] {\n  --primary: #F28131;\n  --primary-foreground: #1C1526; /* accessible */\n}\n\n.button { background: var(--primary); color: var(--primary-foreground); }'}/></div>}
function SpacingPage(){return <div className="space-y-9"><div className="docs-block"><Subheading title="4px rhythm" desc="Spacing is a foundation, not a series of page-specific measurements."/><div className="space-y-4">{Object.entries(tokens.spacing).map(([k,v])=><div key={k} className="flex items-center gap-4"><span className="w-16 font-mono text-[12px] font-bold text-foreground">s-{k}</span><span className="w-14 text-[12px] text-muted-foreground">{v}px</span><div className="h-5 rounded-[3px] bg-primary/85" style={{width:`${v*3}px`,maxWidth:'65%'}}/></div>)}</div></div><div className="docs-grille"><div className="docs-block"><Subheading title="Control radius"/><div className="flex size-24 items-center justify-center border-2 border-primary bg-primary/10 dark:bg-primary/15 text-[16px] font-bold text-primary" style={{borderRadius:tokens.radii.control}}>8px</div><p className="mt-4 text-[13px] text-muted-foreground">Button · Input · Select · Stepper</p></div><div className="docs-block"><Subheading title="Container radius"/><div className="flex size-24 items-center justify-center border-2 border-primary bg-primary/10 dark:bg-primary/15 text-[16px] font-bold text-primary" style={{borderRadius:tokens.radii.container}}>16px</div><p className="mt-4 text-[13px] text-muted-foreground">Card · Modal · Accordion</p></div></div><div className="docs-block"><Subheading title="Responsive breakpoints"/><div className="grid gap-4 md:grid-cols-3">{[['375px','Mobile reference','Stacked structure and 44px minimum controls'],['1024px','Typography breakpoint','Desktop size tokens switch here'],['1440px','Desktop reference','Content max-width and multicolumn systems']].map(x=><div key={x[0]} className="rounded-lg border border-border/80 bg-slate-50/60 dark:bg-[#182030] dark:border-[#2A344A] p-5 shadow-xs"><div className="text-[26px] font-bold text-primary">{x[0]}</div><div className="mt-2 font-bold">{x[1]}</div><div className="mt-2 text-[12px] leading-6 text-muted-foreground">{x[2]}</div></div>)}</div></div><SpecNote>Responsive 375px/1440px are reference viewports, not the only supported widths. Always test 320 CSS px reflow plus intermediate tablet widths.</SpecNote></div>}
function ComponentsPage(){
 const [state,setState]=useState<'default'|'disabled'|'loading'>('default');
 const [qty,setQty]=useState(1);
 const [error,setError]=useState(false);
 const [mattressSize,setMattressSize]=useState('5');
 const [terms,setTerms]=useState(false);
 const [radioSize,setRadioSize]=useState('5.0');
 const [radioFeel,setRadioFeel]=useState('medium-firm');
 const [skeletonDemo,setSkeletonDemo]=useState(false);

 return <div className="space-y-9">
  <div className="docs-block"><Subheading title="shadcn/ui — Button variants" desc="Official source-owned shadcn/ui Button on Radix Slot + CVA. States and appearance consume Lunio semantic variables."/>
   <Tabs value={state} onValueChange={(v)=>setState(v as typeof state)}>
    <TabsList aria-label="Button state">{(['default','disabled','loading'] as const).map(v=><TabsTrigger value={v} key={v}>{v}</TabsTrigger>)}</TabsList>
    <TabsContent value={state} className="mt-5"><div className="flex flex-wrap items-center gap-3 rounded-xl border border-border/80 bg-slate-50/70 dark:bg-[#182030] dark:border-[#2A344A] p-6 shadow-xs">
     <Button disabled={state!=='default'}>{state==='loading'?'處理中…':'立即選購'} <ArrowRight size={17}/></Button>
     <Button variant="outline" disabled={state!=='default'}>了解更多</Button>
     <Button variant="pill" disabled={state!=='default'}>官網限定</Button>
     <Button variant="secondary">Secondary</Button>
     <Button variant="ghost">返回</Button>
     <Button variant="link">Link button</Button>
    </div></TabsContent>
   </Tabs>
   <CodePanel code={'import { Button } from "@/components/ui/button";\n\n<Button variant="default">立即選購</Button>\n<Button variant="outline">了解更多</Button>\n<Button variant="pill">官網限定</Button>'}/>
  </div>

  <div className="docs-grille">
   <Card className="gap-0 py-0"><CardContent className="p-6"><Subheading title="Input + Label + validation"/>
    <Label htmlFor="full-name">收件人姓名</Label>
    <Input id="full-name" placeholder="請輸入姓名" className="mt-2" aria-invalid={error} aria-describedby="full-name-message"/>
    <p id="full-name-message" className={`mt-2 typo-body-sm ${error?'text-destructive':'text-muted-foreground'}`}>{error?'此欄位為必填':'Example required field and validation'}</p>
    <Button className="mt-5" variant="outline" onClick={()=>setError(!error)}>{error?'Clear error':'Show error'}</Button>
   </CardContent></Card>
   <Card className="gap-0 py-0"><CardContent className="p-6"><Subheading title="Radix Select + quantity"/>
    <Label htmlFor="size-selector-demo">床墊尺寸</Label>
    <Select value={mattressSize} onValueChange={setMattressSize}>
     <SelectTrigger id="size-selector-demo" className="mt-2"><SelectValue placeholder="選擇尺寸"/></SelectTrigger>
     <SelectContent position="popper">
      {[['3','標準單人 3 尺'],['3.5','單人加大 3.5 尺'],['5','標準雙人 5 尺'],['6','雙人加大 6 尺'],['7','雙人特大 7 尺']].map(([v,text])=><SelectItem key={v} value={v}>{text}</SelectItem>)}
     </SelectContent>
    </Select>
    <Label className="mt-5 mb-2">數量</Label>
    <QuantityStepper value={qty} onChange={setQty}/>
   </CardContent></Card>
  </div>

  <div className="docs-block"><Subheading title="Accordion — FAQs & specifications" desc="Official shadcn/ui Accordion powered by @radix-ui/react-accordion with smooth animations and keyboard control."/>
   <Accordion type="single" collapsible defaultValue="faq-1" className="w-full">
    <AccordionItem value="faq-1">
     <AccordionTrigger>Lunio Gen 4 石墨烯天然乳膠床墊適合哪些睡姿？</AccordionTrigger>
     <AccordionContent>
      適合仰睡、側睡與趴睡。泰國天然乳膠的高彈力特性，搭配 Wave-Zone 分區減壓平衡棉，能依據肩膀與臀部重量自然下沉，維持脊椎健康生理曲線。
     </AccordionContent>
    </AccordionItem>
    <AccordionItem value="faq-2">
     <AccordionTrigger>100 晚安心試睡體驗如何申請退換？</AccordionTrigger>
     <AccordionContent>
      自簽收次日起享有 100 晚臥室安心試睡。建議試睡滿 30 晚使骨骼肌肉充分適應。試睡期間搭配保潔墊保持清潔，若仍不滿意，專人免費到府收回並全額退款。
     </AccordionContent>
    </AccordionItem>
    <AccordionItem value="faq-3">
     <AccordionTrigger>全台免運配送與舊床回收服務範圍？</AccordionTrigger>
     <AccordionContent>
      全台灣本島皆享免運費專人配送到府定位，並免費協助將同尺寸舊床墊搬運至一樓交由環保局大型廢棄物回收。
     </AccordionContent>
    </AccordionItem>
   </Accordion>
   <CodePanel code={'import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";\n\n<Accordion type="single" collapsible>\n  <AccordionItem value="specs">\n    <AccordionTrigger>床墊規格說明</AccordionTrigger>\n    <AccordionContent>泰國原產天然乳膠 + 航太石墨烯調溫棉...</AccordionContent>\n  </AccordionItem>\n</Accordion>'}/>
  </div>

  <div className="docs-block"><Subheading title="RadioGroup & Tooltip — Taiwan size & firmness" desc="Accessible @radix-ui/react-radio-group with high-contrast indicator states and contextual @radix-ui/react-tooltip."/>
   <div className="grid gap-6 md:grid-cols-2">
    <div className="rounded-xl border border-border/80 bg-slate-50/70 dark:bg-[#182030] dark:border-[#2A344A] p-5">
     <div className="flex items-center justify-between mb-3">
      <Label className="font-bold">台灣標準床墊尺寸</Label>
      <Tooltip>
       <TooltipTrigger asChild>
        <Button variant="ghost" size="sm" className="h-auto p-0 typo-caption font-normal text-primary hover:bg-transparent hover:underline outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="查看台灣床墊尺與公分換算尺寸指南">
         <HelpCircle size={14} className="mr-1"/> 尺寸指南
        </Button>
       </TooltipTrigger>
       <TooltipContent>
        台灣規格：1 尺約 30.3 cm。請務必丈量床架內徑。
       </TooltipContent>
      </Tooltip>
     </div>
     <RadioGroup value={radioSize} onValueChange={setRadioSize} className="gap-2.5">
      {[['3.0','標準單人 3 尺 (90×188 cm)'],['3.5','單人加大 3.5 尺 (105×188 cm)'],['5.0','標準雙人 5 尺 (150×188 cm)'],['6.0','雙人加大 6 尺 (180×188 cm)'],['7.0','雙人特大 7 尺 (180×210 cm)']].map(([v,label])=>(
       <Label key={v} htmlFor={`comp-size-${v}`} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${radioSize===v?'border-primary ring-1 ring-primary bg-primary/5 dark:bg-primary/10 shadow-xs':'border-border/80 bg-card hover:border-primary/40'}`}>
        <RadioGroupItem value={v} id={`comp-size-${v}`}/>
        <span className="typo-label font-medium">{label}</span>
       </Label>
      ))}
     </RadioGroup>
    </div>

    <div className="rounded-xl border border-border/80 bg-slate-50/70 dark:bg-[#182030] dark:border-[#2A344A] p-5">
     <div className="flex items-center justify-between mb-3">
      <Label className="font-bold">床墊睡感軟硬度</Label>
      <Tooltip>
       <TooltipTrigger asChild>
        <Button variant="ghost" size="sm" className="h-auto p-0 typo-caption font-normal text-muted-foreground hover:bg-transparent hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="睡感評估提示">
         <Info size={14} className="mr-1"/> 睡感評估
        </Button>
       </TooltipTrigger>
       <TooltipContent>
        90% 台灣睡眠者首選適中微挺睡感。
       </TooltipContent>
      </Tooltip>
     </div>
     <RadioGroup value={radioFeel} onValueChange={setRadioFeel} className="gap-2.5">
      {[
       ['medium-firm','適中微挺 (Medium-Firm)','人體工學黃金比例，平衡包覆與支撐'],
       ['firm-support','深度強化支撐 (Firm Support)','強化腰椎護脊，扎實挺拔不塌陷']
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

  <div className="docs-block"><Subheading title="Breadcrumb — Accessible store navigation" desc="Semantic <nav> on @radix-ui/react-slot with ARIA labels, responsive ellipsis truncation and Next.js Link routing."/>
   <div className="space-y-4 rounded-xl border border-border/80 bg-slate-50/70 dark:bg-[#182030] dark:border-[#2A344A] p-5">
    <Breadcrumb>
     <BreadcrumbList>
      <BreadcrumbItem>
       <BreadcrumbLink asChild><Link href="/">首頁</Link></BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
       <BreadcrumbLink asChild><Link href="/docs/commerce">床墊系列</Link></BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
       <BreadcrumbLink asChild><Link href="/docs/commerce">天然乳膠床墊</Link></BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
       <BreadcrumbPage>Lunio Gen 4 石墨烯乳膠床墊</BreadcrumbPage>
      </BreadcrumbItem>
     </BreadcrumbList>
    </Breadcrumb>
    <Separator className="bg-border/60" />
    <div>
     <span className="typo-caption text-muted-foreground mb-2 block">長路徑省略截斷展示 (BreadcrumbEllipsis)：</span>
     <Breadcrumb>
      <BreadcrumbList>
       <BreadcrumbItem>
        <BreadcrumbLink asChild><Link href="/">首頁</Link></BreadcrumbLink>
       </BreadcrumbItem>
       <BreadcrumbSeparator />
       <BreadcrumbItem>
        <BreadcrumbEllipsis />
       </BreadcrumbItem>
       <BreadcrumbSeparator />
       <BreadcrumbItem>
        <BreadcrumbPage>Lunio Gen 4 石墨烯乳膠床墊</BreadcrumbPage>
       </BreadcrumbItem>
      </BreadcrumbList>
     </Breadcrumb>
    </div>
   </div>
   <CodePanel code={'import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "@/components/ui/breadcrumb";\n\n<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem><BreadcrumbLink asChild><Link href="/">首頁</Link></BreadcrumbLink></BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem><BreadcrumbPage>Lunio Gen 4</BreadcrumbPage></BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>'}/>
  </div>

  <div className="docs-block"><Subheading title="Skeleton — Asynchronous UI loading state" desc="Zero layout shift while fetching WooCommerce product catalog, prices and customer reviews."/>
   <div className="flex items-center gap-3 mb-4">
    <Button variant="outline" size="sm" onClick={()=>setSkeletonDemo(!skeletonDemo)}>
     <RefreshCw size={14} className={skeletonDemo?'animate-spin':''}/>
     {skeletonDemo?'切換為已載入展示 (Loaded)':'切換為載入中骨架屏 (Skeleton)'}
    </Button>
    <span className="typo-caption text-muted-foreground">{skeletonDemo?'目前正在顯示 Skeleton 佔位骨架屏':'目前正在顯示已載入完成資料'}</span>
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
      <ProductCard product={{name:"Gen 4 石墨烯乳膠床墊",description:"泰國天然乳膠與專利石墨烯調溫舒壓棉",priceLabel:"NT$ 21,900 起",badge:"熱銷推薦"}}/>
      <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs">
       <div className="space-y-2">
        <Badge variant="outline">評價載入完成</Badge>
        <h4 className="typo-h4 text-foreground">10,000+ 睡眠者五星好評推薦</h4>
        <p className="typo-body-sm text-muted-foreground">「換了 Lunio Gen 4 之後，早上醒來腰部酸痛感真的完全消失了，支撐力非常優秀！」</p>
       </div>
       <div className="pt-4 border-t border-border/60 flex items-center justify-between">
        <span className="typo-caption text-muted-foreground">台北市 · 廖小姐 (已驗證買家)</span>
        <span className="typo-caption text-amber-500 font-bold">★★★★★ 5.0</span>
       </div>
      </div>
     </>
    )}
   </div>
  </div>

  <div className="docs-block"><Subheading title="Carousel — Product media showcase" desc="Touch & keyboard enabled carousel powered by embla-carousel-react and shadcn Button."/>
   <ProductCarousel />
   <CodePanel code={'import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";\n\n<Carousel opts={{ align: "start", loop: true }}>\n  <CarouselContent>\n    <CarouselItem className="md:basis-1/2">...</CarouselItem>\n  </CarouselContent>\n  <CarouselPrevious />\n  <CarouselNext />\n</Carousel>'}/>
  </div>

  <div className="docs-block"><Subheading title="Badge, Checkbox and Textarea" desc="Use shared shadcn/ui primitives. All text remains MiSansTC; status tokens are shared across brand modes."/>
   <div className="flex flex-wrap gap-3"><Badge>官網限定</Badge><Badge variant="outline">網路熱銷</Badge><Badge variant="success">現貨供應</Badge><Badge variant="destructive">已售完</Badge><Badge variant="secondary">限時活動</Badge></div>
   <Separator className="my-6"/>
   <div className="grid gap-5 sm:grid-cols-2"><div><Label htmlFor="component-feedback">設計意見</Label><Textarea className="mt-2" id="component-feedback" placeholder="請填寫意見…" rows={3}/></div>
   <div className="flex items-start gap-3"><Checkbox id="component-terms" checked={terms} onCheckedChange={(v)=>setTerms(v===true)}/><Label htmlFor="component-terms" className="leading-6">我已閱讀設計系統的使用規範。</Label></div></div>
  </div>

  <SpecNote>shadcn/ui installs component source into <code>components/ui/</code> and uses Radix primitives for accessibility. This documentation is a UI specimen, not a live cart or checkout.</SpecNote>
 </div>;
}

function CommercePage(){
 const [size,setSize]=useState('5');
 const [radioSize,setRadioSize]=useState('5.0');
 const [feel,setFeel]=useState('medium-firm');
 const [loadingCard,setLoadingCard]=useState(false);
 const sizes=[['3','標準單人','3尺'],['3.5','單人加大','3.5尺'],['5','標準雙人','5尺'],['6','雙人加大','6尺'],['7','雙人特大','7尺']];

 return <div className="space-y-9">
  <div className="docs-block">
   <Subheading title="E-commerce PDP Navigation & Breadcrumb" desc="Standard breadcrumb navigation for mattress collection pages and PDP."/>
   <Breadcrumb>
    <BreadcrumbList>
     <BreadcrumbItem>
      <BreadcrumbLink asChild><Link href="/">首頁</Link></BreadcrumbLink>
     </BreadcrumbItem>
     <BreadcrumbSeparator />
     <BreadcrumbItem>
      <BreadcrumbLink asChild><Link href="/docs/commerce">旗艦床墊系列</Link></BreadcrumbLink>
     </BreadcrumbItem>
     <BreadcrumbSeparator />
     <BreadcrumbItem>
      <BreadcrumbPage>Lunio Gen 4 科技石墨烯乳膠床墊</BreadcrumbPage>
     </BreadcrumbItem>
    </BreadcrumbList>
   </Breadcrumb>
  </div>

  <div className="docs-block">
   <Subheading title="Product media showcase — shadcn Carousel" desc="Interactive visual gallery for mattress highlights, internal layers, and bedroom scenes."/>
   <ProductCarousel />
  </div>

  <div className="docs-block">
   <Subheading title="Customer reviews & verified badges — ProductRating" desc="WCAG AA compliant rating pattern featuring star reviews, review count and assurance tags."/>
   <ProductRating score={4.9} reviewCount={12850} featuredBadges={["100晚安心試睡", "10年原廠保固", "全台免運配送到府", "舊床免費搬運回收"]} />
  </div>

  <div className="docs-block">
   <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
    <Subheading title="Product card & Skeleton loading state" desc="WooCommerce is the single source of truth for product names, variation prices, stock and discounts."/>
    <Button variant="outline" size="sm" onClick={()=>setLoadingCard(!loadingCard)}>
     <RefreshCw size={14} className={loadingCard?'animate-spin':''}/>
     {loadingCard?'展示完成卡片':'模擬資料載入中 (Skeleton)'}
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
      <ProductCard product={{name:"Gen 4 石墨烯乳膠床墊",description:"泰國天然乳膠與專利石墨烯調溫舒壓棉",priceLabel:"NT$ 21,900 起",badge:"LUNIO 旗艦款"}}/>
      <Card className="gap-0 border border-border/80 bg-slate-50/70 dark:bg-[#182030] dark:border-[#2A344A] py-0 shadow-xs"><CardContent className="p-5"><p className="eyebrow text-primary">MOBILE PRODUCT ROW / 375</p><div className="mt-6 flex gap-3"><div className="flex size-[132px] shrink-0 items-center justify-center rounded-xl border border-border/60 bg-muted/70 dark:bg-[#131926]"><div className="h-[35px] w-[85px] -rotate-[5deg] rounded-lg bg-gradient-to-br from-white to-[#9ba6b7] shadow-[0_13px_0_-4px_#6b7791]"/></div><div className="flex min-w-0 flex-col gap-2"><h3 className="typo-h4 break-words text-foreground">Gen 4 石墨烯乳膠床墊</h3><p className="typo-body-sm text-muted-foreground">天然乳膠結構</p><p className="typo-price-md text-primary">NT$ 21,900</p><p className="typo-caption text-muted-foreground">依規格與庫存顯示</p></div></div></CardContent></Card>
     </>
    )}
   </div>
  </div>

  <div className="docs-block">
   <Subheading title="RadioGroup mattress selector with Tooltips" desc="Taiwan mattress dimensions (尺) & feel options with contextual size help tooltips."/>
   <MattressRadioSelector selectedSize={radioSize} onSelectSize={setRadioSize} selectedFeel={feel} onSelectFeel={setFeel} />
  </div>

  <div className="docs-block">
   <Subheading title="Variation size selector — Quick Button Pills" desc="Interactive shadcn/ui Buttons with selected states; size availability, exact dimensions and price always come from WooCommerce in production."/>
   <SizeSelector options={sizes.map(([id,label,sublabel])=>({id,label,sublabel}))} selected={size} onSelect={setSize}/>
   <p className="mt-4 typo-body-sm text-muted-foreground" aria-live="polite">Selected: {sizes.find(s=>s[0]===size)?.[1]} · Final dimensions, availability and price must be retrieved from WooCommerce.</p>
  </div>

  <div className="docs-block">
   <Subheading title="Mattress Specifications & FAQs — shadcn Accordion" desc="5-layer mattress structure breakdown, 100-night trial terms, 10-year warranty, and shipping details."/>
   <MattressSpecsAccordion />
  </div>

  <div className="docs-block">
   <Subheading title="Mobile Mega Menu — shadcn Sheet + Tabs" desc="Click to open an accessible modal sheet, then switch between brands without navigating away."/>
   <div className="max-w-[385px] rounded-xl border border-border/80 bg-slate-50/70 dark:bg-[#182030] dark:border-[#2A344A] p-5 shadow-xs"><div className="flex items-center justify-between"><span className="typo-h4">Lunio</span><MobileMegaMenu/></div><p className="mt-3 typo-body-sm text-muted-foreground">Click 選單 to test keyboard, focus trap and Escape-to-close behavior.</p></div>
  </div>

  <div className="docs-block">
   <Subheading title="Checkout order breakdown — shadcn Separator" desc="Structured breakdown of mattress purchase, bundle gifts, delivery services and final total."/>
   <div className="max-w-lg rounded-2xl border border-border/80 bg-slate-50/70 dark:bg-[#182030] dark:border-[#2A344A] p-6 shadow-xs space-y-4">
    <div className="flex items-center justify-between">
      <span className="typo-h4 text-foreground">訂單結帳明細 (Order Summary)</span>
      <Badge variant="outline">購物車 1 件</Badge>
    </div>
    <Separator />
    <div className="space-y-3 typo-body-sm">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-semibold text-foreground">Lunio Gen 4 科技石墨烯乳膠床墊</span>
          <p className="typo-caption text-muted-foreground">標準雙人 5 尺 (150 × 188 cm) · 適中微挺</p>
        </div>
        <span className="font-bold text-foreground">NT$ 21,900</span>
      </div>
      <div className="flex items-center justify-between text-muted-foreground">
        <div>
          <span>專屬官網贈品：天絲防蟎保潔墊</span>
          <p className="typo-caption text-emerald-600 dark:text-emerald-400">買床墊隨貨贈送 (價值 NT$ 2,490)</p>
        </div>
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">免費</span>
      </div>
      <div className="flex items-center justify-between text-muted-foreground">
        <div>
          <span>全台本島專人配送到府定位</span>
          <p className="typo-caption">含免運費、搬運上樓與包裝定位</p>
        </div>
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">NT$ 0 (免運)</span>
      </div>
      <div className="flex items-center justify-between text-muted-foreground">
        <div>
          <span>舊床墊大型廢棄物搬運回收</span>
          <p className="typo-caption">同尺寸床墊免費協助搬運至一樓</p>
        </div>
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">免費</span>
      </div>
    </div>
    <Separator />
    <div className="flex items-center justify-between pt-1">
      <div>
        <span className="typo-h3 font-bold text-foreground">結帳總計</span>
        <p className="typo-caption text-muted-foreground">含 5% 營業稅、100晚試睡與10年原廠保固</p>
      </div>
      <span className="typo-price-xl text-primary">NT$ 21,900</span>
    </div>
   </div>
  </div>

  <div className="docs-block">
   <Subheading title="PDP sticky purchase summary" desc="Selected variation controls real-time price and stock status."/>
   <PDPStickyBar sizeLabel={`${size} 尺`} priceLabel="NT$ 21,900" inStock ready={true} demo/>
   <p className="mt-4 typo-body-sm text-muted-foreground">Storefront: fixed bottom positioning, <code>env(safe-area-inset-bottom)</code>, sufficient content padding and real payment/stock logic.</p>
  </div>
 </div>;
}
function AccessibilityPage(){return <div className="space-y-9"><div className="docs-block overflow-x-auto"><Subheading title="WCAG 2.2 AA acceptance criteria"/><table className="token-table min-w-[640px]"><thead><tr><th>Criterion</th><th>Minimum</th><th>Test</th></tr></thead><tbody>{[["1.4.3 Contrast","4.5:1 text / 3:1 large","Every real surface including image overlays"],["1.4.4 Resize Text","200%","No truncated price, form label or CTA"],["1.4.10 Reflow","320 CSS px","No unexpected horizontal scroll"],["1.4.12 Text Spacing","Override test","Content stays visible and usable"],["2.4.7 Focus Visible","Visible focus","Keyboard journey, sheet, forms"],["2.5.8 Target Size","24×24 with exceptions","Internal preference ≥44×44 mobile"]].map(x=><tr key={x[0]}><td className="font-bold">{x[0]}</td><td>{x[1]}</td><td className="text-muted-foreground">{x[2]}</td></tr>)}</tbody></table></div><div className="docs-grille"><div className="do-good"><div className="do-good-title flex items-center gap-2 font-bold text-[#13764b] dark:text-[#4ADE80]"><CheckCircle2 size={20}/> DO</div><ul className="mt-4 list-disc space-y-3 pl-5 text-[13px] leading-6 text-[#416b57] dark:text-[#86EFAC]"><li>Use semantic typography and brand variables.</li><li>Ensure readable text on Sunset Orange.</li><li>Preserve dynamic prices and full product information.</li><li>Support 200% zoom and real keyboard navigation.</li><li>Provide error text alongside error color.</li></ul></div><div className="do-bad"><div className="do-bad-title flex items-center gap-2 font-bold text-[#ae3931] dark:text-[#F87171]"><X size={20}/> DON&apos;T</div><ul className="mt-4 list-disc space-y-3 pl-5 text-[13px] leading-6 text-[#8a5553] dark:text-[#FCA5A5]"><li>Use white text on Sunset Primary (#F28131).</li><li>Use white normal-size text on Helix Accent.</li><li>Hardcode `text-[13px]` on a commerce CTA.</li><li>Assume badges, photography or gradients always pass contrast.</li><li>Call an automated token test an AA certification.</li></ul></div></div><SpecNote>Current color pairs in tokens pass 4.5:1 for the configured UI roles, but a website-wide WCAG audit still requires keyboard, screen reader, responsive and real commerce-state testing.</SpecNote></div>}
function ReleasePage(){const items=[['Audit','Capture current frontend computed text metrics and Figma screenshots'],['Approve','Brand owner validates real Nooz/Bedding assets and color rules'],['Integrate','Pin versioned design tokens in Next.js and refactor shared components'],['Validate','Check QA at 375/1440, 320 reflow, 200% resize and keyboard'],['Regression','Test WooCommerce variations, pricing, stock, shipping, cart and payment'],['Release','Document change log, rollback path and responsible owners']];return <div className="space-y-9"><div className="docs-block"><Subheading title="Release checklist" desc="Design System updates are not automatically deployed to lunio.com.tw."/><div className="space-y-2">{items.map(([name,desc],i)=><div key={name} className="flex gap-4 rounded-lg border border-border/80 bg-slate-50/60 dark:bg-[#182030] dark:border-[#2A344A] px-4 py-4 transition-colors hover:border-primary/40 shadow-xs"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 dark:bg-primary/15 text-xs font-bold text-primary">{String(i+1).padStart(2,'0')}</span><div><div className="font-bold text-[14px]">{name}</div><p className="mt-1 text-[12px] leading-6 text-muted-foreground">{desc}</p></div></div>)}</div></div><div className="docs-block"><Subheading title="Engineering commands"/><CodePanel label="CI / LOCAL" code={'npm install\nnpm run tokens:build\nnpm run tokens:check\nnpm run typecheck\nnpm run build\nnpm run dev'}/></div><div className="docs-grille"><div className="docs-block"><div className="eyebrow text-primary">APPROVED SOURCE</div><div className="mt-3 text-[19px] font-bold">DESIGN.md v1.2</div><p className="mt-3 text-[13px] leading-6 text-muted-foreground">Typography and Lumio/Nooz color source. Reviewed e-commerce annotations included.</p><Link href="/docs/source" className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-primary">Read complete specification <ArrowUpRight size={16}/></Link></div><div className="docs-block"><div className="eyebrow text-primary">FIGMA LIBRARY</div><div className="mt-3 text-[19px] font-bold">Code 018 · Lunio DS</div><p className="mt-3 text-[13px] leading-6 text-muted-foreground">Variables, text styles and component examples are authored in the project's existing Figma file.</p><a href="https://www.figma.com/design/46bJYM9raivd3wEwTxaaJI/Lunio-TW-Mattress?node-id=1036-636" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-primary">Open Figma documentation <ArrowUpRight size={16}/></a></div></div></div>}
const pages:Record<string,()=>ReactNode>={"getting-started":Overview,brands:BrandPage,typography:TypographyPage,colors:ColorsPage,spacing:SpacingPage,components:ComponentsPage,commerce:CommercePage,accessibility:AccessibilityPage,release:ReleasePage};
export function DocsContent({slug}:{slug:string}){const meta=sections[slug];const content=pages[slug];const index=allDocs.findIndex(d=>d.slug===slug);if(!meta||!content)return null;const next=allDocs[index+1];const Content=content;return <article className="docs-article"><div className="mb-5 flex flex-wrap items-center justify-between gap-2"><span className="eyebrow text-primary">{meta.number} / {meta.kicker}</span><span className="text-[11px] text-muted-foreground">LUNIO DS · v1.2</span></div><h1 className="typo-h1 max-w-4xl tracking-[-.03em]">{meta.title}</h1><p className="typo-body-md mt-4 max-w-3xl text-muted-foreground">{meta.intro}</p><div className="my-9 h-px bg-border"/><Content/>{next&&<div className="mt-12 border-t border-border pt-8"><Link href={`/docs/${next.slug}`} className="flex items-center justify-between rounded-xl border border-border bg-card p-5 transition hover:border-primary"><div><span className="text-[11px] uppercase tracking-widest text-muted-foreground">UP NEXT</span><div className="mt-2 text-[15px] font-bold">{next.title}</div></div><ArrowRight size={20} className="text-primary"/></Link></div>}</article>}
