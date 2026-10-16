"use client";

import * as React from "react";
import { ArrowRight, ChevronDown, Moon, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { formatPrice } from "@/lib/design-system";
import { cn } from "@/lib/utils";

type MegaMenuCategory = {
  id: string;
  brandId: string;
  labelZh: string;
  labelEn: string;
  badgeZh?: string;
  badgeEn?: string;
  products: Array<{
    nameZh: string;
    nameEn: string;
    descZh: string;
    descEn: string;
    price: number;
    regularPrice?: number;
    tagZh: string;
    tagEn: string;
    isSale?: boolean;
  }>;
};

const MEGA_MENU_CATEGORIES: MegaMenuCategory[] = [
  {
    id: "lunio-mattress",
    brandId: "lunio",
    labelZh: "Lunio 旗艦乳膠床墊",
    labelEn: "Lunio Flagship Mattresses",
    badgeZh: "熱銷 NO.1",
    badgeEn: "BEST SELLER",
    products: [
      {
        nameZh: "Lunio Gen 4 石墨烯乳膠床墊",
        nameEn: "Lunio Gen 4 Graphene Latex Mattress",
        descZh: "航太石墨烯恆溫散熱 · 泰國天然乳膠五層支撐",
        descEn: "Graphene cooling · 5-layer Thai natural latex",
        price: 21990,
        regularPrice: 28990,
        tagZh: "現省 NT7,000",
        tagEn: "Save NT7,000",
        isSale: true,
      },
      {
        nameZh: "Lunio Quantum Max 獨立筒乳膠床墊",
        nameEn: "Lunio Quantum Max Hybrid Mattress",
        descZh: "五區段高碳錳鋼獨立筒 + 天然乳膠減壓層",
        descEn: "5-zone high-carbon pocket springs + natural latex",
        price: 16990,
        regularPrice: 22990,
        tagZh: "現省 NT6,000",
        tagEn: "Save NT6,000",
        isSale: true,
      },
    ],
  },
  {
    id: "nooz-series",
    brandId: "helix",
    labelZh: "Nooz Helix / Sunset 系列",
    labelEn: "Nooz Helix & Sunset Series",
    products: [
      {
        nameZh: "Nooz Helix 五星飯店級獨立筒床墊",
        nameEn: "Nooz Helix Hotel Pocket Spring",
        descZh: "歐式立體舒適層 · 翻身靜音零干擾",
        descEn: "Euro-top plush comfort · Quiet pocket coils",
        price: 9900,
        regularPrice: 14900,
        tagZh: "小資首選",
        tagEn: "Top Value",
        isSale: true,
      },
      {
        nameZh: "Nooz Sunset Pro 護脊乳膠獨立筒",
        nameEn: "Nooz Sunset Pro Orthopedic Hybrid",
        descZh: "強化腰背硬挺支撐 · 孝親與護脊推薦",
        descEn: "Firm lumbar alignment for back sleepers",
        price: 7590,
        regularPrice: 11900,
        tagZh: "護脊推薦",
        tagEn: "Orthopedic",
        isSale: true,
      },
    ],
  },
  {
    id: "lunio-bedding",
    brandId: "bedding",
    labelZh: "Lunio Bedding 寢具配件",
    labelEn: "Lunio Bedding Accessories",
    products: [
      {
        nameZh: "100% 奧地利天絲 60 支床包四件組",
        nameEn: "100% Austrian Tencel 60S Sheet Set",
        descZh: "絲滑涼感親膚 · 適用高達 35 cm 床墊厚度",
        descEn: "Silky breathable Tencel · Fits up to 35 cm height",
        price: 2990,
        regularPrice: 4580,
        tagZh: "65 折特惠",
        tagEn: "35% OFF",
        isSale: true,
      },
      {
        nameZh: "Lunio 石墨烯雙向機能記憶枕",
        nameEn: "Lunio Graphene Cervical Memory Pillow",
        descZh: "高低雙向服貼頸椎 · 透氣不悶熱",
        descEn: "Dual-height neck contour · Breathable core",
        price: 1690,
        regularPrice: 2490,
        tagZh: "買一送一熱銷",
        tagEn: "Bundle Favorite",
      },
    ],
  },
  {
    id: "lunio-life",
    brandId: "lunio-life",
    labelZh: "Lunio Life 居家生活",
    labelEn: "Lunio Life Modern Living",
    badgeZh: "全新合併上線",
    badgeEn: "NEW MERGE",
    products: [
      {
        nameZh: "Lunio Life 智能零重力電動升降床架",
        nameEn: "Lunio Life Zero-Gravity Smart Adjustable Bed",
        descZh: "Plum Night 質感布藝 · 無段式靜音雙馬達升降",
        descEn: "Plum Night upholstery · Whisper-quiet dual motors",
        price: 26990,
        regularPrice: 34990,
        tagZh: "現省 NT8,000",
        tagEn: "Save NT8,000",
        isSale: true,
      },
      {
        nameZh: "Lunio Life 雲朵模組化機能沙發",
        nameEn: "Lunio Life Cloud Modular Lounge Sofa",
        descZh: "防潑水貓抓布與高回彈乳膠坐墊 · 讓舒適與時尚成為日常",
        descEn: "Water-repellent pet-friendly fabric & latex cushions",
        price: 19990,
        regularPrice: 25990,
        tagZh: "Lunio Life 主打",
        tagEn: "Lunio Life Pick",
        isSale: true,
      },
    ],
  },
];

/**
 * Backlog 004 — DesktopMegaMenu
 * Desktop mega menu navigation with brand-scoped product cards, NT pricing, and reassurance bar.
 */
export function DesktopMegaMenu({ className }: { className?: string }) {
  const { isZh } = useLanguage();
  const [activeCatId, setActiveCatId] = React.useState(MEGA_MENU_CATEGORIES[0].id);

  const activeCategory =
    MEGA_MENU_CATEGORIES.find((c) => c.id === activeCatId) ||
    MEGA_MENU_CATEGORIES[0];

  return (
    <div
      data-slot="desktop-mega-menu"
      className={cn(
        "overflow-hidden rounded-2xl border border-border/80 bg-card shadow-md",
        className
      )}
    >
      {/* Top Desktop Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3 bg-background">
        <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label={isZh ? "桌面版品牌巨型選單分類" : "Desktop mega menu categories"}>
          {MEGA_MENU_CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCatId;
            return (
              <Button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveCatId(cat.id)}
                className="h-9 gap-1.5 text-xs font-semibold"
              >
                <span>{isZh ? cat.labelZh : cat.labelEn}</span>
                {(cat.badgeZh || cat.badgeEn) && (
                  <Badge
                    variant={isActive ? "secondary" : "sale"}
                    className="px-1.5 py-0 text-[9px]"
                  >
                    {isZh ? cat.badgeZh : cat.badgeEn}
                  </Badge>
                )}
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform",
                    isActive && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </Button>
            );
          })}
        </div>

        <span className="typo-caption text-muted-foreground hidden xl:inline-flex items-center gap-1">
          <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
          {isZh ? "lunio.com.tw 五大品牌全線整合導覽" : "Unified 5-Brand Storefront Navigation"}
        </span>
      </div>

      {/* Mega Menu Dropdown Content Panel */}
      <div
        data-brand={activeCategory.brandId}
        className="p-6 bg-[var(--brand-surface)]/45 dark:bg-[#141A29] transition-colors"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {activeCategory.products.map((prod) => (
            <div
              key={prod.nameEn}
              className="flex flex-col justify-between rounded-xl border border-border/80 bg-card p-5 shadow-2xs transition hover:border-primary/50"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={prod.isSale ? "sale" : "secondary"}>
                    {isZh ? prod.tagZh : prod.tagEn}
                  </Badge>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    data-brand=&quot;{activeCategory.brandId}&quot;
                  </span>
                </div>
                <h4 className="typo-h4 text-foreground">
                  {isZh ? prod.nameZh : prod.nameEn}
                </h4>
                <p className="typo-body-sm text-muted-foreground">
                  {isZh ? prod.descZh : prod.descEn}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3.5">
                <div className="flex items-baseline gap-2">
                  <span className="typo-price-md text-primary">
                    {formatPrice(prod.price, "TWD")}
                  </span>
                  {prod.regularPrice && (
                    <span className="typo-caption text-muted-foreground line-through">
                      {formatPrice(prod.regularPrice, "TWD")}
                    </span>
                  )}
                  <span className="typo-caption text-muted-foreground">
                    {isZh ? "起" : "+"}
                  </span>
                </div>
                <Button type="button" variant="outline" size="sm" className="h-8 gap-1 text-xs">
                  {isZh ? "查看商品" : "Explore"}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Reassurance Strip */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 bg-card px-4 py-2.5 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Moon className="size-3.5 text-primary" aria-hidden="true" />
              {isZh ? "100 晚安心試睡" : "100-Night Trial"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Truck className="size-3.5 text-primary" aria-hidden="true" />
              {isZh ? "全台本島免運搬上樓" : "Free Taiwan Upstairs Delivery"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-primary" aria-hidden="true" />
              {isZh ? "10 年原廠保固" : "10-Year Warranty"}
            </span>
          </div>
          <span className="font-semibold text-primary">
            {isZh ? "支援 12 期 0 利率 · LINE Pay · Apple Pay" : "12-Mo 0% APR · LINE Pay · Apple Pay"}
          </span>
        </div>
      </div>
    </div>
  );
}
