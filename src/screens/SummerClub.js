import '../styles/styles.css';
import summerClub from '../logo/summer-club.jpg'
import Header from '../components/Header';
import Footer from '../components/Footer';

function SummerClub() {
    return (
        <div className="App">
            <Header/>
            <div className='main'>
                <img src={summerClub} alt="SummerClub" className='background-pic'/>
                <div className='bg-text'>
                    <h1>CLUB DE VERANO</h1>
                    <h3>
                        Club de verano para alumnos de primaria
                    </h3>
                </div>
                <div className='flex-container'>
                    <h3>
                        Ven y disfruta de actividades como manualidades,
                        educación en valores y mucho más
                    </h3>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
export default SummerClub;