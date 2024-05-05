import React, { useState, useEffect } from 'react';
import LayoutProfiles from '../../components/LayoutProfiles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScheduleSelect from '../../components/ScheduleSelect';
import '../../styles/styles.css';
import useToken from '../../components/useToken';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const AdminScheduleEdit = () => {
const { scheduleId } = useParams();
const navigate = useNavigate();

const [scheduleData, setScheduleData] = useState({
    lesson: '',
    weekday: '',
    start_time: '',
    end_time: '',
});
const [formData, setFormData] = useState(scheduleData);

const [token, updateToken] = useToken();
const config = {
  headers: {
    'Authorization': `Bearer ${token}`,
  }
};

const [lessons, setLessons] = useState([]);
const [weekdays, setWeekdays] = useState(['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO']); // Hardcoded list of weekdays
useEffect(() => {
    axios
      .get(`${API_ENDPOINT}schedule/${scheduleId}/`, config)
      .then((response) => {
        setScheduleData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching lesson details:', error);
      });
  }, [scheduleId]);

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_ENDPOINT}lesson/`, config);
            setLessons(response.data);
            setFormData(scheduleData);
        } catch (error) {
            console.error('Error fetching lessons:', error);
        }
    };

    fetchData();
}, [scheduleData]);


const handleScheduleClick = () => {
    navigate('/admin/horarios');
};

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
        ...prevData,
        [name]: value
    }));
};


const handleSubmit = (formData) => {
    // Check if any field is empty
    if (!formData.lesson || !formData.weekday || !formData.start_time || !formData.end_time) {
        toast.error('Por favor, completa todos los campos');
        return;
    }

    // Check if end time is after start time
    if (formData.start_time >= formData.end_time) {
        toast.error('La hora de fin debe ser posterior a la hora de inicio');
        return;
    }

    axios
        .put(`${API_ENDPOINT}schedule/${scheduleId}/`, formData)
        .then((response) => {
            toast.success('Horario actualizado con éxito');
        })
        .catch((error) => {
            console.error('Error updating schedule:', error);
            toast.error('Error al actualizar el horario.');
        });
};



return (
    <LayoutProfiles profile={'admin'} selected={'Horarios'}>
    <button className='button' onClick={handleScheduleClick} style={{ alignSelf: 'start', marginLeft: '15%' }}>
        Volver
    </button>
    <ToastContainer />
    <div className="register-container admin">
    <ScheduleSelect
  label="Seleccione la clase"
  name="lesson"
  value={formData.lesson}
  handleChange={handleChange}
  style={{ width: '70%' }}
  options={lessons}
/>

<ScheduleSelect
  label="Día de la semana"
  name="weekday"
  value={formData.weekday}
  handleChange={handleChange}
  style={{ width: '70%' }}
  options={weekdays}
/>

        <label>Hora de inicio</label>
        <input
        type="time"
        name="start_time"
        value={formData.start_time}
        onChange={handleChange}
        />

        <label>Hora de fin</label>
        <input
        type="time"
        name="end_time"
        value={formData.end_time}
        onChange={handleChange}
        />

        <button className="register-button" onClick={() => handleSubmit(formData)}>
        Guardar
        </button>
    </div>
    </LayoutProfiles>
);
};

export default AdminScheduleEdit;