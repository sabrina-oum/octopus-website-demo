import type { Product } from "@/catalog";
import { ButtonLink } from "./Button";
import { ResponsiveImage } from "./ResponsiveImage";

type ProductCardProps = {
  product: Product;
  titleAs?: "h2" | "h3";
};

export function ProductCard({ product, titleAs: Title = "h3" }: ProductCardProps) {
  return (
    <article className="flex h-full flex-col gap-6 rounded-card bg-card px-6 pt-10 text-center tablet:gap-2 tablet:pt-2 tablet:pb-6 tablet:text-left desktop:gap-0 desktop:px-10 desktop:pt-0 desktop:pb-10">
      <div className="relative z-10 flex flex-col items-center gap-6 tablet:items-start desktop:-mt-8 desktop:gap-8">
        <div className="flex flex-col gap-4">
          <Title className="text-title-l font-bold tablet:text-title-m desktop:text-title-l">
            {product.name}
          </Title>
          <p className="text-body font-book text-text-secondary desktop:text-title-m">
            {product.shortDescription}
          </p>
        </div>
        <ButtonLink href={`/products/${product.slug}`}>Learn more</ButtonLink>
      </div>
      <ResponsiveImage
        src={product.image}
        alt={product.name}
        ratio="1/1"
        sizes={{ mobile: "100vw", tablet: "33vw", desktop: "400px" }}
        className="tablet:order-first desktop:-mx-4 desktop:w-auto"
      />
    </article>
  );
}
