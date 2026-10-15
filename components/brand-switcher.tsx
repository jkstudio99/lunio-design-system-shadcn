"use client";
import { useBrand } from "@/components/brand-provider";
import { brands, type BrandId } from "@/lib/design-system";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function BrandSwitcher({ dark = false }: { dark?: boolean }) {
  const { brand, setBrand } = useBrand();
  return (
    <div className="flex items-center gap-2" aria-label="Current brand theme">
      <span className="size-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
      <Select value={brand} onValueChange={(value) => setBrand(value as BrandId)}>
        <SelectTrigger aria-label="Select brand theme" className={dark ? "w-[166px] border-[#363b45] bg-[#15191f] text-white focus-visible:ring-white/60" : "w-[166px] border-border bg-background text-foreground"}>
          <SelectValue placeholder="Choose brand" />
        </SelectTrigger>
        <SelectContent position="popper" align="end">
          {brands.map((b) => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}
