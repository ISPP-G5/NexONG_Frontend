import React from 'react';
import '../styles/styles.css';
import logo from './HTML/sinfondo-nexong.png';
import { Link } from "react-router-dom";
import romalde from './Members/romalde.jpg';
import pablo from './Members/Pablo.jpg';
import claudia from './Members/Claudia.jpg';
import felix from './Members/Felix Gudiel.jpg';
import ruano from './Members/Juan_Luis_Ruano_Muriedas.jpg';
import ortiz from './Members/Manuel Ortiz.jpg';
import pedro from './Members/pedro.jpg';
import sergio from './Members/Sergio.jpg';
import aurora from './Members/Aurora.JPG';
import fran from './Members/Francisco Calderón .jpg';
import paco from './Members/Francisco Rosso.png';
import barcia from './Members/Manuel-Barcia.png';
import maria from './Members/Maria.jpg';
import ivan from './Members/Iván.jpg.png';
import samuel from './Members/samuel.jpg';
import marta from './Members/marta.PNG';
import hito from './HTML/hito.png';




function LandingPage() {
    return (
    <div className='lp-bg'>
        <div className='team-container'>
            <Link to='/equipo'> 
            <img src={logo} style={{ marginLeft:'30%', width:'40%', borderRadius:'5%'}}/>
            </Link> 

            


        </div>
    </div>
     );
}
export default LandingPage;    