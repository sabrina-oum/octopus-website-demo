import type { PhotoCrops, Product } from "@/catalog";
import { backdropStyle } from "@/lib/backdrop";
import { ArtDirectedImage } from "./ArtDirectedImage";
import { LearnMoreLink } from "./LearnMoreLink";

type ProductBannerProps = {
  product: Product;
  image: PhotoCrops;
};

export function ProductBanner({ product, image }: ProductBannerProps) {
  return (
    <article
      style={backdropStyle(image.backdrop)}
      className="relative isolate flex flex-col bg-(--backdrop) tablet:aspect-81/50 tablet:justify-center desktop:aspect-12/5"
    >
      <div className="page-container relative z-10 flex flex-col items-center gap-8 pt-20 pb-8 text-center tablet:items-start tablet:py-10 tablet:text-left">
        <div className="flex flex-col gap-4">
          <h3 className="heading-2">{product.name}</h3>
          <p className="subtitle max-w-112.5">{product.shortDescription}</p>
        </div>
        <LearnMoreLink product={product} />
      </div>
      <div className="relative mt-[-27.6%] aspect-3/4 tablet:absolute tablet:inset-0 tablet:-z-10 tablet:mt-0 tablet:aspect-auto">
        <ArtDirectedImage
          image={image}
          sizes={{ mobile: "100vw" }}
          className="desktop:object-left"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1/5 bg-linear-to-b/srgb from-(--backdrop) to-transparent tablet:hidden"
        />
      </div>
    </article>
  );
}
