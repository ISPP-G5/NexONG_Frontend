// AdminFamilyRequests.js
import '../../styles/styles.css';
import React, { useState, useEffect } from 'react';
import ShowType from '../../components/ShowAdminProfiles';
import { useFetchFamilies, useFetchStudents } from '../../components/useFetchData';
import useToken from '../../components/useToken';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const pantallas = [
  {
    pantalla: 'Nuestras familias',
    link: '/admin/familias',
    selected: false,
  },
  {
    pantalla: 'Solicitudes',
    link: '/admin/familias/solicitudes',
    selected: true,
  }
];


function AdminFamilyRequests() {
  const [token, updateToken] = useToken();
  const families = useFetchFamilies(API_ENDPOINT, token);
  const kids = useFetchStudents(API_ENDPOINT, 'PENDIENTE', token);
  const [persons, setPersons] = useState([]);

  
  useEffect(() => {
    if (families.length > 0 && kids.length > 0) {
      const newPersons = kids.map(async (kid) => {
        const family = families.find(family => kid.family === family.id);
        return {
          id: kid.id,
          first_name: family.name,
          last_name: `${kid.name} ${kid.surname}`,
          avatar: kid.avatar,
          enrollment_document: kid.enrollment_document, 
          role: 'FAMILIA',
        };
      })
      Promise.all(newPersons)
      .then(result => {
        setPersons(result);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [families, kids]);


  return (
    <ShowType 
      data={persons}
      type = "Familias" 
      pantallas={pantallas} 
      request={true} 
      trash={false}
      message={'No hay solicitudes pendientes'}
    />
  );
}

export default AdminFamilyRequests;