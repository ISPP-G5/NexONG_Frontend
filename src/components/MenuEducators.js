import '../styles/styles.css';
import React from 'react';

const menuItems = ['Niño','Evaluación diaria','Evaluación anual Niños', 'Proyecto','Evaluación trimestral','Evaluación anual Proyectos','Actividades'];

function MenuEducator({ selected }) {
    
    return (
        <div className='menu'>
            {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                <a 
 href={
                        item === 'Niño' ? '/niños' : 
                        item === 'Proyecto' ? '/proyectos' : 
                        item === 'Evaluación diaria' ? '/niños/evaluaciónDiaria' : 
                        item === 'Evaluación anual Niños' ? '/niños/evaluaciónAnual' : 
                        item === 'Evaluación trimestral' ? '/proyectos/evaluaciónTrimestral' : 
                        item === 'Evvaluación anual Proyectos' ? '/proyectos/evaluaciónAnual' : 
                        '/niños/actividades'
                    } 
                    className={`${item === selected ? 'selected-menu' : ''} ${item === 'Niño' || item === 'Proyecto' ? 'left-shift' : 'right-shift'}`}
                >
                    {item}
                </a>
                {item === 'Evaluación anual Niños' && <div className='horizontal-line'></div>}
                </React.Fragment>
            ))}
        </div>
    );
}

export default MenuEducator;