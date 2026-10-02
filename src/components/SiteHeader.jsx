import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { navigation } from '../data/portfolio'
import { useTheme } from '../hooks/useTheme'
import { useActiveSection } from '../hooks/useActiveSection'
import { useMediaQuery } from '../hooks/useMediaQuery'
import Icon from './ui/Icon'

const sectionIds = navigation.map((item) => item.id)

export default function SiteHeader() {
  const { t, i18n } = useTranslation()
  const [theme, toggleTheme] = useTheme()
  const [open, setOpen] = useState(false)
  const mobile = useMediaQuery('(max-width: 1000px)')
  const active = useActiveSection(sectionIds)
  const menuButton = useRef(null)

  useEffect(() => {
    if (!mobile) setOpen(false)
  }, [mobile])
  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === 'Escape' && open) { setOpen(false); menuButton.current?.focus() }
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [open])

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#infos" aria-label="Gustavo Adoncio">
            <span className="brand-mark" aria-hidden="true">
              <img src="/favicon.svg?v=2" width="43" height="43" alt="" />
            </span>
            <span className="brand-name">Gustavo Adoncio<span>DATA & SOFTWARE</span></span>
          </a>
          <nav id="site-navigation" className="site-nav" aria-label={t('nav.label')}
            data-open={open} aria-hidden={mobile && !open ? true : undefined}
            {...(mobile && !open ? { inert: '' } : {})}>
            <div className="nav-content">
              {navigation.map(({ key, id }) => (
                <a key={id} href={'#' + id} className={active === id ? 'nav-link active' : 'nav-link'}
                  aria-current={active === id ? 'location' : undefined}
                  onClick={() => setOpen(false)}>{t('nav.' + key)}</a>
              ))}
            </div>
          </nav>
          <div className="header-controls">
            <button className="language-button" aria-label={t('nav.language')}
              onClick={() => i18n.changeLanguage(i18n.resolvedLanguage === 'pt' ? 'en' : 'pt')}>
              <Icon name="globe" /><span>{i18n.resolvedLanguage === 'pt' ? 'EN' : 'PT'}</span>
            </button>
            <span className="control-divider" aria-hidden="true" />
            <button className="icon-button theme-toggle" onClick={toggleTheme}
              aria-label={t(theme === 'dark' ? 'nav.themeLight' : 'nav.themeDark')}>
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
            </button>
            <button ref={menuButton} className="icon-button menu-toggle" onClick={() => setOpen(!open)}
              aria-controls="site-navigation" aria-expanded={open} aria-label={t(open ? 'nav.close' : 'nav.menu')}>
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
      </header>
      {mobile && open && <button className="menu-backdrop" onClick={() => setOpen(false)}
        aria-label={t('nav.close')} tabIndex={-1} />}
      <a className={'back-to-top ' + (active ? 'visible' : '')} href="#infos" aria-label={t('contact.top')}>
        <Icon name="up" />
      </a>
    </>
  )
}
