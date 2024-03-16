import '../styles/styles.css'
import google from '../logo/google.svg'
import Header from '../components/Header';
import Footer from '../components/Footer';
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Donation() {

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
            window.alert("Se debe insertar un nombre")
        }else if(!oneTimeSurname || oneTimeSurname === ''){
            window.alert("Se deben insertar apellidos")
        }else if(!oneTimeEmail || oneTimeEmail === ''){
            window.alert("Se debe insertar un correo electrónico")
        }else if(!paymentDoc){
            window.alert("Se debe adjuntar un documento de pago")
        }else{
            const oneTimeFormData = new FormData();
            oneTimeFormData.append('name',oneTimeName);
            oneTimeFormData.append('surname',oneTimeSurname);
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
                    window.alert(data.message);
                } else {
                    window.alert('Operación realizada correctamente. Se le enviará un justificante de pago. (TO DO)')
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

    const handleEnrollmentDocChange = (e) => {
        const file = e.target.files[0]
        setEnrollmentDoc(file);
    }

    const sendRecurringForm = async(e) => {
        e.preventDefault();
        if(!recurringName || recurringName === ''){
            window.alert("Se debe insertar un nomrbe")
        }else if(!recurringSurname || recurringSurname === ''){
            window.alert("Se deben insertar apellidos")
        }else if(!recurringEmail || recurringEmail === ''){
            window.alert("Se debe insertar un correo electrónico")
        }else if(!idNumber || idNumber === ''){
            window.alert("Se debe insertar un DNI")
        }else if(!address || address === ''){
            window.alert("Se debe insertar una dirección")
        }else if(!enrollmentDoc || enrollmentDoc === ''){
            window.alert("Se debe adjuntar un documento de inscripción")
        }else if(!birthdate || birthdate === ''){
            window.alert("Se debe insertar una fecha de nacimento")
        }else if(!password || password === ''){
            window.alert("Se debe insertar una contraseña")
<<<<<<< HEAD
        }else if (password !== confirmPassword){
=======
        }else if (password != confirmPassword){
>>>>>>> c34ae37baff6fbff4739ece0b155f9327ba76b6d
            window.alert("Las contraseñas no coinciden")
        }else{
            const partnerData = new FormData();
            partnerData.append('address',address);
            partnerData.append('enrollment_document',enrollmentDoc);
            partnerData.append('birthdate',birthdate);
            const partnerResponse = await axios.post(`${API_ENDPOINT}partner/`,partnerData);
            const partnerId = partnerResponse.data.id;
            const recurringFormData = new FormData();
            recurringFormData.append('name',recurringName);
            recurringFormData.append('surname',recurringSurname);
            recurringFormData.append('email',recurringEmail);
            recurringFormData.append('id_number',idNumber);
            recurringFormData.append('password',password);
            recurringFormData.append('role',"PARTNER");
            recurringFormData.append('partner',partnerId);
            try{
                const update = await axios.post(`${API_ENDPOINT}user/`,
                recurringFormData,
                {
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(update);
                const { data } = update;
                if (data.message){
                    window.alert(data.message);
                }else{
                    window.alert('Operación realizada correctamente. PLACEHOLDER: Enviar a página de donación')
                }
            }catch(error){
                console.error('Error',error);
            }
        }
    }

    ////////////////////////////////////////////////////////////////

    const tableStyle = {
        width: '100%',
        marginTop: '7%',
        marginBottom: '2%',
        paddingLeft: '5%',
        paddingRight: '5%',
    };

    const paragraphStyle = {
        textAlign: 'justify',
        marginTop: '30px',
        marginBotton: '30px',
    }

    const labelStyle = {
        padding: '10px',
        color: '#7C838A',
        textAlign: 'left',
    };

    const inputStyle = {
        width: '100%', // Use 100% width for the input elements
        borderRadius: '1rem',
        margin: '0 auto',
        boxSizing: 'border-box', // Include padding and border in the width calculation
    };

    return (
        <div className="App">
            <Header/>
            
            <div className='main'>
                <table style={tableStyle}>
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

                        <td style={{
                        borderRight:'3px solid #b7ecff',
                        verticalAlign:'top',
                        paddingLeft:'5%',
                        paddingRight:'5%',}}>
                        <form onSubmit={sendOneTimeForm}>
                            
                            <div style={paragraphStyle}>
                                Si quiere ayudarnos con algún donativo puntual,
                                puede hacerlo a través de una transferencia
                                bancaria a nuestra cuenta o a través de nuestro
                                código de Bizum.
                                <br/>
                                ¡Ambas opciones son bienvenidas!
                                <ul>
                                    <li>IBAN: ES63 2100 2409 5002 0019 2504</li>
                                    <li>Bizum: ONG: 03857</li>
                                </ul>
                                Para recibir un justificante, por favor rellene
                                los siguientes campos:
                            </div>
                            
                            <div>

                                <div style={labelStyle}>Nombre</div>
                                <input
                                value={oneTimeName}
                                type='text'
                                placeholder='Escriba su nombre'
                                style={inputStyle}
                                onChange={(e) => setOneTimeName(e.target.value)}
                                />

                                <div style={labelStyle}>Apellidos</div>
                                <input
                                value={oneTimeSurname}
                                type='text'
                                placeholder='Escriba sus apellidos'
                                style={inputStyle}
                                onChange={(e) => setOneTimeSurname(e.target.value)}
                                />

                                <div style={labelStyle}>Correo electrónico</div>
                                <input
                                value={oneTimeEmail}
                                type='text'
                                placeholder='Escriba su correo electrónico'
                                style={inputStyle}
                                onChange={(e) => setOneTimeEmail(e.target.value)}
                                />

                                <div style={labelStyle}>Documento de pago</div>
                                <input
                                type='file'
                                onChange={handlePaymentDocChange}
                                />

                            </div>

                            <button type='submit' className='button' style={{
                                  marginTop: '4%',
                                  fontSize: '1.5rem',
                                  width: '30%' }}>
                                    Enviar
                                </button>

                        </form>
                        </td>
                        <td style={{
                        verticalAlign:'top',
                        paddingLeft:'5%',
                        paddingRight:'5%'}}>
                        <form onSubmit={sendRecurringForm}>

                            <div className='flex-container'>
                                <h2>Regístrese</h2>

                                <div>

                                    <div style={labelStyle}>Nombre</div>
                                    <input
                                    value={recurringName}
                                    type='text'
                                    placeholder='Escriba su nombre'
                                    style={inputStyle}
                                    onChange={(e) => setRecurringName(e.target.value)}
                                    />

                                    <div style={labelStyle}>Apellidos</div>
                                    <input
                                    value={recurringSurname}
                                    type='text'
                                    placeholder='Escriba sus apellidos'
                                    style={inputStyle}
                                    onChange={(e) => setRecurringSurname(e.target.value)}
                                    />

                                    <div style={labelStyle}>Correo electrónico</div>
                                    <input
                                    value={recurringEmail}
                                    type='text'
                                    placeholder='Escriba su correo electrónico'
                                    style={inputStyle}
                                    onChange={(e) => setRecurringEmail(e.target.value)}
                                    />

                                    <div style={labelStyle}>DNI</div>
                                    <input
                                    value={idNumber}
                                    type='text'
                                    placeholder='Escriba su DNI'
                                    style={inputStyle}
                                    onChange={(e) => setIdNumber(e.target.value)}
                                    />

                                    <div style={labelStyle}>Dirección</div>
                                    <input
                                    value={address}
                                    type='text'
                                    placeholder='Escriba su dirección'
                                    style={inputStyle}
                                    onChange={(e) => setAddress(e.target.value)}
                                    />

                                    <div style={labelStyle}>Documento de inscripción</div>
                                    <input
                                    type='file'
                                    onChange={handleEnrollmentDocChange}
                                    />

                                    <div style={labelStyle}>Fecha de nacimiento</div>
                                    <input
                                    value={birthdate}
                                    type='date'
                                    style={inputStyle}
                                    onChange={(e) => setBirthdate(e.target.value)}
                                    />

                                    <div style={labelStyle}>Contraseña</div>
                                    <input
                                    value={password}
                                    type='password'
                                    placeholder='Escriba su contraseña'
                                    style={inputStyle}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <div style={labelStyle}>Confirmar contraseña</div>
                                    <input
                                    value={confirmPassword}
                                    type='password'
                                    placeholder='Confirme su contraseña'
                                    style={inputStyle}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    />

                                </div>

                                <div style={{
                                  display:'flex',
                                  flexDirection:'column',
                                  alignItems:'center',
                                  justyfyContent:'center'}}>

                                    <br/>

                                    <button type='submit' className='button' style={{
                                      marginTop: '4%',
                                      fontSize: '1.5rem',
                                      width: '60%' }}>
                                        Crear cuenta
                                    </button>

                                    <div style={{
                                      marginTop: '4%',
                                      marginBottom: '4%'}}>
                                        ó
                                    </div>

                                    <button className='button-google' style={{fontWeight:'bold'}}>
                                        <span>Registrarse con Google</span>
                                        <Link to="https://myaccount.google.com/">
                                            <img src={google} alt="Logo" className='button-google-img' />
                                        </Link>
                                    </button>

                                    <div style={{
                                      color: 'gray',
                                      marginTop: '4%',
                                      marginBottom: '4%'}}>
                                        ¿Ya tiene cuenta?
                                        &nbsp;
                                        <Link to="/registrarse" style={{color: '#6FC0DB'}}>
                                            Inicie sesión aquí
                                        </Link>.
                                    </div>
                                    
                                </div>
                                

                            </div>
                        </form>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <Footer/>
        </div>
    );
  }
export default Donation;