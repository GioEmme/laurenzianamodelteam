import Link from "next/link";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { SlideMagazine } from "@/components/SlideMagazine";
import { GiglioMark } from "@/components/GiglioMark";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden text-paper flex flex-col justify-center pt-20 pb-36">
      <HeroSlideshow />

      {/* giglio filigrana */}
      <GiglioMark
        gradient
        className="pointer-events-none absolute right-[4%] top-1/2 -translate-y-1/2 h-[70vh] w-auto opacity-[0.12] hidden lg:block"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <div className="fade flex items-center gap-3 text-label text-gold-bright">
          <span className="h-px w-10 bg-[linear-gradient(90deg,var(--color-gold-bright),transparent)]" />
          {site.section} · Firenze
        </div>

        <h1 className="text-serif mt-6 w-fit max-w-[16ch] text-[clamp(2.2rem,5vw,4.75rem)] drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <span className="block rise" style={{ animationDelay: "0.08s" }}>
            A.S.D. Laurenziana
          </span>
          <span
            aria-hidden="true"
            className="rise tricolore-rule block my-3 sm:my-4 w-full rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.45)]"
            style={{ animationDelay: "0.13s", height: "2px" }}
          />
          <span
            className="rise block text-serif-italic gold-gradient"
            style={{ animationDelay: "0.18s" }}
          >
            Model Team Firenze
          </span>
        </h1>

        <p
          className="rise mt-7 max-w-xl text-lg sm:text-xl text-paper/85 leading-relaxed"
          style={{ animationDelay: "0.34s" }}
        >
          Pista per automodellismo radiocomandato su asfalto, all'aperto, a
          Firenze. Un circuito che{" "}
          <span className="text-paper font-medium">cambia forma</span> a ogni
          gara.
        </p>

        <div
          className="rise mt-9 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "0.44s" }}
        >
          <Link
            href="/circuito"
            className="text-label bg-viola text-paper px-6 py-4 hover:bg-viola-bright transition-colors"
          >
            Esplora il circuito →
          </Link>
          <Link
            href="/calendario"
            className="text-label border border-gold-bright/50 text-gold-bright px-6 py-4 hover:bg-gold-bright/10 transition-colors backdrop-blur-sm"
          >
            Calendario 2026
          </Link>
        </div>

        <dl
          className="rise mt-12 flex flex-wrap gap-x-10 gap-y-4"
          style={{ animationDelay: "0.54s" }}
        >
          {[
            { k: "Tracciati", v: "5" },
            { k: "Categorie", v: "5" },
            { k: "Prove sociali", v: "5+" },
          ].map((s) => (
            <div key={s.k} className="flex items-baseline gap-2.5">
              <dd className="text-serif text-3xl gold-gradient tabular-nums">
                {s.v}
              </dd>
              <dt className="text-label text-paper/60">{s.k}</dt>
            </div>
          ))}
        </dl>
      </div>

      <SlideMagazine />
    </section>
  );
}
