"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { GalleryMedia } from "@/lib/gallery";

/**
 * Overlay a tutto schermo per foto/video. Controllato dal genitore tramite
 * `index` (null = chiuso). Gestisce tastiera (Esc / ← →) e blocco scroll.
 */
export function Lightbox({
  media,
  index,
  onClose,
  onNavigate,
}: {
  media: GalleryMedia[];
  index: number | null;
  onClose: () => void;
  onNavigate: (dir: number) => void;
}) {
  const open = index !== null;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNavigate(1);
      else if (e.key === "ArrowLeft") onNavigate(-1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.add("lenis-stopped");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [open, onClose, onNavigate]);

  if (index === null || !mounted) return null;
  const current = media[index];
  if (!current) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-black/92 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-3 text-paper/70">
        <span className="text-label">
          {index + 1} / {media.length}
        </span>
        <button
          onClick={onClose}
          className="grid h-10 w-10 place-items-center rounded-full hover:bg-paper/10"
          aria-label="Chiudi"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-paper" fill="none" strokeWidth={2}>
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        {media.length > 1 && (
          <button
            onClick={() => onNavigate(-1)}
            className="absolute left-2 sm:left-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-paper/10 text-paper hover:bg-paper/20"
            aria-label="Precedente"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-paper" fill="none" strokeWidth={2}>
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        <div className="relative h-full w-full max-w-5xl">
          {current.type === "image" ? (
            <Image
              src={current.url}
              alt={current.alt || current.caption || ""}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          ) : (
            <video
              key={current.id}
              src={current.url}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-contain"
            />
          )}
        </div>

        {media.length > 1 && (
          <button
            onClick={() => onNavigate(1)}
            className="absolute right-2 sm:right-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-paper/10 text-paper hover:bg-paper/20"
            aria-label="Successivo"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-paper" fill="none" strokeWidth={2}>
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {current.caption && (
        <p className="px-4 pb-5 text-center text-sm text-paper/75">{current.caption}</p>
      )}
    </div>,
    document.body,
  );
}
