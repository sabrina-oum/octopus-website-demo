import type { Metadata } from "next";
import { getBestSellers, getHomepage, getProductsWithPage } from "@/catalog";
import { BestSellers } from "@/components/BestSellers";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
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
  const [{ hero }, bestSellers, products] = await Promise.all([
    getHomepage(),
    getBestSellers(),
    getProductsWithPage(),
  ]);

  return (
    <main>
      <Hero hero={hero} />
      <BestSellers products={bestSellers} cards="large" />
      <div className="page-container py-10">
        <ul className="flex flex-col gap-4 tablet:flex-row">
          {products.map((product) => (
            <li key={product.id} className="tablet:w-1/3">
              <ProductCard product={product} titleAs="h2" />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
