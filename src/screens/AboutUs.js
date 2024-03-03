import '../styles/styles.css';
import activities from '../logo/activities.bmp';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AboutUs() {
    return (
        <div className="App">

            <Header/>

            <div className='main'>
            <img src={activities} alt="Activities" className='background-pic'/> 
                <div className='bg-text'>
                    <h1>NOSOTROS</h1>
                    <h3>Asociación Manos Abiertas con Norte es una entidad sin ánimo de lucro, perteneciente a la Red 
                        de Obras Socioeducativas de La Salle, que trabaja en el ámbito de la intervención social en la 
                        barriada Polígono Norte y en el asentamiento chabolista de El Vacie, Sevilla.</h3>
                </div>
                <div className='homepage-container'>
                    <div className='flex-container'>
                    <h3>Manos Abiertas con Norte somos una ONG de La Salle en Sevilla desde 1995, centrados en educar a niños y jóvenes vulnerables mediante proyectos socioeducativos. </h3>
                    </div>
                    <div className='flex-container'>
                    <h3>Trabajamos en el Polígono Norte y El Vacie, brindando apoyo académico y fortaleciendo habilidades básicas y técnicas.</h3>
                    </div>
                    <div className='flex-container'>
                    <h3>Nuestra misión es proporcionar una vida digna a través de la educación integral.</h3>
                    </div>
                </div>
            </div>

            <Footer/>

        </div>
        

    );
}
export default AboutUs;