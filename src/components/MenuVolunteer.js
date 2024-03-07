import '../styles/styles.css';
import React from 'react';

const menuItems = ['Agenda', 'Asistencia'];

function MenuVolunteer({ selected }) {
    
    return (
        <div className='menu'>
            {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                <a href={'/voluntario' + item} className={item === selected ? 'selected-menu' : ''}>
                    {item}
                </a>
                </React.Fragment>
            ))}
        </div>
    );
}

export default MenuVolunteer;