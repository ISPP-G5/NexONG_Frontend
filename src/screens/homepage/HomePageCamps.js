import '../../styles/styles.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Intro from '../../components/Intro';

function HomePageCamps() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <div className="App">
            <Header/>
            <Intro 
                title='CAMPAMENTO DE VERANO'
                description='Realización de campamentos de verano para menores de educación primaria y secundaria'
                image={'camps'}
            />
            <div className='homepage-text'>
                <p>
                    Esta actividad la hemos realizado como cada año junto
                    a la <Link to='https://asociacionjuvenilr1.wixsite.com/rutasdesevilla'>Asociación Rutas Sevilla</Link> como culmen al trabajo
                    desarrollado durante el curso, ofreciendo a los chavales
                    una alternativa de convivencia y relaciones, en un marco
                    diferente al habitual. Dicha actividad nos permite
                    fomentar los valores y actitudes trabajados durante el año,
                    en coherencia y responsabilidad con la línea mantenida
                    durante el curso.
                </p>
            </div>
            <Footer/>
        </div>
    );
}
export default HomePageCamps;