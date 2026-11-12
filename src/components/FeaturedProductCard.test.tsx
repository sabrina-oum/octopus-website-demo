import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { makeProduct } from "@/test/fixtures";
import { FeaturedProductCard } from "./FeaturedProductCard";

const indoorCamera = makeProduct({
  id: "indoor-camera",
  name: "Octopus Indoor Camera",
  category: { id: "home-security", name: "Home Security" },
  shortDescription: "A 2K indoor camera that pans to cover the whole room",
  bestSeller: true,
  href: "/products/indoor-camera",
});

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

    expect(
      screen.getByRole("link", {
        name: "Learn more about Octopus Indoor Camera",
      }),
    ).toHaveAttribute("href", "/products/indoor-camera");
  });
});
