import '../styles/styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {Link} from 'react-router-dom'

function Activities() {
	return(
		<div classname="App">

            <Header />

            <div className='main'>
                <div className='title-text'>ACTIVIDADES</div>
                <div className='text'>Nuestro proyecto recibe ayudas y subvenciones de los
                asociados y de diversas entidades públicas y privadas que hacen posible la
                transformación social del entorno.</div>
                <div className='text'>
                    Nuestras actividades:
                    <br/>
                    <ul>
                        <li><Link to="/campamentos">Campanentos</Link></li>
                        <li><Link to="/aula-abierta">Aula Abierta</Link></li>
                        <li><Link to="/aula-convivencia">Aula de convivencia</Link></li>
                        <li><Link to="/talleres-familiares">Talleres familiares</Link></li>
                        <li><Link to="/club-verano">Club de verano</Link></li>
                    </ul>
                </div>
            </div>

            <Footer />

		</div>
	);
}
export default Activities;