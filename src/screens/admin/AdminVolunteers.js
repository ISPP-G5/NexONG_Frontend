import '../../styles/styles.css';
import React, { useState, useEffect } from 'react';

import ShowType from '../../components/ShowAdminProfiles';
import useFetchData, { useFetchUsersByRole } from '../../components/useFetchData'; 
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  
const pantallas = [
  {
    pantalla: 'Nuestros voluntarios',
    link: '/admin/voluntarios',
    selected: true,
  },
  {
    pantalla: 'Solicitudes',
    link: '/admin/voluntarios/solicitudes',
    selected: false,
  }
];

function AdminVolunteers() {

  const userVolunteers = useFetchUsersByRole(API_ENDPOINT, "VOLUNTARIO");
  const volunteers = useFetchData(`${API_ENDPOINT}volunteer/`, "ACEPTADO");
  const [volunteersData, setVolunteersData] = useState([]);
console.log(userVolunteers,'userVolunteer')
  useEffect(() => {
    if (userVolunteers.length > 0 && volunteers.length > 0) {
      const acceptedVolunteers = userVolunteers.filter(userVolunteer => {
        const volunteerData = volunteers.find(volunteer => volunteer.id === userVolunteer.volunteer);
        return volunteerData;
      });
  
      setVolunteersData(acceptedVolunteers);
    }
  }, [userVolunteers, volunteers]);
   
  return (
    <ShowType 
      data={volunteersData}
      type="Voluntarios" 
      pantallas={pantallas} 
      request={false}
    />
    
  );
}

export default AdminVolunteers;