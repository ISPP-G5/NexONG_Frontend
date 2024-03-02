import React from 'react';
import '../styles/styles.css';
import logo from './HTML/sinfondo-nexong.png';
import logofondo from './HTML/nexonglogo.png'
import malogo from './HTML/confondo-mac.png';
import { Link } from "react-router-dom";


function LandingPage() {
    return (
    <div className='lp-bg'>
        <div className='lp-container'>
              
            <img src={logo} style={{ marginLeft:'10%', width:'80%', borderRadius:'5%'}}/>
            
            
                <div className='lp-text-external'>
                    <h2 style={{marginLeft:'3%'}}>Quiénes somos</h2>
                    <p style={{marginLeft:'5%'}}>NexOng Sevilla es un proyecto realizado por estudiantes de la Universidad de Sevilla que tiene como objetivo el desarrollo de una 
				        aplicación web que sirve de soporte para la gestión de recursos humanos y materiales para ONGs orientadas a distintas formas de enseñanza, conócenos:</p>
                        <Link to='/equipo'
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                  backgroundColor: "aed6f1",
                                }}  rel="noopener noreferrer" target = "_blank">
                        <img src={logofondo} style={{margin:'5%', width:'30%', borderRadius:'10%'}}/>
                    </Link>
                </div>

                <div className='lp-text-external'>
                    <h2 style={{marginLeft:'3%'}}>Nuestro cometido</h2>
                    <p style={{marginLeft:'5%'}}>Entre nuestros objetivos de desarrollo actuales está el control de los profesores y monitores, las aulas y cursos, los beneficiarios y los voluntarios inscritos. Así como
				        ofrecer soporte para la organización de diversas actividades programadas por las organizaciones como las excursiones.</p>
		        </div>

                <div className='lp-text-external'>
                    <h2 style={{marginLeft:'3%'}}>Colaboradores</h2>
                    <p style={{marginLeft:'5%'}}>Este proyecto busca asistir a nuestros colaboradores en su encomiable labor, conócelos:</p>
                    <Link to='http://manosabiertasnorte.es/'
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                  backgroundColor: "aed6f1",
                                }}  rel="noopener noreferrer" target = "_blank">
                        <img src={malogo} style={{margin:'5%', width:'30%',borderRadius: '10%'}}/>
                    </Link>
                </div>
                   
        </div>
    </div>
     );
}
export default LandingPage;    