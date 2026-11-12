import type { Product } from "@/catalog";
import { cx } from "@/lib/cx";
import { ButtonLink } from "./Button";
import { ResponsiveImage } from "./ResponsiveImage";

type MediumProductCardProps = {
  product: Product;
  desktopShape: "vertical" | "horizontal";
};

export function MediumProductCard({
  product,
  desktopShape,
}: MediumProductCardProps) {
  const horizontal = desktopShape === "horizontal";

  return (
    <article
      className={cx(
        "flex h-full flex-col items-center gap-6 overflow-hidden rounded-card bg-card px-6 pt-10 pb-6 text-center",
        "tablet:gap-4 tablet:px-8 tablet:pt-8",
        "desktop:gap-8",
        horizontal
          ? "desktop:min-h-126 desktop:flex-row desktop:p-10 desktop:text-left"
          : "desktop:px-20 desktop:pt-16 desktop:pb-0",
      )}
    >
      <div
        className={cx(
          "flex flex-col items-center gap-6 tablet:gap-4 desktop:gap-8",
          horizontal
            ? "desktop:w-75 desktop:shrink-0 desktop:items-start"
            : "desktop:max-w-112.5",
        )}
      >
        <div className="flex flex-col gap-4">
          <h3 className="text-h3-s font-bold desktop:text-h3-l">
            {product.name}
          </h3>
          <p className="text-body font-book text-text-secondary desktop:text-title-m">
            {product.shortDescription}
          </p>
        </div>
        <ButtonLink href={product.href}>Learn more</ButtonLink>
      </div>
      <ResponsiveImage
        src={product.image}
        alt={product.name}
        ratio="1/1"
        sizes={{
          mobile: "100vw",
          tablet: "50vw",
          desktop: horizontal ? "min(20rem, 25vw)" : "min(40rem, 45vw)",
        }}
        className={
          horizontal
            ? "desktop:min-w-0 desktop:flex-1 desktop:self-stretch"
            : undefined
        }
      />
    </article>
  );
}
