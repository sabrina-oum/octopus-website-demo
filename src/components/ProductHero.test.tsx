import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { comingSoonPath } from "@/navigation";
import { makeProduct } from "@/test/fixtures";
import { ProductHero } from "./ProductHero";

const blender = makeProduct({
  name: "Octopus Countertop Blender",
  description: "Blends smoothies, then rinses its own jug.",
  colors: [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#ffffff" },
  ],
});

describe("ProductHero", () => {
  it("shows the product name, description, photo and colours from the data", () => {
    render(<ProductHero product={blender} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Octopus Countertop Blender",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Blends smoothies, then rinses its own jug."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Octopus Countertop Blender" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("radio").map((radio) => radio.getAttribute("value")),
    ).toEqual(["Black", "White"]);
  });

  it("is a landmark named after the product", () => {
    render(<ProductHero product={blender} />);

    expect(
      screen.getByRole("region", { name: "Octopus Countertop Blender" }),
    ).toBeInTheDocument();
  });

  it("leads « Where to buy » to Coming soon, as the store locator is not built", () => {
    render(<ProductHero product={blender} />);

    expect(screen.getByRole("link", { name: "Where to buy" })).toHaveAttribute(
      "href",
      comingSoonPath,
    );
  });
});
