// Activities.js
import '../styles/styles.css';
import activities from '../logo/activities.bmp';
import Footer from '../components/Footer';
import Structure from '../components/Structure'; // import the Structure component

const info = [
    {title: 'Campamentos', description: 'Realización de campamentos de verano para menores de educación primaria y secundaria', link: '/campamentos'},
    {title: 'Aula abierta', description: 'Refuerzo educativo para menores entre 6 y 18 años así como actividades de relajacion y reflexión', link: '/aula.abierta'},
    {title: 'Aula de convivencia', description: 'Atención a alumnos con conductas disruptivas para menores entre 6 y 18 años así como actividades de relajacion y reflexión', link: '/aula-convivencia'},
    {title: 'Talleres familiares', description: 'Actividades formativas y de apoyo para las familias', link: '/talleres-familiares'},
    {title: 'Club de verano', description: 'Club de verano para alumnos de primaria', link: '/club-verano'}
];

function Activities() {
    const title = "ACTIVIDADES";
    const description = "Nuestro proyecto recibe ayudas y subvenciones de los asociados y de diversas entidades públicas y privadas que hacen posible la transformación social del entorno.";
    const image = activities;

    return(
        <div className="App">
            <div className='main'>
                <div className='bg-text'>
                    <h1>{title}</h1>
                    <h3>{description}</h3>
                </div>
                <Structure 
                    info={info} 
                    title={title} 
                    description={description} 
                    image={image} 
                    // additionalImage={additionalImage} // uncomment this line if you have an additional image
                />
            </div>
            <Footer/>
        </div>
    );
}

export default Activities;