import '../styles/styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import chronology from '../logo/actividades-jpg-01.jpg';

function History() {
    return (
        <div className="App">
            <Header/>

            <div className='main'>
                <div className='title-text'>HISTORIA</div>
                <div className='contentHistory'>
                    <img src={chronology} alt="Chronology" className="imageHistory"/>
                    <div className='textHistory'>
                        <p>
                            Manos Abiertas surge como iniciativa en 1992. Un grupo de jóvenes voluntarios/as, detecta necesidades 
                            socioeducativas en la zona de Polígono Norte, Sevilla, y comienza a impartir clases de apoyo de matemáticas 
                            y lengua a los niños y niñas de los centros educativos de la zona: Blas Infante y Josefa Amor y Rico 
                            (Actualmente IES Inmaculada Vieira), en locales situados en bloques de la barriada.
                        </p>

                        <p>
                            Ante la dificultad de espacio, trasladan la actividad al centro educativo. La entidad va creciendo en número de 
                            actividades, personas atendidas y personas voluntarias implicadas. De este modo, formalizan la acción con la creación de 
                            una agrupación juvenil, en 1994, con una estructura lineal formada por un presidente/a, un secretario/a y tesorero/a y 
                            vocales (responsables en áreas específicas). En 1995, se concluyen los trámites pasando a denominarse Asociación Juvenil 
                            Manos Abiertas y manteniendo esa misma estructura hasta el año 2015.
                        </p>

                        <p>
                            Durante esos 20 años, Asociación Juvenil Manos Abiertas ha trabajado también en la creación de redes entre los distintos 
                            colectivos que trabajan en la zona manteniendo una estrecha colaboración y coordinación con diferentes entidades, 
                            administraciones públicas y privadas y centros educativos.
                        </p>

                        <p>
                            En 2015, cambia su denominación a Asociación Manos Abiertas con Norte y profesionaliza su intervención en la zona con la 
                            inclusión de una persona trabajadora en la entidad. En la actualidad la entidad está formada por un equipo técnico de 4 
                            personas, 40 personas voluntarias y 70 asociadas. La Junta Directiva está formada por 7 personas asociadas y mantiene un 
                            trabajo en red y coordinado con más de 30 entidades públicas y privadas.
                        </p>

                        <p>
                            Las actividades han variado a lo largo de estos años según se muestra en el siguiente cuadro:
                        </p>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
}

export default History;
