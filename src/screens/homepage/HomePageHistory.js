// History.js
import '../../styles/styles.css';
import { useEffect } from 'react';
import chronology from '../../logo/actividades-desarrolladas.jpg';
import story from '../../logo/history.png';
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
            <div className="history-container">
                <div className="image-container">
                    <img src={story} alt="Imagen de la historia de Manos Abiertas" className="history-image" />
                </div>
                <div>
                    <p>Manos Abiertas surge como iniciativa en 1992. Un grupo de jóvenes voluntarios/as, detecta necesidades socioeducativas en la zona de Polígono Norte, Sevilla, y comienza a impartir clases de apoyo de matemáticas y lengua a los niños y niñas de los centros educativos de la zona: Blas Infante y Josefa Amor y Rico (Actualmente IES Inmaculada Vieira), en locales situados en bloques de la barriada. Ante la dificultad de espacio, trasladan la actividad al centro educativo.</p>
                    <p>La entidad va creciendo en número de actividades, personas atendidas y personas voluntarias implicadas. De este modo, formalizan la acción con la creación de una agrupación juvenil, en 1994, con una estructura lineal formada por un presidente/a, un secretario/a y tesorero/a y vocales (responsables en áreas específicas). En 1995, se concluyen los trámites pasando a denominarse Asociación Juvenil Manos Abiertas y manteniendo esa misma estructura hasta el año 2015.</p>
                    <p>Durante esos 20 años, <strong>Asociación Juvenil Manos Abiertas</strong> ha trabajado también en la creación de redes entre los distintos colectivos que trabajan en la zona manteniendo una estrecha colaboración y coordinación con diferentes entidades, administraciones públicas y privadas y centros educativos.</p>
                    <p>En 2015, cambia su denominación a <strong>Asociación Manos Abiertas con Norte</strong> y profesionaliza su intervención en la zona con la inclusión de una persona trabajadora en la entidad. En la actualidad la entidad está formada por un equipo técnico de 4 personas, 40 personas voluntarias y 70 asociadas. La Junta Directiva está formada por 7 personas asociadas y mantiene un trabajo en red y coordinado con más de 30 entidades públicas y privadas.</p>
                    <p>Las <strong>actividades</strong> han variado a lo largo de estos años según se muestra en el siguiente cuadro:</p>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={chronology} alt="Cronología de la Asociación Manos Abiertas con Norte" style={{ maxWidth: 'auto', height: 'auto' }} />
            </div>
        </LayoutHomepage>
    );
}

export default HomePageHistory;
