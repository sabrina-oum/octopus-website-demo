import { breakpointMedia } from "./breakpoints";

/** The width an image takes at each breakpoint, as CSS lengths. */
export type ImageSizes = {
  mobile: string;
  tablet?: string;
  desktop?: string;
};

/** Turns per-breakpoint widths into an <img> `sizes` attribute. */
export function toSizesAttribute({
  mobile,
  tablet,
  desktop,
}: ImageSizes): string {
  return [
    desktop && `${breakpointMedia.desktop} ${desktop}`,
    tablet && `${breakpointMedia.tablet} ${tablet}`,
    mobile,
  ]
    .filter(Boolean)
    .join(", ");
}
