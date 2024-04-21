import React, { useState, useEffect } from 'react';
import LayoutProfiles from '../../components/LayoutProfiles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToken from '../../components/useToken';

import '../../styles/styles.css';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const AdminScheduleCreate = () => {
  const [localFormData, setLocalFormData] = useState({
    lesson: '',
    weekday: '',
    start_time: '',
    end_time: '',
  });
  const [lessons, setLessons] = useState([]);
  const [weekdays, setWeekdays] = useState(['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO']); // Hardcoded list of weekdays

  const navigate = useNavigate();
  const [token, updateToken] = useToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  };
  const handleScheduleClick = () => {
    navigate('/admin/clases');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({ ...localFormData, [name]: value });
  };

  const handleSubmit = () => {
    // Check if any field is empty
    if (!localFormData.lesson || !localFormData.weekday || !localFormData.start_time || !localFormData.end_time) {
      toast.error('Por favor, completa todos los campos');
      return;
    }
    if (localFormData.start_time >= localFormData.end_time) {
      toast.error('La hora de fin debe ser posterior a la hora de inicio');
      return;
    }

    axios
      .post(`${API_ENDPOINT}schedule/`, localFormData, config)
      .then((response) => {
        console.log('Response of post of schedule:', response.data);
        toast.success('Horario creado con éxito');
      })
      .catch((error) => {
        console.error('Error creating schedule:', error);
        toast.error('Error al crear el horario.');
      });
  };

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}lesson/`, config)
      .then((response) => {
        console.log('response lessons:', response.data);
        setLessons(response.data);
      })
      .catch((error) => {
        console.error('Error fetching lessons:', error);
      });
  }, []);

  return (
    <LayoutProfiles profile={'admin'} selected={'Horarios'}>
      <button className='button' onClick={handleScheduleClick} style={{ alignSelf: 'start', marginLeft: '15%' }}>
        Volver
      </button>
      <ToastContainer />
      <div className="register-container admin">
        <label>Seleccione la clase</label>
        <Select
          name="lesson"
          value={localFormData.lesson}
          onChange={handleChange}
          style={{ width: '70%' }} 
        >
          {lessons.map((lesson) => (
            <MenuItem key={lesson.id} value={lesson.id}>
              {lesson.name}
            </MenuItem>
          ))}
        </Select>

        <label>Día de la semana</label>
        <Select
          name="weekday"
          value={localFormData.weekday}
          onChange={handleChange}
          style={{ width: '70%' }}
        >
          {weekdays.map((weekday, index) => (
            <MenuItem key={index} value={weekday}>
              {weekday}
            </MenuItem>
          ))}
        </Select>

        <label>Hora de inicio</label>
        <input
          type="time"
          name="start_time"
          value={localFormData.start_time}
          onChange={handleChange}
        />

        <label>Hora de fin</label>
        <input
          type="time"
          name="end_time"
          value={localFormData.end_time}
          onChange={handleChange}
        />

        <button className="register-button" onClick={handleSubmit}>
          Crear
        </button>
      </div>
    </LayoutProfiles>
  );
};

export default AdminScheduleCreate;
