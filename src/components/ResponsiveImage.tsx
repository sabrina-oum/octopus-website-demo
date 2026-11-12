import Image from "next/image";
import { cx } from "@/lib/cx";
import { toSizesAttribute, type ImageSizes } from "@/lib/imageSizes";

type AspectRatio = `${number}/${number}`;

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
