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
                <div className='info-text'>
                    <h4>
                        Organizado por Asociación Manos Abiertas y animado por un
                        grupo de jóvenes lasalianos de diferentes procedencias de
                        Andalucía que se comprometen de forma voluntaria y
                        desinteresada a desarrollar, durante el verano, un trabajo
                        de proyección social: Club de Verano Polígono Norte.
                        <br/>
                        Tiene lugar en el mes de junio-julio principalmente, en
                        Polígono Norte de Sevilla. Participan más de 60 niños y
                        niñas en esta actividad repleta de talleres, juegos, valores,
                        excursiones y convivencias, entre otras muchas dinámicas que
                        se llevan a cabo.
                    </h4>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
export default SummerClub;