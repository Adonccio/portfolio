import { useEffect, useState, useSyncExternalStore } from 'react'
import { savePreference } from '../utils/storage'

function subscribeTheme(onChange) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

export function useThemeValue() {
  return useSyncExternalStore(subscribeTheme, () => document.documentElement.dataset.theme || 'dark')
}

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
