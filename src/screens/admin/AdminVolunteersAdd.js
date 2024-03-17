import React, { useState, useEffect } from 'react';
import '../styles/styles.css';
import ShowType from '../../components/ShowVolunteersAndEducators';
import axios from 'axios';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


function AdminVolunteersAdd() {
  const [VoluntariosPendientes, setVoluntariosPendientes] = useState([]);

    useEffect(() => {
        axios.get(`${API_ENDPOINT}volunteer/`)
            .then(response => {
              console.log(response.data.filter(u => u.status === "PENDING"));
              setVoluntariosPendientes(response.data.filter(u => u.status === "PENDING"));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    
  return (
    <ShowType type = "VOLUNTEER" añadir={true} voluntariosData={VoluntariosPendientes}></ShowType>
    
  );
}

export default AdminVolunteersAdd;