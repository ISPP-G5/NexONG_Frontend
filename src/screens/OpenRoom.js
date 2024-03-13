import '../styles/styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Intro from '../components/Intro';

function OpenRoom() {
    return (
        <div className="App">
            <Header/>
            <Intro 
                title='AULA ABIERTA'
                description='Refuerzo educativo para menores entre 6 y 18 años así como actividades de relajacion y reflexión'
                image='openRoom'
            />
            <div className='homepage-text'>
                <p>
                    El programa escolar está destinado a mejorar las
                    perspectivas escolares de los chicos y chicas.
                    <br/>
                    <br/>
                    Trabajamos a través del refuerzo de destrezas básicas,
                    de la mejora en el hábito lector y de la incorporación
                    plena al ritmo de trabajo en el aula en la exigencia de
                    las diferentes materias.
                    <br/>
                    <br/>
                    Aportamos a cada alumno/a nuevas herramientas en su
                    proceso de aprendizaje de tal forma que pueda aplicarlas
                    a otras áreas académicas y a su propio desarrollo
                    evolutivo y le sean de utilidad en posteriores aprendizajes.
                    En la intervención además se trabajan las dificultades
                    específicas que se presenten en las diferentes asignaturas.
                </p>
            </div>
            <Footer/>
        </div>
    );
}
export default OpenRoom;