import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { it } from "@payloadcms/translations/languages/it";
import { en } from "@payloadcms/translations/languages/en";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Videos } from "./collections/Videos";
import { GallerySections } from "./collections/GallerySections";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Cloudflare R2 (storage media). URL pubblico serve i file direttamente da R2
// (egress gratis): è il dominio pubblico del bucket (r2.dev o dominio custom).
const r2PublicBase = (process.env.R2_PUBLIC_URL || "").replace(/\/$/, "");
const r2Enabled = Boolean(
  process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    process.env.R2_BUCKET &&
    process.env.R2_ENDPOINT &&
    r2PublicBase,
);

const r2FileURL = ({
  filename: name,
  prefix,
}: {
  filename: string;
  prefix?: string;
}) => `${r2PublicBase}/${prefix ? `${prefix}/` : ""}${name}`;

export default buildConfig({
  // pannello in italiano per i volontari
  i18n: {
    supportedLanguages: { it, en },
    fallbackLanguage: "it",
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: "· Laurenziana Model Team",
    },
  },
  collections: [Users, Media, Videos, GallerySections],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    // In locale, finché non sono configurate le credenziali R2, i media restano
    // su disco così puoi già provare il pannello. Quando R2 è configurato (anche
    // in locale) gli upload vanno su Cloudflare R2 e sono serviti dal suo dominio
    // pubblico (banda gratis).
    ...(r2Enabled
      ? [
          s3Storage({
            // upload diretti browser → R2: aggira il limite di 4,5 MB di Vercel
            // (necessario per foto grandi e video). L'ottimizzazione immagini in
            // consegna la fa next/image.
            clientUploads: true,
            collections: {
              media: {
                disableLocalStorage: true,
                prefix: "media",
                generateFileURL: r2FileURL,
              },
              videos: {
                disableLocalStorage: true,
                prefix: "videos",
                generateFileURL: r2FileURL,
              },
            },
            bucket: process.env.R2_BUCKET || "",
            config: {
              endpoint: `https://${process.env.R2_ENDPOINT}`,
              region: "auto",
              forcePathStyle: true,
              credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
              },
            },
          }),
        ]
      : []),
  ],
});
