import '../styles/styles.css';
import Footer from '../components/Footer';
import Intro from '../components/Intro'; 
import Header from '../components/Header';
import HomepageContainer from '../components/HomepageContainer';

const info = [
    {
        title: 'Nosotros', 
        description: 'Pequeña desc explicativa', 
        link: '/nosotros',
        button: 'Conócenos'
    },
    {
        title: 'Historia', 
        description: 'Pequeña desc', 
        link: '/historia',
        button: 'Leer más'
    },
    {
        title: 'Dónde estamos', 
        description: 'Pequeña desc', 
        link: '/donde-estamos',
        button: 'Leer más'
    },
    {
        title: 'Mision, Visión y Valores', 
        description: 'Pequeña desc', 
        link: '/mision-vision-valores',
        button: 'Lee más'
    },
    {
        title: 'La salle', 
        description: 'Pequeña desc', 
        link: '/',
        button: 'Leer más'
    },
    {
        title: 'Organización', 
        description: 'Pequeña desc', 
        link: '/',
        button: 'Leer más'
    },
    {
        title: 'Transparencia', 
        description: 'Pequeña desc', 
        link: '/transparencia',
        button: 'Leer más'
    },
    {
        title: 'Entidades Colaboradoras', 
        description: 'Pequeña desc', 
        link: '/entidades-colaboradoras',
        button: 'Conócelas'
    }
];

function HomePageAssociation() {
    return(
        <div className="App">
            <Header/>
            <Intro 
                title="ASOCIACIÓN"
                description="Nuestra identidad está marcada por la educación no formal que consideramos fundamental en nuestra zona de actuación y la implantamos de manera dinámica y abierta con el fin de adaptarnos a las nuevas necesidades que nuestros beneficiarios presentan y que descubrimos a través de los estudios de la zona y la observación directa."
                image={'activities'}
            />
            <HomepageContainer info={info} />
            <Footer/>
        </div>
    );
}

export default HomePageAssociation;