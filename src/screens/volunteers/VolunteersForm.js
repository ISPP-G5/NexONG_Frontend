import '../styles/styles.css';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';



function VolunteersForm() {
  const [marginTop, setMarginTop] = useState('0px');

    useEffect(() => {
        const adjustIntroMargin = () => {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const extraMargin = 30; 
            setMarginTop(`${headerHeight + extraMargin}px`); 
        };

        window.addEventListener('resize', adjustIntroMargin);
        adjustIntroMargin();

        return () => {
            window.removeEventListener('resize', adjustIntroMargin);
        };
    }, []);

  return (
    <div className="App">
      <Header />
      
      <div className='flex-container-register' style={{ marginTop }}>
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

      <Footer />

    </div>
  );


}

export default VolunteersForm;