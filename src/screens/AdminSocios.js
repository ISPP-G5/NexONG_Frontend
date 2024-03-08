import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import HeaderAdmin from '../components/HeaderAdmin';
import MenuAdmin from '../components/MenuAdmin';
import PersonCard from '../components/PeopleCard';
import axios from 'axios';

const AdminSocios = () => {
  const [sociosList, setSociosList] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/user/")
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
    <div className='App'>
      <HeaderAdmin />
      <div className='admin-main'>
        <MenuAdmin selected='Socios' />
        <div className='vertical-line'></div>

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
      </div>
    </div>
  );
}

export default AdminSocios;