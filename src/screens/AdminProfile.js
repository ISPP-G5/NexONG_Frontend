import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/styles.css'
import AdminLayout from '../components/AdminLayout';
import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const AdminProfiles = () => {

  const [valoresList, setValores] = useState([]);

  useEffect(() => {

      axios.get(`${API_ENDPOINT}user/`)
        .then(response => {
          setValores(response.data.filter(x=>x.id==parseInt(localStorage.getItem('userId'),10)));
        })
        .catch(error => {
          console.error(error);
        });

  }, []);

  console.log('valoresList',valoresList)


  return (
    <AdminLayout>
      {valoresList.map((profile, index) => (
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
          <div className='field-text' style={{ margin: '10px', maxWidth: '80%', marginLeft: '10%' }}>{profile.email}</div>

          <div className='bold-text'>Teléfono</div>
          <div className='field-text' style={{ margin: '10px', maxWidth: '80%', marginLeft: '10%' }}>{profile.phone}</div>

          <div className='bold-text'>Contraseña</div>
          <div className='field-text' style={{ margin: '10px', maxWidth: '80%', marginLeft: '10%' }}>{profile.password}</div>

          <button className='button' style={{ textAlign: 'center', alignSelf: 'center', margin: '4%' }}>
            <Link to={`/adminPerfilActualizar`}
              style={{
                textDecoration: "none",
                color: "black",
              }}>
              Actualizar perfil
            </Link>
          </button>
        </div>
      ))}
    </AdminLayout>
  );
};

export default AdminProfiles;