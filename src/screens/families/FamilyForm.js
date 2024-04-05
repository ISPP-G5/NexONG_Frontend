import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/styles.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import LayoutProfiles from '../../components/LayoutProfiles';


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


const FamilyForm = () => {


    const [valoresList, setValores] = useState([]);

    const navigate = useNavigate();

    //Traemos los datos del usuario
    useEffect(() => {

      axios.get(`${API_ENDPOINT}auth/users/me/`)
        .then(response => {
          setValores(response.data);
        })
        .catch(error => {
          console.error(error);
        });

    }, []);

    //Atributos

    const [familia, setFamilia] = useState("");
    const [password, setPassword] = useState("");

    const [surname1, setSurname1] = useState("");
    const [surname2, setSurname2] = useState("");

    //Atributos son correctos
    
    const updatePut = async () => {

        try {
            const postFam = { 
                
                name: "Familia " + surname1 + " " + surname2,

            };
    
            const post = await axios.post(`${API_ENDPOINT}family/`, postFam);



            const { data } = post;
            if (data.message) {
                window.alert(data.message);
            } else {
            }
        } catch (error) {
            toast.error("Datos no válidos.");
        }

        axios.get(`${API_ENDPOINT}family/`)
        .then(response => {
            setFamilia(response.data.filter(x=>x.name==="Familia " + surname1 + " " + surname2));
        })
        .catch(error => {
            console.error(error);
        });

        try {
            const updatedData = { //En el caso de no darle un valor, se coge el original
                last_login: valoresList.last_login,
                is_superuser: valoresList.is_superuser,
                first_name: valoresList.first_name,
                last_name: valoresList.last_name,
                is_staff: valoresList.is_staff,
                is_active: valoresList.is_active,
                date_joined: valoresList.date_joined,
                username: valoresList.username,
                id_number: valoresList.id_number,
                phone: valoresList.phone,
                password: password,
                email: valoresList.email,
                role: valoresList.role,
                is_enabled: valoresList.is_enabled,
                family: familia || valoresList.family,
                partner: valoresList.partner,
                volunteer: valoresList.volunteer,
                education_center: valoresList.education_center,
                educator: valoresList.educator,
                groups: valoresList.groups,
                user_permissions: valoresList.user_permissions,

            };
    
            const update = await axios.put(`${API_ENDPOINT}auth/users/me/`, updatedData);
    
            const { data } = update;
            if (data.message) {
                window.alert(data.message);
            } else {
                navigate(`/familia/perfil`);
            }
        } catch (error) {
            toast.error("Datos no válidos.");
        }
    };


    return (
        <>
            <LayoutProfiles profile={'familia'}>
            <ToastContainer />
            <div  className='register-container' style={{width: '300px', marginTop:'6%'}}>
                
                <p>Apellido 1</p>
                <input 
                    defaultValue={surname1}
                    onChange={(e) => setSurname1(e.target.value)}
                    type='text'
                    placeholder='Primer Apellido'
                ></input>

                <p>Apellido 2</p>
                <input 
                    defaultValue={surname2}
                    onChange={(e) => setSurname2(e.target.value)}
                    type='text'
                    placeholder='Segundo Apellido'
                ></input>

                <p>Contraseña</p>
                <input 
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    placeholder='Contraseña'
                ></input>

                <button onClick={updatePut} className='register-button admin' >
                    Proceder
                </button>
            </div>
            </LayoutProfiles>
        </>
        
    )
  
  };
  
  export default FamilyForm;