import { z } from "zod";

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

const categoryIdSchema = slugSchema;

export const categorySchema = z.object({
  id: categoryIdSchema,
  name: z.string().min(1),
});

function rejectRepeated(
  values: string[],
  field: string,
  label: string,
  ctx: z.RefinementCtx,
): void {
  const seen = new Set<string>();

  values.forEach((value, index) => {
    if (seen.has(value)) {
      ctx.addIssue({
        code: "custom",
        path: [index, field],
        message: `${label} "${value}" is listed twice`,
      });
    }
    seen.add(value);
  });
}

export const categoriesSchema = z
  .array(categorySchema)
  .superRefine((categories, ctx) =>
    rejectRepeated(
      categories.map(({ id }) => id),
      "id",
      "Category",
      ctx,
    ),
  );

const sitePathSchema = z
  .string()
  .regex(/^\/(?!\/)/, "Expected a path on this site, starting with /");

const seoImageSchema = z.object({
  src: sitePathSchema,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().min(1),
});

export const seoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: seoImageSchema,
});

const hexColorSchema = z
  .string()
  .regex(/^#[0-9a-f]{6}$/i, "Expected a #rrggbb color");

export const colorSchema = z.object({
  name: z.string().min(1),
  hex: hexColorSchema,
});

const imageSchema = z.object({ src: sitePathSchema, alt: z.string() });

const galleryPhotoSchema = z.object({
  type: z.literal("photo"),
  image: imageSchema.extend({ alt: z.string().min(1) }),
});

const featureSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  /** Empty alt when the photo only illustrates the title. */
  image: imageSchema,
});

const featuresBlockSchema = z.object({
  type: z.literal("features"),
  features: z.array(featureSchema).min(1),
});

export const galleryBlockSchema = z.discriminatedUnion("type", [
  galleryPhotoSchema,
  featuresBlockSchema,
]);

export const productSchema = z.object({
  id: z.string().min(1),
  slug: slugSchema,
  name: z.string().min(1),
  category: categoryIdSchema,
  shortDescription: z.string().min(1),
  image: z.string().min(1),
  bestSeller: z.boolean(),
  description: z.string().min(1),
  colors: z
    .array(colorSchema)
    .min(1)
    .superRefine((colors, ctx) =>
      rejectRepeated(
        colors.map(({ name }) => name),
        "name",
        "Color",
        ctx,
      ),
    ),
  /** Photos and feature cards under the hero, in page order. */
  gallery: z.array(galleryBlockSchema).optional(),
  /** Optional, field by field. Missing fields use the name, short description and site share image. */
  seo: seoSchema.partial().optional(),
});

const productIdSchema = productSchema.shape.id;

export const productsSchema = z
  .array(productSchema)
  .superRefine((products, ctx) => {
    rejectRepeated(
      products.map(({ id }) => id),
      "id",
      "Product",
      ctx,
    );
    rejectRepeated(
      products.map(({ slug }) => slug),
      "slug",
      "Slug",
      ctx,
    );
  });

export const heroVideoSchema = z.object({
  /** 9:16, below tablet. */
  portrait: sitePathSchema,
  /** 16:9, tablet and up. */
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

export const photoCropsSchema = z.object({
  mobile: sitePathSchema,
  tablet: sitePathSchema,
  desktop: sitePathSchema,
  alt: z.string(),
  /** Colour behind the text. */
  backdrop: hexColorSchema,
});

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
      rejectRepeated(
        tiles.map(({ category }) => category),
        "category",
        "Category",
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
export type ProductColor = z.infer<typeof colorSchema>;
export type Seo = z.infer<typeof seoSchema>;
export type SeoImage = z.infer<typeof seoImageSchema>;
export type GalleryBlock = z.infer<typeof galleryBlockSchema>;
export type ProductFeature = z.infer<typeof featureSchema>;
export type ProductContent = z.infer<typeof productSchema>;
export type Product = Omit<ProductContent, "category"> & {
  category: Category;
  href: string;
};
export type HeroContent = z.infer<typeof heroSchema>;
export type HeroVideo = z.infer<typeof heroVideoSchema>;
export type Homepage = z.infer<typeof homepageSchema>;
export type PhotoCrops = z.infer<typeof photoCropsSchema>;
export type CategorySectionContent = z.infer<typeof categorySectionSchema>;
export type CategoryTileContent = z.infer<typeof categoryTileSchema>;
export type FindUsContent = z.infer<typeof findUsSchema>;

export type CategoryTileData = Omit<CategoryTileContent, "category"> & {
  category: Category;
  href: string;
};

export type ExploreCategoriesData = {
  title: string;
  tiles: CategoryTileData[];
};

export type FeaturedSectionData = {
  layout: "featured-above" | "featured-beside";
  category: Category;
  subheading: string;
  featured: Product;
  image: PhotoCrops;
  products: Product[];
};

export type BannerSectionData = {
  layout: "banner";
  category: Category;
  featured: Product;
  image: PhotoCrops;
};

export type CardsSectionData = {
  layout: "cards";
  category: Category;
  subheading: string;
  products: Product[];
};

export type CategorySectionData =
  FeaturedSectionData | BannerSectionData | CardsSectionData;
