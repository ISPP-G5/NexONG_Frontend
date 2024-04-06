import React, { useState, useEffect } from 'react';
import '../../styles/styles.css';
import ShowType from '../../components/ShowAdminProfiles';
import useFetchData, { useFetchUsersByRole } from '../../components/useFetchData'; 


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const pantallas = [
  {
    pantalla: 'Nuestros voluntarios',
    link: '/admin/voluntarios',
    selected: false,
  },
  {
    pantalla: 'Solicitudes',
    link: '/admin/voluntarios/solicitudes',
    selected: true,
  }
];

function AdminVolunteersRequests() {

  const userVolunteers = useFetchUsersByRole(API_ENDPOINT, "VOLUNTARIO");
  const volunteers = useFetchData(`${API_ENDPOINT}volunteer/`, "PENDIENTE");
  const [volunteersData, setVolunteersData] = useState([]);
  console.log('userVolunteers',userVolunteers);
  console.log('volunteersData',volunteersData);

  useEffect(() => {
    if (userVolunteers.length > 0 && volunteers.length > 0) {
      const acceptedVolunteers = userVolunteers.filter(userVolunteer => {
        const volunteerData = volunteers.find(volunteer => volunteer.id === userVolunteer.volunteer);
        if (volunteerData) {
          console.log(volunteerData.id);
          return {
            id: volunteerData.id,
            enrollment_document: volunteerData.enrollment_document,
            first_name: userVolunteer.first_name,
            last_name: userVolunteer.last_name
          };
        }
        return null;
      }).filter(item => item !== null);
  
      setVolunteersData(acceptedVolunteers);
    }
  }, [userVolunteers, volunteers]);


  return (
    <ShowType 
      data={volunteersData}
      type = "Voluntarios" 
      pantallas={pantallas} 
      request={true} 
      trash={false}
    />
    
  );
}

export default AdminVolunteersRequests;