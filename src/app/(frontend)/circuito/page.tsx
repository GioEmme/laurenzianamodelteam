import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { WebcamFeed } from "@/components/WebcamFeed";
import { site } from "@/lib/site";

const CAM_BASE = "https://www.asdlaurenzianarce.it/wps/test/ipcam";

export const metadata: Metadata = {
  title: "Il circuito",
  description:
    "La pista permanente RC su asfalto della A.S.D. Laurenziana Model Team, a Firenze: tracciati riconfigurabili, cordoli, palco di pilotaggio.",
};

const photos = [
  { src: "/hero/1-hd.jpeg", alt: "La pista permanente di Firenze, vista 1" },
  { src: "/hero/2-hd.jpeg", alt: "La pista permanente di Firenze, vista 2" },
  { src: "/hero/3-hd.jpeg", alt: "La pista permanente di Firenze, vista 3" },
  { src: "/hero/4-hd.jpeg", alt: "La pista permanente di Firenze, vista 4" },
  { src: "/hero/5-hd.jpeg", alt: "La pista permanente di Firenze, vista 5" },
];

export default function CircuitoPage() {
  return (
    <>
      <PageHero
        kicker="Il circuito · Firenze"
        title={
          <>
            Un asfalto,
            <br />
            <span className="text-serif-italic gold-gradient">
              cinque tracciati
            </span>
          </>
        }
        intro="Una superficie d'asfalto all'aperto. Non un tracciato fisso ma uno spazio che cambia disegno a ogni prova: stesso piazzale, percorsi sempre diversi da leggere e interpretare."
      />

      {/* webcam live */}
      <section className="blueprint-dark text-paper py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <div className="text-label eyebrow mb-3">In diretta</div>
            <h2 className="text-display text-[clamp(2rem,5vw,3.5rem)] mb-3">
              La pista, ora
            </h2>
            <p className="text-paper/55 max-w-2xl mb-10">
              Immagini dal vivo dalle webcam del circuito.
            </p>
          </Reveal>
          <Reveal>
            <div className="grid sm:grid-cols-2 gap-px bg-paper/10 hairline-dark">
              <WebcamFeed src={`${CAM_BASE}/ipcam1.jpg`} label="Webcam 1" />
              <WebcamFeed src={`${CAM_BASE}/ipcam2.jpg`} label="Webcam 2" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* galleria a pannelli espandibili */}
      <section className="blueprint pb-24 pt-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <div className="text-label eyebrow mb-3">Galleria</div>
            <h2 className="text-display text-[clamp(2rem,5vw,3.5rem)] mb-10">
              Dal vivo
            </h2>
          </Reveal>

          <Reveal>
            <div className="flex flex-col md:flex-row md:h-[68vh] overflow-hidden hairline">
              {photos.map((p, i) => (
                <div
                  key={p.src}
                  className="group/panel relative w-full aspect-[16/10] md:aspect-auto md:h-full md:w-auto md:flex-1 md:hover:flex-[5] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-cover transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 70vw"
                  />
                  {/* velo scuro sui pannelli chiusi, svanisce in hover */}
                  <div className="absolute inset-0 bg-asphalt/30 transition-opacity duration-700 md:group-hover/panel:opacity-0" />
                  {/* numero tracciato */}
                  <span className="absolute bottom-4 left-4 text-mono text-paper text-sm drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
                    0{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-10 text-ink-dim max-w-2xl">
              Ci trovi in {site.address.street}, {site.address.cap}{" "}
              {site.address.city}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* scheda tecnica */}
      <section className="blueprint-dark text-paper py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <div className="text-label eyebrow mb-3">Scheda tecnica</div>
            <h2 className="text-display text-[clamp(2rem,5vw,3.5rem)] mb-12">
              La pista in numeri
            </h2>
          </Reveal>
          <Reveal>
            <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper/10 hairline-dark">
              {specs.map((s) => (
                <div key={s.k} className="bg-asphalt p-7">
                  <dt className="text-label text-paper/45">{s.k}</dt>
                  <dd className="text-serif text-2xl mt-2">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* storia */}
      <section className="surface-viola text-paper py-24 relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6">
          <Reveal>
            <div className="text-label eyebrow mb-3">Da dove veniamo</div>
            <h2 className="text-serif text-[clamp(2rem,5vw,3.6rem)] max-w-3xl leading-[1.08] mb-4">
              Quasi mezzo secolo di radiocomandi a{" "}
              <span className="text-serif-italic gold-gradient">Firenze</span>.
            </h2>
            <p className="text-paper/60 max-w-2xl mb-14">
              Dai primi piazzali di fine anni Settanta alla pista permanente di
              oggi: una storia di appassionati che non si è mai fermata.
            </p>
          </Reveal>
          <ol className="relative border-l border-paper/15 ml-1">
            {history.map((h, i) => (
              <Reveal key={h.year} delay={(i % 2) * 0.06}>
                <li className="relative pl-8 pb-12 last:pb-0">
                  <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-gold-bright shadow-[0_0_0_4px_rgba(42,17,64,1)]" />
                  <div className="text-mono text-gold-bright text-sm">
                    {h.year}
                  </div>
                  <p className="text-paper/80 mt-2 max-w-2xl leading-relaxed">
                    {h.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

const specs = [
  { k: "Superficie", v: "Asfalto a grana fine" },
  { k: "Tracciati", v: "5 · orario e antiorario" },
  { k: "Sviluppo", v: "~180 m" },
  { k: "Rettilineo principale", v: "40 m" },
  { k: "Dimensioni", v: "41 × 20 m" },
  { k: "Alimentazione", v: "Solo elettrico" },
];

const history = [
  {
    year: "Fine anni '70",
    text: "Arrivano i radiocomandi a due canali. Un gruppo di appassionati comincia a correre con le automodelli nei piazzali di Firenze.",
  },
  {
    year: "1979",
    text: "Luciano Rocchi organizza le prime gare serali: nasce la sezione modellismo della polisportiva PO.LI.RI. — Poggetto, Lippi, Rifredi.",
  },
  {
    year: "Anni '90",
    text: "Il club gestisce più piste off-road e ospita gare valide per il campionato italiano.",
  },
  {
    year: "Primi anni 2000",
    text: "Il PO.LI.RI. confluisce con gli ASSI nella A.S.D. Laurenziana e si dota di un impianto permanente.",
  },
  {
    year: "2005",
    text: "La pista viene ampliata fino alle dimensioni attuali.",
  },
  {
    year: "2014",
    text: "Riasfaltatura completa, cronometraggio elettronico e nuova illuminazione per le gare serali.",
  },
];
