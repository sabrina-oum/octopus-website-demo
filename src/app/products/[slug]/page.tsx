import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/catalog";

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
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p>{product.shortDescription}</p>
      <div className="relative aspect-square max-w-md">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="448px"
          className="object-contain"
        />
      </div>
    </main>
  );
}
