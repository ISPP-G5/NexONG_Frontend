import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/styles.css'
import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const Profile = ({usuario}) => {

  const [valores, setValores] = useState([]);

  useEffect(() => {

      axios.get(`${API_ENDPOINT}user/`)
        .then(response => {
          setValores(response.data.filter(x=>x.id===parseInt(localStorage.getItem('userId'),10)));
        })
        .catch(error => {
          console.error(error);
        });

  }, []);


  return (
    <div  className='register-container admin' style={{width: '300px'}}>
      {valores.map((profile, index) => (
        <div key={index}>
          <img src={profile.avatar} alt={"imagen"} />

          <div style={{ alignSelf: 'center', fontWeight: 'bold', marginTop: '1%', marginBottom:'1%' }}>{profile.name}</div>

          <p>Email</p>
          <input type='text' value={profile.email} readOnly></input>

          <p>Teléfono</p>
          <input type='text' value={profile.phone} readOnly></input>

          <p>Contraseña</p>
          <input type='password' value={profile.password} readOnly></input>

          <button className='register-button admin' >
            <Link to={`/${usuario}/perfil/actualizar`}>
              Actualizar perfil
            </Link>
          </button>
        </div>
      ))}
    </div>

  );
};

export default Profile;