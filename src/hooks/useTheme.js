import { useEffect, useState } from 'react'
import { savePreference } from '../utils/storage'

export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0c0f14' : '#f7f8f4')
    savePreference('portfolio-theme', theme)
  }, [theme])
  return [theme, () => setTheme((current) => current === 'dark' ? 'light' : 'dark')]
}
