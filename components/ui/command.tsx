"use client";
import * as React from "react";
import {Command as CommandPrimitive} from "cmdk";
import {SearchIcon} from "lucide-react";
import {cn} from "@/lib/utils";
function Command({className,...props}:React.ComponentProps<typeof CommandPrimitive>){return <CommandPrimitive data-slot="command" className={cn("flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-control)] bg-popover text-popover-foreground",className)} {...props}/>}
function CommandInput({className,...props}:React.ComponentProps<typeof CommandPrimitive.Input>){return <div className="flex min-h-12 items-center gap-2 border-b border-border px-3" data-slot="command-input-wrapper"><SearchIcon className="size-4 shrink-0 opacity-60"/><CommandPrimitive.Input data-slot="command-input" className={cn("flex h-11 w-full bg-transparent py-3 typo-body-md outline-none placeholder:text-muted-foreground",className)} {...props}/></div>}
function CommandList({className,...props}:React.ComponentProps<typeof CommandPrimitive.List>){return <CommandPrimitive.List data-slot="command-list" className={cn("max-h-[340px] overflow-y-auto overscroll-contain p-2",className)} {...props}/>}
function CommandEmpty(props:React.ComponentProps<typeof CommandPrimitive.Empty>){return <CommandPrimitive.Empty data-slot="command-empty" className="py-7 text-center typo-body-sm" {...props}/>}
function CommandGroup({className,...props}:React.ComponentProps<typeof CommandPrimitive.Group>){return <CommandPrimitive.Group data-slot="command-group" className={cn("text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:typo-caption [&_[cmdk-group-heading]]:text-muted-foreground",className)} {...props}/>}
function CommandItem({className,...props}:React.ComponentProps<typeof CommandPrimitive.Item>){return <CommandPrimitive.Item data-slot="command-item" className={cn("data-[selected=true]:bg-[var(--brand-surface)] data-[selected=true]:text-foreground relative flex min-h-11 cursor-default select-none items-center gap-2 rounded-md px-2 typo-body-md outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",className)} {...props}/>}
function CommandSeparator({className,...props}:React.ComponentProps<typeof CommandPrimitive.Separator>){return <CommandPrimitive.Separator data-slot="command-separator" className={cn("bg-border -mx-1 my-1 h-px",className)} {...props}/>}
export {Command,CommandInput,CommandList,CommandEmpty,CommandGroup,CommandItem,CommandSeparator};
