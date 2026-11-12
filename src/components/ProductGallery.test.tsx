import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { GalleryBlock, ProductFeature } from "@/catalog";
import { ProductGallery } from "./ProductGallery";

function feature(title: string): ProductFeature {
  return {
    title,
    description: `${title}, described.`,
    image: { src: "/images/feature.jpg", alt: "" },
  };
}

const blocks: GalleryBlock[] = [
  {
    type: "photo",
    image: { src: "/images/kitchen.jpg", alt: "A smoothie being poured" },
  },
  {
    type: "features",
    features: [feature("Powers through"), feature("Skip the scrubbing")],
  },
  {
    type: "photo",
    image: { src: "/images/counter.jpg", alt: "The blender on a counter" },
  },
];

describe("ProductGallery", () => {
  it("shows the photos and feature cards from the data, in order", () => {
    render(<ProductGallery blocks={blocks} />);

    const content = [
      ...screen.getAllByRole("img"),
      ...screen.getAllByRole("heading"),
    ].sort((a, b) =>
      a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
    );

    expect(
      content.map((element) =>
        element.tagName === "IMG"
          ? element.getAttribute("alt")
          : element.textContent,
      ),
    ).toEqual([
      "A smoothie being poured",
      "Powers through",
      "Skip the scrubbing",
      "The blender on a counter",
    ]);
    expect(
      screen.getByText("Skip the scrubbing, described."),
    ).toBeInTheDocument();
  });

  it("loads its images lazily, as they sit below the hero", () => {
    const { container } = render(<ProductGallery blocks={blocks} />);

    const images = container.querySelectorAll("img");

    expect(images).toHaveLength(4);
    images.forEach((image) => expect(image).toHaveAttribute("loading", "lazy"));
  });
});
