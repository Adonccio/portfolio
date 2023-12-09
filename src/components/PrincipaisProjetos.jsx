import apple from '../assets/projetos/apple.png'
import amazon from '../assets/projetos/amazon.png'
import kritic from '../assets/projetos/kritic.png'
import lojaspa from '../assets/projetos/lojaspa.png'
import reactstock from '../assets/projetos/reactstock.jpg'
import CardProjeto1 from './CardProjeto1'
import CardProjeto2 from './CardProjeto2'

export default function PrincipaisProjetos () {
    return (
        <> 
        <section id="sectionProjetos">
        <div className="container techs">
            
        <h1 className="TitleTechs">
        Meus Principais Projetos
        </h1>
        <div className="projetos">
            <CardProjeto1 foto={apple} nome={'Apple Shop'} key={Math.random()*1000} techs={'ReactJS, NextJS, TypeScript, Bootstrap'} descricao={'Loja virtual da apple, com navegação em SPA feito com NextJS. '}
            link={'https://apple-shop-eight.vercel.app/'} repo={'https://github.com/Adonccio/AppleShop'}/>
            <CardProjeto2  foto={amazon} nome={'Amazon Prime Video App'} key={Math.random()*1000} techs={'React Native, TypeScript'} descricao={'Clone da interface do aplicativo do Amazon Prime Video'}
            repo={'https://github.com/Adonccio/Amazon-app'}/>
            <CardProjeto1 foto={lojaspa} nome={'Loja SPA'} key={Math.random()*1000} techs={'ReactJS, TypeScript, Bootstrap'} descricao={'Projeto de loja para prática de SPA com react'}
            repo={'https://github.com/Adonccio/loja-virtual-spa'} link={'https://loja-spa.vercel.app/'}/>
            <CardProjeto2  foto={kritic} nome={'App de Sinopse de Filmes'} key={Math.random()*1000} techs={'React Native, TypeScript'} descricao={'Aplicativo de busca de filmes utilizando React Native e API do TMDB.'}
            repo={'https://github.com/Adonccio/Amazon-app'}/>
            <CardProjeto1 foto={reactstock} nome={'Estoque com React'} key={Math.random()*1000} techs={'ReactJS, TypeScript'} descricao={'Projeto de estoque de loja utilizando React.'}
            repo={'https://github.com/Adonccio/React-stock' }link={'https://react-stock-kappa.vercel.app/'}/>
        </div>
            
            </div>
        </section>
        </>
    )
}