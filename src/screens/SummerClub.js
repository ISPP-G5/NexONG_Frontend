import '../styles/styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function SummerClub() {
    return (
        <div className="App">

            <Header/>

            <div className='main'>
                <div className='title-text'>CLUB DE VERANO</div>
                <div className='flex-container-blue'>
                    Club de verano para alumnos de primaria 
                </div>
                <div className='text'>
                    Ven y disfruta de actividades como manualidades,
                    educación en valores y mucho más
                </div>
            </div>

            <Footer/>

        </div>
        

    );
}
export default SummerClub;