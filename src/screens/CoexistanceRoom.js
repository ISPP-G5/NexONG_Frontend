import '../styles/styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function CoexistanceRoom() {
    return (
        <div className="App">

            <Header/>

            <div className='main'>
                <div className='title-text'>AULA DE CONVIVENCIA</div>
                <div className='flex-container-blue'>
                    Atención a alumnos con conductas disruptivas para menores entre
                    6 y 18 años así como actividades de relajacion y reflexión
                </div>
                <div className='text'>
                    Lunes a jueves
                    <br/>
                    9:00 a 14:00
                </div>
            </div>

            <Footer/>

        </div>
        

    );
}
export default CoexistanceRoom;