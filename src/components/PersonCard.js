import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@material-ui/icons/Delete';
import useToken from './useToken';
import { ToastContainer, toast } from 'react-toastify';
import avatarEducator from '../logo/family-avatar.jpg';
import avatarVolunteer from '../logo/volunteer-avatar.png';
import avatarFamily from '../logo/family-avatar.jpg';
import avatarPartner from  '../logo/partner-avatar.png'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function PersonCard({ person, personType, kids, request = false, trash = true }) {
  

  const handleDescargar = async(person) => {
    const documento = person.enrollment_document;
    const nombreArchivo = 'documento_de_enlistamiento.pdf';

    const blob = new Blob([documento], { type: 'application/pdf' });

    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = window.URL.createObjectURL(blob);
    enlaceDescarga.download = nombreArchivo;

    enlaceDescarga.click();
    toast.error("Se descarga vacio porque la api pasa enlaces en vez de archivos", {
      autoClose: 5000
      });
  };
  
  const handleAceptar = async (person) => {
    person.status = "ACEPTADO";
    const token = localStorage.getItem("accessToken");
    console.log(token)

  const authConfig = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  };
    const update = await axios.patch(`${API_ENDPOINT}volunteer/${person.id}/`,{
        status: person.status        
    }, authConfig);
    console.log('update',update);
    const {data} = update;
    if (data.message){
        toast.error("Error al actualizar", {
          autoClose: 5000
          });
    }else{
        toast.success("Usuario actualizado con éxito.", {
          autoClose: 5000
          })
    }
    window.location.reload();
}

  const handleRechazar = async (person) => {
    let url;
    person.status = "RECHAZADO";
    const token = localStorage.getItem("accessToken");
    console.log(token)

  const authConfig = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  };
    
    const update = await axios.patch(`${API_ENDPOINT}volunteer/${person.id}/`,{
        status: person.status        
    }, authConfig);
    console.log('update',update);
    const {data} = update;
    if (data.message){
        toast.error("Error al actualizar", {
          autoClose: 5000
          });
    }else{
        toast.success("Usuario actualizado con éxito.", {
          autoClose: 5000
          })
    }
    window.location.reload();
  }

  const handleEliminar = async(person) =>{
    const token = localStorage.getItem("accessToken");
    console.log(token)

  const authConfig = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  };
    if(!person.id || person.id <= 0){
        toast.error('La id no es valida', {
          autoClose: 5000
          })
    }else{
      if(personType === 'Familias-solicitudes'){
        await axios.delete(`${API_ENDPOINT}student/${person.id}/`, authConfig);
      } else if(personType === 'Voluntarios'){
        console.log(person.id);
        await axios.delete(`${API_ENDPOINT}volunteer/${person.id}/`, authConfig);
      } else {
        await axios.delete(`${API_ENDPOINT}user/${person.id}/`, authConfig);
      }
        toast.success("Persona eliminada correctamente", {
          autoClose: 5000
          })
        window.location.reload();
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
