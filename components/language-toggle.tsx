"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/components/language-provider";
import { supportedLocales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle({
  dark = false,
  className,
}: {
  dark?: boolean;
  className?: string;
}) {
  const { locale, setLocale, t } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          aria-label="Switch language / 切換顯示語言"
          className={cn(
            "h-9 px-2 sm:px-2.5 gap-1.5 text-xs font-semibold transition-colors shadow-xs select-none",
            dark
              ? "border-[#363b45] bg-[#15191f] text-white hover:bg-[#212630] hover:text-white focus-visible:ring-white/60"
              : "border-border bg-background text-foreground hover:bg-accent/40",
            className
          )}
        >
          <span
            className={cn(
              "fi shrink-0 rounded-[2px] ring-1 ring-black/10 dark:ring-white/20 text-xs overflow-hidden",
              mounted && locale === "en" ? "fi-us" : "fi-tw"
            )}
            aria-hidden="true"
          />
          <span className="font-mono text-[11px] font-bold tracking-tight">
            {mounted ? (locale === "zh-TW" ? "繁中" : "EN") : "繁中"}
          </span>
          <span className="sr-only">Toggle language: Chinese Taiwan / English</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-1.5 shadow-md">
        <DropdownMenuLabel className="px-2 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          {locale === "zh-TW" ? "選擇顯示語言" : "Select Language"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />
        {supportedLocales.map((item) => {
          const isActive = locale === item.code;
          return (
            <DropdownMenuItem
              key={item.code}
              onClick={() => setLocale(item.code)}
              className={cn(
                "flex items-center justify-between gap-3 px-2.5 py-2 text-xs font-medium cursor-pointer rounded-md transition-colors",
                isActive && "bg-primary/10 text-primary font-bold dark:bg-primary/20"
              )}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "fi",
                    item.flagClass,
                    "shrink-0 text-base rounded-[2px] ring-1 ring-black/10 dark:ring-white/20 overflow-hidden shadow-2xs"
                  )}
                  aria-hidden="true"
                />
                <div className="flex flex-col">
                  <span className="text-foreground">{item.label}</span>
                  <span className="text-[10px] text-muted-foreground font-normal">
                    {item.code === "zh-TW" ? "Traditional Chinese (Taiwan)" : "English (United States)"}
                  </span>
                </div>
              </div>
              {isActive && <Check className="size-4 text-primary shrink-0" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Mobile Language Selector for Drawer Navigation
 * Two responsive touch tabs for seamless language switching on mobile
 */
export function MobileLanguageSelector({ onSelect }: { onSelect?: () => void }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Select language">
      {supportedLocales.map((item) => {
        const isActive = locale === item.code;
        return (
          <Button
            key={item.code}
            variant="outline"
            size="sm"
            role="radio"
            aria-checked={isActive}
            onClick={() => {
              setLocale(item.code);
              onSelect?.();
            }}
            className={cn(
              "h-10 justify-start gap-2 px-3 border rounded-lg transition-all",
              isActive
                ? "border-primary bg-primary/10 shadow-xs ring-1 ring-primary/40 text-primary font-bold dark:bg-primary/20"
                : "border-border/80 bg-background hover:bg-accent/50 text-foreground"
            )}
          >
            <span
              className={cn(
                "fi",
                item.flagClass,
                "shrink-0 text-base rounded-[2px] ring-1 ring-black/10 dark:ring-white/20 overflow-hidden shadow-2xs"
              )}
              aria-hidden="true"
            />
            <span className="text-xs truncate">{item.shortLabel} · {item.nativeName}</span>
          </Button>
        );
      })}
    </div>
  );
}
