import { Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CardProjeto1 (props) {
    return(
        <><div className="container1">
            
            <div className="cardProjeto1">
                <div className="projeto1">
                <img className="projetoFoto" src={props.foto} alt="" />
                <div className="dadosProjeto">
            
                    <h2 className="projetoNome">{props.nome}</h2>
                    <h3 className="tecnologiasProjeto">{props.techs}</h3>
                    <p className="descricaoProjeto">{props.descricao}</p>
                    <Button className="botaoProjeto" 
                color="success">
                        <a className='repo' href={props.link} target="_blank">Acessar</a>
                    </Button>
                    <Button className="botaoProjeto" 
                color="success">
                        <a className='repo' href={props.repo} target="_blank">Repositório</a>
                    </Button>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}