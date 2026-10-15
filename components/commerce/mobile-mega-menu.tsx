"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

type MenuGroup={id:string;label:string;description:string};
const demoGroups:MenuGroup[]=[{id:"all",label:"全部",description:"全部床墊類別"},{id:"lunio",label:"Lunio",description:"Lunio 全系列"},{id:"nooz",label:"Nooz",description:"Nooz Helix / Nooz Sunset"}];
/** Navigation behavior showcase. Real products/categories are supplied via WooCommerce. */
export function MobileMegaMenu(){const[filter,setFilter]=useState("all");return <Sheet>
 <SheetTrigger asChild><Button variant="outline"><Menu className="size-4"/> 選單</Button></SheetTrigger>
 <SheetContent side="left" className="w-[min(92vw,390px)] gap-0 p-0" aria-describedby="menu-description">
  <SheetHeader className="border-b border-border"><SheetTitle>床墊 · Lunio</SheetTitle><SheetDescription id="menu-description">依品牌篩選床墊與產品</SheetDescription></SheetHeader>
  <div className="min-h-0 flex-1 overflow-y-auto p-4"><Tabs value={filter} onValueChange={setFilter}><TabsList className="grid w-full grid-cols-3">{demoGroups.map(group=><TabsTrigger key={group.id} value={group.id}>{group.label}</TabsTrigger>)}</TabsList>
  {demoGroups.map(group=><TabsContent key={group.id} value={group.id} className="mt-4 rounded-[var(--radius-container)] border border-border bg-card p-5"><h3 className="typo-h4">{group.description}</h3><p className="typo-body-sm mt-2 text-muted-foreground">產品資料由 WooCommerce Store API 提供。</p><Badge variant="secondary" className="mt-3">UI 示範 · 非正式商品資料</Badge></TabsContent>)}
  </Tabs></div>
 </SheetContent>
 </Sheet>}
