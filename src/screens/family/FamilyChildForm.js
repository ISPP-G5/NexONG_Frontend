import '../../styles/styles.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import useToken from '../../components/useToken';
import LayoutProfiles from '../../components/LayoutProfiles';
import  { fetchMyFamilyId } from '../../components/useFetchData'; 

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


function ChildForm() {
  const [token, updateToken] = useToken();
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    currentEducationYear: '',
    tutor: '',
    nationality: '',
    birthdate: '',
    isMorning: '',
    enrollmentDoc: null,
    sanitaryCard: null
  });

  const errorsDefault = {
    name: '',
    surname: '',
    currentEducationYear: '',
    tutor: '',
    nationality: '',
    birthdate: '',
    isMorning: '',
    enrollmentDoc: '',
    sanitaryCard: ''
  }
  const [formDataErrors, setFormDataErrors] = useState(errorsDefault);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormDataErrors(errorsDefault);

    var errorsMsg = errorsDefault;
    var errors = false;

    if (formData.name === '') {   
      errors = true;   
      errorsMsg = {
        ...errorsMsg,
        name: 'El nombre es obligatorio'
      }
    }    
    
    if (formData.surname === '') {
      errors = true;
      errorsMsg = {
        ...errorsMsg,
        surname: 'Los apellidos son obligatorios'
      }
    }

    if (formData.tutor === '') {
      errors = true;
      errorsMsg = {
        ...errorsMsg,
        tutor: 'El nombre del tutor es obligatorio'
      }
    }

    if (formData.nationality === '') {
      errors = true;
      errorsMsg = {
        ...errorsMsg,
        nationality: 'La nacionalidad es obligatoria'
      }
    }

    if (formData.isMorning === '') {
      errors = true;
      errorsMsg = {
        ...errorsMsg,
        isMorning: 'Este campo es obligatorio'
      }
    }

    if (formData.sanitaryCard === null) {
      errors = true;
      errorsMsg = {
        ...errorsMsg,
        sanitaryCard: 'La tarjeta sanitaria es obligatoria'
      }
    }

    if (formData.enrollmentDoc === null) {
      errors = true;
      errorsMsg = {
        ...errorsMsg,
        enrollmentDoc: 'El documento de inscripción es obligatorio'
      }
    }

    if (formData.birthdate === '') {
      errors = true;
      errorsMsg = {
        ...errorsMsg,
        birthdate: 'La fecha de nacimiento es obligatoria'
      }
    }
    else {
      const actualDate = new Date();
      const date = new Date(formData.birthdate);
      if (date >= actualDate) {
        errors = true;
        errorsMsg = {
          ...errorsMsg,
          birthdate: 'La fecha de nacimiento debe ser anterior a la fecha actual'
        }
      }
    }

    if(errors) {
      setFormDataErrors(errorsMsg);
      return;
    }

    const volunteerData = new FormData();
    volunteerData.append('name', formData.name);
    volunteerData.append('surname', formData.surname);
    volunteerData.append('current_education_year', formData.currentEducationYear);
    volunteerData.append('education_center_tutor', formData.tutor);
    volunteerData.append('nationality', formData.nationality);
    volunteerData.append('birthdate', formData.birthdate);
    volunteerData.append('is_morning_student', formData.isMorning === 'TARDE' ? false: true);
    volunteerData.append('enrollment_document', formData.enrollmentDoc);
    volunteerData.append('scanned_sanitary_card', formData.sanitaryCard);

    var id = null;
    console.log("Fetching family id...");
    const response = await fetchMyFamilyId(API_ENDPOINT, null);

    if (response !== null) {
      console.log("Family id:",response);
      id = response;
    }
    else {
      console.error("Failed to get family id");
    }

    volunteerData.append('family', id);

    try {
      console.log(formData);
      const response = await axios.post(`${API_ENDPOINT}student/`, volunteerData, config);
      console.log(response.data);
      toast.success('Hijo registrado con éxito');

      setTimeout(() => {
        navigate('/familia/niños');
      }, 2000); 
    } catch (error) {
      if (error.response && error.response.data) {
        // If the error response and data exist, show the error message from the backend
        Object.entries(error.response.data).forEach(([key, value]) => {
          toast.error(`${value}`);
        });
      } else {
        // If the error response or data doesn't exist, show a generic error message
        toast.error('Error creating student');
      }

      //Delete localstorage in case its not valid
      localStorage.removeItem('familyId');
    }
  };
  
  return (
    <LayoutProfiles 
      profile={'familia'} 
      selected={''}
    >
      <ToastContainer />
      <form className='register-container' onSubmit={handleSubmit}>
        <h2>Registro de hijo</h2>
        <p>Necesitamos algunos datos y documentos para completar el registro de su hijo</p>

        <label>Nombre</label>
        <input
          style={{ border: "2px solid #a6c1ce"}}
          value={formData.name}
          type='text'
          placeholder='Escriba el nombre de su hijo'
          onChange={(e) => setFormData({
              ...formData,
              name: e.target.value
            })} 
          />
        {formDataErrors.name && <div  style={{color:'red'}}>{formDataErrors.name}</div>}

        <label>Apellidos</label>
        <input
          value={formData.surname}
          type='text'
          placeholder='Escriba los apellidos de su hijo'
          onChange={(e) => setFormData({
            ...formData,
            surname: e.target.value
          })} 
      />
        {formDataErrors.surname && <div  style={{color:'red'}}>{formDataErrors.surname}</div>}

        <label>Fecha de nacimiento</label>
        <input
          value={formData.birthdate}
          type='date'
          onChange={(e) => setFormData({
            ...formData,
            birthdate: e.target.value
          })} 
      />
        {formDataErrors.birthdate && <div  style={{color:'red'}}>{formDataErrors.birthdate}</div>}

        <label>Tutor</label>
        <input
          value={formData.tutor}
          type='text'
          placeholder='Escriba el nombre del tutor de su hijo'
          onChange={(e) => setFormData({
            ...formData,
            tutor: e.target.value
          })} 
      />
        {formDataErrors.tutor && <div  style={{color:'red'}}>{formDataErrors.tutor}</div>}

        <label>Año de educación actual</label>
        <select 
          value={formData.currentEducationYear}
          onChange={(e) => setFormData({
            ...formData,
            currentEducationYear: e.target.value
          })} 
        >
          <option value="">Selecciona...</option>
          <option value="TRES AÑOS">Tres años</option>
          <option value="CUATRO AÑOS">Cuatro años</option>
          <option value="CINCO AÑOS">Cinco años</option>
          <option value="PRIMERO PRIMARIA">Primero de primaria</option>
          <option value="SEGUNDO PRIMARIA">Segundo de primaria</option>
          <option value="TERCERO PRIMARIA">Tercero de primaria</option>
          <option value="CUARTO PRIMARIA">Cuarto de primaria</option>
          <option value="QUINTO PRIMARIA">Quinto de primaria</option>
          <option value="SEXTO PRIMARIA">Sexto de primaria</option>
          <option value="PRIMERO SECUNDARIA">Primero de secundaria</option>
          <option value="SEGUNDO SECUNDARIA">Segundo de secundaria</option>
          <option value="TERCERO SECUNDARIA">Tercero de secundaria</option>
          <option value="CUARTO SECUNDARIA">Cuarto de secundaria</option>
        </select>
        {formDataErrors.currentEducationYear && <div  style={{color:'red'}}>{formDataErrors.currentEducationYear}</div>}

        <label>Nacionalidad</label>
        <input 
          value={formData.nationality}
          type='text'
          onChange={(e) => setFormData({
            ...formData,
            nationality: e.target.value
          })} 
        />
        {formDataErrors.nationality && <div  style={{color:'red'}}>{formDataErrors.nationality}</div>}

        <label>Horario</label>
        <select 
          value={formData.isMorning}
          onChange={(e) => setFormData({
            ...formData,
            isMorning: e.target.value
          })} 
        >
          <option value="">Selecciona...</option>
          <option value="Mañana">Mañana</option>
          <option value="Tarde">Tarde</option>
        </select>
        {formDataErrors.isMorning && <div  style={{color:'red'}}>{formDataErrors.isMorning}</div>}

        <label>Documento de inscripción</label>
        <div className='register-container-files'>
          <input 
            type='file' 
            onChange={(e) => setFormData({
              ...formData,
              enrollmentDoc: e.target.files[0]
            })} 
          />
        </div>
        {formDataErrors.enrollmentDoc && <div  style={{color:'red'}}>{formDataErrors.enrollmentDoc}</div>}

        <label>Tarjeta sanitaria</label>
        <div className='register-container-files'>
          <input 
            type='file' 
            onChange={(e) => setFormData({
              ...formData,
              sanitaryCard: e.target.files[0]
            })} 
          />
        </div>
        {formDataErrors.sanitaryCard && <div  style={{color:'red'}}>{formDataErrors.sanitaryCard}</div>}

        <button type='submit' className='register-button' style={{  backgroundColor: "#f8f8f8",   border: "2px solid #a6c1ce"}}>
          Enviar
        </button>
      </form>
    </LayoutProfiles>
  );
}

export default ChildForm;
