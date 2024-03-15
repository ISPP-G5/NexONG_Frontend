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
    setFormData(initialData); // Populate form data with initial data

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
  }, [initialData]); // Run effect when initialData changes

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Check if the input is a date field
    if (type === 'datetime-local') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      
    } else {
      // For other fields, update the form data as usual
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
        
      <a className="form-label">Nombre de la clase</a>
      <input
        type="text"
        placeholder="Ingrese el nombre"
        name="name"
        className="form-input"
        value={formData.name}
        onChange={handleChange}
      />

      <a className="form-labelStyle">Descripción</a>
      <input
        type="text"
        placeholder="Ingrese descripción"
        name="description"
        className="form-input"
        value={formData.description}
        onChange={handleChange}
      />

      <a className="form-label">Capacidad</a>
      <input
        type="number"
        placeholder="Ingrese la capacidad"
        name="capacity"
        className="form-input"
        value={formData.capacity}
        onChange={handleChange}
        min="1"
      />

      <a className="form-label">¿Es una clase por la mañana?</a>
      <input
        type="checkbox"
        name="is_morning_lesson"
        checked={formData.is_morning_lesson}
        onChange={handleChange}
      />

      <a className="form-label">Seleccione al educador/a</a>
      <Select
        name="educator"
        value={formData.educator}
        onChange={handleSelectChange}
        className="form-input"
      >
        {educators.map((educator) => (
          <MenuItem key={educator.id} value={educator.id}>
            {users.find((user) => user.id === educator.id)?.name}
          </MenuItem>
        ))}
      </Select>

      <a className="form-label">Seleccione a los estudiantes</a>
      <Select
        name="students"
        multiple
        value={formData.students}
        onChange={handleChange}
        className="form-input"
      >
        {students.map((student) => (
          <MenuItem key={student.id} value={student.id}>
            {student.name}
          </MenuItem>
        ))}
      </Select>

      <a className="form-label">Fecha de inicio</a>
      <input
        type="datetime-local"
        name="start_date"
        className="form-input"
        value={formData.start_date}
        onChange={handleChange}
      />

      <a className="form-label">Fecha de fin</a>
      <input
        type="datetime-local"
        name="end_date"
        className="form-input"
        value={formData.end_date}
        onChange={handleChange}
      />

      
       
        <button className="button" onClick={() => handleSubmit(formData)}>
          Guardar
        </button>
     
      
    </div>
  );
};

export default AdminLessonForm;
