import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import portrait from '../assets/foto_perfil.webp'
import { useReveal } from '../hooks/useReveal'
import SectionHeading from './ui/SectionHeading'
import Icon from './ui/Icon'

export default function About() {
  const { t } = useTranslation()
  const ref = useRef(null)
  useReveal(ref)
  return (
    <section id="sobreMim" className="section about-section" ref={ref} aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="portrait-column" data-reveal>
          <div className="portrait-motion" data-parallax>
            <div className="portrait-frame" data-float>
              <img src={portrait} alt={t('about.portrait')} width="560" height="700" loading="lazy" decoding="async" />
              <div className="portrait-label"><span>GUSTAVO ADONCIO</span><Icon name="arrow" /></div>
            </div>
          </div>
        </div>
        <div className="about-copy">
          <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.title')} id="about-title" />
          <div className="about-paragraphs" data-reveal>
            {t('about.paragraphs', { returnObjects: true }).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="about-facts" data-reveal>
            <div><Icon name="book" /><p className="eyebrow">{t('about.educationLabel')}</p>
              <h4>{t('about.education')}</h4><p>{t('about.educationDetail')}</p></div>
            <div><Icon name="globe" /><p className="eyebrow">{t('about.languageLabel')}</p>
              <h4>{t('about.language')}</h4><p>{t('about.languageDetail')}</p></div>
          </div>
        </div>
      </div>
    </section>
  )
}
