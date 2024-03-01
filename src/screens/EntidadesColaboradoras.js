import '../styles/styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';


const entidadesData = [{nombre:"Junta de andalucia",img:'http://manosabiertasnorte.es/wp-content/uploads/2023/05/1280px-Logotipo_de_la_Junta_de_Andalucia_2020.svg_-300x169.png',link:'https://www.juntadeandalucia.es/'},{nombre:"Ayuntamiento de Sevilla",img:"http://manosabiertasnorte.es/wp-content/uploads/2023/05/logo_ayuntamiento_sevilla.png",link:'https://www.sevilla.org/servicios/servicios-sociales'},{nombre:"Fundación La Caixa",img:"http://manosabiertasnorte.es/wp-content/uploads/2023/05/423-4232501_fundacion-la-caixa-300x280.jpg",link:'https://fundacionlacaixa.org/es/programas-sociales'}
,{nombre:"	Consejería de Inclusión Social, Juventud, Familias e Igualdad J.A.",img:"http://manosabiertasnorte.es/wp-content/uploads/2023/05/Logo_de_la_Consejeria_de_Inclusion_Social_Juventud_Familias_e_Igualdad_de_la_Junta_de_Andalucia.png",link:'https://www.juntadeandalucia.es/organismos/inclusionsocialjuventudfamiliaseigualdad.html'},{nombre:"Ministerio de derechos sociales y agenda 2030",img:"http://manosabiertasnorte.es/wp-content/uploads/2023/05/misnis2030-150x150.jpg",link:'https://www.mdsocialesa2030.gob.es/'},{nombre:"Universidad Pablo Olavide",img:"http://manosabiertasnorte.es/wp-content/uploads/2023/05/Logos_avales_unis_cuadrados-01-1-150x150.jpg",link:'https://www.upo.es/portal/impe/web/portada/index.html'},
{nombre:"Consejo Social Universidad de Sevilla",img:"http://manosabiertasnorte.es/wp-content/uploads/2023/05/LogoCSUS-300x231.jpg",link:'https://institucional.us.es/consejosocial/'},{nombre:"Ministerio de Educación y Formación Profesional",img:"http://manosabiertasnorte.es/wp-content/uploads/2023/05/ministerioFP-150x150.jpg",link:'https://www.educacionyfp.gob.es/portada.html'}]


function EntidadesColaboradoras() {
    return (
        <main className="App">
            <Header />
            <div style={{ backgroundColor: '#eaf5f8', height: '120px', marginTop: '100px' }}>
                <h1>Entidades Colaboradoras</h1>
                <Link to={'/'} style={{ color: 'black' }}> Home </Link>
            </div>
            <h5>Nuestro proyecto recibe ayudas y subvenciones de los asociados y de diversas entidades públicas y privadas que hacen posible la transformación social del entorno.</h5>
            <hr style={{ width: '100%', height: '0.5px', background: 'black' }} />
            <div>
                <ul style={{marginLeft:'5%'}}>
                    {entidadesData.map(ed =>{return(
                    <li className='flex-container2' style={{marginBottom:'0.2%'}} >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img src={ed.img} alt={"imagen de" + ed.nombre } style={{
                                maxWidth: '100px',
                                maxHeight: '100px',
                                objectFit: 'cover',
                            }} />
                            <div style={{ marginLeft: '50px' }}>
                                <Link to={ed.link}>{ed.nombre}</Link>
                            </div>
                        </div>
                    </li>
                    )})}
                </ul>
            </div>
            <Footer />
        </main>
    );
}
export default EntidadesColaboradoras;    
