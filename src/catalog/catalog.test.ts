import { describe, expect, it } from "vitest";
import { getProductBySlug, parseProducts } from "./index";

const blender = {
  id: "1",
  slug: "countertop-blender",
  name: "Countertop Blender",
  category: "kitchen",
  shortDescription: "Blends everything.",
  image: "/images/products/countertop-blender.png",
  bestSeller: true,
};

describe("parseProducts", () => {
  it("returns valid products", () => {
    expect(parseProducts([blender])).toEqual([blender]);
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

describe("getProductBySlug", () => {
  it("finds the Countertop Blender in the shipped data", async () => {
    await expect(getProductBySlug("countertop-blender")).resolves.toMatchObject({
      name: "Countertop Blender",
      category: "kitchen",
    });
  });

  it("returns undefined for an unknown slug", async () => {
    await expect(getProductBySlug("does-not-exist")).resolves.toBeUndefined();
  });
});
