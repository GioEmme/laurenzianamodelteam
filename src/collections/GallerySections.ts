import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

/**
 * Sezioni della Gallery. Ogni sezione raggruppa foto e video sotto un titolo
 * scelto dall'utente (es. "Gara sociale del 15 giugno") con una data.
 * In gallery le sezioni più recenti (per "data") vanno sempre in cima.
 *
 * Aggiornamento istantaneo: a ogni salvataggio/eliminazione rigeneriamo le
 * pagine che mostrano la gallery (/gallery e la home), così le modifiche dal
 * pannello compaiono subito sul sito (stile WordPress).
 */
const revalidateGallery = () => {
  try {
    revalidatePath("/gallery");
    revalidatePath("/");
  } catch {
    // fuori dal contesto di una richiesta (es. seed/CLI): si ignora
  }
};

export const GallerySections: CollectionConfig = {
  slug: "gallery-sections",
  labels: { singular: "Sezione Gallery", plural: "Gallery (sezioni)" },
  access: {
    read: () => true,
  },
  admin: {
    group: "Contenuti",
    useAsTitle: "titolo",
    defaultColumns: ["titolo", "data"],
    description:
      "Ogni sezione è un gruppo di foto/video con un titolo e una data. Le più recenti compaiono per prime sul sito.",
  },
  defaultSort: "-data",
  hooks: {
    afterChange: [revalidateGallery],
    afterDelete: [revalidateGallery],
  },
  fields: [
    {
      name: "titolo",
      label: "Titolo della sezione",
      type: "text",
      required: true,
    },
    {
      name: "data",
      label: "Data",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        date: { pickerAppearance: "dayOnly", displayFormat: "dd/MM/yyyy" },
        description: "Decide l'ordine: le sezioni più recenti vanno in cima.",
      },
    },
    {
      name: "descrizione",
      label: "Descrizione (opzionale)",
      type: "textarea",
    },
    {
      name: "foto",
      label: "Foto",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      admin: {
        description:
          "Trascina qui tutte le foto in una volta: si caricano e ottimizzano da sole. Trascina per riordinarle.",
      },
    },
    {
      name: "video",
      label: "Video (opzionale)",
      type: "upload",
      relationTo: "videos",
      hasMany: true,
      admin: {
        description: "Aggiungi uno o più video .mp4 (facoltativo).",
      },
    },
  ],
};
