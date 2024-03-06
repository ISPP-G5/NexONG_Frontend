// AdminView.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import HeaderAdmin from '../components/HeaderAdmin';
import MenuAdmin from '../components/MenuAdmin';

const Asamblea = () => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '2000px', alignItems: 'center',marginLeft:'-50%'}}>
        <form onSubmit={"handleSubmit"}>

          <div className='field-text' style={{ marginBottom: '20px' }}>
            <h4 style={{marginLeft:'25%'}} >Titulo</h4>
            <input type='text' placeholder='Escriba aquí' style={{ width: '115%'}} ></input>
          </div>
          
          <div className='field-text' style={{ marginBottom: '20px' }}>
          <h4 style={{marginLeft:'25%'}}>Descripción</h4>
            <input type='text' placeholder='Escriba aquí' style={{ width: '115%', height: '150px', resize: 'vertical', paddingBottom: '+40%' }} ></input>
          </div>
          
          <div className='field-text' style={{ marginBottom: '20px' }}>
            <h4 style={{marginLeft:'25%'}}>Fecha</h4>
            <input type='text' placeholder='dd/mm/yyyy' style={{ width: '115%'}} ></input>
          </div>
          
          <div style={{ marginLeft: '200px' }}>
            <button className='button' style={{width:'100px' }}>crear</button>
          </div>
        </form>
      </div>
    </>

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