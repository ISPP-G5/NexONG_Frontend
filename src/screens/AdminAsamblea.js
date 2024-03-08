// AdminView.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import AdminLayout from '../components/AdminLayout';
import axios from 'axios';


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
      <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginLeft:'-50%',marginTop:'2%'}}>
        <form onSubmit={sendForm}>

          <div className='field-text' >
            <h4 style={{marginLeft:'-65%', color: '#717070',marginBottom:'5%'}} >Título</h4>
            <input value={titulo}
             className='asam-input' 
             placeholder='Escriba aquí' 
             style={{ width: '115%'}} 
             onChange={(e) => setTitulo(e.target.value)}
             ></input>
          </div>
          
          <div className='field-text' >
          <h4 style={{marginLeft:'-40%', color: '#717070',marginBottom:'5%'}}>Descripción</h4>
            <input value={descripcion}
            className='asam-input' 
            type='text' 
            placeholder='Escriba aquí' 
            style={{ width: '115%', height: '150px', resize: 'vertical', paddingBottom: '+40%' }} 
            onChange={(e) => setDescripcion(e.target.value)}
            ></input>
          </div>
          
          <div className='field-text'>
            <h4 style={{marginLeft:'-60%', color: '#717070',marginBottom:'5%'}}>Fecha</h4>
            <input value={fecha}
            id="date"
            label="Birthday"
            type="date"
            className='asam-input' 
            placeholder='dd/mm/yyyy'
             style={{ width: '115%'}} 
             onChange={(e) => setFecha(e.target.value)}
             ></input>
          </div>
          <div className='field-text'>
            <h4 style={{marginLeft:'-60%', color: '#717070',marginBottom:'5%'}}>Hora</h4>
            <input value={hora}
            id="datetime-local"
            label="Next appointment"
            type="datetime-local"
            className='asam-input' 
            placeholder='dd/mm/yyyy'
             style={{ width: '115%'}} 
             onChange={(e) => setHora(e.target.value)}
             ></input>
           </div>
           <div className='field-text' >
            <h4  style={{marginLeft:'-42%', color: '#717070',marginBottom:'5%'}} >Asistentes</h4>
            <input value={asistentes}
             className='asam-input' 
             placeholder='id-sistentes, ejemplo: 1,2,3,4' 
             style={{ width: '115%'}} 
             onChange={(e) => setAsistentes(e.target.value)}
             ></input>
          </div>
          
          <div style={{ marginLeft: '50%', marginTop:'2%'}}>
            <button type='submit' className='button' style={{width:'100px' }}>crear</button>
          </div>
        </form>
      </div>
    

  )

};
const AdminAsamblea = () => {
  return (
    <AdminLayout>
        <div className='admin-container'>
          <div className='pantallas'>
            <Link to='/adminSocios'>
              Nuestros Socios
            </Link>
            <Link to='/convocar-asamblea'  className='selected-pantalla' >Convocar Asamblea</Link>
          </div>
          <Asamblea/>
        </div>
  </AdminLayout>
  );
}

export default AdminAsamblea; 