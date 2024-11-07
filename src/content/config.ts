import { defineCollection, reference, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      image: image().refine((img) => img.width < 1200, {
        message: "Image should be less than 1200px wide",
      }),
      //relation
      //author: z.string(),
      author: reference("author"),
      //relation
      tags: z.array(z.string()),
      isDraft: z.boolean().default(false),
    }),
});

const authorCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image(),
      twitter: z.string(),
      linkedIn: z.string().url(),
      github: z.string().url(),
      bio: z.string(),
      subtitle: z.string(),
      //relation
      //logs: z.array(reference("blog")).optional(
    }),
});

export const collections = {
  blog: blogCollection,
  author: authorCollection,
};
