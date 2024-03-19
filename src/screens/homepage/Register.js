import '../../styles/styles.css';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import google from '../../logo/google.svg';
import LayoutHomepage from '../../components/LayoutHomepage';
import useAdjustMargin from '../../components/useAdjustMargin';

function Register() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const marginTop = useAdjustMargin();

  return (
    <LayoutHomepage 
            intro={false}
        > 

        <div className='register-container' style={{ marginTop }}>
          <h2> Regístrese</h2>
          <label>Correo electrónico</label>
          <input
            type='email'
            placeholder='Escriba su correo electrónico'
          />

          <label>Contraseña</label>
          <input
            type='password'
            placeholder='Repita su contraseña'
          />

          <label>Confirme su contraseña</label>
            <input
            type='password'
            placeholder='Repita su contraseña'
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

          <button className='register-button'>
            Crear cuenta
          </button>

          <p style={{ textAlign: 'center', marginTop: '0px', marginBottom: '0px'}}>o</p>

          <Link to={"https://myaccount.google.com/"} className='google-button'>
            <span>Registrarse con Google</span>
            <img src={google} alt="Logo"/>
          </Link>


          <p style={{ textAlign: 'center', marginBottom: '5%'}}>
            ¿Ya tiene una cuenta?&nbsp;
            <Link to="/iniciar-sesion" style={{ color: '#6FC0DB' }}>
               Inicie sesión aquí
            </Link>.
          </p>

        </div>
    </LayoutHomepage>
  );
}


export default Register;