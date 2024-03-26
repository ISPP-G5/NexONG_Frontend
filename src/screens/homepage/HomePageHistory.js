// History.js
import '../../styles/styles.css';
import { useEffect } from 'react';
import chronology from '../../logo/actividades-desarrolladas.jpg';
import LayoutHomepage from '../../components/LayoutHomepage';

function HomePageHistory() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
    return (
        <LayoutHomepage 
            title="HISTORIA" 
            description="En 1992, jóvenes voluntarios en Sevilla fundaron Manos Abiertas para ofrecer clases de apoyo a niños del Polígono Norte. En 2015, evolucionaron a Asociación Manos Abiertas con Norte, profesionalizando su intervención y colaborando con diversas entidades. Hoy, cuentan con un equipo técnico, voluntarios y colaboradores, manteniendo su compromiso con la comunidad."
            image={'history'}
        > 

            <img src={chronology} alt="Cronología de la Asociación Manos Abiertas con Norte" />
            
        </LayoutHomepage>
    );
}

export default HomePageHistory;