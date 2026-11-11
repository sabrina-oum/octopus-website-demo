import { describe, expect, it } from "vitest";
import {
  getBestSellers,
  getProductBySlug,
  getProductsWithPage,
  parseProducts,
} from "./index";

const blender = {
  id: "1",
  slug: "countertop-blender",
  name: "Countertop Blender",
  category: "kitchen",
  shortDescription: "Blends everything.",
  image: "/images/products/countertop-blender.png",
  bestSeller: true,
  hasPage: true,
};

const kettle = {
  ...blender,
  id: "2",
  slug: "kettle",
  name: "Octopus Kettle",
  hasPage: false,
};

describe("parseProducts", () => {
  it("returns valid products", () => {
    expect(parseProducts([blender])).toEqual([
      { ...blender, href: "/products/countertop-blender" },
    ]);
  });

  it("sends a product without its own page to the first product page", () => {
    const [, kettleProduct] = parseProducts([blender, kettle]);

    expect(kettleProduct.href).toBe("/products/countertop-blender");
  });

  it("rejects a catalog where no product has a page to link to", () => {
    expect(() => parseProducts([kettle])).toThrow(/product page/);
  });

  it("rejects an invalid entry with a message naming the faulty field", () => {
    const parse = () => parseProducts([{ ...blender, slug: undefined }]);

    expect(parse).toThrow(/^Invalid product data/);
    expect(parse).toThrow(/slug/);
  });

  it("rejects a slug that cannot be used in a URL", () => {
    expect(() =>
      parseProducts([{ ...blender, slug: "Countertop Blender" }]),
    ).toThrow(/slug/);
  });
});

describe("getBestSellers", () => {
  it("lists the products marked as best sellers, in the order of the data", async () => {
    const bestSellers = await getBestSellers();

    expect(bestSellers.map(({ name }) => name)).toEqual([
      "Octopus Air Fryer 5.7 L",
      "Octopus Indoor Camera",
      "Octopus Ionic Hair Dryer",
      "Octopus Blender",
      "Octopus Kettle",
    ]);
  });
});

describe("getProductsWithPage", () => {
  it("only builds a page for the Countertop Blender", async () => {
    const products = await getProductsWithPage();

    expect(products.map(({ slug }) => slug)).toEqual(["countertop-blender"]);
  });
});

describe("getProductBySlug", () => {
  it("finds the Countertop Blender in the shipped data", async () => {
    await expect(getProductBySlug("countertop-blender")).resolves.toMatchObject(
      {
        name: "Countertop Blender",
        category: "kitchen",
      },
    );
  });

  it("returns undefined for an unknown slug", async () => {
    await expect(getProductBySlug("does-not-exist")).resolves.toBeUndefined();
  });
});
