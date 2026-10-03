import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import portraitArt from '../assets/hero-portrait.webp'
import portraitArtDark from '../assets/hero-portrait-dark.webp'
import { useThemeValue } from '../hooks/useTheme'
import DataFlow from './DataFlow'
import Icon from './ui/Icon'

export default function Hero() {
  const { t } = useTranslation()
  const theme = useThemeValue()
  const ref = useRef(null)
  useReveal(ref, '', true)
  return (
    <section id="infos" className="hero" ref={ref} aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow" data-reveal><span className="small-line" />{t('hero.eyebrow')}</p>
            <p className="hero-intro" data-reveal>{t('hero.intro')}</p>
            <h1 id="hero-title" data-reveal>{t('hero.titleFirst')}<span>{t('hero.titleSecond')}</span></h1>
            <p className="hero-description" data-reveal>{t('hero.description')}</p>
            <div className="hero-actions" data-reveal>
              <a className="button button-primary" href="#sectionProjetos">{t('hero.projects')}<Icon name="arrow" /></a>
              <a className="button button-secondary" href="#experiencia">{t('hero.experience')}<Icon name="right" /></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="orb orb-one" aria-hidden="true" />
            <div className="orb orb-two" aria-hidden="true" />
            <figure className="hero-art" data-reveal>
              <div className="hero-art-motion" data-float>
                <img src={theme === 'dark' ? portraitArtDark : portraitArt} alt={t('hero.portraitArt')} width="960" height="1152"
                  loading="eager" decoding="async" />
              </div>
            </figure>
          </div>
        </div>
        <div className="hero-capabilities">
          <DataFlow />
        </div>
      </div>
    </section>
  )
}
