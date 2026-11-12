import type { PhotoCrops, Product } from "@/catalog";
import { backdropStyle } from "@/lib/backdrop";
import { cx } from "@/lib/cx";
import { ArtDirectedImage } from "./ArtDirectedImage";
import { LearnMoreLink } from "./LearnMoreLink";

type HighlightProductCardProps = {
  product: Product;
  image: PhotoCrops;
  desktopShape: "horizontal" | "vertical";
};

export function HighlightProductCard({
  product,
  image,
  desktopShape,
}: HighlightProductCardProps) {
  const vertical = desktopShape === "vertical";

  return (
    <article
      style={backdropStyle(image.backdrop)}
      className={cx(
        "relative isolate flex aspect-2/3 flex-col overflow-hidden rounded-card bg-(--backdrop) text-center",
        "tablet:aspect-video tablet:justify-center tablet:text-left",
        vertical &&
          "desktop:aspect-auto desktop:h-full desktop:min-h-150 desktop:justify-start desktop:text-center",
      )}
    >
      <div
        className={cx(
          "flex flex-col items-center gap-6 px-6 pt-10 pb-8",
          "tablet:items-start tablet:px-10 tablet:py-0",
          "desktop:gap-8 desktop:px-20",
          vertical && "desktop:items-center desktop:pt-16 desktop:pb-8",
        )}
      >
        <div
          className={cx(
            "flex flex-col gap-4 tablet:max-w-75",
            vertical ? "desktop:max-w-112.5" : "desktop:max-w-100",
          )}
        >
          <h3 className="heading-3">{product.name}</h3>
          <p className="text-body font-book desktop:text-title-m">
            {product.shortDescription}
          </p>
        </div>
        <LearnMoreLink product={product} />
      </div>
      <div
        className={cx(
          "relative min-h-0 flex-1 tablet:absolute tablet:inset-0 tablet:-z-10",
          vertical &&
            "desktop:relative desktop:inset-auto desktop:z-auto desktop:flex-1",
        )}
      >
        <ArtDirectedImage
          image={image}
          sizes={{
            mobile: "calc(100vw - 2rem)",
            tablet: "calc(100vw - 4rem)",
            desktop: vertical ? "min(42rem, 50vw)" : "min(84rem, 100vw - 6rem)",
          }}
          className={cx(
            "object-top tablet:object-left",
            vertical ? "desktop:object-top" : "desktop:object-[20%_50%]",
          )}
        />
        <div
          aria-hidden
          className={cx(
            "absolute inset-x-0 top-0 h-[30%] fade-backdrop tablet:hidden",
            vertical && "desktop:block",
          )}
        />
        <div
          aria-hidden
          className={cx(
            "absolute inset-y-0 left-0 hidden w-[55%] fade-backdrop [--fade-direction:to_right] [--fade-start:58%] tablet:block",
            vertical && "desktop:hidden",
          )}
        />
      </div>
    </article>
  );
}
