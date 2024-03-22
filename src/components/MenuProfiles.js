import '../styles/styles.css';
import React from 'react';


const profileItems = {
    admin: ['Voluntarios', 'Educadores', 'Socios', 'Familias', 'Clases', 'Eventos', 'Proyectos'],
    educador: ['Niños','Evaluación diaria','Evaluación anual Niños', 'Actividades', 'Proyectos','Evaluación trimestral','Evaluación anual Proyectos'],
    voluntario: ['Agenda', 'Asistencia'],
    familia: ['Niños', 'Evaluación diaria','Evaluación anual','Observaciones','Autorizaciones','Calendario'],
    socios: ['Calendario', 'Membresía'],
  };
  
  const profileLinks = {
    admin: {
      'Voluntarios': '/admin/voluntarios',
      'Educadores': '/admin/educadores',
      'Socios': '/admin/socios',
      'Familias': '/admin/familias',
      'Clases': '/admin/clases',
      'Eventos': '/admin/eventos',
      'Proyectos': '/admin/proyectos',
    },
    educador: {
        'Niños': '/educador/niños/evaluacion/diaria',
        'Evaluación diaria': '/educador/niños/evaluacion/diaria',
        'Evaluación anual Niños': '/educador/niños/evaluacion/anual',
        'Actividades': '/educador/niños/actividades',
        'Proyectos': '/educador/proyectos/evaluacion/trimestral',
        'Evaluación trimestral': '/educador/proyectos/evaluacion/trimestral',
        'Evaluación anual Proyectos': '/educador/proyectos/evaluacion/anual',
    },
    voluntario: {
        'Agenda': '/voluntario/agenda',
        'Asistencia': '/voluntario/asistencia',
    },
    familia: {
        'Niños': '/familia/niños',
        'Evaluación diaria': '/familia/evaluacion/diaria',
        'Evaluación anual': '/familia/evaluacion/anual',
        'Observaciones': '/familia/observaciones',
        'Autorizaciones': '/familia/autorizaciones',
        'Calendario': '/familia/calendario',
    },
    socios: {
        'Asambleas': '/socios/asambleas',
        'Actividades': '/socios/actividades',
    },
    };


function MenuProfiles({ profile, selected }) {
    const items = profileItems[profile];
    const links = profileLinks[profile];
    
    return (
        <table className='menu-profiles' >
        <tbody>
            {items.map((item, index) => (
            <tr key={index}>
                <td 
                className={item === selected ? 'selected-menu-profiles' : ''}
                style={item === 'Familias' || (profile === 'educador' && item === 'Niños') || (profile === 'educador' && item === 'Proyectos')? { borderBottom: '2px solid #9ee5ff' } : {}}
                >                    
                <a href={links[item]}>{item}</a>
                </td>
            </tr>
            ))}

        </tbody>
        </table>
    );
}

export default MenuProfiles;