import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { contactLinks, email } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import qr from '../assets/qr.png'
import Icon from './ui/Icon'

export default function Contact() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const [copyStatus, setCopyStatus] = useState('')
  useReveal(ref)
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(email); setCopyStatus('copied') }
    catch { setCopyStatus('copyError') }
  }
  return (
    <section id="contato" className="contact-section" ref={ref} aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-copy">
            <p className="eyebrow" data-reveal>{t('contact.eyebrow')}</p>
            <h2 id="contact-title" data-reveal>{t('contact.title')}</h2>
            <p className="contact-description" data-reveal>{t('contact.description')}</p>
            <a className="button button-primary" href={'mailto:' + email} data-reveal>{t('contact.email')}<Icon name="arrow" /></a>
          </div>
          <div className="contact-panel" data-reveal>
            <span className="contact-panel-label mono">GUSTAVO ADONCIO</span>
            <div className="email-row"><a href={'mailto:' + email}>{email}</a>
              <button className="icon-button" onClick={copyEmail} aria-label={t('contact.copy')}>
                <Icon name={copyStatus === 'copied' ? 'check' : 'copy'} /></button></div>
            <p className="copy-status" role="status">{copyStatus ? t('contact.' + copyStatus) : '\u00A0'}</p>
            <div className="contact-links" aria-label={t('contact.socialLabel')}>
              {contactLinks.map((link) => <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer">
                <Icon name={link.icon} />{link.label}<Icon name="arrow" /></a>)}
            </div>
            <details className="contact-qr"><summary>{t('contact.whatsapp')}<Icon name="down" /></summary>
              <a href={contactLinks.at(-1).url} target="_blank" rel="noopener noreferrer">
                <img src={qr} alt={t('contact.qr')} width="160" height="160" loading="lazy" /></a></details>
          </div>
        </div>
        <footer className="site-footer">
          <span>© {new Date().getFullYear()} Gustavo Adoncio</span>
          <span>{t('contact.footer')}</span>
          <a href="#infos">{t('contact.top')}<Icon name="up" /></a>
        </footer>
      </div>
    </section>
  )
}
