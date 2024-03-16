import '../styles/styles.css'
import google from '../logo/google.svg'
import Header from '../components/Header';
import Footer from '../components/Footer';
import {Link, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users,setUsers] = useState('');
    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get( `${API_ENDPOINT}user/`)
        .then(response => {
            console.log(response.data);
            setUsers(response.data)
        }, error => {
            console.error(error);
        }
        );
      }, []);
      const navigate = useNavigate();

      const handleLogin = (event) => {
        event.preventDefault();
        const user = users.find(user => user.email === email && user.password === password);
    
        if (user) {
            if (user.volunteer != null) {
                navigate('/voluntarioPerfil');
            } else if (user.family != null) {
                navigate('/familias');
            } else if (user.partner != null) {
                navigate('/partners');
            } else if (user.educator != null) {
                navigate('/educadorPerfil');
            } else {
                navigate(`/admin/${user.id}/`);
            }
            localStorage.setItem('userId', user.id);
        } else {
            alert('Contraseña o correo incorrecto');
        }
    };
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
        width: '80%', 
        borderRadius: '1rem',
        margin: '0 auto',
        boxSizing: 'border-box', 
        fontFamily: 'Helvetica',
        border: '1px solid #ccc', 
        padding: '10px',
        outline: 'none', 
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
                    <label style={labelStyle}>Correo electrónico</label>
                    <input
                    type='text'
                    placeholder='Escriba su correo electrónico'
                    style={inputStyle}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />

                    <label style={labelStyle}>Contraseña</label>
                    <input
                    type='password'
                    placeholder='Escriba su contraseña'
                    style={inputStyle}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />

                    <button className='button' style={{
                        marginTop: '4%',
                        fontSize: '1.5rem',
                        width: '60%' }}
                        onClick={handleLogin}
                    >
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