import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { skillGroups } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import SectionHeading from './ui/SectionHeading'
import Icon from './ui/Icon'

export default function Skills() {
  const { t, i18n } = useTranslation()
  const ref = useRef(null)
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState(false)
  useReveal(ref, filter)
  const groups = skillGroups.filter((group) => filter === 'all' || group.id === filter)

  return (
    <section id="techsSection" className="section skills-section" ref={ref} aria-label={t('skills.title')}>
      <div className="container">
        <SectionHeading eyebrow={t('skills.eyebrow')} title={t('skills.title')} description={t('skills.description')} />
        <div className="filter-list" role="group" aria-label={t('skills.filterLabel')} data-reveal>
          {['all', ...skillGroups.map((group) => group.id)].map((id) => (
            <button key={id} className={'filter-button ' + (filter === id ? 'selected' : '')}
              aria-pressed={filter === id} onClick={() => setFilter(id)}>
              {t(id === 'all' ? 'skills.all' : 'skills.groups.' + id + '.title')}
            </button>
          ))}
        </div>
        <div className="skills-grid" id="skill-cards">
          {groups.map((group) => (
            <article className={'skill-card skill-' + group.id} key={group.id} data-reveal>
              <div className="skill-heading"><span className="skill-icon"><Icon name={group.icon} /></span>
                <h3>{t('skills.groups.' + group.id + '.title')}</h3></div>
              <p>{t('skills.groups.' + group.id + '.description')}</p>
              <ul className="tag-list">
                {(expanded ? group.technologies : group.technologies.slice(0, 6)).map((tech) => (
                  <li key={tech}>{tech === 'Modelagem de dados' && i18n.resolvedLanguage === 'en' ? 'Data modeling' : tech}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        {(filter === 'all' || filter === 'front') && (
          <button className="text-link skills-expand" onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded} aria-controls="skill-cards">
            {t(expanded ? 'skills.hide' : 'skills.show')}<Icon name={expanded ? 'up' : 'down'} />
          </button>
        )}
        <div className="skill-concepts" data-reveal>
          <p className="mono">{t('skills.concepts')}</p>
          <ul>{t('skills.conceptList', { returnObjects: true }).map((concept) => <li key={concept}><Icon name="check" />{concept}</li>)}</ul>
        </div>
      </div>
    </section>
  )
}
