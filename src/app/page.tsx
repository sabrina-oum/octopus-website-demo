import type { Metadata } from "next";
import {
  getBestSellers,
  getCategorySections,
  getExploreCategories,
  getHomepage,
} from "@/catalog";
import { BestSellers } from "@/components/BestSellers";
import { CategorySection } from "@/components/CategorySection";
import { ExploreCategories } from "@/components/ExploreCategories";
import { FindUsBanner } from "@/components/FindUsBanner";
import { Hero } from "@/components/Hero";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getHomepage();

  return pageMetadata(seo, "/");
}

export default async function HomePage() {
  const [{ hero, findUs }, bestSellers, sections, exploreCategories] =
    await Promise.all([
      getHomepage(),
      getBestSellers(),
      getCategorySections(),
      getExploreCategories(),
    ]);

  return (
    <main>
      <Hero hero={hero} />
      <BestSellers products={bestSellers} cards="large" />
      {sections.map((section) => (
        <CategorySection key={section.category.id} section={section} />
      ))}
      <ExploreCategories content={exploreCategories} />
      <FindUsBanner content={findUs} />
    </main>
  );
}
