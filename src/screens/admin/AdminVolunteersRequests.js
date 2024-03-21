import React from 'react';
import '../../styles/styles.css';
import ShowType from '../../components/ShowVolunteersAndEducators';
import useFetchData from '../../components/useFetchData';
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
  const volunteers = useFetchData(`${API_ENDPOINT}volunteer/`, "PENDIENTE");
    
  return (
    <ShowType type = "VOLUNTARIO" pantallas={pantallas} añadir={true} voluntariosData={volunteers}></ShowType>
    
  );
}

export default AdminVolunteersRequests;