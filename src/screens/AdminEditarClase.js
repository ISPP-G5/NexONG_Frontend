import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import AdminLessonForm from '../components/AdminLessonForm'; // Import the form component
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import handleApiError from '../components/AdminApiErrors';
import 'react-toastify/dist/ReactToastify.css';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const AdminEditLesson = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [lessonData, setLessonData] = useState({
    name: '',
    description: '',
    capacity: '',
    is_morning_lesson: false,
    educator: '',
    students: [],
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}lesson/${lessonId}/`)
      .then((response) => {
        setLessonData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching lesson details:', error);
      });
  }, [lessonId]);

  const handleSubmit = (formData) => {
    // Validation
    if (!formData.name || !formData.description || !formData.capacity || !formData.start_date || !formData.end_date) {
      toast.error('Por favor, rellene todos los campos.');
      return;
    }
  
    axios
      .put(`${API_ENDPOINT}lesson/${lessonId}/`, formData)
      .then((response) => {
        toast.success('Clase actualizada exitosamente');
      })
      .catch((error) => {
        handleApiError(error, {
          detail: 'Ha ocurrido un error al actualizar la clase.',
          capacity: 'Error: el número de alumnos no debe superar a la capacidad.',
          start_date: 'Error: la fecha de inicio no puede ser en el pasado.',
          end_date: 'Error: la fecha de fin no puede ser anterior a la de inicio.',
          students: 'Error: hay estudiantes que no pertenecen a este turno',
        });
      });
  };
  

  return (
    <AdminLayout selected='Clases'>
      <ToastContainer />
      <button className='button' onClick={() => navigate('/adminClases')} style={{ marginTop: '5%', marginLeft: '2%' }}>
        Volver
      </button>
      <AdminLessonForm initialData={lessonData} handleSubmit={handleSubmit} />
    </AdminLayout>
  );
};

export default AdminEditLesson;
