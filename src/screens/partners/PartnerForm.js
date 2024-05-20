import '../../styles/styles.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderProfiles from '../../components/HeaderProfiles';
import useAdjustMargin from '../../components/useAdjustMargin';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import useToken from '../../components/useToken';
import IBAN from 'iban';


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


function PartnerForm() {

    const [token, updateToken] = useToken();

    const config_partner = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        }
    }

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

    const[address,setAddress] = useState('');
    const[birthdate,setBirthdate] = useState('');
    const[enrollmentDoc,setEnrollmentDoc] = useState('');
    const [holder, setHolder] = useState('');
    const [iban, setIban] = useState('');
    const [quantity, setQuantity] = useState('');
    const [frequency, setFrequency] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const handleDownload = (file) => {
        // Path to the PDF file
        const fileUrl = `${process.env.PUBLIC_URL}/docs/${file}.pdf`; 
    
        // Create a temporary link
        const downloadLink = document.createElement('a');
        downloadLink.href = fileUrl;
        downloadLink.download = `${file}.pdf`; 
    
        // Click the link to download the file
        downloadLink.click();
    };

    const calculateAge = (birthdate) => {
        const birthDate = new Date(birthdate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        return m < 0 || (m === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
    };
    const handleCheckboxChange = (value) => {
        setFrequency(value);
      };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!address || address === ''){
            toast.error("Introduzca una dirección");
            return;
        }
        if(!enrollmentDoc || enrollmentDoc === ''){
            toast.error("Adjunte un documento de inscripción");
            return;
        }
        if(enrollmentDoc &&enrollmentDoc.type !== 'application/pdf'){
            toast.error("Adjunte un documento de inscripción en formato PDF");
            return;
        }
        if(!birthdate || birthdate === ''){
            toast.error("Introduzca una fecha de nacimiento");
            return;
        }
        if(calculateAge(birthdate) < 18){
            toast.error("Debe ser mayor de edad para ser socio");
            return;
        }
        if (address.length > 255){
            toast.error('Se ha superado el número de carácteres permitido')
            return;
        }
        if (!holder || !iban || !quantity || !frequency) {
            toast.error('Todos los campos de la donación son obligatorios');
            return;
        }
        if (!IBAN.isValid(iban)) {
            toast.error('El formato del IBAN no es correcto');
            return;
        }
        const parsedQuantity = parseFloat(quantity);
        if (parsedQuantity <= 0 || isNaN(parsedQuantity)) {
            toast.error('La cantidad de la donación debe ser mayor que 0');
            return;
        }

        const partnerData = new FormData();
        partnerData.append('address',address);
        partnerData.append('enrollment_document',enrollmentDoc);
        partnerData.append('birthdate',birthdate);

        
    try {
        // Attempt to create the partner
        const partnerResponse = await axios.post(`${API_ENDPOINT}partner/`, partnerData, config_partner);
        localStorage.setItem('partnerId', partnerResponse.data.id);
        toast.success('Socio creado con éxito');

        // Make a PATCH request to update the user's partner attribute
        await axios.patch(`${API_ENDPOINT}auth/users/me/`, {
            partner: partnerResponse.data.id,
        }, config_user);

        // Attempt to create the donation
        const donationResponse = await axios.post(`${API_ENDPOINT}donation/`, {
            iban: iban,
            quantity: quantity,
            frequency: frequency,
            holder: holder,
            date: selectedDate,
            partner: partnerResponse.data.id, // Assign the partner ID to the donation
        }, config_partner);

        toast.success('Donación creada correctamente');

        setTimeout(() => {
            navigate('/socio/calendario');
        }, 2000); // Adjust the delay time as needed
    } catch (error) {
        if (error.response && error.response.data) {
            // If the error response and data exist, show the error message from the backend
            Object.entries(error.response.data).forEach(([key, value]) => {
                if (key === 'iban') {
                    // If the error is related to the iban field, show a custom error message
                    toast.error('Ya hay una donación con este IBAN');
                  } else {
                    // If the error is related to another field, show the error message from the backend
                    toast.error(value);
                  }
            });
        } else {
            // If the error response or data don't exist, show a generic error message
            toast.error('Error creando socio');
        }
    }
};

    const marginTop = useAdjustMargin('.header-profiles');

    return (

        <div className="App">
            <ToastContainer />
            <HeaderProfiles profile={'socio'} showProfile={false} />
            <form className='register-container' style={{ marginTop }} onSubmit={handleSubmit}>
                <h2>Formulario de Socios</h2>
                <p>Necesitamos algunos datos y documentos para completar su solicitud como socio</p>

                <label>Dirección</label>
                <input
                value={address}
                type='text'
                placeholder='Escriba su dirección'
                onChange={(e) => setAddress(e.target.value)}
                />

                <label>Documento de inscripción</label>
                <div className='register-container-files'>
                    <a 
                        className='button-contrast-files'
                        onClick={() => handleDownload('partner_enrollment_document')}>
                        Descargar
                    </a>
                    <input
                    type='file'
                    onChange={(e) => setEnrollmentDoc(e.target.files[0])}
                    />
                </div>

                <label>Fecha de nacimiento</label>
                <input
                value={birthdate}
                type='date'
                onChange={(e) => setBirthdate(e.target.value)}
                />

                <label>Titular de la cuenta</label>
                <input
                    value={holder}
                    type='text'
                    placeholder='Escriba el nombre del titular de la cuenta de donación'
                    onChange={(e) => setHolder(e.target.value)}
                />

                <label>IBAN de la cuenta</label>
                <input
                    value={iban}
                    type='text'
                    placeholder='Escriba el IBAN de la cuenta de donación'
                    onChange={(e) => setIban(e.target.value)}
                />

                <label className='long-label'>¿Con qué cantidad deseas colaborar?</label>
                <input
                    value={quantity}
                    type='number'
                    min={0}
                    placeholder='Introduce la cantidad de la donación'
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <label>¿Con qué frecuencia?</label>

                <div className="register-container-checkbox">
                    <input 
                        type="checkbox" 
                        id="mensual" 
                        checked={frequency === 'MENSUAL'}
                        onChange={() => handleCheckboxChange('MENSUAL')}
                    />
                    <label htmlFor="mensual">MENSUAL (la cantidad introducida cada mes)</label>
                </div>

                <div className="register-container-checkbox">
                    <input 
                        type="checkbox" 
                        id="trimestral" 
                        checked={frequency === 'TRIMESTRAL'}
                        onChange={() => handleCheckboxChange('TRIMESTRAL')}
                    />
                    <label htmlFor="trimestral">TRIMESTRAL (la cantidad introducida cada 3 meses)</label>
                </div>

                <div className="register-container-checkbox">
                    <input 
                        type="checkbox" 
                        id="semestral" 
                        checked={frequency === 'SEMESTRAL'}
                        onChange={() => handleCheckboxChange('SEMESTRAL')}
                    />
                    <label htmlFor="semestral">SEMESTRAL (la cantidad introducida cada 6 meses)</label>
                </div>

                <div className="register-container-checkbox">
                    <input 
                        type="checkbox" 
                        id="anual" 
                        checked={frequency === 'ANUAL'}
                        onChange={() => handleCheckboxChange('ANUAL')}
                    />
                    <label htmlFor="anual">ANUAL (la cantidad introducida una vez al año)</label>
                </div>

                <label>Fecha de incorporación</label>
                <input
                    type='date'
                    value={new Date().toISOString().substr(0, 10)}
                    readOnly
                />

                <button type='submit' className='register-button'>
                    Enviar
                </button>
            </form>
        </div>
    );
}

export default PartnerForm;