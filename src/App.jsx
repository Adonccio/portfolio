import { useLayoutEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
    <section id="infos">
      
      <NavbarTop/>
        <section className='container'>
      <Infos/>
        </section>
    </section>
    <section>
      <About/>
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
