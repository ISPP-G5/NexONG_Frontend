import React from 'react';
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import Pantallas from '../../components/Pantallas';

const pantallas = [
  {
    pantalla: 'Nuestros proyectos',
    link: '/admin/proyectos',
    selected: false,
  },
  {
    pantalla: 'Añadir proyectos',
    link: '/admin/proyectos/crear',
    selected: true,
  }
];

function AdminProjectsCreate() {
  return (
    <LayoutProfiles profile={'admin'} selected={'Proyectos'}>
        <Pantallas pantallas={pantallas} />
    </LayoutProfiles>
  );
}
export default AdminProjectsCreate;