import { getImageProps } from "next/image";
import type { PhotoCrops } from "@/catalog";
import { breakpointMedia } from "@/lib/breakpoints";
import { cx } from "@/lib/cx";
import { toSizesAttribute, type ImageSizes } from "@/lib/imageSizes";

type ArtDirectedImageProps = {
  image: PhotoCrops;
  sizes: ImageSizes;
  className?: string;
};

/** Fills its positioned parent, which sets the size: no layout shift. */
export function ArtDirectedImage({
  image,
  sizes,
  className,
}: ArtDirectedImageProps) {
  const shared = {
    alt: image.alt,
    fill: true,
    sizes: toSizesAttribute(sizes),
  };
  const desktop = getImageProps({ ...shared, src: image.desktop }).props;
  const tablet = getImageProps({ ...shared, src: image.tablet }).props;
  const mobile = getImageProps({ ...shared, src: image.mobile }).props;

  // The browser takes the first matching <source>: widest breakpoint first.
  return (
    <picture>
      <source
        media={breakpointMedia.desktop}
        srcSet={desktop.srcSet}
        sizes={shared.sizes}
      />
      <source
        media={breakpointMedia.tablet}
        srcSet={tablet.srcSet}
        sizes={shared.sizes}
      />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
      <img {...mobile} className={cx("object-cover", className)} />
    </picture>
  );
}
