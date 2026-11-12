import { useId } from "react";
import type { ProductWithPage } from "@/catalog";
import { whereToBuyLink } from "@/navigation";
import { ButtonLink } from "./Button";
import { ColorSelector } from "./ColorSelector";
import { ResponsiveImage } from "./ResponsiveImage";

type ProductHeroProps = {
  product: ProductWithPage;
};

export function ProductHero({ product }: ProductHeroProps) {
  const titleId = useId();
  const { page } = product;

  return (
    <section
      aria-labelledby={titleId}
      className="-mt-header overflow-x-clip desktop:-mt-header-desktop"
    >
      <div className="tablet:page-container tablet:grid tablet:grid-cols-[1fr_--spacing(59.5)] tablet:gap-8 desktop:grid-cols-[709fr_555fr] desktop:gap-20">
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
        <div className="px-page-mobile pt-10 tablet:sticky tablet:top-0 tablet:self-start tablet:px-0 tablet:pt-40 tablet:pb-45">
          <div className="flex flex-col gap-8 desktop:w-88.75">
            <div className="flex flex-col gap-6">
              <h1 id={titleId} className="heading-2">
                {product.name}
              </h1>
              <p className="text-body font-book text-text-secondary">
                {page.description}
              </p>
            </div>
            <ColorSelector colors={page.colors} />
            <div className="hidden tablet:block">
              <ButtonLink href={whereToBuyLink.href} className="w-full">
                {whereToBuyLink.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
