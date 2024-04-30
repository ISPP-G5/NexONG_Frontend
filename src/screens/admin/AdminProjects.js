import React, { useState } from 'react';
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Pantallas from '../../components/Pantallas';


const pantallas = [
  {
    pantalla: 'Nuestros proyectos',
    link: '/admin/proyectos',
    selected: true,
  },
  {
    pantalla: 'Añadir proyectos',
    link: '/admin/proyectos/crear',
    selected: false,
  }
];

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

function AdminProjects() {
  const [proyectosList, setProyectosList] = useState(proyectos);

  const handleDelete = (index) => {
    const updatedProyectos = [...proyectosList];
    updatedProyectos.splice(index, 1);
    setProyectosList(updatedProyectos);
  };

  return (
    <LayoutProfiles profile={'admin'} selected={'Proyectos'}>

      <Pantallas pantallas={pantallas} />
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
    </LayoutProfiles>
  );
}

export default AdminProjects;