import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/styles.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import LayoutProfiles from '../../components/LayoutProfiles';
import useToken from '../../components/useToken';


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


const FamilyForm = () => {

    const [token, updateToken] = useToken();
    const config = {
        headers: {
        'Authorization': `Bearer ${token}`,
        }
    };


    const [valoresList, setValores] = useState([]);

    const navigate = useNavigate();

    //Traemos los datos del usuario
    useEffect(() => {

      axios.get(`${API_ENDPOINT}auth/users/me/`, config)
        .then(response => {
          setValores(response.data);
        })
        .catch(error => {
          console.error(error);
        });

    }, []);

    //Atributos
    const [surname1, setSurname1] = useState("");
    const [surname2, setSurname2] = useState("");

    //Atributos son correctos
    
    const updatePut = async () => {
        try {
            const postFam = { 
                name: "Familia " + surname1 + " " + surname2,
            };
    
            const post = await axios.post(`${API_ENDPOINT}family/`, postFam, config);
            const { data } = post;
    
            const firstKey = Object.values(data)[0];
    
            if (data.message) {
                console.error(data.message);
            } else {
                axios.get(`${API_ENDPOINT}family/${firstKey}`, config)
                    .then(response => {
                        const familiaData = response.data;
                        console.log("fam", familiaData.id);
    
                        const updatedData = {
                            email: valoresList.email,
                            family: familiaData.id, // Aquí se pasa el pk de la familia
                            is_agreed: 'true',
                        };
    
                        axios.put(`${API_ENDPOINT}auth/users/me/`, updatedData, config)
                            .then(update => {
                                const { data: updatedUserData } = update;
                                navigate('/familia/perfil');
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
        navigate('/familia/perfil');
    };
    
    


    return (
        <>
            <LayoutProfiles profile={'familia'}>
            <ToastContainer />
            <div  className='register-container' style={{width: '300px', marginTop:'6%'}}>

                <h3>Formulario de Familiares</h3>
                
                <p>Primer Apellido</p>
                <input 
                    defaultValue={surname1}
                    onChange={(e) => setSurname1(e.target.value)}
                    type='text'
                    placeholder='Primer Apellido'
                ></input>

                <p>Segundo Apellido</p>
                <input 
                    defaultValue={surname2}
                    onChange={(e) => setSurname2(e.target.value)}
                    type='text'
                    placeholder='Segundo Apellido'
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