import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/styles.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


const UpdateProfile = ({tipo}) => {

    const id = localStorage.getItem('userId');
    const [avatar, setAvatar] = useState("");

    const [valoresList, setValores] = useState([]);

    const navigate = useNavigate();

    //Traemos los datos del usuario
    useEffect(() => {

      axios.get(`${API_ENDPOINT}user/`)
        .then(response => {
          setValores(response.data.find(x=>x.id==parseInt(id,10)));
            console.log("name", name)
            setAvatar(valoresList.avatar)
        })
        .catch(error => {
          console.error(error);
        });

    }, []);

    //Atributos
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [id_number, setId_number] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [volunteer, setVolunteer] = useState("");
    const [family, setFamily] = useState("");
    const [partner, setPartner] = useState("");
    const [educator, setEducator] = useState("");
    const [education_center, setEducation_center] = useState("");

    //Atributos son correctos
    
    const updateAdmin = async () => {
        try {
            const updatedData = { //En el caso de no darle un valor, se coge el original
                name: name || valoresList.name,
                surname: surname || valoresList.surname,
                id_number: id_number || valoresList.id_number,
                phone: phone || valoresList.phone,
                password: password || valoresList.password,
                email: email || valoresList.email,
                role: role || valoresList.role,
                avatar: avatar || valoresList.avatar,
                family: family || valoresList.family,
                partner: partner || valoresList.partner,
                volunteer: volunteer || valoresList.volunteer,
                education_center: education_center || valoresList.education_center,
                educator: educator || valoresList.educator,
            };
    
            const update = await axios.put(`${API_ENDPOINT}user/${id}/`, updatedData);
    
            const { data } = update;
            if (data.message) {
                window.alert(data.message);
            } else {
                navigate(`/${tipo}/perfil`);
            }
        } catch (error) {
            toast.error("Datos no válidos.");
        }
    };
   

   
  

    return (
        <>
            <ToastContainer />
            <div  className='register-container admin' style={{width: '300px'}}>
                <img src={valoresList.avatar} alt={"imagen"} />

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
                    placeholder='Nombre'
                ></input>

                <p>Apellido</p>
                <input 
                    defaultValue={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    type='text'
                    placeholder='Primer Apellido'
                ></input>

                <p>DNI/NIE/Pasaporte</p>
                <input 
                    defaultValue={id_number}
                    onChange={(e) => setId_number(e.target.value)}
                    type='text'
                    placeholder='DNI/NIE/Pasaporte'
                ></input>

                <p>Número de teléfono</p>
                <input 
                    defaultValue={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type='tel'
                    placeholder='Número de teléfono'
                ></input>

                <p>Correo electrónico</p>
                <input 
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                    placeholder='ejemplo@gmail.com'
                ></input>

                <p>Contraseña</p>
                <input 
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    placeholder='Contraseña'
                ></input>


                <button onClick={updateAdmin} className='register-button admin' >
                    Actualizar perfil
                </button>
            </div>
        </>
        
    )
  
  };
  
  export default UpdateProfile;