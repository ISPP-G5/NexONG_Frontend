import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import PersonCard from '../components/PeopleCard';
import AdminLayout from '../components/AdminLayout'
import axios from 'axios';


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT


function AdminEducadores() {
  const [educadoresList, setEducadoresList] = useState([]);
  useEffect(() => {
    axios.get(`${API_ENDPOINT}user/`)
      .then(response => {
        console.log(response.data);
        setEducadoresList(response.data.filter(u => u.role === "EDUCATOR"))
      })
      .catch(error => {
        console.error(error);
      });
  }, []);  


  const handleDelete = (index) => {
    const updatedEducadores = [...educadoresList];
    updatedEducadores.splice(index, 1);
    setEducadoresList(updatedEducadores);
  };

  return (


    <AdminLayout>
      <div className='admin-container'>
        <div className='pantallas'>
          <Link to='/AdminEducadores' className='selected-pantalla'>
            Nuestros educadores
          </Link>
          <Link to='/AdminAñadirEducador'>Añadir Educador</Link>
        </div>

        {educadoresList.map((educador, index) => (
          <PersonCard
            key={index}
            person={educador}
            onDelete={() => handleDelete(index)}
          />
        ))}

      </div>
    </AdminLayout>
  );
}

export default AdminEducadores;