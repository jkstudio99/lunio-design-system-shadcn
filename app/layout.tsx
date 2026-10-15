import type {Metadata} from "next";
import {BrandProvider} from "@/components/brand-provider";
import {ThemeProvider} from "@/components/theme-provider";
import {LanguageProvider} from "@/components/language-provider";
import "flag-icons/css/flag-icons.min.css";
import "./globals.css";

export const metadata:Metadata={title:{default:"Lunio Design System",template:"%s · Lunio Design System"},description:"Lunio multi-brand design system — MiSansTC, Figma-to-Code, Tokens, shadcn/UI and e-commerce patterns."};

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="zh-Hant-TW" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <BrandProvider>{children}</BrandProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
