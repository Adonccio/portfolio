import { useLayoutEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarTop from './components/Navbar';
import Infos from './components/Infos';
import '../src/App.css'
import Projetos from './components/Techs';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import About from './components/About';
import Techs from './components/Techs';
import { Button } from 'reactstrap';
import PrincipaisTechs from './components/PrincipaisTechs';
import PrincipaisProjetos from './components/PrincipaisProjetos';
import Redes from './components/Redes';
import arrow from '../src/assets/arrow.png'



function App() {



  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to('.projetocard', {
      x: 0,
      opacity: 1,
      duration: 1,
      rotate: '0deg',
      scrollTrigger: {
        trigger: '.projetos',
      // markers: true,
      start: 'top 654px',
      end: 'bottom 1080px',
      // scrub: true,

    }
    })

    return () => {
      gsap.killTweensOf('.projetocard')
    }
  }, [])


  return (
    <>
    <button id='botaoVoltar' onClick={() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }}>
      <img id='arrow' src={arrow} alt="" />
    </button>
    <section id="infos">
      
      <NavbarTop/>
        <section className='container'>
      <Infos/>
        </section>
    </section>
    <section>
      <About/>
      {window.addEventListener( 'scroll', function() {
        var botao = document.querySelector('#botaoVoltar')
        botao.classList.toggle('active', window.scrollY > 600)
      })}
    </section>
    <section>
        <PrincipaisTechs/>
    
    </section>
    <section>
      <PrincipaisProjetos/>
    </section>
      <Redes/>
    </>
  )
}

export default App
