import '../../styles/styles.css';
import React, { useState, useEffect } from 'react';

import ShowType from '../../components/ShowVolunteersAndEducators';
import useFetchData from '../../components/useFetchData';
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
  const volunteers = useFetchData(`${API_ENDPOINT}volunteer/`, "ACCEPTED");
   

  return (
    <ShowType type = "VOLUNTARIO" pantallas={pantallas} voluntariosData={volunteers} ></ShowType>
    
  );
}

export default AdminVolunteers;