import '../styles/styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Camps() {
    return (
        <div className="App">

            <Header/>

            <div className='main'>
                <div className='title-text'>CAMPAMENTOS</div>
                <div className='flex-container-blue'>
                    Realización de campamentos de verano para menores
                    de educación primaria y secundaria
                </div>
                <div className='text'>
                    Ven y disfruta de actividades como manualidades,
                    veladas y mucho más
                </div>
            </div>

            <Footer/>

        </div>
        

    );
}
export default Camps;