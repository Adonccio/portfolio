export default function TechCard (props) {
    return (
        <>
    <div key={props.nome} className="cardTech">
        <img className="techFoto" src={props.foto} alt="" />
        <h2 className="techNome">{props.nome}</h2>
    </div>
        </>
    )
}