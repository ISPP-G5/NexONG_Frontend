import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import HeaderAdmin from '../components/HeaderAdmin';
import MenuAdmin from '../components/MenuAdmin';
import PersonCard from '../components/PeopleCard';
const voluntario = [
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

function AdminVoluntarios() {
  const [voluntariosList, setVoluntariosList] = useState(voluntario);

  const handleDelete = (index) => {
    const updatedVoluntarios = [...voluntariosList];
    updatedVoluntarios.splice(index, 1);
    setVoluntariosList(updatedVoluntarios);
  };

  return (
    <div className='App'>
      <HeaderAdmin />
      <div className='admin-main'>
        <MenuAdmin selected='Voluntarios' />
        <div className='vertical-line'></div>

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
      </div>
    </div>
  );
}

export default AdminVoluntarios;