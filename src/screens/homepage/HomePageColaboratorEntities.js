import '../../styles/styles.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LayoutHomepage from '../../components/LayoutHomepage';
import FundacionLaCaixa from '../../logo/ColaboratorsEntities/la-caixa.jpg';
import Logotipo_de_la_Junta_de_Andalucia_2020 from '../../logo/ColaboratorsEntities/log-andalucia.png';
import ayuntamientoSevilla from '../../logo/ColaboratorsEntities/ayutamiento_sevilla.png';
import consejeriaIgualdad from  '../../logo/ColaboratorsEntities/logo-igualdad-andalucia.png';
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
            title="ENTIDADES COLABORADORAS"
            description="Nuestro proyecto recibe ayudas y subvenciones de los asociados y de diversas entidades públicas y privadas que hacen posible la transformación social del entorno."
            image={'colab'}
            info={entidadesData}
        /> 
    );
}
export default HomePageColaboratorEntities;    
