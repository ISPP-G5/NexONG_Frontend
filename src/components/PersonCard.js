import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

import avatarEducator from '../logo/family-avatar.jpg'; // Ensure these paths are correct
import avatarVolunteer from '../logo/volunteer-avatar.png';
import avatarFamily from '../logo/family-avatar.jpg';
import avatarPartner from  '../logo/partner-avatar.png';
import useToken from './useToken';


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


function PersonCard({ person, personType, kids, request = false }) {
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
  
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [doHandleAceptarRechazar, setDohandleAceptarRechazar] = useState(false);
  const [kidDialogOpen, setKidDialogOpen] = useState(false);
  const [currentKid, setCurrentKid] = useState(null);

  const handleDescargar = async(person) => {
    const descargarDocumento = async (url, nombreArchivo) => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const blob = await response.blob();
        const enlaceDescarga = document.createElement('a');
        const urlDescarga = window.URL.createObjectURL(blob);
  
        enlaceDescarga.href = urlDescarga;
        enlaceDescarga.download = nombreArchivo;
        document.body.appendChild(enlaceDescarga);
        enlaceDescarga.click();
  
        window.URL.revokeObjectURL(urlDescarga);
        document.body.removeChild(enlaceDescarga);
      } catch (e) {
        console.error('Error al descargar el documento:', e);
      }
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
      if (personType !== 'Voluntarios' && action === 'aceptar') {
        const today = new Date()
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const date = `${year}-${month}-${day}`;
        const data = {
          status:status,
          acceptance_date: date
        }
        await axios.patch(`${API_ENDPOINT}${path}/`, data, config);
      } else {
        await axios.patch(`${API_ENDPOINT}${path}/`, {status}, config);
      }
      toast.success(`Persona ${status.toLowerCase()} correctamente`, { autoClose: 5000 });
      setTimeout(() => window.location.reload(), 2000); 
    } catch (error) {
      console.error(error);
      toast.error('Error al procesar la solicitud', { autoClose: 5000 });
    }
  };

  const handleEliminar = async(person) => {
    try {
      const typeEndpointMap = {
        'Voluntarios': `volunteer/${person.volunteer}`,
        'Socios': `partner/${person.partner}`,
        'Educadores': `educator/${person.educator}`,
        'default': `user/${person.id}`
      };
  
      const endpoint = typeEndpointMap[personType] || typeEndpointMap['default'];
  
      if (endpoint) {
        await axios.delete(`${API_ENDPOINT}${endpoint}/`, config);
        toast.success("Persona eliminada correctamente", { autoClose: 5000 });
        setTimeout(() => window.location.reload(), 2000); 
      } else {
        throw new Error('Invalid user role');
      }
    } catch (error) {
      console.error(error);
      toast.error('El usuario no puede ser borrado', { autoClose: 5000 });
      window.location.reload(); 
    }
  };

  return (
    <div className='card-info'>
      <ToastContainer autoClose={5000} />

      {/* VOLUNTARIOS CARD */}
      {personType === 'Voluntarios' && !request &&
      <>
        <div className='family-request'>
          <img src={person.avatar && person.avatar !== '' ? person.avatar : roleAvatarMap[person.role]} alt='Avatar' />
          <div className='family-info' style={{ borderRight: 'none', borderBottom: 'none'}}>
            <p><strong>Nombre: </strong>{person.first_name} {person.last_name}</p>
            <p><strong>DNI: </strong>{person.id_number}</p>
            <p><strong>Fecha de nacimiento: </strong>{person.birthdate}</p>
            <p><strong>Formación académica:</strong></p>
            <p>{person.academic_formation}</p>
            <p><strong>Motivación:</strong></p>
            <p>{person.motivation}</p>
          </div>
        </div>
        <div className='buttons-requests'>
          <button className='button-contrast' onClick={() => setContactDialogOpen(true)}>Contacto</button>
          <button className='button-contrast' onClick={() => handleDescargar(person)}>Documentación</button>
          <div className='buttons-acceptance'>
            <DeleteIcon className='trash' onClick={() => setConfirmDeleteOpen(true)} />
            <EditIcon className='edit' onClick={() => window.location.replace(`/admin/perfil/actualizar/${person.id}`) } />
          </div>
        </div>
      </>
      }
      <Dialog open={contactDialogOpen} onClose={() => setContactDialogOpen(false)}>
        <DialogTitle>Información de {person.first_name}</DialogTitle>
          <DialogContent>
            <p><strong>Correo: </strong>{person.email}</p>
            <p><strong>Teléfono: </strong>{person.phone}</p>
            {personType !== 'Educadores' && <p><strong>Dirección: </strong>{person.address}, {person.postal_code}</p>}
          </DialogContent>
        <DialogActions>
          <Button onClick={() => setContactDialogOpen(false)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      {personType === 'Voluntarios' && request &&
      <>
        <div className='family-request'>
          <img src={person.avatar && person.avatar !== '' ? person.avatar : roleAvatarMap[person.role]} alt='Avatar' />
          <div className='family-info' style={{ borderRight: 'none', borderBottom: 'none'}}>
            <p><strong>Nombre: </strong>{person.first_name} {person.last_name}</p>
            <p><strong>Fecha de nacimiento: </strong>{person.birthdate}</p>
            <p><strong>Correo: </strong>{person.email}</p>
            <p><strong>Formación académica:</strong></p>
            <p>{person.academic_formation}</p>
            <p><strong>Motivación:</strong></p>
            <p>{person.motivation}</p>
          </div>
        </div>
        <div className='buttons-requests'>
          <button className='button-contrast' onClick={() => handleDescargar(person)}>Documentación</button>
          <div className='buttons-acceptance'>
            <button className='button-accept' onClick={() => handleAceptarRechazar('aceptar', person)}>Aceptar</button>
            <button className='button-decline' onClick={() => setDohandleAceptarRechazar(true)}>Rechazar</button>
          </div>
        </div>
      </>
      }
      <Dialog open={doHandleAceptarRechazar} onClose={() => setDohandleAceptarRechazar(false)}>
        <DialogTitle>¿Estás seguro que quieres rechazar?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDohandleAceptarRechazar(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => handleAceptarRechazar('rechazar', person)} color="secondary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
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

      {/* EDUCATORS CARD */}
      {personType === 'Educadores' && !request &&
      <>
        <div className='family-request'>
          <img src={person.avatar && person.avatar !== '' ? person.avatar : roleAvatarMap[person.role]} alt='Avatar' />
          <div className='family-info' style={{ borderRight: 'none', borderBottom: 'none'}}>
            <p><strong>Nombre: </strong>{person.first_name} {person.last_name}</p>
            <p><strong>DNI: </strong>{person.id_number}</p>
            <p><strong>Fecha de nacimiento: </strong>{person.birthdate}</p>
            <p><strong>Clases: </strong>{person.lessonNames.length > 0 ? person.lessonNames.join(', ') : 'No tiene clases'}</p>            <p><strong>Descripción:</strong></p>
            <p>{person.description}</p>
          </div>
        </div>
        <div className='buttons-requests'>
          <button className='button-contrast' onClick={() => setContactDialogOpen(true)}>Contacto</button>
          <div className='buttons-acceptance'>
            <DeleteIcon className='trash' onClick={() => setConfirmDeleteOpen(true)} />
            <EditIcon className='edit' onClick={() => window.location.replace(`/admin/perfil/actualizar/${person.id}`) } />
          </div>
        </div>
      </>
      }

      {/* PARTNERS CARD */}
      {personType === 'Socios' && !request &&
      <>
        <div className='family-request'>
          <img src={person.avatar && person.avatar !== '' ? person.avatar : roleAvatarMap[person.role]} alt='Avatar' />
          <div className='family-info' style={{ borderRight: 'none', borderBottom: 'none'}}>
            <p><strong>Nombre: </strong>{person.first_name} {person.last_name}</p>
            <p><strong>Frecuencia donación: </strong>{person.frequency}</p>
            <p><strong>Cantidad donación: </strong>{person.quantity}</p>
            <p><strong>Fecha primer pago: </strong>{person.date}</p>
            <p><strong>DNI: </strong>{person.id_number}</p>
            <p><strong>Fecha de nacimiento: </strong>{person.birthdate}</p>
            <p><strong>Descripción:</strong></p>
            <p>{person.description}</p>
          </div>
        </div>
        <div className='buttons-requests'>
          <button className='button-contrast' onClick={() => setContactDialogOpen(true)}>Contacto</button>
          <div className='buttons-acceptance'>
            <DeleteIcon className='trash' onClick={() => setConfirmDeleteOpen(true)} />
            <EditIcon className='edit' onClick={() => window.location.replace(`/admin/perfil/actualizar/${person.id}`) } />
          </div>
        </div>
      </>
      }

      {/* FAMILIES CARD */}
      {personType === 'Familias' && !request && 
        <div className='family-info' style={{ flex: '0.2'}}>
          <p><strong>{person.name}</strong></p>
          <p>Número de niños: {kids.filter(kid => kid.family === person.id).length}</p>
        </div> 
      }
      {kids &&
        <div className='kids-info'>
          {kids.filter(kid => kid.family === person.id).map((kid, kidIndex) => {
            return (
              <div className='kid' key={kidIndex}>
                <p><strong>Nombre de niño:</strong></p>
                <p>{kid.name} {kid.surname}</p>
                <p><strong>Curso: </strong></p>
                <p>{kid.current_education_year}</p>
                <p><strong>Clase: </strong></p>
                {kid.lesson && kid.lesson.length > 0 ? (
                  kid.lesson.map((lesson, lessonIndex) => (
                    <p key={lessonIndex}>{lesson}</p>
                  ))
                ) : (
                  <p>No está en ninguna clase</p>
                )}
                <p><strong>Evaluación: </strong></p>
                <p style={{marginBottom: '5px'}}>{kid.evaluation ? kid.evaluation : 'No hay evaluación'}</p>
                {kid.status === 'CADUCADO' && <p style={{ color: 'red' }}>CADUCADO</p>}
                <button className='button-contrast' style={{maxWidth: '80%', maxHeight: '10%', alignSelf: 'center', marginTop: '5px'}} onClick={() => { setCurrentKid(kid); setKidDialogOpen(true); }}>Ver más</button>
              </div>
            );
          })}
        </div>
      }
      <Dialog open={kidDialogOpen} onClose={() => setKidDialogOpen(false)}>
        <DialogTitle>Información del niño</DialogTitle>
        {currentKid && (
          <DialogContent>
            <p><strong>Nombre:</strong> {currentKid.name} {currentKid.surname}</p>
            <p><strong>Fecha de nacimiento:</strong> {currentKid.birthdate}</p>
            <p><strong>Curso:</strong> {currentKid.current_education_year}</p>
            <p><strong>Clase: </strong></p>
            {currentKid.lesson && currentKid.lesson.length > 0 ? (
              currentKid.lesson.map((lesson, lessonIndex) => (
                <p key={lessonIndex}>{lesson}</p>
              ))
            ) : (
              <p>No está en ninguna clase</p>
            )}            
            <p><strong>Evaluación:</strong> {currentKid.evaluation ? currentKid.evaluation : 'No hay evaluación'}</p>
            <p><strong>Tutor:</strong> {currentKid.education_center_tutor ? currentKid.education_center_tutor : 'No tiene tutor'}</p>
            <p><strong>Horario:</strong> {currentKid.is_morning_student ? 'Mañana' : 'Tarde'}</p>
            <p><strong>Nacionalidad:</strong> {currentKid.nationality}</p>
            {currentKid.status === 'CADUCADO' && <p style={{ color: 'red' }}>EXPIRED</p>}
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => setKidDialogOpen(false)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      {personType === 'Familias' && request &&
      <>
        <div className='family-request'>
          <img src={person.avatar && person.avatar !== '' ? person.avatar : roleAvatarMap['FAMILIA']} alt='Avatar' />
          <div className='family-info' style={{ borderRight: 'none', borderBottom: 'none'}}>
            <p style={{ alignSelf: 'center', marginTop: '0'}}><strong>{person.family_name}</strong></p>
            <p><strong>Hijo: </strong>{person.name} {person.surname}</p>
            <p><strong>Fecha de nacimiento: </strong>{person.nationality}</p>
            <p><strong>Nacionalidad: </strong>{person.birthdate}</p>
            <p><strong>Curso: </strong>{person.current_education_year}</p>
            <p><strong>Alumno de: </strong>{person.is_morning_student? 'MAÑANA': 'TARDE'}</p>
          </div>
        </div>
        <div className='buttons-requests'>
          <div className='buttons-acceptance'>
            <button className='button-accept' onClick={() => handleAceptarRechazar('aceptar', person)}>Aceptar</button>
            <button className='button-decline' onClick={() => setDohandleAceptarRechazar(true)}>Rechazar</button>
          </div>
        </div>
      </>
      }
    </div>
  );
};

export default PersonCard;
