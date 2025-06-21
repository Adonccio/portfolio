import TechCard from "./TechCard";
import vue from '../assets/techs/vue.png'
import react from '../assets/techs/react.png'
import native from '../assets/techs/smartphone.png'
import java from '../assets/techs/java.png'
import oracle from '../assets/techs/oracle.png'
import python from '../assets/techs/python.png'
import bi from '../assets/techs/bi.png'
import git from '../assets/techs/git.png'
import jenkins from '../assets/techs/jenkins.png'
import docker from '../assets/techs/docker.png'

export default function Techs () {
    return (
        <>
        <div className="container">
            
        <div id="gradeTechs">
                <TechCard foto={vue} nome='Vue'/>
                <TechCard foto={python} nome='Python'/>
                <TechCard foto={react} nome='React'/>
                <TechCard foto={native} nome='REACT NATIVE'/>
                <TechCard foto={java} nome='Java'/>
                <TechCard foto={oracle} nome='Oracle'/>
                <TechCard foto={bi} nome='Power BI'/>
                <TechCard foto={jenkins} nome='Jenkins'/>
                <TechCard foto={git} nome='Git'/>
                <TechCard foto={docker} nome='Docker'/>
        </div>
        </div>
        </>
    )
}