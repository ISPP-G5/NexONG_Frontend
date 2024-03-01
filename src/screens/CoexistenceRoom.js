import '../styles/styles.css';
import coexistenceRoom from '../logo/coexistence-room.jpg'
import Header from '../components/Header';
import Footer from '../components/Footer';

function CoexistenceRoom() {
    return (
        <div className="App">
            <Header/>
            <div className='main'>
                <img src={coexistenceRoom} alt="CoexistenceRoom" className='background-pic'/>
                <div className='bg-text'>
                    <h1>AULA DE CONVIVENCIA</h1>
                    <h3>
                        Atención a alumnos con conductas disruptivas para menores entre
                        6 y 18 años así como actividades de relajacion y reflexión
                    </h3>
                </div>
                <div className='flex-container'>
                    <h3>
                        Se trata de un programa encaminado a la prevención y reinserción en el
                        aula de alumnos/as con conductas de riesgo.
                        <br/>
                        Desde la asociación queremos dar la importancia que merece el apoyo a
                        los centros educativos del Polígono Norte de Sevilla, ofertando un
                        espacio de convivencia aprendizaje donde los alumnos/as expulsados de
                        los centros escolares puedan realizar las tareas escolares indicadas
                        por su centro de referencia, así como actividades y tareas propuestas
                        por los técnicos del centro.
                        <br/>
                        El aula de convivencia es un espacio ordenado de atención educativa
                        para alumnos/as con comportamientos sistemáticamente perjudiciales
                        para la convivencia, considerándose también como un espacio de
                        aprendizaje emocional que pretende facilitar al alumno/a herramientas
                        para cambiar su conducta desajustada y prevenir el absentismo.
                        <br/>
                        El proyecto se lleva a cabo en las instalaciones de la asociación en
                        el caso de los alumnos/as de ESO y dentro de los centros educativos
                        en el caso de los alumnos/as de EPO.Los educadores/as y voluntarios/as
                        de la Asociación hemos planteado una serie de áreas de trabajo con sus
                        correspondientes actividades, talleres y proyectos, tras la detección
                        y análisis de necesidades que nuestro entorno social más próximo
                        presentan, dentro del cual podemos encontrar la actividad a desarrollar
                        en este proyecto, el Aula de Convivencia. El objetivo prioritario sería,
                        pues, que los alumnos y alumnas comprendan el alcance para sí mismos y
                        para los demás de sus conductas y, sobre todo, que aprendan a hacerse
                        cargo de sus propias acciones, pensamientos, sentimientos y
                        comunicaciones con los demás.
                        <br/>
                        El proyecto Aula de Convivencia comenzó en el mes de Septiembre y al
                        cerrar el trimestre de curso escolar el balance es si nos atenemos a
                        los hechos de la actividad de la Asociación sin duda, positivo.
                        Lamentablemente no es positivo ni alentador en cuanto a la mayor
                        necesidad de este recurso a los centros educativos de la zona.
                        Siendo la evaluación una muestra de la necesidad de ampliar el recurso
                        así como el campo de actuación del mismo.
                    </h3>
                </div>
                <div className='flex-container'>
                    <h2>El perfil de los estudiantes.</h2>
                    <h3>
                        En el Polígono Norte de Sevilla cuenta con unas características muy
                        concretas, se enfrentan a numerosos retos: padres/madres desempleados,
                        recursos limitados… lo cual hace que la participación de las familias en
                        los centros sea difícil.
                    </h3>
                </div>
                <div className='flex-container'>
                    <h2>El clima de los centros.</h2>
                    <h3>
                        Contribuye al éxito académico de sus estudiantes y predice el grado en el
                        que participan activamente en el aprendizaje, incluyendo la forma en que
                        asisten a clase, lo atento que están en clase, lo cuidadosamente que
                        completen sus tareas y el grado de compromiso que muestran a permanecer
                        en la escuela.
                        <br/>
                        Los estudiantes que se sienten conectados con su centro tienen más
                        probabilidades de pasar de curso y continuar con una formación duradera y
                        provechosa. Ha sido por ello en estas semanas un objetivo primordial del
                        Aula de Convivencia MMAA contribuir a la creación de una actitud favorable
                        ante el centro educativo, participando activamente con las familias y con
                        los responsables de los colegios e institutos de la zona.
                    </h3>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
export default CoexistenceRoom;