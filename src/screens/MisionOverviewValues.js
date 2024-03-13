import React from 'react';
import people from '../logo/sllider.png';
import Header from '../components/Header';
import Intro from '../components/Intro';
import HomepageContainer from '../components/HomepageContainer';
import Footer from '../components/Footer';
import '../styles/styles.css';

const info = [
    {
        title: 'Misión',
        description: 'La identidad se forja mediante educación no formal adaptable a necesidades locales descubiertas mediante estudios y observación directa.'
    },
    {
        title: 'Visión',
        description: 'Buscamos ser referentes en intervención socioeducativa en el norte de Sevilla, ofreciendo recursos y apoyo comunitario para reducir la desigualdad, destacando por nuestra cercanía, adaptabilidad y programas holísticos.'
    },
    {
        title: 'Valores',
        list: ['Respeto, Resposabilidad, Compromiso y Solidaridad', 'Libertad e Igualdad, Democracia y participación, Accesibilidad ', 'Cooperación y colaboración, Creatividad e Innovación']
    },
  ];

function MisionOverviewValues() {
    return (
        <div className="App">
            <Header/>
            <Intro 
                title="MISIÓN, VISIÓN Y VALORES"
                image={'ong'}
            />
            <HomepageContainer info={info} />
            <Footer/>
        </div>
    );
}

export default MisionOverviewValues;
