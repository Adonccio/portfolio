import TechCard from "./TechCard";
import html from '../assets/techs/html.png'
import react from '../assets/techs/react.png'
import native from '../assets/techs/smartphone.png'
import node from '../assets/techs/node.png'
import c from '../assets/techs/c.png'
import python from '../assets/techs/python.png'
import bi from '../assets/techs/bi.png'
import git from '../assets/techs/git.png'
import bootstrap from '../assets/techs/bootstrap.png'
import next from '../assets/techs/next.png'

export default function Techs () {
    return (
        <>
        <div className="container">
            
        <div id="gradeTechs">
                <TechCard foto={html} nome='HTML, CSS E JS'/>
                <TechCard foto={python} nome='Python'/>
                <TechCard foto={react} nome='REACT'/>
                <TechCard foto={native} nome='REACT NATIVE'/>
                <TechCard foto={node} nome='NODE JS'/>
                <TechCard foto={c} nome='C#'/>
                <TechCard foto={bi} nome='Power BI'/>
                <TechCard foto={bootstrap} nome='BOOTSTRAP'/>
                <TechCard foto={git} nome='GIT'/>
                <TechCard foto={next} nome='NEXTJS'/>
        </div>
        </div>
        </>
    )
}