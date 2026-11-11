import { z } from "zod";
import homepageJson from "./homepage.json";
import productsJson from "./products.json";
import {
  homepageSchema,
  productsSchema,
  type Category,
  type Homepage,
  type Product,
} from "./schema";

export type {
  Category,
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
