import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TrackCanvas } from "@/components/TrackCanvas";
import { TrackMini } from "@/components/TrackMini";
import { tracks } from "@/lib/tracks";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Il circuito",
  description:
    "La pista permanente RC su asfalto della A.S.D. Laurenziana Model Team, a Firenze: tracciati riconfigurabili, cordoli, palco di pilotaggio. Layout-tipo del nostro circuito.",
};

const photos = [
  { src: "/pista/pista-aerea-01.jpeg", alt: "Vista aerea della pista" },
  { src: "/pista/pista-02.jpeg", alt: "Dettaglio curve e cordoli" },
  { src: "/pista/pista-03.jpeg", alt: "Rettilineo e palco" },
  { src: "/pista/pista-04.jpeg", alt: "La pista dall'alto" },
];

export default function CircuitoPage() {
  return (
    <>
      <PageHero
        kicker="Il circuito · Firenze"
        title={
          <>
            Un piazzale,
            <br />
            <span className="text-serif-italic gold-gradient">mille piste</span>
          </>
        }
        intro="Asfalto vero, all'aperto. Lo stesso spazio viene ridisegnato a ogni prova del campionato: bordi azzurri, cordoli rosso-bianchi e un palco di pilotaggio al centro. Ecco i layout-tipo del nostro circuito."
      />

      {/* canvas interattivo */}
      <section className="blueprint pb-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <div className="blueprint-dark hairline-dark text-paper p-6 sm:p-10 relative">
              <div className="tricolore-rule absolute top-0 inset-x-0" />
              <div className="max-w-3xl mx-auto">
                <TrackCanvas />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* griglia tracciati */}
      <section className="blueprint-dark text-paper py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <div className="text-label text-viola-bright mb-3">I layout</div>
            <h2 className="text-display text-[clamp(2rem,5vw,3.5rem)] mb-12">
              Quattro caratteri
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-paper/10 hairline-dark">
            {tracks.map((t, i) => (
              <Reveal key={t.id} delay={(i % 4) * 0.06}>
                <div className="bg-asphalt p-6 h-full">
                  <div className="aspect-square mb-4">
                    <TrackMini track={t} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-mono text-viola-bright">
                      {t.index}
                    </span>
                    <span className="text-label text-paper/40">
                      {t.corners} curve
                    </span>
                  </div>
                  <h3 className="text-display text-xl mt-2">{t.name}</h3>
                  <p className="text-paper/55 text-sm mt-2 leading-relaxed">
                    {t.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* gallery */}
      <section className="blueprint py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <div className="text-label text-viola mb-3">Galleria</div>
            <h2 className="text-display text-[clamp(2rem,5vw,3.5rem)] mb-12">
              Dal vivo
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {photos.map((p, i) => (
              <Reveal key={p.src} delay={(i % 2) * 0.08}>
                <div className="relative aspect-[16/10] overflow-hidden hairline group">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-10 text-ink-dim max-w-2xl">
              Ci trovi in {site.address.street}, {site.address.cap}{" "}
              {site.address.city}.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
