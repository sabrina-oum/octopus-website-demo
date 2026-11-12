import type { Metadata } from "next";
import type { Seo } from "@/catalog";
import { siteName } from "./site";

export function pageMetadata(seo: Seo, path: string): Metadata {
  const { src, ...image } = seo.image;

  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName,
      locale: "en_US",
      title: seo.title,
      description: seo.description,
      images: [{ url: src, ...image }],
    },
    twitter: { card: "summary_large_image" },
  };
}
