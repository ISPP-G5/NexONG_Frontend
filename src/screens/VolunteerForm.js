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
  const [registry_sheet, setRegistry_sheet] = useState("");
  const [sexual_offenses_document, setSexual_offenses_document] = useState("");
  const [scanned_id, setScanned_id] = useState("");
  const [minor_authorization, setMinor_authorization] = useState("");
  const [scanned_authorizer_id, setScanned_authorizer_id] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [start_date, setStart_date] = useState("");



  const aceptarSolicitud = async (voluntario) => {
    voluntario[0].status = "ACCEPTED";
    const update = await axios.post(`${API_ENDPOINT}volunteer/`, {
      academic_formation: academic_formation,
      motivation: motivation,
      status: "PENDING",
      address: address,
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
    console.log('update', update);
    const { data } = update;
    if (data.message) {
      window.alert(data.message);
    } else {
      window.alert("Usuario actualizado con éxito.")
    }
    window.alert("Usuario no puede ser aceptado hasta que se solucione los problemas de la api.")
  }

  
  const handleFileChange = (event, setStateFunc) => {
    const file = event.target.files[0];
    setStateFunc(file);
  }

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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '-20%', marginTop: '2%' }}>
            <form onSubmit={aceptarSolicitud}>

            <div className='field-text' >
                <h4 style={{ marginLeft: '-40%', color: '#717070', marginBottom: '2%' }}>Formación</h4>
                <input value={academic_formation}
                  className='asam-input'
                  type='text'
                  placeholder='Escriba aquí'
                  style={{ width: '115%', height: '50px', resize: 'vertical', paddingBottom: '+20%' }}
                  onChange={(e) => setAcademic_formation(e.target.value)}
                ></input>
              </div>
              <div className='field-text' >
                <h4 style={{ marginLeft: '-40%', color: '#717070', marginBottom: '2%' }}>Motivación</h4>
                <input value={motivation}
                  className='asam-input'
                  type='text'
                  placeholder='Escriba aquí'
                  style={{ width: '115%', height: '50px', resize: 'vertical', paddingBottom: '+20%' }}
                  onChange={(e) => setMotivation(e.target.value)}
                ></input>
              </div>
              <div className='field-text' >
                <h4 style={{ marginLeft: '-40%', color: '#717070', marginBottom: '2%' }}>Dirección</h4>
                <input value={address}
                  className='asam-input'
                  type='text'
                  placeholder='Escriba aquí'
                  style={{ width: '115%', height: '50px', resize: 'vertical', paddingBottom: '+20%' }}
                  onChange={(e) => setAddress(e.target.value)}
                ></input>
              </div>
              <div className='field-text' >
                <h4 style={{ marginLeft: '-40%', color: '#717070', marginBottom: '2%' }}>Motivación</h4>
                <input value={postal_code}
                  className='asam-input'
                  type='text'
                  placeholder='Escriba aquí'
                  style={{ width: '115%', height: '50px', resize: 'vertical', paddingBottom: '+20%' }}
                  onChange={(e) => postal_code(e.target.value)}
                ></input>
              </div>
              <div className='field-text' >
                <h4 style={{ marginLeft: '-40%', color: '#717070', marginBottom: '2%' }}>Documeto de enlistamiento</h4>
                <input
                  type='file'
                  onChange={(e) => handleFileChange(e, setEnrollment_document)}
                ></input>
              </div>

              <div className='field-text'>
                <h4 style={{ marginLeft: '20%', color: '#717070', marginBottom: '5%' }}>Fecha de nacimiento</h4>
                <input value={birthdate}
                  id="date"
                  label="Birthday"
                  type="date"
                  className='asam-input'
                  placeholder='dd/mm/yyyy'
                  style={{ width: '100%' }}
                  onChange={(e) => setBirthdate(e.target.value)}
                ></input>
              </div>
              <div className='field-text'>
                <h4 style={{ marginLeft: '20%', color: '#717070', marginBottom: '5%' }}>Hora de comienzo</h4>
                <input value={start_date}
                  id="datetime-local"
                  label="Next appointment"
                  type="datetime-local"
                  className='asam-input'
                  placeholder='dd/mm/yyyy'
                  style={{ width: '100%' }}
                  onChange={(e) => setStart_date(e.target.value)}
                ></input>
              </div>

              <div style={{ marginLeft: '50%', marginTop: '2%' }}>
                <button type='submit' className='button' style={{ width: '100px' }}>crear</button>
              </div>
            </form>
          </div>

        </div>

      </div>
      <Footer />
    </div>
  );


}

export default VolunteerForm;