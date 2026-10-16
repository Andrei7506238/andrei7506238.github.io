import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

/** One MDX file per case study; the file name becomes the route, e.g. lua-rover.mdx -> /lua-rover/. */
const caseStudies = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/case-studies' }),
  schema: z.object({
    /** Browser tab and link preview title. */
    title: z.string(),
    description: z.string(),
    /** Path under public/, used as the link preview image. */
    image: z.string(),
    hero: z.object({
      eyebrow: z.string(),
      title: z.string(),
      lead: z.string(),
      /** Path under public/. */
      image: z.object({ src: z.string(), alt: z.string() }).optional(),
      /** Shown before the "Back to projects" button every case study gets. */
      ctas: z
        .array(z.object({ label: z.string(), href: z.string(), variant: z.enum(['primary', 'ghost']).optional() }))
        .default([]),
    }),
  }),
})

export const collections = { caseStudies }
