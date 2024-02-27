import logo from '../logo/macn-logo.png';
import InboxIcon from '@material-ui/icons/Inbox';
import {Link} from 'react-router-dom';
import '../styles/styles.css';

function Header(){
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
    </div>    
   
        
    );
}
export default Header; 