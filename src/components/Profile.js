import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/styles.css'
import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const Profile = ({usuario}) => {

  const [valores, setValores] = useState([]);

  // POSIBLE IMPLEMENTACION CUANDO NO HAGA FALTA EL MODHEADER 
  
  // useEffect(() => {
  //   axios.get(`${API_ENDPOINT}auth/users/me`)
  //     .then(response => {
  //       if (response.data.role === 'VOLUNTARIO') {
  //         axios.get(`${API_ENDPOINT}volunteer/${response.data.volunteer}`)
  //           .then(volunteerResponse => {
  //             setValores({
  //               ...response.data,
  //               ...volunteerResponse.data
  //             });
  //           })
  //           .catch(error => {
  //             console.error(error);
  //           });
  //       } else {
  //         setValores(response.data);
  //       }
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);

  //Traemos los datos del usuario que ha iniciado sesión
  useEffect(() => {

      axios.get(`${API_ENDPOINT}user/`)
        .then(response => {
          setValores(response.data.filter(x=>x.id===parseInt(localStorage.getItem('userId'),10)));
        })
        .catch(error => {
          console.error(error);
        });

  }, []);

  //Mostramos los datos en inputs para censurar la contraseña
  return (
    <div  className='register-container admin' style={{width: '300px', marginTop:'6%'}}>
      {valores.map((profile, index) => (
        <div key={index}>
          <img src={profile.avatar} alt={"imagen"} />

          <div style={{ alignSelf: 'center', fontWeight: 'bold', marginTop: '1%', marginBottom:'1%' }}>{profile.username}</div>

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