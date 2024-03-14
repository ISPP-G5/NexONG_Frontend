import '../styles/styles.css';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';



function VolunteerForm() {
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

        <p>Nombre</p>
        <input
          type='text'
          placeholder='Escriba su nombre'
        />

        <p>Apellidos</p>
        <input
          type='text'
          placeholder='Escriba sus apellidos'
        />

        <p>Correo electrónico</p>
        <input
          type='text'
          placeholder='Escriba su correo electrónico'
        />

        <p>Teléfono</p>
        <input
          type='text'
          placeholder='Escriba su teléfono'
        />

        <p>Formación académica y experiencia laboral</p>
        <input
          type='text'
          placeholder='Escriba aquí'
        />

        <p>Motivación</p>
        <input
          type='text'
          placeholder='Escriba aquí'
        />        
        
        <button className='button'>Enviar</button>
      
      </div>

      <Footer />

    </div>
  );


}

export default VolunteerForm;