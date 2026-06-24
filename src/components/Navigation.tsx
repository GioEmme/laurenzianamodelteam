"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { GiglioMark } from "./GiglioMark";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // Solo la home ha l'hero scuro a tutto schermo: lì (e non scrollati)
  // la topbar va chiara. Altrove lo sfondo in alto è chiaro → testo scuro.
  const light = pathname === "/" && !scrolled;

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
        scrolled
          ? "bg-paper/80 backdrop-blur-md border-b border-ink/10"
          : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-[1400px] px-4 sm:px-6 h-16 flex items-center justify-between",
          light && "drop-shadow-[0_1px_10px_rgba(0,0,0,0.45)]",
        )}
      >
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <GiglioMark
            className={cn(
              "h-7 w-auto transition-colors group-hover:text-kerb",
              light ? "text-gold-bright" : "text-viola",
            )}
          />
          <div className="leading-none hidden sm:block">
            <div
              className={cn(
                "text-display text-base tracking-tight",
                light ? "text-paper" : "text-ink",
              )}
            >
              A.S.D. LAURENZIANA
            </div>
            <div
              className={cn(
                "text-label text-[0.6rem] mt-0.5",
                light ? "text-paper/70" : "text-ink-dim",
              )}
            >
              Model Team · Firenze
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-label px-3 py-2 transition-colors",
                light
                  ? "text-paper/85 hover:text-paper"
                  : "text-ink-dim hover:text-ink",
                item.href === "/calendario" &&
                  "calendar-pulse relative px-4 hover:text-viola-bright",
              )}
            >
              {item.label}
            </Link>
          ))}
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
          "md:hidden fixed inset-0 top-16 bg-paper blueprint transition-all duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <nav className="flex flex-col p-6 gap-1">
          {site.nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-display text-4xl py-2 border-b border-ink/10 hover:text-viola transition-colors"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {item.label}
            </Link>
          ))}
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
