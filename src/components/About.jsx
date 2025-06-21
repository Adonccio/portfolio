import eu from '../assets/foto_perfil.jpg'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import { useTranslation, Trans } from 'react-i18next'


export default function About() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const fotoWrapperRef = useRef(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.set(fotoWrapperRef.current, { visibility: 'visible' })

      gsap.fromTo(
        imgRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 2,
          delay: 0.3,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: imgRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="sobreMim">
      <div className="container sobreMimdiv" ref={sectionRef}>
        <h1 className="TitleSobre">{t('aboutTitle')}</h1>

        <div className="sobreMimItens">
          <div className="itensSobre">
            <p className="txtSobre">
              <Trans i18nKey="left1">
                Sou desenvolvedor <span id="enfase2">full stack</span>.
              </Trans>
            </p>
            <p className="txtSobre">{t('left2')}</p>
            <p className="txtSobre">{t('left3')}</p>
          </div>

          <div className="divfoto" ref={fotoWrapperRef}>
            <img
              className="minhaFoto"
              ref={imgRef}
              src={eu}
              alt={t('aboutTitle')}
            />
          </div>

          <div className="itensSobre">
            <p className="txtSobre">{t('right1')}</p>
            <p className="txtSobre">{t('right2')}</p>
            <p className="txtSobre">
              <Trans i18nKey="right3">
                Possuo <span id="enfase2">inglês avançado</span> e experiência com conversação.
              </Trans>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
