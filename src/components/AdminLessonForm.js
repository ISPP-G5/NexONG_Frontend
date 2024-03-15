import React, { useState, useEffect } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const AdminLessonForm = ({ initialData, handleSubmit }) => {
  const [formData, setFormData] = useState(initialData);
  const [educators, setEducators] = useState([]);
  const [students, setStudents] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFormData(initialData);

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
  }, [initialData]);

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
    <div className="flex-lesson-form">
      <a style={labelStyle}>Nombre de la clase</a>
      <input
        type="text"
        placeholder="Ingrese el nombre"
        name="name"
        style={inputStyle}
        value={formData.name}
        onChange={handleChange}
      />

      <a style={labelStyle}>Descripción</a>
      <input
        type="text"
        placeholder="Ingrese descripción"
        name="description"
        style={inputStyle}
        value={formData.description}
        onChange={handleChange}
      />

      <a style={labelStyle}>Capacidad</a>
      <input
        type="number"
        placeholder="Ingrese la capacidad"
        name="capacity"
        style={inputStyle}
        value={formData.capacity}
        onChange={handleChange}
        min="1"
      />

      <a style={labelStyle}>¿Es una clase por la mañana?</a>
      <input
        type="checkbox"
        name="is_morning_lesson"
        style={inputStyle}
        checked={formData.is_morning_lesson}
        onChange={handleChange}
      />

      <a style={labelStyle}>Seleccione al educador/a</a>
      <Select
        name="educator"
        style={inputStyle}
        value={formData.educator}
        onChange={handleSelectChange}
      >
        {educators.map((educator) => (
          <MenuItem key={educator.id} value={educator.id}>
            {users.find((user) => user.id === educator.id)?.name}
          </MenuItem>
        ))}
      </Select>

      <a style={labelStyle}>Seleccione a los estudiantes</a>
      <Select
        name="students"
        multiple
        style={inputStyle}
        value={formData.students}
        onChange={handleChange}
      >
        {students.map((student) => (
          <MenuItem key={student.id} value={student.id}>
            {student.name}
          </MenuItem>
        ))}
      </Select>

      <a style={labelStyle}>Fecha de inicio</a>
      <input
        type="datetime-local"
        name="start_date"
        style={inputStyle}
        value={formData.start_date}
        onChange={handleChange}
      />

      <a style={labelStyle}>Fecha de fin</a>
      <input
        type="datetime-local"
        name="end_date"
        style={inputStyle}
        value={formData.end_date}
        onChange={handleChange}
      />

      <button className="button" onClick={() => handleSubmit(formData)}>
        Guardar
      </button>
    </div>
  );
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
  height: '2rem',
  borderRadius: '1rem',
  margin: '0 auto',
  boxSizing: 'border-box',
};

export default AdminLessonForm;
