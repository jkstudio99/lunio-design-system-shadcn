"use client";

import { useBrand } from "@/components/brand-provider";
import { brands, type BrandId } from "@/lib/design-system";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandSwitcher({
  dark = false,
  className,
}: {
  dark?: boolean;
  className?: string;
}) {
  const { brand, setBrand } = useBrand();
  const currentBrand = brands.find((b) => b.id === brand) || brands[0];

  return (
    <div className={cn("flex items-center gap-1.5 shrink-0", className)} aria-label="Current brand theme">
      <Select value={brand} onValueChange={(value) => setBrand(value as BrandId)}>
        <SelectTrigger
          aria-label="Select brand theme"
          className={cn(
            "h-9 w-auto min-w-[135px] max-w-[180px] gap-2 px-3 text-xs font-semibold transition-colors shadow-xs select-none shrink-0",
            dark
              ? "border-[#363b45] bg-[#15191f] text-white hover:bg-[#212630] focus-visible:ring-white/60"
              : "border-border bg-background text-foreground hover:bg-accent/40"
          )}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="size-2.5 shrink-0 rounded-full shadow-xs"
              style={{ backgroundColor: currentBrand.primary }}
              aria-hidden="true"
            />
            {/* Clean single-line brand name */}
            <span className="text-xs font-semibold text-foreground truncate">
              {currentBrand.name}
            </span>
            <SelectValue className="sr-only" aria-label={currentBrand.name}>
              {currentBrand.name}
            </SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent position="popper" align="end" className="min-w-[200px] p-1.5 shadow-md">
          {brands.map((b) => (
            <SelectItem key={b.id} value={b.id} className="cursor-pointer">
              <div className="flex items-center gap-2.5">
                <span
                  className="size-2.5 rounded-full shrink-0 shadow-xs"
                  style={{ backgroundColor: b.primary }}
                  aria-hidden="true"
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-foreground">{b.name}</span>
                  <span className="text-[10px] text-muted-foreground">{b.short} · {b.primary}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/**
 * Mobile Brand Grid for Drawer Navigation
 * High-touch visual cards allowing one-tap brand switching on mobile
 */
export function MobileBrandGrid({ onSelect }: { onSelect?: () => void }) {
  const { brand, setBrand } = useBrand();

  return (
    <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Select active brand theme">
      {brands.map((b) => {
        const isActive = brand === b.id;
        return (
          <Button
            key={b.id}
            variant="outline"
            size="sm"
            role="radio"
            aria-checked={isActive}
            onClick={() => {
              setBrand(b.id as BrandId);
              onSelect?.();
            }}
            className={cn(
              "h-auto flex-col items-start gap-1 p-2.5 text-left border rounded-lg transition-all",
              isActive
                ? "border-primary bg-primary/10 shadow-xs ring-1 ring-primary/40 dark:bg-primary/20"
                : "border-border/80 bg-background hover:bg-accent/50 text-foreground"
            )}
          >
            <div className="flex items-center justify-between w-full">
              <span
                className="size-3 rounded-full shrink-0 shadow-2xs"
                style={{ backgroundColor: b.primary }}
                aria-hidden="true"
              />
              {isActive && <Check className="size-3.5 text-primary shrink-0" />}
            </div>
            <div className="flex flex-col min-w-0 mt-0.5">
              <span className={cn("text-xs font-bold leading-tight truncate", isActive ? "text-primary" : "text-foreground")}>
                {b.name}
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight truncate">
                {b.short}
              </span>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
