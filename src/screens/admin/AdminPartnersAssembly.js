// AdminView.js
import React, { useState } from 'react';
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import axios from 'axios';
import Pantallas from '../../components/Pantallas';

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

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
const Asamblea = () => {
  const [titulo,setTitulo] = useState('');
  const [descripcion,setDescripcion] = useState('');
  const [fecha,setFecha] = useState('');
  const [hora,setHora] = useState('');
  const [asistentes,setAsistentes] = useState([]);



  const sendForm = async () =>{
    if(!titulo || titulo === ''){
      window.alert("Se debe de insertar un titulo")
    }else if(!descripcion || descripcion === ''){
      window.alert("Se debe de insertar una descripción")
    }else if(!fecha || fecha === ''){
      window.alert("Se debe de insertar una fecha")
    }else if(!hora || hora === ''){
      window.alert("Se debe de insertar una hora")
    }else{
      const listaAsistentes = asistentes.split(',');
      const update = await axios.post(`${API_ENDPOINT}meeting/`,{
        name: titulo,
        description: descripcion,
        date: fecha,
        time: hora,
        attendees: listaAsistentes,

      });
      console.log(update);
      const{data} = update;
      if(data.message){
        window.alert(data.message);
      }else{
        window.alert('Asamblea creada con exito');
      }
    }

  }

  return (
    <form onSubmit={sendForm} className='register-container admin'>

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

      <label>Asistentes</label>
      <input 
        type='text'
        value={asistentes}
        placeholder='id-sistentes, ejemplo: 1,2,3,4' 
        onChange={(e) => setAsistentes(e.target.value)}
      ></input>
      
      <button type='submit' className='register-button admin'>Convocar asamblea</button>
    </form>

  )

};
const AdminPartnersAssembly = () => {
  return (
    <LayoutProfiles profile='admin' selected='Socios'>
        <Pantallas pantallas={pantallas}/>
        <Asamblea/>
    </LayoutProfiles>
  );
}

export default AdminPartnersAssembly; 