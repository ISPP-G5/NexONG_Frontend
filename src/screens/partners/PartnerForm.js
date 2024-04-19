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
    const currentDate = new Date();

    const handleEnrollmentDocChange = (e) => {
        const file = e.target.files[0]
        setEnrollmentDoc(file);
    }

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

        const partnerData = new FormData();
        partnerData.append('address',address);
        partnerData.append('enrollment_document',enrollmentDoc);
        partnerData.append('birthdate',birthdate);

        try {
            const response = await axios.post(`${API_ENDPOINT}partner/`,
            partnerData, config_partner);
            localStorage.setItem('partnerId', response.data.id);
            console.log(response.data);
            toast.success('Socio creado con éxito');

            // Make a PATCH request to update the user's partner attribute
            await axios.patch(`${API_ENDPOINT}auth/users/me/`, {
                partner: response.data.id,
            }, config_user);

            navigate('/socio/calendario');
        } catch (error) {
            if (error.response && error.response.data) {
                // If the error response and data exist, show the error message from the backend
                Object.entries(error.response.data).forEach(([key, value]) => {
                    toast.error(`${value}`);
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
                    <button className='button-contrast-files'
                    onClick={() => handleDownload('partner_enrollment_document')}>
                        Descargar
                    </button>
                    <input
                    type='file'
                    onChange={handleEnrollmentDocChange}
                    />
                </div>

                <label>Fecha de nacimiento</label>
                <input
                value={birthdate}
                type='date'
                onChange={(e) => setBirthdate(e.target.value)}
                />

                <button type='submit' className='register-button'>
                    Enviar
                </button>

            </form>
        </div>
    );
}

export default PartnerForm;