import '../../styles/styles.css';
import { useEffect } from 'react';
import LayoutHomepage from '../../components/LayoutHomepage';

function HomePageSummerClub() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <LayoutHomepage 
            title='CLUB DE VERANO'
            description='Club de verano para alumnos de primaria'
            image={'summerClub'}
        >  
            <div className='homepage-text'>
                <p>
                    Organizado por Asociación Manos Abiertas y animado por un
                    grupo de jóvenes lasalianos de diferentes procedencias de
                    Andalucía que se comprometen de forma voluntaria y
                    desinteresada a desarrollar, durante el verano, un trabajo
                    de proyección social: Club de Verano Polígono Norte.
                    <br/>
                    <br/>
                    Tiene lugar en el mes de junio-julio principalmente, en
                    Polígono Norte de Sevilla. Participan más de 60 niños y
                    niñas en esta actividad repleta de talleres, juegos, valores,
                    excursiones y convivencias, entre otras muchas dinámicas que
                    se llevan a cabo.
                </p>
            </div>
        </LayoutHomepage>
    );
}
export default HomePageSummerClub;