import { z } from "zod";

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

/** A category's id, as products and sections reference it. */
const categoryIdSchema = slugSchema;

export const categorySchema = z.object({
  id: categoryIdSchema,
  name: z.string().min(1),
});

/** Flags a category id that appears twice in a list. */
function rejectRepeatedCategories(
  ids: string[],
  field: string,
  ctx: z.RefinementCtx,
): void {
  const seen = new Set<string>();

  ids.forEach((id, index) => {
    if (seen.has(id)) {
      ctx.addIssue({
        code: "custom",
        path: [index, field],
        message: `Category "${id}" is listed twice`,
      });
    }
    seen.add(id);
  });
}

export const categoriesSchema = z
  .array(categorySchema)
  .superRefine((categories, ctx) =>
    rejectRepeatedCategories(
      categories.map(({ id }) => id),
      "id",
      ctx,
    ),
  );

export const productSchema = z.object({
  id: z.string().min(1),
  slug: slugSchema,
  name: z.string().min(1),
  category: categoryIdSchema,
  shortDescription: z.string().min(1),
  image: z.string().min(1),
  bestSeller: z.boolean(),
  hasPage: z.boolean().default(false),
});

function productPath(slug: string): string {
  return `/products/${slug}`;
}

/** Adds `href`: the product's own page, or else the first product page. */
export const productsSchema = z
  .array(productSchema)
  .transform((products, ctx) => {
    const fallback = products.find(({ hasPage }) => hasPage);

    if (!fallback) {
      ctx.issues.push({
        code: "custom",
        input: products,
        message: "At least one product needs a product page to link to",
      });

      return z.NEVER;
    }

    return products.map((product) => ({
      ...product,
      href: productPath(product.hasPage ? product.slug : fallback.slug),
    }));
  });

const sitePathSchema = z
  .string()
  .regex(/^\/(?!\/)/, "Expected a path on this site, starting with /");

export const heroVideoSchema = z.object({
  /** 9:16 cut, played below the tablet breakpoint. */
  portrait: sitePathSchema,
  /** 16:9 cut, played from the tablet breakpoint up. */
  landscape: sitePathSchema,
  poster: sitePathSchema.optional(),
});

const ctaSchema = z.object({
  label: z.string().min(1),
  href: sitePathSchema,
});

export const heroSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  cta: ctaSchema,
  video: heroVideoSchema.optional(),
});

export const seoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.object({
    src: sitePathSchema,
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    alt: z.string().min(1),
  }),
});

const hexColorSchema = z
  .string()
  .regex(/^#[0-9a-f]{6}$/i, "Expected a #rrggbb color");

export const photoCropsSchema = z.object({
  mobile: sitePathSchema,
  tablet: sitePathSchema,
  desktop: sitePathSchema,
  alt: z.string(),
  /** The photo's tone, behind the text. */
  backdrop: hexColorSchema,
});

const productIdSchema = productSchema.shape.id;

const featuredSectionSchema = z.object({
  layout: z.enum(["featured-above", "featured-beside"]),
  category: categoryIdSchema,
  subheading: z.string().min(1),
  featured: productIdSchema,
  image: photoCropsSchema,
  products: z.array(productIdSchema),
});

const bannerSectionSchema = z.object({
  layout: z.literal("banner"),
  category: categoryIdSchema,
  featured: productIdSchema,
  image: photoCropsSchema,
});

const cardsSectionSchema = z.object({
  layout: z.literal("cards"),
  category: categoryIdSchema,
  subheading: z.string().min(1),
  products: z.array(productIdSchema).min(1),
});

export const categorySectionSchema = z.discriminatedUnion("layout", [
  featuredSectionSchema,
  bannerSectionSchema,
  cardsSectionSchema,
]);

const categoryTileSchema = z.object({
  category: categoryIdSchema,
  image: sitePathSchema,
});

export const exploreCategoriesSchema = z.object({
  title: z.string().min(1),
  tiles: z
    .array(categoryTileSchema)
    .min(1)
    .superRefine((tiles, ctx) =>
      rejectRepeatedCategories(
        tiles.map(({ category }) => category),
        "category",
        ctx,
      ),
    ),
});

export const findUsSchema = z.object({
  title: z.string().min(1),
  cta: ctaSchema,
  image: photoCropsSchema,
});

export const homepageSchema = z.object({
  seo: seoSchema,
  hero: heroSchema,
  sections: z.array(categorySectionSchema),
  exploreCategories: exploreCategoriesSchema,
  findUs: findUsSchema,
});

export type Category = z.infer<typeof categorySchema>;
/** A product as stored: its category is only an id. */
export type ProductContent = z.output<typeof productsSchema>[number];
/** A product with its category's name resolved from the categories data. */
export type Product = ProductContent & { categoryName: string };
export type HeroContent = z.infer<typeof heroSchema>;
export type HeroVideo = z.infer<typeof heroVideoSchema>;
export type Homepage = z.infer<typeof homepageSchema>;
export type PhotoCrops = z.infer<typeof photoCropsSchema>;
export type CategorySectionContent = z.infer<typeof categorySectionSchema>;
export type CategoryTileContent = z.infer<typeof categoryTileSchema>;
export type FindUsContent = z.infer<typeof findUsSchema>;

/** A tile with its category name and link resolved. */
export type CategoryTileData = CategoryTileContent & {
  categoryName: string;
  href: string;
};

export type ExploreCategoriesData = {
  title: string;
  tiles: CategoryTileData[];
};

/** A section with its category name and products resolved from their ids. */
export type FeaturedSectionData = {
  layout: "featured-above" | "featured-beside";
  category: string;
  categoryName: string;
  subheading: string;
  featured: Product;
  image: PhotoCrops;
  products: Product[];
};

export type BannerSectionData = {
  layout: "banner";
  category: string;
  categoryName: string;
  featured: Product;
  image: PhotoCrops;
};

export type CardsSectionData = {
  layout: "cards";
  category: string;
  categoryName: string;
  subheading: string;
  products: Product[];
};

export type CategorySectionData =
  FeaturedSectionData | BannerSectionData | CardsSectionData;
