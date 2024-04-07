import '../../styles/styles.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import google from '../../logo/google.svg'
import axios from 'axios';
import LayoutHomepage from '../../components/LayoutHomepage';
import useAdjustMargin from '../../components/useAdjustMargin';

function HomePageDonation() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const marginTop = useAdjustMargin();

    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

    // ONE-TIME DONATIONS //////////////////////////////////////////

    const[oneTimeName,setOneTimeName] = useState('');
    const[oneTimeSurname,setOneTimeSurname] = useState('');
    const[oneTimeEmail,setOneTimeEmail] = useState('');
    const[paymentDoc,setPaymentDoc] = useState('');
    const[date,setDate] = useState('');

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
        }else{
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
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(update);
                const { data } = update;
                if (data.message) {
                    toast.error(data.message);
                } else {
                    toast.success('Operación realizada correctamente. Se le enviará un justificante de pago. (TO DO)')
                }
            } catch (error) {
                console.error('Error', error);
            }
        }
    }

    ////////////////////////////////////////////////////////////////

    // RECURRING DONATIONS /////////////////////////////////////////

    const[recurringName,setRecurringName] = useState('');
    const[recurringSurname,setRecurringSurname] = useState('');
    const[recurringEmail,setRecurringEmail] = useState('');
    const[idNumber,setIdNumber] = useState('');
    const[password,setPassword] = useState('');
    const[confirmPassword,setConfirmPassword] = useState('');
    const[address,setAddress] = useState('');
    const[birthdate,setBirthdate] = useState('');
    const[enrollmentDoc,setEnrollmentDoc] = useState('');
    const[isAgreed,setIsAgreed] = useState('');

    const handleEnrollmentDocChange = (e) => {
        const file = e.target.files[0]
        setEnrollmentDoc(file);
    }

    const handleIsAgreedChange = () => {
        setIsAgreed(true);
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

    function constantTimeComparison(str1, str2){
        if (str1.length !== str2.length){
            return false;
        }
        let result = 0;
        for (let i = 0 ; i < str1.length; i++){
            result |= str1.charCodeAt(i) ^ str2.charCodeAt(i);
        }
        return result === 0;
    }

    const sendRecurringForm = async(e) => {
        e.preventDefault();
        if(!recurringName || recurringName === ''){
            toast.error("Introduzca un nombre")
        }else if(!recurringSurname || recurringSurname === ''){
            toast.error("Introduzca apellidos")
        }else if(!recurringEmail || recurringEmail === ''){
            toast.error("Introduzca un correo electrónico")
        }else if(!idNumber || idNumber === ''){
            toast.error("Introduzca un DNI")
        }else if(!address || address === ''){
            toast.error("Introduzca una dirección")
        }else if(!enrollmentDoc || enrollmentDoc === ''){
            toast.error("Adjunte un documento de inscripción")
        }else if(!birthdate || birthdate === ''){
            toast.error("Introduzca una fecha de nacimiento")
        }else if(calculateAge(birthdate) < 18){
            toast.error("Debe ser mayor de edad para ser socio")
        }else if(!password || password === ''){
            toast.error("Introduzca una contraseña")
        }else if (!constantTimeComparison(password, confirmPassword)){
            toast.error("Las contraseñas no coinciden")
        }else if (!isAgreed){
            toast.error("Para registrarse debe aceptar los términos y condiciones")
        }else{
            const partnerData = new FormData();
            partnerData.append('address',address);
            partnerData.append('enrollment_document',enrollmentDoc);
            partnerData.append('birthdate',birthdate);
            const partnerResponse = await axios.post(`${API_ENDPOINT}partner/`,partnerData);
            const partnerId = partnerResponse.data.id;
            const recurringFormData = new FormData();
            recurringFormData.append('first_name',recurringName);
            recurringFormData.append('last_name',recurringSurname);
            recurringFormData.append('email',recurringEmail);
            recurringFormData.append('id_number',idNumber);
            recurringFormData.append('password',password);
            recurringFormData.append('role',"SOCIO");
            recurringFormData.append('partner',partnerId);
            recurringFormData.append('is_agreed',isAgreed);
            try{
                const update = await axios.post(`${API_ENDPOINT}auth/users/`,
                recurringFormData,
                {
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const { access: accessToken, refresh: refreshToken } = update.data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                console.log('Registered, access token:', accessToken);

                console.log(update);
                const { data } = update;
                if (data.message){
                    toast.error(data.message);
                }else{
                    toast.success('Registro correcto. Revise su correo para activar cuenta');
                }
            }catch(error){
                console.error('Error',error);
            }
        }
    }

    ////////////////////////////////////////////////////////////////

    return (
        <LayoutHomepage 
            title={'Asociación Manos Abiertas con Norte'} 
            description={'Manos Abiertas surge como iniciativa en 1992. Un grupo de jóvenes voluntarios/as, detecta necesidades socioeducativas en la zona de Polígono Norte, Sevilla, y comienza a impartir clases de apoyo de matemáticas y lengua a los niños y niñas de los centros educativos de la zona: Blas Infante y Josefa Amor y Rico (Actualmente IES Inmaculada Vieira), en locales situados en bloques de la barriada.'}
            image={'ong'}
            toastcontainer={true}
            intro={false}
        > 
            <table className='donations-table' style={{marginTop}}>
                <thead>
                <tr>
                    <td style={{width:'50%'}}>
                        <h1>Donaciones puntuales</h1>
                    </td>
                    <td style={{width:'50%'}}>
                        <h1>Donaciones recurrentes</h1>
                    </td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className='donations-table-td'>
                        
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
                        
                        <form className='register-container' style={{width: '95%', backgroundColor: 'transparent' ,border: 'none', boxShadow: 'none'}} onSubmit={sendOneTimeForm}>

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
                    </td>

                    <td style={{borderRight: 'none'}}>

                        <form className='register-container' style={{width: '70%', marginTop: '0%'}} onSubmit={sendRecurringForm}>

                            <h2>Regístrese</h2>

                   
                            <label>Nombre</label>
                            <input
                            value={recurringName}
                            type='text'
                            placeholder='Escriba su nombre'
                            onChange={(e) => setRecurringName(e.target.value)}
                            />

                            <label>Apellidos</label>
                            <input
                            value={recurringSurname}
                            type='text'
                            placeholder='Escriba sus apellidos'
                            onChange={(e) => setRecurringSurname(e.target.value)}
                            />

                            <label>Correo electrónico</label>
                            <input
                            value={recurringEmail}
                            type='text'
                            placeholder='Escriba su correo electrónico'
                            onChange={(e) => setRecurringEmail(e.target.value)}
                            />

                            <label>DNI</label>
                            <input
                            value={idNumber}
                            type='text'
                            placeholder='Escriba su DNI'
                            onChange={(e) => setIdNumber(e.target.value)}
                            />

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
                                onClick={() => handleDownload('volunteer_registration')}>
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

                            <label>Contraseña</label>
                            <input
                            value={password}
                            type='password'
                            placeholder='Escriba su contraseña'
                            onChange={(e) => setPassword(e.target.value)}
                            />

                            <label>Confirmar contraseña</label>
                            <input
                            value={confirmPassword}
                            type='password'
                            placeholder='Confirme su contraseña'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            />

                            <div style={{ marginTop: '4%' }}>
                            <input
                                type="checkbox"
                                name="acccept"
                                onChange={handleIsAgreedChange}
                            />
                            <label>He leído y acepto los términos y condiciones</label>
                            </div>

                            <button className='register-button'>
                                Crear cuenta
                            </button>

                            <p style={{ textAlign: 'center', marginTop: '0px', marginBottom: '0px'}}>o</p>

                            <Link to={"https://myaccount.google.com/"} className='google-button'>
                                <span>Registrarse con Google</span>
                                <img src={google} alt="Logo"/>
                            </Link>


                            <p style={{ textAlign: 'center', marginBottom: '5%'}}>
                                ¿Ya tiene una cuenta?&nbsp;
                                <Link to="/iniciar-sesion" style={{ color: '#6FC0DB' }}>
                                Inicie sesión aquí
                                </Link>.
                            </p>

                        </form>
                    </td>
                </tr>
                </tbody>
            </table>

        </LayoutHomepage>
    );
  }
export default HomePageDonation;