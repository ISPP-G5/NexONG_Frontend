import '../styles/styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function OpenRoom() {
    return (
        <div className="App">

            <Header/>

            <div className='main'>
                <div className='title-text'>AULA ABIERTA</div>
                <div className='flex-container-blue'>
                    Refuerzo educativo para menores entre 6 y 18 años así
                    como actividades de relajacion y reflexión
                </div>
                <div className='text'>
                    Lunes a jueves
                    <br/>
                    16:00 a 20:00
                </div>
            </div>

            <Footer/>

        </div>
        

    );
}
export default OpenRoom;