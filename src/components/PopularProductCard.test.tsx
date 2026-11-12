import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { makeProduct } from "@/test/fixtures";
import { PopularProductCard } from "./PopularProductCard";

const kettle = makeProduct({
  id: "kettle",
  name: "Octopus Kettle",
  shortDescription: "A 1.7 L kettle that boils fast on 1800W",
  bestSeller: true,
  href: "/products/kettle",
});

describe("PopularProductCard", () => {
  it("shows the name, description and image from the data", () => {
    render(<PopularProductCard product={kettle} />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Octopus Kettle" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A 1.7 L kettle that boils fast on 1800W"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Octopus Kettle" }),
    ).toBeInTheDocument();
  });

  it("links to the product page given by the data, named after the product", () => {
    render(<PopularProductCard product={kettle} />);

    expect(
      screen.getByRole("link", { name: "Octopus Kettle" }),
    ).toHaveAttribute("href", "/products/kettle");
  });
});
