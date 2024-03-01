import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
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
                    <a href='/AdminProyectos'>Proyectos</a>
                    <a href='/AdminCrearProyecto' className='selected-pantalla'>Crear Proyecto Nuevo</a>
                    
                </div>
                {/* Example of blue card for info */}
                <div className='card-info'>
                    <div className='family-info'>
                        <p>Name: </p>
                        <p>Information: </p>
                        <p>Number of kids:</p>
                    </div>
                    <div className='vertical-line'></div>
                    <div className='kids-info'>
                        <div className='kid'>
                            <p>Kid's Name:</p>
                            <p>Class: </p>
                            <p>Evaluation: </p>
                        </div>
                    </div>
                </div>
                
                {/* INTRODUCE HERE YOUR IMPLEMENTATIONS */}

            </div>
        </div>        
    </div>
  );
}

export default AdminProyectos;