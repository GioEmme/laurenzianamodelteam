import { TRACK_VIEWBOX, type Track } from "@/lib/tracks";

// Render statico, compatto, di un tracciato (nessuna animazione gsap).
export function TrackMini({ track }: { track: Track }) {
  return (
    <svg
      viewBox={TRACK_VIEWBOX}
      className="w-full h-auto block"
      role="img"
      aria-label={`Tracciato ${track.index} — ${track.name}`}
    >
      <path
        d={track.d}
        fill="none"
        stroke="var(--color-track)"
        strokeWidth={48}
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={0.85}
      />
      <path
        d={track.d}
        fill="none"
        stroke="#23262c"
        strokeWidth={40}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d={track.d}
        fill="none"
        stroke="var(--color-gold-bright)"
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.95}
      />
    </svg>
  );
}
