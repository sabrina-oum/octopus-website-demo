import Image from "next/image";
import { breakpointMedia } from "@/lib/breakpoints";
import { cx } from "@/lib/cx";

type AspectRatio = `${number}/${number}`;

type ImageSizes = {
  mobile: string;
  tablet?: string;
  desktop?: string;
};

function toSizesAttribute({ mobile, tablet, desktop }: ImageSizes): string {
  return [
    desktop && `${breakpointMedia.desktop} ${desktop}`,
    tablet && `${breakpointMedia.tablet} ${tablet}`,
    mobile,
  ]
    .filter(Boolean)
    .join(", ");
}

type ResponsiveImageProps = {
  src: string;
  alt: string;
  ratio?: AspectRatio;
  sizes: ImageSizes;
  preload?: boolean;
  className?: string;
};

export function ResponsiveImage({
  src,
  alt,
  ratio,
  sizes,
  preload = false,
  className,
}: ResponsiveImageProps) {
  return (
    <div
      className={cx("relative w-full overflow-hidden", className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={toSizesAttribute(sizes)}
        preload={preload}
        className="object-contain"
      />
    </div>
  );
}
