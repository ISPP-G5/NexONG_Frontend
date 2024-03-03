import '../styles/styles.css';
import activities from '../logo/activities.bmp';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {Link} from 'react-router-dom';

function Association() {
	return(
		<div classname="App">
            <Header />
            <div className='main'>
                <img src={activities} alt="Activities" className='background-pic'/> 
                <div className='bg-text'>
                    <h1>ASOCIACION</h1>
                    <h3>Nuestra identidad está marcada por la educación no formal que consideramos fundamental en nuestra zona de 
                        actuación y la implantamos de manera dinámica y abierta con el fin de adaptarnos a las nuevas necesidades 
                        que nuestros beneficiarios presentan y que descubrimos a través de los estudios de la zona y la observación 
                        directa.</h3>
                </div>
                <div className='homepage-container'>
                    <div className='flex-container'>
                    <h1>Nosotros</h1>
                    <h3>Pequeña desc explicativa</h3>
                    <Link to='/nosotros' className='button'>Leer más</Link>
                    </div>
                    <div className='flex-container'>
                    <h1>Historia</h1>
                    <h3>Pequeña desc</h3>
                    <Link to='/historia' className='button'>Leer más</Link>
                    </div>
                    <div className='flex-container'>
                    <h1>Mision, Visión y Valores</h1>
                    <h3>Pequeña desc</h3>
                    <Link to='/mision-vision-valores' className='button'>Leer más</Link>
                    </div>
                    <div className='flex-container'>
                    <h1>Dónde estamos</h1>
                    <h3>Pequeña desc</h3>
                    <Link to='/' className='button'>Leer más</Link>
                    </div>
                    <div className='flex-container'>
                    <h1>Entidades Colaboradoras</h1>
                    <h3>Pequeña desc</h3>
                    <Link to='/' className='button'>Leer más</Link>
                    </div>
                </div>
            </div>
            <Footer/>
		</div>
	);
}
export default Association;