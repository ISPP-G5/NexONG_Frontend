// ActivitiesStructure.js
import React from 'react';
import { Link } from 'react-router-dom';

const ActivitiesStructure = ({ info }) => {
    return (
        <div className='homepage-container'>
            {info && info.map((item, index) => (
                <div key={index} className='flex-container'>
                    <h1>{item.title}</h1>
                    <h3>{item.description}</h3>
                    <Link to={item.link} className='button'>Leer más</Link>
                </div>
            ))}
        </div>
    );
};

export default ActivitiesStructure;