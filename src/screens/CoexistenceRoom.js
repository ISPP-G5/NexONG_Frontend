import '../styles/styles.css';
import coexistenceRoom from '../logo/coexistence-room.jpg'
import Header from '../components/Header';
import Footer from '../components/Footer';

function CoexistenceRoom() {
    return (
        <div className="App">
            <Header/>
            <div className='main'>
                <img src={coexistenceRoom} alt="CoexistenceRoom" className='background-pic'/>
                <div className='bg-text'>
                    <h1>AULA DE CONVIVENCIA</h1>
                    <h3>
                        Atención a alumnos con conductas disruptivas para menores entre
                        6 y 18 años así como actividades de relajacion y reflexión
                    </h3>
                </div>
                <div className='flex-container'>
                    <h3>
                        Lunes a jueves
                        <br/>
                        9:00 a 14:00
                    </h3>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
export default CoexistenceRoom;