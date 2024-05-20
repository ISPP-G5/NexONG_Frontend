import React, { useState, useEffect } from 'react';
import '../../styles/styles.css';
import ShowType from '../../components/ShowAdminProfiles';
import useFetchData, { useFetchUsersByRole } from '../../components/useFetchData'; 
import useToken from '../../components/useToken';

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
  const [token, updateToken] = useToken();
  const userVolunteers = useFetchUsersByRole(API_ENDPOINT, "VOLUNTARIO", token);
  const volunteers = useFetchData(`${API_ENDPOINT}volunteer/`, "PENDIENTE", token);
  const [volunteersData, setVolunteersData] = useState([]);

  useEffect(() => {
    if (userVolunteers.length > 0 && volunteers.length > 0) {
      const pendingVolunteers = userVolunteers.map(userVolunteer => {
        const volunteerData = volunteers.find(volunteer => volunteer.id === userVolunteer.volunteer);
        return volunteerData ? { ...userVolunteer, ...volunteerData } : null;
      }).filter(volunteer => volunteer !== null);
  
      setVolunteersData(pendingVolunteers);
    }
  }, [userVolunteers, volunteers]);

  return (
    <ShowType 
      data={volunteersData}
      type = "Voluntarios" 
      pantallas={pantallas} 
      request={true} 
      trash={false}
      message="No hay solicitudes pendientes."
    />
  );
}
export default AdminVolunteersRequests;