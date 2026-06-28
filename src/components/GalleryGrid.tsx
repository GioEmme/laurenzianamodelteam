"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { GalleryMedia } from "@/lib/gallery";
import { Lightbox } from "./Lightbox";

export function GalleryGrid({ media }: { media: GalleryMedia[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const go = useCallback(
    (dir: number) =>
      setIndex((i) => (i === null ? i : (i + dir + media.length) % media.length)),
    [media.length],
  );

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-2">
        {media.map((m, i) => (
          <button
            key={m.id}
            onClick={() => setIndex(i)}
            className="group/cell relative aspect-square overflow-hidden bg-asphalt outline-none ring-1 ring-paper/5"
            aria-label={m.type === "video" ? "Apri video" : "Apri foto"}
          >
            {m.type === "image" ? (
              <Image
                src={m.thumbnailUrl}
                alt={m.alt || m.caption || ""}
                fill
                className="object-cover transition-transform duration-500 group-hover/cell:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <>
                <video
                  src={m.url}
                  preload="metadata"
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
                <span className="pointer-events-none absolute inset-0 grid place-items-center bg-black/20 transition-colors group-hover/cell:bg-black/10">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-black/55 ring-1 ring-paper/40 backdrop-blur-sm">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-[1px] fill-paper">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </>
            )}
            {m.caption && (
              <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5 text-left text-[0.7rem] text-paper/90">
                {m.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      <Lightbox
        media={media}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={go}
      />
    </>
  );
}
