import '../styles/styles.css';
import React from 'react';
import Header from '../components/Header';
import google from '../logo/google.svg';
import {Link} from 'react-router-dom';
import { useState } from 'react';





function Register() {
  const [isFamilyChecked, setIsFamilyChecked] = useState(false);
  const [isVolunteerChecked, setIsVolunteerChecked] = useState(false);

  const handleFamilyChange = () => {
    setIsFamilyChecked(!isFamilyChecked);
    setIsVolunteerChecked(false);
  };

  const handleVolunteerChange = () => {
    setIsVolunteerChecked(!isVolunteerChecked);
    setIsFamilyChecked(false);
  };
  const labelStyle = {
    width: '300px',
    height: '40.78px',
    marginLeft: '-10px', 
    top: '100.83px',
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: '505',
    fontSize: '20px',
    lineHeight: '70px',
    color: '#7C838A',
    textAlign: 'left' 
    
  };
  const separatorLeftStyle = {
    borderBottom: '1px solid black',
    width: '40%', 
    display: 'inline-block',
    marginLeft: '20px', 
    marginBottom: '-55px', 

  };
  const separatorRightStyle = {
    borderBottom: '1px solid black',
    width: '40%', 
    display: 'inline-block',
    marginLeft: '225px', 
    
    marginTop: '-70px', 
  };

  return (
    
    <div className="App">
      <Header />
      
      <div className='main'>
      

      <div className='flex-container-register' >
      <div className='title-text' style={{ textIndent: '125px' }}>
        Regístrese
      </div>

        <a style={labelStyle}>Correo electrónico</a>

        <input
        type='text'
        placeholder='Escriba su correo electrónico'
        style={{ borderRadius: '15px' }}  
        />

        <a style={labelStyle}>
        Contraseña       
        </a>
        <input
        type='text'
        placeholder='Escriba su contrasaeña'
        style={{ borderRadius: '15px' }}  
        />

        <a style={labelStyle}>
        Confirme su contraseña
        </a>
        <input
        type='text'
        placeholder='Repita su contraseña'
        style={{ borderRadius: '15px' }}  
        />
        
    
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="selectCheckboxFamily"
            className="hidden-checkbox"
            checked={isFamilyChecked}
            onChange={handleFamilyChange}
          />
          <label htmlFor="selectCheckboxFamily" className="checkbox-label">
            <span className="custom-checkbox"></span> Registrarse como familiar
          </label>
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="selectCheckboxVolunteer"
            className="hidden-checkbox"
            checked={isVolunteerChecked}
            onChange={handleVolunteerChange}
          />
          <label htmlFor="selectCheckboxVolunteer" className="checkbox-label">
            <span className="custom-checkbox"></span> Registrarse como voluntario
          </label>
        </div>

      
        <button className='button' style={{ marginLeft: '100px', fontWeight: 'bold', marginBottom: '10px' }}>Crear cuenta</button>
        <div style={separatorLeftStyle}></div>

        <div className='text' style={{ textIndent: '200px', marginTop: '20px' }}> 
           o  
        </div>        
        <div style={separatorRightStyle}></div>

        
        <button className='button-google'style={{ marginLeft: '60px', marginTop: '20px' }}>Registrarse con google
        <Link to="https://myaccount.google.com/">
                <img src={google} alt="Logo" className="header-logo" />
        </Link>
        </button
        >
        
        <div className='text' style={{ textIndent: '50px', fontFamily: 'Poppins', fontSize: '16px', fontWeight: 400, color: 'gray' }}> 
          ¿Ya tiene una cuenta? <span style={{ color: '#6FC0DB' }}>Inicie sesión aquí</span>.
        </div>
        
        </div>
    </div>


    </div>
    
  );


}

export default Register;