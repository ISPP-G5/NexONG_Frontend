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
            </div>
            
            <Footer />

		</div>
	)
}
export default Activities;