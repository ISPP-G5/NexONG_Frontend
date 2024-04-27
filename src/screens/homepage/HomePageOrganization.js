import '../../styles/styles.css'
import React, { useEffect } from 'react';
import LayoutHomepage from '../../components/LayoutHomepage';

// PHOTOS
import organigrama from '../../logo/organization/Organigrama.png'
import juntaDirectiva from '../../logo/organization/junta_directiva.jpg'
import educadoras from '../../logo/organization/educadoras.jpg'

function HomePageOrganization(){
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <LayoutHomepage
            title='ORGANIZACIÓN'
            image={'ong'}
        >
            <div className='homepage-text'>

                <p>
                    Como en cualquier entidad, es necesario precisar y realizar un reparto de las
                    tareas dentro de la asociación. Este va acorde a las funciones, habilidades,
                    destrezas y responsabilidades que cada persona lleva a cabo o aporta a Manos
                    Abiertas. De esta manera, surge una estructura interna que mantiene y facilita
                    la intervención que realizamos con las familias y los menores en el Polígono
                    Norte.
                </p>
                <p>
                    A grosso modo, este es el organigrama de la asociación:
                </p>
                <img src={organigrama} alt='organigrama' style={{display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '50%'}}></img>

                <p><h2 style={{textAlign: 'left'}}>Junta directiva</h2></p>
                <p>Como hemos apreciado en la organización de la entidad, la junta directiva es el
                    órgano último sobre el que recae la responsabilidad del funcionamiento e
                    intervención de Manos Abiertas. Esta junta directiva, como pasa en muchos casos,
                    no suele conocerse.
                </p>
                <p>
                    Por eso, aquí presentamos la composición de la junta directiva de Manos Abiertas
                    con Norte:
                </p>
                <p>
                    <b>Presidente:</b> Juan Miguel Gálvez<br></br>
                    <b>Vicepresidenta:</b> Cristina Olmedo<br></br>
                    <b>Tesorero:</b> Antonio Pino<br></br>
                    <b>Secretaria:</b> Cristina Valero<br></br>
                    <b>Vocal:</b> Ignacio Aguilar<br></br>
                    <b>Vocal:</b> Pablo<br></br>
                    <b>Vocal:</b> Ángel Sevilla<br></br>
                    <b>Vocal:</b> Laura Carmet<br></br>
                </p>
                <img src={juntaDirectiva} alt='junta-directiva' style={{display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '85%'}}></img>

                <p><h2 style={{textAlign: 'left'}}>Equipo de Educadoras/es</h2></p>
                <p>
                    Como grupo de personas contratadas para el desarrollo  y dinamismo de los
                    proyectos y programas de la entidad, tenemos a este equipo de educadoras/es:
                </p>
                <p>
                    <b>Coordinadora de la entidad:</b> María Arce<br></br>
                    <b>Educadora: </b> Cristina Martínez<br></br>
                    <b>Educadora:</b> Andrea Domínguez<br></br>
                    <b>Educador:</b> Juan Antonio Lugo<br></br>
                </p>
                <img src={educadoras} alt='educadoras' style={{display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '85%'}}></img>
                
            </div>

        </LayoutHomepage>
    )
}

export default HomePageOrganization;