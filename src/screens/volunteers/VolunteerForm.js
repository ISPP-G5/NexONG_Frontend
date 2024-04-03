import '../../styles/styles.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderProfiles from '../../components/HeaderProfiles';
import useAdjustMargin from '../../components/useAdjustMargin';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function VolunteerForm() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [academicFormation, setAcademicFormation] = useState('');
  const [motivation, setMotivation] = useState('');
  const [scannedId, setScannedId] = useState(null);
  const [isUnder18, setIsUnder18] = useState(false);
  const [minorAuthorization, setMinorAuthorization] = useState(null);
  const [scannedAuthorizerId, setScannedAuthorizerId] = useState(null);
  const [sexualOffensesDocument, setSexualOffensesDocument] = useState(null);
  const [enrollmentDocument, setEnrollmentDocument] = useState(null);
  const [registrySheet, setRegistrySheet] = useState(null);
  const [startDate, setStartDate] = useState('');
  

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    return m < 0 || (m === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
  };

  const handleDescargar = (file) => {
    // Path to the PDF file
    const fileUrl = `${process.env.PUBLIC_URL}/docs/${file}.pdf`; // Replace 'path_to_file.pdf' with the actual path to the file
  
    // Create a temporary link
    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = `${file}.pdf`; // You can change the file name as needed
  
    // Click the link to download the file
    downloadLink.click();
  
    toast.error("The file is empty because the API provides links instead of files", {
      autoClose: 5000
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{5}$/.test(postalCode)) {
      toast.error('Invalid postal code. It must be exactly 5 digits.');
      return;
    }
    const volunteerData = {
      address: address,
      postal_code: postalCode,
      birthdate: birthdate,
      academic_formation: academicFormation,
      motivation: motivation,
      scanned_id: scannedId,
      minor_authorization: isUnder18 ? minorAuthorization : null,
      scanned_authorizer_id: isUnder18 ? scannedAuthorizerId : null,
      sexual_offenses_document: sexualOffensesDocument,
      registry_sheet: registrySheet,
      enrollment_document: enrollmentDocument,
      start_date: startDate,
    };

    try {
      const response = await axios.post(`${API_ENDPOINT}volunteer/`, volunteerData);
      console.log(response.data);
      toast.success('Volunteer created successfully');
    } catch (error) {
      console.error('Error creating volunteer', error);
      toast.error('Error creating volunteer');
    }
  };
  
  const marginTop = useAdjustMargin('.header-profiles');

  return (
    <div className='App'>
      <HeaderProfiles profile={'voluntario'} showProfile={false} />
      <form className='register-container' style={{marginTop }} onSubmit={handleSubmit}>
        <h2>Formulario de Voluntarios</h2>
        <p>Necesitamos algunos datos y documentos para completar tu solicitud como voluntario</p>

        <label>Dirección</label>
        <input
          value={address}
          type='text'
          placeholder='Escriba su dirección'
          onChange={(e) => setAddress(e.target.value)}
        />

        <label>Código postal</label>
        <input
          value={postalCode}
          type='text'
          placeholder='Escriba su código postal'
          onChange={(e) => setPostalCode(e.target.value)}
        />

        <label>Fecha de nacimiento</label>
        <input
          value={birthdate}
          type='date'
          onChange={(e) => {setBirthdate(e.target.value);
                    const age = calculateAge(e.target.value);
                    setIsUnder18(age < 18);
                  }}
        />

        <label>Formación académica y experiencia laboral</label>
        <textarea
          value={academicFormation}
          placeholder='Escriba aquí'
          onChange={(e) => setAcademicFormation(e.target.value)}
        />

        <label>Motivación</label>
        <textarea
          value={motivation}
          placeholder='Escriba aquí'
          onChange={(e) => setMotivation(e.target.value)}
        />

        <label>Fotocopia de su DNI</label>
        <input 
          type='file' 
          onChange={(e) => setScannedId(e.target.files[0])} 
        />

        {isUnder18 && (
          <>
            <label>Autorización del padre/madre/tutor/a</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button className='button-contrast' style={{maxWidth: '10rem'}} onClick={() => handleDescargar('minor_authorization')}>Descargar</button>
              <input 
                type='file' 
                onChange={(e) => setMinorAuthorization(e.target.files[0])}  
              />
            </div>
            <label>Fotocopia de DNI del padre/madre/tutor/a</label>
            <input 
              type='file' 
              onChange={(e) => setScannedAuthorizerId(e.target.files[0])} 
            />
          </>
        )}
        
        <label>Certificado de Antecedentes de Delitos Sexuales</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className='button-contrast' style={{maxWidth: '30%'}} onClick={() => handleDescargar('sexual_offenses_document')}>¿Como solicitar el certificado?</button>
          <input 
            type='file' 
            onChange={(e) => setSexualOffensesDocument(e.target.files[0])} 
          />
        </div>

        <label>Ficha de registro</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className='button-contrast' style={{maxWidth: '30%'}} onClick={() => handleDescargar('registry_sheet')}>Descargar</button>
          <input 
            type='file' 
            onChange={(e) => setRegistrySheet(e.target.files[0])} 
          />
        </div>

        <label>Contrato</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className='button-contrast' style={{maxWidth: '30%'}} onClick={() => handleDescargar('enrollment_document')}>Descargar</button>
          <input 
            type='file' 
            onChange={(e) => setEnrollmentDocument(e.target.files[0])} 
          />
        </div>

        <label>Posible fecha de incorporación</label>
        <input 
          type='date' 
          onChange={(e) => setStartDate(e.target.value)} 
        />

        <button type='submit' className='register-button'>
          Enviar
        </button>
      </form>
    </div>
  );
}

export default VolunteerForm;
