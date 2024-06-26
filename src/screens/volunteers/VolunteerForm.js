import '../../styles/styles.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderProfiles from '../../components/HeaderProfiles';
import useAdjustMargin from '../../components/useAdjustMargin';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import useToken from '../../components/useToken';


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


function VolunteerForm() {
  const [token, updateToken] = useToken();
  const config_volunteer = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    }
  };
  
  const config_user = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

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
    const fileUrl = `${process.env.PUBLIC_URL}/docs/${file}.pdf`; 
  
    // Create a temporary link
    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = `${file}.pdf`; 
  
    // Click the link to download the file
    downloadLink.click();
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address) {
      toast.error('Dirección es obligatorio');
      return;
    }
    if (!/^\d{5}$/.test(postalCode)) {
      toast.error('Código postal invalido, deben ser 5 digitos');
      return;
    }
    if (!birthdate) {
      toast.error('Fecha de nacimiento es obligatorio');
      return;
    }
    const birthdateObj = new Date(birthdate);
    birthdateObj.setHours(0, 0, 0, 0); 

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalizar la fecha actual para eliminar la hora

    // Comprobar si la fecha de nacimiento es antes de hoy
    if (birthdateObj >= today) {
      toast.error('La fecha de nacimiento inválida');
      return;
    }
    if (!academicFormation) {
      toast.error('Formación academica es obligatorio');
      return;
    }
    if (!motivation) {
      toast.error('Motivación es obligatorio');
      return;
    }
    if (!scannedId) {
      toast.error('Fotocopia del DNI es obligatorio');
      return;
    }
    if (scannedId &&scannedId.type !== 'application/pdf') {
      toast.error('La fotocopia de su DNI debe ser un PDF');
      return;
    }
    if (sexualOffensesDocument && sexualOffensesDocument.type !== 'application/pdf') {
      toast.error('El Certificado de Antecedentes de Delitos Sexuales debe ser un PDF');
      return;
    }
    if ( registrySheet &&registrySheet.type !== 'application/pdf') {
      toast.error('La ficha de registro debe ser un PDF');
      return;
    }
    if (enrollmentDocument && enrollmentDocument.type !== 'application/pdf') {
      toast.error('El contrato debe ser un PDF');
      return;
    }
    if (isUnder18) {
      if (!minorAuthorization) {
        toast.error('Autorización del padre/madre/tutor/a es obligatorio');
        return;
      }
  
      if (!scannedAuthorizerId) {
        toast.error('Fotocopia de DNI del padre/madre/tutor/a es obligatorio');
        return;
      }
    }
  if (!sexualOffensesDocument) {
    toast.error('Certificado de Antecedentes de Delitos Sexuales es obligatorio');
    return;
  }
  if (!registrySheet) {
    toast.error('Ficha de registro es obligatorio');
    return;
  }
  if (!enrollmentDocument) {
    toast.error('Contrato es obligatorio');
    return;
  }

    const volunteerData = new FormData();
    volunteerData.append('address', address);
    volunteerData.append('postal_code', postalCode);
    volunteerData.append('birthdate', birthdate);
    volunteerData.append('academic_formation', academicFormation);
    volunteerData.append('motivation', motivation);
    volunteerData.append('scanned_id', scannedId);
    if (isUnder18) {
      volunteerData.append('minor_authorization', minorAuthorization);
      volunteerData.append('scanned_authorizer_id', scannedAuthorizerId);
    }
    volunteerData.append('sexual_offenses_document', sexualOffensesDocument);
    volunteerData.append('registry_sheet', registrySheet);
    volunteerData.append('enrollment_document', enrollmentDocument);
    volunteerData.append('start_date', startDate);


    try {
      const response = await axios.post(`${API_ENDPOINT}volunteer/`, 
      volunteerData, config_volunteer);
      localStorage.setItem('volunteerId', response.data.id);
      toast.success('Volunteer created successfully');

      // Make a PATCH request to update the user's volunteer attribute
      await axios.patch(`${API_ENDPOINT}auth/users/me/`, {
        volunteer: response.data.id,
      }, config_user);

      navigate('/voluntario/espera');
    } catch (error) {
      if (error.response && error.response.data) {
        // If the error response and data exist, show the error message from the backend
        Object.entries(error.response.data).forEach(([key, value]) => {
          toast.error(`${value}`);
        });
      } else {
        // If the error response or data doesn't exist, show a generic error message
        toast.error('Error al crear el voluntario');
      }
    }
  };
  
  const marginTop = useAdjustMargin('.header-profiles');

  return (
    <div className='App'>
      <ToastContainer />
      <HeaderProfiles profile={'voluntario'} showProfile={false}  />
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

        <label className='long-label'>Formación académica y experiencia laboral</label>
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
        <div className='register-container-files'>
          <input 
            type='file' 
            onChange={(e) => setScannedId(e.target.files[0])} 
          />
        </div>

        {isUnder18 && (
          <>
            <label className='long-label'>Autorización del padre/madre/tutor/a</label>
            <div className='register-container-files'>
              <a 
                className='button-contrast-files' 
                onClick={() => handleDescargar('minor_authorization')}>
                  Descargar
              </a>
              <input 
                type='file' 
                onChange={(e) => setMinorAuthorization(e.target.files[0])}  
              />
            </div>
            <label className='long-label'>Fotocopia de DNI del padre/madre/tutor/a</label>
            <div className='register-container-files'>
              <input 
                type='file' 
                onChange={(e) => setScannedAuthorizerId(e.target.files[0])} 
              />
            </div>
          </>
        )}
        
        <label className='long-label'>Certificado de Antecedentes de Delitos Sexuales</label>
        <div className='register-container-files'>
          <a 
            className='button-contrast-files' 
            onClick={() => handleDescargar('sexual_offenses_document')}>
              ¿Como solicitar el certificado?
          </a>
          <input 
            type='file' 
            onChange={(e) => setSexualOffensesDocument(e.target.files[0])} 
          />
        </div>

        <label>Ficha de registro</label>
        <div className='register-container-files'>
          <a 
            className='button-contrast-files' 
            onClick={() => handleDescargar('registry_sheet')}>
              Descargar
          </a>
          <input 
            type='file' 
            onChange={(e) => setRegistrySheet(e.target.files[0])} 
          />
        </div>

        <label>Contrato</label>
        <div className='register-container-files'>
          <a 
            className='button-contrast-files' 
            onClick={() => handleDescargar('enrollment_document')}>
              Descargar
          </a>
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
