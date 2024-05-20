// AdminView.js
import React, { useState, useEffect } from 'react';
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import axios from 'axios';
import Pantallas from '../../components/Pantallas';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToken from '../../components/useToken';
const pantallas = [
  {
    pantalla: 'Nuestros socios',
    link: '/admin/socios',
    selected: false,
  },
  {
    pantalla: 'Convocar asamblea',
    link: '/admin/socios/asamblea',
    selected: true,
  }
];
const token = localStorage.getItem('accessToken');


// This function takes the user and partner data and create an array with the matched keys.
const partnersData = (data, partners) => {
 
  let Data = [];

  for (let item of data) {
    for (let vol of partners) {
      if (item.volunteer === vol.id) {
        Data.push(vol.id);
        break;
      }
    }
  }

  return Data;
}

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
const Asamblea = () => {
  const [token, updateToken] = useToken();
  const config = {
  headers: {
    'Authorization': `Bearer ${token}`,
  }
};
  const [socios, setSocios] = useState([]);
  const [users, setUsers] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const letters = /^[A-Za-z]+$/;

  // partner and user are related, user has a fk of the entity partner
  useEffect(() => {
    axios.get(`${API_ENDPOINT}user/`, config)
      .then(response => {
        setUsers(partnersData(response.data, socios));
      })
      .catch(error => {
        console.error(error);
      });
  }, [socios]);
  
  useEffect(() => {
    axios.get(`${API_ENDPOINT}partner/`, config)
      .then(response => {
        setSocios(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const meetingDate = new Date(fecha);



  const sendForm = async (e) => {
    e.preventDefault();
  
    if (!titulo || titulo === '') {
      toast.error("Se debe insertar un título", { autoClose: 5000 });
      return;
    }
  
    if (!descripcion || descripcion === '') {
      toast.error("Se debe insertar una descripción");
      return;
    }
  
    if (!fecha || fecha === '') {
      toast.error("Se debe insertar una fecha");
      return;
    }
  
    if (!hora || hora === '') {
      toast.error("Se debe insertar una hora");
      return;
    }
  
    // Combinar fecha y hora en un objeto Date
    const meetingDateTimeString = `${fecha}T${hora}`;
    const meetingDate = new Date(meetingDateTimeString);
  
    // Obtener la fecha y hora actual en la misma zona horaria
    const currentDate = new Date();
  
    // Comparar las fechas
    if (meetingDate <= currentDate) {
      toast.error('No se puede crear una reunión en el pasado o en el mismo momento.');
      return;
    }
  
    if (titulo.length > 75) {
      toast.error('Ha introducido un número mayor de caracteres permitidos para el título');
      return;
    }
  
    if (descripcion.length > 1000) {
      toast.error('Ha introducido un número mayor de caracteres permitidos para la descripción');
      return;
    }
  
    try {
      const listaAsistentes = users.join(",").split(",");
      const response = await axios.post(`${API_ENDPOINT}meeting/`, {
        name: titulo,
        description: descripcion,
        date: fecha,
        time: hora,
        attendees: listaAsistentes,
      }, config);
  
      toast.success('Asamblea creada con éxito', { autoClose: 5000 });
    } catch (error) {
      toast.error('Error al crear la asamblea');
      console.error(error);
    }
  };

  return (
    <form onSubmit={sendForm} className='register-container admin'>
      <ToastContainer autoClose={5000} />

      <label>Título</label>
      <input
        type='text'
        value={titulo}
        placeholder='Escriba aquí'
        onChange={(e) => setTitulo(e.target.value)}
      ></input>

      <label>Descripción</label>
      <textarea
        value={descripcion}
        type='text'
        placeholder='Escriba aquí'
        onChange={(e) => setDescripcion(e.target.value)}
s
      ></textarea>

      <label>Fecha</label>
      <input
        value={fecha}
        id="date"
        label="Birthday"
        type="date"
        placeholder='dd/mm/yyyy'
        onChange={(e) => setFecha(e.target.value)}
      ></input>

      <label>Hora</label>
      <input
        value={hora}
        id="time"
        label="Next appointment"
        type="time"
        onChange={(e) => setHora(e.target.value)}
        style={{ fontSize: '18px', padding: '10px' }} // Inline styles

      ></input>
      <button type='submit' className='register-button admin'>Convocar asamblea</button>
    </form>

  )

};
const AdminPartnersAssembly = () => {
  return (
    <LayoutProfiles profile='admin' selected='Socios'>
      <Pantallas pantallas={pantallas} />
      <Asamblea />
    </LayoutProfiles>
  );
}

export default AdminPartnersAssembly; 