import react from '../assets/techreact.png';
import native from '../assets/technative.png';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Techs from './Techs';
import { useTranslation } from 'react-i18next';

export default function PrincipaisTechs() {
  const { t } = useTranslation();
  const [mostrarTechs, setMostrarTechs] = useState(false);

  const alternarTechs = () => {
    setMostrarTechs(!mostrarTechs);
  };

  return (
    <section id="techsSection">
      <div className="container">
        <h1 className="TitleTechs">{t('techs.title')}</h1>

        <div className="tecnologias">
          <img src={react} alt="React Logo" className="reactfoto" />
          <img src={native} alt="React Native Logo" className="nativefoto" />
        </div>

        <p className="txtTechs">
          {t('techs.description')}
        </p>

        <div>
          <Button
            className="botaotechs"
            color="success"
            outline
            onClick={alternarTechs}
          >
            {mostrarTechs ? t('techs.buttonHide') : t('techs.buttonShow')}
          </Button>

          {mostrarTechs && <Techs />}
        </div>
      </div>
    </section>
  );
}
