import { Button } from 'reactstrap'
import qr from '../assets/qr.png'
import redes from '../assets/redes.png'

import 'bootstrap/dist/css/bootstrap.min.css';
export default function Redes () {
    return (<>
    <section className="sectionRedes">

        <div className="container">
            <h1 className="TitleRedes">Redes Sociais</h1><div className="botoesRedes">
                
                <Button
                    className='botaoredes'
                    color="success"
                    outline>
                    <a className='linkRedes' color="success" target="_blank" href="">LinkedIn</a>
                      </Button><Button
                    className='botaoredes'
                    color="success"
                    outline>
                    <a className='linkRedes' color="success" target="_blank" href="">Github</a>
                      </Button><Button
                    className='botaoredes'
                    color="success"
                    outline>
                    <a className='linkRedes' color="success" target="_blank" href="">Instagram</a>
                      </Button><Button
                    className='botaoredes'
                    color="success"
                    outline>
                    <a className='linkRedes' color="success" target="_blank" href="https://wa.me/qr/4VT4ZU67TWIBI1">WhatApp</a>
                      </Button>
            </div>
            <h2>gustavoadoncio@gmail.com</h2>
            <div className="redesImg">
                
                <div className="whatsappDiv">
                    <h2 className='wppText'>Fale diretamente comigo no Whatsapp</h2>
                    <img className='qr' src={qr} alt="" />
                </div>
                <img className='redesSociaisImg' src={redes} alt="" />
            </div>
        </div>
        </section>
    </>)
}