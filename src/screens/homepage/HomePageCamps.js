import '../../styles/styles.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LayoutHomepage from '../../components/LayoutHomepage';
import rutas from '../../logo/summerCamp/asociación_rutas.png'
import summer_camp from '../../logo/summerCamp/summer_camp.png'
import educacion from '../../logo/summerCamp/educacion_valores.png'
import talleres from '../../logo/summerCamp/talleres.png'
import manualidades from '../../logo/summerCamp/manualidades.png'
import gynkanas from '../../logo/summerCamp/gymkanas.png'
import playa from '../../logo/summerCamp/playa.png'
import salidas from '../../logo/summerCamp/salidas.png'
import veladas from '../../logo/summerCamp/veladas.png'


function HomePageCamps() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <LayoutHomepage
            title={'CAMPAMENTO DE VERANO'}
            description='Organizado por Asociación Manos Abiertas y animado por un grupo de jóvenes lasalianos de diferentes procedencias de Andalucía que se comprometen de forma voluntaria y desinteresada a desarrollar, durante el verano, 
            un trabajo de proyección social: Club de Verano Polígono Norte.'
            image={'camps'}
        >
            <div className='agenda-intro'>
                <div>
                    <h1>Introducción</h1>
                    <p>Esta actividad la hemos realizado como cada año junto a la <Link to='https://asociacionjuvenilr1.wixsite.com/rutasdesevilla'>Asociación Rutas Sevilla</Link> como culmen al trabajo desarrollado durante el curso, ofreciendo a los alumnos una alternativa de convivencia y relaciones, en un marco diferente al habitual.</p>
                    <p>Dicha actividad nos permite fomentar los valores y actitudes trabajados durante el año,en coherencia y responsabilidad con la línea mantenida durante el curso.</p>
                </div>
                <img src={rutas} alt='Asociación Rutas'></img>
            </div>
            <div className='agenda-plan'>
                <img src={summer_camp} alt='Campamento de verano' width={450}></img>
                <div>
                    <h1>ACTIVIDADES DIARIAS</h1>
                    <p>Estas actividades tienen como objetivo fomentar la educación  a través de juegos, visitas y diferentes experiencias, etc. Para así desarrollar su pensamiento crítico, el conocimiento cultural que poseen y la forma de relacionarse con el resto de compañeros y compañeras, al igual que con monitores</p>
                </div>
            </div>

            <div className='agenda-structure'>
                <div>
                    <h2>1. Reflexiones para la educación en valores</h2>
                    <p>El objetivo principal de esta actividad es educar en valores que fomenten la solidaridad, la socialización, la interdependencia, así como el sentido de la responsabilidad individual y de grupo, haciendo ver que son fundamentales para una correcta integración social.</p>
                </div>
                <img src={educacion} alt='Educación en valores' width={500}></img>
                <img src={talleres} alt='Talleres Experienciales' width={500}></img>
                <div>
                    <h2>2. Talleres Experienciales</h2>
                    <p>Enfocado a adolescentes y jóvenes (13 a 18 años). Es experiencial porque parte de la vida concreta de los/as destinatarios y del ambiente en el que viven. Y mediante un proceso dinámico y gradual orienta y transforma la propia vida y la del entorno.</p>
                </div>
                <div>
                    <h2>3. TALLERES DE MANUALIDADES</h2>
                    <p>Actividades que fomentan la capacidad creativa y artística de los/la participantes, así como su autonomía y aprendizaje cooperativo.</p>
                </div>
                <img src={manualidades} alt='TALLERES DE MANUALIDADES' width={500}></img>
                <img src={gynkanas} alt='ACTIVIDADES DEPORTIVAS Y GYMKANAS' width={500}></img>
                <div>
                    <h2>4. ACTIVIDADES DEPORTIVAS Y GYMKANAS</h2>
                    <p>Estos juegos y actividades deportivas se realizan en pro de una vida sana y la adquisición de unos hábitos saludables. Además favorece el trabajo en equipo, la colaboración y la cooperación. Todas las actividades parten del juego creativo, fomentando la diversión y la participación.</p>
                </div>
                <div>
                    <h2>5. PLAYA</h2>
                    <p>Disfrutamos del mar y las ventajas del mismo. Espacio natural que nos ayuda a apreciar y cuidar que es de todos y todas. Disfrutando y compartiendo con el grupo</p>
                </div>
                <img src={playa} alt='Playa' width={500}></img>
                <img src={salidas} alt='SALIDAS CULTURALES Y DE OCIO' width={500}></img>
                <div>
                    <h2>6. SALIDAS CULTURALES Y DE OCIO</h2>
                    <p>El objetivo es potenciar en los y las participantes la socialización, la interdependencia, así como el sentido de la responsabilidad individual y de grupo.</p>
                </div>
                <div>
                    <h2>7. VELADAS GUIADAS</h2>
                    <p>Espacio diario destinado a la fiesta y la celebración realizan diferente donde se bailes y actuaciones por grupos. El objetivo es desarrollar destrezas sociales necesarias para la colaboración exitosa y la confianza en uno mismo.</p>
                </div>
                <img src={veladas} alt='VELADAS GUIADAS' width={450}></img>


            </div>

            
        </LayoutHomepage>
    );
}
export default HomePageCamps;