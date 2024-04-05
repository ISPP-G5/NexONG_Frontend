import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/styles.css'
import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const Profile = ({usuario}) => {

  const [valores, setValores] = useState([]);
  const [name, setName] = useState("")

  //Traemos los datos del usuario que ha iniciado sesión
  useEffect(() => {

      axios.get(`${API_ENDPOINT}auth/users/me`)
        .then(response => {
          setValores(response.data);
        })
        .catch(error => {
          console.error(error);
        });

        setTimeout(setName(valores.first_name + " " + valores.last_name),900);
  }, []);



  //Mostramos los datos en inputs para censurar la contraseña
  return (
    <div  className='register-container admin' style={{width: '300px', marginTop:'6%'}}>
          <img src={valores.avatar} alt={"imagen"} />

          <div style={{ alignSelf: 'center', fontWeight: 'bold', marginTop: '1%', marginBottom:'1%' }}>{valores.username}</div>

          <p>Usuario</p>
          <input type='text' value={name} readOnly></input>

          <p>Email</p>
          <input type='text' value={valores.email} readOnly></input>

          <p>Teléfono</p>
          <input type='text' value={valores.phone} readOnly></input>

          <p>DNI/NIE/Pasaporte</p>
          <input type='text' value={valores.id_number} readOnly></input>

          <button className='register-button admin' >
            <Link to={`/${usuario}/perfil/actualizar`}>
              Actualizar perfil
            </Link>
          </button>
        </div>

  );
};

export default Profile;