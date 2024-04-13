import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/styles.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import avatarImage from '../logo/avatar.png';



const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const config = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
  };

const UpdateProfile = ({tipo,id}) => {

    const [avatar, setAvatar] = useState("");


    const [valoresList, setValores] = useState([]);
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
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        console.log("prueba", valoresList.avatar);
        setAvatar(valoresList.avatar);
      }, [valoresList]);


    //Atributos
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [id_number, setId_number] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
 

    //Atributos son correctos
    
    const updateAdmin = async () => {

        try {
            const updatedData = { //En el caso de no darle un valor, se coge el original
                last_login: valoresList.last_login,
                is_superuser: valoresList.is_superuser,
                first_name: name || valoresList.first_name,
                last_name: surname || valoresList.last_name,
                is_staff: valoresList.is_staff,
                is_active: valoresList.is_active,
                date_joined: valoresList.date_joined,
                username: (name + " " + surname),
                id_number: id_number || valoresList.id_number,
                phone: phone || valoresList.phone,
                password: password || valoresList.password,
                email: email || valoresList.email,
                role: valoresList.role,
                is_enabled: valoresList.is_enabled,
                family: valoresList.family,
                partner: valoresList.partner,
                volunteer: valoresList.volunteer,
                education_center: valoresList.education_center,
                educator: valoresList.educator,
                groups: valoresList.groups,
                user_permissions: valoresList.user_permissions,

            };
            const updateEndpoint = id ? `${API_ENDPOINT}user/${id}/` : `${API_ENDPOINT}auth/users/me/`;
            const update = await axios.put(updateEndpoint, updatedData, config);
    
    
            const { data } = update;
            if (data.message) {
                window.alert(data.message);
            if(id && valoresList.role !== "EDUCADOR"){
                navigate(`/admin/${valoresList.role + "S"}`);

            }else if(id && valoresList.role === "EDUCADOR"){
                navigate(`/admin/${valoresList.role + "ES"}`)
             }
             else {
                navigate(`/${tipo}/perfil`);
            }
        }else {
            const toastId = toast.success("Datos actualizados con éxito.", { autoClose: 800 });
            const checkToast = setInterval(() => {
                if (!toast.isActive(toastId)) { 
                    clearInterval(checkToast); 
                    navigate(`/${tipo}/perfil`); 
                }
            }, 1000); 
        }
        } catch (error) {
            if (error.response.data.email) {
                toast.error("Formato del correo incorrecto.");
            } else if (error.response.data.phone) {
                toast.error("Formato del telefono incorrecto");
            }
            else if (!id.match(spanishIdFormat)) {
                toast.error('Formato de identificación inválido');
                return;
              }
             else {
                toast.error("Datos no válidos.");
            }
        }
    };


    return (
        <>
            <ToastContainer />
            <div  className='register-container' style={{width: '300px', marginTop:'6%'}}>
            <img src={valoresList.avatar ? valoresList.avatar : avatarImage} style={{borderRadius: '50%'}} alt="imagen" />

                <div style={{ marginTop: '2%', marginBottom: '2%'}}>
                    <img src='https://www.pngall.com/wp-content/uploads/8/Red-Warning.png' style={{ width: '3.5%' }} alt='' />
                    <strong>Modificar sólo los datos que requieran cambio</strong>
                    <img src='https://www.pngall.com/wp-content/uploads/8/Red-Warning.png' style={{ width: '3.5%' }} alt='' />
                </div>

                <p>Nombre</p>
                <input 
                    defaultValue={name} //defaultValue es como value, pero permite el cambio
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                    placeholder={valoresList.first_name}
                ></input>

                <p>Apellido</p>
                <input 
                    defaultValue={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    type='text'
                    placeholder={valoresList.last_name}
                ></input>

                <p>DNI/NIE/Pasaporte</p>
                <input 
                    defaultValue={id_number}
                    onChange={(e) => setId_number(e.target.value)}
                    type='text'
                    placeholder={valoresList.id_number}
                ></input>

                <p>Número de teléfono</p>
                <input 
                    defaultValue={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type='tel'
                    placeholder={valoresList.phone}
                ></input>
                {id? <></>:
                <>
                <p>Correo electrónico</p>
                <input 
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                    placeholder='ejemplo@gmail.com'
                ></input>


                <p style={{textAlign:'center'}}>
                <img src='https://www.pngall.com/wp-content/uploads/8/Red-Warning.png' style={{ width: '3.5%' }} alt='' />
                Contraseña (obligatorio)
                <img src='https://www.pngall.com/wp-content/uploads/8/Red-Warning.png' style={{ width: '3.5%' }} alt='' />
                </p>
                <input 
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    placeholder='Contraseña de tu cuenta'
                ></input>
                </>
            }
                <button onClick={updateAdmin} className='register-button admin' >
                    Actualizar perfil
                </button>
            </div>
        </>
        
    )
  
  };
  
  export default UpdateProfile;