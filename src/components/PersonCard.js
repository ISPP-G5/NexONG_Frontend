import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import avatarEducator from '../logo/family-avatar.jpg';
import avatarVolunteer from '../logo/volunteer-avatar.png';
import avatarFamily from '../logo/family-avatar.jpg';
import avatarPartner from  '../logo/partner-avatar.png'
import useToken from './useToken';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function PersonCard({ person, personType, kids, request = false, trash = true }) {
  const [token, updateToken] = useToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  };

  const handleDescargar = async(person) => {
    const descargarDocumento = (documento, nombreArchivo) => {
        const enlaceDescarga = document.createElement('a');
        enlaceDescarga.href = documento;
        enlaceDescarga.download = nombreArchivo;

        // Simular un clic en el enlace para descargar el archivo
        enlaceDescarga.click();
    };

    // Descargar cada documento
    if(person.volunteer){
    descargarDocumento(`${API_ENDPOINT}export/files/volunteers?name=${person.first_name}&surname=${person.last_name}`, 'documentos_voluntario.zip');
  } else if (person.id) {
    descargarDocumento(person.enrollment_document, 'documentos_student.pdf');
  }
    // Mostrar un mensaje de éxito
    toast.success("Descarga existosa", {
        autoClose: 5000
    });
}; 

  const handleAceptar = async (person) => {
  
    person.status = "ACEPTADO";
    let url;
    if (person.volunteer) {
      url = `${API_ENDPOINT}volunteer/${person.volunteer}/`;
    } else if (person.id) {
      url = `${API_ENDPOINT}student/${person.id}/`;
    }

    const update = await axios.patch(url, {
      status: person.status
    }, config);
    console.log('update', update);
    const { data } = update;
    if (data.message) {
      toast.error("Error al actualizar", {
        autoClose: 5000
      });
    } else {
      toast.success("Usuario actualizado con éxito.", {
        autoClose: 5000
      })
    }
   setTimeout(() => {
    window.location.reload();
   }, 2000); 
}

  const handleRechazar = async (person) => {
   let url;
    person.status = "RECHAZADO";
    if (person.volunteer) {
      url = `${API_ENDPOINT}volunteer/${person.volunteer}/`;
    } else if (person.id) {
      url = `${API_ENDPOINT}student/${person.id}/`;
    }

    const update = await axios.patch(url, {
      status: person.status
    }, config);
    console.log('update', update);
    const { data } = update;
    if (data.message) {
      toast.error("Error al actualizar", {
        autoClose: 5000
      });
    } else {
      toast.success("Usuario rechazado con éxito.", {
        autoClose: 5000
      })
    }
    setTimeout(() => {
      window.location.reload();
     }, 2000); 
  }

  const handleEliminar = async (person) => {
   
    if (!person.id || person.id <= 0) {
      toast.error('La id no es valida', {
        autoClose: 5000
      })
    } else {
      if (personType === 'Familias-solicitudes') {
        await axios.delete(`${API_ENDPOINT}student/${person.id}/`, config);
      } else if (personType === 'Voluntarios') {
        console.log(person.id);
        await axios.delete(`${API_ENDPOINT}volunteer/${person.volunteer}/`, config);
      } else {
        await axios.delete(`${API_ENDPOINT}user/${person.id}/`, config);
      }
      toast.success("Persona eliminada correctamente", {
        autoClose: 5000
      })
      setTimeout(() => {
        window.location.reload();
       }, 2000); 
    }
  }
  const roleAvatarMap = {
    'EDUCADOR': avatarEducator,
    'VOLUNTARIO': avatarVolunteer,
    'FAMILIA': avatarFamily,
    'SOCIO': avatarPartner,
  };
  console.log('person.avatar:', person.avatar);
  console.log('person.role:', person.role);
  console.log('roleAvatarMap[person.role]:', roleAvatarMap[person.role]);
  return (
    <div className='card-info'>
      <ToastContainer autoClose={5000} />
      {personType === 'Familias' ?
        <div className='family-info'>
          <p>{person.first_name}</p>
          <p><strong>{person.name}</strong></p>
          <p>Número de niños: {kids.filter(kid => kid.family === person.id).length}</p>
        </div>
        :
        <div className='family-request'>
<img src={person.avatar && person.avatar !== '' ? person.avatar : roleAvatarMap[person.role]} alt='placeholder' />          <div className='family-info' style={{ borderRight: 'none', borderBottom: 'none'}}>
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
            <button className='button-decline' onClick={() => handleRechazar(person)}>Rechazar</button>
          </div>
        </div>
      }
      {trash &&
        <div className='buttons-acceptance'>
          <DeleteIcon className='trash' style={{marginLeft:'87.5%'}} onClick={() => handleEliminar(person)} />
          <EditIcon className='edit' style={{marginLeft:'87.5%'}} onClick={() => window.location.replace(`/admin/perfil/actualizar/${person.id}`) } />
        </div>
      }



    </div>
  );
}
export default PersonCard;
