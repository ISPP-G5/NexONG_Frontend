// AdminView.js
import React, { useState, useEffect } from 'react';
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import axios from 'axios';
import Pantallas from '../../components/Pantallas';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [socios, setSocios] = useState([]);
  const [users, setUsers] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  // partner and user are related, user has a fk of the entity partner
  useEffect(() => {
    axios.get(`${API_ENDPOINT}user/`)
      .then(response => {
        setUsers(partnersData(response.data, socios));
        console.log(partnersData(response.data, socios));
      })
      .catch(error => {
        console.error(error);
      });
  }, [socios]);
  
  useEffect(() => {
    axios.get(`${API_ENDPOINT}partner/`)
      .then(response => {
        setSocios(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);




  const sendForm = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página
    if (!titulo || titulo === '') {
      toast.error("Se debe de insertar un titulo", {
        autoClose: 5000
        })
    } else if (!descripcion || descripcion === '') {
      toast.error("Se debe de insertar una descripción")
    } else if (!fecha || fecha === '') {
      toast.error("Se debe de insertar una fecha")
    } else if (!hora || hora === '') {
      toast.error("Se debe de insertar una hora")
    } else {
      // listaAsistentes uses join to transform de array in a string an then separe the keys
      const listaAsistentes = users.join(",").split(",");
      const update = await axios.post(`${API_ENDPOINT}meeting/`, {
        name: titulo,
        description: descripcion,
        date: fecha,
        time: hora,
        attendees: listaAsistentes,

      });
      console.log(update);
      const { data } = update;
      if (data.message) {
        toast.error("Datos no válidos." , {
          autoClose: 5000
          });
      } else {
        toast.success('Asamblea creada con exito', {
          autoClose: 5000
          });
      }
    }

  }

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
      <input
        value={descripcion}
        type='text'
        placeholder='Escriba aquí'
        onChange={(e) => setDescripcion(e.target.value)}
      ></input>

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
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        placeholder='dd/mm/yyyy'
        onChange={(e) => setHora(e.target.value)}
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