import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
    }),
});

const frontpage = defineCollection({
  type: "data",
  schema: () =>
    z.object({
      name: z.string().default(SITE.author),
      phone: z.string(),
      email: z.string(),
      title: z.string(),
      street: z.string(),
      city: z.string(),
      zip: z.string(),
      country: z.string(),
      nationality: z.string(),
    }),
});

export const collections = { blog, frontpage };
