import '../../styles/styles.css'
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, redirect } from 'react-router-dom';
import google from '../../logo/google.svg'
import LayoutHomepage from '../../components/LayoutHomepage';
import useAdjustMargin from '../../components/useAdjustMargin';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@material-ui/core';
import Header from '../../components/Header';
import { Print } from '@material-ui/icons';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

axios.defaults.withCredentials = true;

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        getUserData().then(async response => {
            if (response !== null) {
                console.log("User is logged in");
                const user = response.data;
                console.log(user);
                // Check if the user is enabled
                if (!user.is_enabled) {
                    toast.error('Revise el correo y active la cuenta');
                } else {
                    if (user.role === 'VOLUNTARIO') {
                        if (user.volunteer === null) {
                            navigate('/voluntario/formulario');
                        } else {
                            const volunteer = await axios.get(`${API_ENDPOINT}volunteer/${user.volunteer}`);
                            localStorage.setItem('volunteerId', user.volunteer);

                            if (volunteer.status === 'ACEPTADO') {
                                navigate('/voluntario/agenda');
                            } else {
                                navigate('/voluntario/espera');
                            }
                        }
                    } else if (user.role === 'FAMILIA') {
                        navigate('/familia/perfil');
                    } else if (user.role === 'SOCIO') {
                        navigate('/socio/calendario');
                    } else if (user.role === 'EDUCADOR') {
                        navigate('/educador');
                    } else {
                        navigate(`/admin/voluntarios`);
                    }
            
                    localStorage.setItem('userId', user.id);
                }    
            }    
        });
    }, []);

    const getUserData = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const axiosInstance = axios.create({
            headers: {
                'Authorization': `JWT ${accessToken}`,
            }
        });
        try {
            return await axiosInstance.get(`${API_ENDPOINT}auth/users/me/`);
        } catch (error) {
            return null;
        }            
    }

    const navigate = useNavigate();
    
    const manageLogin = async (access, refresh) => { 
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);

        console.log('Logged in, access token:', access);

        getUserData().then(response => {
            if (response !== null) {
                const user = response.data
                console.log('User data:', user);
                localStorage.setItem('userId', user.id);
            }
        });
    }


    const handleSocialLoginRedirect = async (code, state) => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) return;
        
        try {
            const url = `${API_ENDPOINT}` + "auth/o/google-oauth2/?state=" + state + "&code=" + code
            const response = await axios.post(url);

            const { access: accessToken, refresh: refreshToken } = response.data;
    
            manageLogin(accessToken, refreshToken);
        } catch (error) {
            console.error(error);
        }
    };

    const queryParams = new URLSearchParams(useLocation().search);
    const code = queryParams.get('code');
    const state = queryParams.get('state');

    if (code && state) {
        // This was a redirect from social login
        console.log("REDIRECT")
        handleSocialLoginRedirect(code, state)
    }

    const handleSocialLogin = async () => {
        try {
            const url = `${API_ENDPOINT}` + "auth/o/google-oauth2/?redirect_uri=http://127.0.0.1:3000/iniciar-sesion/"
            const response = await axios.get(url);
            window.location.href = response.data['authorization_url'];
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API_ENDPOINT}auth/jwt/create/`, {
                email: email,
                password: password,
            });
            const { access: accessToken, refresh: refreshToken } = response.data;
    
            manageLogin(accessToken, refreshToken);
            
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('Contraseña o correo incorrecto');
        }
    };
    const marginTop = useAdjustMargin();

    return (
        <LayoutHomepage
            intro={false}
            toastcontainer={true}
        >
            <form onSubmit={handleLogin}> {/* Se envuelve el formulario para enviar con 'enter' */}
                <div className='register-container' style={{ marginTop }}>

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

                    <button className='register-button' type="submit"> {/* Cambiamos onClick por type="submit" */}
                        Iniciar sesión
                    </button>

                    <p style={{ textAlign: 'center', marginTop: '0px', marginBottom: '0px' }}>o</p>

                    <Button onClick={handleSocialLogin}  className='google-button'>
                        <span>Iniciar sesión con Google</span>
                        <img src={google} alt="Logo" />
                    </Button>

                    <p style={{ textAlign: 'center' }}>
                        ¿No tiene cuenta?&nbsp;
                    <Link to="/registrarse" style={{ color: '#6FC0DB' }}>
                            Regístrese aquí
                    </Link>.
                </p>

                </div>
            </form>
        </LayoutHomepage>
    );
}
export default LogIn;
