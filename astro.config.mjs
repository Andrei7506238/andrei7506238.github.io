import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://andrei7506238.github.io',
  base: '/',
  integrations: [react(), sitemap()],
})
