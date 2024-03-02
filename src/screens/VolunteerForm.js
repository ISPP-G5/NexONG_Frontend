import '../styles/styles.css';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';



function VolunteerForm() {
  const labelStyle = {
    width: '80%', // Use percentage for width
    height: '2rem', // Use rem for height
    top: '5rem', // Use rem for top
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: '505',
    fontSize: '1rem', // Use rem for font-size
    lineHeight: '1.75rem', // Use rem for line-height
    color: '#7C838A',
    marginBottom: '0rem',
    
    
  };
  
  const inputStyle = {
    width: '80%', // Use 100% width for the input elements
    borderRadius: '1rem',
    margin: '0 auto',
    boxSizing: 'border-box', // Include padding and border in the width calculation
  };




  return (
    <div className="App">
      <Header />
      
      <div className='main'>
      

        <div className='flex-container-register' >
        <div className='h2-register'>
          Formulario de Voluntarios
        </div>
        <div className='field-text' >
          Complete este breve formulario y nos pondremos en contacto con usted
        </div>

          <a style={labelStyle}>Nombre</a>
          <input
          type='text'
          placeholder='Escriba su nombre'
          style={inputStyle}  
          />

          <a style={labelStyle}>
          Apellidos       
          </a>
          <input
          type='text'
          placeholder='Escriba sus apellidos'
          style={inputStyle} 
          />

          <a style={labelStyle}>
            Correo electrónico
          </a>
          <input
          type='text'
          placeholder='Escriba su correo electrónico'
          style={inputStyle} 
          />

          <a style={labelStyle}>
            Teléfono
          </a>
          <input
          type='text'
          placeholder='Escriba su teléfono'
          style={inputStyle} 
          />

          <a style={labelStyle}>
          Formación académica y experiencia laboral
          </a>
          <input
          type='text'
          placeholder='Escriba aquí'
          style={inputStyle}
          />

          <a style={labelStyle}>
          Motivación
          </a>
          <input
          type='text'
          placeholder='Escriba aquí'
          style={inputStyle}
          />        
          
      
      

        
          <button className='button'>Enviar</button>
      

        
        
        
        </div>

    </div>
    <Footer />
    </div>
  );


}

export default VolunteerForm;