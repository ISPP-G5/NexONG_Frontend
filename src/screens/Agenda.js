import '../styles/styles.css';
import logros from '../logo/agenda-logros.png';
import globalGoals from '../logo/global-goals.png';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Agenda() {
        return (
        <div className="App">
            <Header />
            <div className='main'>
                <img src={globalGoals} alt="Background" className='background-pic'/>    
                <div className='bg-text'>
                    <h1>Agenda 2030</h1>
                    <h3>En septiembre de 2015 se aprobó por parte de la Asamblea General de las Naciones Unidas la Agenda 2030 para el Desarrollo Sostenible y con ella, los Objetivos de Desarrollo Sostenible (ODS).</h3>
                    <h3>Esta Agenda es una llamada mundial para adoptar medidas que logren acabar con los grandes problemas del planeta: poner fin a la pobreza y a la desigualdad, alcanzar la igualdad de género y el acceso para todos a un trabajo digno, facilitar el acceso a servicios de salud y a una educación adecuada, proteger el medioambiente, y garantizar que todas las personas disfruten de paz y prosperidad.</h3>  
                    <h3>En este nuevo marco, las ONG tenemos un protagonismo decisivo. Es por ello que en Asociación Manos Abiertas con Norte trabajamos día a día  para medir y gestionar nuestra contribución a los ODS.</h3>
                </div>
                <h2 className='h2'>The global goals</h2>
                <img src={logros} alt="Logros"/>

                
            </div>
            <Footer />
        </div>
         );
    }
export default Agenda;    
