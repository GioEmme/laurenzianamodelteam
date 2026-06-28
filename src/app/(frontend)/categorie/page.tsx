import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { categories, f1Championship, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Categorie & regolamenti",
  description:
    "Regolamenti tecnici e svolgimento gara della A.S.D. Laurenziana Model Team: Touring, FWD, GT Foam, Vaschetta Cardano e F1 Foam 1/10, più il regolamento esteso dell'F1 Championship.",
};

export default function CategoriePage() {
  return (
    <>
      <PageHero
        kicker="Regolamenti tecnici"
        title={
          <>
            Cinque modi
            <br />
            <span className="text-serif-italic gold-gradient">di correre</span>
          </>
        }
        intro="Motori e gomme a regolamento, gomme punzonate alla consegna, un solo treno per gara: ogni categoria ha il suo svolgimento e le sue specifiche. Tutto come da regolamenti ufficiali."
      />

      {/* categorie */}
      <section className="blueprint pb-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 space-y-px bg-ink/10 hairline">
          {categories.map((c, i) => (
            <Reveal key={c.slug}>
              <article
                id={c.slug}
                className="bg-paper scroll-mt-24 grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 p-7 sm:p-10"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <span className="text-display text-5xl text-viola/30 tabular-nums">
                      0{i + 1}
                    </span>
                    <span className="text-label text-viola border border-viola/30 px-2 py-1">
                      Gomme {c.tire}
                    </span>
                  </div>
                  <h2 className="text-display text-3xl sm:text-4xl mt-5">
                    {c.label}
                  </h2>
                  <p className="text-ink-dim mt-4 leading-relaxed">
                    {c.description}
                  </p>

                  <div className="mt-6 space-y-2.5">
                    <div className="text-label eyebrow">Svolgimento gara</div>
                    <p className="text-sm text-ink-dim leading-relaxed">
                      <span className="text-ink font-medium">Qualifiche.</span>{" "}
                      {c.format.qualifiche}
                    </p>
                    <p className="text-sm text-ink-dim leading-relaxed">
                      <span className="text-ink font-medium">Finali.</span>{" "}
                      {c.format.finali}
                    </p>
                  </div>

                  {c.social && (
                    <div className="mt-5 text-label text-ink-faint">
                      Campionato sociale ·{" "}
                      {c.social.drop ? "con uno scarto" : "senza scarto"}
                    </div>
                  )}
                </div>

                <div>
                  <div className="text-label text-ink-faint mb-3">
                    Regolamento tecnico
                  </div>
                  <dl className="grid sm:grid-cols-2 gap-px bg-ink/10 hairline self-start">
                    {Object.entries(c.specs).map(([k, v]) => (
                      <div key={k} className="bg-paper px-4 py-3">
                        <dt className="text-label text-ink-faint">{k}</dt>
                        <dd className="text-sm mt-1 text-ink">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* F1 Championship — regolamento esteso */}
      <section
        id="f1-championship"
        className="blueprint-dark text-paper py-24 scroll-mt-24"
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <div className="text-label eyebrow mb-3">
              Regolamento esteso
            </div>
            <h2 className="text-serif text-[clamp(2.2rem,6vw,4rem)]">
              F1 <span className="text-serif-italic gold-gradient">Championship</span>
            </h2>
            <p className="text-paper/70 mt-5 max-w-3xl leading-relaxed">
              {f1Championship.intro}
            </p>
            <p className="text-label text-gold-bright/80 mt-4">
              {f1Championship.fee}
            </p>
          </Reveal>

          {/* svolgimento */}
          <Reveal>
            <div className="mt-12 grid sm:grid-cols-2 gap-px bg-paper/10 hairline-dark">
              <div className="bg-asphalt p-7">
                <div className="text-label eyebrow mb-2">Qualifiche</div>
                <p className="text-paper/70 text-sm leading-relaxed">
                  {f1Championship.format.qualifiche}
                </p>
              </div>
              <div className="bg-asphalt p-7">
                <div className="text-label eyebrow mb-2">Finali</div>
                <p className="text-paper/70 text-sm leading-relaxed">
                  {f1Championship.format.finali}
                </p>
              </div>
            </div>
          </Reveal>

          {/* regolamento tecnico esteso */}
          <Reveal>
            <div className="mt-12">
              <div className="text-label eyebrow mb-4">
                Regolamento tecnico
              </div>
              <dl className="grid sm:grid-cols-2 gap-px bg-paper/10 hairline-dark">
                {Object.entries(f1Championship.tech).map(([k, v]) => (
                  <div key={k} className="bg-asphalt p-5">
                    <dt className="text-label text-paper/55">{k}</dt>
                    <dd className="text-sm mt-1.5 text-paper/85 leading-relaxed">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* piloti e team */}
          <Reveal>
            <div className="mt-12 grid lg:grid-cols-[1.3fr_1fr] gap-px bg-paper/10 hairline-dark">
              <div className="bg-asphalt p-7">
                <div className="text-label eyebrow mb-3">
                  Piloti e team
                </div>
                <p className="text-paper/70 text-sm leading-relaxed">
                  {f1Championship.teams}
                </p>
              </div>
              <div className="bg-asphalt p-7">
                <div className="text-label eyebrow mb-3">
                  Punteggi a gara
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-4 gap-y-1.5">
                  {f1Championship.punteggi.map(([pos, pt]) => (
                    <div
                      key={pos}
                      className="flex items-baseline justify-between gap-2 tabular-nums"
                    >
                      <span className="text-mono text-xs text-paper/55">
                        {pos}
                      </span>
                      <span className="text-sm text-paper/85">{pt}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-paper/50 mt-4 leading-relaxed">
                  {f1Championship.punteggiNota}
                </p>
              </div>
            </div>
          </Reveal>

          {/* regole gara */}
          <Reveal>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-paper/10 hairline-dark">
              {[
                { t: "Verifiche e penalità", d: f1Championship.verifiche },
                { t: "Sul palco", d: f1Championship.palco },
                { t: "Premiazione e montepremi", d: f1Championship.premiazione },
                { t: "Giornata tipo", d: f1Championship.timetable },
              ].map((b) => (
                <div key={b.t} className="bg-asphalt p-6">
                  <div className="text-label eyebrow mb-2">{b.t}</div>
                  <p className="text-paper/65 text-sm leading-relaxed">{b.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="blueprint py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-display text-3xl">Pronto a scendere in pista?</h2>
            <p className="text-ink-dim mt-2">
              Gomme fornite e punzonate alla consegna: un solo treno per gara.
            </p>
          </div>
          <a
            href={site.social.myrcm}
            target="_blank"
            rel="noopener noreferrer"
            className="text-label bg-viola text-paper px-7 py-4 hover:bg-viola-bright transition-colors shrink-0"
          >
            Iscrizione gare su MyRCM →
          </a>
        </div>
      </section>
    </>
  );
}
