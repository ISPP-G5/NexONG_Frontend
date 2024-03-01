import { useState } from 'react';
import React from 'react';

const menuItemsAdmin = ['Voluntarios', 'Educadores', 'Socios', 'Familias', 'Colegios', 'Clases', 'Eventos', 'Proyectos'];
const menuItemsFamily = ['niños', 'evaluacion-diaria', 'evaluacion-anual', 'observaciones', 'autorizaciones', 'calendario'];
const menuItemsPartner = ['asambleas', 'actividades'];
const menuItemsEducator = ['niños', 'evaluacion-diaria', 'evaluacion-anual', 'actividades', 'proyectos', 'evaluacion-trimestral'];
const menuItemsVolunteer = ['agenda', 'asistencia'];



function SideBar({ selected }) {
    const [roles,SetRoles] = useState(["Admin"]);

    let adminLinks = <></>;
    let familyLink = <></>;
    let volunteerLink = <></>;
    let partnerLink = <></>;
    let educatorLink = <></>;

    roles.forEach((role) =>{
        if(role === "Admin"){
            adminLinks = (
                <div className='menu'>
            {menuItemsAdmin.map((item, index) => (
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
        if(role === "Family"){
            familyLink = (
                <div className='menu'>
            {menuItemsFamily.map((item, index) => (
                <React.Fragment key={index}>
                <a href={'/Family' + item} className={item === selected ? 'selected-menu' : ''}>
                    {item}
                </a>
                {item === 'observaciones' && <div className='horizontal-line'></div>}
                </React.Fragment>
            ))}
        </div>
            );
        }
        if(role === "Partner"){
            partnerLink = (
                <div className='menu'>
            {menuItemsPartner.map((item, index) => (
                <React.Fragment key={index}>
                <a href={'/Partner' + item} className={item === selected ? 'selected-menu' : ''}>
                    {item}
                </a>
                </React.Fragment>
            ))}
        </div>
            );
        }
        if(role === "Educator"){
            educatorLink = (
                <div className='menu'>
            {menuItemsEducator.map((item, index) => (
                <React.Fragment key={index}>
                <a href={'/Educator' + item} className={item === selected ? 'selected-menu' : ''}>
                    {item}
                </a>
                {item === 'actividades' && <div className='horizontal-line'></div>}
                </React.Fragment>
            ))}
        </div>
            );
        }
        if(role === "Volunteer"){
            volunteerLink = (
                <div className='menu'>
            {menuItemsVolunteer.map((item, index) => (
                <React.Fragment key={index}>
                <a href={'/Volunteer' + item} className={item === selected ? 'selected-menu' : ''}>
                    {item}
                </a>
                </React.Fragment>
            ))}
        </div>
            );
        }

        
    })
    return (
         roles.length === 0 ?<></>:
         <div className='admin-main' style={{marginTop:'100px'}}>
                {adminLinks}
                {familyLink}
                {volunteerLink}
                {partnerLink}
                {educatorLink}
            <div className='vertical-line' style={{marginLeft:'10%'}}></div>
        </div>

        
    
    );
    
}

export default SideBar;