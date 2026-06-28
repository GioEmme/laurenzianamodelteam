import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

// host del dominio pubblico R2 (r2.dev o dominio custom), se configurato
let r2Host: string | undefined;
try {
  if (process.env.R2_PUBLIC_URL) {
    r2Host = new URL(process.env.R2_PUBLIC_URL).hostname;
  }
} catch {
  r2Host = undefined;
}

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // URL pubblici di sviluppo di R2 (pub-xxxx.r2.dev)
      { protocol: "https", hostname: "*.r2.dev" },
      // dominio pubblico/custom di R2 indicato in R2_PUBLIC_URL
      ...(r2Host ? [{ protocol: "https" as const, hostname: r2Host }] : []),
    ],
  },
};

export default withPayload(nextConfig);
