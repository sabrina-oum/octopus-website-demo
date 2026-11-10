import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/catalog";
import { ResponsiveImage } from "@/components/ResponsiveImage";

export const dynamicParams = false;

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map(({ slug }) => ({ slug }));
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="page-container flex flex-col gap-4 py-10">
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
    </main>
  );
}
