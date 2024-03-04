// Activities.js
import '../styles/styles.css';
import activities from '../logo/activities.bmp';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ActivitiesStructure from '../components/ActivitiesStrcuture';
const info = [
    {title: 'Campamentos', description: 'Realización de campamentos de verano para menores de educación primaria y secundaria', link: '/campamentos'},
    {title: 'Aula abierta', description: 'Refuerzo educativo para menores entre 6 y 18 años así como actividades de relajacion y reflexión', link: '/aula.abierta'},
    {title: 'Aula de convivencia', description: 'Atención a alumnos con conductas disruptivas para menores entre 6 y 18 años así como actividades de relajacion y reflexión', link: '/aula-convivencia'},
    {title: 'Talleres familiares', description: 'Actividades formativas y de apoyo para las familias', link: '/talleres-familiares'},
    {title: 'Club de verano', description: 'Club de verano para alumnos de primaria', link: '/club-verano'}
];

function Activities() {
    return(
        <div className="App">
            <Header />
            <div className='main'>
                <img src={activities} alt="Activities" className='background-pic'/> 
                <div className='bg-text'>
                    <h1>ACTIVIDADES</h1>
                    <h3>Nuestro proyecto recibe ayudas y subvenciones de los
                    asociados y de diversas entidades públicas y privadas que hacen posible la
                    transformación social del entorno.</h3>
                </div>
                <ActivitiesStructure info={info} />
            </div>
            <Footer/>
        </div>
    );
}

export default Activities;