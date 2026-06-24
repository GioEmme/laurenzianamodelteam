import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { Reveal } from "@/components/Reveal";
import { GiglioMark } from "@/components/GiglioMark";
import { site, categories, calendar2026 } from "@/lib/site";

// Ricalcolato a ogni rebuild/giorno (revalidate sotto): le prossime gare
// rispetto alla data odierna.
export const revalidate = 86400;

function nextRaces(n: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return calendar2026
    .filter((r) => new Date(r.date) >= today)
    .slice(0, n);
}

export default function Home() {
  const upcoming = nextRaces(3);

  return (
    <>
      <Hero />

      {/* MANIFESTO */}
      <section className="surface-viola text-paper py-24 sm:py-32 relative overflow-hidden">
        <GiglioMark className="pointer-events-none absolute top-1/2 -translate-y-1/2 -right-[7%] h-[115%] w-auto text-paper/[0.06]" />
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <div className="text-label text-viola-bright mb-8">
              ⚜ Chi siamo
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-serif text-[clamp(1.9rem,4.6vw,3.6rem)] leading-[1.1] max-w-5xl">
              Una pista permanente d'asfalto, all'aperto, a{" "}
              <span className="text-serif-italic gold-gradient">Firenze</span>:
              un tracciato che viene ridisegnato a ogni gara.
            </p>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-3 gap-px bg-paper/10 hairline-dark">
            {[
              {
                t: "Cinque categorie",
                d: "Dalla Vaschetta Cardano per iniziare alle monoposto F1 in spugna, passando per Touring, FWD e GT.",
              },
              {
                t: "Tre campionati",
                d: "Il campionato sociale a cinque prove, l'F1 Championship a piloti e costruttori e i trofei aperti durante l'anno.",
              },
              {
                t: "Stesse regole per tutti",
                d: "Motori a regolamento e gomme punzonate, un solo treno per gara: a fare la differenza restano guida e assetto.",
              },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.08}>
                <div className="bg-asphalt p-8 h-full">
                  <div className="text-mono text-viola-bright text-sm">
                    0{i + 1}
                  </div>
                  <h3 className="text-display text-2xl mt-4">{c.t}</h3>
                  <p className="text-paper/60 mt-3 leading-relaxed">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIE */}
      <section className="blueprint py-24 sm:py-32 relative overflow-hidden">
        <GiglioMark className="pointer-events-none absolute top-1/2 -translate-y-1/2 -left-[7%] h-[115%] w-auto text-viola/[0.06]" />
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
            <div>
              <Reveal>
                <div className="text-label text-viola mb-3">Categorie</div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-serif text-[clamp(2.4rem,6vw,4.2rem)]">
                  Cinque modi di correre
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Link
                href="/categorie"
                className="text-label hairline px-5 py-3 hover:border-viola hover:text-viola transition-colors"
              >
                Tutte le categorie →
              </Link>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 hairline">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/categorie#${c.slug}`}
                  className="group bg-paper p-7 h-full flex flex-col hover:bg-paper-soft transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-mono text-sm text-ink-faint">
                      0{i + 1}
                    </span>
                    <span className="text-label text-viola border border-viola/30 px-2 py-1">
                      {c.tire === "spugna" ? "Spugna" : "Lattice"}
                    </span>
                  </div>
                  <h3 className="text-display text-2xl mt-6 group-hover:text-viola transition-colors">
                    {c.label}
                  </h3>
                  <p className="text-ink-dim mt-3 text-sm leading-relaxed flex-1">
                    {c.blurb}
                  </p>
                  <span className="mt-5 text-label text-ink-faint group-hover:text-viola transition-colors">
                    Regolamento →
                  </span>
                </Link>
              </Reveal>
            ))}
            {/* CTA card */}
            <Reveal delay={0.12}>
              <div className="bg-viola text-paper p-7 h-full flex flex-col justify-between">
                <GiglioMark className="h-10 w-auto text-paper/80" />
                <div>
                  <h3 className="text-display text-2xl mt-6">
                    Vuoi provare?
                  </h3>
                  <p className="text-paper/80 mt-2 text-sm">
                    Gomme fornite a gara. Iscrizioni su MyRCM o per telefono.
                  </p>
                  <a
                    href={site.social.myrcm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block text-label bg-paper text-viola px-5 py-3"
                  >
                    Iscrizione gare su MyRCM →
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CIRCUITO foto */}
      <section className="relative py-24 sm:py-32 surface-viola text-paper overflow-hidden">
        <GiglioMark className="pointer-events-none absolute top-1/2 -translate-y-1/2 -right-[7%] h-[115%] w-auto text-paper/[0.06]" />
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden hairline-dark">
              <Image
                src="/pista/pista-aerea-01.jpeg"
                alt="Vista aerea della pista permanente di Firenze"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <div className="text-label text-viola-bright mb-3">Il circuito</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-serif text-[clamp(2rem,5vw,3.6rem)] leading-[1.02]">
                Un asfalto,<br />
                <span className="text-serif-italic gold-gradient">
                  cinque tracciati
                </span>
                .
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-paper/60 mt-6 leading-relaxed max-w-lg">
                Asfalto, con il palco di pilotaggio al centro. La pista viene
                ridisegnata a ogni prova del campionato: cinque tracciati
                diversi nel corso della stagione.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <Link
                href="/circuito"
                className="mt-8 inline-block text-label bg-paper text-asphalt px-6 py-4 hover:bg-viola hover:text-paper transition-colors"
              >
                Tutti i tracciati →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CALENDARIO preview */}
      <section className="blueprint py-24 sm:py-32 relative overflow-hidden">
        <GiglioMark className="pointer-events-none absolute top-1/2 -translate-y-1/2 -left-[7%] h-[115%] w-auto text-viola/[0.06]" />
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
            <div>
              <Reveal>
                <div className="text-label text-viola mb-3">Prossime gare</div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-serif text-[clamp(2.4rem,6vw,4.2rem)]">
                  Stagione 2026
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Link
                href="/calendario"
                className="text-label hairline px-5 py-3 hover:border-viola hover:text-viola transition-colors"
              >
                Calendario completo →
              </Link>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-3 gap-px bg-ink/10 hairline">
            {upcoming.map((r, i) => (
              <Reveal key={r.n} delay={i * 0.06}>
                <div className="bg-paper p-7 h-full flex flex-col gap-4 hover:bg-paper-soft transition-colors">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-mono text-viola text-sm tabular-nums">
                      {r.display}
                    </span>
                    <KindBadge kind={r.kind} />
                  </div>
                  <div className="text-display text-xl sm:text-2xl flex-1">
                    {r.label}
                  </div>
                  <div className="text-label text-ink-faint">{r.duration}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="relative surface-viola text-paper py-28 sm:py-36 overflow-hidden">
        <GiglioMark className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-[120%] w-auto text-paper/[0.06]" />
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 text-center">
          <Reveal>
            <h2 className="text-serif text-[clamp(2.6rem,8vw,6rem)] leading-[0.98]">
              Ci vediamo<br />in{" "}
              <span className="text-serif-italic gold-gradient">pista</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-paper/60 max-w-xl mx-auto">
              {site.address.street}, {site.address.cap} {site.address.city}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contatti"
                className="text-label bg-gold-bright text-asphalt px-7 py-4 hover:bg-gold transition-colors"
              >
                Contatti & come arrivare →
              </Link>
              <a
                href={site.social.myrcm}
                target="_blank"
                rel="noopener noreferrer"
                className="text-label hairline-dark px-7 py-4 hover:bg-paper/10 transition-colors"
              >
                Iscrizione gare su MyRCM
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function KindBadge({ kind }: { kind: "sociale" | "trofeo" | "libera" }) {
  const map = {
    sociale: { label: "Sociale", cls: "text-viola border-viola/30" },
    trofeo: { label: "Trofeo", cls: "text-kerb border-kerb/30" },
    libera: { label: "Libera", cls: "text-track border-track/30" },
  } as const;
  const m = map[kind];
  return (
    <span className={`text-label border px-2.5 py-1 ${m.cls}`}>{m.label}</span>
  );
}
