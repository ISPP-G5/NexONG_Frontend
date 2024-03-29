import React, { useState, useEffect } from 'react';
import LayoutProfiles from '../../components/LayoutProfiles';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import handleApiError from '../../components/AdminApiErrors';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import 'react-toastify/dist/ReactToastify.css';

import '../../styles/styles.css';


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const AdminLessonsEdit = () => {
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
  

  const [formData, setFormData] = useState(lessonData);
  const [educators, setEducators] = useState([]);
  const [students, setStudents] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setFormData(lessonData);

    axios
      .get(`${API_ENDPOINT}educator/`)
      .then((response) => {
        setEducators(response.data);
      })
      .catch((error) => {
        console.error('Error fetching educators:', error);
      });

    axios
      .get(`${API_ENDPOINT}student/`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });

    axios
      .get(`${API_ENDPOINT}user/`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, [lessonData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'datetime-local') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };
  
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <LayoutProfiles profile={'admin'} selected={'Clases'}>
      <ToastContainer />
      <button className='button' onClick={() => navigate('/admin/clases')} style={{ alignSelf: 'start', marginLeft: '15%' }}>
        Volver
      </button>
      <div className="register-container admin">
        <label>Nombre de la clase</label>
        <input
          type="text"
          placeholder="Ingrese el nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Descripción</label>
        <input
          type="text"
          placeholder="Ingrese descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Capacidad</label>
        <input
          type="number"
          placeholder="Ingrese la capacidad"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          min="1"
        />
        <div style={{ marginTop: '4%' }}>
          <input
            type="checkbox"
            name="is_morning_lesson"
            checked={formData.is_morning_lesson}
            onChange={handleChange}
          />
          <label>¿Es una clase por la mañana?</label>
        </div>

        <label>Seleccione al educador/a</label>
        <Select
          name="educator"
          value={formData.educator}
          onChange={handleSelectChange}
          style={{ width: '70%' }} 
        >
          {educators.map((educator) => (
            <MenuItem key={educator.id} value={educator.id}>
              {users.find((user) => user.id === educator.id)?.name}
            </MenuItem>
          ))}
        </Select>

        <label>Seleccione a los estudiantes</label>
        <Select
          name="students"
          multiple
          value={formData.students}
          onChange={handleChange}
          style={{ width: '70%' }} 
        >
          {students.map((student) => (
            <MenuItem key={student.id} value={student.id}>
              {student.name}
            </MenuItem>
          ))}
        </Select>

        <label>Fecha de inicio</label>
        <input
          type="datetime-local"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
        />

        <label>Fecha de fin</label>
        <input
          type="datetime-local"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
        />

        <button className="register-button" onClick={() => handleSubmit(formData)}>
          Guardar
        </button>
      </div>    
    </LayoutProfiles>
  );
};

export default AdminLessonsEdit;
