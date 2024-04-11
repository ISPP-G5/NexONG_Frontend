import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

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
    if(personType === 'Voluntarios'){
      await axios.patch(`${API_ENDPOINT}volunteer/${person.volunteer}/`, 
        {status: "ACEPTADO"}, 
        config);
    } else if(personType === 'Familias'){
      await axios.patch(`${API_ENDPOINT}student/${person.id}/`, 
        {status: "ACEPTADO"}, 
        config);
    } else {
      toast.error('Error al eliminar', {
        autoClose: 5000
      })
    }
    toast.success("Persona rechazada correctamente", {
      autoClose: 5000
    })
    window.location.reload(); 
}
  
  
  const handleRechazar = async (person) => {
    if(personType === 'Voluntarios'){
      await axios.patch(`${API_ENDPOINT}volunteer/${person.volunteer}/`, 
        {status: "RECHAZADO"}, 
        config);
    } else if(personType === 'Familias'){
      await axios.patch(`${API_ENDPOINT}student/${person.id}/`, 
        {status: "RECHAZADO"}, 
        config);
    } else {
      toast.error('Error al eliminar', {
        autoClose: 5000
      })
    }
    toast.success("Persona rechazada correctamente", {
      autoClose: 5000
    })
    window.location.reload(); 
  }

  const handleEliminar = async(person) =>{
      if(personType === 'Voluntarios'){
        await axios.delete(`${API_ENDPOINT}volunteer/${person.volunteer}/`, config);
      } else if(personType === 'Socios'){
        await axios.delete(`${API_ENDPOINT}partner/${person.partner}/`, config);
      } else if(personType === 'Educadores'){
        await axios.delete(`${API_ENDPOINT}educator/${person.educator}/`, config);
      } else {
        toast.error('Error al eliminar', {
          autoClose: 5000
        })
      }
      toast.success("Persona eliminada correctamente", {
        autoClose: 5000
      })
      window.location.reload(); 
  }
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleConfirmDelete = () => {
    handleEliminar(person);
    setConfirmDeleteOpen(false);
  };

  const roleAvatarMap = {
    'EDUCADOR': avatarEducator,
    'VOLUNTARIO': avatarVolunteer,
    'FAMILIA': avatarFamily,
    'SOCIO': avatarPartner,
  };

  return (
    <div className='card-info'>
      <ToastContainer autoClose={5000} />
      { (request || personType !== 'Familias') &&
        <div className='family-request'>
          <img src={person.avatar && person.avatar !== '' ? person.avatar : roleAvatarMap[person.role]} alt='placeholder' />
          <div className='family-info' style={{ borderRight: 'none', borderBottom: 'none'}}>
            {personType === 'Familias' ? <p><strong>{person.first_name}</strong></p> : <p>{person.first_name}</p>}
            <p>{person.last_name}</p>
          </div>
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
          <DeleteIcon className='trash' style={{marginLeft:'87.5%'}} onClick={() => setConfirmDeleteOpen(true)} />
          <EditIcon className='edit' style={{marginLeft:'87.5%'}} onClick={() => window.location.replace(`/admin/perfil/actualizar/${person.id}`) } />
        </div>
      }
      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>¿Estás seguro que quieres borrar?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* This is used for admin families screen */}
      {personType === 'Familias' && !request && 
        <div className='family-info'>
          <p><strong>{person.name}</strong></p>
          <p>Número de niños: {kids.filter(kid => kid.family === person.id).length}</p>
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
    </div>
  );
}
export default PersonCard;
