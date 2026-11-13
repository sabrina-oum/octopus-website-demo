import { z } from "zod";
import { comingSoonPath } from "@/navigation";
import categoriesJson from "./categories.json";
import homepageJson from "./homepage.json";
import productsJson from "./products.json";
import {
  categoriesSchema,
  homepageSchema,
  productsSchema,
  type CardTexts,
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
  ProductFeature,
  ProductSpecItem,
  GalleryBlock,
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

function withCardText(
  shown: Product[],
  cardText: CardTexts | undefined,
  place: string,
): Product[] {
  for (const id of Object.keys(cardText ?? {})) {
    if (!shown.some((product) => product.id === id)) {
      throw new Error(
        `Card text for product "${id}" but ${place} does not show it`,
      );
    }
  }

  return shown.map((product) => ({ ...product, ...cardText?.[product.id] }));
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
  const place = `the ${section.category} section`;
  const find = (ids: string[]) =>
    withCardText(
      ids.map((id) => findProduct(id, section.category, products)),
      section.cardText,
      place,
    );

  switch (section.layout) {
    case "featured-above":
    case "featured-beside": {
      const [featured, ...listed] = find([
        section.featured,
        ...section.products,
      ]);

      return {
        layout: section.layout,
        category,
        subheading: section.subheading,
        featured,
        image: section.image,
        products: listed,
      };
    }
    case "banner": {
      const [featured] = find([section.featured]);

      return {
        layout: section.layout,
        category,
        featured,
        image: section.image,
      };
    }
    case "cards":
      return {
        layout: section.layout,
        category,
        subheading: section.subheading,
        products: find(section.products),
      };
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
