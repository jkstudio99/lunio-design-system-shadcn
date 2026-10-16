"use client";

import * as React from "react";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({
  dark = false,
  className,
}: {
  dark?: boolean;
  className?: string;
}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { isZh } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={isZh ? "切換深淺外觀主題" : "Toggle theme mode"}
          className={cn(
            "relative size-9 transition-colors",
            dark
              ? "border-[#363b45] bg-[#15191f] text-white hover:bg-[#212630] hover:text-white focus-visible:ring-white/60"
              : "border-border bg-background text-foreground hover:bg-accent/40",
            className
          )}
        >
          {mounted ? (
            <>
              {theme === "system" ? (
                <Monitor className="size-4 transition-transform" />
              ) : resolvedTheme === "dark" ? (
                <Moon className="size-4 transition-transform" />
              ) : (
                <Sun className="size-4 transition-transform" />
              )}
            </>
          ) : (
            <Sun className="size-4 opacity-50" />
          )}
          <span className="sr-only">{isZh ? "切換外觀主題 (淺色 / 深色 / 跟隨系統)" : "Toggle theme (Light / Dark / System)"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Sun className="size-3.5 text-amber-500" />
            {isZh ? "淺色模式" : "Light"}
          </span>
          {mounted && theme === "light" && <Check className="size-3.5 text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Moon className="size-3.5 text-blue-400" />
            {isZh ? "深色模式" : "Dark"}
          </span>
          {mounted && theme === "dark" && <Check className="size-3.5 text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Monitor className="size-3.5 text-muted-foreground" />
            {isZh ? "跟隨系統" : "System"}
          </span>
          {mounted && theme === "system" && <Check className="size-3.5 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Mobile Theme Selector for Drawer Navigation
 * Three touch buttons for Light / Dark / System modes
 */
export function MobileThemeSelector({ onSelect }: { onSelect?: () => void }) {
  const { theme, setTheme } = useTheme();
  const { isZh } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const items = [
    { value: "light", labelZh: "淺色", labelEn: "Light", icon: Sun, color: "text-amber-500" },
    { value: "dark", labelZh: "深色", labelEn: "Dark", icon: Moon, color: "text-blue-400" },
    { value: "system", labelZh: "系統", labelEn: "System", icon: Monitor, color: "text-muted-foreground" },
  ];

  return (
    <div className="grid grid-cols-3 gap-1.5" role="radiogroup" aria-label={isZh ? "選擇外觀主題模式" : "Select theme mode"}>
      {items.map((item) => {
        const isActive = mounted && theme === item.value;
        const Icon = item.icon;
        return (
          <Button
            key={item.value}
            variant="outline"
            size="sm"
            role="radio"
            aria-checked={isActive}
            onClick={() => {
              setTheme(item.value);
              onSelect?.();
            }}
            className={cn(
              "h-9 px-2 gap-1.5 border rounded-lg text-xs font-medium transition-all",
              isActive
                ? "border-primary bg-primary/10 shadow-xs ring-1 ring-primary/40 text-primary font-bold dark:bg-primary/20"
                : "border-border/80 bg-background hover:bg-accent/50 text-foreground"
            )}
          >
            <Icon className={cn("size-3.5 shrink-0", item.color)} />
            <span className="text-[11px] font-semibold">{isZh ? item.labelZh : item.labelEn}</span>
          </Button>
        );
      })}
    </div>
  );
}
