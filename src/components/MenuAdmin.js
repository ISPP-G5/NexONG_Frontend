import '../styles/styles.css';
import React from 'react';

const menuItems = ['Voluntarios', 'Educadores', 'Socios', 'Familias', 'Colegios', 'Clases', 'Eventos', 'Proyectos'];

function MenuAdmin({ selected }) {
    
    return (
        <div className='menu'>
            {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                <a href={'/Admin' + item} className={item === selected ? 'selected-menu' : ''}>
                    {item}
                </a>
                {item === 'Colegios' && <div className='horizontal-line'></div>}
                </React.Fragment>
            ))}
        </div>
    );
}

export default MenuAdmin;