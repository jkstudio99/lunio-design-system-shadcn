"use client";
import Link from "next/link";
import {useState,type ReactNode} from "react";
import {ArrowRight,ArrowUpRight,Check,CheckCircle2,ChevronDown,ChevronRight,ClipboardCheck,Copy,Eye,FileCode2,Info,Layers3,Minus,Monitor,Plus,ShieldCheck,ShoppingBag,Smartphone,TriangleAlert,X} from "lucide-react";
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
import {QuantityStepper} from "@/components/commerce/quantity-stepper";
import {SizeSelector} from "@/components/commerce/size-selector";
import {ProductCard} from "@/components/commerce/product-card";
import {PDPStickyBar} from "@/components/commerce/pdp-sticky-bar";
import {MobileMegaMenu} from "@/components/commerce/mobile-mega-menu";
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
function Subheading({title,desc}:{title:string;desc?:string}){return <div className="mb-5"><h2 className="text-[22px] font-extrabold tracking-[-.035em] text-[#182c4d]">{title}</h2>{desc&&<p className="mt-1.5 text-[13px] leading-6 text-[#748198]">{desc}</p>}</div>}
function CopyButton({value,label="Copy"}:{value:string;label?:string}){const [copied,setCopied]=useState(false);async function onCopy(){try{await navigator.clipboard.writeText(value);setCopied(true);setTimeout(()=>setCopied(false),1500)}catch{setCopied(false)}}return <Button onClick={onCopy} type="button" variant="outline" size="sm" className="text-muted-foreground">{copied?<Check size={14}/>:<Copy size={14}/>} {copied?'Copied':label}</Button>}
function CodePanel({code,label="CSS / React"}:{code:string;label?:string}){return <div className="space-y-2"><div className="flex items-center justify-between"><div className="text-[10px] font-bold uppercase tracking-[.16em] text-[#8a97aa]">{label}</div><CopyButton value={code}/></div><pre className="code-panel">{code}</pre></div>}
function SpecNote({children}:{children:ReactNode}){return <div className="doc-notice"><div className="flex items-start gap-2"><Info size={17} className="mt-1 shrink-0"/><div>{children}</div></div></div>}
function Overview(){return <div className="space-y-9"><div className="docs-grille"><div className="docs-block"><div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-[var(--brand-surface)] text-primary"><Layers3 size={22}/></div><div className="text-[18px] font-bold">One design language.</div><p className="mt-2 text-[13px] leading-7 text-[#728098]">Single MiSansTC scale, shared spacing and semantic UI roles, maintained independently of WooCommerce content.</p></div><div className="docs-block"><div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-[var(--brand-surface)] text-primary"><FileCode2 size={22}/></div><div className="text-[18px] font-bold">A living contract.</div><p className="mt-2 text-[13px] leading-7 text-[#728098]">DESIGN.md specifies intent. JSON generates CSS. shadcn/ui components (Radix primitives) consume semantic classes without inventing new values.</p></div></div><div className="docs-block"><Subheading title="Architecture" desc="Keep the responsibilities of each application explicit."/><div className="grid gap-3 md:grid-cols-4">{[["01","DESIGN.md + Figma","Visual decisions"],["02","JSON Token Source","One authoring layer"],["03","Next.js Docs + UI","Reusable components"],["04","WooCommerce API","Product and order truth"]].map(s=><div key={s[0]} className="rounded-xl border border-border bg-[#fbfcff] p-4"><span className="text-[11px] font-bold text-primary">{s[0]}</span><p className="mt-4 text-[14px] font-bold">{s[1]}</p><p className="mt-1 text-[12px] text-[#8b97aa]">{s[2]}</p></div>)}</div></div><div className="docs-block"><Subheading title="First run"/><CodePanel label="TERMINAL" code={'npm install\nnpm run tokens:build\nnpm run tokens:check\nnpm run dev'}/><p className="mt-4 text-[13px] text-[#75849a]">Open <strong>http://localhost:3001</strong>. Actual MiSansTC WOFF2 files are not distributed; follow public/fonts/README.md.</p></div><div className="docs-block"><Subheading title="Design system inventory"/><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{[["04","Brand themes"],["12","Type roles"],["05","Font weights"],["03","Approved palettes"]].map(x=><div key={x[1]} className="rounded-xl bg-[#f5f7fb] p-5"><div className="text-[31px] font-extrabold tracking-[-.05em] text-primary">{x[0]}</div><div className="mt-1 text-xs text-[#75849b]">{x[1]}</div></div>)}</div></div><SpecNote>Reference structure is inspired by getdesign.md&apos;s public HP analysis. This project uses original Lunio UI styling, text and examples. Status colors remain provisional until formal CI sign-off.</SpecNote></div>}
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
          <div key={l.brand} className="rounded-xl border border-border bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3">
              <div>
                <span className="text-[15px] font-bold text-[#182c4d]">{l.brand}</span>
                <span className="ml-2 font-mono text-xs font-semibold text-primary">{l.token}</span>
              </div>
              <span className="rounded-md border border-border bg-[#f8fafc] px-2 py-0.5 font-mono text-[11px] text-muted-foreground">PNG / SVG</span>
            </div>
            <p className="mt-2.5 text-[12px] leading-5 text-[#738297]">{l.desc}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center justify-center rounded-lg border border-border/80 bg-[#f9fafc] p-4 text-center">
                <span className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#8b99ad]">Primary Fill</span>
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
              <span className="font-mono text-[11px] text-[#8695a8]">{l.primarySrc}</span>
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
    <div className="docs-grille">{brands.map(b=><div key={b.id} data-brand={b.id} className="docs-block"><div className="brand-swatch"/><div className="mt-4 flex items-center justify-between gap-2"><div className="text-[16px] font-bold">{b.name}</div>{b.id===brand&&<span className="rounded-full bg-primary px-2 py-1 text-[10px] font-bold text-primary-foreground">ACTIVE</span>}</div><div className="mt-3 flex flex-wrap gap-2">{[["Primary",b.primary],["Accent",b.accent],["Surface",b.surface],["Ink",b.ink]].map(p=><span key={p[0]} className="token-code">{p[0]} {p[1]}</span>)}</div><p className="mt-3 text-[12px] text-[#8190a5]">{b.status}</p></div>)}</div>
    <div className="docs-block"><Subheading title="Scoped theme modes" desc="One page can contain brand-specific products without duplicating any component."/><div className="grid gap-4 sm:grid-cols-3">{brands.slice(0,3).map(b=><div key={b.id} data-brand={b.id} className="rounded-[16px] border border-border bg-[var(--brand-surface)] p-5"><div className="eyebrow text-[var(--brand-ink)]">{b.name}</div><p className="mt-5 text-[14px] font-bold text-[var(--brand-ink)]">Reusable Product Card</p><Button className="mt-4 w-full">View component</Button></div>)}</div></div>
    <div className="docs-block"><Subheading title="Semantic API"/><CodePanel code={'<div data-brand="lunio">...</div>\n<div data-brand="helix">...</div>\n<div data-brand="sunset">...</div>\n\n/* UI always references roles */\n.button { background: var(--primary); color: var(--primary-foreground); }'}/></div>
    <SpecNote>Lunio Bedding palette shares Lunio Taiwan primary (#1C46B4) for full brand alignment across sleep products and bedding accessories.</SpecNote>
  </div>;
}
function TypographyPage(){const [device,setDevice]=useState<"mobile"|"desktop">("mobile");const [role,setRole]=useState<TypeRole>("h1");const [sample,setSample]=useState("讓每一天，都有好睡眠。");const [weight,setWeight]=useState<number|null>(null);const current=tokens.typography[role];const size=current[device][0],lh=current[device][1];return <div className="space-y-9"><div className="docs-block"><div className="flex flex-wrap items-center justify-between gap-3"><Subheading title="Typography playground" desc="Change role, viewport or specimen text; values come from JSON tokens."/><div className="flex items-center gap-2 rounded-[8px] border border-border p-1"><Button variant={device==='mobile'?'default':'outline'} onClick={()=>setDevice('mobile')} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold ${device==='mobile'?'bg-primary text-primary-foreground':'text-[#7a879c]'}`}><Smartphone size={15}/>375px</Button><Button variant={device==='desktop'?'default':'outline'} onClick={()=>setDevice('desktop')} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold ${device==='desktop'?'bg-primary text-primary-foreground':'text-[#7a879c]'}`}><Monitor size={15}/>1440px</Button></div></div><div className="grid gap-5 md:grid-cols-2"><label className="text-[12px] font-bold text-[#64728b]">Semantic role<Select value={role} onValueChange={v=>{setRole(v as TypeRole);setWeight(null)}}><SelectTrigger className="mt-2" aria-label="Typography role"><SelectValue placeholder="Select role"/></SelectTrigger><SelectContent>{roleNames.map(s=><SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></label><label className="text-[12px] font-bold text-[#64728b]">Sample text<Input className="mt-2" value={sample} onChange={e=>setSample(e.target.value)}/></label></div><div className="mt-6 rounded-[14px] border border-[#e7eaf1] bg-[#f8faff] p-7" style={{maxWidth:device==='mobile'?375:undefined}}><span className="eyebrow text-primary">LIVE SPECIMEN / {device==='mobile'?'375':'1440'}</span><div className="mt-7 break-words text-[var(--brand-ink)]" style={{fontSize:`${size}px`,lineHeight:`${lh}px`,fontWeight:weight??current.weight}}>{sample||'讓每一天，都有好睡眠。'}</div></div><div className="mt-6 grid grid-cols-3 gap-4 rounded-lg border border-border p-4 text-center"><div><div className="text-[22px] font-bold text-primary">{size}px</div><div className="text-[11px] text-[#8b98ac]">Font size</div></div><div><div className="text-[22px] font-bold text-primary">{lh}px</div><div className="text-[11px] text-[#8b98ac]">Line height</div></div><div><div className="text-[22px] font-bold text-primary">{weight??current.weight}</div><div className="text-[11px] text-[#8b98ac]">Weight</div></div></div><div className="mt-4 flex flex-wrap items-center justify-between gap-2"><span className="token-code">.typo-{role}</span><CopyButton value={`className="typo-${role}"`} label="Copy class"/></div></div><div className="docs-block"><Subheading title="Five official MiSansTC weights" desc="The font family never changes with brand. Weight 400–800 is the shared primitive scale."/><div className="space-y-3">{Object.entries(tokens.weights).map(([k,v])=><Button type="button" variant="outline" aria-pressed={weight===v} key={k} onClick={()=>setWeight(v)} className={`flex w-full flex-wrap items-center justify-between gap-3 rounded-lg border p-4 text-left transition ${weight===v?'border-primary bg-[var(--brand-surface)]':'border-border hover:border-primary/30'}`}><div><div className="text-xs font-semibold text-[#67758d]">{k.toUpperCase()} / {v}</div><div className="mt-1 text-[23px] text-[#192d4a]" style={{fontWeight:v}}>生活，應該更舒適。</div></div><span className="token-code">--font-weight-{k}</span></Button>)}</div></div><div className="docs-block overflow-x-auto"><Subheading title="Responsive typography specification" desc="Source: reviewed DESIGN.md v1.2; values are font size / line height in px."/><table className="token-table min-w-[670px]"><thead><tr><th>Role</th><th>Mobile 375</th><th>Desktop 1440</th><th>Weight</th><th>Use case</th></tr></thead><tbody>{roleNames.map(key=>{const t=tokens.typography[key];return <tr key={key}><td className="font-bold">{key}</td><td>{t.mobile[0]} / {t.mobile[1]}</td><td>{t.desktop[0]} / {t.desktop[1]}</td><td>{t.weight}</td><td className="text-[#74849b]">{t.use}</td></tr>})}</tbody></table></div><SpecNote>Live typography uses MiSansTC only when your licensed WOFF2 files have been added to <span className="token-code">public/fonts</span>. Until then, system fallback displays; the token dimensions and font-weight CSS remain available. Pixel-perfect Figma comparison requires the actual font files.</SpecNote></div>}
function ColorsPage(){const {brand}=useBrand();const current=tokens.brands[brand];const entries=[['Primary',current.primary,'--primary'],['On Primary',current.onPrimary,'--primary-foreground'],['Accent',current.accent,'--accent'],['On Accent',current.onAccent,'--accent-foreground'],['Surface',current.surface,'--brand-surface'],['Ink',current.ink,'--brand-ink'],['Canvas',tokens.foundation.canvas,'--background'],['Border',tokens.foundation.border,'--border']];const checks=brands.map(b=>({name:b.name,primary:contrastRatio(b.primary,b.onPrimary),accent:contrastRatio(b.accent,b.onAccent),status:b.status}));return <div className="space-y-9"><div className="docs-block"><Subheading title={`${current.name} · semantic palette`} desc="Use the Brand Switcher in the top bar to inspect each brand's exact semantic values."/><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{entries.map(([label,hex,key])=><div key={label} className="overflow-hidden rounded-lg border border-border"><div className="h-28" style={{background:hex}}/><div className="p-4"><div className="text-[13px] font-bold">{label}</div><div className="mt-1 font-mono text-xs text-[#7e8ba0]">{hex}</div><div className="mt-2"><CopyButton label={key} value={`var(${key})`}/></div></div></div>)}</div></div><div className="docs-block overflow-x-auto"><Subheading title="Accessible foreground pairings" desc="Calculated using WCAG relative luminance for opaque colors. Minimum 4.5:1 for ordinary text."/><table className="token-table min-w-[620px]"><thead><tr><th>Brand</th><th>Primary pair</th><th>Accent pair</th><th>Status</th></tr></thead><tbody>{checks.map(b=><tr key={b.name}><td className="font-semibold">{b.name}</td><td><span className="font-bold">{b.primary.toFixed(2)}:1</span> <span className="text-[#147b53]">PASS</span></td><td>{b.accent.toFixed(2)}:1 <span className="text-[#147b53]">PASS</span></td><td className="text-xs text-[#8794a9]">{b.status}</td></tr>)}</tbody></table><p className="mt-4 text-xs text-[#8291a6]">Sunset uses dark text on orange. Helix accent uses black text on lavender. Do not default to white text for all brands.</p></div><div className="docs-block"><Subheading title="Status colors" desc="Implementation proposals requiring brand-owner approval."/><div className="flex flex-wrap gap-3">{[['Success',tokens.foundation.success],['Error',tokens.foundation.error],['Warning',tokens.foundation.warning],['Info',tokens.foundation.info]].map(([k,v])=><div key={k} className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-[12px]"><span className="size-3 rounded-full" style={{background:v}}/>{k} <span className="font-mono text-[#8490a2]">{v}</span></div>)}</div></div><CodePanel label="DESIGN TOKEN EXAMPLE" code={'[data-brand="sunset"] {\n  --primary: #F28131;\n  --primary-foreground: #1C1526; /* accessible */\n}\n\n.button { background: var(--primary); color: var(--primary-foreground); }'}/></div>}
function SpacingPage(){return <div className="space-y-9"><div className="docs-block"><Subheading title="4px rhythm" desc="Spacing is a foundation, not a series of page-specific measurements."/><div className="space-y-4">{Object.entries(tokens.spacing).map(([k,v])=><div key={k} className="flex items-center gap-4"><span className="w-16 font-mono text-[12px] font-bold text-[#576984]">s-{k}</span><span className="w-14 text-[12px] text-[#9ca7b7]">{v}px</span><div className="h-5 rounded-[3px] bg-primary/85" style={{width:`${v*3}px`,maxWidth:'65%'}}/></div>)}</div></div><div className="docs-grille"><div className="docs-block"><Subheading title="Control radius"/><div className="flex size-24 items-center justify-center border-2 border-primary bg-[var(--brand-surface)] text-[16px] font-bold text-primary" style={{borderRadius:tokens.radii.control}}>8px</div><p className="mt-4 text-[13px] text-[#8290a3]">Button · Input · Select · Stepper</p></div><div className="docs-block"><Subheading title="Container radius"/><div className="flex size-24 items-center justify-center border-2 border-primary bg-[var(--brand-surface)] text-[16px] font-bold text-primary" style={{borderRadius:tokens.radii.container}}>16px</div><p className="mt-4 text-[13px] text-[#8290a3]">Card · Modal · Accordion</p></div></div><div className="docs-block"><Subheading title="Responsive breakpoints"/><div className="grid gap-4 md:grid-cols-3">{[['375px','Mobile reference','Stacked structure and 44px minimum controls'],['1024px','Typography breakpoint','Desktop size tokens switch here'],['1440px','Desktop reference','Content max-width and multicolumn systems']].map(x=><div key={x[0]} className="rounded-lg border border-border p-5"><div className="text-[26px] font-bold text-primary">{x[0]}</div><div className="mt-2 font-bold">{x[1]}</div><div className="mt-2 text-[12px] leading-6 text-[#7b8ba1]">{x[2]}</div></div>)}</div></div><SpecNote>Responsive 375px/1440px are reference viewports, not the only supported widths. Always test 320 CSS px reflow plus intermediate tablet widths.</SpecNote></div>}
function ComponentsPage(){
 const [state,setState]=useState<'default'|'disabled'|'loading'>('default');
 const [qty,setQty]=useState(1);
 const [error,setError]=useState(false);
 const [mattressSize,setMattressSize]=useState('5');
 const [terms,setTerms]=useState(false);
 return <div className="space-y-9">
  <div className="docs-block"><Subheading title="shadcn/ui — Button variants" desc="Official source-owned shadcn/ui Button on Radix Slot + CVA. States and appearance consume Lunio semantic variables."/>
   <Tabs value={state} onValueChange={(v)=>setState(v as typeof state)}>
    <TabsList aria-label="Button state">{(['default','disabled','loading'] as const).map(v=><TabsTrigger value={v} key={v}>{v}</TabsTrigger>)}</TabsList>
    <TabsContent value={state} className="mt-5"><div className="flex flex-wrap items-center gap-3 rounded-xl bg-[#f7f8fb] p-6">
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
  <div className="docs-block"><Subheading title="Badge, Checkbox and Textarea" desc="Use shared shadcn/ui primitives. All text remains MiSansTC; status tokens are shared across brand modes."/>
   <div className="flex flex-wrap gap-3"><Badge>官網限定</Badge><Badge variant="outline">網路熱銷</Badge><Badge variant="success">現貨供應</Badge><Badge variant="destructive">已售完</Badge><Badge variant="secondary">限時活動</Badge></div>
   <Separator className="my-6"/>
   <div className="grid gap-5 sm:grid-cols-2"><div><Label htmlFor="component-feedback">設計意見</Label><Textarea className="mt-2" id="component-feedback" placeholder="請填寫意見…" rows={3}/></div>
   <div className="flex items-start gap-3"><Checkbox id="component-terms" checked={terms} onCheckedChange={(v)=>setTerms(v===true)}/><Label htmlFor="component-terms" className="leading-6">我已閱讀設計系統的使用規範。</Label></div></div>
  </div>
  <SpecNote>shadcn/ui installs component source into <code>components/ui/</code> and uses Radix primitives for accessibility. This documentation is a UI specimen, not a live cart or checkout.</SpecNote>
 </div>
}
function CommercePage(){
 const [size,setSize]=useState('5');
 const [filter,setFilter]=useState<'all'|'lunio'|'nooz'>('all');
 const sizes=[['3','標準單人','3尺'],['3.5','單人加大','3.5尺'],['5','標準雙人','5尺'],['6','雙人加大','6尺'],['7','雙人特大','7尺']];
 return <div className="space-y-9">
  <div className="docs-block"><Subheading title="Product card / shadcn Card" desc="Specimen only. WooCommerce is the single source of truth for product names, variation prices, stock and discounts."/>
    <div className="grid gap-5 md:grid-cols-2">
     <ProductCard product={{name:"Gen 4 石墨烯乳膠床墊",description:"舒適支撐，安心好眠。",priceLabel:"依選擇規格顯示",badge:"LUNIO"}}/>
     <Card className="gap-0 bg-[#f9fafc] py-0"><CardContent className="p-5"><p className="eyebrow text-primary">MOBILE PRODUCT ROW / 375</p><div className="mt-6 flex gap-3"><div className="flex size-[132px] shrink-0 items-center justify-center rounded-xl bg-[var(--brand-surface)]"><div className="h-[35px] w-[85px] -rotate-[5deg] rounded-lg bg-gradient-to-br from-white to-[#9ba6b7] shadow-[0_13px_0_-4px_#6b7791]"/></div><div className="flex min-w-0 flex-col gap-2"><h3 className="typo-h4 break-words">Gen 4 石墨烯乳膠床墊</h3><p className="typo-body-sm text-muted-foreground">天然乳膠結構</p><p className="typo-price-md text-primary">NT$ —</p><p className="typo-caption text-muted-foreground">依規格與庫存顯示</p></div></div></CardContent></Card>
    </div>
  </div>
  <div className="docs-block"><Subheading title="Variation size selector" desc="Interactive shadcn/ui Buttons with selected states; size availability, exact dimensions and price always come from WooCommerce in production."/>
    <SizeSelector options={sizes.map(([id,label,sublabel])=>({id,label,sublabel}))} selected={size} onSelect={setSize}/>
    <p className="mt-4 typo-body-sm text-muted-foreground" aria-live="polite">Selected: {sizes.find(s=>s[0]===size)?.[1]} · Final dimensions, availability and price must be retrieved from WooCommerce.</p>
  </div>
  <div className="docs-block"><Subheading title="Mobile Mega Menu — shadcn Sheet + Tabs" desc="Click to open an accessible modal sheet, then switch between brands without navigating away."/>
   <div className="max-w-[385px] rounded-xl border border-border bg-background p-5"><div className="flex items-center justify-between"><span className="typo-h4">Lunio</span><MobileMegaMenu/></div><p className="mt-3 typo-body-sm text-muted-foreground">Click 選單 to test keyboard, focus trap and Escape-to-close behavior.</p></div>
  </div>
  <div className="docs-block"><Subheading title="PDP sticky purchase summary" desc="Selected variation controls real-time price and stock status."/>
   <PDPStickyBar sizeLabel={`${size} 尺`} priceLabel="NT$ —" inStock ready={false} demo/>
   <p className="mt-4 typo-body-sm text-muted-foreground">Storefront: fixed bottom positioning, <code>env(safe-area-inset-bottom)</code>, sufficient content padding and real payment/stock logic.</p>
  </div>
 </div>
}
function AccessibilityPage(){return <div className="space-y-9"><div className="docs-block overflow-x-auto"><Subheading title="WCAG 2.2 AA acceptance criteria"/><table className="token-table min-w-[640px]"><thead><tr><th>Criterion</th><th>Minimum</th><th>Test</th></tr></thead><tbody>{[["1.4.3 Contrast","4.5:1 text / 3:1 large","Every real surface including image overlays"],["1.4.4 Resize Text","200%","No truncated price, form label or CTA"],["1.4.10 Reflow","320 CSS px","No unexpected horizontal scroll"],["1.4.12 Text Spacing","Override test","Content stays visible and usable"],["2.4.7 Focus Visible","Visible focus","Keyboard journey, sheet, forms"],["2.5.8 Target Size","24×24 with exceptions","Internal preference ≥44×44 mobile"]].map(x=><tr key={x[0]}><td className="font-bold">{x[0]}</td><td>{x[1]}</td><td className="text-[#8291a6]">{x[2]}</td></tr>)}</tbody></table></div><div className="docs-grille"><div className="do-good"><div className="flex items-center gap-2 font-bold text-[#13764b]"><CheckCircle2 size={20}/> DO</div><ul className="mt-4 list-disc space-y-3 pl-5 text-[13px] leading-6 text-[#416b57]"><li>Use semantic typography and brand variables.</li><li>Ensure readable text on Sunset Orange.</li><li>Preserve dynamic prices and full product information.</li><li>Support 200% zoom and real keyboard navigation.</li><li>Provide error text alongside error color.</li></ul></div><div className="do-bad"><div className="flex items-center gap-2 font-bold text-[#ae3931]"><X size={20}/> DON&apos;T</div><ul className="mt-4 list-disc space-y-3 pl-5 text-[13px] leading-6 text-[#8a5553]"><li>Use white text on Sunset Primary (#F28131).</li><li>Use white normal-size text on Helix Accent.</li><li>Hardcode `text-[13px]` on a commerce CTA.</li><li>Assume badges, photography or gradients always pass contrast.</li><li>Call an automated token test an AA certification.</li></ul></div></div><SpecNote>Current color pairs in tokens pass 4.5:1 for the configured UI roles, but a website-wide WCAG audit still requires keyboard, screen reader, responsive and real commerce-state testing.</SpecNote></div>}
function ReleasePage(){const items=[['Audit','Capture current frontend computed text metrics and Figma screenshots'],['Approve','Brand owner validates real Nooz/Bedding assets and color rules'],['Integrate','Pin versioned design tokens in Next.js and refactor shared components'],['Validate','Check QA at 375/1440, 320 reflow, 200% resize and keyboard'],['Regression','Test WooCommerce variations, pricing, stock, shipping, cart and payment'],['Release','Document change log, rollback path and responsible owners']];return <div className="space-y-9"><div className="docs-block"><Subheading title="Release checklist" desc="Design System updates are not automatically deployed to lunio.com.tw."/><div className="space-y-2">{items.map(([name,desc],i)=><div key={name} className="flex gap-4 rounded-lg border border-border px-4 py-4"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-surface)] text-xs font-bold text-primary">{String(i+1).padStart(2,'0')}</span><div><div className="font-bold text-[14px]">{name}</div><p className="mt-1 text-[12px] leading-6 text-[#7e8ba0]">{desc}</p></div></div>)}</div></div><div className="docs-block"><Subheading title="Engineering commands"/><CodePanel label="CI / LOCAL" code={'npm install\nnpm run tokens:build\nnpm run tokens:check\nnpm run typecheck\nnpm run build\nnpm run dev'}/></div><div className="docs-grille"><div className="docs-block"><div className="eyebrow text-primary">APPROVED SOURCE</div><div className="mt-3 text-[19px] font-bold">DESIGN.md v1.2</div><p className="mt-3 text-[13px] leading-6 text-[#7e8ca2]">Typography and Lumio/Nooz color source. Reviewed e-commerce annotations included.</p><Link href="/docs/source" className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-primary">Read complete specification <ArrowUpRight size={16}/></Link></div><div className="docs-block"><div className="eyebrow text-primary">FIGMA LIBRARY</div><div className="mt-3 text-[19px] font-bold">Code 018 · Lunio DS</div><p className="mt-3 text-[13px] leading-6 text-[#7e8ca2]">Variables, text styles and component examples are authored in the project's existing Figma file.</p><a href="https://www.figma.com/design/46bJYM9raivd3wEwTxaaJI/Lunio-TW-Mattress?node-id=1036-636" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-primary">Open Figma documentation <ArrowUpRight size={16}/></a></div></div></div>}
const pages:Record<string,()=>ReactNode>={"getting-started":Overview,brands:BrandPage,typography:TypographyPage,colors:ColorsPage,spacing:SpacingPage,components:ComponentsPage,commerce:CommercePage,accessibility:AccessibilityPage,release:ReleasePage};
export function DocsContent({slug}:{slug:string}){const meta=sections[slug];const content=pages[slug];const index=allDocs.findIndex(d=>d.slug===slug);if(!meta||!content)return null;const next=allDocs[index+1];const Content=content;return <article className="docs-article"><div className="mb-5 flex flex-wrap items-center justify-between gap-2"><span className="eyebrow text-primary">{meta.number} / {meta.kicker}</span><span className="text-[11px] text-[#9aa6b7]">LUNIO DS · v1.2</span></div><h1 className="typo-h1 max-w-4xl tracking-[-.03em]">{meta.title}</h1><p className="typo-body-md mt-4 max-w-3xl text-[#7c8aa0]">{meta.intro}</p><div className="my-9 h-px bg-[#e3e7ef]"/><Content/>{next&&<div className="mt-12 border-t border-border pt-8"><Link href={`/docs/${next.slug}`} className="flex items-center justify-between rounded-xl border border-border bg-white p-5 transition hover:border-primary"><div><span className="text-[11px] uppercase tracking-widest text-[#8b99ad]">UP NEXT</span><div className="mt-2 text-[15px] font-bold">{next.title}</div></div><ArrowRight size={20} className="text-primary"/></Link></div>}</article>}
