"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const TRACCIATI = [1, 2, 3, 4, 5];

/**
 * Caricatore di diapositive al centro-basso dell'hero: 5 telaietti 35mm a
 * ventaglio, leggermente inclinati in avanti (prospettiva 3D) e sovrapposti.
 * Hover (desktop) / tap (mobile) su una diapositiva → si raddrizza, si solleva
 * verso lo spettatore e ne compare la proiezione ingrandita sull'hero.
 */
export function SlideMagazine() {
  const [active, setActive] = useState<number | null>(null);
  const [shown, setShown] = useState(0); // resta sull'ultima durante il fade-out
  const lastPointer = useRef<string>("mouse");

  useEffect(() => {
    if (active !== null) setShown(active);
  }, [active]);

  const open = active !== null;

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20">
      {/* proiezione ingrandita (centrata) */}
      <div
        className={cn(
          "pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 origin-bottom transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "scale-100 opacity-100" : "scale-90 opacity-0",
        )}
      >
        <span className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(227,195,114,0.28),transparent_70%)] blur-xl" />
        <span className="block relative aspect-[410/195] w-[72vw] overflow-hidden rounded-md ring-1 ring-gold-bright/50 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.85)]">
          <Image
            src={`/tracciati/tracciato-${TRACCIATI[shown]}.png`}
            alt={`Tracciato ${TRACCIATI[shown]} — planimetria`}
            fill
            className="object-cover"
            sizes="72vw"
          />
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,247,225,0.12),transparent_45%)]" />
        </span>
        <span className="mt-2 block text-center text-label text-gold-bright">
          Tracciato {TRACCIATI[shown]}
        </span>
      </div>

      {/* etichetta */}
      <span className="block mb-2 text-center text-label text-gold-bright/70">
        I tracciati
      </span>

      {/* il caricatore a ventaglio */}
      <div className="relative" style={{ perspective: "900px" }}>
        {/* ombra a terra */}
        <span className="pointer-events-none absolute -bottom-1 left-1/2 h-5 w-[70%] -translate-x-1/2 rounded-[100%] bg-black/40 blur-md" />

        <div
          className="relative flex items-end justify-center"
          style={{ transformStyle: "preserve-3d", transform: "rotateX(14deg)" }}
        >
          {TRACCIATI.map((n, idx) => {
            const isActive = active === idx;
            const angle = (idx - 2) * 6; // ventaglio: -12 … +12 gradi
            const base = `rotateZ(${angle}deg)`;
            const lifted = "translateY(-18px) translateZ(48px) scale(1.06) rotateZ(0deg)";
            return (
              <button
                key={n}
                aria-label={`Tracciato ${n}`}
                className="group/slide relative shrink-0 origin-bottom outline-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
                style={{
                  transform: isActive ? lifted : base,
                  marginLeft: idx === 0 ? 0 : "-16px",
                  zIndex: isActive ? 50 : idx,
                }}
                onPointerEnter={(e) => {
                  if (e.pointerType !== "touch") setActive(idx);
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType !== "touch") setActive(null);
                }}
                onPointerDown={(e) => {
                  lastPointer.current = e.pointerType;
                }}
                onClick={() => {
                  if (lastPointer.current === "touch")
                    setActive((a) => (a === idx ? null : idx));
                }}
              >
                {/* telaietto 35mm (cartoncino) */}
                <span
                  className={cn(
                    "relative block w-[72px] sm:w-[86px] rounded-[2px] bg-[#e9e5d9] p-1 pb-3 ring-1 transition-shadow duration-300",
                    isActive
                      ? "ring-gold-bright shadow-[0_18px_34px_-10px_rgba(0,0,0,0.75)]"
                      : "ring-black/10 shadow-[0_9px_14px_-6px_rgba(0,0,0,0.6)]",
                  )}
                >
                  <span className="relative block aspect-[410/195] overflow-hidden rounded-[1px] bg-black ring-1 ring-black/40">
                    <Image
                      src={`/tracciati/tracciato-${n}.png`}
                      alt={`Tracciato ${n}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </span>
                  <span className="absolute inset-x-0 bottom-0.5 text-center text-mono text-[0.5rem] leading-none text-ink/70">
                    T{n}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
