import '../../styles/styles.css';
import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Intro from '../../components/Intro';
import HomepageContainer from '../../components/HomepageContainer';
import Footer from '../../components/Footer';

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

function HomePageMisionOverviewValues() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

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

export default HomePageMisionOverviewValues;
