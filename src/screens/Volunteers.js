import '../styles/styles.css';
import volunteers from '../logo/volunteers.bmp';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Volunteers () {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/form-voluntario');
    };
    return (
        <div className="App">
            <Header />
            <div className='main'>
                <img src={volunteers} alt="Volunteers" className='background-pic'/>    
                <div className='bg-text'>
                    <h1>Voluntarios</h1>
                    <h3>Gracias a la colaboración de nuestros voluntarios los proyectos y actividades son posibles de realizar.</h3>
                    
                </div>
                <div className='homepage-container'>
                    <div className='flex-container'>
                    <h1>¿Quiénes son?</h1>
                    <h3>Grupo de personas con iniciativa y ganas de colaborar para la realización de las diferentes actividades y proyectos.</h3>
                    </div>
                    <div className='flex-container'>
                        <h1>¿Existe un limite de edad?</h1>
                        <h3>No,todo el mundo es bienvenido.Actuamente, nuestros voluntarios parten de los 18 años hasta los 60.</h3>
                        
                    </div>
                    <div className='flex-container'>
                        <h1>Quieres ser voluntario?</h1>
                        <h3>Si esta interesado en ser voluntario pulssse el siguiente botón</h3>
                        <button className='button' onClick={handleButtonClick}>Participa con nosotros</button>                    </div>
                </div>
            </div>
            <Footer />
        </div>
         );
    }
export default Volunteers;