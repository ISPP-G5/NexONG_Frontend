import '../../styles/styles.css';
import { useEffect } from 'react';
import LayoutHomepage from '../../components/LayoutHomepage';
import HomePageDescription from '../../components/HomePageDescription';
import axios from 'axios';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT


const info = [
    {
      title: 'Nosotros',
      description: 'Asociación Manos Abiertas con Norte es una entidad sin ánimo de lucro, perteneciente a la Red de Obras Socioeducativas de La Salle, que trabaja en el ámbito de la intervención social en la barriada Polígono Norte y en el asentamiento chabolista de El Vacie, Sevilla.',
      link: '/asociacion/nosotros',
      button: 'Conócenos',
    },
    {
      title: 'Entidades Colaboradoras',
      description: 'Nuestro proyecto recibe ayudas y subvenciones de los asociados y de diversas entidades públicas y privadas que hacen posible la transformación social del entorno.',
      link: '/asociacion/entidades-colaboradoras',
      button: 'Conócelas',
    },
    {
      title: 'Voluntariado',
      description: 'Como en cualquier entidad de voluntariado, para que se puedan llevar a cabo todos y cada uno de los proyectos y las actividades que le presentan a la barriada del Polígono, se hace necesario un equipo de trabajo que saque a delante las actividades.',
      link: '/voluntariado',
      button: 'Participa con nosotros',
    },
  ];


function HomePage() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    axios.get( `${API_ENDPOINT}`)
    .then(response => {}, error => {
        console.error(error);
    }
    );
        return (
          <LayoutHomepage 
            title={'Asociación Manos Abiertas con Norte'} 
            description={HomePageDescription()}
            image={'ong'} 
            info={info}
          />        
         );
    }
export default HomePage;    
