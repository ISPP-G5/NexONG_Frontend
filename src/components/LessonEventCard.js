import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function LessonEventCard({ lessonEvent, kids }) {
  const dateStartObj = new Date(lessonEvent.start_date);
  const dateEndObj = new Date(lessonEvent.end_date);
  dateStartObj.setTime(dateStartObj.getTime() - 3600000);
  dateEndObj.setTime(dateEndObj.getTime() - 3600000);
  const options = { timeZone: 'Europe/Madrid', hour12: false }; 

  const formattedDateStart = dateStartObj.toLocaleDateString('es-ES', options) + ' ' + dateStartObj.toLocaleTimeString('es-ES', options);
  const formattedDateEnd = dateEndObj.toLocaleDateString('es-ES', options) + ' ' + dateEndObj.toLocaleTimeString('es-ES', options);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false); 
  const lesson = lessonEvent.lesson;
  if (!kids) {
    return <div></div>; 
}
  const handleStudentChange = (event) => {
    setSelectedStudentId(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsAuthorized(event.target.checked);
  };

  const handleFileUpload = async () => {
    const token = localStorage.getItem('accessToken');
    if (!selectedFile) {
      toast.error("Por favor, selecciona un archivo para subir.");
      return;
    }

    if (!selectedStudentId) {
      toast.error("Por favor, selecciona un estudiante antes de subir la autorización.");
      return;
    }
    
    const formData = new FormData();
    formData.append('authorization', selectedFile);
    formData.append('student', selectedStudentId);
    formData.append('lesson_event', lessonEvent.id);
    formData.append('is_authorized', isAuthorized);

    try {
      const updatedLessonEvent = {
        ...lessonEvent,
        attendees: [...lessonEvent.attendees, selectedStudentId]  // Asegúrate de que lessonEvent.attendees exista y sea un arreglo
      };
      
      await axios.put(`${process.env.REACT_APP_API_ENDPOINT}lesson-event/${lessonEvent.id}/`, updatedLessonEvent, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}center-exit/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      toast.success("Autorización subida con éxito");
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      if (error.response.data.authorization) toast.error("Porfavor, introduzca un fichero de autorización en formato PDF");
      if (error.response.data.non_field_errors)  toast.error("El alumno escogido no está puede asistir a este evento");
    }
  };

  return (
    <div className='lesson-event-card'>
      <ToastContainer autoClose={5000} />
      
      <div className='lesson-event-info'>
        <p><strong>Nombre del evento:</strong></p>
        <p>{lessonEvent.name}</p>
        <p><strong>Descripción:</strong></p>
        <p>{lessonEvent.description}</p>
        <p><strong>Fecha de comienzo:</strong></p>
        <p>{formattedDateStart}</p>
        <p><strong>Fecha de fin:</strong></p>
        <p>{formattedDateEnd}</p>
      </div>
      <div className='lesson-event-info'>
        <p><strong>Para registrar a un alumno:</strong></p>
        <p>Añada el fichero de autorización (en PDF): </p>
        <div className='lesson-event-file'>
          <input 
            type="file" 
            id="file" 
            onChange={(e) => setSelectedFile(e.target.files[0])} 
          />
        </div>
        <p>Escoja al alumno elegido: </p>
        <select value={selectedStudentId} onChange={handleStudentChange} style={{height: 'min-content'}}>
            <option value="">Selecciona un estudiante</option>
            {kids.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name + " " + student.surname}
              </option>
            ))}
        </select>
      
        <div className='register-container-checkbox' style={{marginTop: '3%'}}>
          <input
            type="checkbox"
            id="authorizedCheckbox"
            checked={isAuthorized}
            onChange={handleCheckboxChange}
          />
          <label style={{color: 'black'}} htmlFor="authorizedCheckbox" >Confirmar asistencia</label>
        </div>
        <button 
          className="button-contrast" 
          style={{marginTop: '3%', width: '50%'}}
          onClick={handleFileUpload}>
            Mandar autorización
        </button>
      </div> 
    </div>
  );
}

export default LessonEventCard;
