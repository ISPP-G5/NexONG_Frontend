import '../../styles/styles.css';
import { useEffect } from 'react';
import LayoutHomepage from '../../components/LayoutHomepage';

function HomePageOpenRoom() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <LayoutHomepage 
            title='AULA ABIERTA'
            description='Refuerzo educativo para menores entre 6 y 18 años así como actividades de relajacion y reflexión'
            image='openRoom'
        >  
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
        </LayoutHomepage>
    );
}
export default HomePageOpenRoom;