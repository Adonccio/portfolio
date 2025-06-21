import { Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';

export default function CardProjeto2({ nome, techs, descricao, repo, foto }) {
  const { t } = useTranslation();

  return (
    <div className="container2">
      <div className="cardProjeto2">
        <div className="projeto2">
          <div className="dadosProjeto">
            <h2 className="projetoNome">{nome}</h2>
            <h3 className="tecnologiasProjeto">{techs}</h3>
            <p className="descricaoProjeto">{descricao}</p>

            {repo && (
              <Button className="botaoProjeto" color="success">
                <a
                  className="repo"
                  href={repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('project.repository')}
                </a>
              </Button>
            )}
          </div>
          <img className="projetoFoto" src={foto} alt={nome} />
        </div>
      </div>
    </div>
  );
}
