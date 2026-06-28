import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { calendar2026, site, type RaceDate } from "@/lib/site";

export const metadata: Metadata = {
  title: "Calendario 2026",
  description:
    "Il calendario gare 2026 della A.S.D. Laurenziana Model Team: campionato sociale, F1 Championship, trofei e gare libere sulla pista permanente di Firenze.",
};

const months = [
  "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
  "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre",
];

function groupByMonth(races: RaceDate[]) {
  const map = new Map<number, RaceDate[]>();
  for (const r of races) {
    const m = new Date(r.date).getMonth();
    if (!map.has(m)) map.set(m, []);
    map.get(m)!.push(r);
  }
  return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
}

const kindMeta = {
  sociale: { label: "Sociale", cls: "text-viola border-viola/30" },
  trofeo: { label: "Trofeo", cls: "text-kerb border-kerb/30" },
  libera: { label: "Libera", cls: "text-track border-track/30" },
} as const;

export default function CalendarioPage() {
  const grouped = groupByMonth(calendar2026);

  return (
    <>
      <PageHero
        kicker="Stagione 2026 · 21 appuntamenti"
        title={
          <>
            Calendario
            <br />
            <span className="text-serif-italic gold-gradient">2026</span>
          </>
        }
        intro="Gare la domenica mattina, qualifiche dalle 9:30. Iscrizioni su MyRCM o telefonando: per il campionato entro le 23:59 del venerdì precedente, per le gare libere entro le 9:00 del giorno della gara."
      />

      {/* legenda */}
      <section className="blueprint pb-8">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 flex flex-wrap items-center gap-3">
          {Object.entries(kindMeta).map(([k, m]) => (
            <span key={k} className={`text-label border px-3 py-1.5 ${m.cls}`}>
              {m.label}
            </span>
          ))}
          <span className="text-label text-ink-faint border border-ink/15 px-3 py-1.5">
            ◌ Provvisorio
          </span>
        </div>
      </section>

      <section className="blueprint pb-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 space-y-12">
          {grouped.map(([month, races], gi) => (
            <Reveal key={month} delay={Math.min(gi * 0.04, 0.2)}>
              <div className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-8">
                <div className="text-display text-2xl text-ink-faint md:sticky md:top-24 self-start">
                  {months[month]}
                </div>
                <div className="hairline divide-y divide-ink/10">
                  {races.map((r) => {
                    const m = kindMeta[r.kind];
                    return (
                      <div
                        key={r.n}
                        className="bg-paper grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_120px_1fr_auto_auto] items-center gap-3 sm:gap-6 px-5 sm:px-7 py-5"
                      >
                        <div className="text-mono text-sm text-ink-faint tabular-nums w-7">
                          {String(r.n).padStart(2, "0")}
                        </div>
                        <div className="text-mono text-viola text-sm tabular-nums hidden sm:block">
                          {r.display}
                        </div>
                        <div>
                          <div className="text-display text-lg sm:text-xl leading-tight">
                            {r.label}
                            {r.provisional && (
                              <span className="text-ink-faint ml-2" title="Da confermare">◌</span>
                            )}
                          </div>
                          <div className="text-mono text-xs text-ink-faint sm:hidden mt-1">
                            {r.display}
                          </div>
                        </div>
                        <div className="hidden sm:block text-label text-ink-dim">
                          {r.duration}
                        </div>
                        <span className={`text-label border px-2.5 py-1 ${m.cls} justify-self-end`}>
                          {m.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="blueprint-dark text-paper py-12">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <p className="text-paper/50 text-sm max-w-3xl leading-relaxed">
            <span className="text-viola-bright">Nota.</span> Date ufficiali dal
            calendario {site.name} 2026. L'abbinamento categoria/tipologia delle
            prove contrassegnate ◌ è provvisorio e verrà confermato in occasione
            della riunione sociale di inizio stagione.
          </p>
        </div>
      </section>
    </>
  );
}
