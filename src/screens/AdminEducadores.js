import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import PersonCard from '../components/PeopleCard';
import AdminLayout from '../components/AdminLayout'

const educadores = [
  {
    nombre: 'Nombre Educador 1',
    apellido: 'Apellido educador 1',
  },
  {
    nombre: 'Nombre Educador 2',
    apellido: 'Apellido educador 2',
  },
  {
    nombre: 'Nombre Educador 3',
    apellido: 'Apellido educador 3',
  },
];

function AdminEducadores() {
  const [educadoresList, setEducadoresList] = useState(educadores);

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