import React from 'react';
import '../styles/styles.css';

const Pantallas = ({ pantallas }) => {

    return (
        <div className='pantallas'>
            {pantallas.map((pantalla, index) => (
                <a key={index} href={pantalla.link} className={pantalla.selected ? 'selected-pantalla' : ''}>{pantalla.pantalla}</a>
            ))}
        </div>
    );
};

export default Pantallas;