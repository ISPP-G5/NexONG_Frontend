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

  // Define studentsFiltered state
  const [studentsFiltered, setStudentsFiltered] = useState([]);

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
    if (!Number.isInteger(formData.capacity) || formData.capacity <= 0) {
      toast.error('La capacidad debe ser un número entero positivo.');
      return;
    }
    if (!formData.name ||!formData.description ||!formData.capacity ||!formData.start_date ||!formData.end_date ||!formData.educator || formData.students.length === 0) {
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
        // Filter students based on the is_morning_student value
        const filteredStudents = lessonData.is_morning_lesson ? response.data.filter(student => student.is_morning_student) : response.data.filter(student => !student.is_morning_student);
        setStudentsFiltered(filteredStudents);
        console.log(response.data);
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
  
    if (type === 'date') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (name === 'educator') {
      // For select inputs, no need to convert value to number
      setFormData((prevData) => ({
        ...prevData,
        educator: value,
      }));
    } else if (name === 'students') {
      // For select inputs, no need to convert value to number
      setFormData((prevData) => ({
        ...prevData,
        students: value,
      }));
    } else if (name === 'capacity') {
      // Ensure the capacity is a positive integer or empty string
      if (value === '' || !isNaN(parseInt(value)) && parseInt(value) > 0) {
        setFormData((prevData) => ({
          ...prevData,
          capacity: value === '' ? value : parseInt(value),
        }));
      }
    } else if (name === 'is_morning_lesson') {
      // Reset students and filter based on morning lesson
      const filteredStudents = checked ? students.filter(student => student.is_morning_student) : students.filter(student => !student.is_morning_student);
      setFormData(prevData => ({
        ...prevData,
        students: [],
        is_morning_lesson: checked,
      }));
      setStudentsFiltered(filteredStudents);
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
              {users.find((user) => user.id === educator.id)?.first_name + ' ' + users.find((user) => user.id === educator.id)?.last_name}
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
          value={formData.start_date}
          onChange={handleChange}
        />

        <label>Fecha de fin</label>
        <input
          type="date"
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
