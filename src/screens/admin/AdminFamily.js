import '../../styles/styles.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LayoutProfiles from '../../components/LayoutProfiles';
import Pantallas from '../../components/Pantallas';
import PersonCard from '../../components/PersonCard';

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

  const [families, setFamilies] = useState([]);
  const [kids, setKids] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}family/`)
      .then((response) => {
        console.log('families:', response.data);
        setFamilies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching families:', error);
      });
    axios
      .get(`${API_ENDPOINT}student/`)
      .then((response) => {
        console.log('students:', response.data);
        const acceptedStudents = response.data.filter(student => student.status === "ACEPTADO");
        setKids(acceptedStudents);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
    axios
      .get(`${API_ENDPOINT}lesson/`)
      .then((response) => {
        console.log('lessons:', response.data);
        setLessons(response.data);
      })
      .catch((error) => {
        console.error('Error fetching lessons:', error);
      });
    axios
      .get(`${API_ENDPOINT}student-evaluation/`)
      .then((response) => {
        console.log('evaluations:', response.data);
        setEvaluations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching evaluations:', error);
      });
  }, []);
  
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