import type { Metadata } from "next";
import { getBestSellers, getCategorySections, getHomepage } from "@/catalog";
import { BestSellers } from "@/components/BestSellers";
import { CategorySection } from "@/components/CategorySection";
import { Hero } from "@/components/Hero";
import { siteName } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getHomepage();
  const { src, ...image } = seo.image;

  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: "/",
      siteName,
      locale: "en_US",
      title: seo.title,
      description: seo.description,
      images: [{ url: src, ...image }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function HomePage() {
  const [{ hero }, bestSellers, sections] = await Promise.all([
    getHomepage(),
    getBestSellers(),
    getCategorySections(),
  ]);

  return (
    <main>
      <Hero hero={hero} />
      <BestSellers products={bestSellers} cards="large" />
      {sections.map((section) => (
        <CategorySection key={section.category} section={section} />
      ))}
    </main>
  );
}
