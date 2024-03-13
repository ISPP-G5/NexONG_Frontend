import '../styles/styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Intro from '../components/Intro';

function Camps() {
    return (
        <div className="App">
            <Header/>
            <Intro 
                title='CAMPAMENTO DE VERANO'
                description='Realización de campamentos de verano para menores de educación primaria y secundaria'
                image={'camps'}
            />
               
            <div className='info-text'>
                <h4>
                    Esta actividad la hemos realizado como cada año junto
                    a la Asociación Rutas Sevilla como culmen al trabajo
                    desarrollado durante el curso, ofreciendo a los chavales
                    una alternativa de convivencia y relaciones, en un marco
                    diferente al habitual. Dicha actividad nos permite
                    fomentar los valores y actitudes trabajados durante el año,
                    en coherencia y responsabilidad con la línea mantenida
                    durante el curso.
                </h4>
            </div>
            <Footer/>
        </div>
    );
}
export default Camps;