import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { satteri } from '@astrojs/markdown-satteri'
import caseStudyLayout from './src/lib/caseStudyLayout.mjs'

const base = '/'

export default defineConfig({
  site: 'https://andrei7506238.github.io',
  base,
  integrations: [react(), mdx(), sitemap()],
  markdown: {
    processor: satteri({ hastPlugins: [caseStudyLayout({ base })] }),
    // Same background as the case study code panels.
    shikiConfig: { theme: 'github-dark-default' },
  },
})
