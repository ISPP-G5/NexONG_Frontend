import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { colors } from '@material-ui/core';
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

          <button  style={{color:'black', backgroundColor:'white', marginTop:'50%', width:'110%',height:'15%'}} onClick={() => handleDescargarOAceptar(true)}>Descargar</button>
          <div style={{width:'110%'}}>
            <button  style={{color:'green', backgroundColor:'white', width:'50%'}} onClick={handleDescargarOAceptar}>Aceptar</button>
            <button  style={{color:'red', backgroundColor:'white', width:'50%'}} onClick={handleDenegar}>Denegar</button>
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