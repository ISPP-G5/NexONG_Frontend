import React, { useState } from 'react';
import '../styles/styles.css';
import HeaderAdmin from '../components/HeaderAdmin';
import MenuAdmin from '../components/MenuAdmin';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const proyectos = [
  {
    nombre: 'Proyecto 1',
    descripcion: 'Some information about Project 1',
  },
  {
    nombre: 'Proyecto 2',
    descripcion: 'Some information about Project 2',
  },
  {
    nombre: 'Proyecto 3',
    descripcion: 'Some information about Project 3',
  },
];

function AdminProyectos() {
  const [proyectosList, setProyectosList] = useState(proyectos);

  const handleDelete = (index) => {
    const updatedProyectos = [...proyectosList];
    updatedProyectos.splice(index, 1);
    setProyectosList(updatedProyectos);
  };

  return (
    <div className='App'>
      <HeaderAdmin />
      <div className='admin-main'>
        <MenuAdmin selected='Proyectos' />
        <div className='vertical-line'></div>

        <div className='admin-container'>
          <div className='pantallas'>
            <a href='/AdminProyectos' className='selected-pantalla'>
              Nuestros proyectos
            </a>
            <a href='/AdminCrearProyecto'>Añadir Proyecto</a>
          </div>
          {proyectosList.map((proyecto, index) => (
            <div className='card-info' key={index}>
              <div className='proyecto-info'>
                <p>{proyecto.nombre}</p>
                <p>{proyecto.descripcion}</p>
              </div>
              <div className='vertical-line'></div>
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

export default AdminProyectos;
