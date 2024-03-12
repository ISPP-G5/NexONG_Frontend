import '../styles/styles.css';
import logros from '../logo/agenda-logros.png';
import globalGoals from '../logo/global-goals.png';
import Footer from '../components/Footer';
import Structure from '../components/Intro';

function Agenda() {
    return (
        <>
            <Structure 
                title="Agenda 2030"
                description="En septiembre de 2015 se aprobó por parte de la Asamblea General de las Naciones Unidas la Agenda 2030 para el Desarrollo Sostenible y con ella, los Objetivos de Desarrollo Sostenible (ODS). Esta Agenda es una llamada mundial para adoptar medidas que logren acabar con los grandes problemas del planeta: poner fin a la pobreza y a la desigualdad, alcanzar la igualdad de género y el acceso para todos a un trabajo digno, facilitar el acceso a servicios de salud y a una educación adecuada, proteger el medioambiente, y garantizar que todas las personas disfruten de paz y prosperidad. En este nuevo marco, las ONG tenemos un protagonismo decisivo. Es por ello que en Asociación Manos Abiertas con Norte trabajamos día a día  para medir y gestionar nuestra contribución a los ODS."
                image={globalGoals}
                additionalImage={logros}
            />
            <Footer />
        </>
    );
}
export default Agenda;    
