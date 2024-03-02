import React from 'react';
import '../styles/styles.css';
import logo from './HTML/sinfondo-nexong.png';
import { Link } from "react-router-dom";





function LandingPage() {
    return (
    <div className='lp-bg'>
        <div className='team-container'>
            <Link to='/equipo'> 
            <img src={logo} style={{ marginLeft:'30%', width:'40%', borderRadius:'5%'}}/>
            </Link> 

            <h1 style={{textAlign:'center', margin:'3%'}}>Hitos</h1>

            <div className='lp-text-external'>
                    <h2 className='mp-text'>Fecha: 08/02/2024</h2>
                    <p className='mp-text'>Ahora trabajamos con la organización Manos Abiertas Con Norte, ¡Bienvenidos al equipo!</p>
            </div>

            <div className='lp-text-external'>
                    <h2 className='mp-text'>Fecha: 18/02/2024</h2>
                    <p className='mp-text'>Se inaugura la Landing Page de NexOng, donde podrás seguir el desarollo del proyecto.</p>
            </div>

            <div className='lp-text-external'>
                    <h2 className='mp-text'>Fecha: 25/02/2024</h2>
                    <p className='mp-text'>Se abren los formularios de feedback para los usuarios pilotos de nuestra aplicación:</p>
                    <p className='mp-text'><a href="https://forms.office.com/Pages/ResponsePage.aspx?id=TmhK77WBHEmpjsezG-bEacwKxzI2aWxGu99SL9G937VUQ1lPUkZTMzUzVU9FWUdNWjlIWFhGNkNCTC4u">
					Accede aquí si perteneces a Manos Abiertas con Norte.</a></p>
				    <p className='mp-text'><a href="https://forms.office.com/Pages/ResponsePage.aspx?id=TmhK77WBHEmpjsezG-bEacwKxzI2aWxGu99SL9G937VUQkJOSUg2R1JDWUVMR0FMSDBJQzUyQllZVy4u">
					Accede aquí si perteneces al grupo de usuarios piloto de la Universidad de Sevilla.</a></p>
            </div>  

            <div className='lp-text-external'>
                    <h2 className='mp-text'>Fecha: 02/03/2024</h2>
                    <p className='mp-text'>Se actualiza la Landing Page de NexOngpara hacerla responsive y armonizarla con el Front-End.</p>
            </div>


        </div>
    </div>
     );
}
export default LandingPage;    