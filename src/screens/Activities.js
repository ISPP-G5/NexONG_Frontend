import '../styles/styles.css';
import activities from '../logo/activities.bmp';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {Link} from 'react-router-dom';

function Activities() {
	return(
		<div classname="App">
            <Header />
            <div className='main'>
                <img src={activities} alt="Activities" className='background-pic'/> 
                <div className='bg-text'>
                    <h1>ACTIVIDADES</h1>
                    <h3>Nuestro proyecto recibe ayudas y subvenciones de los
                    asociados y de diversas entidades públicas y privadas que hacen posible la
                    transformación social del entorno.</h3>
                </div>
                <div className='homepage-container'>
                    <div className='flex-container'>
                    <h1>Campamentos</h1>
                    <h3>
                        Realización de campamentos de verano para menores
                        de educación primaria y secundaria
                    </h3>
                    <Link to='/campamentos' className='button'>Leer más</Link>
                    </div>
                    <div className='flex-container'>
                    <h1>Aula abierta</h1>
                    <h3>
                        Refuerzo educativo para menores entre 6 y 18 años así
                        como actividades de relajacion y reflexión
                    </h3>
                    <Link to='/aula.abierta' className='button'>Leer más</Link>
                    </div>
                    <div className='flex-container'>
                    <h1>Aula de convivencia</h1>
                    <h3>
                        Atención a alumnos con conductas disruptivas para menores entre
                        6 y 18 años así como actividades de relajacion y reflexión
                    </h3>
                    <Link to='/aula-convivencia' className='button'>Leer más</Link>
                    </div>
                    <div className='flex-container'>
                    <h1>Talleres familiares</h1>
                    <h3>
                        Actividades formativas y de apoyo para las familias
                    </h3>
                    <Link to='/talleres-familiares' className='button'>Leer más</Link>
                    </div>
                    <div className='flex-container'>
                    <h1>Club de verano</h1>
                    <h3>
                        Club de verano para alumnos de primaria
                    </h3>
                    <Link to='/club-verano' className='button'>Leer más</Link>
                    </div>
                </div>
            </div>
            <Footer/>
		</div>
	);
}
export default Activities;