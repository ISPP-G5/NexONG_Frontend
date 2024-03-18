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
    <div>
      {valores.map((profile, index) => (
        <div key={index} className='update-container' style={{ marginLeft: '12.5%' }}>
          <div style={{ alignSelf: 'center' }}>
            <img src={profile.avatar} alt={"imagen"} style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: '100%',
            }} />
          </div>

          <div style={{ alignSelf: 'center', fontWeight: 'bold' }}>{profile.name}</div>

          <div className='bold-text'>Email</div>
          <input type='text' value={profile.email} style={{ margin: '10px', maxWidth: '90%', marginLeft: '5%', borderColor:'#fcfdff',backgroundColor:'#fcfdff' }}></input>

          <div className='bold-text'>Teléfono</div>
          <input type='text' value={profile.phone} style={{ margin: '10px', maxWidth: '90%', marginLeft: '5%', borderColor:'#fcfdff',backgroundColor:'#fcfdff' }}></input>

          <div className='bold-text'>Contraseña</div>
          <input type='password' value={profile.password} style={{ margin: '10px', maxWidth: '90%', marginLeft: '5%', borderColor:'#fcfdff',backgroundColor:'#fcfdff' }}></input>

          <button className='button' style={{ textAlign: 'center', alignSelf: 'center', margin: '4%' }}>
            <Link to={`/${usuario}/perfil/actualizar`}
              style={{
                textDecoration: "none",
                color: "black",
              }}>
              Actualizar perfil
            </Link>
          </button>
        </div>
      ))}
    </div>

  );
};

export default Profile;