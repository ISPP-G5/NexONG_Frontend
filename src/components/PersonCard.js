import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function PersonCard({ person, personType, kids, request = false, trash = true }) {

  const handleDescargar = async(person) => {
    // Download the enrollment_document
    const documento = person.enrollment_document;
    const nombreArchivo = 'documento.pdf'; // Puedes cambiar el nombre del archivo según lo necesites

    // Crear un objeto Blob a partir de los datos del documento
    const blob = new Blob([documento], { type: 'application/pdf' });

    // Crear un enlace temporal
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = window.URL.createObjectURL(blob);
    enlaceDescarga.download = nombreArchivo;

    // Hacer clic en el enlace para descargar el archivo
    enlaceDescarga.click();
    window.alert("Se descarga vacio porque la api pasa enlaces en vez de archivos");
  };
  
  const handleAceptar = async (person) => {
    /*const update = await axios.put(`${API_ENDPOINT}volunteer/${voluntario[0].id}/`,{
        academic_formation: voluntario[0].academic_formation,
        motivation: voluntario[0].motivation,
        status: voluntario[0].status,
        address:voluntario[0].address,
        postal_code: voluntario[0].postal_code,
        enrollment_document: voluntario[0].enrollment_document,
        registry_sheet: voluntario[0].registry_sheet,
        sexual_offenses_document: voluntario[0].sexual_offenses_document,
        scanned_id: voluntario[0].scanned_id,
        minor_authorization: voluntario[0].minor_authorization,
        scanned_authorizer_id: voluntario[0].scanned_authorizer_id,
        birthdate: voluntario[0].birthdate,
        start_date: voluntario[0].start_date,
        end_date: null,

        
    });
    console.log('update',update);
    const {data} = update;
    if (data.message){
        window.alert(data.message);
    }else{
        window.alert("Usuario actualizado con éxito.")
    }*/
    window.alert("Usuario no puede ser aceptado, la funcionalidad esta comentada hasta nuevo aviso.")
  }
  
  const handleRechazarOEliminar = async(person) =>{
    if(!person.id || person.id <= 0){
        window.alert('La id no es valida')
    }else{
      if(personType === 'Familias-solicitudes'){
        await axios.delete(`${API_ENDPOINT}student/${person.id}/`);
      }
      else {
        await axios.delete(`${API_ENDPOINT}user/${person.id}/`);
      }
        window.alert("Persona eliminada correctamente")
        window.location.reload(); // Recarga la ventana después de eliminar
    }
  }

  return (
    <div className='card-info'>
      {personType === 'Familias' ?
        <div className='family-info'>
          <p>{person.first_name}</p>
          <p><strong>{person.name}</strong></p>
          <p>Número de niños: {kids.filter(kid => kid.family === person.id).length}</p>
        </div> 
        :
        <div className='family-request'>
          <img src={person.avatar} alt='placeholder' />
          <div className='family-info' style={{ borderRight: 'none', borderBottom: 'none'}}>
            {personType === 'Familias-solicitudes' ? <p><strong>{person.first_name}</strong></p> : <p>{person.first_name}</p>}
            <p>{person.last_name}</p>
          </div>
        </div>
      }
      {kids &&
        <div className='kids-info'>
          {kids.filter(kid => kid.family === person.id).map((kid, kidIndex) => {
            return (
              <div className='kid' key={kidIndex}>
                <p>Nombre de niño: {kid.name} {kid.surname}</p>
                <p>Fecha de nacimiento: {kid.birthdate}</p>
                <p>Curso: {kid.current_education_year}</p>
                <p>Clase: {kid.lesson ? kid.lesson[0] : 'No está en ninguna clase'}</p>
                <p>Evaluación: {kid.evaluation ? kid.evaluation : 'No hay evaluación'}</p>
                {kid.status === 'CADUCADO' && <p style={{ color: 'red' }}>CADUCADO</p>}
              </div>
            );
          })}
        </div>
      }
      {request &&
        <div className='buttons-requests'>
          <button className='button-contrast' onClick={() => handleDescargar(person)}>Descargar</button>
          <div className='buttons-acceptance'>
            <button className='button-accept' onClick={() => handleAceptar(person)}>Aceptar</button>
            <button className='button-decline' onClick={() => handleRechazarOEliminar(person)}>Rechazar</button>
          </div>
        </div>
      }
      {trash && <DeleteIcon className='trash' onClick={() => handleRechazarOEliminar(person)} />}
    </div>
  );
}
export default PersonCard;