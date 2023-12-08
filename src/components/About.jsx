import eu from '../assets/Sem título.png'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect } from 'react'

export default function About () {
    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        
        gsap.set('.divfoto', {autoAlpha: 1})
        gsap.fromTo('.divfoto',
        {
           opacity: 0,
        //    xPercent: -50,
        //    visibility: 'hidden',
        //    overflow: 'hidden',
           ease: "power4",
        }, {
            opacity: 1,
           duration: 5,
           delay: 0.3,
        //    xPercent: -50,
           visibility: 'visible',
           overflow: 'visible',
           ease: "power4",
           scale: 1,
           objectFit: 'cover',

           scrollTrigger: {
            trigger: '.sobreMim',
        //   markers: true,
          start: 'top 350px',
          end: 'top 100px',
    
        }
            })
    }
    , [])

    return (
        <>
        <section id='sobreMim' >
            
        <div className="container sobreMimdiv">
        <h1 className='TitleSobre'>UM POUCO SOBRE MIM</h1>
        <div className="sobreMimItens">
            <div className="itensSobre">
            
            <p className='txtSobre'>
                Sou estudante de <span id="enfase2">Sistemas de Informação</span>.
                </p>
            <p className='txtSobre'>
                Meu foco de estudo é Frontend, porém também estudo Backend.
                </p>
            <p className='txtSobre'>
                Estou disposto a ter diferentes experiências de trabalho em estágio.
                </p>
        </div>
        <div className="divfoto">
        <img className='minhaFoto' src={eu} alt="" />

        </div><div className="itensSobre">
            
            <p className='txtSobre'>
                Minha previsão de formação é Julho de 2026.
                </p>
            <p className='txtSobre'>
                Tenho 23 anos.
                </p>
            <p className='txtSobre'>
                Possuo <span id="enfase2">inglês avançado</span>.
                </p>
        </div>
        </div>
        </div>
        </section>
        </>
    )
}