import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Campionati",
  description:
    "Campionato Sociale, F1 Championship e trofei della A.S.D. Laurenziana Model Team: come è strutturata la stagione. Regolamenti completi nella pagina categorie.",
};

const comeSiCorre = [
  {
    t: "Quando",
    d: "Gare la domenica mattina. Iscrizioni su MyRCM o per telefono, secondo le scadenze di ogni gara.",
  },
  {
    t: "Qualifiche",
    d: "A Superpole per Touring, FWD e GT; a manche da 5 minuti per Vaschetta e F1. A seguire le finali.",
  },
  {
    t: "Punteggi",
    d: "Progressivi dal primo classificato. L'F1 Championship assegna classifica piloti e costruttori, fino a 400 punti a vittoria.",
  },
];

export default function CampionatiPage() {
  return (
    <>
      <PageHero
        kicker="La stagione"
        title={
          <>
            Correre
            <br />
            <span className="text-serif-italic gold-gradient">sul serio</span>
          </>
        }
        intro="Una stagione, tre tipi di gara: il campionato sociale a cinque prove, l'F1 Championship con piloti e costruttori, e i trofei aperti durante l'anno."
      />

      {/* i tre campionati */}
      <section className="blueprint pb-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 grid lg:grid-cols-3 gap-px bg-ink/10 hairline">
          {site.championships.map((c, i) => (
            <Reveal key={c.key} delay={i * 0.08}>
              <div className="bg-paper p-8 h-full flex flex-col">
                <div className="text-mono text-viola text-sm">0{i + 1}</div>
                <h2 className="text-display text-2xl sm:text-3xl mt-4">
                  {c.title}
                </h2>
                <p className="text-ink-dim mt-4 leading-relaxed flex-1">
                  {c.blurb}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {c.classes.map((cl) => (
                    <span
                      key={cl}
                      className="text-label border border-ink/15 px-2.5 py-1 text-ink-dim"
                    >
                      {cl}
                    </span>
                  ))}
                  {c.rounds && (
                    <span className="text-label border border-viola/30 text-viola px-2.5 py-1">
                      {c.rounds} prove
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* come si corre — riepilogo, dettaglio sui regolamenti */}
      <section className="blueprint-dark text-paper py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <div className="text-label text-viola-bright mb-3">Come si corre</div>
            <h2 className="text-display text-[clamp(2rem,5vw,3.5rem)] mb-12">
              La giornata di gara
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-px bg-paper/10 hairline-dark">
            {comeSiCorre.map((f, i) => (
              <Reveal key={f.t} delay={i * 0.06}>
                <div className="bg-asphalt p-7 h-full">
                  <div className="text-mono text-viola-bright text-sm">
                    0{i + 1}
                  </div>
                  <h3 className="text-display text-xl mt-4">{f.t}</h3>
                  <p className="text-paper/55 text-sm mt-3 leading-relaxed">
                    {f.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 hairline-dark p-7 bg-asphalt-soft flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <p className="text-paper/70 leading-relaxed max-w-2xl">
                Regolamento tecnico e svolgimento di ogni categoria, e il
                regolamento esteso dell&apos;F1 Championship (tecnico, punteggi,
                team, verifiche), sono nella pagina dedicata.
              </p>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/categorie"
                  className="text-label bg-paper text-asphalt px-6 py-3.5 hover:bg-viola hover:text-paper transition-colors"
                >
                  Categorie & regolamenti →
                </Link>
                <Link
                  href="/categorie#f1-championship"
                  className="text-label hairline-dark px-6 py-3.5 hover:bg-paper/10 transition-colors"
                >
                  F1 Championship →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
