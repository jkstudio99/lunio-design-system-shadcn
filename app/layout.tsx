import type {Metadata} from "next";
import {BrandProvider} from "@/components/brand-provider";
import {ThemeProvider} from "@/components/theme-provider";
import "./globals.css";

export const metadata:Metadata={title:{default:"Lunio Design System",template:"%s · Lunio Design System"},description:"Lunio multi-brand design system — MiSansTC, Figma-to-Code, Tokens, shadcn/UI and e-commerce patterns."};

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="zh-Hant-TW" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <BrandProvider>{children}</BrandProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
