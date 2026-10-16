"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useLanguage } from "@/components/language-provider";

type MenuGroup = {
  id: string;
  labelZh: string;
  labelEn: string;
  descZh: string;
  descEn: string;
  priceZh: string;
  priceEn: string;
};

const demoGroups: MenuGroup[] = [
  {
    id: "all",
    labelZh: "全部",
    labelEn: "All",
    descZh: "lunio.com.tw 全系列床墊與居家睡眠商品",
    descEn: "All lunio.com.tw Mattress & Sleep Collections",
    priceZh: "NT4,990 – NT45,900",
    priceEn: "NT4,990 – NT45,900",
  },
  {
    id: "lunio",
    labelZh: "Lunio",
    labelEn: "Lunio",
    descZh: "Lunio Gen 4 石墨烯乳膠床墊 · Lunio 寢具配件",
    descEn: "Lunio Gen 4 Graphene Latex & Lunio Bedding",
    priceZh: "NT21,990 起",
    priceEn: "From NT21,990",
  },
  {
    id: "nooz",
    labelZh: "Nooz",
    labelEn: "Nooz",
    descZh: "Nooz Helix 獨立筒 · Nooz Sunset 護脊減壓系列",
    descEn: "Nooz Helix Pocket Spring & Nooz Sunset Series",
    priceZh: "NT7,590 起",
    priceEn: "From NT7,590",
  },
  {
    id: "lunio-life",
    labelZh: "Life",
    labelEn: "Life",
    descZh: "Lunio Life 居家生活系列 · 電動升降床架與沙發",
    descEn: "Lunio Life Modern Living · Smart Beds & Sofas",
    priceZh: "NT16,990 起",
    priceEn: "From NT16,990",
  },
];

/** Navigation behavior showcase. Real products/categories are supplied via WooCommerce. */
export function MobileMegaMenu() {
  const [filter, setFilter] = useState("all");
  const { isZh } = useLanguage();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="min-h-11 gap-2">
          <Menu className="size-4" /> {isZh ? "選單" : "Menu"}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[min(92vw,390px)] gap-0 p-0"
        aria-describedby="menu-description"
      >
        <SheetHeader className="p-4 pr-14 border-b border-border">
          <SheetTitle>{isZh ? "lunio.com.tw 品牌導覽" : "lunio.com.tw Brand Nav"}</SheetTitle>
          <SheetDescription id="menu-description">
            {isZh ? "依品牌篩選床墊、寢具與 Lunio Life 居家商品" : "Filter mattresses, bedding and Lunio Life products by brand"}
          </SheetDescription>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="grid w-full grid-cols-4 gap-1">
              {demoGroups.map((group) => (
                <TabsTrigger key={group.id} value={group.id} className="text-xs px-1.5">
                  {isZh ? group.labelZh : group.labelEn}
                </TabsTrigger>
              ))}
            </TabsList>
            {demoGroups.map((group) => (
              <TabsContent
                key={group.id}
                value={group.id}
                className="mt-4 rounded-[var(--radius-container)] border border-border bg-card p-5"
              >
                <h3 className="typo-h4">{isZh ? group.descZh : group.descEn}</h3>
                <p className="typo-price-md mt-2 text-primary">
                  {isZh ? group.priceZh : group.priceEn}
                </p>
                <p className="typo-body-sm mt-2 text-muted-foreground">
                  {isZh
                    ? "產品資料與即時售價由 WooCommerce Store API 提供。"
                    : "Product data and live pricing provided via WooCommerce Store API."}
                </p>
                <Badge variant="secondary" className="mt-3">
                  {isZh ? "UI 示範 · 非正式商品資料" : "UI Demo · Not Live Catalog"}
                </Badge>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
