import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date().or(z.string().transform((val) => new Date(val))),
    updatedDate: z.date().or(z.string().transform((val) => new Date(val))).optional(),
    category: z.enum(['pingce', 'jiaocheng', 'tools', 'risk', 'guide']),
    tags: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
    faq: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ).optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};

