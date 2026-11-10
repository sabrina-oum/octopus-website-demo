import { z } from "zod";
import productsJson from "./products.json";
import { productsSchema, type Product } from "./schema";

export type { Category, Product } from "./schema";

export function parseProducts(raw: unknown): Product[] {
  const result = productsSchema.safeParse(raw);

  if (!result.success) {
    throw new Error(`Invalid product data:\n${z.prettifyError(result.error)}`);
  }

  return result.data;
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
