// History.js
import '../styles/styles.css';
import chronology from '../logo/actividades-desarrolladas.jpg';
import Intro from '../components/Intro';
import Header from '../components/Header';

function History() {
    return (
        <div className="App">
            <Header/>
            <Intro 
                title="HISTORIA" 
                description="En 1992, jóvenes voluntarios en Sevilla fundaron Manos Abiertas para ofrecer clases de apoyo a niños del Polígono Norte. En 2015, evolucionaron a Asociación Manos Abiertas con Norte, profesionalizando su intervención y colaborando con diversas entidades. Hoy, cuentan con un equipo técnico, voluntarios y colaboradores, manteniendo su compromiso con la comunidad."
                image={'activities'}
            />

            <img src={chronology} alt="Cronología de la Asociación Manos Abiertas con Norte" />

        </div>
    );
}

export default History;