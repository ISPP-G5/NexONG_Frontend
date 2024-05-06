import '../../styles/styles.css';
import { useEffect } from 'react';
import LayoutHomepage from '../../components/LayoutHomepage';
import YouTube from 'react-youtube';

const info = [
    {
        description: 'Somos Manos Abiertas con Norte, una ONG de La Salle en Sevilla desde 1995, centrados en educar a niños y jóvenes vulnerables mediante proyectos socioeducativos.'
    },
    {
        description: 'Trabajamos en el Polígono Norte y El Vacie, brindando apoyo académico y fortaleciendo habilidades básicas y técnicas.'
    },
    {
        description: 'Nuestra misión es proporcionar una vida digna a través de la educación integral.'
    }
]

function HomePageAboutUs() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <LayoutHomepage 
            title={'NOSOTROS'} 
            description={"Asociación Manos Abiertas con Norte es una entidad sin ánimo de lucro, perteneciente a la Red de Obras Socioeducativas de La Salle, que trabaja en el ámbito de la intervención social en la barriada Polígono Norte y en el asentamiento chabolista de El Vacie, Sevilla."}
            image={'ong'}
            info={info}
        > 
            <YouTube
                videoId="iD0SdTklJvQ"
                opts={{ width: '560', height: '315'}}
                style={{alignSelf: 'center'}}
            />
        </LayoutHomepage>
    );
}

export default HomePageAboutUs;