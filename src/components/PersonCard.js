import DeleteIcon from '@material-ui/icons/Delete';


function PersonCard({ person, añadir, descargar, aceptar, denegar, voluntariosData }) {
  
  const handleDescargarOAceptar = (d) => {
    d ===true?descargar(voluntariosData.filter(v => v.id = person.volunteer)):aceptar(voluntariosData.filter(v => v.id = person.volunteer));
  };
  
  const handleDenegar = () => {
    denegar(person.id);
  };
  return (
    <div className='card-info'>
      <div className='family-request'>
        <img src={person.avatar} alt='placeholder' />
        <div className='family-info' style={{ borderRight: 'none', borderBottom: 'none'}}>
          <p>{person.name}</p>
          <p>{person.edad || person.surname}</p>
        </div>
      </div>
      {añadir === true ?
        <div className='buttons-requests'>
          <button className='button-contrast' onClick={() => handleDescargarOAceptar(true)}>Descargar</button>
          <div className='buttons-acceptance'>
            <button className='button-accept' onClick={handleDescargarOAceptar}>Aceptar</button>
            <button className='button-decline' onClick={handleDenegar}>Denegar</button>
          </div>
        </div>
        : 
          <DeleteIcon className='trash' onClick={handleDenegar} />
        }
    </div>
  );
}
export default PersonCard;