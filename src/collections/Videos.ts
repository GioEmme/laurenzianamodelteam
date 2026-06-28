import type { CollectionConfig } from "payload";

/**
 * Video caricati dagli amministratori (.mp4). Tenuti in una collezione separata
 * dalle immagini perché NON devono passare da sharp. Vanno su Vercel Blob come
 * file originali (nessun transcoding/ottimizzazione lato server).
 *
 * Consiglio pratico: caricare clip brevi e già compresse — i video pesano e
 * consumano banda/spazio su Blob.
 */
export const Videos: CollectionConfig = {
  slug: "videos",
  labels: { singular: "Video", plural: "Video" },
  access: {
    read: () => true,
  },
  admin: {
    group: "Contenuti",
    description: "Carica qui i video .mp4. Meglio clip brevi e già compresse.",
  },
  upload: {
    mimeTypes: ["video/*"],
  },
  fields: [
    {
      name: "titolo",
      label: "Titolo / descrizione (opzionale)",
      type: "text",
    },
  ],
};
