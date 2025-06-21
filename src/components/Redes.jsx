import { Button } from 'reactstrap'
import qr from '../assets/qr.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useTranslation } from 'react-i18next'

export default function Redes () {
  const { t } = useTranslation()

  return (
    <section className="sectionRedes">
      <div className="container">
        <h1 className="TitleRedes">{t('redes.title')}</h1>

        <div className="botoesRedes">
          <Button className='botaoredes' color="success" outline>
            <a className='linkRedes' target="_blank" href="https://www.linkedin.com/in/gustavo-adoncio-51a4a8276/">
              {t('redes.linkedin')}
            </a>
          </Button>

          <Button className='botaoredes' color="success" outline>
            <a className='linkRedes' target="_blank" href="https://github.com/Adonccio">
              {t('redes.github')}
            </a>
          </Button>

          <Button className='botaoredes' color="success" outline>
            <a className='linkRedes' target="_blank" href="https://www.instagram.com/adonccio/">
              {t('redes.instagram')}
            </a>
          </Button>

          <Button className='botaoredes' color="success" outline>
            <a className='linkRedes' target="_blank" href="https://wa.me/qr/4VT4ZU67TWIBI1">
              {t('redes.whatsapp')}
            </a>
          </Button>
        </div>

        <h2>{t('redes.email')}</h2>

        <div className="redesImg">
          <div className="whatsappDiv">
            <h2 className='wppText'>{t('redes.contact')}</h2>
            <img className='qr' src={qr} alt="QR Code WhatsApp" />
          </div>
        </div>
      </div>
    </section>
  )
}
