import { breakpointMedia } from "./breakpoints";

export type ImageSizes = {
  mobile: string;
  tablet?: string;
  desktop?: string;
};

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
