import '../../styles/styles.css';
import { useEffect } from 'react';
import LayoutHomepage from '../../components/LayoutHomepage';

const info = [
    {
        title: 'Nosotros', 
        description: 'Pequeña desc explicativa', 
        link: '/asociacion/nosotros',
        button: 'Conócenos'
    },
    {
        title: 'Historia', 
        description: 'Pequeña desc', 
        link: '/asociacion/historia',
        button: 'Leer más'
    },
    {
        title: 'Dónde estamos', 
        description: 'Pequeña desc', 
        link: '/asociacion/donde-estamos',
        button: 'Leer más'
    },
    {
        title: 'Mision, Visión y Valores', 
        description: 'Pequeña desc', 
        link: '/asociacion/mision-vision-valores',
        button: 'Lee más'
    },
    {
        title: 'La salle', 
        description: 'Pequeña desc', 
        link: '/asociacion/la-salle',
        button: 'Leer más'
    },
    {
        title: 'Organización', 
        description: 'Pequeña desc', 
        link: '/asociacion/organizacion',
        button: 'Leer más'
    },
    {
        title: 'Transparencia', 
        description: 'Pequeña desc', 
        link: '/asociacion/transparencia',
        button: 'Leer más'
    },
    {
        title: 'Entidades Colaboradoras', 
        description: 'Pequeña desc', 
        link: '/asociacion/entidades-colaboradoras',
        button: 'Conócelas'
    }
];

function HomePageAssociation() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return(
        <LayoutHomepage 
            title={'ASOCIACIÓN'} 
            description="Nuestra identidad está marcada por la educación no formal que consideramos fundamental en nuestra zona de actuación y la implantamos de manera dinámica y abierta con el fin de adaptarnos a las nuevas necesidades que nuestros beneficiarios presentan y que descubrimos a través de los estudios de la zona y la observación directa."
            image={'asociation'}
            info={info}
          /> 
    );
}

export default HomePageAssociation;