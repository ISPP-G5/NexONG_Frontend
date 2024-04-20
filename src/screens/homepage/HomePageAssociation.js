import '../../styles/styles.css';
import { useEffect } from 'react';
import LayoutHomepage from '../../components/LayoutHomepage';

const info = [
    {
        title: 'Nosotros', 
        description: `Asociación Manos Abiertas con Norte es una entidad sin ánimo de lucro, perteneciente a
        la Red de Obras Socioeducativas de La Salle, que trabaja en el ámbito de la intervención social en la
        barriada Polígono Norte y en el asentamiento chabolista de El Vacie, Sevilla.`, 
        link: '/asociacion/nosotros',
        button: 'Conócenos'
    },
    {
        title: 'Historia', 
        description: `En 1992, jóvenes voluntarios en Sevilla fundaron Manos Abiertas para ofrecer clases de
        apoyo a niños del Polígono Norte. En 2015, evolucionaron a Asociación Manos Abiertas con Norte,
        profesionalizando su intervención y colaborando con diversas entidades. Hoy, cuentan con un equipo
        técnico, voluntarios y colaboradores, manteniendo su compromiso con la comunidad.`, 
        link: '/asociacion/historia',
        button: 'Leer más'
    },
    {
        title: 'Dónde estamos', 
        description: 'Puedes encontrarnos en:',
        list: [
            'Local calle Meléndez Valdés, 28. 41010. Sevilla',
            'Local Plaza Río de Janeiro, 10. 41010. Sevilla'
        ],
        link: '/asociacion/donde-estamos',
        button: 'Leer más'
    },
    {
        title: 'Mision, Visión y Valores', 
        description: `En Manos Abiertas con Norte pretendemos proporcionar en su zona de actuación una educación no formal,
        dinámica y abierta y adaptada a las necesidades de los vecions. Buscamos consolidarnos en la zona norte de
        Sevilla en nuestro campo y ser un punto de información que contribuya a la disminución de la desigualdad social.
        Mediante nuestro trabajo desarrollamos una intervención educativa y emocional, con lo que queremos fomentar en los
        niños y niñas el desarrollo de habilidades sociales y de un amplio rango de valores como el respeto, la
        responsabilidad, la solidaridad y la creatividad.`, 
        link: '/asociacion/mision-vision-valores',
        button: 'Lee más'
    },
    {
        title: 'La Salle', 
        description: `Manos Abiertas con Norte forma parte de Red de Obras Socioeducativas de La Salle, inestitución
        dedicada a la educación implantada en casi un centenar de países. Recibe su nombre de San Juan Bautisata de
        La Salle, que se asoció con maestros para mantener escuelas dedicadas a los niños pobres, e incluye centros
        educativos, centros educativos preuniversitarios y de formación profesional, universidades y obras
        socioeducativas en España y Portugal.`, 
        link: '/asociacion/la-salle',
        button: 'Leer más'
    },
    {
        title: 'Organización', 
        description: `Como cualquier entidad, es necesario precisar y realizar un reparto de las tareas dentro de
        la asociación. Este va acorde a las funciones, habilidades, destrezas y responsabilidades que cada persona
        lleva a cabo o aporta a Manos Abiertas.  De esta manera, surge una estructura interna que mantiene y facilita
        la intervención que realizamos con las familias y los menores en el Polígono Norte.`, 
        link: '/asociacion/organizacion',
        button: 'Leer más'
    },
    {
        title: 'Transparencia', 
        description: `La Asociación Manos Abiertas con Norte apuesta por la transparencia como uno de los objetivos
        prioritarios de intervención. Por ello, si quieres saber más sobre nosotros, podrás encontrar documentación
        institucional en las que aparece todo aquello que hemos realizado durante estos últimos años. Esperemos
        sirvan para acercarte más aún a nuestra asociación y a la realidad en la que estamos inmersos.`, 
        link: '/asociacion/transparencia',
        button: 'Leer más'
    },
    {
        title: 'Entidades Colaboradoras', 
        description: `Nuestro proyecto recibe ayudas y subvenciones de los asociados y de diversas entidades públicas
        y privadas que hacen posible la transformación social del entorno.`, 
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