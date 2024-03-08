// AdminView.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import HeaderAdmin from '../components/HeaderAdmin';
import MenuAdmin from '../components/MenuAdmin';

const Asamblea = () => {
  return (
      <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginLeft:'-75%',marginTop:'2%'}}>
        <form onSubmit={"handleSubmit"}>

          <div className='field-text' >
            <h4 style={{marginLeft:'-65%', color: '#717070',marginBottom:'5%'}} >Título</h4>
            <input className='asam-input' placeholder='Escriba aquí' style={{ width: '115%'}} ></input>
          </div>
          
          <div className='field-text' >
          <h4 style={{marginLeft:'-50%', color: '#717070',marginBottom:'5%'}}>Descripción</h4>
            <input className='asam-input' type='text' placeholder='Escriba aquí' style={{ width: '115%', height: '150px', resize: 'vertical', paddingBottom: '+40%' }} ></input>
          </div>
          
          <div className='field-text'>
            <h4 style={{marginLeft:'-60%', color: '#717070',marginBottom:'5%'}}>Fecha</h4>
            <input className='asam-input' type='text' placeholder='dd/mm/yyyy' style={{ width: '115%'}} ></input>
          </div>
          
          <div style={{ marginLeft: '50%' }}>
            <button className='button' style={{width:'100px' }}>crear</button>
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