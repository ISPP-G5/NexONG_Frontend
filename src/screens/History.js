import '../styles/styles.css';
import activities from '../logo/activities.bmp';
import Header from '../components/Header';
import Footer from '../components/Footer';
import chronology from '../logo/actividades-jpg-01.jpg';

function History() {
    return (
        <div className="App">
            <Header/>

            <div className='main'>
            <img src={activities} alt="Activities" className='background-pic'/> 
                <div className='bg-text'>
                    <h1>HISTORIA</h1>
                    <h3>En 1992, jóvenes voluntarios en Sevilla fundaron Manos Abiertas para ofrecer clases de apoyo a niños del 
                        Polígono Norte. En 2015, evolucionaron a Asociación Manos Abiertas con Norte, profesionalizando su intervención 
                        y colaborando con diversas entidades. Hoy, cuentan con un equipo técnico, voluntarios y colaboradores, 
                        manteniendo su compromiso con la comunidad.</h3>
                </div>
                <img src={chronology} alt="Chronology"/> 
            </div>

            <Footer/>
        </div>
    );
}

export default History;
