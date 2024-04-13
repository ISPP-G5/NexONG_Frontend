import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/styles.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import LayoutProfiles from '../../components/LayoutProfiles';


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


const KidForm = () => {


    const [valoresList, setValores] = useState([]);

    const navigate = useNavigate();

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
    
            console.log("datos", data);
    
            const firstKey = Object.values(data)[0];
            console.log("Primera clave de 'data':", firstKey);
    
            if (data.message) {
                window.alert(data.message);
            } else {
                axios.get(`${API_ENDPOINT}family/${firstKey}`)
                    .then(response => {
                        const familiaData = response.data;
                        console.log("fam", familiaData.id);
    
                        const updatedData = {
                            email: valoresList.email,
                            password: password,
                            family: familiaData.id, 
                            is_agreed: 'true',
                        };
    
                        axios.put(`${API_ENDPOINT}auth/users/me/`, updatedData)
                            .then(update => {
                                const { data: updatedUserData } = update;
                                if (updatedUserData.message) {
                                    window.alert(updatedUserData.message);
                                } else {
                                    navigate(`/familia/registro/niños`);
                                }
                            })
                            .catch(error => {
                                toast.error("Error al actualizar los datos del usuario.");
                            });
                    })
                    .catch(error => {
                        console.error(error);
                        toast.error("Error al obtener detalles de la familia.");
                    });
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
  
  export default KidForm;