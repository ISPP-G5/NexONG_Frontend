import '../styles/styles.css'
import google from '../logo/google.svg'
import Header from '../components/Header';
import Footer from '../components/Footer';
import {Link} from 'react-router-dom';
import { useEffect } from 'react';
function LogIn() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const labelStyle = {
        width: '100%', // Use percentage for width
        height: '2rem', // Use rem for height
        top: '5rem', // Use rem for top
        fontFamily: 'Helvetica',
        fontStyle: 'normal',
        fontWeight: '505',
        fontSize: '1.25rem', // Use rem for font-size
        lineHeight: '1.75rem', // Use rem for line-height
        color: '#7C838A',
    };

    const inputStyle = {
        width: '80%', // Use 100% width for the input elements
        borderRadius: '1rem',
        margin: '0 auto',
        boxSizing: 'border-box', // Include padding and border in the width calculation
    };

    const flexContainerStyle = {
        alignItems: 'center',
    }

    return (
        <div className="App">

            <Header/>

            <div className='main'>

                <div className='flex-container-register' style={flexContainerStyle}>

                    <div className='h2-register'>Inicie sesión</div>
                    <a style={labelStyle}>Correo electrónico</a>
                    <input
                    type='text'
                    placeholder='Escriba su correo electrónico'
                    style={inputStyle}
                    />

                    <a style={labelStyle}>Contraseña</a>
                    <input
                    type='text'
                    placeholder='Escriba su contraseña'
                    style={inputStyle}
                    />

                    <button className='button' style={{
                      marginTop: '4%',
                      fontSize: '1.5rem',
                      width: '60%' }}>
                        Iniciar sesión
                    </button>

                    <div className='text' style={{
                      fontFamily: 'Poppins',
                      fontSize: '1rem', fontWeight: 400 }}>
                        o
                    </div>

                    <button className='button-google' style={{ fontWeight: 'bold' }}>
                        <span>Iniciar sesión con Google</span>
                        <Link to="https://myaccount.google.com/">
                            <img src={google} alt="Logo" className='button-google-img' />
                        </Link>
                    </button>

                    <div className='text' style={{
                      fontFamily: 'Poppins',
                      fontSize: '1rem',
                      fontWeight: 400,
                      color: 'gray' }}>
                        ¿No tiene cuenta?
                        <Link to="/registrarse" style={{ color: '#6FC0DB' }}>
                            Regístrese aquí
                        </Link>.
                    </div>

                </div>

            </div>

            <Footer/>

        </div>
    );
  }
export default LogIn;