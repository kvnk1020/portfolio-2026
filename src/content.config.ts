import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    framing_line: z.string(),
    company: z.string(),
    role: z.string(),
    timeline: z.string(),
    team: z.array(z.string()),
    thumbnail: z.string().optional().nullable(),
    pills: z.array(z.string()).default([]),
  }),
});

export const collections = { projects };
