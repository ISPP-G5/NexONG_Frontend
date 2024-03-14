import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import '../styles/styles.css';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const AdminCreateLesson = () => {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle special cases for certain input types
    if (type === 'checkbox') {
      setLocalFormData({ ...localFormData, [name]: checked });
    } else if (name === 'educator') {
      // Set only the id of the selected educator
      setLocalFormData({ ...localFormData, [name]: value });
    } else {
      setLocalFormData({ ...localFormData, [name]: value });
    }

    console.log('Updated State:', localFormData);
  };

  const handleSubmit = () => {
    // Handle the creation of the lesson here
    axios
      .post(`${API_ENDPOINT}lesson/`, localFormData)
      .then((response) => {
        console.log('Response of post:', response.data);
        setLessons([...lessons, response.data]);
        // Optionally, you can navigate or perform any other action after successful creation
      })
      .catch((error) => {
        console.error('Error creating lesson:', error);
      });
  };

  const labelStyle = {
    width: '80%',
    height: '2rem',
    top: '5rem',
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: '505',
    fontSize: '1rem',
    lineHeight: '1.75rem',
    color: '#7C838A',
    marginBottom: '0rem',
  };

  const inputStyle = {
    width: '80%',
    borderRadius: '1rem',
    margin: '0 auto',
    boxSizing: 'border-box',
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
  }, []);

// ... (previous code)

return (
  <AdminLayout selected='Clases'>
  <div className="flex-lesson-form">
    <a style={labelStyle}>Nombre de la clase</a>
    <input
      type="text"
      placeholder="Ingrese el nombre"
      name="name"
      style={inputStyle}
      value={localFormData.name}
      onChange={handleChange}
    />

    <a style={labelStyle}>Descripción</a>
    <input
      type="text"
      style={inputStyle}
      placeholder="Ingrese descripción"
      name="description"
      value={localFormData.description}
      onChange={handleChange}
    />

    <a style={labelStyle}>Capacidad</a>
    <input
      type="number"
      style={inputStyle}
      placeholder="Ingrese la capacidad"
      name="capacity"
      value={localFormData.capacity}
      onChange={handleChange}
    />

    <a style={labelStyle}>¿Es una clase por la mañana?</a>
    <input
      type="checkbox"
      style={inputStyle}
      name="is_morning_lesson"
      checked={localFormData.is_morning_lesson}
      onChange={handleChange}
    />

    <a style={labelStyle}>Seleccione al educador/a</a>
    <Select
      name="educator"
      style={inputStyle}
      value={localFormData.educator.id}
      onChange={handleChange}
    >
      {educators.map((educator) => (
        <MenuItem key={educator.id} value={educator.id}>
          {educator.id} {/* Change 'name' to the relevant property */}
        </MenuItem>
      ))}
    </Select>

    <a style={labelStyle}>Seleccione a los estudiantes</a>
    <Select
      name="students"
      multiple
      style={inputStyle}
      value={localFormData.students}
      onChange={handleChange}
    >
      {students.map((student) => (
        <MenuItem key={student.id} value={student.id}>
          {student.name} {/* Change 'name' to the relevant property */}
        </MenuItem>
      ))}
    </Select>

    <a style={labelStyle}>Fecha de inicio</a>
    <input
      type="datetime-local"
      name="start_date"
      style={inputStyle}
      value={localFormData.start_date}
      onChange={handleChange}
    />

    <a style={labelStyle}>Fecha de fin</a>
    <input
      type="datetime-local"
      name="end_date"
      style={inputStyle}
      value={localFormData.end_date}
      onChange={handleChange}
    />

    <button className="button" onClick={handleSubmit}>
      Crear
    </button>
  </div>
  </AdminLayout>
);
};

// ... (remaining code)


export default AdminCreateLesson;