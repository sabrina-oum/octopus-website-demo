import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Product } from "@/catalog";
import { ProductCard } from "./ProductCard";

const powerBoard: Product = {
  id: "power-board",
  slug: "power-board-usb",
  name: "Octopus Power Board with USB Charging",
  category: "accessories",
  shortDescription: "A compact power board with four sockets and four USB ports",
  image: "/images/products/power-board-usb.png",
  bestSeller: false,
};

describe("ProductCard", () => {
  it("shows the product name, description and image from the data", () => {
    render(<ProductCard product={powerBoard} />);

    expect(
      screen.getByRole("heading", {
        name: "Octopus Power Board with USB Charging",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "A compact power board with four sockets and four USB ports",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Octopus Power Board with USB Charging" }),
    ).toBeInTheDocument();
  });

  it("links « Learn more » to the product page of that product", () => {
    render(<ProductCard product={powerBoard} />);

    expect(screen.getByRole("link", { name: "Learn more" })).toHaveAttribute(
      "href",
      "/products/power-board-usb",
    );
  });
});
