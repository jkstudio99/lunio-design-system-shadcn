"use client";
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
function Tabs({className,...props}:React.ComponentProps<typeof TabsPrimitive.Root>){return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-2",className)} {...props}/>}
function TabsList({className,...props}:React.ComponentProps<typeof TabsPrimitive.List>){return <TabsPrimitive.List data-slot="tabs-list" className={cn("inline-flex h-11 w-fit items-center justify-center rounded-[var(--radius-control)] bg-muted p-1 text-muted-foreground",className)} {...props}/>}
function TabsTrigger({className,...props}:React.ComponentProps<typeof TabsPrimitive.Trigger>){return <TabsPrimitive.Trigger data-slot="tabs-trigger" className={cn("inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-md border border-transparent px-3 py-1 typo-label whitespace-nowrap transition-colors outline-none data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50",className)} {...props}/>}
function TabsContent({className,...props}:React.ComponentProps<typeof TabsPrimitive.Content>){return <TabsPrimitive.Content data-slot="tabs-content" className={cn("flex-1 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40",className)} {...props}/>}
export {Tabs,TabsList,TabsTrigger,TabsContent};
