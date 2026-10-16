const basePath = import.meta.env.BASE_URL || '/'

/** Resolves a site-relative path ("images/x.png", "#skills") against the deploy base. */
export function withBase(path = ''): string {
  return `${basePath.replace(/\/?$/, '/')}${path.replace(/^\//, '')}`
}

export function isExternalUrl(href: string): boolean {
  return /^https?:\/\//.test(href)
}

/** A file under public/ ("images/x.png") resolved against the deploy base; full URLs pass through. */
export function assetUrl(src: string): string {
  return isExternalUrl(src) ? src : withBase(src)
}
