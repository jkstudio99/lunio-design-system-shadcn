"use client";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type QuantityStepperProps = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
  label?: string;
};
export function QuantityStepper({value,onChange,min=1,max=99,disabled=false,className,label="Quantity"}:QuantityStepperProps){
 const safeValue=Math.min(max,Math.max(min,value));
 return <div className={cn("inline-flex items-center overflow-hidden rounded-(--radius-control) border border-border bg-background",className)} role="group" aria-label={label}>
   <Button type="button" variant="ghost" size="icon" className="rounded-none border-r border-border" onClick={()=>onChange(Math.max(min,safeValue-1))} disabled={disabled||safeValue<=min} aria-label="Decrease quantity"><Minus className="size-4"/></Button>
   <output className="min-w-14 px-2 text-center typo-label" aria-live="polite" aria-atomic="true">{safeValue}</output>
   <Button type="button" variant="ghost" size="icon" className="rounded-none border-l border-border" onClick={()=>onChange(Math.min(max,safeValue+1))} disabled={disabled||safeValue>=max} aria-label="Increase quantity"><Plus className="size-4"/></Button>
 </div>;
}
