import type { Metadata } from "next";
import { getHomepage, getProducts } from "@/catalog";
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
  const [{ hero }, products] = await Promise.all([
    getHomepage(),
    getProducts(),
  ]);

  return (
    <main>
      <Hero hero={hero} />
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
