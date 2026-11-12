import { useId, type ReactNode } from "react";
import type { Product } from "@/catalog";
import { whereToBuyLink } from "@/navigation";
import { ButtonLink } from "./Button";
import { ColorSelector } from "./ColorSelector";
import { ResponsiveImage } from "./ResponsiveImage";

type ProductHeroProps = {
  product: Product;
  children?: ReactNode;
};

export function ProductHero({ product, children }: ProductHeroProps) {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className="-mt-header overflow-x-clip desktop:-mt-header-desktop"
    >
      <div className="tablet:page-container tablet:grid tablet:grid-cols-[1fr_--spacing(59.5)] tablet:gap-x-8 desktop:grid-cols-[709fr_555fr] desktop:gap-x-20">
        <div className="relative isolate flex h-147.5 items-start justify-center bg-card pt-[calc(var(--spacing-header)+2.5rem)] tablet:h-183.25 tablet:items-center tablet:bg-transparent tablet:pt-0 tablet:before:absolute tablet:before:inset-y-0 tablet:before:right-0 tablet:before:-left-page-tablet tablet:before:-z-10 tablet:before:rounded-b-3xl tablet:before:bg-card desktop:h-225 desktop:before:left-[-50vw] desktop:before:rounded-none">
          <ResponsiveImage
            src={product.image}
            alt={product.name}
            ratio="1/1"
            sizes={{
              mobile: "min(100vw, 390px)",
              tablet: "476px",
              desktop: "648px",
            }}
            preload
            className="max-w-97.5 tablet:max-w-119 desktop:max-w-162"
          />
        </div>
        <div className="px-page-mobile pt-10 tablet:sticky tablet:top-0 tablet:col-start-2 tablet:row-span-2 tablet:row-start-1 tablet:self-start tablet:px-0 tablet:pt-40 tablet:pb-45">
          <div className="flex flex-col gap-8 desktop:w-88.75">
            <div className="flex flex-col gap-6">
              <h1 id={titleId} className="heading-2">
                {product.name}
              </h1>
              <p className="text-body font-book text-text-secondary">
                {product.description}
              </p>
            </div>
            <ColorSelector colors={product.colors} />
            <div className="hidden tablet:block">
              <ButtonLink href={whereToBuyLink.href} className="w-full">
                {whereToBuyLink.label}
              </ButtonLink>
            </div>
          </div>
        </div>
        {children && (
          <div className="flex flex-col gap-10 px-page-mobile py-10 tablet:col-start-1 tablet:gap-20 tablet:px-0 tablet:pt-20 tablet:pb-30 desktop:pb-45">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
