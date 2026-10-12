const basePath = import.meta.env.BASE_URL || '/'

/** Resolves a site-relative path ("images/x.png", "#skills") against the deploy base. */
export function withBase(path = ''): string {
  return `${basePath.replace(/\/?$/, '/')}${path.replace(/^\//, '')}`
}

/** URL builder for one image folder under public/images/. */
export function imageFolder(folder: string) {
  return (file: string) => withBase(`images/${folder}/${file}`)
}

export function isExternalUrl(href: string): boolean {
  return /^https?:\/\//.test(href)
}
