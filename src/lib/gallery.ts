import { getPayloadClient } from "./payload";

export type GalleryMedia = {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnailUrl: string;
  width?: number;
  height?: number;
  alt?: string;
  caption?: string;
  mimeType?: string;
};

export type GallerySection = {
  id: string;
  title: string;
  date: string;
  description?: string;
  media: GalleryMedia[];
};

function mapSection(doc: Record<string, unknown>): GallerySection {
  const media: GalleryMedia[] = [];

  // foto (campo upload hasMany → array di documenti media già popolati)
  const fotos = (doc.foto as Record<string, unknown>[] | undefined) ?? [];
  fotos.forEach((img, i) => {
    if (!img?.url) return;
    const sizes = img.sizes as Record<string, { url?: string }> | undefined;
    const alt = (img.alt as string) || undefined;
    media.push({
      id: `${doc.id}-img-${i}`,
      type: "image",
      url: (sizes?.medium?.url as string) || (img.url as string),
      thumbnailUrl: (sizes?.thumb?.url as string) || (img.url as string),
      width: img.width as number | undefined,
      height: img.height as number | undefined,
      alt,
      caption: alt,
    });
  });

  // video (dopo le foto)
  const videos = (doc.video as Record<string, unknown>[] | undefined) ?? [];
  videos.forEach((v, i) => {
    if (!v?.url) return;
    media.push({
      id: `${doc.id}-vid-${i}`,
      type: "video",
      url: v.url as string,
      thumbnailUrl: v.url as string,
      mimeType: v.mimeType as string | undefined,
      caption: (v.titolo as string) || undefined,
    });
  });

  return {
    id: String(doc.id),
    title: doc.titolo as string,
    date: doc.data as string,
    description: (doc.descrizione as string) || undefined,
    media,
  };
}

/** Sezioni della gallery, dalle più recenti (per data) alle più vecchie. */
export async function getGallerySections(limit = 100): Promise<GallerySection[]> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "gallery-sections" as never,
    sort: "-data",
    depth: 2,
    limit,
  });
  return (res.docs as Record<string, unknown>[]).map(mapSection);
}

/** Solo l'ultima sezione caricata (per la landing). */
export async function getLatestGallerySection(): Promise<GallerySection | null> {
  const sections = await getGallerySections(1);
  return sections[0] ?? null;
}
