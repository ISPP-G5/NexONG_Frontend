import '../../styles/styles.css';
import { useEffect } from 'react';
import LayoutHomepage from '../../components/LayoutHomepage';


const info = [
    {
      title: '¿Quiénes son?',
      description: 'Grupo de personas con iniciativa y ganas de colaborar para la realización de las diferentes actividades y proyectos.'
    },
    {
      title: '¿Existe un limite de edad?',
      description: 'No, todo el mundo es bienvenido.Actuamente, nuestros voluntarios parten de los 18 años hasta los 60.',
    },
    {
      title: '¿Quieres ser voluntario?',
      description: 'Si esta interesado en ser voluntario registrese como voluntario en el siguiente enlace',
      link: '/registrarse',
      button: 'Participa con nosotros',
    },
  ];

function HomePageVolunteers () {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
    return (
      <LayoutHomepage 
        title="VOLUNTARIOS"
        description="Gracias a la colaboración de nuestros voluntarios los proyectos y actividades son posibles de realizar."
        image={'volunteers'}
        info={info}
      /> 
    );
}
export default HomePageVolunteers;