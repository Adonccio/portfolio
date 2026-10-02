import apple from '../assets/projetos/apple.webp'
import amazon from '../assets/projetos/amazon.webp'
import kritic from '../assets/projetos/kritic.webp'
import spa from '../assets/projetos/lojaspa.webp'
import stock from '../assets/projetos/reactstock.webp'
import sales from '../assets/pw1.webp'
import salesDetail from '../assets/pw2.webp'
import stocks from '../assets/pw3.webp'

export const navigation = [
  { key: 'about', id: 'sobreMim' },
  { key: 'experience', id: 'experiencia' },
  { key: 'skills', id: 'techsSection' },
  { key: 'projects', id: 'sectionProjetos' },
  { key: 'contact', id: 'contato' }
]

export const skillGroups = [
  { id: 'data', icon: 'layers', technologies: ['ETL / ELT', 'Apache Airflow', 'Python', 'Data Warehouse', 'Bronze / Silver / Gold', 'Modelagem de dados'] },
  { id: 'front', icon: 'code', technologies: ['React', 'JavaScript', 'Vue.js 2', 'Vuex', 'Vuetify', 'TypeScript', 'React Native', 'Next.js', 'HTML5', 'CSS3', 'Bootstrap', 'Reactstrap', 'Pug', 'Vite', 'GSAP', 'ScrollTrigger', 'i18next', 'REST APIs'] },
  { id: 'back', icon: 'terminal', technologies: ['Java', 'Quarkus', 'Hibernate Reactive', 'Panache', 'REST APIs'] },
  { id: 'database', icon: 'database', technologies: ['SQL', 'PL/SQL', 'Oracle Database', 'PostgreSQL', 'Materialized Views', 'Power BI'] },
  { id: 'tools', icon: 'tools', technologies: ['Git', 'Docker', 'Jenkins', 'Excel'] }
]

export const experienceStack = ['Apache Airflow', 'SQL', 'PL/SQL', 'Oracle', 'PostgreSQL', 'Vue.js', 'Java', 'Quarkus', 'Hibernate Reactive', 'Docker']

export const projects = [
  { id: 'apple', category: 'web', image: apple, technologies: ['React', 'Next.js', 'TypeScript', 'Bootstrap'], demo: 'https://apple-shop-eight.vercel.app/', repo: 'https://github.com/Adonccio/AppleShop' },
  { id: 'kritic', category: 'mobile', image: kritic, technologies: ['React Native', 'TypeScript', 'TMDB API'] },
  { id: 'stock', category: 'web', image: stock, technologies: ['React', 'TypeScript'], demo: 'https://react-stock-kappa.vercel.app/', repo: 'https://github.com/Adonccio/React-stock' },
  { id: 'sales', category: 'data', image: sales, detailImage: salesDetail, technologies: ['Power BI'] },
  { id: 'amazon', category: 'mobile', image: amazon, technologies: ['React Native', 'TypeScript'], repo: 'https://github.com/Adonccio/Amazon-app' },
  { id: 'spa', category: 'web', image: spa, technologies: ['React', 'TypeScript', 'Bootstrap'], demo: 'https://loja-spa.vercel.app/', repo: 'https://github.com/Adonccio/loja-virtual-spa' },
  { id: 'stocks', category: 'data', image: stocks, technologies: ['Power BI'] }
]

export const contactLinks = [
  { label: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/gustavo-adoncio-51a4a8276/' },
  { label: 'GitHub', icon: 'github', url: 'https://github.com/Adonccio' },
  { label: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/adonccio/' },
  { label: 'WhatsApp', icon: 'chat', url: 'https://wa.me/qr/4VT4ZU67TWIBI1' }
]

export const email = 'gustavoadoncio@gmail.com'
