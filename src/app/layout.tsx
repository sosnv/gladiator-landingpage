import type { Metadata, Viewport } from "next";
import { Cinzel, Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GLADIATOR | Siła. Honor. Charakter.",
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["GLADIATOR", "suplementy", "siła", "trening", "Polska"],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    title: "GLADIATOR | Siła. Honor. Charakter.",
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${cinzel.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
