import '../../styles/styles.css';
import React, { useState, useEffect } from 'react';

import ShowType from '../../components/ShowVolunteersAndEducators';
import axios from 'axios';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  

function AdminVolunteers() {
  const [voluntariosAceptados, setVoluntariosAceptado] = useState([]);

    useEffect(() => {
        axios.get(`${API_ENDPOINT}volunteer/`)
            .then(response => {
              setVoluntariosAceptado(response.data.filter(u => u.status === "ACCEPTED"));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    

  return (
    <ShowType type = "VOLUNTEER" voluntariosData={voluntariosAceptados} voluntariosAceptados={true}></ShowType>
    
  );
}

export default AdminVolunteers;