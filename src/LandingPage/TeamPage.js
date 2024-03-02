import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/styles.css';
import logo from './HTML/sinfondo-nexong.png';
import malogo from './HTML/macnlogo.png';
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



function LandingPage() {
    return (
    <div className='lp-bg'>
        <div className='team-container'>
            <Link to='/aterrizaje'> 
            <img src={logo} style={{ marginLeft:'10%', width:'80%', borderRadius:'5%'}}/>
            </Link> 
            <div className='team-grid'>
                <div><h3>Project Manager</h3>
                <img src={romalde} style={{width:'20%', borderRadius:'100%'}}/>
                <p>Miguel Ángel Romalde</p></div>
                
                <div><h3>Back-End Team Lead</h3>
                <img src={pablo} style={{width:'20%', borderRadius:'100%'}}/>
                <p>Pablo Periáñez</p></div>

                <div><h3>Front-End Team Lead</h3>
                <img src={claudia} style={{width:'20%', borderRadius:'100%'}}/>
                <p>Claudia Gilabert</p></div>
            </div>
            <h1 style={{textAlign:'center', margin:'3%'}}>Back-End Programmers</h1>
            <div className='team-grid'>
                <div><h4>Team Member</h4>
                <img src={felix} style={{width:'20%', borderRadius:'100%'}}/>
                <p>Félix Gudiel</p></div>
                
                <div><h4>Team Member</h4>
                <img src={ruano} style={{width:'20%', borderRadius:'100%'}}/>
                <p>Juan Luis Ruano</p></div>

                <div><h4>Team Member</h4>
                <img src={ortiz} style={{width:'20%', borderRadius:'100%'}}/>
                <p>Manuel Ortiz</p></div>

                <div><h4>Team Member</h4>
                <img src={pedro} style={{width:'20%', borderRadius:'100%'}}/>
                <p>Pedro López</p></div>

                <div><h3>Secretary</h3>
                <img src={sergio} style={{width:'20%', borderRadius:'100%'}}/>
                <p>Sergio Aguayo</p></div>

                <div><h3>Community Manager</h3>
                <img src={aurora} style={{width:'20%', borderRadius:'100%'}}/>
                <p>Aurora Navas</p></div>
            </div>
            <div className='team-grid'>
            <div><h4>Team Member</h4>
                <img src={fran} style={{width:'20%', borderRadius:'100%'}}/>
                <p>Francisco Calderón</p></div>
                
                <div><h4>Team Member</h4>
                <img src={paco} style={{width:'20%', borderRadius:'100%'}}/>
                <p>Francisco Rosso</p></div>

                <div><h4>Team Member</h4>
                <img src={barcia} style={{width:'20%', borderRadius:'100%'}}/>
                <p>Manuel Barcia</p></div>

                <div><h4>Team Member</h4>
                <img src={maria} style={{width:'20%', borderRadius:'100%'}}/>
                <p>María Núñez</p></div>

                <div><h4>Team Member</h4>
                <img src={ivan} style={{width:'20%', borderRadius:'100%'}}/>
                <p>Iván Ramírez</p></div>

                <div><h4>Team Member</h4>
                <img src={samuel} style={{width:'20%', borderRadius:'100%'}}/>
                <p>Samuel Rodríguez</p></div>

                <div><h3>Spokesperson</h3>
                <img src={marta} style={{width:'20%', borderRadius:'100%'}}/>
                <p>Marta González</p></div>
            </div>
        </div>
    </div>
     );
}
export default LandingPage;    