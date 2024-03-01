import { useState } from 'react';
import {Link} from 'react-router-dom'



function SideBar() {
    const [roles,SetRoles] = useState(["Admin"]);

    let adminLinks = <></>;
    let familyLink = <></>;
    let volunteerLink = <></>;
    let partnerLink = <></>;
    let educatorLink = <></>;

    roles.forEach((role) =>{
        if(role === "Admin"){
            adminLinks = (
                <ul>
                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li><Link to={'/voluntarios'}>Voluntarios</Link></li>
                    <li><Link to={'/educadores'}>Educadores</Link></li>
                    <li><Link to={'/socios'}>Socios</Link></li>
                    <li><Link to={'/familias'}>Familias</Link></li>
                    <li><Link to={'/clases'}>Clases</Link></li>
                    <li><Link to={'/eventos'}>Eventos</Link></li>
                    <li><Link to={'/proyectos'}>Proyectos</Link></li>


                </ul>
            );
        }
        if(role === "Family"){
            familyLink = (
                <ul>
                    <li><Link to={'/niños'}>Niños</Link></li>
                    <li><Link to={'/evaluacion-diaria'}>Evaluación diaria</Link></li>
                    <li><Link to={'/evaluacion-anual'}>Evaluación anual</Link></li>
                    <li><Link to={'/observaciones'}>Observaciones</Link></li>
                    <li><Link to={'/autorizaciones'}>Autorizaciones</Link></li>
                    <li><Link to={'/calendario'}>Calendario</Link></li>    
                </ul>
            );
        }
        if(role === "Partner"){
            partnerLink = (
                <ul>
                    <li><Link to={'/asambleas'}>Asambleas</Link></li>
                    <li><Link to={'/actividades'}>Actividades</Link></li>
                </ul>
            );
        }
        if(role === "Educator"){
            educatorLink = (
                <ul>
                    <li><Link to={'/niños'}>Niños</Link></li>
                    <li><Link to={'/evaluacion-diaria'}>Evaluación diaria</Link></li>
                    <li><Link to={'/evaluacion-anual'}>Evaluación anual</Link></li>
                    <li><Link to={'/actividades'}>Actividades</Link></li>
                    <li><Link to={'/proyectos'}>Proyectos</Link></li>
                    <li><Link to={'/evaluacion-trimestral'}>Evaluación trimestral</Link></li>  
                    <li><Link to={'/evaluacion-anual'}>Evaluación anual</Link></li>    
  
                </ul>
            );
        }
        if(role === "Volunteer"){
            volunteerLink = (
                <ul>
                    <li><Link to={'/agenda'}>Agenda</Link></li>
                    <li><Link to={'/asistencia'}>Asistencia</Link></li>
                </ul>
            );
        }

        
    })
    return (
        <div>
            <div className='custom-checkbox' style={{marginTop:'5%'}}>
                {adminLinks}
                {familyLink}
                {volunteerLink}
                {partnerLink}
                {educatorLink}

            </div>
        </div>
    );
    
}

export default SideBar;