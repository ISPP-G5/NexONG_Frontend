import '../../styles/styles.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LayoutHomepage from '../../components/LayoutHomepage';


const entidadesData = [
    {
        name:"Junta de andalucia",
        img:'http://manosabiertasnorte.es/wp-content/uploads/2023/05/1280px-Logotipo_de_la_Junta_de_Andalucia_2020.svg_-300x169.png',
        link:'https://www.juntadeandalucia.es/'
    },
    {
        name:"Ayuntamiento de Sevilla",
        img:"http://manosabiertasnorte.es/wp-content/uploads/2023/05/logo_ayuntamiento_sevilla.png",
        link:'https://www.sevilla.org/servicios/servicios-sociales'
    },
    {
        name:"Fundación La Caixa",
        img:"http://manosabiertasnorte.es/wp-content/uploads/2023/05/423-4232501_fundacion-la-caixa-300x280.jpg",
        link:'https://fundacionlacaixa.org/es/programas-sociales'
    },
    {
        name:"Consejería de Inclusión Social, Juventud, Familias e Igualdad J.A.",
        img:"http://manosabiertasnorte.es/wp-content/uploads/2023/05/Logo_de_la_Consejeria_de_Inclusion_Social_Juventud_Familias_e_Igualdad_de_la_Junta_de_Andalucia.png",
        link:'https://www.juntadeandalucia.es/organismos/inclusionsocialjuventudfamiliaseigualdad.html'
    },
    {
        name:"Ministerio de derechos sociales y agenda 2030",
        img:"http://manosabiertasnorte.es/wp-content/uploads/2023/05/misnis2030-150x150.jpg",
        link:'https://www.mdsocialesa2030.gob.es/'
    },
    {
        name:"Universidad Pablo Olavide",
        img:"http://manosabiertasnorte.es/wp-content/uploads/2023/05/Logos_avales_unis_cuadrados-01-1-150x150.jpg",
        link:'https://www.upo.es/portal/impe/web/portada/index.html'
    },
    {
        name:"Consejo Social Universidad de Sevilla",
        img:"http://manosabiertasnorte.es/wp-content/uploads/2023/05/LogoCSUS-300x231.jpg",
        link:'https://institucional.us.es/consejosocial/'
    },
    {
        name:"Ministerio de Educación y Formación Profesional",
        img:"http://manosabiertasnorte.es/wp-content/uploads/2023/05/ministerioFP-150x150.jpg",
        link:'https://www.educacionyfp.gob.es/portada.html'
    }]


function HomePageColaboratorEntities() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <LayoutHomepage 
            title="Entidades Colaboradoras"
            description="Nuestro proyecto recibe ayudas y subvenciones de los asociados y de diversas entidades públicas y privadas que hacen posible la transformación social del entorno."
            image={'ong'}
        > 
            
            <div className='homepage-container'>
                {entidadesData.map(ed =>{return(
                <div className='flex-container'>
                    <img className="colab-image" src={ed.img} alt={"imagen de" + ed.nombre } />
                    <h4><Link to={ed.link}>{ed.name}</Link></h4>
                </div>
                )})}
            </div>
        </LayoutHomepage>
    );
}
export default HomePageColaboratorEntities;    
