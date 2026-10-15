"use client";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type MattressSizeOption = {
  id: string;
  label: string;
  sublabel?: string;
  disabled?: boolean;
  soldOut?: boolean;
};
type SizeSelectorProps = { options: MattressSizeOption[]; selected: string | null; onSelect: (id: string) => void; label?: string; className?: string };
export function SizeSelector({options,selected,onSelect,label="床墊尺寸",className}:SizeSelectorProps){
 const labelId=useId();
 return <div className={cn("space-y-3",className)}><Label id={labelId}>{label}</Label>
   <div role="group" aria-labelledby={labelId} className="grid grid-cols-2 gap-3 sm:grid-cols-5">
    {options.map(option=>{
      const chosen=selected===option.id;
      return <Button key={option.id} type="button" variant={chosen?"secondary":"outline"} aria-pressed={chosen} aria-label={`${option.label}${option.soldOut?' · 已售完':''}`} disabled={option.disabled||option.soldOut} onClick={()=>onSelect(option.id)} className={cn("h-auto min-h-[75px] flex-col items-start gap-1 whitespace-normal border p-3 text-left",chosen&&"border-2 border-primary ring-1 ring-primary")}>
        <span className="typo-caption text-muted-foreground">{option.label}</span>
        <span className="typo-label">{option.sublabel||option.id}</span>
        {option.soldOut&&<span className="typo-caption">已售完</span>}
      </Button>;
    })}
   </div>
   <p className="sr-only" aria-live="polite">{options.find(o=>o.id===selected)?.label||'尚未選擇尺寸'}</p>
  </div>;
}
