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
  await expect(page.locator('.hero-occupation')).toContainText('desde junho de 2026')
  await expect(page.locator('.hero-occupation strong')).toHaveText('Engenheiro de Dados I')
  await expect(page.locator('.career-history')).toContainText('Agosto de 2024 — junho de 2026')
  await expect(page.locator('.career-history')).toContainText('Junho de 2026 — atual')
  await page.getByRole('button', { name: 'Mudar para inglês' }).click()
  await expect(page.locator('h1')).toContainText('Data Engineer.')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page).toHaveTitle(/Data Engineering and Software Development/)
  await expect(page.locator('#sobreMim')).toContainText('Information Systems')
  await expect(page.locator('.hero-occupation strong')).toHaveText('Data Engineer I')
  await expect(page.locator('#experiencia')).toContainText('Hibernate Reactive')
  await expect(page.locator('.career-history')).toContainText('August 2024 — June 2026')
  await page.reload()
  await expect(page.locator('h1')).toContainText('Data Engineer.')
  await expect(page.locator('.projects-grid .project-card')).toHaveCount(7)
  expect(errors).toEqual([])
})

test('theme changes persist without losing the current language', async ({ page }) => {
  await page.goto('/')
  const portrait = page.locator('.hero-art img')
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
