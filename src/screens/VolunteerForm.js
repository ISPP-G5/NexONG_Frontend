
import '../styles/styles.css';
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function VolunteerForm() {
  // Se ponen todas las variables de estado de los archivos que se van a subir como null ya que son tipos especiales, al igual que imagenes, videos....
  //En un principio lo probe como "" o [] , pero esto provocaba error, pd gracias chatgpt
  const [academicFormation, setAcademicFormation] = useState("");
  const [motivation, setMotivation] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [enrollmentDocument, setEnrollmentDocument] = useState(null);
  const [registrySheet, setRegistrySheet] = useState(null);
  const [sexualOffensesDocument, setSexualOffensesDocument] = useState(null);
  const [scannedId, setScannedId] = useState(null);
  const [minorAuthorization, setMinorAuthorization] = useState(null);
  const [scannedAuthorizerId, setScannedAuthorizerId] = useState(null);
  const [birthdate, setBirthdate] = useState("");
  const [startDate, setStartDate] = useState("");

  const aceptarSolicitud = async () => {
    //En todos estos condicionales se comprueban que no se haga post sin introduccir todos los datos, si esto ocurre, se lanza excepción.
    if (!academicFormation || academicFormation === '') {
      window.alert("Debe de insertar su formación academica")
    } else if (!motivation || motivation === '') {
      window.alert("Debe de insertar su motivación")
    } else if (!address || address === '') {
      window.alert("Debe de insertar su dirección")
    } else if (!postalCode || postalCode === '') {
      window.alert("Debe de insertar su código postal")
    } else if (!enrollmentDocument) {
      window.alert("Debe de insertar el documento de enlistamiento")
    } else if (!registrySheet) {
      window.alert("Debe de insertar la hoja de registro")
    } else if (!sexualOffensesDocument) {
      window.alert("Debe de insertar el documento de ofensas sexuales")
    } else if (!scannedId) {
      window.alert("Debe de insertar su DNI escaneado")
    } else if (!minorAuthorization) {
      window.alert("Debe de insertar la documentación del menor")
    } else if (!scannedAuthorizerId) {
      window.alert("Debe de insertar el DNI escaneado del menor")
    } else if (!birthdate || birthdate === '') {
      window.alert("Debe de insertar su fecha de cumpleaños")
    } else if (!startDate || startDate === '') {
      window.alert("Debe de insertar la fecha de inscripción")
    } else {

      //Como los archivos son tipos de datos especiales, al hacer post debemos de crear una lista de tipo form data en la que añadiremos
      //todos los datos antes de enviarlos, ya que si no da error 400.

      const formData = new FormData();
      formData.append('academic_formation', academicFormation);
      formData.append('motivation', motivation);
      formData.append('status', 'ACCEPTED');
      formData.append('address', address);
      formData.append('postal_code', postalCode);
      formData.append('enrollment_document', enrollmentDocument);
      formData.append('registry_sheet', registrySheet);
      formData.append('sexual_offenses_document', sexualOffensesDocument);
      formData.append('scanned_id', scannedId);
      formData.append('minor_authorization', minorAuthorization);
      formData.append('scanned_authorizer_id', scannedAuthorizerId);
      formData.append('birthdate', birthdate);
      formData.append('start_date', startDate);
      formData.append('end_date', '');

      try {
        const update = await axios.post(`${API_ENDPOINT}volunteer/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
            // 'multipart/form-data' se pone para señalar que es el tipo especial de form en el que se subiran objetos de tipo video, archivo....
          }
        });
        console.log('update', update);
        const { data } = update;
        if (data.message) {
          window.alert(data.message);
        } else {
          window.alert("Usuario creado con éxito.")
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
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
                <h4 style={{ marginLeft: '-50%', color: '#717070', marginBottom: '2%' }}>Formación</h4>
                <input value={academicFormation}
                  className='asam-input'
                  type='text'
                  placeholder='Escriba aquí'
                  style={{ width: '115%', height: '50px', resize: 'vertical', paddingBottom: '+25%' }}
                  onChange={(e) => setAcademicFormation(e.target.value)}
                ></input>
              </div>
              <div className='field-text' >
                <h4 style={{ marginLeft: '-50%', color: '#717070', marginBottom: '2%' }}>Motivación</h4>
                <input value={motivation}
                  className='asam-input'
                  type='text'
                  placeholder='Escriba aquí'
                  style={{ width: '115%', height: '50px', resize: 'vertical', paddingBottom: '+25%' }}
                  onChange={(e) => setMotivation(e.target.value)}
                ></input>
              </div>
              <div className='field-text' >
                <h4 style={{ marginLeft: '-52.5%', color: '#717070', marginBottom: '2%' }}>Dirección</h4>
                <input value={address}
                  className='asam-input'
                  type='text'
                  placeholder='Escriba aquí'
                  style={{ width: '115%', height: '0px', resize: 'vertical', paddingBottom: '+8%' }}
                  onChange={(e) => setAddress(e.target.value)}
                ></input>
              </div>
              <div className='field-text' >
                <h4 style={{ marginLeft: '-40%', color: '#717070', marginBottom: '2%' }}>Código postal</h4>
                <input value={postalCode}
                  className='asam-input'
                  type='text'
                  placeholder='Escriba aquí'
                  style={{ width: '115%', height: '0px', resize: 'vertical', paddingBottom: '+8%' }}
                  onChange={(e) => setpostalCode(e.target.value)}
                ></input>
              </div>
              <div className='field-text' >
                <h4 style={{ marginLeft: '-2.5%', color: '#717070', marginBottom: '2%' }}>Documeto de enlistamiento</h4>
                <input
                  type='file'
                  style={{ marginLeft: '10%' }}
                  onChange={(e) => handleFileChange(e, setEnrollmentDocument)}
                ></input>
              </div>
              <div className='field-text' >
                <h4 style={{ marginLeft: '-32.5%', color: '#717070', marginBottom: '2%' }}>Hoja de registro</h4>
                <input
                  type='file'
                  style={{ marginLeft: '10%' }}
                  onChange={(e) => handleFileChange(e, setRegistrySheet)}
                ></input>
              </div>
              <div className='field-text' >
                <h4 style={{ marginLeft: '10%', color: '#717070', marginBottom: '2%' }}>Documento de ofensas sexuales</h4>
                <input
                  type='file'
                  style={{ marginLeft: '10%' }}
                  onChange={(e) => handleFileChange(e, setSexualOffensesDocument)}
                ></input>
              </div>
              <div className='field-text' >
                <h4 style={{ marginLeft: '-35%', color: '#717070', marginBottom: '2%' }}>DNI escaneado</h4>
                <input
                  type='file'
                  style={{ marginLeft: '10%' }}
                  onChange={(e) => handleFileChange(e, setScannedId)}
                ></input>
              </div>
              <div className='field-text' >
                <h4 style={{ marginLeft: '-12.5%', color: '#717070', marginBottom: '2%' }}>Autorización del menor</h4>
                <input
                  type='file'
                  style={{ marginLeft: '10%' }}
                  onChange={(e) => handleFileChange(e, setMinorAuthorization)}
                ></input>
              </div>
              <div className='field-text' >
                <h4 style={{ marginLeft: '-35%', color: '#717070', marginBottom: '2%' }}>DNI del menor </h4>
                <input
                  type='file'
                  style={{ marginLeft: '10%' }}
                  onChange={(e) => handleFileChange(e, setScannedAuthorizerId)}
                ></input>
              </div>
              <div className='field-text'>
                <h4 style={{ marginLeft: '-18%', color: '#717070', marginBottom: '5%' }}>Fecha de nacimiento</h4>
                <input value={birthdate}
                  id="date"
                  label="Birthday"
                  type="date"
                  className='asam-input'
                  placeholder='dd/mm/yyyy'
                  style={{ width: '100%', marginLeft: '10%' }}
                  onChange={(e) => setBirthdate(e.target.value)}
                ></input>
              </div>
              <div className='field-text'>
                <h4 style={{ marginLeft: '-25%', color: '#717070', marginBottom: '5%' }}>Hora de comienzo</h4>
                <input value={startDate}
                  id="datetime-local"
                  label="Next appointment"
                  type="date"
                  className='asam-input'
                  placeholder='dd/mm/yyyy'
                  style={{ width: '100%', marginLeft: '10%' }}
                  onChange={(e) => setStartDate(e.target.value)}
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