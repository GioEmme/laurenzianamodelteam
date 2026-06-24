"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [1, 2, 3, 4, 5];
const INTERVAL = 5200;

export function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      INTERVAL,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-asphalt">
      {SLIDES.map((n, i) => (
        <div
          key={n}
          className="absolute inset-0 transition-opacity duration-[1600ms] ease-in-out"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i !== active}
        >
          <Image
            src={`/hero/${n}-hd.jpeg`}
            alt="La pista permanente di Firenze"
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      {/* scrim: solo dove serve per leggibilità — foto nitida a destra */}
      <div className="absolute inset-0 bg-gradient-to-r from-asphalt/88 via-asphalt/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-asphalt/85 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-asphalt/65 to-transparent" />

      {/* indicatori slide */}
      <div className="absolute bottom-28 sm:bottom-32 right-5 sm:right-8 flex gap-1.5 z-10">
        {SLIDES.map((n, i) => (
          <button
            key={n}
            aria-label={`Foto ${n}`}
            onClick={() => setActive(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === active ? "w-7 bg-gold-bright" : "w-1.5 bg-paper/40 hover:bg-paper/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
