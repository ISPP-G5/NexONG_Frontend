import '../styles/styles.css';
import React from 'react';


const profileItems = {
    admin: ['Voluntarios', 'Educadores', 'Socios', 'Familias', 'Clases', 'Eventos', 'Sugerencias', 'Documentos'],
    educador: ['Evaluación diaria','Evaluación Anual', 'Actividades'],
    voluntario: ['Agenda', 'Asistencia'],
    familia: ['Niños', 'Evaluación diaria','Evaluación anual','Autorizaciones','Calendario'],
    socio: ['Calendario'],
  };
  
const profileLinks = {
    admin: {
      'Voluntarios': '/admin/voluntarios',
      'Educadores': '/admin/educadores',
      'Socios': '/admin/socios',
      'Familias': '/admin/familias',
      'Clases': '/admin/clases',
      'Eventos': '/admin/eventos',
      'Sugerencias': '/admin/sugerencias',
      'Documentos': '/admin/documentos',
    },
    educador: {
        'Niños': '/educador/niños/evaluacion/diaria',
        'Evaluación diaria': '/educador/niños/evaluacion/diaria',
        'Evaluación anual Niños': '/educador/niños/evaluacion/anual',
        'Actividades': '/educador/niños/actividades',
    },
    voluntario: {
        'Agenda': '/voluntario/agenda',
        'Asistencia': '/voluntario/asistencia',
    },
    familia: {
        'Niños': '/familia/niños',
        'Evaluación diaria': '/familia/evaluacion/diaria/0',
        'Evaluación anual': '/familia/evaluacion/anual/0',
        'Autorizaciones': '/familia/autorizaciones',
        'Calendario': '/familia/calendario',
    },
    socio: {
        'Calendario': '/socio/calendario',
        'Membresía': '/socio/membresia',
    },
    };


function MenuProfiles({ profile, selected }) {
    const items = profileItems[profile];
    const links = profileLinks[profile];
    const emptyRows = 8 - items.length;

    
    return (
        <table className='menu-profiles' >
        <tbody>
            {items.map((item, index) => (
            <tr key={index}>
                <td 
                className={item === selected ? 'selected-menu-profiles' : ''}
                style={item === 'Familias' || (profile === 'educador' && item === 'Niños') ? { borderBottom: '2px solid #9ee5ff' } : profile === 'voluntario' || profile === 'socio' ? { height: '5vh'} : {}}                >                    
                <a href={links[item]}>{item}</a>
                </td>
            </tr>
            ))}
            {Array(emptyRows).fill().map((_, index) => (
            <tr key={index + items.length}>
                <td className='empty'></td>
            </tr>
            ))}
        </tbody>
        </table>
    );
}

export default MenuProfiles;