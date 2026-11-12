import { z } from "zod";
import { comingSoonPath } from "@/navigation";
import categoriesJson from "./categories.json";
import homepageJson from "./homepage.json";
import productsJson from "./products.json";
import {
  categoriesSchema,
  homepageSchema,
  productsSchema,
  type Category,
  type CategorySectionContent,
  type CategorySectionData,
  type CategoryTileData,
  type CategoryTileContent,
  type ExploreCategoriesData,
  type Homepage,
  type Product,
  type Seo,
  type SeoImage,
} from "./schema";

export type {
  PhotoCrops,
  Category,
  CategoryTileData,
  CategoryTileContent,
  ExploreCategoriesData,
  FindUsContent,
  CategorySectionContent,
  CategorySectionData,
  FeaturedSectionData,
  BannerSectionData,
  CardsSectionData,
  HeroContent,
  HeroVideo,
  Homepage,
  Product,
  ProductColor,
  ProductContent,
  Seo,
  SeoImage,
} from "./schema";

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

/** Not in Zod: categories are in another file. */
function findCategory(id: string, categories: Category[]): Category {
  const category = categories.find((candidate) => candidate.id === id);

  if (!category) {
    throw new Error(`Category "${id}" does not exist`);
  }

  return category;
}

export function parseCategories(raw: unknown): Category[] {
  return parseWith(categoriesSchema, raw, "category");
}

function productPath(slug: string): string {
  return `/products/${slug}`;
}

export function parseProducts(raw: unknown, categories: Category[]): Product[] {
  const products = parseWith(productsSchema, raw, "product");

  return products.map((product) => ({
    ...product,
    category: findCategory(product.category, categories),
    href: productPath(product.slug),
  }));
}

export function parseHomepage(raw: unknown): Homepage {
  return parseWith(homepageSchema, raw, "homepage");
}

export async function getCategories(): Promise<Category[]> {
  return parseCategories(categoriesJson);
}

export async function getProducts(): Promise<Product[]> {
  return parseProducts(productsJson, await getCategories());
}

export async function getBestSellers(): Promise<Product[]> {
  const products = await getProducts();

  return products.filter((product) => product.bestSeller);
}

export async function getProductSlugs(): Promise<string[]> {
  const products = await getProducts();

  return products.map(({ slug }) => slug);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const products = await getProducts();

  return products.find((product) => product.slug === slug);
}

export function buildProductSeo(product: Product, defaultImage: SeoImage): Seo {
  return {
    title: product.seo?.title ?? product.name,
    description: product.seo?.description ?? product.shortDescription,
    image: product.seo?.image ?? defaultImage,
  };
}

export async function getProductSeo(product: Product): Promise<Seo> {
  const { seo } = await getHomepage();

  return buildProductSeo(product, seo.image);
}

export async function getHomepage(): Promise<Homepage> {
  return parseHomepage(homepageJson);
}

function findProduct(
  id: string,
  category: string,
  products: Product[],
): Product {
  const product = products.find((candidate) => candidate.id === id);

  if (!product) {
    throw new Error(`Product "${id}" does not exist`);
  }

  if (product.category.id !== category) {
    throw new Error(`Product "${id}" is not in the ${category} category`);
  }

  return product;
}

function buildCategorySection(
  section: CategorySectionContent,
  products: Product[],
  categories: Category[],
): CategorySectionData {
  const category = findCategory(section.category, categories);
  const find = (id: string) => findProduct(id, section.category, products);

  switch (section.layout) {
    case "featured-above":
    case "featured-beside":
      return {
        ...section,
        category,
        featured: find(section.featured),
        products: section.products.map(find),
      };
    case "banner":
      return { ...section, category, featured: find(section.featured) };
    case "cards":
      return { ...section, category, products: section.products.map(find) };
  }
}

export function buildCategorySections(
  sections: CategorySectionContent[],
  products: Product[],
  categories: Category[],
): CategorySectionData[] {
  return sections.map((section) =>
    buildCategorySection(section, products, categories),
  );
}

export async function getCategorySections(): Promise<CategorySectionData[]> {
  const [{ sections }, products, categories] = await Promise.all([
    getHomepage(),
    getProducts(),
    getCategories(),
  ]);

  return buildCategorySections(sections, products, categories);
}

export function buildCategoryTiles(
  tiles: CategoryTileContent[],
  categories: Category[],
): CategoryTileData[] {
  return tiles.map((tile) => ({
    ...tile,
    category: findCategory(tile.category, categories),
    href: comingSoonPath,
  }));
}

export async function getExploreCategories(): Promise<ExploreCategoriesData> {
  const [{ exploreCategories }, categories] = await Promise.all([
    getHomepage(),
    getCategories(),
  ]);

  return {
    title: exploreCategories.title,
    tiles: buildCategoryTiles(exploreCategories.tiles, categories),
  };
}
