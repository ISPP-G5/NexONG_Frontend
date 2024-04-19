import '../../styles/styles.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LayoutHomepage from '../../components/LayoutHomepage';
import FundacionLaCaixa from '../../logo/ColaboratorsEntities/+fundacion-la-caixa.jpg';
import Logotipo_de_la_Junta_de_Andalucia_2020 from '../../logo/ColaboratorsEntities/Logotipo_de_la_Junta_de_Andalucia.png';
import ayuntamientoSevilla from '../../logo/ColaboratorsEntities/logo_ayuntamiento_sevilla.png';
import consejeriaIgualdad from  '../../logo/ColaboratorsEntities/Logo_de_la_Consejeria_de_Inclusion_Social_Juventud_Familias_e_Igualdad_de_la_Junta_de_Andalucia.png';
import misnis from '../../logo/ColaboratorsEntities/misnis2030-150x150.jpg';
import pablOlavide from  '../../logo/ColaboratorsEntities/pablo-olavide.jpg';
import consejoSocialUs from  '../../logo/ColaboratorsEntities/consejo-social-us.jpg'
import fp from  '../../logo/ColaboratorsEntities/ministerioFP.jpg'
const entidadesData = [
    {
        name:"Junta de andalucia",
        img:Logotipo_de_la_Junta_de_Andalucia_2020,
        link:'https://www.juntadeandalucia.es/'
    },
    {
        name:"Ayuntamiento de Sevilla",
        img:ayuntamientoSevilla,
        link:'https://www.sevilla.org/servicios/servicios-sociales'
    },
    {
        name:"Fundación La Caixa",
        img:FundacionLaCaixa,
        link:'https://fundacionlacaixa.org/es/programas-sociales'
    },
    {
        name:"Consejería de Inclusión Social, Juventud, Familias e Igualdad J.A.",
        img:consejeriaIgualdad,
        link:'https://www.juntadeandalucia.es/organismos/inclusionsocialjuventudfamiliaseigualdad.html'
    },
    {
        name:"Ministerio de derechos sociales y agenda 2030",
        img:misnis,
        link:'https://www.mdsocialesa2030.gob.es/'
    },
    {
        name:"Universidad Pablo Olavide",
        img:pablOlavide,
        link:'https://www.upo.es/portal/impe/web/portada/index.html'
    },
    {
        name:"Consejo Social Universidad de Sevilla",
        img:consejoSocialUs,
        link:'https://institucional.us.es/consejosocial/'
    },
    {
        name:"Ministerio de Educación y Formación Profesional",
        img:fp,
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
            image={'colab'}
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
