import '../../styles/styles.css';
import React, { useState, useEffect } from 'react';
import ShowType from '../../components/ShowAdminProfiles';
import { useFetchUsersByRole, useFetchEducators, useFetchLessons } from '../../components/useFetchData';
import axios from 'axios';
import useToken from '../../components/useToken';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


const pantallas = [
  {
    pantalla: 'Nuestros educadores',
    link: '/admin/educadores',
    selected: true,
  },
  {
    pantalla: 'Añadir educador',
    link: '/admin/educadores/agregar',
    selected: false,
  }
];

function AdminEducators() {
  const [token, updateToken] = useToken();
  const [educatorsData, setEducatorsData] = useState([]);
  const userEducators = useFetchUsersByRole(API_ENDPOINT, "EDUCADOR", token);
  const educators = useFetchEducators(API_ENDPOINT, token);
  const lessons = useFetchLessons(API_ENDPOINT, token);

  useEffect(() => {
    if (userEducators.length > 0 && educators.length > 0) {
      const fetchAllData = async () => {
        const combinedData = await Promise.all(educators.map(async (educator) => {
          const userData = userEducators.find(user => user.educator === educator.id);
          const lessonNames = lessons.filter(lesson => lesson.educator === educator.id).map(lesson => lesson.name);      
          return userData ? { ...userData, ...educator, lessonNames } : null;
        }));
  
        setEducatorsData(combinedData.filter(educator => educator !== null));
      };
  
      fetchAllData();
    }
  }, [userEducators, educators, token]);

  return (

    <ShowType 
      data={educatorsData}
      type="Educadores" 
      pantallas={pantallas} 
    />
    
  );
}

export default AdminEducators;