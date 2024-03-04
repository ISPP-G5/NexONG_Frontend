// History.js
import '../styles/styles.css';
import activities from '../logo/activities.bmp';
import Header from '../components/Header';
import chronology from '../logo/actividades-jpg-01.jpg';
import Structure from '../components/Structure';

function History() {
    return (
        <div className="App">
            <Structure 
                title="HISTORIA" 
                description="En 1992, jóvenes voluntarios en Sevilla fundaron Manos Abiertas para ofrecer clases de apoyo a niños del Polígono Norte. En 2015, evolucionaron a Asociación Manos Abiertas con Norte, profesionalizando su intervención y colaborando con diversas entidades. Hoy, cuentan con un equipo técnico, voluntarios y colaboradores, manteniendo su compromiso con la comunidad."
                image={activities}
                additionalImage={chronology}
            />
        </div>
    );
}

export default History;