import '../../styles/styles.css';
import { useEffect } from 'react';
import LayoutHomepage from '../../components/LayoutHomepage';

// PHOTOS
import logros from '../../logo/agenda2030/agenda-logros.png';
import plan from '../../logo/agenda2030/plan-accion-social.png';
import poorness from '../../logo/agenda2030/pobreza.png';
import hunger from '../../logo/agenda2030/hambre.png';
import health from '../../logo/agenda2030/salud.png';
import education from '../../logo/agenda2030/educacion.png';
import equality from '../../logo/agenda2030/igualdad.png';
import work from '../../logo/agenda2030/trabajo.png';
import innovation from '../../logo/agenda2030/innovacion.png';
import reduction from '../../logo/agenda2030/desigualdades.png';
import cities from '../../logo/agenda2030/ciudades.png';
import peace from '../../logo/agenda2030/paz.png';
import aliances from '../../logo/agenda2030/alianzas.png';
import logo from '../../logo/macn-logo.png';

function HomePageAgenda() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <LayoutHomepage 
            title={'Agenda 2030'} 
            description={'Manos Abiertas surge como iniciativa en 1992. Un grupo de jóvenes voluntarios/as, detecta necesidades socioeducativas en la zona de Polígono Norte, Sevilla, y comienza a impartir clases de apoyo de matemáticas y lengua a los niños y niñas de los centros educativos de la zona: Blas Infante y Josefa Amor y Rico (Actualmente IES Inmaculada Vieira), en locales situados en bloques de la barriada.'}
            image={'globalGoals'}
        > 
            <div className='agenda-intro'>
                <div>
                    <h1>Introducción</h1>
                    <p>En 2015, la ONU aprobó la Agenda 2023 sobre el Desarrollo Sostenible, una oportunidad para que los países y sus sociedades emprendan un nuevo camino con el que mejorar la vida de todos, sin dejar a nadie atrás.</p>
                    <p>La agenda cuenta con 17 Objetivos de Desarrollo Sostenible (ODS), que incluyen desde la eliminación de la pobreza hasta el combate al cambio climático, la educación, la igualdad de la mujer, la defensa del medio ambiente o el diseño de nuestras ciudades.</p>
                    <p>Se interrelacionan entre sí e incorporan los desafíos globales a los que nos enfrentamos día a día, como la pobreza, la desigualdad, el clima, la degradación ambiental, la prosperidad, y la paz y la justicia.</p>
                </div>
                <img src={logros} alt='logros'></img>
            </div>
            <div className='agenda-plan'>
                <img src={plan} alt='plan'></img>
                <div>
                    <h1>Plan de Acción Social 2019-2023</h1>
                    <p>"Los Objetivos de Desarrollo Sostenibles son diecisiete metas que pretenden guiar, de manera coordinada, la acción mundial colectiva hasta 2030 para adoptar medidas que logren acabar con los grandes retos de la humanidad</p>
                    <p>El foro del Sector Andalucía de 2018 constató la necesidad de incorporarlos a nuestras Obras, especialmente en la gestión de estas.</p>
                    <p>En la Salle tratamos de formar consumidores responsables, de forma que nuestro alumnado sea más consciente de su rol activo en la sociedad buscando opciones y alternativas que favorecen la corresponsabilidad con su entorno natural y socioeconómico a través de los hábitos de compra. Des esta misma forma, entendemos que nuestras Obras deben de ser también consumidoras responsables</p>
                    <p>Así mismo, descubrimos en el Comercio Justo una herramienta eficaz para acabar con la injusticia social y el empobrecimiento comercial de determinadas zonas del mundo."</p>
                </div>
            </div>
            <div className='agenda-structure'>
            <div>
                <p>Según el informe "Estrategia Regional Andaluza para la Cohesión e Inclusión Social. intervención en zonas desfavorecidas.(2018)", es Andalucía una de las seis comunidades con más pobreza infantil, Polígono Norte y El Vacie se encuentran entre los barrios afectados</p>
                <p>Trabajamos bajo la misión de que estos niños/as y jóvenes tengan una vida más digna, convencidos de que la educación es la llave para prevenir situaciones de exclusión.</p>
            </div>
            <img src={poorness} alt='pobreza' width={300}></img>
            <img src={hunger} alt='hambre' width={300}></img>
            <div>
                <p>La pandemia ha dejado visible la necesidad de medidas urgentes para garantizar el sustento vital, en especial, a las personas pobres y más vulnerables. Es por ello que hemos adoptado medidas a través de la recaudación de fondos propios y diferentes campañas para asegurar el sustento alimenticio a las familias.</p>
            </div>
            <div>
                <p>Dentro de nuestro programa de ocio y tiempo libre destinamos actividades específicas para ello.</p>
                <p>Además, realizamos diferentes reuniones de coordinación con los centros de salud de la zona para garantizar servicios correctos y de calidad a la población. Cabe destacar el trabajo que se realiza con la población chabolista de El Vacie, siendo especialmente vulnerable por los problemas de higiene y salubridad de la zona en la que habitan.</p>
            </div>
            <img src={health} alt='salud' width={300}></img>
            <img src={education} alt='educacion' width={300}></img>
            <p>Nuestro fin principal es participar y dearrollar proyectos que atiendan a la diversidad y a los colectivos de mayor vulnerabilidad desde programas sociales y educativos, a través de una atención integral e inclusiva, dirigida a colectivos en situaciones de desprotección o en riesgo de exclusión social.</p>
            <p>Manos Abiertas tiene un compromiso fundamental con la igualdad de género y así se refleja en su Plan de Igualdad.</p>
            <img src={equality} alt='igualdad' width={300}></img>
            <img src={work} alt='trabajo' width={300}></img>
            <div>
                <p>Desde la entidad procuramos un empleo digno para todas las personas que forman parte del equipo técnico bajo el Convenio de Intervención Social.</p>
                <p>Por otro lado, ofrecemos a nuestros jóvenes actividades de formación y motivación profesional para reducir considerablemente la proporción de jóvenes que no están empleados y no cursan estudios, etc. </p>
            </div>
            <div>
                <p>Manos Abiertas, como miembro de los Consejos de Participación Ciudadana de la ciudad de Sevilla, presenta cada año programas de mejora de la infraestructura del barrio.</p>
                <p>Los últimos proyectos en los que ha participado han sido:</p>
                <p>- Rehabilitación Plaza Del Olivo (Sevilla) </p>
                <p>- Rehabilitación Pistas de Juego y deportivas (Plaza Fernández Aldavín)</p>
            </div>
            <img src={innovation} alt='innovacion' width={300}></img>
            <img src={reduction} alt='reduccion' width={300}></img>
            <p>Potenciamos y promovemos la inclusión social en todas nuestras actividades procurando siempre la reducción de la desigualdad.</p>
            <p>A través, entre otras, actividades de concienciación y formación para niños/as y jóvenes.</p>
            <img src={cities} alt='ciudades' width={300}></img>
            <img src={peace} alt='paz' width={300}></img>
            <p>Especialmente mediante talleres y sensibilizaciones para la reducción de formas de violencia: mediación escuela, conductas disruptivas, etc.</p>
            <h3>Nos sentimos responsables en la Alianza adoptada para la consecución de los objetivos de Desarrollo, participamos en formaciones para ello y apostamos por la movilización.</h3>
            <img src={aliances} alt='alianzas' width={300}></img>
            <img src={logo} alt='manos abiertas' width={300}></img>
            <h1>JUNTOS/AS PODEMOS CONSEGUIRLO</h1>
            </div>
        </LayoutHomepage>
    );
}
export default HomePageAgenda;    
