import '../../styles/styles.css';
import React, { useEffect, useState } from 'react';
import LayoutHomepage from '../../components/LayoutHomepage';
import useAdjustMargin from '../../components/useAdjustMargin';


function VolunteerForm() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const marginTop = useAdjustMargin();


  return (
    <LayoutHomepage 
            intro={false}
        > 
      
      <div className='register-container' style={{ marginTop }}>
        <h2>Formulario de Voluntarios</h2>
        
        <p style={{ color: 'black', marginBottom: '1rem'}}>
          Complete este breve formulario y nos pondremos en contacto con usted
        </p>

        <label>Nombre</label>
        <input
          type='text'
          placeholder='Escriba su nombre'
        />

        <label>Apellidos</label>
        <input
          type='text'
          placeholder='Escriba sus apellidos'
        />

        <label>Correo electrónico</label>
        <input
          type='email'
          placeholder='Escriba su correo electrónico'
        />

        <label>Teléfono</label>
        <input
          type='tel'
          placeholder='Escriba su teléfono'
        />

        <label>Formación académica y experiencia laboral</label>
        <textarea placeholder='Escriba aquí'></textarea>

        <label>Motivación</label>
        <textarea placeholder='Escriba aquí'></textarea>       
        
        <button className='register-button'>Enviar</button>
      
      </div>
    </LayoutHomepage>
  );


}

export default VolunteerForm;