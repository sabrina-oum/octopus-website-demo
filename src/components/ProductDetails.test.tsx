import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { makeProduct } from "@/test/fixtures";
import { ProductDetails } from "./ProductDetails";

const blender = makeProduct({
  specs: [
    {
      title: "Technical specifications",
      items: [
        { label: "Power", value: "1500W" },
        { label: "Voltage", value: "220–240 V" },
      ],
    },
    {
      title: "Product information",
      items: [{ label: "Model", value: "BL9023-CB" }],
    },
  ],
  downloads: [{ label: "User manual", href: "/downloads/manual.pdf" }],
});

describe("ProductDetails", () => {
  it("shows the product's spec sections and downloads from the data", () => {
    render(<ProductDetails product={blender} />);

    const technical = screen.getByRole("region", {
      name: "Technical specifications",
    });
    expect(technical).toHaveTextContent("Power: 1500W");
    expect(technical).toHaveTextContent("Voltage: 220–240 V");
    expect(
      screen.getByRole("region", { name: "Product information" }),
    ).toHaveTextContent("Model: BL9023-CB");

    const manual = screen.getByRole("link", {
      name: "User manual (opens in a new tab)",
    });
    expect(manual).toHaveAttribute("href", "/downloads/manual.pdf");
    expect(manual).toHaveAttribute("target", "_blank");
    expect(manual).not.toHaveAttribute("download");
  });

  it("shows nothing for a product without specs or downloads", () => {
    const { container } = render(<ProductDetails product={makeProduct()} />);

    expect(container).toBeEmptyDOMElement();
  });
});
