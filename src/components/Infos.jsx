import foto from '../assets/HOME.png'
import '../App.css'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { Button } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Infos () {
    const style = {
        wrapper: {
         height: '30vh',
         width: '90vw',
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: 'black',
        },
        words:{
         display: 'flex',
         flexDirection: 'row',
         overflow: 'hidden',
         
        },
        letter:{
            fontSize: 58,
            color: 'rgb(204, 243, 129)',
            letterSpacing: 6,
            fontWeight: 'bold'
           }
       }

       const Letter = ({space, letter}) => {
        return(
         space == true ?
          <h1 className="text">&nbsp;</h1>
          :
          <h1 className="text" style={style.letter}>{letter}</h1>
        )
       }
       
       useEffect(() => {
        let textAnimation = gsap.to('.text', {
         y: 0,
         stagger: 0.2,
         delay: 0.5,
         duration: .8,
         x: 0,
        });
       }, []);

    return(
    <><h1 id='hello'>
            Olá, me chamo

    </h1>
        <h1 className='gustavo'  style={style.words}>
 {
  'Gustavo Adoncio,'.split('').map((i) =>
   i == ' ' ?
   <Letter space={true} key={Math.random()} letter={i}/>
   :
   <Letter space={false} key={Math.random()} letter={i}/>
  )}
</h1>
<h1 id="hello2">
    Seja bem-vindo ao meu porfolio!
</h1>
<div id="infos-home">
    <div id="textos">
        <p>
            Sou estudante de programação e desenvolvimento web com ênfase em <span id='enfase'>React, React Native e NodeJS</span>. Passo meus dias e noites estudando novas tecnologias e oportunidades de progredir na minha carreira profissional.
        </p>
        <p>
            Gosto de estudar todas as partes de um desenvolvimento.
        </p>
        <p>
            Estudar inglês é um dos meus hobbies!
        </p>
    
        <Button
    className='botaoinicial'
    color="success"
    outline
  >
    <a id='venha' href="#sobreMim">
    Venha me conhecer!</a>
  </Button>
    </div>
    <div id='fotodiv'>
        <img id="foto" src={foto} alt="" />
        <div className="circlePurple"></div>
        <div className="circleGreen"></div>
    </div>

</div>


    </>)
}