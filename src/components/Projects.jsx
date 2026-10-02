import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { projects } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import SectionHeading from './ui/SectionHeading'
import Icon from './ui/Icon'

export default function Projects() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const dialogRef = useRef(null)
  const [filter, setFilter] = useState('all')
  const [preview, setPreview] = useState(null)
  useReveal(ref, filter)
  const visible = projects.filter((project) => filter === 'all' || project.category === filter)

  const openPreview = (project, image = project.image) => {
    setPreview({ image, name: t('projects.items.' + project.id + '.name') })
    dialogRef.current?.showModal()
  }

  return (
    <div ref={ref}>
      <SectionHeading eyebrow={t('projects.eyebrow')} title={t('projects.title')} description={t('projects.description')} />
      <div className="project-toolbar" data-reveal>
        <div className="filter-list" role="group" aria-label={t('projects.filterLabel')}>
          {['all', 'web', 'mobile', 'data'].map((id) => (
            <button key={id} className={'filter-button ' + (filter === id ? 'selected' : '')}
              aria-pressed={filter === id} onClick={() => setFilter(id)}>{t('projects.' + id)}</button>
          ))}
        </div>
        <p className="mono project-count" role="status">{t('projects.count', { count: visible.length })}</p>
      </div>
      <div className="projects-grid">
        {visible.map((project) => {
          const name = t('projects.items.' + project.id + '.name')
          return (
            <article className={'project-card project-' + project.category} key={project.id} data-reveal>
              <button className="project-image-button" onClick={() => openPreview(project)}
                aria-label={t('projects.preview') + ': ' + name}>
                <img src={project.image} alt={name} width="800" height="500" loading="lazy" decoding="async" />
                <span className="image-open"><Icon name="search" /></span>
              </button>
              <div className="project-body">
                <div className="project-title-row"><h3>{name}</h3><span className="mono">{t('projects.' + project.category)}</span></div>
                <p>{t('projects.items.' + project.id + '.description')}</p>
                <ul className="tag-list">{project.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>
                <div className="project-links">
                  {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-link">
                    {t('projects.access')}<Icon name="arrow" /></a>}
                  {project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-link">
                    <Icon name="github" />{t('projects.repository')}</a>}
                  {project.detailImage && <button className="text-link" onClick={() => openPreview(project, project.detailImage)}>
                    {t('projects.gallery')}<Icon name="arrow" /></button>}
                </div>
              </div>
            </article>
          )
        })}
      </div>
      <dialog className="image-dialog" ref={dialogRef} aria-labelledby="preview-title"
        onClose={() => setPreview(null)} onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current.close()
        }}>
        {preview && <div className="dialog-content">
          <div className="dialog-heading"><h3 id="preview-title">{preview.name}</h3>
            <button className="icon-button" autoFocus onClick={() => dialogRef.current.close()} aria-label={t('common.close')}>
              <Icon name="close" /></button></div>
          <img src={preview.image} alt={preview.name} />
        </div>}
      </dialog>
    </div>
  )
}
