import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { makeProduct } from "@/test/fixtures";
import { ProductCard } from "./ProductCard";

const powerBoard = makeProduct({
  id: "power-board-usb",
  name: "Octopus Power Board with USB Charging",
  category: { id: "accessories", name: "Accessories" },
  shortDescription:
    "A compact power board with four sockets and four USB ports",
  href: "/products/power-board-usb",
});

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
      screen.getByRole("img", {
        name: "Octopus Power Board with USB Charging",
      }),
    ).toBeInTheDocument();
  });

  it("links « Learn more » to the product page given by the data", () => {
    render(<ProductCard product={powerBoard} />);

    expect(
      screen.getByRole("link", {
        name: "Learn more about Octopus Power Board with USB Charging",
      }),
    ).toHaveAttribute("href", "/products/power-board-usb");
  });
});
