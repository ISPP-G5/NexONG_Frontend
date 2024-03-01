import Header from '../components/Header';
import '../styles/styles.css';
import React from 'react';
import google from '../logo/google.svg';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import Footer from '../components/Footer';





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
    width: '60%', // Use percentage for width
    height: '2rem', // Use rem for height
    top: '5rem', // Use rem for top
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: '505',
    fontSize: '1.25rem', // Use rem for font-size
    lineHeight: '1.75rem', // Use rem for line-height
    color: '#7C838A',
    
  };


  return (
    <div className="App">
      <Header />

      <div className='main'>
        <div className='flex-container-register'>
          <div className= 'h2-register'> Regístrese</div>
          <a style={labelStyle}>Correo electrónico</a>
          <input
            type='text'
            placeholder='Escriba su correo electrónico'
            style={{ borderRadius: '1rem' }} // Use rem for border-radius
          />

          <a style={labelStyle}>Contraseña</a>
          <input
            type='text'
            placeholder='Escriba su contraseña'
            style={{ borderRadius: '1rem' }} // Use rem for border-radius
          />

          <a style={labelStyle}>Confirme su contraseña</a>
          <input
            type='text'
            placeholder='Repita su contraseña'
            style={{ borderRadius: '1rem' }} // Use rem for border-radius
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

          <button className='button' style={{ fontWeight: 'bold' }}>Crear cuenta</button>

          <div className='text' style={{ fontFamily: 'Poppins', fontSize: '1rem', fontWeight: 400 }}>o</div>

          <button className='button-google'>
              <span>Registrarse con Google</span>
              <Link to="https://myaccount.google.com/">
                  <img src={google} alt="Logo" className="button-google-img" />
              </Link>
          </button>


          <div className='text' style={{ fontFamily: 'Poppins', fontSize: '1rem', fontWeight: 400, color: 'gray' }}>
            ¿Ya tiene una cuenta? <Link to="/iniciar-sesion" style={{ color: '#6FC0DB' }}>Inicie sesión aquí</Link>.
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}


export default Register;