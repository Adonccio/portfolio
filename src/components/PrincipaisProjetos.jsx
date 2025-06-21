import apple from '../assets/projetos/apple.png'
import amazon from '../assets/projetos/amazon.png'
import kritic from '../assets/projetos/kritic.png'
import lojaspa from '../assets/projetos/lojaspa.png'
import reactstock from '../assets/projetos/reactstock.jpg'
import CardProjeto1 from './CardProjeto1'
import CardProjeto2 from './CardProjeto2'
import { useTranslation } from 'react-i18next'

export default function PrincipaisProjetos () {
  const { t } = useTranslation()

  return (
    <section id="sectionProjetos">
      <div className="container techs">
        <h1 className="TitleTechs">{t('projects.title')}</h1>
        <div className="projetos">
          <CardProjeto1
            foto={apple}
            nome={t('projects.apple.name')}
            techs="ReactJS, NextJS, TypeScript, Bootstrap"
            descricao={t('projects.apple.description')}
            link="https://apple-shop-eight.vercel.app/"
            repo="https://github.com/Adonccio/AppleShop"
          />
          <CardProjeto2
            foto={amazon}
            nome={t('projects.amazon.name')}
            techs="React Native, TypeScript"
            descricao={t('projects.amazon.description')}
            repo="https://github.com/Adonccio/Amazon-app"
          />
          <CardProjeto1
            foto={lojaspa}
            nome={t('projects.spa.name')}
            techs="ReactJS, TypeScript, Bootstrap"
            descricao={t('projects.spa.description')}
            repo="https://github.com/Adonccio/loja-virtual-spa"
            link="https://loja-spa.vercel.app/"
          />
          <CardProjeto2
            foto={kritic}
            nome={t('projects.kritic.name')}
            techs="React Native, TypeScript"
            descricao={t('projects.kritic.description')}
            repo="https://github.com/Adonccio/Amazon-app"
          />
          <CardProjeto1
            foto={reactstock}
            nome={t('projects.stock.name')}
            techs="ReactJS, TypeScript"
            descricao={t('projects.stock.description')}
            repo="https://github.com/Adonccio/React-stock"
            link="https://react-stock-kappa.vercel.app/"
          />
        </div>
      </div>
    </section>
  )
}
