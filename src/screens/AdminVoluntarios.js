import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import PersonCard from '../components/PeopleCard';
import AdminLayout from '../components/AdminLayout'
import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  

function AdminVoluntarios() {
  const [voluntariosList, setVoluntariosList] = useState([]);

  useEffect(() => {
    axios.get(`${API_ENDPOINT}user/`)
      .then(response => {
        console.log(response.data);
        setVoluntariosList(response.data.filter(u => u.role === "VOLUNTEER"))
      })
      .catch(error => {
        console.error(error);
      });
  }, []);  

  const handleDelete = (index) => {
    const updatedVoluntarios = [...voluntariosList];
    updatedVoluntarios.splice(index, 1);
    setVoluntariosList(updatedVoluntarios);
  };

  return (
    <AdminLayout>
       <div className='admin-container'>
          <div className='pantallas'>
            <Link to='/AdminVoluntarios' className='selected-pantalla'>
              Nuestros voluntarios
            </Link>
            <Link to='/AdminAñadirVoluntario'>Añadir voluntario</Link>
          </div>
          {voluntariosList.map((voluntario, index) => (
            <PersonCard key={index} person={voluntario} onDelete={() => handleDelete(index)} />
          ))}
        </div>
    </AdminLayout>
  );
}

export default AdminVoluntarios;