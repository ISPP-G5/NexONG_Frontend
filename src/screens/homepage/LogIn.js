import '../../styles/styles.css'
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import google from '../../logo/google.svg'
import LayoutHomepage from '../../components/LayoutHomepage';
import useAdjustMargin from '../../components/useAdjustMargin';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Token } from '@mui/icons-material';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT


function LogIn() {
  
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API_ENDPOINT}auth/jwt/create/`, {
                email: email,
                password: password,
            });
            const { access: accessToken, refresh: refreshToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
    
            console.log('Logged in, access token:', accessToken);
    
            
            // Find the user that matches the logged-in user's token
            const userResponse = await axios.get(`${API_ENDPOINT}auth/users/me/`, {
                headers: {
                  'Authorization': `Bearer ${accessToken}`
                }});
            const user = userResponse.data;
            console.log('User data:', user);

            // Check if the user is enabled
            if (!user.is_enabled) {
                toast.error('Revise el correo y active la cuenta');
            } else {
                if (user.role === 'VOLUNTARIO') {
                    if (user.volunteer === null) {
                        navigate('/voluntario/formulario');
                    } else {
                        const volunteer = await axios.get(`${API_ENDPOINT}volunteer/${user.volunteer}`, {
                            headers: {
                              'Authorization': `Bearer ${accessToken}`
                            }});
                        localStorage.setItem('volunteerId', user.volunteer);

                        if (volunteer.status === 'ACEPTADO') {
                            navigate('/voluntario/agenda');
                        } else {
                            navigate('/voluntario/espera');
                        }
                    }
                } else if (user.role === 'FAMILIA') {
                    if (user.family === null) {
                    //Crea un objeto familia
                    const response = await axios.post(`${API_ENDPOINT}family/`, 
                    {name: "Familia " + user.last_name}, {
                        headers: {
                          'Authorization': `Bearer ${accessToken}`
                        }});
                    
                    localStorage.setItem('familyId', response.data.id);
                     console.log(response.data);
                    //El usuario es asignado esa familia
                    await axios.patch(`${API_ENDPOINT}auth/users/me/`,
                    {password: password, family: response.data.id}, {
                        headers: {
                          'Authorization': `Bearer ${accessToken}`
                        }});
                    }
                    navigate('/familia/perfil');
                } else if (user.role === 'SOCIO') {
                    //TODO Aqui formulario para socio, una cosa así:
                    //if (user.socio === null) {
                    //    navigate('/socio/formulario');}
                    navigate('/socio/calendario');
                } else if (user.role === 'EDUCADOR') {
                    //TODO Aqui formulario para educador, una cosa así:
                    //if (user.educador === null) {
                    //    navigate('/educador/formulario');}
                    navigate('/educador');
                } else {
                    navigate(`/admin/voluntarios`);
                }
        
                localStorage.setItem('userId', user.id);
            }    
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

                    <Link to={"https://myaccount.google.com/"} className='google-button'>
                        <span>Iniciar sesión con Google</span>
                        <img src={google} alt="Logo" />
                    </Link>

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
