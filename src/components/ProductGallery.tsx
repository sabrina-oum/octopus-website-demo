import type { GalleryBlock } from "@/catalog";
import { FeatureCards } from "./FeatureCards";
import { ResponsiveImage } from "./ResponsiveImage";

type ProductGalleryProps = {
  blocks: GalleryBlock[];
};

export function ProductGallery({ blocks }: ProductGalleryProps) {
  return blocks.map((block, index) =>
    block.type === "photo" ? (
      <ResponsiveImage
        key={index}
        src={block.image.src}
        alt={block.image.alt}
        sizes={{
          mobile: "calc(100vw - 2rem)",
          tablet: "calc(100vw - 21rem)",
          desktop: "min(44.3125rem, 48vw)",
        }}
        className="gallery-block-height rounded-card bg-card desktop:aspect-3/4"
      />
    ) : (
      <FeatureCards key={index} features={block.features} />
    ),
  );
}
