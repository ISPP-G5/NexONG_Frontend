import React from 'react';
import people from '../logo/sllide.png';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/styles.css';

function MisionOverviewValues() {
    return (
        <div className="App">
            <Header/>
            <div className='main'>
            <img src={people} alt="People" className='background-pic'/> 
                <div className='bg-text'>
                    <h1>MISIÓN</h1>
                    <h3>
                        La identidad se forja mediante educación no formal adaptable a necesidades locales descubiertas mediante estudios y observación directa.</h3>
                    <h1>VISIÓN</h1>
                    <h3>Buscamos ser referentes en intervención socioeducativa en el norte de Sevilla, ofreciendo recursos y apoyo comunitario para reducir la desigualdad, destacando por nuestra cercanía, adaptabilidad y programas holísticos.</h3>
                    <h1>VALORES</h1>
                    <h3>Respeto, Resposabilidad, Compromiso y Solidaridad</h3>
                    <h3>Libertad e Igualdad, Democracia y participación, Accesibilidad</h3>
                    <h3>Cooperación y colaboración, Creatividad e Innovación</h3>
                </div>   
            </div>
            <Footer/>
        </div>
    );
}

export default MisionOverviewValues;
