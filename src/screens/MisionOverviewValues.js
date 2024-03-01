import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/styles.css';

function MisionOverviewValues() {
    return (
        <div className="App">
            <Header/>
            <div className='main'>
                <div className='title-text'>MISIÓN, VISIÓN Y VALORES</div>
                <div className='text'>
                    <h2>Misión</h2>
                    <p>
                        Nuestra identidad está marcada por la educación no formal que consideramos fundamental en nuestra zona de 
                        actuación y la implantamos de manera dinámica y abierta con el fin de adaptarnos a las nuevas necesidades que 
                        nuestros beneficiarios presentan y que descubrimos a través de los estudios de la zona y la observación directa.
                    </p>

                    <h2>Visión</h2>
                    <p>
                        Consolidarnos en la zona norte de Sevilla en cuanto a intervención socioeducativa, así como ser un punto de 
                        información abierto a toda la comunidad, que consiga ofrecer y/o dotar de recursos a la población de esta zona 
                        de Sevilla, contribuyendo a la disminución de la desigualdad social, alcanzando una intervención holística y 
                        ecológica sobre los beneficiarios de los programas ejecutados.
                    </p>
                    <p>
                        Además de esto queremos llegar a ser reconocidos por la cercanía y la capacidad de adaptación a las necesidades 
                        sociales ampliando nuestros programas.
                    </p>

                    <h2>Valores</h2>
                    <div className='homepage-container'>
                        <div className='flex-container'>
                            <h1>Respeto</h1>
                            <h3>De todos/as y para todos/as teniendo una escucha activa y paciente con el usuario.</h3>
                        </div>
                        <div className='flex-container'>
                            <h1>Responsable</h1>
                            <h3>Ser consecuentes con nuestra acción y ofrecer la relación de ayuda en todos los casos.</h3>
                        </div>
                        <div className='flex-container'>
                            <h1>Compromiso y Solidaridad</h1>
                            <h3>Desde la observación social, la detección de necesidades y la proposición de respuestas ajustadas, 
                                efectivas y continuas. Para seguir prestando un servicio útil a la sociedad ajustando nuestra acción 
                                a las necesidades cambiantes.</h3>
                        </div>
                        <div className='flex-container'>
                            <h1>Libertad e Igualdad</h1>
                            <h3>Todo el equipo responsable de la organización, así como los voluntarios y beneficiarios de los programas 
                                ejercerán su participación de manera libre y procurando la igualdad a través de un sistema de relación 
                                horizontal.</h3>
                        </div>
                        <div className='flex-container'>
                            <h1>Democracia y participación</h1>
                            <h3>Las decisiones se tomarán por consenso y se fomentará la participación.</h3>
                        </div>
                        <div className='flex-container'>
                            <h1>Accesibilidad</h1>
                            <h3>La Asociación debe ser fácilmente accesible para cualquier ciudadano, y sus actuaciones, gestión, etc. 
                                transparentes.</h3>
                        </div>
                        <div className='flex-container'>
                            <h1>Cooperación y colaboración</h1>
                            <h3>La entidad debe mantener relaciones con asociaciones similares, entidades u organizaciones, públicas o 
                                privadas, etc. Igualmente, la Asociación debe fomentar la cooperación y colaboración entre sus 
                                asociados/as.</h3>
                        </div>
                        <div className='flex-container'>
                            <h1>Creatividad e Innovación</h1>
                            <h3>La entidad debe ser proactiva e innovadora en sus actuaciones.</h3>
                        </div>
                    </div>
                       
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default MisionOverviewValues;
