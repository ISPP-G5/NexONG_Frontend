import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import HeaderAdmin from '../components/HeaderAdmin';
import MenuAdmin from '../components/MenuAdmin';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
            <div className='card-info' key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className='family-request'>
                <img src='https://via.placeholder.com/150' alt='placeholder' />
                <div className='family-info'>
                  <p>{voluntario.nombre}</p>
                  <p>{voluntario.edad}</p>
                </div>
              </div>
              <div className='edit-delete-icons'>
                <EditIcon className='edit-fill' style={{ marginRight: '1rem' }} />
                <DeleteIcon className='trash' onClick={() => handleDelete(index)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminVoluntarios;