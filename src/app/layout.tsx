import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Fraunces, Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} — Pista RC su asfalto a Firenze`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "automodellismo",
    "RC",
    "pista asfalto",
    "Firenze",
    "Laurenziana Model Team",
    "A.S.D. Laurenziana Model Team",
    "Touring 1/10",
    "F1 RC",
    "campionato sociale",
  ],
  openGraph: {
    title: `${site.name} — ${site.track}`,
    description: site.tagline,
    type: "website",
    locale: "it_IT",
    url: `https://${site.domain}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#ecebe4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="it"
      className={`${bricolage.variable} ${fraunces.variable} ${interTight.variable} ${plexMono.variable}`}
    >
      <body className="antialiased">
        <div className="grain" aria-hidden />
        <SmoothScroll>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
