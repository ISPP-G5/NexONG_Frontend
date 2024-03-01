import '../styles/styles.css';
import familyWorkshops from '../logo/family-workshops.jpg'
import Header from '../components/Header';
import Footer from '../components/Footer';

function FamilyWorkshops() {
    return (
        <div className="App">
            <Header/>
            <div className='main'>
                <img src={familyWorkshops} alt="FamilyWorkshops" className='background-pic'/>
                <div className='bg-text'>
                    <h1>TALLERES FAMILIARES</h1>
                    <h3>
                        Actividades formativas y de apoyo para las familias
                    </h3>
                </div>
                <div className='flex-container'>
                    <h3>
                        Con este proyecto damos respuesta a las necesidades detectadas a nivel
                        individual y contextual, familias y barrio. Pretendemos educar de forma
                        integral a la población con la que trabajamos: Educando mediante el
                        ocio y el tiempo libre a través de juegos, actividades, talleres,
                        encuentros y convivencias.
                        <br/>
                        Mediante juegos populares, debates, talleres, bailes, manualidades,
                        talleres, cineforum, potenciaremos la capacidad de transmitir emociones.
                    </h3>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
export default FamilyWorkshops;