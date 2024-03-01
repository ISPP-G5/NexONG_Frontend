import '../styles/styles.css';
import openRoom from '../logo/open-room.jpg'
import Header from '../components/Header';
import Footer from '../components/Footer';

function OpenRoom() {
    return (
        <div className="App">
            <Header/>
            <div className='main'>
                <img src={openRoom} alt="OpenRoom" className='background-pic'/>
                <div className='bg-text'>
                    <h1>AULA ABIERTA</h1>
                    <h3>
                        Refuerzo educativo para menores entre 6 y 18 años así
                        como actividades de relajacion y reflexión
                    </h3>
                </div>
                <div className='flex-container'>
                    <h3>
                        Lunes a jueves
                        <br/>
                        16:00 a 20:00
                    </h3>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
export default OpenRoom;