import type { CollectionConfig } from "payload";

/**
 * Foto e immagini caricate dagli amministratori. I file NON stanno sul disco
 * (Vercel ha filesystem effimero): vengono salvati su Vercel Blob, vedi il
 * plugin in payload.config.ts. Lettura pubblica così le immagini sono visibili
 * sul sito.
 *
 * OTTIMIZZAZIONE (via sharp, prima del salvataggio su Blob):
 * - l'originale viene rimpicciolito a max 2400px di lato e convertito in WebP;
 * - vengono generate due varianti responsive (thumb per la griglia, medium per
 *   la lightbox). Così l'utente carica anche un file enorme e il sito resta veloce.
 */
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Foto / Immagine", plural: "Foto / Immagini" },
  access: {
    read: () => true,
  },
  admin: {
    group: "Contenuti",
    description: "Carica qui le foto. Compila sempre il testo alternativo.",
  },
  upload: {
    mimeTypes: ["image/*"],
    // converte l'originale in WebP compresso
    formatOptions: { format: "webp", options: { quality: 80 } },
    // cap dimensioni dell'originale (non ingrandisce mai)
    resizeOptions: {
      width: 2400,
      height: 2400,
      fit: "inside",
      withoutEnlargement: true,
    },
    imageSizes: [
      {
        name: "thumb",
        width: 600,
        height: 600,
        fit: "inside",
        withoutEnlargement: true,
        formatOptions: { format: "webp", options: { quality: 70 } },
      },
      {
        name: "medium",
        width: 1400,
        fit: "inside",
        withoutEnlargement: true,
        formatOptions: { format: "webp", options: { quality: 78 } },
      },
    ],
  },
  fields: [
    {
      name: "alt",
      label: "Testo alternativo (descrizione per accessibilità e SEO)",
      type: "text",
      admin: {
        description: "Facoltativo, ma utile per accessibilità e Google.",
      },
    },
  ],
};
