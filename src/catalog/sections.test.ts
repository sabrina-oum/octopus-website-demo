import { describe, expect, it } from "vitest";
import {
  buildCategorySections,
  parseProducts,
  type CategorySectionContent,
  type CategorySectionData,
} from "./index";

function productNames(section: CategorySectionData): string[] {
  return "products" in section ? section.products.map(({ name }) => name) : [];
}

function product(id: string, category: string, name: string) {
  return {
    id,
    slug: id,
    name,
    category,
    shortDescription: "Does its job.",
    image: `/images/products/${id}.png`,
    bestSeller: false,
    description: "Does its job, every day.",
    colors: [{ name: "Black", hex: "#000000" }],
  };
}

const categories = [
  { id: "kitchen", name: "Kitchen" },
  { id: "accessories", name: "Accessories" },
];

const products = parseProducts(
  [
    product("countertop-blender", "kitchen", "Countertop Blender"),
    product("air-fryer", "kitchen", "Octopus Air Fryer"),
    product("kettle", "kitchen", "Octopus Kettle"),
    product("power-bank", "accessories", "Octopus Power Bank"),
    product("car-charger", "accessories", "Octopus Car Charger"),
  ],
  categories,
);

function build(sections: CategorySectionContent[]): CategorySectionData[] {
  return buildCategorySections(sections, products, categories);
}

const kitchenImage = {
  mobile: "/images/categories/kitchen-mobile.jpg",
  tablet: "/images/categories/kitchen-tablet.jpg",
  desktop: "/images/categories/kitchen-desktop.jpg",
  alt: "A blender on a kitchen counter",
  backdrop: "#E6D9CA",
};

const kitchenSection = {
  layout: "featured-above",
  category: "kitchen",
  subheading: "Powerful appliances",
  featured: "kettle",
  image: kitchenImage,
  products: ["countertop-blender"],
} satisfies CategorySectionContent;

const accessoriesSection = {
  layout: "cards",
  category: "accessories",
  subheading: "The little things",
  products: ["power-bank"],
} satisfies CategorySectionContent;

describe("buildCategorySections", () => {
  it("shows the featured product and the products its section lists, in that order", () => {
    const [kitchen] = build([kitchenSection]);

    expect(kitchen).toMatchObject({
      category: { id: "kitchen", name: "Kitchen" },
      featured: { name: "Octopus Kettle" },
    });
    expect(productNames(kitchen)).toEqual(["Countertop Blender"]);
  });

  it("leaves out the products of the category the section does not list", () => {
    const [kitchen] = build([kitchenSection]);

    expect(productNames(kitchen)).not.toContain("Octopus Air Fryer");
  });

  it("shows a product once its id is added to the section in the data", () => {
    const [accessories] = build([
      { ...accessoriesSection, products: ["power-bank", "car-charger"] },
    ]);

    expect(productNames(accessories)).toEqual([
      "Octopus Power Bank",
      "Octopus Car Charger",
    ]);
  });

  it("rejects a product id that does not exist", () => {
    expect(() => build([{ ...kitchenSection, featured: "toaster" }])).toThrow(
      /toaster/,
    );
    expect(() =>
      build([{ ...accessoriesSection, products: ["phone-case"] }]),
    ).toThrow(/phone-case/);
  });

  it("rejects a section whose category does not exist", () => {
    expect(() =>
      build([{ ...accessoriesSection, category: "garden" }]),
    ).toThrow(/"garden" does not exist/);
  });

  it("rejects a product from another category", () => {
    expect(() =>
      build([{ ...kitchenSection, products: ["power-bank"] }]),
    ).toThrow(/power-bank.*kitchen/);
  });
});
