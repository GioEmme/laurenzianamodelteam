import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GalleryGrid } from "@/components/GalleryGrid";
import { getGallerySections } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Foto e video delle gare e delle giornate in pista della A.S.D. Laurenziana Model Team, a Firenze.",
};

function formatData(iso: string) {
  return new Date(iso).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function GalleryPage() {
  const sections = await getGallerySections();

  return (
    <>
      <PageHero
        kicker="Gallery"
        title={
          <>
            In pista,
            <br />
            <span className="text-serif-italic gold-gradient">fotogramma per fotogramma</span>
          </>
        }
        intro="Foto e video delle gare, dei trofei e delle giornate sul nostro asfalto."
      />

      <section className="blueprint pb-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          {sections.length === 0 ? (
            <p className="text-ink-dim max-w-xl">
              Ancora nessuna raccolta pubblicata. Torna presto: dopo le prossime
              gare troverai qui foto e video.
            </p>
          ) : (
            <div className="space-y-20">
              {sections.map((s) => (
                <Reveal key={s.id}>
                  <article id={s.id} className="scroll-mt-28">
                    <header className="mb-6">
                      <div className="text-label eyebrow">{formatData(s.date)}</div>
                      <h2 className="text-display text-3xl sm:text-4xl mt-2">
                        {s.title}
                      </h2>
                      {s.description && (
                        <p className="text-ink-dim mt-3 max-w-2xl leading-relaxed">
                          {s.description}
                        </p>
                      )}
                    </header>
                    <GalleryGrid media={s.media} />
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
