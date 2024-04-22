import '../../styles/styles.css'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import LayoutHomepage from '../../components/LayoutHomepage';
import useAdjustMargin from '../../components/useAdjustMargin';



function HomePageDonation() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const marginTop = useAdjustMargin();

    const navigate = useNavigate();

    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


    // ONE-TIME DONATIONS //////////////////////////////////////////
    // Payment method variables
    const [paymentMethod, setPaymentMethod] = useState("");
    const [transferVisible, setTransferVisible] = useState(false);
    const [cardVisible, setCardVisible] = useState(false);

    // Function to handle payment method change
    const handlePaymentMethodChange = (event) => {
        const selectedMethod = event.target.value;
        setPaymentMethod(selectedMethod);

        // Show/hide payment sections based on the selected payment method
        if (selectedMethod === 'transfer/bizum') {
            setTransferVisible(true);
            setCardVisible(false);
        } else if (selectedMethod === 'card') {
            setTransferVisible(false);
            setCardVisible(true);
        } else {
            setTransferVisible(false);
            setCardVisible(false);
        }
    };



    const [oneTimeName, setOneTimeName] = useState('');
    const [oneTimeSurname, setOneTimeSurname] = useState('');
    const [oneTimeEmail, setOneTimeEmail] = useState('');
    const [paymentDoc, setPaymentDoc] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');

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
        
        // Verificar que se proporcionen todos los datos necesarios
        if (!oneTimeName || oneTimeName === '') {
            toast.error("Introduzca un nombre");
            return; // Detener la ejecución si falta el nombre
        } 
        if (!oneTimeSurname || oneTimeSurname === '') {
            toast.error("Introduzca apellidos");
            return; // Detener la ejecución si faltan los apellidos
        } 
        if (!oneTimeEmail || oneTimeEmail === '') {
            toast.error("Introduzca un correo electrónico");
            return; // Detener la ejecución si falta el correo electrónico
        }
        if (!emailFormat.test(oneTimeEmail)) {
            toast.error("Introduzca un correo electrónico válido");
            return; // Detener la ejecución si el correo electrónico no es válido
        }
        if(amount<1){
            toast.error('La cantidad a donar deber ser superior a 1')
            return;
        }
        if (transferVisible && !paymentDoc) {
            toast.error("Adjunte un documento de pago");
            return; // Detener la ejecución si se requiere un documento de pago pero no se proporciona
        } 
        if (cardVisible && (!amount || isNaN(amount))) {
            toast.error("Adjunte una cantidad válida a donar");
            return; // Detener la ejecución si se requiere una cantidad de donación pero no se proporciona o es inválida
        }
    
       
        const currentTimeStamp = Date.now();

// Convertir el timestamp a una fecha legible en el formato deseado (YYYY-MM-DD)
        const formattedDate = new Date(currentTimeStamp).toISOString().split('T')[0];
    
        // Crear FormData y adjuntar los datos del formulario
        const oneTimeFormData = new FormData();
        oneTimeFormData.append('name', oneTimeName);
        oneTimeFormData.append('surname', oneTimeSurname);
        oneTimeFormData.append('email', oneTimeEmail);
        if (transferVisible) {
            oneTimeFormData.append('proof_of_payment_document', paymentDoc);
        }
        oneTimeFormData.append('date', formattedDate);
        if (cardVisible) {
            oneTimeFormData.append('amount', amount);
        }
    
        // Aquí puedes agregar el console.log para ver los datos antes de enviar la solicitud
        console.log(date);
        console.log(oneTimeName);
        console.log(oneTimeSurname);
        console.log(oneTimeEmail);  
        console.log(paymentDoc)  
        try {
            let endpoint = '';
            let headers = {};
            let data;
        
            if (paymentMethod === 'transfer/bizum') {
                endpoint = `${API_ENDPOINT}punctual-donation/`;
                headers['Content-Type'] = 'multipart/form-data';
                data = oneTimeFormData;
            } else if (paymentMethod === 'card') {
                endpoint = `${API_ENDPOINT}process-payment`;
                headers['Content-Type'] = 'application/json';
                // Exclude the 'date' field if the endpoint is not 'punctual-donation'
                if (oneTimeFormData.has('date')) {
                    oneTimeFormData.delete('date');
                }
                // Convert 'amount' to number if it's a string
                let amount = oneTimeFormData.get('amount');
                console.log(amount)
                // Create a new object for the JSON data
                data = {
                    name: oneTimeFormData.get('name'),
                    surname: oneTimeFormData.get('surname'),
                    email: oneTimeFormData.get('email'),
                    amount: parseFloat(amount)
                };
            }
        
            // Realizar la solicitud POST utilizando axios
            console.log(data)
            const response = await axios.post(endpoint, data, { headers });
        
            // Manejar la respuesta
            if (response.data.checkout_url) {
                window.location.href = response.data.checkout_url;
            } else if (response.data.message) {
                toast.error(response.data.message);
            } else {
                toast.success('Operación realizada correctamente.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al procesar la solicitud.');
        }
    }

    return (
        <LayoutHomepage
            title={'Asociación Manos Abiertas con Norte'}
            description={'Manos Abiertas surge como iniciativa en 1992. Un grupo de jóvenes voluntarios/as, detecta necesidades socioeducativas en la zona de Polígono Norte, Sevilla, y comienza a impartir clases de apoyo de matemáticas y lengua a los niños y niñas de los centros educativos de la zona: Blas Infante y Josefa Amor y Rico (Actualmente IES Inmaculada Vieira), en locales situados en bloques de la barriada.'}
            image={'ong'}
            toastcontainer={true}
            intro={false}
        >
            <div className='homepage-container' style={{ marginTop }}>
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

                    <label>
                        Seleccione el método de pago:
                        
                        <select value={paymentMethod} onChange={handlePaymentMethodChange} style={{ width: '100%' ,height:'150%'}}>
                            <option value="">--Selecciona una opción--</option>
                            <option value="transfer/bizum">Transferencia/Bizum</option>
                            <option value="card">Pago con Tarjeta</option>
                        </select>
                    </label>

                                {transferVisible && (
                                    <div className='register-container' style={{ width: '95%', backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
                                        {/* Transfer Form */}
                                        <label>Documento de pago</label>
                                        <input
                                            type='file'
                                            onChange={handlePaymentDocChange}
                                        />
                                        <button type='submit' className='register-button'>
                                            Enviar
                                        </button>
                                    </div>
                                )}

                                {cardVisible && (
                                    <div className='register-container' style={{ width: '95%', backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
                                        {/* Stripe Form */}
                                        <label>Cantidad</label>
                                        <input
                                            value={amount}
                                            type='text'
                                            placeholder='Escriba la cantidad a donar'
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                        <button type='submit' className='register-button'>
                                            Pagar con Tarjeta
                                        </button>
                                    </div>
                                )}



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