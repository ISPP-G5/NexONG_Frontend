import '../../styles/styles.css';
import { useEffect } from 'react';
import LayoutHomepage from '../../components/LayoutHomepage';

function HomePageFamilyWorkshops() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <LayoutHomepage 
            title='TALLERES FAMILIARES'
            description='Actividades formativas y de apoyo para las familias'
            image={'workshop'}
        >  
            <div className='homepage-text'>
                <p>
                    Con este proyecto damos respuesta a las necesidades detectadas a nivel
                    individual y contextual, familias y barrio. Pretendemos educar de forma
                    integral a la población con la que trabajamos: Educando mediante el
                    ocio y el tiempo libre a través de juegos, actividades, talleres,
                    encuentros y convivencias.
                    <br/>
                    <br/>
                    Mediante juegos populares, debates, talleres, bailes, manualidades,
                    talleres, cineforum, potenciaremos la capacidad de transmitir emociones.
                </p>
            </div>
        </LayoutHomepage>
    );
}
export default HomePageFamilyWorkshops;