import '../styles/styles.css';
import Header from '../components/Header';
import Intro from '../components/Intro';
import Footer from '../components/Footer';
import axios from 'axios';
import HomepageContainer from '../components/HomepageContainer';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT


const info = [
    {
      title: 'Nosotros',
      description: 'Asociación Manos Abiertas con Norte es una entidad sin ánimo de lucro, perteneciente a la Red de Obras Socioeducativas de La Salle, que trabaja en el ámbito de la intervención social en la barriada Polígono Norte y en el asentamiento chabolista de El Vacie, Sevilla.',
    },
    {
      title: 'Entidades Colaboradoras',
      description: 'Nuestro proyecto recibe ayudas y subvenciones de los asociados y de diversas entidades públicas y privadas que hacen posible la transformación social del entorno.',
      link: '/entidades-colaboradoras',
      button: 'Conócelas',
    },
    {
      title: 'Voluntariado',
      description: 'Como en cualquier entidad de voluntariado, para que se puedan llevar a cabo todos y cada uno de los proyectos y las actividades que le presentan a la barriada del Polígono, se hace necesario un equipo de trabajo que saque a delante las actividades.',
      link: '/voluntariado',
      button: 'Participa con nosotros',
    },
  ];


function HomePage() {
    axios.get( `${API_ENDPOINT}`)
    .then(response => {
        console.log(response.data);
    }, error => {
        console.error(error);
    }
    );
        return (
            <div className="App">
                <Header/>
                <Intro 
                    title="Asociación Manos Abiertas con Norte"
                    description="Manos Abiertas surge como iniciativa en 1992. Un grupo de jóvenes voluntarios/as, detecta necesidades socioeducativas en la zona de Polígono Norte, Sevilla, y comienza a impartir clases de apoyo de matemáticas y lengua a los niños y niñas de los centros educativos de la zona: Blas Infante y Josefa Amor y Rico (Actualmente IES Inmaculada Vieira), en locales situados en bloques de la barriada."
                    image={'ong'}
                />
                <HomepageContainer info={info} />
                <Footer/>
            </div>
        
         );
    }
export default HomePage;    
