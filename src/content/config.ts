import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!README.md'], base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    excerpt: z.string(),
    featured: z.boolean().optional().default(false),
    readTime: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
