import '../styles/styles.css';
import React from 'react';

const adminItems = ['Voluntarios', 'Educadores', 'Socios', 'Familias', 'Clases', 'Eventos', 'Proyectos'];
const educatorItems = ['Niños','Evaluación diaria','Evaluación anual Niños', 'Actividades', 'Proyectos','Evaluación trimestral','Evaluación anual Proyectos'];
const volunteerItems = ['Agenda', 'Asistencia'];
const familyItems = ['Niños', 'Evaluación diaria','Evaluación anual','Observaciones','Autorizaciones','Calendario'];
const partnersItems = ['Asambleas', 'Actividades'];


function MenuProfiles({ profile, selected }) {
    
    return (

        <table className='menu-profiles' >
            <tbody>
            {profile==='admin' && adminItems.map((item, index) => (
                <tr key={index}>
                    <td 
                        className={item === selected ? 'selected-menu-profiles' : ''}
                        style={item === 'Familias' ? { borderBottom: '2px solid #9ee5ff' } : {}}
                    >                    
                    <a 
                        href={
                            item === 'Voluntarios' ? '/admin/voluntarios' : 
                            item === 'Educadores' ? '/admin/educadores' : 
                            item === 'Socios' ? '/admin/socios' : 
                            item === 'Familias' ? '/admin/familias' : 
                            item === 'Clases' ? '/admin/clases' : 
                            item === 'Eventos' ? '/admin/eventos' : 
                            item === 'Proyectos' ?'/admin/proyectos':
                            '/admin/voluntarios'
                        } 
                    >{item}</a>
                </td>
                </tr>
            ))}
            {profile==='educador' && educatorItems.map((item, index) => (
                <tr key={index}>
                    <td 
                        className={item === selected ? 'selected-menu-profiles' : ''}
                        style={
                            item === 'Proyectos' 
                              ? { borderBottom: '2px solid #9ee5ff', marginTop: '20px' } 
                              : item === 'Niños' 
                              ? { borderBottom: '2px solid #9ee5ff' } 
                              : {}
                        }                    
                    > 
                    <a 
                        href={
                            item === 'Niños' ? '/educador/niños/evaluacion/diaria' : 
                            item === 'Evaluación diaria' ? '/educador/niños/evaluacion/diaria' : 
                            item === 'Evaluación anual Niños' ? '/educador/niños/evaluacion/anual' : 
                            item === 'Actividades' ? '/educador/niños/actividades' : 
                            item === 'Proyectos' ? '/educador/proyectos/evaluacion/trimestral' : 
                            item === 'Evaluación trimestral' ? '/educador/proyectos/evaluacion/trimestral' : 
                            item === 'Evaluación anual Proyectos' ? '/educador/proyectos/evaluacion/anual' : 
                            '/educador/niños/evaluacion/diaria'
                        } 
                    >{item}</a>
                </td>
                </tr>
            ))}
            {profile==='voluntario' && volunteerItems.map((item, index) => (
                <tr key={index}>
                    <td className={item === selected ? 'selected-menu-profiles' : ''} >                    
                    <a 
                        href={
                            item === 'Agenda' ? '/voluntario/agenda' : 
                            item === 'Asistencia' ? '/voluntario/asistencia' : 
                            '/voluntario/agenda'
                        } 
                    >{item}</a>
                </td>
                </tr>
            ))}
            {profile==='familia' && familyItems.map((item, index) => (
                <tr key={index}>
                    <td className={item === selected ? 'selected-menu-profiles' : ''} >                    
                    <a 
                        href={
                            item === 'Niños' ? '/familia/niños' : 
                            item === 'Evaluación diaria' ? '/familia/evaluacion/diaria' : 
                            item === 'Evaluación anual' ? '/familia/evaluacion/anual' : 
                            item === 'Observaciones' ? '/familia/observaciones' : 
                            item === 'Autorizaciones' ? '/familia/autorizaciones' : 
                            item === 'Calendario' ? '/familia/calendario' : 
                            '/familia/niños'
                        } 
                    >{item}</a>
                </td>
                </tr>
            ))}
            {profile==='socios' && partnersItems.map((item, index) => (
                <tr key={index}>
                    <td className={item === selected ? 'selected-menu-profiles' : ''} >                    
                    <a 
                        href={
                            item === 'Asambleas' ? '/socios/asambleas' : 
                            item === 'Actividades' ? '/socios/actividades' : 
                            '/socios/asambleas'
                        } 
                    >{item}</a>
                </td>
                </tr>
            ))}
        </tbody>
        </table>
    );
}

/*
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
*/
export default MenuProfiles;