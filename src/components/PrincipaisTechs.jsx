
import react from '../assets/techreact.png'
import native from '../assets/technative.png'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Techs from './Techs';

export default function PrincipaisTechs () {
    
  const [conteudoRenderizado, setConteudoRenderizado] = useState(null);
  const [ estadoBotao, setestadoBotao ] = useState('Mostrar Todas Tecnologias')

    return (<>
    <section  className='techsSection'>
        <div className="container">
    <h1 className='TitleTechs'>Tecnologias em Foco</h1>
    <div className="tecnologias">
        
        <img src={react} alt="" className='reactfoto'/>
        <img src={native} alt="" className='nativefoto'/>
    </div>
    <p className='txtTechs'>
        Apesar da minha curiosidade para estudar diversas tecnologias, meus estudos principais são focados em React para desenvolvimento Web e React Native para desenvolvimento Mobile.
        Veja abaixo todas tecnologias com que tenho familiaridade.
    </p>
    <div>
      <Button
    className='botaotechs'
    color="success"
    outline onClick={() => {
        conteudoRenderizado ===null  ?
        setConteudoRenderizado(<Techs/>) & setestadoBotao('Esconder Tecnologias') : setConteudoRenderizado(null) & setestadoBotao('Mostrar Todas Tecnologias');
      }}>
        {estadoBotao}
      </Button>
      {conteudoRenderizado}
    </div>
    </div>
    </section>
    </>
    )
        
}