import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/styles.css'
import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const config = {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  }
};

const Profile = ({usuario}) => {

  const [valores, setValores] = useState([]);

  //Traemos los datos del usuario que ha iniciado sesión
  useEffect(() => {

      axios.get(`${API_ENDPOINT}auth/users/me/`, config)
        .then(response => {
          setValores(response.data);
        })
        .catch(error => {
          console.error(error);
        });

  }, []);
  console.log("valores", valores)

  //Mostramos los datos en inputs para censurar la contraseña
  return (
    <div  className='register-container admin' style={{width: '300px', marginTop:'6%'}}>
          <img src={valores.avatar} alt={"imagen"} />

          <div style={{ alignSelf: 'center', fontWeight: 'bold', marginTop: '1%', marginBottom:'1%' }}>{valores.username}</div>

          <p>Email</p>
          <input type='text' value={valores.email} readOnly></input>

          <p>Teléfono</p>
          <input type='text' value={valores.phone} readOnly></input>

          <p>Contraseña</p>
          <input type='password' value={valores.password} readOnly></input>

          <button className='register-button admin' >
            <Link to={`/${usuario}/perfil/actualizar`}>
              Actualizar perfil
            </Link>
          </button>
    </div>

  );
};

export default Profile;