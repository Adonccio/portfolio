import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export function useMetadata() {
  const { t, i18n } = useTranslation()
  useEffect(() => {
    const english = i18n.resolvedLanguage === 'en'
    document.documentElement.lang = english ? 'en' : 'pt-BR'
    document.title = t('metadata.title')
    for (const [selector, key] of [
      ['meta[name="description"]', 'metadata.description'],
      ['meta[property="og:title"]', 'metadata.title'],
      ['meta[property="og:description"]', 'metadata.description'],
      ['meta[name="twitter:title"]', 'metadata.title'],
      ['meta[name="twitter:description"]', 'metadata.description']
    ]) document.querySelector(selector)?.setAttribute('content', t(key))
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', english ? 'en_US' : 'pt_BR')
  }, [t, i18n.resolvedLanguage])
}
