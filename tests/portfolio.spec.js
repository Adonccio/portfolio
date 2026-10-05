import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { readFileSync } from 'node:fs'

function keys(value, prefix = '') {
  return Object.entries(value).flatMap(([key, entry]) => {
    const path = prefix ? prefix + '.' + key : key
    return entry && typeof entry === 'object' ? keys(entry, path) : path
  }).sort()
}

test('translations expose the same content in both languages', () => {
  const pt = JSON.parse(readFileSync(new URL('../src/locales/pt.json', import.meta.url), 'utf8'))
  const en = JSON.parse(readFileSync(new URL('../src/locales/en.json', import.meta.url), 'utf8'))
  expect(keys(en)).toEqual(keys(pt))
})

test('professional profile, language, metadata and preferences are consistent', async ({ page }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('Engenheiro de Dados.')
  await expect(page.locator('#sobreMim')).toContainText('Sistemas de Informação')
  await expect(page.locator('#experiencia')).toContainText('EDS (Extreme Digital Solutions)')
  await expect(page.locator('.experience-summary > h3')).toHaveText('Engenheiro de Dados I')
  await expect(page.locator('.career-history')).toContainText('Agosto de 2024 — junho de 2026')
  await expect(page.locator('.career-history')).toContainText('Junho de 2026 — atual')
  await page.getByRole('button', { name: 'Mudar para inglês' }).click()
  await expect(page.locator('h1')).toContainText('Data Engineer.')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page).toHaveTitle(/Data Engineering and Software Development/)
  await expect(page.locator('#sobreMim')).toContainText('Information Systems')
  await expect(page.locator('.experience-summary > h3')).toHaveText('Data Engineer I')
  await expect(page.locator('#experiencia')).toContainText('Hibernate Reactive')
  await expect(page.locator('.career-history')).toContainText('August 2024 — June 2026')
  await page.reload()
  await expect(page.locator('h1')).toContainText('Data Engineer.')
  await expect(page.locator('.projects-grid .project-card')).toHaveCount(7)
  expect(errors).toEqual([])
})

test('theme changes persist without losing the current language', async ({ page }) => {
  await page.goto('/')
  const portrait = page.locator('.hero-art-base')
  const lightPortrait = await portrait.getAttribute('src')
  await page.getByRole('button', { name: 'Usar tema escuro' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(portrait).not.toHaveAttribute('src', lightPortrait)
  await portrait.evaluate(image => image.decode())
  const darkPortrait = await portrait.getAttribute('src')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(portrait).toHaveAttribute('src', darkPortrait)
  await page.getByRole('button', { name: 'Usar tema claro' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(portrait).toHaveAttribute('src', lightPortrait)
  await portrait.evaluate(image => image.decode())
  await expect(page.locator('h1')).toContainText('Engenheiro de Dados.')
})

test('portrait reveal follows the mouse on the artistic half and resets on exit', async ({ page }) => {
  await page.goto('/')
  const portrait = page.locator('.hero-portrait')
  await expect(portrait).toHaveAttribute('data-photo-ready', 'true')
  await portrait.scrollIntoViewIfNeeded()
  const bounds = await portrait.boundingBox()
  await page.mouse.move(bounds.x + bounds.width * 0.35, bounds.y + bounds.height * 0.4)
  await expect(portrait).toHaveAttribute('data-revealing', 'true')
  await expect(portrait.locator('.hero-art-reveal')).toHaveCSS('opacity', '1')
  const firstPosition = await portrait.evaluate(element => element.style.getPropertyValue('--reveal-y'))
  await page.mouse.move(bounds.x + bounds.width * 0.3, bounds.y + bounds.height * 0.6)
  await expect.poll(() => portrait.evaluate(element => element.style.getPropertyValue('--reveal-y')))
    .not.toBe(firstPosition)
  await page.mouse.move(bounds.x + bounds.width * 0.75, bounds.y + bounds.height * 0.4)
  await expect(portrait).not.toHaveAttribute('data-revealing')
  await expect(portrait.locator('.hero-art-reveal')).toHaveCSS('opacity', '0')
  await page.mouse.move(bounds.x + bounds.width * 0.35, bounds.y + bounds.height * 0.4)
  await expect(portrait).toHaveAttribute('data-revealing', 'true')
  await page.mouse.move(0, 0)
  await expect(portrait).not.toHaveAttribute('data-revealing')
  await expect(portrait.locator('.hero-art-reveal')).toHaveCSS('opacity', '0')
})

test('clicking the portrait keeps the reveal local in both themes', async ({ page }) => {
  await page.goto('/')
  const portrait = page.locator('.hero-portrait')
  await expect(portrait).toHaveAttribute('data-photo-ready', 'true')
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark') await page.getByRole('button', { name: 'Usar tema escuro' }).click()
    const bounds = await portrait.boundingBox()
    await portrait.click({ position: { x: bounds.width * 0.3, y: bounds.height * 0.4 } })
    await expect(portrait.locator('.hero-art-base')).toHaveCSS('opacity', '1')
    await expect(portrait.locator('.hero-art-reveal')).not.toHaveCSS('mask-image', 'none')
    await expect(portrait).not.toHaveAttribute('aria-pressed')
    await page.mouse.move(0, 0)
    await expect(portrait.locator('.hero-art-reveal')).toHaveCSS('opacity', '0')
  }
})

test('touch leaves the artistic portrait intact and does not reveal the full photo', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 844 }, hasTouch: true, reducedMotion: 'reduce' })
  try {
    const page = await context.newPage()
    await page.goto('/')
    const portrait = page.locator('.hero-portrait')
    await expect(portrait).toHaveAttribute('data-photo-ready', 'true')
    await portrait.scrollIntoViewIfNeeded()
    await portrait.dispatchEvent('pointermove', { pointerType: 'touch', clientX: 120, clientY: 300 })
    await expect(portrait).not.toHaveAttribute('data-revealing')
    await portrait.tap()
    await expect(portrait.locator('.hero-art-base')).toHaveCSS('opacity', '1')
    await expect(portrait.locator('.hero-art-reveal')).toHaveCSS('opacity', '0')
    await expect(portrait).not.toHaveAttribute('aria-pressed')
  } finally {
    await context.close()
  }
})

test('development stages, skills and projects respond to independent filters', async ({ page }) => {
  await page.goto('/')
  await page.locator('.flow-stages').getByRole('button', { name: 'Implantação', exact: true }).click()
  await expect(page.locator('#flow-description')).toContainText('Implantação e manutenção de aplicações')
  await page.locator('#techsSection').getByRole('button', { name: 'Front-end', exact: true }).click()
  await expect(page.locator('.skill-card')).toHaveCount(1)
  await page.getByRole('button', { name: 'Mostrar todas as tecnologias' }).click()
  await expect(page.locator('.skill-card')).toContainText('i18next')
  await page.locator('#sectionProjetos').getByRole('button', { name: 'Dados', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(2)
  await expect(page.locator('.project-card').first()).toContainText('vendas globais')
  await page.locator('#sectionProjetos').getByRole('button', { name: 'Todos', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(7)
})

test('image previews close with Escape and restore keyboard focus', async ({ page }) => {
  await page.goto('/')
  const preview = page.getByRole('button', { name: 'Ver imagem do projeto: Apple Shop' })
  await preview.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('dialog').locator('img')).toHaveAttribute('alt', 'Apple Shop')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(preview).toBeFocused()
})

test('the development panel covers database, back-end, front-end and deployment', async ({ page }) => {
  await page.goto('/')
  const panel = page.locator('.flow-card')
  await expect(panel.getByRole('button')).toHaveCount(4)
  for (const [label, technology] of [
    ['Banco de dados', 'Oracle'], ['Back-end', 'Quarkus'],
    ['Front-end', 'Vue.js'], ['Implantação', 'Docker']
  ]) {
    const button = panel.getByRole('button', { name: label, exact: true })
    await button.click()
    await expect(button).toHaveAttribute('aria-pressed', 'true')
    await expect(panel.locator('.flow-detail')).toContainText(technology)
    await expect(panel.getByRole('button', { pressed: true })).toHaveCount(1)
  }
})

test('reduced motion keeps the portrait static and section navigation immediate', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('navigation').getByRole('link', { name: 'Sobre', exact: true }).click()
  await expect(page.locator('#sobreMim')).toBeFocused()
  await expect(page.locator('.portrait-frame')).toHaveCSS('transform', 'none')
  await expect(page.locator('html')).not.toHaveAttribute('data-navigating')
})

for (const width of [320, 390, 768, 1024, 1440]) {
  test('layout fits viewport at ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await expect(page.locator('.project-card')).toHaveCount(7)
    for (const id of ['infos', 'sobreMim', 'experiencia', 'techsSection', 'sectionProjetos', 'contato']) {
      await page.locator('#' + id).scrollIntoViewIfNeeded()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy()
    }
    await expect(page.locator('h1')).toContainText('Engenheiro de Dados.')
  })
}

test('mobile navigation supports opening, Escape, section links and active state', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const menu = page.getByRole('button', { name: 'Abrir menu' })
  await menu.click()
  await expect(page.getByRole('navigation')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused()
  await expect(page.getByRole('navigation', { includeHidden: true })).toHaveAttribute('aria-hidden', 'true')
  await menu.click()
  await page.getByRole('navigation').getByRole('link', { name: 'Experiência', exact: true }).click()
  await expect(page).toHaveURL(/#experiencia$/)
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await menu.click()
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Experiência', exact: true })).toHaveAttribute('aria-current', 'location')
})

for (const theme of ['light', 'dark']) {
  test('accessibility scan in ' + theme + ' theme', async ({ page }) => {
    await page.addInitScript((value) => localStorage.setItem('portfolio-theme', value), theme)
    await page.goto('/')
    await expect(page.locator('.project-card')).toHaveCount(7)
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
    expect(results.violations).toEqual([])
  })
}

test.describe('normal motion', () => {
  test.use({ reducedMotion: 'no-preference' })
  test('portrait leaves a fading elliptical trail and clears it when motion is reduced', async ({ page }) => {
    await page.goto('/')
    const portrait = page.locator('.hero-portrait')
    await expect(portrait).toHaveAttribute('data-photo-ready', 'true')
    await portrait.scrollIntoViewIfNeeded()
    const restingArtMask = await portrait.locator('.hero-art-base').evaluate(element => getComputedStyle(element).maskImage)
    const bounds = await portrait.boundingBox()
    await page.mouse.move(bounds.x + bounds.width * 0.3, bounds.y + bounds.height * 0.35)
    await expect(portrait).toHaveAttribute('data-revealing', 'true')
    await page.mouse.move(bounds.x + bounds.width * 0.42, bounds.y + bounds.height * 0.47, { steps: 8 })
    await expect.poll(() => portrait.evaluate(element =>
      (element.style.getPropertyValue('--reveal-mask').match(/radial-gradient/g) || []).length
    )).toBeGreaterThan(1)
    const radii = await portrait.evaluate(element => ({
      x: parseFloat(element.style.getPropertyValue('--reveal-radius-x')),
      y: parseFloat(element.style.getPropertyValue('--reveal-radius-y'))
    }))
    expect(radii.x).toBeGreaterThan(45)
    expect(radii.x).toBeLessThanOrEqual(50)
    expect(radii.y).toBeGreaterThan(radii.x * 1.4)
    await expect(portrait.locator('.hero-art-base')).toHaveCSS('mask-image', restingArtMask)
    await page.mouse.move(0, 0)
    await expect(portrait).toHaveAttribute('data-revealing', 'true')
    await page.waitForTimeout(1800)
    await expect(portrait).toHaveAttribute('data-revealing', 'true')
    await expect(portrait).not.toHaveAttribute('data-revealing', { timeout: 2200 })
    await expect(portrait.locator('.hero-art-reveal')).toHaveCSS('opacity', '0')

    await page.mouse.move(bounds.x + bounds.width * 0.3, bounds.y + bounds.height * 0.35)
    await expect(portrait).toHaveAttribute('data-revealing', 'true')
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(portrait).not.toHaveAttribute('data-revealing')
    await page.mouse.move(bounds.x + bounds.width * 0.38, bounds.y + bounds.height * 0.45)
    await expect(portrait).toHaveAttribute('data-revealing', 'true')
    await page.mouse.move(0, 0)
    await expect(portrait).not.toHaveAttribute('data-revealing')
  })

  test('animations settle and stay usable after rapid language changes', async ({ page }) => {
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto('/')
    await page.getByRole('button', { name: 'Mudar para inglês' }).click()
    await page.getByRole('button', { name: 'Switch to Portuguese' }).click()
    await expect(page.locator('h1')).toHaveCSS('opacity', '1')
    await page.locator('#experiencia').scrollIntoViewIfNeeded()
    await expect(page.locator('.experience-item').first()).toHaveCSS('opacity', '1')
    expect(errors).toEqual([])
  })

  test('section navigation handles rapid changes, keyboard focus and browser history', async ({ page }) => {
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto('/')
    const navigation = page.getByRole('navigation')
    await navigation.getByRole('link', { name: 'Projetos', exact: true }).click()
    await navigation.getByRole('link', { name: 'Experiência', exact: true }).click()
    await expect(page.locator('#experiencia')).toBeFocused()
    await expect(page.locator('#experiencia .section-heading h2')).toHaveCSS('opacity', '1')
    await expect(page).toHaveURL(/#experiencia$/)
    await expect(page.locator('html')).not.toHaveAttribute('data-navigating')
    await navigation.getByRole('link', { name: 'Projetos', exact: true }).click()
    await expect(page.locator('#sectionProjetos')).toBeFocused()
    await navigation.getByRole('link', { name: 'Experiência', exact: true }).click()
    await expect(page.locator('#experiencia')).toBeFocused()
    await page.goBack()
    await expect(page).toHaveURL(/#sectionProjetos$/)
    await expect(navigation.getByRole('link', { name: 'Projetos', exact: true })).toHaveAttribute('aria-current', 'location')
    expect(errors).toEqual([])
  })

  test('user scrolling can cancel an animated section change', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('navigation').getByRole('link', { name: 'Contato', exact: true }).click()
    await expect(page.locator('html')).toHaveAttribute('data-navigating', 'true')
    await page.mouse.wheel(0, -250)
    await expect(page.locator('html')).not.toHaveAttribute('data-navigating')
    await expect(page.locator('html')).not.toHaveAttribute('style', /scroll-behavior: auto/)
  })

  test('the portrait floats while visible and stops with reduced motion', async ({ page }) => {
    await page.goto('/')
    const portrait = page.locator('.portrait-frame')
    await portrait.scrollIntoViewIfNeeded()
    await expect.poll(() => portrait.evaluate((element) =>
      new DOMMatrixReadOnly(getComputedStyle(element).transform).m42
    )).toBeLessThan(-0.2)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(portrait).toHaveCSS('transform', 'none')
  })
})
