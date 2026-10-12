import { useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const listeners = new Set<() => void>()

// The initial data-theme is set by the inline script in BaseLayout before first paint,
// so the DOM attribute is the source of truth here.
function readTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function setTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  try {
    window.localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Ignore storage errors; the theme still applies for this page view.
  }
  listeners.forEach((listener) => listener())
}

export function useTheme() {
  // null while rendering at build time, so the static HTML doesn't guess the visitor's theme.
  const theme = useSyncExternalStore<Theme | null>(subscribe, readTheme, () => null)
  const nextTheme: Theme | null = theme === null ? null : theme === 'light' ? 'dark' : 'light'

  return {
    theme,
    setTheme,
    nextTheme,
  }
}

export type { Theme }
