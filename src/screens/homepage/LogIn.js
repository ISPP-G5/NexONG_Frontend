import '../../styles/styles.css'
import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import google from '../../logo/google.svg'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT


function LogIn() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

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
                navigate('/voluntario/perfil');
            } else if (user.family != null) {
                navigate('/familia/perfil');
            } else if (user.partner != null) {
                navigate('/partner/perfil');
            } else if (user.educator != null) {
                navigate('/educador/perfil');
            } else {
                navigate(`/admin/voluntarios`);
            }
            localStorage.setItem('userId', user.id);
        } else {
            toast.error('Contraseña o correo incorrecto');
        }
    };

    const [marginTop, setMarginTop] = useState('0px');
    
    useEffect(() => {
        const adjustIntroMargin = () => {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const extraMargin = 30; 
            setMarginTop(`${headerHeight + extraMargin}px`); 
        };

        window.addEventListener('resize', adjustIntroMargin);
        adjustIntroMargin();

        return () => {
            window.removeEventListener('resize', adjustIntroMargin);
        };
    }, []);

    return (
        <div className="App">
            <ToastContainer/> 

            <Header/>

            <div className='register-container' style={{marginTop}}>

                <h2>Inicie sesión</h2>
                <label>Correo electrónico</label>
                <input
                    type='email'
                    placeholder='Escriba su correo electrónico'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <label>Contraseña</label>
                <input
                    type='password'
                    placeholder='Escriba su contraseña'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button className='register-button' onClick={handleLogin}>
                    Iniciar sesión
                </button>

                <p style={{ textAlign: 'center', marginTop: '0px', marginBottom: '0px'}}>o</p>

                <Link to={"https://myaccount.google.com/"} className='google-button'>
                    <span>Iniciar sesión con Google</span>
                    <img src={google} alt="Logo"/>
                </Link>

                <p style={{ textAlign: 'center'}}>
                    ¿No tiene cuenta?&nbsp;
                    <Link to="/registrarse" style={{ color: '#6FC0DB' }}>
                        Regístrese aquí
                    </Link>.
                </p>

            </div>


            <Footer/>

        </div>
    );
  }
export default LogIn;