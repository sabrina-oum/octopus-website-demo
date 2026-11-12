import type { GalleryBlock } from "@/catalog";
import { FeatureCards } from "./FeatureCards";
import { ResponsiveImage } from "./ResponsiveImage";
import { Reveal } from "./Reveal";

type ProductGalleryProps = {
  blocks: GalleryBlock[];
};

export function ProductGallery({ blocks }: ProductGalleryProps) {
  return blocks.map((block, index) =>
    block.type === "photo" ? (
      <Reveal key={index}>
        <ResponsiveImage
          src={block.image.src}
          alt={block.image.alt}
          sizes={{
            mobile: "calc(100vw - 2rem)",
            tablet: "calc(100vw - 21rem)",
            desktop: "min(44.3125rem, 48vw)",
          }}
          className="reveal gallery-block-height rounded-card bg-card desktop:aspect-3/4"
        />
      </Reveal>
    ) : (
      <FeatureCards key={index} features={block.features} />
    ),
  );
}
