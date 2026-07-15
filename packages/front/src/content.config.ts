import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

import { postsLoader } from './loaders/posts';
import { zennLoader } from './loaders/zenn';

const dateString = z
  .union([z.string(), z.date()])
  .transform(value => (value instanceof Date ? value.toISOString() : value));

const markdownSchema = z.object({
  title: z.string(),
  emoji: z.string().optional(),
  type: z.string().nullish(),
  topics: z
    .array(z.string())
    .nullish()
    .transform(value => value ?? []),
  published: z.boolean().default(false),
  createat: dateString.optional(),
  updateat: dateString.optional(),
  steam: z.string().optional(),
  sourceFileType: z.enum(['posts', 'steam', 'zenn']),
  slug: z.string().optional(),
  externalUrl: z.string().optional(),
});

const posts = defineCollection({
  loader: postsLoader(),
  schema: markdownSchema,
});

const zenn = defineCollection({
  loader: zennLoader(),
  schema: markdownSchema,
});

const products = defineCollection({
  loader: glob({
    pattern: '*/product.yml',
    base: './content/product',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      links: z.array(z.object({ name: z.string(), href: z.string() })),
      featured: z.boolean().default(false),
    }),
});

export const collections = { posts, zenn, products };
