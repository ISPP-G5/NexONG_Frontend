import '../../styles/styles.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LayoutHomepage from '../../components/LayoutHomepage';
import lasalle from '../../logo/LaSalle/laSalle.png'
import mapaLaSalle  from '../../logo/LaSalle/mapa-la-salle.jpg';



function HomePageLaSalle() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <LayoutHomepage
            title={'LA SALLE'}
            description='En 2016, la Asociación Manos Abiertas con Norte se suma a la Red de Obras Socioeducativas de La Salle.'
            image={'ong'}
        >
            <div className='agenda-intro'>
                <div>
                    <h1>La Salle</h1>
                    <p>En 2016 Asociación Manos Abiertas con Norte se suma a la Red de Obras Socioeducativas de La Salle, institución implantada en casi un centenar de países que se dedica a la Educación. </p>
                    <p>Los Centros La Salle reciben su nombre de San Juan Bautista de La Salle quien, a finales del siglo XVII se asoció con unos maestros para mantener escuelas dedicadas a los niños pobres. Con ellos fundó el Instituto de los Hermanos de las Escuelas Cristianas.</p>
                </div>
                <img src={lasalle} alt='Asociación Rutas'></img>
            </div>
            <div className='agenda-plan'>
                <img src={mapaLaSalle} alt='Campamento de verano' width={450}></img>
                
                <div>
                    <h1>OBRAS LA SALLE </h1>
                    <p>La Red de Obras La Salle incluye Centros educativos, Centros educativos pre-universitarios y de formación profesional, universidades y Obras socioeducativas en España y Portugal, éstas obras se encuentran agrupadas en lo que se llama Coordinadora de Obras Socioeducativas La Salle.</p>
                    <p>En la actualidad ocho entidades forman parte y otras tres colaboran con ella.</p>

                </div>
            </div>

            



            
        </LayoutHomepage>
    );
}
export default HomePageLaSalle;