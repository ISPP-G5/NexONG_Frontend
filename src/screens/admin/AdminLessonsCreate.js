import React, { useState, useEffect } from 'react';
import LayoutProfiles from '../../components/LayoutProfiles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../styles/styles.css';
import useToken from '../../components/useToken';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const AdminLessonsCreate = () => {
  const [token, updateToken] = useToken();
    const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  };
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
  const [studentsFiltered, setStudentsFiltered] = useState([]); // Define studentsFiltered state
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const handleClassClick = () => {
    navigate('/admin/clases');
  };

  const handleChange = (e) => {
    
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setLocalFormData({ ...localFormData, [name]: checked, students: []});

      // Update studentsFiltered based on the checked state of the checkbox
      const filteredStudents = checked ? students.filter(student => student.is_morning_student) : students.filter(student => !student.is_morning_student);
      setStudentsFiltered(filteredStudents);
    } else if (name === 'educator' || name === 'students') {
      // For select inputs, no need to convert value to number
      setLocalFormData({ ...localFormData, [name]: value });
    } else if (name === 'capacity') {
      // Ensure the capacity is a positive integer
      const intValue = parseInt(value);
      if (!isNaN(intValue) && intValue > 0) {
        setLocalFormData({ ...localFormData, [name]: intValue });
      } else {
        setLocalFormData({ ...localFormData, [name]: '' }); // Reset to empty string if not a valid integer
      }
    } else {
      setLocalFormData({ ...localFormData, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (!Number.isInteger(localFormData.capacity) || localFormData.capacity <= 0) {
      toast.error('La capacidad debe ser un número entero positivo.');
      return;
    }
    if (!localFormData.name || !localFormData.description || !localFormData.capacity || !localFormData.start_date || !localFormData.end_date || !localFormData.educator || localFormData.students.length === 0) {
      toast.error('Por favor, rellene todos los campos.');
      return;
    }
    axios
      .post(`${API_ENDPOINT}lesson/`, localFormData, config)
      .then((response) => {
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
            toast.error('Error: la fecha de fin no puede ser anterior o igual a la de inicio.');
          } else if (data && data.students) {
            toast.error('Error: hay estudiantes que no pertenecen a este turno'); // Display students error
          } else if (data && data.students) {
            toast.error('Error: hay estudiantes que no pertenecen a este turno'); // Display students error
          }
        }
        else if (localFormData.name.length > 75) {
          toast.error('Ha introducido mayor número de carácteres del permitido');
          return;
        }
        else if (localFormData.description.length > 1000) {
          toast.error('Ha introducido mayor número de carácteres del permitido');
          return;
        }
        else {
            toast.error('Ha ocurrido un error al crear la clase.');
          }
       
      });
  };

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}educator/`, config)
      .then((response) => {
        setEducators(response.data);
      })
      .catch((error) => {
        console.error('Error fetching educators:', error);
      });
    axios
      .get(`${API_ENDPOINT}student/`, config)
      .then((response) => {
        setStudents(response.data);
        const studentsFiltered = response.data.filter(student => student.is_morning_student === false); // Initialize studentsFiltered state
        setStudentsFiltered(studentsFiltered);
        
      })
      .catch((error) => {
        console.error('Error fetching educators:', error);
      });
    axios
    .get(`${API_ENDPOINT}user/`, config)
    .then((response) => {
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
          onChange={(e) => handleChange(e, 'name')}
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
          min="1"
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
              {users.find((user) => user.id === educator.id)?.first_name + ' ' + users.find((user) => user.id === educator.id)?.last_name}
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
          {studentsFiltered.map((student) => (
    <MenuItem key={student.id} value={student.id}>
    {student.surname ? `${student.name} ${student.surname}` : student.name}
  </MenuItem>
          ))}
        </Select>

        <label>Fecha de inicio</label>
        <input
          type="date"
          name="start_date"
          value={localFormData.start_date}
          onChange={handleChange}
        />

        <label>Fecha de fin</label>
        <input
          type="date"
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
