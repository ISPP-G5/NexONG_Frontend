import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const { saveAs } = require('file-saver');


function PersonCard({ person, personType, kids, request = false, trash = true }) {
  const [volunteers, setVolunteer] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}volunteer/`)
      .then((response) => {
        setVolunteer(response.data);
      })
      .catch((error) => {
        console.error('Error fetching families:', error);
      });
  }, []);


  const handleDescargar = async(person) => {
    const v = volunteers.filter(v => v.id === person.volunteer);
    const volunteer = v[0]
    const descargarDocumento = (documento, nombreArchivo) => {
        const enlaceDescarga = document.createElement('a');
        enlaceDescarga.href = documento;
        enlaceDescarga.download = nombreArchivo;

        // Simular un clic en el enlace para descargar el archivo
        enlaceDescarga.click();
    };

    // Descargar cada documento
    descargarDocumento(volunteer.enrollment_document, 'documento_de_enlistamiento.pdf');

    // Mostrar un mensaje de éxito
    toast.success("Descarga existosa", {
        autoClose: 5000
    });
}; 



  const handleAceptar = async (person) => {
    console.log(person)
    person.status = "ACEPTADO";

    const update = await axios.patch(`${API_ENDPOINT}volunteer/${person.volunteer}/`, {
      status: person.status
    });
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
    window.location.reload();
  }

  const handleRechazarOEliminar = async (person) => {
    if (!person.id || person.id <= 0) {
      toast.error('La id no es valida', {
        autoClose: 5000
      })
    } else {
      if (personType === 'Familias-solicitudes') {
        await axios.delete(`${API_ENDPOINT}student/${person.id}/`);
      }
      else {
        await axios.delete(`${API_ENDPOINT}user/${person.id}/`);
      }
      toast.success("Persona eliminada correctamente", {
        autoClose: 5000
      })
      window.location.reload(); // Recarga la ventana después de eliminar
    }
  }

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
          <img src={person.avatar} alt='placeholder' />
          <div className='family-info' style={{ borderRight: 'none', borderBottom: 'none' }}>
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