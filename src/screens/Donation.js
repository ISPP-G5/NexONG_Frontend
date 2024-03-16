import '../styles/styles.css'
import google from '../logo/google.svg'
import Header from '../components/Header';
import Footer from '../components/Footer';
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Donation() {

    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

    const[name,setName] = useState('');
    const[surname,setSurname] = useState('');
    const[email,setEmail] = useState('');
    const[paymentDoc,setPaymentDoc] = useState('');
    const[date,setDate] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.getFullYear() + '-' + (
            '0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + (
            '0' + currentDate.getDate()).slice(-2);
        setDate(formattedDate);
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPaymentDoc(file);
    }

    const sendOneTimeForm = async (e) => {
        e.preventDefault();
        if(!name || name === ''){
            window.alert("Se debe insertar un nombre")
        }else if(!surname || surname === ''){
            window.alert("Se deben insertar apellidos")
        }else if(!email || email === ''){
            window.alert("Se debe insertar un correo electrónico")
        }else if(!paymentDoc){
            window.alert("Se debe adjuntar un documento de pago")
        }else{
            const oneTimeFormData = new FormData();
            oneTimeFormData.append('name',name);
            oneTimeFormData.append('surname',surname);
            oneTimeFormData.append('email',email);
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
                    window.alert('Operación realizada correctamente. Se le enviará un justificante de pago.')
                }
            } catch (error) {
                console.error('Error', error);
            }
        }
    }

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
                                value={name}
                                type='text'
                                placeholder='Escriba su nombre'
                                style={inputStyle}
                                onChange={(e) => setName(e.target.value)}
                                />

                                <div style={labelStyle}>Apellidos</div>
                                <input
                                value={surname}
                                type='text'
                                placeholder='Escriba sus apellidos'
                                style={inputStyle}
                                onChange={(e) => setSurname(e.target.value)}
                                />

                                <div style={labelStyle}>Correo electrónico</div>
                                <input
                                value={email}
                                type='text'
                                placeholder='Escriba su correo electrónico'
                                style={inputStyle}
                                onChange={(e) => setEmail(e.target.value)}
                                />

                                <div style={labelStyle}>Documento de pago</div>
                                <input
                                type='file'
                                onChange={handleFileChange}
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

                            <div className='flex-container'>
                                <h2>Regístrese</h2>

                                <div>

                                    <div style={labelStyle}>Nombre</div>
                                    <input
                                    type='text'
                                    placeholder='Escriba su nombre'
                                    style={inputStyle}
                                    />

                                    <div style={labelStyle}>Apellidos</div>
                                    <input
                                    type='text'
                                    placeholder='Escriba sus apellidos'
                                    style={inputStyle}
                                    />

                                    <div style={labelStyle}>Correo electrónico</div>
                                    <input
                                    type='text'
                                    placeholder='Escriba su correo electrónico'
                                    style={inputStyle}
                                    />

                                    <div style={labelStyle}>Contraseña</div>
                                    <input
                                    type='password'
                                    placeholder='Escriba su contraseña'
                                    style={inputStyle}
                                    />

                                    <div style={labelStyle}>Confirmar contraseña</div>
                                    <input
                                    type='password'
                                    placeholder='Confirme su contraseña'
                                    style={inputStyle}
                                    />

                                </div>

                                <div style={{
                                  display:'flex',
                                  flexDirection:'column',
                                  alignItems:'center',
                                  justyfyContent:'center'}}>

                                    <br/>

                                    <button className='button' style={{
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