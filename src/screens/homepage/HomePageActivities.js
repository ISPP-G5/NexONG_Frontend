// Activities.js
import '../styles/styles.css';
import Footer from '../components/Footer';
import Intro from '../components/Intro'; 
import Header from '../components/Header';
import HomepageContainer from '../components/HomepageContainer';

const info = [
    {
        title: 'Campamentos', 
        description: 'Realización de campamentos de verano para menores de educación primaria y secundaria', 
        link: '/campamentos',
        button: 'Leer más'
    },
    {
        title: 'Aula abierta', 
        description: 'Refuerzo educativo para menores entre 6 y 18 años así como actividades de relajacion y reflexión', 
        link: '/aula-abierta',
        button: 'Leer más'
    },
    {
        title: 'Aula de convivencia', 
        description: 'Atención a alumnos con conductas disruptivas para menores entre 6 y 18 años así como actividades de relajacion y reflexión', 
        link: '/aula-convivencia',
        button: 'Leer más'
    },
    {
        title: 'Talleres familiares', 
        description: 'Actividades formativas y de apoyo para las familias', 
        link: '/talleres-familiares',
        button: 'Leer más'
    },
    {
        title: 'Club de verano', 
        description: 'Club de verano para alumnos de primaria', 
        link: '/club-verano',
        button: 'Leer más'
    }
];

function HomePageActivities() {
    const title = "ACTIVIDADES";
    const description = "Nuestro proyecto recibe ayudas y subvenciones de los asociados y de diversas entidades públicas y privadas que hacen posible la transformación social del entorno.";

    return(
        <div className="App">
            <Header/>
            <Intro 
                title={title}
                description={description}
                image={'activities'}
            />
            <HomepageContainer info={info} />
            <Footer/>
        </div>
    );
}

export default HomePageActivities;