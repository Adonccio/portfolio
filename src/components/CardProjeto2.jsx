import { Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CardProjeto2 (props) {
    return(
        <><div className="container2">
            
            <div className="cardProjeto2">
                <div className="projeto2">
                <div className="dadosProjeto">
            
                    <h2 className="projetoNome">{props.nome}</h2>
                    <h3 className="tecnologiasProjeto">{props.techs}</h3>
                    <p className="descricaoProjeto">{props.descricao}</p>
                    <Button className="botaoProjeto" 
                color="success">
                        <a className='repo' href={props.repo} target="_blank">Repositório</a>
                    </Button>
                </div>
                <img className="projetoFoto" src={props.foto} alt="" />
                </div>
            </div>
        </div >
        </>
    )
}