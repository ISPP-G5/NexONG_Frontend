import '../styles/styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function FamilyWorkshops() {
    return (
        <div className="App">

            <Header/>

            <div className='main'>
                <div className='title-text'>TALLERES FAMILIARES</div>
                <div className='flex-container-blue'>
                    Actividades formativas y de poyo para las familias
                </div>
                <div className='text'>
                    Sesiones quincenales
                </div>
            </div>

            <Footer/>

        </div>
        

    );
}
export default FamilyWorkshops;