import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import PersonCard from '../components/PeopleCard';
import AdminLayout from '../components/AdminLayout';
import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

const AdminSocios = () => {
  const [sociosList, setSociosList] = useState([]);

  useEffect(() => {
    axios.get(`${API_ENDPOINT}users/`)
      .then(response => {
        console.log(response.data.filter(u => u.role === "PARTNER"));
        setSociosList(response.data.filter(u => u.role === "PARTNER"));
      })
      .catch(error => {
        console.error(error);
      });
  }, []); 

  const handleDelete = (index) => {
    const updatedSocios = [...sociosList];
    updatedSocios.splice(index, 1);
    setSociosList(updatedSocios);
  };

  return (
    
      <AdminLayout>
        <div className='admin-container'>
          <div className='pantallas'>
            <Link to='/adminSocios' className='selected-pantalla'>
              Nuestros Socios
            </Link>
            <Link to='/convocar-asamblea'>Convocar Asamblea</Link>
          </div>
          {sociosList.map((socio, index) => (
            <PersonCard key={index} person={socio} onDelete={() => handleDelete(index)} />
          ))}
        </div>
      </AdminLayout>
   
  );
}

export default AdminSocios;