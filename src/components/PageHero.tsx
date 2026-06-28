import { GiglioMark } from "./GiglioMark";

export function PageHero({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: React.ReactNode;
  intro?: string;
}) {
  return (
    <section className="blueprint relative pt-32 sm:pt-40 pb-16 sm:pb-20 overflow-hidden">
      <div className="pointer-events-none absolute -right-16 -top-10 h-[70vh] w-auto hidden md:flex items-start">
        <GiglioMark gradient className="h-full w-auto opacity-[0.12]" />
      </div>
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="fade flex items-center gap-3 text-label eyebrow">
          <span className="h-px w-10 bg-[linear-gradient(90deg,currentColor,transparent)]" />
          {kicker}
        </div>
        <h1 className="rise text-serif mt-5 text-[clamp(2.6rem,7.5vw,5.5rem)] leading-[0.98]">
          {title}
        </h1>
        {intro && (
          <p
            className="rise mt-6 max-w-2xl text-lg text-ink-dim leading-relaxed"
            style={{ animationDelay: "0.1s" }}
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
