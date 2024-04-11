import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/styles.css';
import axios from 'axios';
import useToken from './useToken'; 
import avatarImage from '../logo/avatar.png';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const Profile = ({ usuario }) => {
  const [token, updateToken] = useToken(); 

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  };
  const [valores, setValores] = useState([]);

  useEffect(() => {
    axios.get(`${API_ENDPOINT}auth/users/me/`, config)
      .then(response => {
        setValores(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [token]); 

  console.log("valores", valores);

  return (
    <div className='register-container admin' style={{width: '300px', marginTop:'6%'}}>
          <img src={valores.avatar} alt="imagen" />

          <div style={{ alignSelf: 'center', fontWeight: 'bold', marginTop: '1%', marginBottom:'1%' }}>{valores.username}</div>

          <p>Email</p>
          <input type='text' value={valores.email || ''} readOnly />

          <p>Teléfono</p>
          <input type='text' value={valores.phone || ''} readOnly />

          <p>Contraseña</p>
          <input type='password' value="********" readOnly />

          <button className='register-button admin'>
            <Link to={`/${usuario}/perfil/actualizar`}>
              Actualizar perfil
            </Link>
          </button>
    </div>
  );
};

export default Profile;
