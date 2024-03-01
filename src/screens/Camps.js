import '../styles/styles.css';
import camps from '../logo/camps.jpg'
import Header from '../components/Header';
import Footer from '../components/Footer';

function Camps() {
    return (
        <div className="App">
            <Header/>
            <div className='main'>
                <img src={camps} alt="Camps" className='background-pic'/>
                <div className='bg-text'>
                    <h1>CAMPAMENTOS</h1>
                    <h3>
                        Realización de campamentos de verano para menores
                        de educación primaria y secundaria
                    </h3>
                </div>
                <div className='flex-container'>
                    <h3>
                        Esta actividad la hemos realizado como cada año junto
                        a la Asociación Rutas Sevilla como culmen al trabajo
                        desarrollado durante el curso, ofreciendo a los chavales
                        una alternativa de convivencia y relaciones, en un marco
                        diferente al habitual. Dicha actividad nos permite
                        fomentar los valores y actitudes trabajados durante el año,
                        en coherencia y responsabilidad con la línea mantenida
                        durante el curso.
                    </h3>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
export default Camps;