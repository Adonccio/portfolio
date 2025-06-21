import foto from '../assets/HOME.png'
import '../App.css'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { Button } from 'reactstrap'
import { useTranslation, Trans } from 'react-i18next'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Infos () {
  const { t, i18n } = useTranslation()

  const style = {
    words: {
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
    }
  }

  const Letter = ({ space, letter }) => {
    return (
      <h1 className="text">
        {space ? '\u00A0' : letter}
      </h1>
    )
  }

  useEffect(() => {
    gsap.set('.text', {
      y: 100,
      autoAlpha: 0
    })

    gsap.to('.text', {
      y: 0,
      autoAlpha: 1,
      stagger: 0.05,
      duration: 0.6,
      ease: 'power2.out'
    })
  }, [i18n.language])

  return (
    <>
      <h1 id='hello'>{t('infos.hello')}</h1>

      <span className='gustavo' style={style.words}>
        {
          t('infos.name').split('').map((char, i) =>
            <Letter key={i} space={char === ' '} letter={char} />
          )
        }
      </span>

      <h1 id="hello2">{t('infos.welcome')}</h1>

      <div id="infos-home">
        <div id="textos">
          <p>
            <Trans i18nKey="infos.description1" components={{ 1: <span id="enfase" /> }} />
          </p>
          <p>{t('infos.description2')}</p>
          <p>{t('infos.description3')}</p>

          <Button className='botaoinicial' color="success" outline  href="#sobreMim"> {t('infos.button')} </Button>
        </div>

        <div id='fotodiv'>
          <img id="foto" src={foto} alt="" />
          <div className="circlePurple"></div>
          <div className="circleGreen"></div>
        </div>
      </div>
    </>
  )
}
