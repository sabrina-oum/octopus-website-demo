import { describe, expect, it } from "vitest";
import { buildCategoryTiles } from "./index";

const categories = [
  { id: "kitchen", name: "Kitchen" },
  { id: "hair-care", name: "Hair Care" },
];

describe("buildCategoryTiles", () => {
  it("names each tile after its category, in the order the Homepage lists them", () => {
    const tiles = buildCategoryTiles(
      [
        { category: "hair-care", image: "/images/products/hair-dryer.png" },
        { category: "kitchen", image: "/images/products/blender.png" },
      ],
      categories,
    );

    expect(tiles).toMatchObject([
      {
        category: { id: "hair-care", name: "Hair Care" },
        image: "/images/products/hair-dryer.png",
      },
      {
        category: { id: "kitchen", name: "Kitchen" },
        image: "/images/products/blender.png",
      },
    ]);
  });

  it("links a tile to Coming soon, as category pages are not built", () => {
    const [tile] = buildCategoryTiles(
      [{ category: "kitchen", image: "/images/products/blender.png" }],
      categories,
    );

    expect(tile.href).toBe("/coming-soon");
  });

  it("rejects a tile whose category does not exist", () => {
    expect(() =>
      buildCategoryTiles(
        [{ category: "garden", image: "/images/products/hose.png" }],
        categories,
      ),
    ).toThrow(/Category "garden" does not exist/);
  });
});
