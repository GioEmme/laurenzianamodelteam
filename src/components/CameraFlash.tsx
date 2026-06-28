import { cn } from "@/lib/cn";

/**
 * Icona macchina fotografica (voce "Gallery" in nav) con flash abbagliante
 * periodico. Usa currentColor → si adatta al colore del testo della topbar.
 */
export function CameraFlash({ className }: { className?: string }) {
  return (
    <span className="relative inline-flex" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("camera-flash-pop", className ?? "h-5 w-5")}
      >
        <path d="M4 9a2 2 0 0 1 2-2h1.6l1-1.5h6.8l1 1.5H18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
      {/* lampo */}
      <span className="camera-flash-burst pointer-events-none absolute inset-0 rounded-full" />
    </span>
  );
}
