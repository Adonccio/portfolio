import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import { experienceStack } from '../data/portfolio'
import SectionHeading from './ui/SectionHeading'
import Icon from './ui/Icon'

const icons = ['layers', 'tools', 'database', 'terminal', 'code']
export default function Experience() {
  const { t } = useTranslation()
  const ref = useRef(null)
  useReveal(ref)
  return (
    <section id="experiencia" className="section experience-section" ref={ref} aria-label={t('experience.title')}>
      <div className="container">
        <SectionHeading eyebrow={t('experience.eyebrow')} title={t('experience.title')} />
        <div className="experience-layout">
          <div className="experience-summary" data-reveal>
            <span className="company-monogram" aria-hidden="true">eds<span>_</span></span>
            <h3>{t('experience.role')}</h3>
            <p className="company-name">{t('experience.company')}</p>
            <div className="career-history" aria-label={t('experience.historyLabel')}>
              {t('experience.positions', { returnObjects: true }).map((position, index) => (
                <div className={'career-position ' + (index === 0 ? 'current' : '')} key={position.role}>
                  {index === 0 && <span className="career-status">{t('experience.current')}</span>}
                  <h4>{position.role}</h4>
                  <p>{position.period}</p>
                </div>
              ))}
            </div>
            <p>{t('experience.summary')}</p>
            <ul className="tag-list" aria-label={t('experience.stackLabel')}>
              {experienceStack.map((tech) => <li key={tech}>{tech}</li>)}
            </ul>
          </div>
          <div className="experience-timeline">
            {t('experience.areas', { returnObjects: true }).map((area, index) => (
              <article className="experience-item" key={area.title} data-reveal>
                <span className="timeline-node"><Icon name={icons[index]} /></span>
                <div><span className="mono item-index">0{index + 1}</span><h3>{area.title}</h3><p>{area.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
