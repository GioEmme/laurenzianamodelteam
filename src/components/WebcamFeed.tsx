"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Webcam "live": ricarica lo snapshot JPEG remoto ogni `intervalMs` senza
 * reload della pagina. Double-buffering: il frame nuovo viene precaricato in
 * memoria e mostrato solo a download completato → niente sfarfallio / riquadri
 * a metà. Cache-bust via querystring sul timestamp.
 */
export function WebcamFeed({
  src,
  label,
  intervalMs = 5000,
}: {
  src: string;
  label: string;
  intervalMs?: number;
}) {
  const [current, setCurrent] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const tick = useRef(0);

  useEffect(() => {
    let alive = true;

    const load = () => {
      const next = `${src}${src.includes("?") ? "&" : "?"}t=${Date.now()}`;
      const img = new Image();
      img.onload = () => {
        if (!alive) return;
        tick.current += 1;
        setCurrent(next);
        setFailed(false);
      };
      img.onerror = () => {
        if (!alive) return;
        // tieni l'ultimo frame valido; segnala errore solo se non ne hai mai
        // ricevuto uno.
        setFailed((prev) => (current === null ? true : prev));
      };
      img.src = next;
    };

    load();
    const id = setInterval(load, intervalMs);
    return () => {
      alive = false;
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, intervalMs]);

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-asphalt hairline-dark">
      {current ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={current}
          alt={label}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-paper/40 text-label">
          {failed ? "Segnale non disponibile" : "Connessione…"}
        </div>
      )}

      {/* etichetta + indicatore LIVE */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          {!failed && current && (
            <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-kerb" />
          )}
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${
              !failed && current ? "bg-kerb" : "bg-paper/40"
            }`}
          />
        </span>
        <span className="text-label text-paper drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
          {label}
        </span>
      </div>
    </div>
  );
}
