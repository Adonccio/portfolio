import { chromium } from '@playwright/test'
import { mkdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
await mkdir(root + '/artifacts', { recursive: true })
const browser = await chromium.launch({ channel: 'chrome' })
try {
  for (const [name, width, height, theme, language] of [
    ['desktop-dark', 1440, 1000, 'dark', 'pt'],
    ['desktop-light', 1440, 1000, 'light', 'pt'],
    ['mobile-dark', 390, 844, 'dark', 'pt'],
    ['tablet-light', 768, 1024, 'light', 'en']
  ]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' })
    await page.addInitScript(({ theme, language }) => {
      localStorage.setItem('portfolio-theme', theme)
      localStorage.setItem('portfolio-language', language)
    }, { theme, language })
    await page.goto('http://127.0.0.1:5173/')
    await page.locator('.project-card').last().waitFor()
    for (const id of ['sobreMim', 'experiencia', 'techsSection', 'sectionProjetos', 'contato']) {
      await page.locator('#' + id).scrollIntoViewIfNeeded()
    }
    await page.evaluate(async () => {
      const images = [...document.images].filter((image) => !image.closest('details:not([open])')); images.forEach((image) => { image.loading = 'eager' }); await Promise.all(images.map((image) => image.decode().catch(() => {})))
      window.scrollTo(0, 0)
    })
    await page.waitForFunction(() => !document.querySelector('.nav-link.active'))
    await page.screenshot({ path: root + '/artifacts/' + name + '.png' })
    await page.screenshot({ path: root + '/artifacts/' + name + '-full.png', fullPage: true })
    console.log('Captured ' + name)
    await page.close()
  }
  const brandMark = await readFile(root + '/public/favicon.svg', 'utf8')
  const card = await browser.newPage({ viewport: { width: 1200, height: 630 } })
  await card.setContent(`<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8">
    <style>*{box-sizing:border-box}body{margin:0;background:#0c0f14;color:#f1f4ee;font-family:'Segoe UI',sans-serif;padding:70px 80px;height:630px;position:relative;overflow:hidden}
    .brand{width:52px;height:52px;margin-bottom:39px}.brand svg{display:block;width:100%;height:100%}
    .name{font-size:23px;margin-bottom:20px;color:#a5aebb}h1{font-size:65px;font-weight:600;line-height:1.08;letter-spacing:-3px;margin:0;max-width:900px}h1 span{display:block;color:#b6a0ff;margin-top:9px}
    p{font-size:18px;color:#a5aebb;margin-top:30px}.line{width:70px;height:3px;background:#ccf381;margin-bottom:25px}
    .orb{position:absolute;right:-70px;top:-150px;width:500px;height:500px;border:1px solid #302742;border-radius:50%;z-index:-1}.orb:after{content:'';position:absolute;inset:50px;border:inherit;border-radius:inherit}
    .foot{position:absolute;bottom:50px;left:80px;right:80px;border-top:1px solid #2a323d;padding-top:20px;display:flex;justify-content:space-between;font:12px Consolas,monospace;color:#858f9e;letter-spacing:1px}
    </style></head><body><div class="orb"></div><div class="brand">${brandMark}</div><div class="line"></div><div class="name">Gustavo Adoncio</div>
    <h1>Engenheiro de Dados.<span>Desenvolvedor de Software.</span></h1><p>Engenheiro de Dados desde junho de 2026.</p>
    <div class="foot"><span>EDS · EXTREME DIGITAL SOLUTIONS</span><span>SISTEMAS DE INFORMAÇÃO</span></div></body></html>`)
  await card.screenshot({ path: root + '/public/social-card.png' })
  console.log('Generated public/social-card.png')
} finally {
  await browser.close()
}
