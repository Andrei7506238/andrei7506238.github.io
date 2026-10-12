import { useTheme } from '../../hooks/useTheme'
import { ThemeToggle } from './ThemeToggle'

export function ThemeSwitcher() {
  const { theme, nextTheme, setTheme } = useTheme()

  if (theme === null || nextTheme === null) {
    // Same footprint as the real toggle, so nothing shifts once it hydrates.
    return <span className="theme-toggle theme-toggle-emoji" aria-hidden />
  }

  return <ThemeToggle theme={theme} nextTheme={nextTheme} onToggle={() => setTheme(nextTheme)} />
}
