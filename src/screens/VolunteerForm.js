import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import '../styles/styles.css';
import React from 'react';
import { Link } from 'react-router-dom';


function VolunteerForm() {
  const labelStyle = {
    width: '350px',
    height: '40.78px',
    marginLeft: '-10px', 
    top: '100.83px',
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: '505',
    fontSize: '15px',
    lineHeight: '70px',
    color: '#7C838A',
    textAlign: 'left' 
    
  };
  const separatorLeftStyle = {
    borderBottom: '1px solid black',
    width: '40%', 
    display: 'inline-block',
    marginLeft: '20px', 
    marginBottom: '-35px', 

  };
  const separatorRightStyle = {
    borderBottom: '1px solid black',
    width: '40%', 
    display: 'inline-block',
    marginLeft: '230px', 
    marginTop: '-70px', 
  };

  return (
    <div className="App">
      
      <div className='main'>
      

      <div className='flex-container-register' >
      <div className='title-text' style={{ textIndent: '50px', fontSize: '27px' }}>
        Formulario de Voluntarios
      </div>
      <div className='field-text' style={{ fontSize: '16px', color: 'gray', width: '280px', marginLeft: 'calc(50% - 140px)' }}>
        Complete este breve formulario y nos pondremos en contacto con usted
      </div>

        <a style={labelStyle}>Nombre</a>
        <input
        type='text'
        placeholder='Escriba su nombre'
        style={{ borderRadius: '15px' }}  
        />

        <a style={labelStyle}>
        Apellidos       
        </a>
        <input
        type='text'
        placeholder='Escriba sus apellidos'
        style={{ borderRadius: '15px' }}  
        />

        <a style={labelStyle}>
          Correo electrónico
        </a>
        <input
        type='text'
        placeholder='Escriba su correo electrónico'
        style={{ borderRadius: '15px' }}  
        />

        <a style={labelStyle}>
          Teléfono
        </a>
        <input
        type='text'
        placeholder='Escriba su teléfono'
        style={{ borderRadius: '15px' }}  
        />

        <a style={labelStyle}>
        Formación académica y experiencia laboral
        </a>
        <input
        type='text'
        placeholder='Escriba aquí'
        style={{ borderRadius: '15px' }}  
        />

        <a style={labelStyle}>
        Motivación
        </a>
        <input
        type='text'
        placeholder='Escriba aquí'
        style={{ borderRadius: '15px' }}  
        />        
        
    
    

      
        <button className='button' style={{ marginLeft: '120px', fontWeight: 'bold' }}>Enviar</button>
      

        
        
        
        </div>
    </div>
    </div>
  );


}

export default VolunteerForm;