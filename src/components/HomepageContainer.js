import React from 'react';
import { Link } from 'react-router-dom';

const HomepageContainer = ({ info, columnwidth }) => (
    <div className='homepage-container'>
        {info.map((item, index) => (
            <div key={index} className='flex-container' style={{'--columnwidth': `${columnwidth}px`}}>
                <h2>{item.title}</h2>
                {item.description && <p>{item.description}</p>}
                {item.list && <ul>{item.list.map((item, index) => <li key={index}>{item}</li>)}</ul>}
                {item.button && <Link to={item.link} className='button'>{item.button}</Link>}
            </div>
        ))}
    </div>
);

export default HomepageContainer;