import { useState, type CSSProperties } from 'react'
import { useBlogFeed } from '../../hooks/useBlogFeed'
import { BLOG_URL, type BlogPost } from '../../lib/blogFeed'
import { cx } from '../../lib/classNames'
import './BlogSection.css'

const ALL_POSTS = 'all'
const MAX_COMPACT_POSTS = 2

const dateFormatter = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' })

function formatCategoryLabel(category: string): string {
  return category
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function formatPublishedDate(value: string): string {
  const parsed = new Date(value)
  return value && !Number.isNaN(parsed.getTime()) ? dateFormatter.format(parsed) : ''
}

function mediaStyle(post: BlogPost): CSSProperties | undefined {
  if (!post.image) {
    return undefined
  }

  return {
    backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.08), rgba(15, 23, 42, 0.72)), url(${post.image})`,
  }
}

export function BlogSection() {
  const { posts, loading } = useBlogFeed()
  const [activeCategory, setActiveCategory] = useState(ALL_POSTS)

  const categories = [ALL_POSTS, ...new Set(posts.map((post) => post.category.toLowerCase()))]
  const selectedCategory = categories.includes(activeCategory) ? activeCategory : ALL_POSTS
  const visiblePosts =
    selectedCategory === ALL_POSTS
      ? posts
      : posts.filter((post) => post.category.toLowerCase() === selectedCategory)

  const [featuredPost, ...otherPosts] = visiblePosts

  return (
    <section className="section blog-section" id="blog" aria-labelledby="blog-title">
      <div className="section-header blog-section-header">
        <div>
          <h2 id="blog-title">Technical blog</h2>
          <p className="section-subtitle">Latest essays, engineering notes and longer-form thinking.</p>
        </div>
        <a className="blog-archive-link" href={BLOG_URL} target="_blank" rel="noreferrer">
          View archive
        </a>
      </div>

      {loading ? (
        <p className="blog-feed-state">Loading latest posts...</p>
      ) : posts.length === 0 ? (
        <p className="blog-feed-state">No posts found right now.</p>
      ) : (
        <>
          <div className="blog-filters" role="tablist" aria-label="Blog categories">
            {categories.map((category) => {
              const isActive = category === selectedCategory

              return (
                <button
                  key={category}
                  type="button"
                  className={cx('blog-filter-chip', isActive && 'is-active')}
                  onClick={() => setActiveCategory(category)}
                  role="tab"
                  aria-selected={isActive}
                >
                  {category === ALL_POSTS ? 'All posts' : formatCategoryLabel(category)}
                </button>
              )
            })}
          </div>

          {featuredPost ? (
            <div className="blog-layout">
              <FeaturedPostCard post={featuredPost} />
              <div className="blog-side-rail">
                {otherPosts.slice(0, MAX_COMPACT_POSTS).map((post) => (
                  <CompactPostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          ) : (
            <p className="blog-feed-state">No posts found for this category.</p>
          )}
        </>
      )}
    </section>
  )
}

function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <a className="blog-featured-card" href={post.link} target="_blank" rel="noreferrer">
      <div className="blog-featured-media" style={mediaStyle(post)} aria-hidden="true" />
      <div className="blog-featured-overlay">
        <h3 className="blog-featured-title">{post.title}</h3>
        <p className="blog-featured-excerpt">{post.excerpt}</p>
        <div className="blog-featured-footer">
          <span className="blog-read-link">Read article</span>
        </div>
      </div>
    </a>
  )
}

function CompactPostCard({ post }: { post: BlogPost }) {
  return (
    <a className="blog-compact-card" href={post.link} target="_blank" rel="noreferrer">
      <div className="blog-compact-body">
        <p className="blog-category">{formatCategoryLabel(post.category)}</p>
        <h3 className="blog-title">{post.title}</h3>
        <p className="blog-compact-date">{formatPublishedDate(post.published)}</p>
      </div>
    </a>
  )
}
