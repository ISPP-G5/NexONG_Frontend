// AdminView.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import HeaderAdmin from '../components/HeaderAdmin';
import MenuAdmin from '../components/MenuAdmin';
import axios from 'axios';

const Asamblea = () => {
  const [titulo,setTitulo] = useState('');
  const [descripcion,setDescripcion] = useState('');
  const [fecha,setFecha] = useState('');

  const sendForm = async () =>{
    if(!titulo || titulo === ''){
      window.alert("Se debe de insertar un titulo")
    }else if(!descripcion || descripcion === ''){
      window.alert("Se debe de insertar una descripción")
    }else if(!descripcion || descripcion === ''){
      window.alert("Se debe de insertar una fecha")
    }else{
      const update = await axios.post('http://127.0.0.1:8000/api/meeting/',{
        name: titulo,
        description: descripcion,
        date: '2024-02-16',
        time: '2024-02-16T17:50:00Z',
        attendees: [
            1,
            2
        ],

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
      <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginLeft:'-75%',marginTop:'2%'}}>
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
          <h4 style={{marginLeft:'-50%', color: '#717070',marginBottom:'5%'}}>Descripción</h4>
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
            defaultValue="2017-05-24"
            className='asam-input' 
            placeholder='dd/mm/yyyy'
             style={{ width: '115%'}} 
             onChange={(e) => setFecha(e.target.value)}
             ></input>
          </div>
          <div className='field-text'>
            <h4 style={{marginLeft:'-60%', color: '#717070',marginBottom:'5%'}}>Hora</h4>
            <input value={fecha}
            id="date"
            label="Birthday"
            type="date"
            defaultValue="2017-05-24"
            className='asam-input' 
            placeholder='dd/mm/yyyy'
             style={{ width: '115%'}} 
             onChange={(e) => setFecha(e.target.value)}
             ></input>
           </div>
          
          <div style={{ marginLeft: '50%' }}>
            <button type='submit' className='button' style={{width:'100px' }}>crear</button>
          </div>
        </form>
      </div>
    

  )

};
const AdminAsamblea = () => {
  return (
    <div className='App'>
      <HeaderAdmin />
      <div className='admin-main'>
        <MenuAdmin selected='Socios' />
        <div className='vertical-line'></div>

        <div className='admin-container'>
          <div className='pantallas'>
            <Link to='/adminSocios'>
              Nuestros Socios
            </Link>
            <Link to='/convocar-asamblea'  className='selected-pantalla' >Convocar Asamblea</Link>
          </div>
          <Asamblea/>
        </div>
      </div>
    </div>
  );
}

export default AdminAsamblea; 