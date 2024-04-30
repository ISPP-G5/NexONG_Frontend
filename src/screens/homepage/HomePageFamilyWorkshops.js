import '../../styles/styles.css';
import { useEffect } from 'react';
import LayoutHomepage from '../../components/LayoutHomepage';
import familyWorkshops from '../../logo/family-workshops.png';
import YouTube from 'react-youtube';

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
            <p style={{marginTop: '2%'}}>
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
            <img className='image-workshop' src={familyWorkshops} alt="Imagen de los talleres familiares"/>
            <YouTube
                videoId="VKzEHgDqp3o"
                opts={{ width: '560', height: '315'}}
                style={{alignSelf: 'center', marginTop: '2%', marginBottom: '2%'}}
            />
        </LayoutHomepage>
    );
}
export default HomePageFamilyWorkshops;