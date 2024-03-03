import React from 'react';
import '../styles/styles.css';
import HeaderAdmin from '../components/HeaderAdmin';
import MenuAdmin from '../components/MenuAdmin';

function AdminProyectos() {
  return (
    <div className='App'>
        <HeaderAdmin />
        <div className='admin-main'>

            {/* Change selected for the name of your screen */}
            <MenuAdmin selected='Proyectos' />
            <div className='vertical-line'></div>  

            <div className='admin-container'>
            
                {/* Example of screen with several screens inside */}
                <div className='pantallas'>
                    <a href='/AdminProyectos'>Nuestros Proyectos</a>
                    <a href='/AdminCrearProyecto' className='selected-pantalla'>Añadir Proyecto</a>
                </div>
            
            </div>
        </div>        
    </div>
  );
}

export default AdminProyectos;