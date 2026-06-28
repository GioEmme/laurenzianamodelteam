"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import type { GalleryMedia } from "@/lib/gallery";
import { Lightbox } from "./Lightbox";

/**
 * Anteprima di UNA sezione in landing: 6 celle.
 * - se ci sono più di 6 contenuti: le prime 5 si aprono in lightbox QUI,
 *   la 6ª mostra "+N" e porta alla sezione su /gallery (deep link #id);
 * - se i contenuti sono ≤ 6: si aprono tutti in lightbox, nessun "+".
 */
export function LandingGalleryGrid({
  media,
  sectionId,
}: {
  media: GalleryMedia[];
  sectionId: string;
}) {
  const visible = media.slice(0, 6);
  const extra = media.length - 6;
  const lastIsLink = extra > 0;
  // i contenuti che si espandono in lightbox sulla landing
  const expandable = lastIsLink ? visible.slice(0, 5) : visible;

  const [index, setIndex] = useState<number | null>(null);
  const go = useCallback(
    (dir: number) =>
      setIndex((i) =>
        i === null ? i : (i + dir + expandable.length) % expandable.length,
      ),
    [expandable.length],
  );

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2">
        {visible.map((m, i) => {
          const isLinkCell = lastIsLink && i === 5;

          if (isLinkCell) {
            return (
              <Link
                key={m.id}
                href={`/gallery#${sectionId}`}
                className="group relative aspect-square overflow-hidden bg-asphalt ring-1 ring-paper/5"
                aria-label="Vedi tutta la raccolta"
              >
                {m.type === "image" ? (
                  <Image
                    src={m.thumbnailUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                ) : (
                  <video
                    src={m.url}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                )}
                <span className="absolute inset-0 grid place-content-center justify-items-center bg-black/65 text-paper backdrop-blur-[1px] transition-colors group-hover:bg-black/55">
                  <span className="text-2xl font-semibold leading-none">+{extra}</span>
                  <span className="text-label mt-1.5 text-paper/80">Vedi tutto</span>
                </span>
              </Link>
            );
          }

          return (
            <button
              key={m.id}
              onClick={() => setIndex(i)}
              className="group relative aspect-square overflow-hidden bg-asphalt outline-none ring-1 ring-paper/5"
              aria-label={m.type === "video" ? "Apri video" : "Apri foto"}
            >
              {m.type === "image" ? (
                <Image
                  src={m.thumbnailUrl}
                  alt={m.alt || ""}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              ) : (
                <>
                  <video
                    src={m.url}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                  <span className="pointer-events-none absolute inset-0 grid place-items-center bg-black/20">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-black/55 ring-1 ring-paper/40">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-[1px] fill-paper">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>

      <Lightbox
        media={expandable}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={go}
      />
    </>
  );
}
