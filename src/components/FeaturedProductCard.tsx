import { categoryLabels, type Product } from "@/catalog";
import { ButtonLink } from "./Button";
import { ResponsiveImage } from "./ResponsiveImage";

type FeaturedProductCardProps = {
  product: Product;
};

export function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  return (
    <article className="relative flex h-128 w-80 max-w-[calc(100vw-3rem)] flex-col items-center gap-6 overflow-hidden rounded-card bg-card px-6 pt-8 text-center tablet:h-103.25 tablet:w-172 tablet:max-w-none tablet:flex-row tablet:pt-0 tablet:pl-16 tablet:text-left desktop:h-147.25 desktop:w-262 desktop:pl-20">
      <div className="relative z-10 flex flex-col items-center gap-8 tablet:w-75 tablet:items-start desktop:w-112.5">
        <div className="flex flex-col gap-4">
          <p className="text-body-l font-book text-accent">
            {categoryLabels[product.category]}
          </p>
          <h3 className="heading-3">{product.name}</h3>
          <p className="text-body font-book text-text-secondary tablet:text-title-m">
            {product.shortDescription}
          </p>
        </div>
        <ButtonLink href={product.href}>Learn more</ButtonLink>
      </div>
      <div className="-mx-6 min-h-0 flex-1 self-stretch tablet:absolute tablet:inset-y-0 tablet:left-80.25 tablet:mx-0 tablet:w-103.25 desktop:left-131.75 desktop:w-124">
        <ResponsiveImage
          src={product.image}
          alt={product.name}
          sizes={{ mobile: "320px", tablet: "413px", desktop: "496px" }}
          className="h-full"
        />
      </div>
    </article>
  );
}
