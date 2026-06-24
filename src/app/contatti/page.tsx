import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GiglioMark } from "@/components/GiglioMark";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Dove siamo e come iscriversi: Via di Caciolle 4/L, 50127 Firenze. Email, telefono e iscrizioni MyRCM della A.S.D. Laurenziana Model Team.",
};

const mapsQuery = encodeURIComponent(
  `${site.address.street}, ${site.address.cap} ${site.address.city}`,
);

export default function ContattiPage() {
  return (
    <>
      <PageHero
        kicker="Dove siamo · Come iscriversi"
        title={
          <>
            Vieni a
            <br />
            <span className="text-serif-italic gold-gradient">trovarci</span>
          </>
        }
        intro="La pista è a Firenze, in Via di Caciolle. Per gareggiare ci si iscrive su MyRCM o si chiama: ti diamo tutte le info."
      />

      <section className="blueprint pb-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 grid lg:grid-cols-2 gap-px bg-ink/10 hairline">
          {/* dove */}
          <Reveal>
            <div className="bg-paper p-8 sm:p-10 h-full">
              <div className="text-label text-viola mb-4">Dove</div>
              <address className="not-italic">
                <div className="text-display text-2xl sm:text-3xl leading-tight">
                  {site.address.street}
                </div>
                <div className="text-ink-dim mt-1 text-lg">
                  {site.address.cap} {site.address.city}
                </div>
              </address>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-label bg-ink text-paper px-6 py-4 hover:bg-viola transition-colors"
              >
                Apri nel navigatore →
              </a>
            </div>
          </Reveal>

          {/* contatti */}
          <Reveal delay={0.06}>
            <div className="bg-paper p-8 sm:p-10 h-full">
              <div className="text-label text-viola mb-4">Contatti</div>
              <a
                href={`mailto:${site.contacts.email}`}
                className="text-display text-xl sm:text-2xl break-all hover:text-viola transition-colors"
              >
                {site.contacts.email}
              </a>
              <div className="mt-6 space-y-4">
                {site.contacts.people.map((p) => (
                  <a
                    key={p.phone}
                    href={`tel:${p.phone.replace(/\s/g, "")}`}
                    className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-3 group"
                  >
                    <span>
                      <span className="text-display text-lg group-hover:text-viola transition-colors">
                        {p.name}
                      </span>
                      <span className="block text-label text-ink-faint mt-0.5">
                        {p.role}
                      </span>
                    </span>
                    <span className="text-mono text-ink-dim tabular-nums shrink-0">
                      {p.phone}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* iscrizione / pagamenti */}
      <section className="blueprint-dark text-paper py-24 relative overflow-hidden">
        <GiglioMark className="pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 h-[120%] w-auto text-viola/[0.05]" />
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <div className="text-label text-viola-bright mb-3">Iscrizioni</div>
            <h2 className="text-display text-[clamp(2rem,5vw,3.5rem)] mb-12 max-w-3xl">
              Tre passi per partire
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-paper/10 hairline-dark">
            {[
              {
                t: "Iscriviti",
                d: "Su MyRCM oppure chiamando Fabrizio o Andrea. Chiusura: gare di campionato entro le 23:59 del venerdì precedente, gare libere entro le 9:00 del giorno della gara.",
              },
              {
                t: "Paga",
                d: `Tramite PayPal (canale "amici e familiari") collegato alla mail della pista. Il treno di gomme è compreso nell'iscrizione.`,
              },
              {
                t: "Corri",
                d: "Domenica, qualifiche dalle 9:30. Gomme punzonate alla consegna: un solo treno per tutta la gara.",
              },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 0.08}>
                <div className="bg-asphalt p-8 h-full">
                  <div className="text-display text-5xl text-viola-bright/30">
                    0{i + 1}
                  </div>
                  <h3 className="text-display text-2xl mt-3">{s.t}</h3>
                  <p className="text-paper/60 mt-3 leading-relaxed text-sm">
                    {s.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <a
                href={site.social.myrcm}
                target="_blank"
                rel="noopener noreferrer"
                className="text-label bg-viola text-paper px-7 py-4 hover:bg-viola-bright transition-colors"
              >
                Iscrizione gare su MyRCM →
              </a>
              <a
                href={`mailto:${site.contacts.email}`}
                className="text-label hairline-dark px-7 py-4 hover:bg-paper/10 transition-colors"
              >
                Scrivici una mail
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
