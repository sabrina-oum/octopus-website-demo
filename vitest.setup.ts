import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import type { ImageProps } from "next/image";
import { createElement } from "react";
import { afterEach, vi } from "vitest";

// happy-dom loads no CSS and does no layout, so next/image's dev-only check on a
// `fill` image (parent must be positioned, height must not be 0) always fails
// and prints warnings. Render the same <img> attributes Next would, without that check.
vi.mock("next/image", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/image")>();
  return {
    ...actual,
    default: (props: ImageProps) =>
      createElement("img", actual.getImageProps(props).props),
  };
});

afterEach(() => {
  cleanup();
});
