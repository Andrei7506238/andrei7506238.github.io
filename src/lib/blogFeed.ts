export type BlogPost = {
  id: string
  title: string
  link: string
  category: string
  excerpt: string
  published: string
  image?: string
}

export const BLOG_URL = 'https://andrei7506238.github.io/blog/'
const FEED_URL = `${BLOG_URL}rss.xml`
const CACHE_KEY = 'blog-feed-cache-v2'
const MAX_EXCERPT_LENGTH = 190
const FALLBACK_EXCERPT = 'Open the full article for the complete write-up.'
const MEDIA_RSS_NAMESPACE = 'http://search.yahoo.com/mrss/'

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const response = await fetch(FEED_URL)
  if (!response.ok) {
    throw new Error(`Unable to load blog feed (HTTP ${response.status})`)
  }

  return parseRssFeed(await response.text())
}

export function parseRssFeed(xmlText: string): BlogPost[] {
  const xml = new DOMParser().parseFromString(xmlText, 'application/xml')

  return Array.from(xml.querySelectorAll('item'))
    .map((item, index) => parseItem(item, index))
    .filter((post): post is BlogPost => post !== null)
}

function parseItem(item: Element, index: number): BlogPost | null {
  const title = childText(item, 'title')
  const link = childText(item, 'link') || childText(item, 'guid')
  if (!title || !link) {
    return null
  }

  const description = childText(item, 'description')
  const image = pickImage(item, description)

  return {
    id: `${link}-${index}`,
    title,
    link,
    category: childText(item, 'category') || 'Uncategorized',
    excerpt: description ? truncate(htmlToText(description), MAX_EXCERPT_LENGTH) : FALLBACK_EXCERPT,
    published: childText(item, 'pubDate'),
    ...(image ? { image } : {}),
  }
}

function childText(item: Element, tagName: string): string {
  return item.getElementsByTagName(tagName)[0]?.textContent?.trim() ?? ''
}

function pickImage(item: Element, descriptionHtml: string): string | undefined {
  const mediaNode = Array.from(item.children).find(
    (child) =>
      child.namespaceURI === MEDIA_RSS_NAMESPACE &&
      (child.localName === 'thumbnail' || child.localName === 'content'),
  )

  return (
    mediaNode?.getAttribute('url')?.trim() ||
    item.getElementsByTagName('enclosure')[0]?.getAttribute('url')?.trim() ||
    parseHtml(descriptionHtml).querySelector('img')?.getAttribute('src') ||
    undefined
  )
}

function parseHtml(html: string): Document {
  return new DOMParser().parseFromString(html, 'text/html')
}

function htmlToText(html: string): string {
  return (parseHtml(html).body.textContent ?? '').replace(/\s+/g, ' ').trim()
}

function truncate(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength - 3).trimEnd()}...` : text
}

export function readCachedPosts(): BlogPost[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(CACHE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter(isBlogPost) : []
  } catch {
    return []
  }
}

export function writeCachedPosts(posts: BlogPost[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(posts))
  } catch {
    // Ignore quota/storage errors; the cache is only a fast first paint.
  }
}

function isBlogPost(value: unknown): value is BlogPost {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const post = value as Record<string, unknown>
  return ['id', 'title', 'link', 'category', 'excerpt', 'published'].every((key) => typeof post[key] === 'string')
}
