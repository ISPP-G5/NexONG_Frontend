import '../styles/styles.css';
import React from 'react';

const menuItems = ['Niños','Evaluación diaria','Evaluación anual Niños', 'Actividades', 'Proyectos','Evaluación trimestral','Evaluación anual Proyectos'];

function MenuEducator({ selected }) {
    
    return (
        <div className='menu'>
            {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                    <a 
                        href={
                            item === 'Evaluación diaria' ? '/Educadores/niños/evaluacionDiaria' : 
                            item === 'Evaluación anual Niños' ? '/Educadores/niños/evaluacionAnual' : 
                            item === 'Evaluación trimestral' ? '/Educadores/proyectos/evaluacionTrimestral' : 
                            item === 'Proyectos' ? '/Educadores/proyectos/evaluacionTrimestral' : 
                            item === 'Evaluación anual Proyectos' ? '/Educadores/proyectos/evaluacionAnual' : 
                            '/niños/actividades'
                        } 
                        className={`${item === selected ? 'selected-menu' : ''} ${item === 'Niño' || item === 'Proyecto' ? 'left-shift' : 'right-shift'}`}
                    >{item}</a>
                {item === 'Niños' && <div className='horizontal-line'></div>}
                {item === 'Proyectos' && <div className='horizontal-line'></div>}
                </React.Fragment>
            ))}
        </div>
    );
}

export default MenuEducator;