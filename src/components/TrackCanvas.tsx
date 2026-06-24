"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { tracks, TRACK_VIEWBOX } from "@/lib/tracks";
import { cn } from "@/lib/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

export function TrackCanvas({
  className,
  showHud = true,
}: {
  className?: string;
  showHud?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [lap, setLap] = useState(1);
  const carRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const track = tracks[active];

  // Drive the car around the active track with GSAP MotionPath.
  useEffect(() => {
    const car = carRef.current;
    const path = pathRef.current;
    if (!car || !path) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(car, { opacity: 1 });
      return;
    }

    setLap(1);
    const tween = gsap.to(car, {
      duration: 7,
      repeat: -1,
      ease: "none",
      motionPath: {
        path,
        align: path,
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
      onRepeat: () => setLap((l) => (l % 99) + 1),
    });

    return () => {
      tween.kill();
    };
  }, [active]);

  const next = () => setActive((i) => (i + 1) % tracks.length);
  const prev = () => setActive((i) => (i - 1 + tracks.length) % tracks.length);

  return (
    <div className={cn(className)}>
      <div className="relative">
      <svg
        viewBox={TRACK_VIEWBOX}
        className="w-full h-auto block overflow-visible"
        role="img"
        aria-label={`Tracciato ${track.index} — ${track.name}`}
      >
        {/* asfalto: cordolo blu esterno + nastro grigio */}
        <path
          d={track.d}
          fill="none"
          stroke="var(--color-track)"
          strokeWidth={52}
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity={0.9}
        />
        <path
          d={track.d}
          fill="none"
          stroke="#23262c"
          strokeWidth={44}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* mezzeria tratteggiata */}
        <path
          d={track.d}
          fill="none"
          stroke="rgba(236,235,228,0.32)"
          strokeWidth={2}
          strokeDasharray="2 16"
          strokeLinecap="round"
        />

        {/* racing line animata (si ridisegna a ogni cambio tracciato) */}
        <path
          key={track.id}
          d={track.d}
          fill="none"
          stroke="var(--color-gold-bright)"
          strokeWidth={3.5}
          strokeLinecap="round"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1,
            animation: "line-draw 2.4s var(--ease-out-expo) forwards",
            filter: "drop-shadow(0 0 7px rgba(227,195,114,0.8))",
          }}
        />

        {/* motion path (invisibile) per la macchina */}
        <path ref={pathRef} d={track.d} fill="none" stroke="none" />

        {/* la macchina */}
        <g ref={carRef} style={{ opacity: 0.95 }}>
          <circle r={11} fill="var(--color-kerb)" />
          <circle r={11} fill="none" stroke="#fff" strokeWidth={2} opacity={0.85} />
          <rect x={-3} y={-1.6} width={6} height={3.2} fill="#fff" />
        </g>
      </svg>

      {/* HUD telemetria */}
      {showHud && (
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-1 sm:p-2">
          <div className="flex items-start justify-between">
            <div className="text-label text-ink-dim">
              Circuito riconfigurabile
            </div>
            <div className="text-label text-viola tabular-nums">
              Giro {String(lap).padStart(2, "0")}
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="leading-none">
              <div className="text-mono text-[2.6rem] sm:text-[3.4rem] font-bold tabular-nums text-ink leading-none">
                {track.index}
              </div>
              <div className="text-label text-ink-dim mt-1">
                {track.character} · {track.corners} curve
              </div>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* controlli + nome */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-label text-viola">Tracciato {track.index}</div>
          <h3 className="text-display text-2xl sm:text-3xl truncate">
            {track.name}
          </h3>
          <p className="text-ink-dim text-sm mt-1 max-w-md">{track.note}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <TrackBtn onClick={prev} label="Tracciato precedente">
            ◀
          </TrackBtn>
          <span className="text-mono text-sm text-ink-dim tabular-nums w-12 text-center">
            {track.index}/{String(tracks.length).padStart(2, "0")}
          </span>
          <TrackBtn onClick={next} label="Tracciato successivo">
            ▶
          </TrackBtn>
        </div>
      </div>

      {/* dots */}
      <div className="mt-4 flex gap-1.5">
        {tracks.map((t, i) => (
          <button
            key={t.id}
            aria-label={`Vai al tracciato ${t.index}`}
            onClick={() => setActive(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === active ? "w-8 bg-viola" : "w-1.5 bg-ink/20 hover:bg-ink/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function TrackBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="h-10 w-10 grid place-items-center hairline text-ink hover:bg-viola hover:text-paper hover:border-viola transition-colors text-xs"
    >
      {children}
    </button>
  );
}
