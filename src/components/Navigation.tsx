"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // Solo la home ha l'hero scuro a tutto schermo: lì (e non scrollati)
  // la topbar va chiara. Altrove lo sfondo in alto è chiaro → testo scuro.
  // Col menu mobile aperto lo sfondo dietro è chiaro → forza stato scuro.
  const light = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        open
          ? "bg-paper border-b border-ink/10"
          : scrolled
            ? "bg-paper/80 backdrop-blur-md border-b border-ink/10"
            : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-[1400px] px-4 sm:px-6 h-[72px] flex items-center justify-between",
          light && "drop-shadow-[0_1px_10px_rgba(0,0,0,0.45)]",
        )}
      >
        <Link
          href="/"
          className="flex items-center group"
          onClick={() => setOpen(false)}
          aria-label="A.S.D. Laurenziana Model Team — home"
        >
          <Image
            src={light ? "/loghi/scudo-light.png" : "/loghi/scudo.png"}
            alt="A.S.D. Laurenziana Model Team"
            width={120}
            height={60}
            priority
            className="h-[58px] sm:h-[66px] w-auto transition-opacity group-hover:opacity-80"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {site.nav.map((item) =>
            item.href === "/calendario" ? (
              <Link
                key={item.href}
                href={item.href}
                className="text-label relative ml-1 mr-1 inline-flex items-center gap-2 rounded-full bg-gold-bright px-4 py-2 text-asphalt shadow-[0_2px_14px_rgba(227,195,114,0.45)] hover:bg-gold transition-colors"
              >
                <span className="relative flex h-2 w-2">
                  <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-kerb" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-kerb" />
                </span>
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-label px-3 py-2 transition-colors",
                  light
                    ? "text-paper/85 hover:text-paper"
                    : "text-ink-dim hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
          {/* logo completo: targhetta chiara, leggibile anche sopra l'hero */}
          <div className="hidden lg:flex items-center bg-paper rounded-md px-2 py-0.5 ml-2 shadow-[0_2px_10px_rgba(0,0,0,0.18)]">
            <Image
              src="/loghi/logo-full.png"
              alt="A.S.D. Laurenziana Model Team Firenze"
              width={220}
              height={125}
              className="h-[52px] w-auto"
            />
          </div>
          <a
            href={site.social.myrcm}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-label bg-viola text-paper px-4 py-2.5 hover:bg-viola-bright transition-colors"
          >
            Iscrizione gare →
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "md:hidden h-10 w-10 grid place-items-center border",
            light ? "border-paper/30" : "border-ink/15",
          )}
          aria-label="Menu"
        >
          <div className="space-y-1.5">
            <span className={cn("block h-px w-5 transition-transform", light ? "bg-paper" : "bg-ink", open && "translate-y-[6px] rotate-45")} />
            <span className={cn("block h-px w-5 transition-opacity", light ? "bg-paper" : "bg-ink", open && "opacity-0")} />
            <span className={cn("block h-px w-5 transition-transform", light ? "bg-paper" : "bg-ink", open && "-translate-y-[6px] -rotate-45")} />
          </div>
        </button>
      </div>

      {/* mobile fullscreen */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-[72px] bg-paper blueprint transition-all duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <nav className="flex flex-col items-center text-center p-6 gap-1">
          <Image
            src="/loghi/logo-full.png"
            alt="A.S.D. Laurenziana Model Team Firenze"
            width={520}
            height={294}
            className="w-3/4 max-w-xs h-auto mb-6"
          />
          {site.nav.map((item, i) => {
            const isCal = item.href === "/calendario";
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "w-full py-2 border-b border-ink/10 text-display text-4xl transition-colors flex items-center justify-center gap-3",
                  isCal ? "text-viola" : "hover:text-viola",
                )}
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {isCal && (
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-kerb" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-kerb" />
                  </span>
                )}
                {item.label}
              </Link>
            );
          })}
          <a
            href={site.social.myrcm}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 text-label bg-viola text-paper px-5 py-4 text-center"
          >
            Iscrizione gare su MyRCM →
          </a>
        </nav>
      </div>
    </header>
  );
}
