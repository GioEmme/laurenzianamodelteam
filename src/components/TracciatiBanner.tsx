"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

const TRACCIATI = [1, 2, 3, 4, 5];

export function TracciatiBanner() {
  // indice della miniatura attiva (hover su desktop, tap su mobile).
  const [active, setActive] = useState<number | null>(null);
  const lastPointer = useRef<string>("mouse");
  const paused = active !== null;

  // Per uno scorrimento infinito senza vuoti il nastro deve superare 2× la
  // larghezza schermo: ripeto il set 3 volte e poi duplico il tutto (6 set).
  // L'animazione trasla del -50% → la seconda metà (identica) rientra senza salti.
  const half = [...TRACCIATI, ...TRACCIATI, ...TRACCIATI];
  const loop = [...half, ...half];

  return (
    <div className="group/banner absolute bottom-0 inset-x-0 z-20 pt-16 pb-5 bg-gradient-to-t from-asphalt/85 via-asphalt/45 to-transparent">
      <span className="text-label text-gold-bright/70 absolute top-7 left-5 sm:left-8">
        I tracciati
      </span>

      <div>
        <div
          className="flex w-max animate-marquee"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {loop.map((n, idx) => {
            const isActive = active === idx;
            return (
              <button
                key={idx}
                className="group/thumb relative shrink-0 mr-4 sm:mr-6"
                aria-label={`Tracciato ${n}`}
                // desktop: hover col mouse (ignora il touch, gestito dal tap)
                onPointerEnter={(e) => {
                  if (e.pointerType !== "touch") setActive(idx);
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType !== "touch") setActive(null);
                }}
                onPointerDown={(e) => {
                  lastPointer.current = e.pointerType;
                }}
                // mobile: tap apre/chiude l'anteprima e mette in pausa il nastro
                onClick={() => {
                  if (lastPointer.current === "touch")
                    setActive((a) => (a === idx ? null : idx));
                }}
              >
                {/* miniatura */}
                <span
                  className={cn(
                    "relative block h-16 sm:h-[72px] w-[132px] sm:w-[150px] overflow-hidden rounded-[3px] ring-1 shadow-lg transition-all duration-300",
                    isActive
                      ? "ring-gold-bright/80 -translate-y-0.5"
                      : "ring-paper/20",
                  )}
                >
                  <Image
                    src={`/tracciati/tracciato-${n}.png`}
                    alt={`Tracciato ${n}`}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                  <span className="absolute bottom-1 left-1.5 text-mono text-[0.6rem] text-paper drop-shadow">
                    T{n}
                  </span>
                </span>

                {/* anteprima ingrandita */}
                <span
                  className={cn(
                    "pointer-events-none absolute bottom-[calc(100%+18px)] left-1/2 -translate-x-1/2 w-[min(80vw,560px)] origin-bottom transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive ? "scale-100 opacity-100" : "scale-90 opacity-0",
                  )}
                >
                  <span className="block relative aspect-[410/195] rounded-md overflow-hidden ring-1 ring-gold-bright/50 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.85)]">
                    <Image
                      src={`/tracciati/tracciato-${n}.png`}
                      alt={`Tracciato ${n} — planimetria`}
                      fill
                      className="object-cover"
                      sizes="560px"
                    />
                  </span>
                  <span className="mt-2 block text-center text-label text-gold-bright">
                    Tracciato {n}
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
