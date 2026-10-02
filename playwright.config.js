import { defineConfig } from '@playwright/test'

const targetUrl = process.env.PLAYWRIGHT_BASE_URL

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: targetUrl || 'http://127.0.0.1:5173',
    channel: 'chrome',
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
    trace: 'retain-on-failure'
  },
  webServer: targetUrl ? undefined : {
    command: 'npm run dev -- --host 127.0.0.1 --port 5173 --strictPort',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI
  }
})
