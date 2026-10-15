import * as React from "react";
import {cn} from "@/lib/utils";
function Textarea({className,...props}:React.ComponentProps<"textarea">){return <textarea data-slot="textarea" className={cn("placeholder:text-muted-foreground border-input flex min-h-24 w-full rounded-[var(--radius-control)] border bg-background px-3.5 py-2.5 typo-body-md outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-destructive/20 disabled:cursor-not-allowed disabled:opacity-50",className)} {...props}/>}
export {Textarea};
