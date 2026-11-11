import { z } from "zod";
import homepageJson from "./homepage.json";
import productsJson from "./products.json";
import {
  homepageSchema,
  productsSchema,
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

function parseWith<T>(schema: z.ZodType<T>, raw: unknown, label: string): T {
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

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  const products = await getProducts();

  return products.find((product) => product.slug === slug);
}

export async function getHomepage(): Promise<Homepage> {
  return parseHomepage(homepageJson);
}
