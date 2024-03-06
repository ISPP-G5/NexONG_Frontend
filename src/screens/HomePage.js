import '../styles/styles.css';
import background from '../logo/manosabiertas.bmp';
import Footer from '../components/Footer';
import Structure from '../components/Structure';
function HomePage() {
        return (
            <div className="App">
            <Structure 
                title="Asociación Manos Abiertas con Norte"
                description="Manos Abiertas surge como iniciativa en 1992. Un grupo de jóvenes voluntarios/as, detecta necesidades socioeducativas en la zona de Polígono Norte, Sevilla, y comienza a impartir clases de apoyo de matemáticas y lengua a los niños y niñas de los centros educativos de la zona: Blas Infante y Josefa Amor y Rico (Actualmente IES Inmaculada Vieira), en locales situados en bloques de la barriada."
                image={background}
            />
                <div className='homepage-container'>
                    <div className='flex-container'>
                    <h1>Nosotros</h1>
                    <h3>Asociación Manos Abiertas con Norte es una entidad sin ánimo de lucro, perteneciente a la Red de Obras Socioeducativas de La Salle, que trabaja en el ámbito de la intervención social en la barriada Polígono Norte y en el asentamiento chabolista de El Vacie, Sevilla.</h3>
                    </div>
                    <div className='flex-container'>
                        <h1>Entidades Colaboradoras</h1>
                        <h3>Nuestro proyecto recibe ayudas y subvenciones de los asociados y de diversas entidades públicas y privadas que hacen posible la transformación social del entorno.</h3>
                        <button className='button'>Conócelas</button>
                    </div>
                    <div className='flex-container'>
                        <h1>Voluntariado</h1>
                        <h3>Como en cualquier entidad de voluntariado, para que se puedan llevar a cabo todos y cada uno de los proyectos y las actividades que le presentan a la barriada del Polígono, se hace necesario un equipo de trabajo que saque a delante las actividades.</h3>
                        <button className='button'>Participa con nosotros</button>
                    </div>
                    
                </div>
                <Footer/>
        </div>
        
         );
    }
export default HomePage;    
