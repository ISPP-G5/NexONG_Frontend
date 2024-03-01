import '../styles/styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';


const entidadesData = [{nombre:"Junta de andalucia",img:'http://manosabiertasnorte.es/wp-content/uploads/2023/05/1280px-Logotipo_de_la_Junta_de_Andalucia_2020.svg_-300x169.png',link:'https://www.juntadeandalucia.es/'},{nombre:"Ayuntamiento de Sevilla",img:"http://manosabiertasnorte.es/wp-content/uploads/2023/05/logo_ayuntamiento_sevilla.png",link:'https://www.sevilla.org/servicios/servicios-sociales'},{nombre:"Fundación La Caixa",img:"http://manosabiertasnorte.es/wp-content/uploads/2023/05/423-4232501_fundacion-la-caixa-300x280.jpg",link:'https://fundacionlacaixa.org/es/programas-sociales'}
,{nombre:"	Consejería de Inclusión Social, Juventud, Familias e Igualdad J.A.",img:"http://manosabiertasnorte.es/wp-content/uploads/2023/05/Logo_de_la_Consejeria_de_Inclusion_Social_Juventud_Familias_e_Igualdad_de_la_Junta_de_Andalucia.png",link:'https://www.juntadeandalucia.es/organismos/inclusionsocialjuventudfamiliaseigualdad.html'},{nombre:"Ministerio de derechos sociales y agenda 2030",img:"http://manosabiertasnorte.es/wp-content/uploads/2023/05/misnis2030-150x150.jpg",link:'https://www.mdsocialesa2030.gob.es/'},{nombre:"Universidad Pablo Olavide",img:"http://manosabiertasnorte.es/wp-content/uploads/2023/05/Logos_avales_unis_cuadrados-01-1-150x150.jpg",link:'https://www.upo.es/portal/impe/web/portada/index.html'},
{nombre:"Consejo Social Universidad de Sevilla",img:"http://manosabiertasnorte.es/wp-content/uploads/2023/05/LogoCSUS-300x231.jpg",link:'https://institucional.us.es/consejosocial/'},{nombre:"Ministerio de Educación y Formación Profesional",img:"http://manosabiertasnorte.es/wp-content/uploads/2023/05/ministerioFP-150x150.jpg",link:'https://www.educacionyfp.gob.es/portada.html'}]


function WhereWeAre() {
    return (
        <main className="App">
            <Header />
            <div className='div-container'>
                <h1>Donde estamos</h1>
                <Link to={'/'} style={{ color: 'black' }}> Home </Link>
            </div>
            <div className='div-container' style={{display:'flex',flexDirection:'row', width:'50%',marginLeft:'25%'}}>
                <h4>Local calle Meléndez Valdés, 28. 41010. Sevilla</h4>
                <h4 style={{marginLeft:'50%'}}>Local Plaza Río de Janeiro, 10. 41010. Sevilla</h4>
            </div>
            <hr style={{ width: '100%', height: '0.5px', background: 'black' }} />
            <div style={{display:'flex',justifyContent:'center'}}>
                <img src={"https://www.google.com/maps/vt/data=K_jSGYoU1OY1H-NZmOG5ttEJnCL75QmjeBdsD70fjjwxn80zE6TEDch7kmiow0RRlTiKYWfqu40iBM7VaiayO8z5MK7mcM0wS1dPIu0cGtPkPndf1e3w45u52IiOwBFTPOHUntnwOM9vstTWBbdP0IuHpkobIeIzj4HiP3-QAFBqwBtNHeOgSUDe46KYdBb5Qn3kFbOld6opz1D51I3Cpj-llP1K2I0QNQc"} alt={"Local calle Meléndez Valdés" } style={{maxWidth: '600px',  maxHeight: '600px',objectFit: 'cover',marginRight:'5%'}} />
                <img src={"https://www.google.com/maps/vt/data=LthIk07Q-LGT61zjTqu7LNF982EUbKNK_jHEgpBdPa2ketXEq8BuvyNKzMqsOEAITgamdsp8EBbnelsNJJnmdUe-DIPpm3MhU7V6tD4tzOT9ovMoGHxqzS2moj4UIyXlFvIVxSj6uhH78jVmvW92QpqcsfpgaSdC3yY2Ye75f8sqSlu4uio1LtB9SSq_n0DaQE-ulkA2jvkz-2w0dXUYomg4iAF-acefuGc"} alt={"Local Plaza Río de Janeiro, 10. 41010. Sevilla" } style={{maxWidth: '600px',  maxHeight: '600px',objectFit: 'cover'}} />
            </div>
            <Footer />
        </main>
    );
}
export default WhereWeAre;    
