import React, { useState, useEffect } from 'react';
import LayoutProfiles from '../../components/LayoutProfiles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../styles/styles.css';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const AdminLessonsCreate = () => {
  const [localFormData, setLocalFormData] = useState({
    name: '',
    description: '',
    capacity: '',
    is_morning_lesson: false,
    educator: '',
    students: [],
    start_date: '',
    end_date: '',
  });
  const [educators, setEducators] = useState([]);
  const [students, setStudents] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [users, setUsers] = useState([]);
  

  const navigate = useNavigate();
  const handleClassClick = () => {

    navigate('/admin/clases');
  
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setLocalFormData({ ...localFormData, [name]: checked });
    } else if (name === 'educator') {
      setLocalFormData({ ...localFormData, [name]: value });
    } else {
      setLocalFormData({ ...localFormData, [name]: value });
    }

    console.log('Updated State:', localFormData);
  };

  const handleSubmit = () => {
    if (!localFormData.name || !localFormData.description || !localFormData.capacity || !localFormData.start_date || !localFormData.end_date) {
      toast.error('Por favor, rellene todos los campos.');
      return;
    }
    axios
      .post(`${API_ENDPOINT}lesson/`, localFormData)
      .then((response) => {
        console.log('Response of post:', response.data);
        toast.success('Clase creada con éxito');
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
            toast.error('Ha ocurrido un error al crear la clase.');
          }
        } else {
          console.error('Error creating lesson:', error);
        }
      });
  };

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}educator/`)
      .then((response) => {
        console.log('response educators:', response.data);
        setEducators(response.data);
      })
      .catch((error) => {
        console.error('Error fetching educators:', error);
      });
    axios
      .get(`${API_ENDPOINT}student/`)
      .then((response) => {
        console.log('response students:', response.data);
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching educators:', error);
      });
    axios
    .get(`${API_ENDPOINT}user/`)
    .then((response) => {
      console.log('response user:', response.data);
      setUsers(response.data);
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
    });
  }, []);


return (
  <LayoutProfiles profile={'admin'} selected={'Clases'}>
  <button className='button' onClick={handleClassClick} style={{ alignSelf: 'start', marginLeft: '15%' }}>
    Volver
  </button>
  <ToastContainer />
  <div className="register-container admin">
    <label>Nombre de la clase</label>
    <input
      type="text"
      placeholder="Ingrese el nombre"
      name="name"
      value={localFormData.name}
      onChange={handleChange}
    />

    <label>Descripción</label>
    <input
      type="text"
      placeholder="Ingrese descripción"
      name="description"
      value={localFormData.description}
      onChange={handleChange}
    />

    <label>Capacidad</label>
    <input
      type="number"
      placeholder="Ingrese la capacidad"
      name="capacity"
      value={localFormData.capacity}
      onChange={handleChange}
      min = "1"
    />
    
    <div style={{ marginTop: '4%' }}>
      <input
        type="checkbox"
        name="is_morning_lesson"
        checked={localFormData.is_morning_lesson}
        onChange={handleChange}
      />
      <label>¿Es una clase por la mañana?</label>
    </div>

    <label>Seleccione al educador/a</label>
    <Select
      name="educator"
      value={localFormData.educator.id}
      onChange={handleChange}
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
        value={localFormData.students}
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
      value={localFormData.start_date}
      onChange={handleChange}
    />

    <label>Fecha de fin</label>
    <input
      type="datetime-local"
      name="end_date"
      value={localFormData.end_date}
      onChange={handleChange}
    />

    <button className="register-button" onClick={handleSubmit}>
      Crear
    </button>
  </div>
  </LayoutProfiles>
);
};



export default AdminLessonsCreate;
