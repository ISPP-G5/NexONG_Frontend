import '../styles/styles.css';
import React from 'react';




function Register() {
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
      <div className='header'>
        <div>
          <ul><li>
            <a>Actividades</a>
            <ul>
              <li><a>Campamentos</a></li>
              <li><a>Clases</a></li>
            </ul>
          </li></ul>
        </div>
        <a>Donaciones</a>
        <a>Sugerencias</a>
        <a>Registrase</a>
        <a>Iniciar Sesión</a>
      </div>
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
          />
          <label htmlFor="selectCheckboxFamily" className="checkbox-label">
            <span className="custom-checkbox"></span> Register as family member
          </label>
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="selectCheckboxVolunteer"
            className="hidden-checkbox"
          />
          <label htmlFor="selectCheckboxVolunteer" className="checkbox-label">
            <span className="custom-checkbox"></span> Register as volunteer
          </label>
        </div>

      
        <button className='button' style={{ marginLeft: '100px', fontWeight: 'bold', marginBottom: '10px' }}>Crear cuenta</button>
        <div style={separatorLeftStyle}></div>

        <div className='text' style={{ textIndent: '200px', marginTop: '20px' }}> 
           o  
        </div>        
        <div style={separatorRightStyle}></div>

        
        <button className='button-google'style={{ marginLeft: '60px', marginTop: '20px' }}>Registrarse con google</button>
        <div className='text' style={{ textIndent: '50px', fontFamily: 'Poppins', fontSize: '16px', fontWeight: 400, color: 'gray' }}> 
          ¿Ya tiene una cuenta? <span style={{ color: '#6FC0DB' }}>Inicie sesión aquí</span>.
        </div>
        
        </div>
    </div>


    </div>
  );


}

export default Register;