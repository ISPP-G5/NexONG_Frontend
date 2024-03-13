import '../styles/styles.css';
import Header from '../components/Header';
import Intro from '../components/Intro';
import Footer from '../components/Footer';

function FamilyWorkshops() {
    return (
        <div className="App">
            <Header/>
            <Intro 
                title='TALLERES FAMILIARES'
                description='Actividades formativas y de apoyo para las familias'
                image={'workshop'}
            />
            <div className='homepage-text'>
                <p>
                    Con este proyecto damos respuesta a las necesidades detectadas a nivel
                    individual y contextual, familias y barrio. Pretendemos educar de forma
                    integral a la población con la que trabajamos: Educando mediante el
                    ocio y el tiempo libre a través de juegos, actividades, talleres,
                    encuentros y convivencias.
                    <br/>
                    <br/>
                    Mediante juegos populares, debates, talleres, bailes, manualidades,
                    talleres, cineforum, potenciaremos la capacidad de transmitir emociones.
                </p>
            </div>
            <Footer/>
        </div>
    );
}
export default FamilyWorkshops;