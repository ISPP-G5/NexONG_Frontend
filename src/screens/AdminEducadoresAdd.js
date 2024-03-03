import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import HeaderAdmin from '../components/HeaderAdmin';
import MenuAdmin from '../components/MenuAdmin';

function AdminEducadores() {
  
  return (
    <div className='App'>
        <HeaderAdmin />
        <div className='admin-main'>

            {/* Change selected for the name of your screen */}
            <MenuAdmin selected='Educadores' />
            <div className='vertical-line'></div>  

            <div className='admin-container'>
            
                {/* Example of screen with several screens inside */}
                <div className='pantallas'>
                    <Link to='/AdminEducadores'>Nuestros Proyectos</Link>
                    <Link to='/AdminAñadirEducadores' className='selected-pantalla'>Añadir Educador</Link>
                </div>
                
            </div>
        </div>        
    </div>
  );
}

export default AdminEducadores;