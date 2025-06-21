import { Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';

export default function CardProjeto1({ foto, nome, techs, descricao, link, repo }) {
  const { t } = useTranslation();

  return (
    <div className="container1">
      <div className="cardProjeto1">
        <div className="projeto1">
          <img className="projetoFoto" src={foto} alt={nome} />
          <div className="dadosProjeto">
            <h2 className="projetoNome">{nome}</h2>
            <h3 className="tecnologiasProjeto">{techs}</h3>
            <p className="descricaoProjeto">{descricao}</p>

            {link && (
              <Button className="botaoProjeto" color="success">
                <a className="repo" href={link} target="_blank" rel="noopener noreferrer">
                  {t('project.access')}
                </a>
              </Button>
            )}

            {repo && (
              <Button className="botaoProjeto" color="success">
                <a className="repo" href={repo} target="_blank" rel="noopener noreferrer">
                  {t('project.repository')}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
