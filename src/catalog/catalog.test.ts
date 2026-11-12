import { describe, expect, it } from "vitest";
import {
  buildProductSeo,
  getProduct,
  parseCategories,
  parseProducts,
} from "./index";

const categories = [{ id: "kitchen", name: "Kitchen" }];

const blender = {
  id: "1",
  slug: "countertop-blender",
  name: "Octopus Countertop Blender",
  category: "kitchen",
  shortDescription: "Blends everything.",
  image: "/images/products/countertop-blender.png",
  bestSeller: false,
  description: "Blends everything, then cleans itself.",
  colors: [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#ffffff" },
  ],
};

const kettle = {
  ...blender,
  id: "2",
  slug: "kettle",
  name: "Octopus Kettle",
  shortDescription: "Boils water fast.",
  image: "/images/products/kettle.png",
  description: "Boils water fast, and stays cool to the touch.",
  colors: [{ name: "Graphite", hex: "#3c3d40" }],
};

const siteImage = {
  src: "/images/og/homepage.jpg",
  width: 1200,
  height: 630,
  alt: "Octopus appliances",
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
  it("returns valid products, with their category from the categories data", () => {
    expect(parseProducts([blender], categories)).toEqual([
      {
        ...blender,
        category: { id: "kitchen", name: "Kitchen" },
        href: "/products/countertop-blender",
      },
    ]);
  });

  it("links every product to its own page", () => {
    const products = parseProducts([blender, kettle], categories);

    expect(products.map(({ href }) => href)).toEqual([
      "/products/countertop-blender",
      "/products/kettle",
    ]);
  });

  it("rejects two products with the same slug, as they would share a page", () => {
    expect(() =>
      parseProducts([blender, { ...kettle, slug: blender.slug }], categories),
    ).toThrow(/Slug "countertop-blender" is listed twice/);
  });

  it("rejects two products with the same id", () => {
    expect(() =>
      parseProducts([blender, { ...kettle, id: blender.id }], categories),
    ).toThrow(/Product "1" is listed twice/);
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

  it("rejects a product without a description, naming the field", () => {
    expect(() =>
      parseProducts([{ ...blender, description: "" }], categories),
    ).toThrow(/description/);
  });

  it("rejects a product without colors, naming the field", () => {
    expect(() =>
      parseProducts([{ ...blender, colors: [] }], categories),
    ).toThrow(/colors/);
  });

  it("rejects a color listed twice", () => {
    const colors = [...blender.colors, { name: "Black", hex: "#111111" }];

    expect(() => parseProducts([{ ...blender, colors }], categories)).toThrow(
      /Color "Black" is listed twice/,
    );
  });

  it("keeps the gallery photos and feature cards in the order given", () => {
    const gallery = [
      {
        type: "photo",
        image: { src: "/images/blender-kitchen.jpg", alt: "A smoothie" },
      },
      {
        type: "features",
        features: [
          {
            title: "Skip the scrubbing",
            description: "The blender cleans itself.",
            image: { src: "/images/blender-clean.jpg", alt: "" },
          },
        ],
      },
    ];

    const [product] = parseProducts([{ ...blender, gallery }], categories);

    expect(product.gallery).toEqual(gallery);
  });

  it("rejects a gallery photo without alt text", () => {
    const gallery = [
      { type: "photo", image: { src: "/images/blender.jpg", alt: "" } },
    ];

    expect(() => parseProducts([{ ...blender, gallery }], categories)).toThrow(
      /gallery[\s\S]*alt/,
    );
  });

  it("rejects a color that is not a #rrggbb hex code", () => {
    const colors = [{ name: "Black", hex: "black" }];

    expect(() => parseProducts([{ ...blender, colors }], categories)).toThrow(
      /#rrggbb/,
    );
  });
});

describe("buildProductSeo", () => {
  it("uses the product's name, short description and the site's image when it has no SEO of its own", () => {
    const [product] = parseProducts([kettle], categories);

    expect(buildProductSeo(product, siteImage)).toEqual({
      title: "Octopus Kettle",
      description: "Boils water fast.",
      image: siteImage,
    });
  });

  it("uses each SEO field the product overrides, and falls back for the others", () => {
    const [product] = parseProducts(
      [{ ...blender, seo: { title: "Octopus Countertop Blender | 1500W" } }],
      categories,
    );

    expect(buildProductSeo(product, siteImage)).toEqual({
      title: "Octopus Countertop Blender | 1500W",
      description: "Blends everything.",
      image: siteImage,
    });
  });
});

describe("getProduct", () => {
  it("returns undefined for an unknown slug", async () => {
    await expect(getProduct("does-not-exist")).resolves.toBeUndefined();
  });
});
