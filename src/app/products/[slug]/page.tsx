import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getBestSellers,
  getProduct,
  getProductSeo,
  getProductSlugs,
} from "@/catalog";
import { BestSellers } from "@/components/BestSellers";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductHero } from "@/components/ProductHero";
import { WhereToBuyBar } from "@/components/WhereToBuyBar";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getProductSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return pageMetadata(await getProductSeo(product), product.href);
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const [product, bestSellers] = await Promise.all([
    getProduct(slug),
    getBestSellers(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <ProductHero product={product}>
        {product.gallery && <ProductGallery blocks={product.gallery} />}
      </ProductHero>
      <BestSellers products={bestSellers} cards="small" />
      <WhereToBuyBar />
    </main>
  );
}
