import React from 'react';
import '../styles/styles.css';
import HeaderAdmin from '../components/HeaderAdmin';
import MenuAdmin from '../components/MenuAdmin';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
                    <a href='/AdminProyectos' className='selected-pantalla'>Proyectos</a>
                    <a href='/AdminCrearProyecto'>Crear Proyecto Nuevo</a>
                </div>
                {/* Example of blue card for info */}
                <div className='card-info-proyecto'>
                    <div className= 'card-info-proyecto-text'>
                        Proyecto 1</div>
                    <EditIcon className="edit-fill" />
                    <DeleteIcon className="trash" />
                </div>
                
                {/* INTRODUCE HERE YOUR IMPLEMENTATIONS */}

            </div>
        </div>        
    </div>
  );
}

export default AdminProyectos;