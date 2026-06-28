import { getPayload, type Payload } from "payload";
import config from "@payload-config";

/**
 * Istanza Payload condivisa per leggere i contenuti dai Server Component
 * (Local API: niente HTTP, accesso diretto al database).
 */
let cached: Promise<Payload> | null = null;

export function getPayloadClient(): Promise<Payload> {
  if (!cached) cached = getPayload({ config });
  return cached;
}
