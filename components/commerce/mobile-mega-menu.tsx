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
};

const demoGroups: MenuGroup[] = [
  { id: "all", labelZh: "全部", labelEn: "All", descZh: "全部床墊類別", descEn: "All Mattress Collections" },
  { id: "lunio", labelZh: "Lunio", labelEn: "Lunio", descZh: "Lunio 天然乳膠系列", descEn: "Lunio Natural Latex Series" },
  { id: "nooz", labelZh: "Nooz", labelEn: "Nooz", descZh: "Nooz Helix / Nooz Sunset", descEn: "Nooz Helix & Nooz Sunset Series" },
];

/** Navigation behavior showcase. Real products/categories are supplied via WooCommerce. */
export function MobileMegaMenu() {
  const [filter, setFilter] = useState("all");
  const { isZh } = useLanguage();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Menu className="size-4" /> {isZh ? "選單" : "Menu"}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[min(92vw,390px)] gap-0 p-0"
        aria-describedby="menu-description"
      >
        <SheetHeader className="p-4 pr-14 border-b border-border">
          <SheetTitle>{isZh ? "床墊導覽 · Lunio" : "Mattress Nav · Lunio"}</SheetTitle>
          <SheetDescription id="menu-description">
            {isZh ? "依品牌篩選床墊與周邊商品" : "Filter mattresses and sleep products by brand"}
          </SheetDescription>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="grid w-full grid-cols-3">
              {demoGroups.map((group) => (
                <TabsTrigger key={group.id} value={group.id}>
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
                <p className="typo-body-sm mt-2 text-muted-foreground">
                  {isZh
                    ? "產品資料由 WooCommerce Store API 提供。"
                    : "Product data provided via WooCommerce Store API."}
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
