import type { Category, Product } from "@/catalog";

export const kitchen: Category = { id: "kitchen", name: "Kitchen" };

export function makeProduct(overrides: Partial<Product> = {}): Product {
  const id = overrides.id ?? "countertop-blender";

  return {
    id,
    slug: id,
    name: "Octopus Countertop Blender",
    category: kitchen,
    shortDescription: "Blends everything.",
    image: `/images/products/${id}.png`,
    bestSeller: false,
    description: "Blends everything, then rinses its own jug.",
    colors: [{ name: "Black", hex: "#000000" }],
    href: `/products/${id}`,
    ...overrides,
  };
}
