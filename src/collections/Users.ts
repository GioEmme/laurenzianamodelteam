import type { CollectionConfig } from "payload";

/**
 * Amministratori del sito. Sono gli unici utenti con accesso al pannello /admin
 * (login email + password). Possono creare altri amministratori dal pannello.
 */
export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Amministratore", plural: "Amministratori" },
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "Sistema",
    description: "Le persone che possono accedere al pannello e modificare i contenuti.",
  },
  fields: [
    {
      name: "name",
      label: "Nome",
      type: "text",
    },
  ],
};
