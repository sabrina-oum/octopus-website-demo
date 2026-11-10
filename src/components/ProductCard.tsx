import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/catalog";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-4">
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 640px) 320px, 100vw"
          className="object-contain"
        />
      </div>
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p>{product.shortDescription}</p>
      <Link href={`/products/${product.slug}`} className="underline">
        Learn more
      </Link>
    </article>
  );
}
