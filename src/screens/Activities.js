import '../styles/styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
                            <td><a href='/campamentos'>Campanentos</a></td>
                            <td><a href='/aula-abierta'>Aula abierta</a></td>
                            <td><a href='/aula-convivencia'>Aula de convivencia</a></td>
                            <td><a href='/talleres-familiares'>Talleres familiares</a></td>
                            <td><a href='/club-verano'>Club de verano</a></td>
                        </tr>
                    </table>
                </div>
            </div>

            <Footer />

		</div>
	);
}
export default Activities;