import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/styles.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import avatarImage from '../logo/avatar.png';
import useToken from './useToken';



const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


const UpdateProfile = ({tipo,id}) => {
    const [token] = useToken();
    const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    };

    const [avatar, setAvatar] = useState("");

    const [valoresList, setValores] = useState([]);

    //Atributos
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [id_number, setId_number] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const spanishIdFormat = /^[XYZ]?\d{5,8}[A-Z]$/;

    const navigate = useNavigate();

    //Traemos los datos del usuario
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (id) {
                    response = await axios.get(`${API_ENDPOINT}user/${id}/`, config);
                } else {
                    response = await axios.get(`${API_ENDPOINT}auth/users/me/`, config);
                }
                setValores(response.data);
                setName(response.data.first_name);
                setSurname(response.data.last_name);
                setId_number(response.data.id_number);
                setPhone(response.data.phone);
                setEmail(response.data.email);
                setPassword(response.data.password);

                setAvatar(response.data.avatar);
                console.log('User',valoresList);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, []);

    //Atributos son correctos
    
    const updateAdmin = async () => {

        try {
            const updatedData = { 
                first_name: name,
                last_name: surname,
                username: (name + " " + surname),
                id_number: id_number,
                phone: phone,
                password: password,
                email: email,

            };
            const updateEndpoint = id ? `${API_ENDPOINT}user/${id}/` : `${API_ENDPOINT}auth/users/me/`;
            await axios.patch(updateEndpoint, updatedData, config);


            const toastId = toast.success("Datos actualizados con éxito.", { autoClose: 800 });
            const checkToast = setInterval(() => {
                if (!toast.isActive(toastId)) { 
                    clearInterval(checkToast); 
                    if(id && valoresList.role === "VOLUNTARIO"){
                        navigate('/admin/voluntarios');
                    }else if(id && valoresList.role === "EDUCADOR"){
                        navigate('/admin/educadores');
                    } else {
                        navigate(`/${tipo}/perfil`);
                    }
                }
            }, 1000); 

        } catch (error) {
            if (error.response.data.email) {
                toast.error("Formato del correo incorrecto.");
            } else if (error.response.data.phone) {
                toast.error("Formato del telefono incorrecto");
            } else if (!id.match(spanishIdFormat)) {
                toast.error('Formato de identificación inválido');
            } else {
                toast.error("Datos no válidos.");
            }
        }
    };


    return (
        <div className='register-container admin' style={{width: '300px', marginTop:'6%'}}>
            <ToastContainer />
            <img src={valoresList.avatar ? valoresList.avatar : avatarImage} style={{borderRadius: '50%'}} alt="imagen" />

            <div style={{ marginTop: '2%', marginBottom: '2%'}}>
                <img src='https://www.pngall.com/wp-content/uploads/8/Red-Warning.png' style={{ width: '3.5%' }} alt='' />
                <strong>Modificar sólo los datos que requieran cambio</strong>
                <img src='https://www.pngall.com/wp-content/uploads/8/Red-Warning.png' style={{ width: '3.5%' }} alt='' />
            </div>
            
            <p>Nombre</p>
            <input 
                type='text'
                defaultValue={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder={name}
            ></input>

            <p>Apellido</p>
            <input 
                type='text'
                defaultValue={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder={surname}
            ></input>

            <p>DNI/NIE/Pasaporte</p>
            <input 
                type='text'
                defaultValue={id_number}
                onChange={(e) => setId_number(e.target.value)}
                placeholder={id_number}
            ></input>

            <p>Número de teléfono</p>
            <input 
                type='tel'
                defaultValue={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={phone}
            ></input>

            <p>Correo electrónico</p>
            <input 
                type='email'
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={email}
            ></input>

            <button onClick={updateAdmin} className='register-button admin' >
                Actualizar perfil
            </button>
        </div>        
    )
  
  };
  
  export default UpdateProfile;