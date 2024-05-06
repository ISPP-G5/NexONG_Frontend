import React from 'react';
import { Link } from 'react-router-dom';

const HomepageContainer = ({ info, columnwidth }) => (
    <div className='homepage-container'>
        {info.map((item, index) => (
            <div key={index} className='flex-container' style={{'--columnwidth': `${columnwidth}px`, display: 'flex', flexDirection: 'column', position: 'relative'}}>
                {item.title && <h2>{item.title}</h2>}
                {item.description && <p>{item.description}</p>}
                {item.list && <ul>{item.list.map((item, index) => <li key={index}>{item}</li>)}</ul>}
                {item.button && <Link to={item.link} className='button' style={{ marginTop: 'auto', marginRight: 'auto' }}>{item.button}</Link>}
                {item.img && <img className="colab-image" src={item.img} alt={"imagen de" + item.name } />}
                {item.name && <Link to={item.link} style={{ justifyContent: 'center' }}>{item.name}</Link>}
            </div>
        ))}
    </div>
);

export default HomepageContainer;
