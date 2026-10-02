import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import portraitArt from '../assets/hero-portrait.webp'
import DataFlow from './DataFlow'
import Icon from './ui/Icon'

export default function Hero() {
  const { t } = useTranslation()
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
            <a className="hero-occupation" href="#experiencia" data-reveal>
              <span className="status-dot" aria-hidden="true" />
              <span><strong>{t('hero.occupation')}</strong><span>{t('hero.company')}</span></span>
              <Icon name="arrow" />
            </a>
            <p className="hero-description" data-reveal>{t('hero.description')}</p>
            <div className="hero-actions" data-reveal>
              <a className="button button-primary" href="#sectionProjetos">{t('hero.projects')}<Icon name="arrow" /></a>
              <a className="button button-secondary" href="#experiencia">{t('hero.experience')}<Icon name="right" /></a>
            </div>
            <a className="hero-contact text-link" href="#contato" data-reveal>{t('hero.contact')}<Icon name="arrow" /></a>
          </div>
          <div className="hero-visual">
            <div className="orb orb-one" aria-hidden="true" />
            <div className="orb orb-two" aria-hidden="true" />
            <figure className="hero-art" data-reveal>
              <div className="hero-art-motion" data-float>
                <img src={portraitArt} alt={t('hero.portraitArt')} width="960" height="1152"
                  loading="eager" decoding="async" />
              </div>
            </figure>
          </div>
        </div>
        <div className="hero-capabilities">
          <DataFlow />
        </div>
        <div className="hero-bottom" data-reveal>
          <a href="#sobreMim"><Icon name="down" />{t('hero.scroll')}</a>
          <span>{t('hero.degree')}</span>
        </div>
      </div>
    </section>
  )
}
