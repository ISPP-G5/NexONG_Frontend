import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function LessonEventCard({ lessonEvent, kids }) {
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
      alert("Por favor, selecciona un archivo para subir.");
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
      alert("Autorización subida con éxito");
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      alert(error.response.data.non_field_errors[0]);
    }
  };

  return (
    <div className='card-info'>
      <ToastContainer autoClose={5000} />
      
      <div className='auth-info'>
        <p>{lessonEvent.name}</p>
        <p><strong>{lessonEvent.description}</strong></p>
        <input type="file" onChange={handleFileChange} />
        <select value={selectedStudentId} onChange={handleStudentChange}>
          <option value="">Selecciona un estudiante</option>
          {kids.map(student => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
        <div>
          <input 
            type="checkbox" 
            checked={isAuthorized} 
            onChange={handleCheckboxChange}
          />
          <label>Está autorizado a ir?</label>
        </div>
        <button onClick={handleFileUpload}>Subir Archivo</button>
      </div> 
    </div>
  );
}

export default LessonEventCard;
