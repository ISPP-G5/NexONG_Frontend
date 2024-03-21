import '../../styles/styles.css';
import React from 'react';
import LayoutProfiles from '../../components/LayoutProfiles';
import Pantallas from '../../components/Pantallas';
import PersonCard from '../../components/PersonCard';
import { useFetchFamilies, useFetchLessons, useFetchStudentEvaluation, useFetchStudents } from '../../components/useFetchData';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

const pantallas = [
  {
    pantalla: 'Nuestras familias',
    link: '/admin/familias',
    selected: true,
  },
  {
    pantalla: 'Solicitudes',
    link: '/admin/familias/solicitudes',
    selected: false,
  }
];

function AdminFamily() {

  const families = useFetchFamilies(API_ENDPOINT);
  const kids = useFetchStudents(API_ENDPOINT, 'ACEPTADO');
  const lessons = useFetchLessons(API_ENDPOINT);
  const evaluations = useFetchStudentEvaluation(API_ENDPOINT);

  
  return (
    <LayoutProfiles profile={'admin'} selected={'Familias'}>

      <Pantallas pantallas={pantallas}/>
      {families.map((f, index) => (
          <PersonCard 
            key={index} 
            person={f} 
            personType='family'
            kids={kids}
            lessons={lessons}
            evaluations={evaluations}
            trash={false}
          />
      ))}

    </LayoutProfiles>
  );
}

export default AdminFamily;