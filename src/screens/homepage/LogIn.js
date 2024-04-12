import '../../styles/styles.css'
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, redirect } from 'react-router-dom';
import LayoutHomepage from '../../components/LayoutHomepage';
import useAdjustMargin from '../../components/useAdjustMargin';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToken from '../../components/useToken';


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

axios.defaults.withCredentials = true;

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, updateToken] = useToken();

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

            console.log('Logged in, access token:', accessToken);
            updateToken(accessToken);

            manageLogin(accessToken, refreshToken);            // Find the user that matches the logged-in user's token
            const userResponse = await axios.get(`${API_ENDPOINT}auth/users/me/`, {
                headers: {
                  'Authorization': `Bearer ${accessToken}`
                }});
            const user = userResponse.data;
            console.log('User data:', user);

                if (user.role === 'VOLUNTARIO') {
                    localStorage.setItem('role', 'VOLUNTARIO')
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
                    localStorage.setItem('role', 'FAMILIA')
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
                    localStorage.setItem('role', 'SOCIO')
                    if (user.partner === null) {
                        navigate('/socio/formulario');
                    } else {
                        const partner = await axios.get(`${API_ENDPOINT}partner/${user.partner}`, {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }});
                        localStorage.setItem('partnerId', user.partner);
                        navigate('/socio/calendario')
                    }
                    // localStorage.setItem('role', 'SOCIO')
                    //TODO Aqui formulario para socio, una cosa así:
                    //if (user.socio === null) {
                    //    navigate('/socio/formulario');}
                    // navigate('/socio/calendario');
                    
                } else if (user.role === 'EDUCADOR') {
                    localStorage.setItem('role', 'EDUCADOR')
                    //TODO Aqui formulario para educador, una cosa así:
                    //if (user.educador === null) {
                    //    navigate('/educador/formulario');}
                    navigate('/educador/perfil');
                } else if (user.role === 'ADMIN'){
                    localStorage.setItem('role', 'ADMIN')
                    navigate(`/admin/voluntarios`);
                }
        
                localStorage.setItem('userId', user.id);  
            } catch(error){
                Object.entries(error.response.data).forEach(([key, value]) => {
                  toast.error(`${value}`);
                });
              }
        }  

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

                    {/* <p style={{ textAlign: 'center', marginTop: '0px', marginBottom: '0px' }}>o</p>

                    <Button onClick={handleSocialLogin}  className='google-button'>
                        <span>Iniciar sesión con Google</span>
                        <img src={google} alt="Logo" />
                    </Button> */}

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
