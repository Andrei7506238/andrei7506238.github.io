# Andrei‑Robert Popa — Portfolio

This repository contains the source for my portfolio website. The live site is the best place to browse the portfolio:

Live site: https://andrei7506238.github.io/

If you were redirected here, follow the link above to view the website.


## Development

Built with [Astro](https://astro.build) and React. Every page is rendered to static HTML at build time; only the theme toggle, the blog feed and the footer ship JavaScript.

```sh
npm install
npm run dev      # local dev server
npm run check    # type-check
npm run lint
npm run build    # static site in dist/
```

## Deployment

Every push to `main` builds the site and publishes it to GitHub Pages through `.github/workflows/deploy.yml`.
