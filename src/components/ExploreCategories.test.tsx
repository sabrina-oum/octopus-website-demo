import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ExploreCategoriesData } from "@/catalog";
import { ExploreCategories } from "./ExploreCategories";

const content: ExploreCategoriesData = {
  title: "Explore all categories",
  tiles: [
    {
      category: { id: "kitchen", name: "Kitchen" },
      image: "/images/products/blender.png",
      href: "/coming-soon",
    },
    {
      category: { id: "garden", name: "Garden" },
      image: "/images/products/hose.png",
      href: "/coming-soon",
    },
  ],
};

function renderTiles() {
  render(<ExploreCategories content={content} />);

  return screen.getByRole("region", { name: "Explore all categories" });
}

describe("ExploreCategories", () => {
  it("titles the section", () => {
    const section = renderTiles();

    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: "Explore all categories",
      }),
    ).toBeInTheDocument();
  });

  it("links each tile, named after its category, to where it leads", () => {
    const section = renderTiles();

    const links = within(section).getAllByRole("link");

    expect(
      links.map((link) => [link.textContent, link.getAttribute("href")]),
    ).toEqual([
      ["Kitchen", "/coming-soon"],
      ["Garden", "/coming-soon"],
    ]);
  });

  it("keeps the product photos out of the link names, and loads them lazily", () => {
    const section = renderTiles();

    expect(
      within(section).getByRole("link", { name: "Kitchen" }),
    ).toBeVisible();
    // An image with an empty alt has the presentation role.
    const images = within(section).getAllByRole("presentation");

    expect(images).toHaveLength(2);
    for (const image of images) {
      expect(image).toHaveAttribute("alt", "");
      expect(image).toHaveAttribute("loading", "lazy");
    }
  });
});
