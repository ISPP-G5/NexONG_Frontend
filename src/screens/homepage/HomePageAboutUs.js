import '../../styles/styles.css';
import { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Intro from '../../components/Intro';


function HomePageAboutUs() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <div className="App">
            <Header/>
            <Intro 
                title="NOSOTROS" 
                description="Asociación Manos Abiertas con Norte es una entidad sin ánimo de lucro, perteneciente a la Red 
                    de Obras Socioeducativas de La Salle, que trabaja en el ámbito de la intervención social en la 
                    barriada Polígono Norte y en el asentamiento chabolista de El Vacie, Sevilla."
                image={'activities'}
            />
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
            <Footer/>
        </div>
    );
}

export default HomePageAboutUs;