"use client";

import Image from "next/image";
import { useState } from "react";

const TRACCIATI = [1, 2, 3, 4, 5];

export function TracciatiBanner() {
  const [paused, setPaused] = useState(false);
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
          {loop.map((n, idx) => (
            <button
              key={idx}
              className="group/thumb relative shrink-0 mr-4 sm:mr-6"
              aria-label={`Tracciato ${n}`}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* miniatura */}
              <span className="relative block h-16 sm:h-[72px] w-[132px] sm:w-[150px] overflow-hidden rounded-[3px] ring-1 ring-paper/20 shadow-lg transition-all duration-300 group-hover/thumb:ring-gold-bright/80 group-hover/thumb:-translate-y-0.5">
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

              {/* anteprima ingrandita su hover */}
              <span className="pointer-events-none absolute bottom-[calc(100%+18px)] left-1/2 -translate-x-1/2 w-[min(80vw,560px)] origin-bottom scale-90 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/thumb:scale-100 group-hover/thumb:opacity-100">
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
          ))}
        </div>
      </div>
    </div>
  );
}
