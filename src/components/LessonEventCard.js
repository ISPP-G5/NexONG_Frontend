import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function LessonEventCard({ lessonEvent, kids }) {
  
  const dateStartObj = new Date(lessonEvent.start_date);
  const formattedDateStart = dateStartObj.toLocaleDateString('es-ES') + ' ' + dateStartObj.toLocaleTimeString('es-ES');
  const dateEndObj = new Date(lessonEvent.end_date);
  const formattedDateEnd = dateEndObj.toLocaleDateString('es-ES') + ' ' + dateEndObj.toLocaleTimeString('es-ES');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false); 
  const lesson = lessonEvent.lesson;
  
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

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
    formData.append('lesson_event', lesson);
    formData.append('is_authorized', isAuthorized);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}center-exit/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      console.log(response.data);
      toast.success("Autorización subida con éxito");
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      if (error.response.data.authorization) toast.error("Porfavor, introduzca un fichero de autorización en formato PDF");
      if (error.response.data.non_field_errors)  toast.error("El alumno escogido no está puede asistir a este evento");
    }
  };

  return (
    <div className='card-info'>
      <ToastContainer autoClose={5000} />
      
      <div className='lessonEvent-info'>
        <p><strong>Nombre del evento:</strong></p>
        <p>{lessonEvent.name}</p>
        <p><strong>Descripción:</strong></p>
        <p>{lessonEvent.description}</p>
        <p><strong>Fecha de comienzo:</strong></p>
        <p>{formattedDateStart}</p>
        <p><strong>Fecha de fin:</strong></p>
        <p>{formattedDateEnd}</p>
        <p><strong>Para registrar a un alumno:</strong></p>
        <p>Añada el fichero de autorización (en PDF)</p>
        <input 
          type="file" 
          id="file" 
          onChange={handleFileChange} 
          className="file-input" 
          style={{display: 'none'}}
        />
        <label htmlFor="file" className="file-upload-button">
          Selecciona un archivo
        </label>
        {selectedFile && <p className="file-input-label">{selectedFile.name}</p>}
        {!selectedFile && <p className="file-input-label">{""}</p>}
        <p>Escoja al alumno elegido</p>
        <select value={selectedStudentId} onChange={handleStudentChange} className="select-style">
            <option value="">Selecciona un estudiante</option>
            {kids.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name + " " + student.surname}
              </option>
            ))}
        </select>
      
        <div className='register-container-checkbox'>
          <input
            type="checkbox"
            id="authorizedCheckbox"
            checked={isAuthorized}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="authorizedCheckbox" >Confirmar asistencia</label>
        </div>

        <button className="button-create" onClick={handleFileUpload}>Mandar autorización</button>
      </div> 
    </div>
  );
}

export default LessonEventCard;
