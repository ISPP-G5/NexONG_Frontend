import '../../styles/styles.css';
import { useEffect } from 'react';
import LayoutHomepage from '../../components/LayoutHomepage';


function HomePageAboutUs() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <LayoutHomepage 
            title={'NOSOTROS'} 
            description={"Asociación Manos Abiertas con Norte es una entidad sin ánimo de lucro, perteneciente a la Red de Obras Socioeducativas de La Salle, que trabaja en el ámbito de la intervención social en la barriada Polígono Norte y en el asentamiento chabolista de El Vacie, Sevilla."}
            image={'activities'}
        > 
            <div className='homepage-container'>
                <div className='flex-container'>
                    <h3>Somos Manos Abiertas con Norte, una ONG de La Salle en Sevilla desde 1995, centrados en educar a niños y jóvenes vulnerables mediante proyectos socioeducativos. </h3>
                </div>
                <div className='flex-container'>
                    <h3>Trabajamos en el Polígono Norte y El Vacie, brindando apoyo académico y fortaleciendo habilidades básicas y técnicas.</h3>
                </div>
                <div className='flex-container'>
                    <h3>Nuestra misión es proporcionar una vida digna a través de la educación integral.</h3>
                </div>
            </div>
            <iframe 
                title="NexONG Video"
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/iD0SdTklJvQ" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
            ></iframe>
        </LayoutHomepage>
    );
}

export default HomePageAboutUs;