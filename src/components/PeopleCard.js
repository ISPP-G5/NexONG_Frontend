import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
function PersonCard({ person, añadir, descargar, aceptar, denegar, voluntariosData }) {
  
  const handleDescargarOAceptar = (d) => {
    d ===true?descargar(voluntariosData.filter(v => v.id = person.volunteer)):aceptar(voluntariosData.filter(v => v.id = person.volunteer));
  };
  
  const handleDenegar = () => {
    denegar(person.id);
  };
  return (
    <div className='card-info' style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className='family-request'>
        <img src={person.avatar} alt='placeholder' style={{ width: '200px' }} />
        <div className='family-info'>
          <p>{person.name}</p>
          <p>{person.edad || person.surname}</p>
        </div>
      </div>
      {añadir === true ?
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          <button onClick={() => handleDescargarOAceptar(true)}>Descargar</button>
          <div>
            <button onClick={handleDescargarOAceptar}>Aceptar</button>
            <button onClick={handleDenegar}>Denegar</button>
          </div>
        </div>
        : <div className='edit-delete-icons'>
        <EditIcon className='edit-fill' style={{ marginRight: '1rem' }} />
        <DeleteIcon className='trash' onClick={handleDenegar} />
      </div>}
    </div>
  );
}
export default PersonCard;