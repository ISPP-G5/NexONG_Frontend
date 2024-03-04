// Structure.js
import React from 'react';
import Header from '../components/Header';

const Structure = ({ title, description, image, additionalImage }) => {
    return (
        <div className="App">
            <Header/>
            <div className='main'>
                <img src={image} alt="Activities" className='background-pic'/> 
                <div className='bg-text'>
                    <h1>{title}</h1>
                    <h3>{description}</h3>
                </div>
                {additionalImage && <img src={additionalImage} alt="Additional"/>}
            </div>
          
        </div>
    );
};

export default Structure;