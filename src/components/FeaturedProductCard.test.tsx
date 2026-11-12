import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Product } from "@/catalog";
import { FeaturedProductCard } from "./FeaturedProductCard";

const indoorCamera: Product = {
  id: "indoor-camera",
  slug: "indoor-camera",
  name: "Octopus Indoor Camera",
  category: "home-security",
  categoryName: "Home Security",
  shortDescription: "A 2K indoor camera that pans to cover the whole room",
  image: "/images/products/indoor-camera.png",
  bestSeller: true,
  hasPage: false,
  href: "/products/countertop-blender",
};

describe("FeaturedProductCard", () => {
  it("shows the category, name, description and image from the data", () => {
    render(<FeaturedProductCard product={indoorCamera} />);

    expect(screen.getByText("Home Security")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Octopus Indoor Camera" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A 2K indoor camera that pans to cover the whole room"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Octopus Indoor Camera" }),
    ).toBeInTheDocument();
  });

  it("links « Learn more » to the product page given by the data", () => {
    render(<FeaturedProductCard product={indoorCamera} />);

    expect(screen.getByRole("link", { name: "Learn more" })).toHaveAttribute(
      "href",
      "/products/countertop-blender",
    );
  });
});
