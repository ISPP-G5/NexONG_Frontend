import React from 'react';
import { Link } from 'react-router-dom';

const HomepageContainer = ({ info }) => (
    <div className='homepage-container'>
        {info.map((item, index) => (
            <div key={index} className='flex-container'>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                {item.button && <Link to={item.link} className='button'>{item.button}</Link>}
            </div>
        ))}
    </div>
);

export default HomepageContainer;