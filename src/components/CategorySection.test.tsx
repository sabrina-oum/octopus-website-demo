import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { CategorySectionData, Product } from "@/catalog";
import { CategorySection } from "./CategorySection";

const categoryNames: Record<string, string> = {
  kitchen: "Kitchen",
  "hair-care": "Hair Care",
  accessories: "Accessories",
};

function product(id: string, name: string, category: string) {
  return {
    id,
    slug: id,
    name,
    category,
    categoryName: categoryNames[category] ?? category,
    shortDescription: `About the ${name}.`,
    image: `/images/products/${id}.png`,
    bestSeller: false,
    hasPage: false,
    href: "/products/countertop-blender",
  } satisfies Product;
}

const blender = product("personal-blender", "Octopus Blender", "kitchen");
const kettle = product("kettle", "Octopus Kettle", "kitchen");
const dryer = product(
  "ionic-hair-dryer",
  "Octopus Ionic Hair Dryer",
  "hair-care",
);
const powerBank = product("power-bank", "Octopus Power Bank", "accessories");
const charger = product("car-charger", "Octopus Car Charger", "accessories");

function photo(name: string) {
  return {
    mobile: `/images/${name}-mobile.jpg`,
    tablet: `/images/${name}-tablet.jpg`,
    desktop: `/images/${name}-desktop.jpg`,
    alt: `A ${name} photo`,
    backdrop: "#F2E0D7",
  };
}

const kitchen: CategorySectionData = {
  layout: "featured-above",
  category: "kitchen",
  categoryName: "Kitchen",
  subheading: "Powerful appliances for everyday cooking",
  image: photo("kitchen"),
  featured: blender,
  products: [kettle],
};

function section(name: string) {
  return screen.getByRole("region", { name });
}

describe("CategorySection", () => {
  it("introduces the category with its header and a link to all its products", () => {
    render(<CategorySection section={kitchen} />);

    expect(
      within(section("Kitchen")).getByRole("heading", {
        level: 2,
        name: "Kitchen",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Powerful appliances for everyday cooking"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Explore all products in Kitchen" }),
    ).toHaveAttribute("href", "/coming-soon");
  });

  it("shows the featured product and the other products, each linking to its page", () => {
    render(<CategorySection section={kitchen} />);

    const cards = within(section("Kitchen")).getAllByRole("article");

    expect(
      cards.map((card) => within(card).getByRole("heading").textContent),
    ).toEqual(["Octopus Blender", "Octopus Kettle"]);
    for (const card of cards) {
      expect(
        within(card).getByRole("link", { name: "Learn more" }),
      ).toHaveAttribute("href", "/products/countertop-blender");
    }
  });

  it("loads the photo lazily, as it sits below the fold", () => {
    render(<CategorySection section={kitchen} />);

    expect(
      screen.getByRole("img", { name: "A kitchen photo" }),
    ).toHaveAttribute("loading", "lazy");
  });

  it("names a banner section after its category and presents its product", () => {
    render(
      <CategorySection
        section={{
          layout: "banner",
          category: "hair-care",
          categoryName: "Hair Care",
          image: photo("hair-dryer"),
          featured: dryer,
        }}
      />,
    );

    const banner = section("Hair Care");
    expect(
      within(banner).getByRole("heading", {
        level: 3,
        name: "Octopus Ionic Hair Dryer",
      }),
    ).toBeInTheDocument();
    expect(
      within(banner).getByRole("link", { name: "Learn more" }),
    ).toHaveAttribute("href", "/products/countertop-blender");
  });

  it("lists every product of a cards section", () => {
    render(
      <CategorySection
        section={{
          layout: "cards",
          category: "accessories",
          categoryName: "Accessories",
          subheading: "The little things",
          products: [powerBank, charger],
        }}
      />,
    );

    expect(
      within(section("Accessories"))
        .getAllByRole("heading", { level: 3 })
        .map((heading) => heading.textContent),
    ).toEqual(["Octopus Power Bank", "Octopus Car Charger"]);
  });
});
