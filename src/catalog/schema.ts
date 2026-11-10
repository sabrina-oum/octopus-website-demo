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

export type Category = z.infer<typeof categorySchema>;
export type Product = z.infer<typeof productSchema>;
