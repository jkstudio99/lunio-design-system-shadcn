"use client";

import * as React from "react";
import { type Locale, translations, supportedLocales, type LocaleInfo } from "@/lib/i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof translations["zh-TW"];
  isZh: boolean;
  isEn: boolean;
  localeInfo: LocaleInfo;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "lunio-locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>("zh-TW");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored === "zh-TW" || stored === "en") {
        setLocaleState(stored);
      } else {
        // Detect browser language
        const navLang = navigator.language?.toLowerCase() || "";
        if (navLang.startsWith("zh")) {
          setLocaleState("zh-TW");
        } else if (navLang.startsWith("en")) {
          setLocaleState("en");
        }
      }
    } catch {
      // Fallback silently if localStorage is restricted
    }
    setMounted(true);
  }, []);

  const setLocale = React.useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale === "zh-TW" ? "zh-Hant-TW" : "en";
    } catch {
      // Fallback silently
    }
  }, []);

  React.useEffect(() => {
    if (mounted) {
      document.documentElement.lang = locale === "zh-TW" ? "zh-Hant-TW" : "en";
    }
  }, [locale, mounted]);

  const value = React.useMemo(() => {
    const activeLocale = locale;
    const t = translations[activeLocale] || translations["zh-TW"];
    const localeInfo = supportedLocales.find((l) => l.code === activeLocale) || supportedLocales[0];
    return {
      locale: activeLocale,
      setLocale,
      t,
      isZh: activeLocale === "zh-TW",
      isEn: activeLocale === "en",
      localeInfo,
    };
  }, [locale, setLocale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
