// AdminView.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import HeaderAdmin from '../components/HeaderAdmin';
import MenuAdmin from '../components/MenuAdmin';
import PersonCard from '../components/PeopleCard';

const SociosData  = [
  {
    nombre: 'Nombre Voluntario 1',
    edad: 'Edad voluntario 1',
  },
  {
    nombre: 'Nombre Voluntario 2',
    edad: 'Edad voluntario 2',
  },
  {
    nombre: 'Nombre Voluntario 3',
    edad: 'Edad voluntario 3',
  },
];

const AdminSocios = () => {
  const [sociosList, setSociosList] = useState(SociosData);

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