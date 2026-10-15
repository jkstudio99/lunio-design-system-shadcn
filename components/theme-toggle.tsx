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
import { cn } from "@/lib/utils";

export function ThemeToggle({
  dark = false,
  className,
}: {
  dark?: boolean;
  className?: string;
}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
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
          aria-label="Toggle theme mode"
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
          <span className="sr-only">Toggle theme (Light / Dark / System)</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Sun className="size-3.5 text-amber-500" />
            Light
          </span>
          {mounted && theme === "light" && <Check className="size-3.5 text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Moon className="size-3.5 text-blue-400" />
            Dark
          </span>
          {mounted && theme === "dark" && <Check className="size-3.5 text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Monitor className="size-3.5 text-muted-foreground" />
            System
          </span>
          {mounted && theme === "system" && <Check className="size-3.5 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
