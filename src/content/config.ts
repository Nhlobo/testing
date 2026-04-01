import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const solutions = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/solutions' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    icon: z.string(),
    description: z.string(),
    features: z.array(z.string()),
    category: z.string(),
    order: z.number(),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    category: z.string(),
    year: z.number(),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })),
    stack: z.array(z.string()),
    featured: z.boolean().optional(),
    image: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.date(),
    category: z.string(),
    description: z.string(),
    author: z.string().default('Nhlovo Mathebula'),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const industries = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/industries' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    icon: z.string(),
    description: z.string(),
    challenges: z.array(z.string()),
    solutions: z.array(z.string()),
    order: z.number(),
  }),
});

export const collections = { solutions, caseStudies, blog, industries };
