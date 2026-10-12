import { useSyncExternalStore } from 'react'
import { fetchBlogPosts, readCachedPosts, writeCachedPosts, type BlogPost } from '../lib/blogFeed'

type FeedState = {
  posts: BlogPost[]
  loading: boolean
}

// Also what the pre-rendered HTML shows; the feed itself is only ever loaded in the browser.
const INITIAL_STATE: FeedState = { posts: [], loading: true }

let state: FeedState | null = null
let requested = false
const listeners = new Set<() => void>()

function getSnapshot(): FeedState {
  if (state === null) {
    // Posts cached on the previous visit render first while the fresh feed loads.
    const cachedPosts = readCachedPosts()
    state = cachedPosts.length > 0 ? { posts: cachedPosts, loading: false } : INITIAL_STATE
  }

  return state
}

function setState(next: FeedState) {
  state = next
  listeners.forEach((listener) => listener())
}

function requestFeed() {
  if (requested) {
    return
  }
  requested = true

  fetchBlogPosts()
    .then((posts) => {
      writeCachedPosts(posts)
      setState({ posts, loading: false })
    })
    .catch(() => {
      // Keep whatever is already shown (cached posts or the empty state).
      setState({ ...getSnapshot(), loading: false })
    })
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  requestFeed()
  return () => {
    listeners.delete(listener)
  }
}

/** Loads the blog feed in the browser on every visit, so new posts appear without a rebuild. */
export function useBlogFeed(): FeedState {
  return useSyncExternalStore(subscribe, getSnapshot, () => INITIAL_STATE)
}
