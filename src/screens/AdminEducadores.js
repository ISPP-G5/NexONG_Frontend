import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import HeaderAdmin from '../components/HeaderAdmin';
import MenuAdmin from '../components/MenuAdmin';
import PersonCard from '../components/PeopleCard';

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
    <div className='App'>
      <HeaderAdmin />
      <div className='admin-main'>
        <MenuAdmin selected='Educadores' />
        <div className='vertical-line'></div>

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
      </div>
    </div>
  );
}

export default AdminEducadores;