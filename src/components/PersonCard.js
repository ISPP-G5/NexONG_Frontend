import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import avatarEducator from '../logo/family-avatar.jpg'; // Ensure these paths are correct
import avatarVolunteer from '../logo/volunteer-avatar.png';
import avatarFamily from '../logo/family-avatar.jpg';
import avatarPartner from  '../logo/partner-avatar.png';
import useToken from './useToken';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function PersonCard({ person, personType, kids, request = false, trash = true }) {
  const [token] = useToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  };

  const roleAvatarMap = {
    'EDUCADOR': avatarEducator,
    'VOLUNTARIO': avatarVolunteer,
    'FAMILIA': avatarFamily,
    'SOCIO': avatarPartner,
  };

  const handleDescargar = async(person) => {
    const descargarDocumento = (documento, nombreArchivo) => {
        const enlaceDescarga = document.createElement('a');
        enlaceDescarga.href = documento;
        enlaceDescarga.download = nombreArchivo;
        document.body.appendChild(enlaceDescarga);
        enlaceDescarga.click();
        document.body.removeChild(enlaceDescarga);
    };

    if(person.volunteer){
      descargarDocumento(`${API_ENDPOINT}export/files/volunteers?name=${person.first_name}&surname=${person.last_name}`, 'documentos_voluntario.zip');
    } else if (person.id) {
      descargarDocumento(person.enrollment_document, 'documentos_student.pdf');
    }
    toast.success("Descarga exitosa", { autoClose: 5000 });
  };

  const handleAceptarRechazar = async (action) => {
    try {
      const path = personType === 'Voluntarios' ? `volunteer/${person.volunteer}` : `student/${person.id}`;
      const status = action === 'aceptar' ? "ACEPTADO" : "RECHAZADO";
      await axios.patch(`${API_ENDPOINT}${path}/`, {status}, config);
      toast.success(`Persona ${status.toLowerCase()} correctamente`, { autoClose: 5000 });
      setTimeout(() => window.location.reload(), 2000); 
    } catch (error) {
      console.error(error);
      toast.error('Error al procesar la solicitud', { autoClose: 5000 });
    }
  };

  const handleEliminar = async(person) => {
    try {
      const path = `${API_ENDPOINT}${personType.toLowerCase()}/${person[personType.toLowerCase()]}/`;
      await axios.delete(path, config);
      toast.success("Persona eliminada correctamente", { autoClose: 5000 });
      setTimeout(() => window.location.reload(), 2000); 
    } catch (error) {
      console.error(error);
      toast.error('Error al eliminar', { autoClose: 5000 });
    }
  };

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  return (
    <div className='card-info'>
      <ToastContainer autoClose={5000} />
      { (request || personType !== 'Familias') &&
        <div className='family-request'>
          <img src={person.avatar && person.avatar !== '' ? person.avatar : roleAvatarMap[person.role]} alt='Avatar' />
          <div className='family-info' style={{ borderRight: 'none', borderBottom: 'none'}}>
            <p>{person.first_name} {person.last_name}</p>
          </div>
        </div>
      }
      {request &&
        <div className='buttons-requests'>
          <button className='button-contrast' onClick={() => handleDescargar(person)}>Descargar</button>
          <div className='buttons-acceptance'>
            <button className='button-accept' onClick={() => handleAceptarRechazar('aceptar', person)}>Aceptar</button>
            <button className='button-decline' onClick={() => handleAceptarRechazar('rechazar', person)}>Rechazar</button>
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
          <Button onClick={() => handleEliminar(person)} color="secondary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
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
