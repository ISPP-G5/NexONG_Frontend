import '../../styles/styles.css';
import { useEffect } from 'react';
import LayoutHomepage from '../../components/LayoutHomepage';
import cine from '../../logo/summerClub/cine.png'
import crazyzone from '../../logo/summerClub/crazyzone.png'
import guadalpark from '../../logo/summerClub/guadalpark.png'
import islaMagica from '../../logo/summerClub/islamagica.png'
import juliana from '../../logo/summerClub/juliana.png'
import museo from '../../logo/summerClub/museo.png'
import paddlesurf from '../../logo/summerClub/paddlesurf.png'
import paintball from '../../logo/summerClub/paintball.png'
import piscina from '../../logo/summerClub/piscina.png'
import playa from '../../logo/summerClub/playa.png'
import talleresAula from '../../logo/summerClub/talleres_en_aula.png'
import talleresExteriores from '../../logo/summerClub/talleres_en_calle.png'

function HomePageSummerClub() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <LayoutHomepage 
            title='CLUB DE VERANO'
            description='Club de verano para alumnos de primaria'
            image={'summerClub'}
        >  
            <div className='homepage-container'>
                <p>
                    Organizado por Asociación Manos Abiertas y animado por un
                    grupo de jóvenes lasalianos de diferentes procedencias de
                    Andalucía que se comprometen de forma voluntaria y
                    desinteresada a desarrollar, durante el verano, un trabajo
                    de proyección social: Club de Verano Polígono Norte.
                    <br/>
                    <br/>
                    Tiene lugar en el mes de junio-julio principalmente, en
                    Polígono Norte de Sevilla. Participan más de 60 niños y
                    niñas en esta actividad repleta de talleres, juegos, valores,
                    excursiones y convivencias, entre otras muchas dinámicas que
                    se llevan a cabo.
                </p>
                <h1>CLUB DE VERANO 2021</h1>
                <p>
                    Como actividad final del curso 2020-2021 en Manos Abiertas, 
                    desde el día 28 de junio hasta el 15 de agosto, ha tenido 
                    lugar la Escuela de Verano Manos Abiertas "hay un amigo en mí"
                    donde un grupo de más de 60 menores han participado en talleres,
                    juegos y excursiones. 
                    <br/>
                    <br/>
                    La iniciativa ha sido bastante acogida por vecinos y vecinas 
                    del barrio, además de por las familias que forman parte de
                    la entidad. Una actividad cargada de valores, ilusiones, 
                    esfuerzos, ganas y, sobretodo, sonrisas, muchas sonrisas.
                </p>
                <h1>EXCURSIONES</h1>
            </div>

            <div className='agenda-plan'>     
                <img src={piscina} alt='Piscina' width={500}></img>
                <div>
                    <h2>Piscina</h2>
                    <p>
                        Esta aventura estuvo "pasada por agua", y es que en la Piscina
                        Municipal de San José de la Rinconada (La Cañaita) ninguno 
                        se quedó sin darse un buen chapuzón.
                    </p>
                </div>
            </div>
            <div className='agenda-intro'>
                <div>
                    <h2>Playa</h2>
                    <p>
                        Aunque tuvimos que madrugar, poco importó. Pasamos un día 
                        estupendo en Mazagón. Crema, arena, mar, juegos, buena 
                        compañía... ¿Qué más se podía pedir?
                    </p>
                </div>
                <img src={playa} alt='Playa' width={500}></img>
            </div>
            <div className='agenda-plan'>
                <img src={paintball} alt='Paintball' width={500}></img>
                <div>
                    <h2>Paintball</h2>
                    <p>
                        Con un poco de organización fuimos capaces de trabajar 
                        en equipo y convertir un terreno descolorido en una armonía 
                        de colores bastante vistosos. ¡Qué divertido fue!
                    </p>
                </div>
            </div>
            <div className='agenda-intro'>
                <div>
                    <h2>Cine</h2>
                    <p>
                        Hora de relajarse y disfrutar de una buena película con 
                        palomitas. Algunos llevábamos tiempo sin pisar un cine,
                        pero que agusto estuvimos en una sala solo para nosotros.
                        Luces, cámara y acción
                    </p>
                </div>
                <img src={cine} alt='Cine' width={500}></img>
            </div>
            <div className='agenda-plan'>
                <img src={museo} alt='Museo de las ilusiones' width={500}></img>
                <div>
                    <h2>Museo de las ilusiones</h2>
                    <p>
                        Embarcados en autobús, pusimos rumbo a un lugar donde 
                        nada es lo que parece, donde parece que a base de ilusiones 
                        apreciamos la realidad de otra manera y es que con estos 
                        niños y niñas la magia es posible.
                    </p>
                </div>
            </div>
            <div className='agenda-intro'>
                <div>
                    <h2>Crazy Zones</h2>
                    <p>
                        ¿Y si te digo: "Salta conmigo, digo ¡salta!"? Pues eso, 
                        brincando, saltando, corriendo, volando, riendo y disfrutando 
                        es como estuvimos en este pedazo de sitio donde aprendimos 
                        mucho sobre nuestras capacidades gimnastas.
                    </p>
                </div>
                <img src={crazyzone} alt='Crazy zone' width={450}></img>
            </div>
            <div className='agenda-plan'>
                <img src={paddlesurf} alt='Paddle Surf' width={500}></img>
                <div>
                    <h2>Paddle Surf</h2>
                    <p>
                        Quisimos recorrer y observar nuestra hermosa ciudad desde
                        una perspectiva distinta, haciendo paddle surf desde el 
                        río Guadalquivir.
                    </p>
                </div>
            </div>
            <div className='agenda-intro'>
                <div>
                    <h2>La juliana - Bosque suspendido</h2>
                    <p>
                        ¿Al bosque? sí, pero en las alturas. Qué aventura más 
                        atrevida. Todos nos disfrazamos de nuestro yo más valiente 
                        y a trepar se dijo. Árboles, lianas, paredes, cuerdas y tirolinas,
                        nada se nos resistía.
                    </p>
                </div>
                <img src={juliana} alt='Juliana' width={450}></img>
            </div>
            <div className='agenda-plan'>
                <img src={guadalpark} alt='Guadalpark' width={500}></img>
                <div>
                    <h2>Guadalpark</h2>
                    <p>
                        Nada mejor que un tobogán de agua para enfrentarnos al sol 
                        y al calor. Hacía tiempo que no nos reíamos tanto y tan seguido.
                    </p>
                </div>
            </div>
            <div className='agenda-intro'>
                <div>
                    <h2>Isla Mágica</h2>
                    <p>
                        La más esperada, nuestra aventura pirata en el verano no podía 
                        faltar. Ilusión, alegría, euforia, mareo, cosquillas en la barriga,
                        confianza, superación... En definitiva, un día para atesorar 
                        en nuestros corazones. Qué cantidad de emociones y cómo disfrutamos 
                        del tiempo compartido con amigos, compañeras y monitoras.
                    </p>
                </div>
                <img src={islaMagica} alt='Isla Mágica' width={450}></img>
            </div>
            <div className='agenda-plan'>
                <img src={talleresAula} alt='Talleres en el aula' width={500}></img>
                <div>
                    <h2>Talleres en el aula</h2>
                    <p>
                        Para poder entender mucho mejor lo que hemos ido viviendo, 
                        hemos tenido la suerte de compartir también talleres en grupo. 
                        Aquí nos hemos expresado, hemos expuesto nuestras habilidades 
                        más creativas y artísticas. Además de, analizar nuevos valores 
                        e interiorizar nuevos aprendizajes para seguir haciéndonos a 
                        nosotros mismos/as.
                    </p>
                </div>
            </div>
            <div className='agenda-intro'>
                <div>
                    <h2>Juegos en la calles</h2>
                    <p>
                        Durante este tiempo de pandemia, hemos echado de menos la 
                        calle. Salir, jugar, bailar y disfrutar de nuestro barrio 
                        y sus espacios. Así que con la precaución que nos caracteriza, 
                        hemos vuelto a disfrutar con responsabilidad de nuestro entorno.
                    </p>
                </div>
                <img src={talleresExteriores} alt='Juegos en la calle' width={450}></img>
            </div>
          
        </LayoutHomepage>
    );
}
export default HomePageSummerClub;