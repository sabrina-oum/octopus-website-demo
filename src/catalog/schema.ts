import { z } from "zod";

export const categorySchema = z.enum([
  "kitchen",
  "home-security",
  "hair-care",
  "accessories",
]);

export const productSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(1),
  category: categorySchema,
  shortDescription: z.string().min(1),
  image: z.string().min(1),
  bestSeller: z.boolean(),
});

export const productsSchema = z.array(productSchema);

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

export const heroSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  cta: z.object({
    label: z.string().min(1),
    href: sitePathSchema,
  }),
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

export const homepageSchema = z.object({
  seo: seoSchema,
  hero: heroSchema,
});

export type Category = z.infer<typeof categorySchema>;
export type Product = z.infer<typeof productSchema>;
export type HeroContent = z.infer<typeof heroSchema>;
export type HeroVideo = z.infer<typeof heroVideoSchema>;
export type Homepage = z.infer<typeof homepageSchema>;
