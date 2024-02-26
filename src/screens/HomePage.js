import '../styles/styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function HomePage() {
        return (
        <div className="App">
        <Header />
        <div className='main'>
        <div className='title-text'>¿QUIÉNES SOMOS?</div>
        <div className='text'>Manos Abiertas surge como iniciativa en 1992. Un grupo de jóvenes voluntarios/as, detecta necesidades socioeducativas en la zona de Polígono Norte, Sevilla, y comienza a impartir clases de apoyo de matemáticas y lengua a los niños y niñas de los centros educativos de la zona: Blas Infante y Josefa Amor y Rico (Actualmente IES Inmaculada Vieira), en locales situados en bloques de la barriada.</div>
        </div>
        <Footer />
     </div>
     );
    }
export default HomePage;    
