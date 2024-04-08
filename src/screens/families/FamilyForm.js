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

            console.log("datos",data);

            setFamilia(data);

            if (data.message) {
                window.alert(data.message);
            }
        } catch (error) {
            toast.error("Datos no válidos.");
        }


    };


    const updateFam = async () => {
        
        console.log("familia",familia);

        try {
            const updatedData = { //En el caso de no darle un valor, se coge el original

                email: valoresList.email,
                password: password,
                family: familia,
                is_agreed: 'true',

            };
    
            const update = await axios.put(`${API_ENDPOINT}auth/users/me/`, updatedData);
    
            const { data } = update;
            if (data.message) {
                window.alert(data.message);
            } else {
                navigate(`/familia/registro/niños`);
            }
        } catch (error) {
            toast.error("Datos no válidos.");
        }
    };

    const update = () => {

        setTimeout(updatePut,1);
        setTimeout(updateFam,1);
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

                <button onClick={update} className='register-button admin' >
                    Proceder
                </button>
            </div>
            </LayoutProfiles>
        </>
        
    )
  
  };
  
  export default FamilyForm;