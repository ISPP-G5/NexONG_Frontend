import '../../styles/styles.css'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import google from '../../logo/google.svg'
import axios from 'axios';
import LayoutHomepage from '../../components/LayoutHomepageForms';
import useAdjustMargin from '../../components/useAdjustMargin';
import HomepageContainer from '../../components/HomepageContainer';

function HomePageDonation() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const marginTop = useAdjustMargin();

    const navigate = useNavigate();

    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

    const[oneTimeName,setOneTimeName] = useState('');
    const[oneTimeSurname,setOneTimeSurname] = useState('');
    const[oneTimeEmail,setOneTimeEmail] = useState('');
    const[paymentDoc,setPaymentDoc] = useState('');
    const[date,setDate] = useState('');
    const token = localStorage.getItem('accessToken');

    const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.getFullYear() + '-' + (
            '0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + (
            '0' + currentDate.getDate()).slice(-2);
        setDate(formattedDate);
    }, []);

    const handlePaymentDocChange = (e) => {
        const file = e.target.files[0];
        setPaymentDoc(file);
    }

    const handleClick = (e) => {
        navigate('/registrarse');
    }

    const sendOneTimeForm = async (e) => {
        e.preventDefault();
        if(!oneTimeName || oneTimeName === ''){
            toast.error("Introduzca un nombre");
        }else if(!oneTimeSurname || oneTimeSurname === ''){
            toast.error("Introduzca apellidos")
        }else if(!oneTimeEmail || oneTimeEmail === ''){
            toast.error("Introduzca un correo electrónico")
        }else if(!paymentDoc){
            toast.error("Adjunte un documento de pago")
        }
        else if(oneTimeName.length>75){
        toast.error("Indica un nombre, no debe superar 75 caráteres")
         }
         else if(oneTimeSurname.length>75){
            toast.error("Indica un nombre, no debe superar 75 caráteres")
        }
        else{
            const oneTimeFormData = new FormData();
            oneTimeFormData.append('first_name',oneTimeName);
            oneTimeFormData.append('last_name',oneTimeSurname);
            oneTimeFormData.append('email',oneTimeEmail);
            oneTimeFormData.append('proof_of_payment_document',paymentDoc);
            oneTimeFormData.append('date',date);
            try {
                const update = await axios.post(`${API_ENDPOINT}punctual-donation/`,
                oneTimeFormData,
                {
                    headers:{
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                        
                    }
                });
                console.log(update);
                const { data } = update;
                if (data.message) {
                    toast.error(data.message);
                } else {
                    toast.success('Operación realizada correctamente.')
                }
            } catch (error) {
                console.error('Error', error);
            }
        }
    }

    return (
        <LayoutHomepage
            toastcontainer={true}
            intro={false}
        >
            <div className='homepage-container'>
                <div className='flex-container' style={{'--columnwidth': `300px`, display: 'flex', flexDirection: 'column', position: 'relative'}}>
                    <h2>Donaciones puntuales</h2>
                    <div>
                        <p>Si quiere ayudarnos con algún donativo puntual,
                        puede hacerlo a través de una transferencia
                        bancaria a nuestra cuenta o a través de nuestro
                        código de Bizum.</p>
                        <p>¡Ambas opciones son bienvenidas!</p>
                        <ul>
                            <li>IBAN: ES63 2100 2409 5002 0019 2504</li>
                            <li>Bizum: ONG: 03857</li>
                        </ul>
                        <p>Para recibir un justificante, por favor rellene
                        los siguientes campos:</p>
                    </div>
            
                    <form className='register-container' style={{width: '95%', backgroundColor: 'transparent', border: 'none', boxShadow: 'none'}} onSubmit={sendOneTimeForm}>

                        <label>Nombre</label>
                        <input
                        value={oneTimeName}
                        type='text'
                        placeholder='Escriba su nombre'
                        onChange={(e) => setOneTimeName(e.target.value)}
                        />

                        <label>Apellidos</label>
                        <input
                        value={oneTimeSurname}
                        type='text'
                        placeholder='Escriba sus apellidos'
                        onChange={(e) => setOneTimeSurname(e.target.value)}
                        />

                        <label>Correo electrónico</label>
                        <input
                        value={oneTimeEmail}
                        type='text'
                        placeholder='Escriba su correo electrónico'
                        onChange={(e) => setOneTimeEmail(e.target.value)}
                        />

                        <label>Documento de pago</label>
                        <input
                        type='file'
                        onChange={handlePaymentDocChange}
                        />

                        <button type='submit' className='register-button'>
                            Enviar
                        </button>

                    </form>
                </div>

                <div className='flex-container' style={{'--columnwidth': `300px`, display: 'flex', flexDirection: 'column', position: 'relative', maxHeight: '300px'}}>

                    <h2>Donaciones recurrentes</h2>

                    <p>
                        ¿Quiere contribuir a nuestra organización de forma periódica?
                        Regístrese como socio y le proporcionaremos todo lo necesario.
                    </p>

                    <div className='flex-container' style={{alignItems: 'center', backgroundColor: 'transparent', border: 'none', boxShadow: 'none'}}>
                        <button className='register-button' onClick={handleClick}>
                            Registrarse
                        </button>
                    </div>

                </div>

            </div>
        </LayoutHomepage>
    );
  }
export default HomePageDonation;