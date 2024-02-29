import '../styles/styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AboutUs() {
    return (
        <div className="App">

            <Header/>

            <div className='main'>
                <div className='title-text'>NOSOTROS</div>
                <div className='flex-container-blue'>
                Asociación Manos Abiertas con Norte es una entidad sin ánimo de lucro, perteneciente a la Red 
                de Obras Socioeducativas de La Salle, que trabaja en el ámbito de la intervención social en la 
                barriada Polígono Norte y en el asentamiento chabolista de El Vacie, Sevilla.
                </div>
                <div className='text'>
                    <p>
                        Asociación Manos Abiertas con Norte es una entidad sin ánimo de lucro, perteneciente a la Red de Obras Socioeducativas
                        de La Salle, que trabaja en el ámbito de la intervención social en la barriada Polígono Norte y en el asentamiento 
                        chabolista de El Vacie, Sevilla.
                    </p>

                    <p>
                        Nació en el año 1995 con la misión de que niños/as y jóvenes que se encuentran en situación de vulnerabilidad social 
                        tengan una vida más digna, convencidos de que la educación es la llave para prevenir situaciones de exclusión.
                    </p>

                    <p>
                        Con los proyectos que lleva a cabo, Manos Abiertas pretende dar respuesta a las necesidades detectadas tanto a nivel 
                        familiar y personal como en el barrio. El principal fin de Manos Abiertas con Norte es educar de forma integral a la 
                        población con la que trabajamos: jóvenes de 3 a 18 años. Ofreciendo una educación completa mediante proyectos 
                        socioeducativos y a través del refuerzo en destrezas básicas, técnicas y apoyo al estudio.
                    </p>
                    
                </div>
            </div>

            <Footer/>

        </div>
        

    );
}
export default AboutUs;