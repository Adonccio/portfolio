import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { loadAnimations } from '../utils/animations'
import Icon from './ui/Icon'

const stages = [
  { id: 'database', icon: 'database', technologies: ['Oracle', 'PostgreSQL', 'SQL / PL/SQL'] },
  { id: 'backend', icon: 'terminal', technologies: ['Java', 'Quarkus', 'Hibernate Reactive'] },
  { id: 'frontend', icon: 'code', technologies: ['Vue.js', 'React', 'JavaScript'] },
  { id: 'deployment', icon: 'tools', technologies: ['Docker', 'Git'] }
]

export default function DataFlow() {
  const { t } = useTranslation()
  const [stage, setStage] = useState('database')
  const detailRef = useRef(null)
  const selected = stages.find((item) => item.id === stage)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let disposed = false
    let context
    loadAnimations().then((gsap) => {
      if (disposed) return
      context = gsap.context(() => {
        gsap.fromTo(detailRef.current, { y: 9, opacity: 0.4 }, {
          y: 0, opacity: 1, duration: 0.35, ease: 'power2.out', clearProps: 'transform,opacity'
        })
      }, detailRef)
    }).catch(() => {})
    return () => { disposed = true; context?.revert() }
  }, [stage])

  return (
    <div className="flow-card" data-reveal>
      <div className="flow-topline"><Icon name="code" /><span>{t('flow.label')}</span></div>
      <div className="flow-heading"><h2>{t('flow.title')}</h2></div>
      <div className="flow-diagram">
        <div className="flow-stages" role="group" aria-label={t('flow.hint')}>
          {stages.map(({ id, icon }, index) => (
            <button key={id} className={'flow-stage stage-' + id} aria-pressed={stage === id}
              onClick={() => setStage(id)} aria-controls="flow-description">
              <span className="stage-index" aria-hidden="true">0{index + 1}</span>
              <Icon name={icon} />
              <span className="stage-name">{t('flow.stages.' + id + '.label')}</span>
              {index < 3 && <span className={'stage-connector connector-' + id} aria-hidden="true">
                <Icon name={id === 'backend' ? 'down' : 'right'} />
              </span>}
            </button>
          ))}
        </div>
      </div>
      <div className="flow-detail" id="flow-description" aria-live="polite" aria-atomic="true">
        <div ref={detailRef}>
          <div className="flow-detail-heading"><Icon name={selected.icon} />
            <h3>{t('flow.stages.' + stage + '.title')}</h3></div>
          <p>{t('flow.stages.' + stage + '.description')}</p>
          <ul className="tag-list">{selected.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>
        </div>
      </div>
    </div>
  )
}
