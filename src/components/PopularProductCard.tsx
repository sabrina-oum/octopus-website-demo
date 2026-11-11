import Link from "next/link";
import type { Product } from "@/catalog";
import { ResponsiveImage } from "./ResponsiveImage";

type PopularProductCardProps = {
  product: Product;
};

export function PopularProductCard({ product }: PopularProductCardProps) {
  return (
    <article className="group relative flex w-44 flex-col gap-6 tablet:w-66 tablet:gap-8">
      <div className="flex aspect-3/4 items-center justify-center rounded-card bg-card">
        <div className="w-[82.5%]">
          <ResponsiveImage
            src={product.image}
            alt={product.name}
            ratio="1/1"
            sizes={{ mobile: "146px", tablet: "218px" }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 pr-6">
        <h3 className="text-body font-bold tablet:text-title-m">
          <Link
            href={product.href}
            className="group-hover:underline after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-focus"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-body font-book text-text-secondary">
          {product.shortDescription}
        </p>
      </div>
    </article>
  );
}
