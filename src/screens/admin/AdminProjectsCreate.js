import React from 'react';
import '../../styles/styles.css';
import AdminLayout from '../../components/AdminLayout';

function AdminProjectsCreate() {
  return (
    <AdminLayout selected='Proyectos'> 
      <div className='admin-container'>
        <div className='pantallas'>
          <a href='/AdminProyectos'>Nuestros Proyectos</a>
          <a href='/AdminCrearProyecto' className='selected-pantalla'>Añadir Proyecto</a>
        </div>
      </div>
    </AdminLayout>
  );
}
export default AdminProjectsCreate;