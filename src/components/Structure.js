import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Structure = ({ info, title, description, image, additionalImage }) => {
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
            {info && (
                <div className='homepage-container'>
                    {info.map((item, index) => (
                        <div key={index} className='flex-container'>
                            <h1>{item.title}</h1>
                            <h3>{item.description}</h3>
                            <Link to={item.link} className='button'>Leer más</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Structure;