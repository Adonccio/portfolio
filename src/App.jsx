import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import SiteHeader from './components/SiteHeader'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import ErrorBoundary from './components/ui/ErrorBoundary'
import { useMetadata } from './hooks/useMetadata'
import { useSectionNavigation } from './hooks/useSectionNavigation'
import './i18n'
import './App.css'

const Projects = lazy(() => import('./components/Projects'))

export default function App() {
  const { t } = useTranslation()
  useMetadata()
  useSectionNavigation()
  return (
    <>
      <a className="skip-link" href="#main">{t('nav.skip')}</a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <section id="sectionProjetos" className="section projects-section" aria-label={t('projects.title')}>
          <div className="container">
            <ErrorBoundary message={t('common.error')} retry={t('common.retry')}>
              <Suspense fallback={<div className="section-fallback" role="status">{t('common.loading')}</div>}>
                <Projects />
              </Suspense>
            </ErrorBoundary>
          </div>
        </section>
        <Contact />
      </main>
    </>
  )
}
