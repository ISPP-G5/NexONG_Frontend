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
                    <br/>
                    <table className='five-links-table'>
                        <tr>
                            <td className='tester'><Link to="/campamentos">Campanentos</Link></td>
                            <td><Link to="/aula-abierta">Aula Abierta</Link></td>
                            <td><Link to="/aula-convivencia">Aula de convivencia</Link></td>
                            <td><Link to="/talleres-familiares">Talleres familiares</Link></td>
                            <td><Link to="/club-verano">Club de verano</Link></td>
                        </tr>
                    </table>
                </div>
            </div>

            <Footer />

		</div>
	);
}
export default Activities;