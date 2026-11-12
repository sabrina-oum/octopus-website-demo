import { describe, expect, it } from "vitest";
import {
  getBestSellers,
  getCategories,
  getProductBySlug,
  getProductsWithPage,
  parseCategories,
  parseProducts,
} from "./index";

const categories = [{ id: "kitchen", name: "Kitchen" }];

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

describe("parseCategories", () => {
  it("returns valid categories", () => {
    expect(parseCategories(categories)).toEqual(categories);
  });

  it("rejects a category listed twice", () => {
    expect(() =>
      parseCategories([...categories, { id: "kitchen", name: "Cooking" }]),
    ).toThrow(/"kitchen" is listed twice/);
  });

  it("rejects an id that cannot be used in a URL", () => {
    expect(() =>
      parseCategories([{ id: "Hair Care", name: "Hair Care" }]),
    ).toThrow(/^Invalid category data/);
  });
});

describe("parseProducts", () => {
  it("returns valid products, with their category name from the categories data", () => {
    expect(parseProducts([blender], categories)).toEqual([
      {
        ...blender,
        categoryName: "Kitchen",
        href: "/products/countertop-blender",
      },
    ]);
  });

  it("sends a product without its own page to the first product page", () => {
    const [, kettleProduct] = parseProducts([blender, kettle], categories);

    expect(kettleProduct.href).toBe("/products/countertop-blender");
  });

  it("rejects a catalog where no product has a page to link to", () => {
    expect(() => parseProducts([kettle], categories)).toThrow(/product page/);
  });

  it("rejects a product whose category does not exist", () => {
    expect(() =>
      parseProducts([{ ...blender, category: "garden" }], categories),
    ).toThrow(/"garden" does not exist/);
  });

  it("rejects an invalid entry with a message naming the faulty field", () => {
    const parse = () =>
      parseProducts([{ ...blender, slug: undefined }], categories);

    expect(parse).toThrow(/^Invalid product data/);
    expect(parse).toThrow(/slug/);
  });

  it("rejects a slug that cannot be used in a URL", () => {
    expect(() =>
      parseProducts([{ ...blender, slug: "Countertop Blender" }], categories),
    ).toThrow(/slug/);
  });
});

describe("getCategories", () => {
  it("lists the shipped categories with the names shown on the site", async () => {
    const shipped = await getCategories();

    expect(shipped.map(({ name }) => name)).toEqual([
      "Kitchen",
      "Hair Care",
      "Home Security",
      "Accessories",
    ]);
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
        categoryName: "Kitchen",
      },
    );
  });

  it("returns undefined for an unknown slug", async () => {
    await expect(getProductBySlug("does-not-exist")).resolves.toBeUndefined();
  });
});
