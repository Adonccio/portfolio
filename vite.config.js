import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const { VITE_SITE_URL: siteUrl } = loadEnv(mode, process.cwd(), 'VITE_')
  const canonical = siteUrl ? new URL(siteUrl) : null
  if (canonical && !['https:', 'http:'].includes(canonical.protocol)) {
    throw new Error('VITE_SITE_URL must be an HTTP or HTTPS URL')
  }
  const baseUrl = canonical?.href.replace(/\/$/, '')

  return {
    plugins: [
      react(),
      {
        name: 'portfolio-metadata',
        transformIndexHtml(html) {
          if (!baseUrl) return html
          return {
            html: html.replaceAll('content="/social-card.png"', 'content="' + baseUrl + '/social-card.png"'),
            tags: [
              { tag: 'link', attrs: { rel: 'canonical', href: baseUrl + '/' }, injectTo: 'head' },
              { tag: 'meta', attrs: { property: 'og:url', content: baseUrl + '/' }, injectTo: 'head' }
            ]
          }
        }
      }
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'i18n-vendor': ['i18next', 'react-i18next']
          }
        }
      }
    }
  }
})
