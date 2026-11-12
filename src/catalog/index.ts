import { z } from "zod";
import homepageJson from "./homepage.json";
import productsJson from "./products.json";
import {
  homepageSchema,
  productsSchema,
  type Category,
  type CategorySectionContent,
  type CategorySectionData,
  type Homepage,
  type Product,
} from "./schema";

export type {
  PhotoCrops,
  Category,
  CategorySectionContent,
  CategorySectionData,
  FeaturedSectionData,
  BannerSectionData,
  CardsSectionData,
  HeroContent,
  HeroVideo,
  Homepage,
  Product,
} from "./schema";

export const categoryLabels: Record<Category, string> = {
  kitchen: "Kitchen",
  "home-security": "Home Security",
  "hair-care": "Hair Care",
  accessories: "Accessories",
};

function parseWith<T>(
  schema: z.ZodType<T, unknown>,
  raw: unknown,
  label: string,
): T {
  const result = schema.safeParse(raw);

  if (!result.success) {
    throw new Error(`Invalid ${label} data:\n${z.prettifyError(result.error)}`);
  }

  return result.data;
}

export function parseProducts(raw: unknown): Product[] {
  return parseWith(productsSchema, raw, "product");
}

export function parseHomepage(raw: unknown): Homepage {
  return parseWith(homepageSchema, raw, "homepage");
}

export async function getProducts(): Promise<Product[]> {
  return parseProducts(productsJson);
}

export async function getProductsWithPage(): Promise<Product[]> {
  const products = await getProducts();

  return products.filter((product) => product.hasPage);
}

export async function getBestSellers(): Promise<Product[]> {
  const products = await getProducts();

  return products.filter((product) => product.bestSeller);
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  const products = await getProducts();

  return products.find((product) => product.slug === slug);
}

export async function getHomepage(): Promise<Homepage> {
  return parseHomepage(homepageJson);
}

/** Checked here, not in Zod: it spans the homepage and product data. */
function findProduct(
  id: string,
  category: Category,
  products: Product[],
): Product {
  const product = products.find((candidate) => candidate.id === id);

  if (!product) {
    throw new Error(`Product "${id}" does not exist`);
  }

  if (product.category !== category) {
    throw new Error(`Product "${id}" is not in the ${category} category`);
  }

  return product;
}

function buildCategorySection(
  section: CategorySectionContent,
  products: Product[],
): CategorySectionData {
  const find = (id: string) => findProduct(id, section.category, products);

  switch (section.layout) {
    case "featured-above":
    case "featured-beside":
      return {
        ...section,
        featured: find(section.featured),
        products: section.products.map(find),
      };
    case "banner":
      return { ...section, featured: find(section.featured) };
    case "cards":
      return { ...section, products: section.products.map(find) };
  }
}

export function buildCategorySections(
  sections: CategorySectionContent[],
  products: Product[],
): CategorySectionData[] {
  return sections.map((section) => buildCategorySection(section, products));
}

export async function getCategorySections(): Promise<CategorySectionData[]> {
  const [{ sections }, products] = await Promise.all([
    getHomepage(),
    getProducts(),
  ]);

  return buildCategorySections(sections, products);
}
