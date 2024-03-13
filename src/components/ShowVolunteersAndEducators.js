import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import PersonCard from '../components/PeopleCard';
import AdminLayout from '../components/AdminLayout';
import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function ShowType({ type }) {
    //Type represents the type of the entity that is going to be received (educator,volunteer)
    const [typeList, setTypeList] = useState([]);

    useEffect(() => {
        axios.get(`${API_ENDPOINT}user/`)
            .then(response => {
                setTypeList(response.data.filter(u => u.role === type));
            })
            .catch(error => {
                console.error(error);
            });
    }, [type]);

    const handleDelete = (index) => {
        const updatedType = [...typeList];
        updatedType.splice(index, 1);
        setTypeList(updatedType);
    };

    return (
        <AdminLayout>
            <div className='admin-container'>
                <div className='pantallas'>
                    <Link to={`/Admin${type === "VOLUNTEER" ?"Voluntarios":"Educadores"}`} className='selected-pantalla'>
                        Nuestros {type === "VOLUNTEER" ?"Voluntarios":"Educadores"}
                    </Link>
                    <Link to={`/AdminAñadir${type === "VOLUNTEER" ?"Voluntario":"Educador"}`}>Añadir {type === "VOLUNTEER" ?"Voluntario":"Educador"}</Link>
                </div>
                {typeList.map((t, index) => (
                    <PersonCard key={index} person={t} onDelete={() => handleDelete(index)} />
                ))}
            </div>
        </AdminLayout>
    );
}

export default ShowType;