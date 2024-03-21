import '../../styles/styles.css';
import React, { useEffect } from 'react';
import LayoutHomepage from '../../components/LayoutHomepage';

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
        <LayoutHomepage 
            title="MISIÓN, VISIÓN Y VALORES"
            image={'ong'}
            info={info}
          /> 
    );
}

export default HomePageMisionOverviewValues;
