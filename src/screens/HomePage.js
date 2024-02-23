import logo from '../logo/macn-logo.png';
import InboxIcon from '@material-ui/icons/Inbox';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import {Link} from 'react-router-dom';
import '../styles/styles.css';

function HomePage() {
        return (
        <div className="App">
        <div className='header'>
            <div>
            <Link to="/">
                <img src={logo} alt="Logo" className="header-logo" />
            </Link>

            <ul><li>
                <Link to="/actividades">Actividades</Link> {/* Usa el componente Link para crear enlaces a las rutas */}
                
                <ul>
                <li><Link to="/campamentos">Campamentos</Link></li>
                <li><Link to="/aula-abierta">Aula abierta</Link></li>
                <li><Link to="/aula-convivencia">Aula de convivencia</Link></li>
                <li><Link to="/talleres-familiares">Talleres familiares</Link></li>
                <li><Link to="/club-verano">Club de verano</Link></li>
              
                </ul>
            </li></ul>
            </div>
            <Link to="/donaciones">Donaciones</Link>
            <Link to="/sugerencias">
            Sugerencias
            <InboxIcon style={{ marginLeft: '10px',textAlign: 'c' }} />
            </Link>
            <Link to="/registrarse">Registrase</Link>
            <Link to="/iniciar-sesion">Iniciar Sesión</Link>


        </div>
        <div className='main'>
        <div className='title-text'>¿QUIÉNES SOMOS?</div>
        <div className='text'>Manos Abiertas surge como iniciativa en 1992. Un grupo de jóvenes voluntarios/as, detecta necesidades socioeducativas en la zona de Polígono Norte, Sevilla, y comienza a impartir clases de apoyo de matemáticas y lengua a los niños y niñas de los centros educativos de la zona: Blas Infante y Josefa Amor y Rico (Actualmente IES Inmaculada Vieira), en locales situados en bloques de la barriada.e</div>

            

            
        </div>
        <div className='footer'>
        <div className='header-text'>
            Email: <a href="mailto:manosabiertas@lasalleandalucia.net" style={{ color: 'black' }}>manosabiertas@lasalleandalucia.net</a>
            </div>
        <div className='header-text'>Polígono norte Sevilla (41009):</div>
        <div className='header-text'>
        <a href="https://www.facebook.com/ajmmaa/" target="_blank" rel="noopener noreferrer">
        <FacebookIcon style={{ color: '#3b5998' }} />
        </a>
        <a href="https://twitter.com/ajmmaa" target="_blank" rel="noopener noreferrer">
            <TwitterIcon style={{ color: '#1DA1F2' }} />
        </a>
        <a href="https://www.instagram.com/ajmanosabiertas/" target="_blank" rel="noopener noreferrer">
            <InstagramIcon style={{ color: '#C13584' }} />
        </a> 
        <a href="https://api.whatsapp.com/send/?phone=650485214&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon style={{ color: '#25D366' }} />
        </a>  
        </div>
        <div className='header-text'>Teléfonos: 650485214 || 640168593</div>
        <div className='header-text'>
            Plaza Río de Janeiro, 10 <br />
            <span className="indented-text">Calle Meléndez Valdés, 28</span>
        </div>
        <div className='header-text'></div>
        <div className='header-text'>Fax:158 425 252</div>
        </div>

        
        </div>
        

        );
    }
export default HomePage;    