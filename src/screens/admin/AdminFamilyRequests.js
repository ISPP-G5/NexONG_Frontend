// AdminFamilyRequests.js
import '../../styles/styles.css';
import React, { useState, useEffect } from 'react';
import ShowType from '../../components/ShowAdminProfiles';
import { useFetchFamilies, useFetchStudents } from '../../components/useFetchData';

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
  
  const families = useFetchFamilies(API_ENDPOINT);
  const kids = useFetchStudents(API_ENDPOINT, 'PENDIENTE');
  const [persons, setPersons] = useState([]);

  
  useEffect(() => {
    if (families.length > 0 && kids.length > 0) {
      const newPersons = families.map(family => {
        const kid = kids.find(kid => kid.family === family.id);
        if (kid) {
          return {
            id: kid.id,
            first_name: family.name,
            last_name: `${kid.name} ${kid.surname}`,
            avatar: kid.avatar,
            enrollment_document: kid.enrollment_document
          };
        }
        return null;
      }).filter(person => person !== null);
      setPersons(newPersons);
    }
  }, [families, kids]);


  return (
    <ShowType 
      data={persons}
      type = "Familias-solicitudes" 
      pantallas={pantallas} 
      request={true} 
      trash={false}
    />
  );
}

export default AdminFamilyRequests;