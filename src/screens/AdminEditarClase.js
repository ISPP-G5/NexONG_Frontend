import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import AdminLessonForm from '../components/AdminLessonForm'; // Import the form component
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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
        if (error.response && error.response.data) {
          const { data } = error.response;
          // Update state with backend validation errors
          if (data && data.detail) {
            toast.error(data.detail);
          } else if (data && data.capacity) {
            toast.error('Error: el número de alumnos no debe superar a la capacidad.');
          } else if (data && data.start_date) {
            toast.error('Error: la fecha de inicio no puede ser en el pasado.');
          } else if (data && data.end_date) {
            toast.error('Error: la fecha de fin no puede ser anterior a la de inicio.');
          } else if (data && data.students) {
            toast.error('Error: hay estudiantes que no pertenecen a este turno'); // Display students error
          } else {
            toast.error('Ha ocurrido un error al actualizar la clase.');
          }
        } else {
          console.error('Error updating lesson:', error);
          toast.error('Error al actualizar la clase. Por favor, inténtelo de nuevo.');
        }
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
