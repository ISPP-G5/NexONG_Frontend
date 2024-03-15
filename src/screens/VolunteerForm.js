import '../styles/styles.css';
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


function VolunteerForm() {
  const [academic_formation, setAcademic_formation] = useState("");
  const [motivation, setMotivation] = useState("");
  const [address, setAddress] = useState("");
  const [postal_code, setpostal_code] = useState("");
  const [enrollment_document, setEnrollment_document] = useState("");
  const [registry_sheet,setRegistry_sheet] = useState("");
  const [sexual_offenses_document, setSexual_offenses_document] = useState("");
  const [scanned_id, setScanned_id] = useState("");
  const [minor_authorization, setMinor_authorization] = useState("");
  const [scanned_authorizer_id, setScanned_authorizer_id] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [start_date, setStart_date] = useState("");



  const aceptarSolicitud = async (voluntario) => {
    voluntario[0].status = "ACCEPTED";
    const update = await axios.post(`${API_ENDPOINT}volunteer/`,{
        academic_formation: academic_formation,
        motivation: motivation,
        status: "PENDING",
        address:address,
        postal_code: postal_code,
        enrollment_document: enrollment_document,
        registry_sheet: registry_sheet,
        sexual_offenses_document: sexual_offenses_document,
        scanned_id: scanned_id,
        minor_authorization: minor_authorization,
        scanned_authorizer_id: scanned_authorizer_id,
        birthdate: birthdate,
        start_date: start_date,
        end_date: null,

        
    });
    console.log('update',update);
    const {data} = update;
    if (data.message){
        window.alert(data.message);
    }else{
        window.alert("Usuario actualizado con éxito.")
    }
    window.alert("Usuario no puede ser aceptado hasta que se solucione los problemas de la api.")
}

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
          <div className='field-text'>
            <input value={birthdate}
            id="date"
            label="Birthday"
            type="date"
            className='asam-input' 
            placeholder='dd/mm/yyyy'
             style={{ width: '115%'}} 
             onChange={(e) => setBirthdate(e.target.value)}
             ></input>
          </div>
          <div className='field-text'>
            <h4 style={{marginLeft:'-60%', color: '#717070',marginBottom:'5%'}}>Hora</h4>
            <input value={start_date}
            id="datetime-local"
            label="Next appointment"
            type="datetime-local"
            className='asam-input' 
            placeholder='dd/mm/yyyy'
             style={{ width: '115%'}} 
             onChange={(e) => setStart_date(e.target.value)}
             ></input>
           </div>       
          
      
      

        
          <button className='button'>Enviar</button>
      

        
        
        
        </div>

    </div>
    <Footer />
    </div>
  );


}

export default VolunteerForm;