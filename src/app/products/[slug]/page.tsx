import { notFound } from "next/navigation";
import {
  getBestSellers,
  getProductBySlug,
  getProductsWithPage,
} from "@/catalog";
import { BestSellers } from "@/components/BestSellers";
import { ResponsiveImage } from "@/components/ResponsiveImage";

export const dynamicParams = false;

export async function generateStaticParams() {
  const products = await getProductsWithPage();

  return products.map(({ slug }) => ({ slug }));
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const [product, bestSellers] = await Promise.all([
    getProductBySlug(slug),
    getBestSellers(),
  ]);

  if (!product?.hasPage) {
    notFound();
  }

  return (
    <main>
      <div className="page-container flex flex-col gap-4 py-10">
        <h1 className="heading-1">{product.name}</h1>
        <p className="subtitle text-text-secondary">
          {product.shortDescription}
        </p>
        <ResponsiveImage
          src={product.image}
          alt={product.name}
          ratio="1/1"
          sizes={{ mobile: "100vw", tablet: "50vw" }}
          preload
          className="tablet:w-1/2"
        />
      </div>
      <BestSellers products={bestSellers} cards="small" />
    </main>
  );
}
