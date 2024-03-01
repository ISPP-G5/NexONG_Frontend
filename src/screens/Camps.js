import '../styles/styles.css';
import camps from '../logo/camps.jpg'
import Header from '../components/Header';
import Footer from '../components/Footer';

function Camps() {
    return (
        <div className="App">
            <Header/>
            <div className='main'>
                <img src={camps} alt="Camps" className='background-pic'/>
                <div className='bg-text'>
                    <h1>CAMPAMENTOS</h1>
                    <h3>
                        Realización de campamentos de verano para menores
                        de educación primaria y secundaria
                    </h3>
                </div>
                <div className='flex-container'>
                    <h3>
                        Ven y disfruta de actividades como manualidades,
                        veladas y mucho más
                    </h3>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
export default Camps;