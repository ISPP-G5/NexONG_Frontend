import logo from '../logo/macn-logo.png';
import {Link} from 'react-router-dom';
import '../styles/styles.css';

function Header(){
    return (
        <div className='header'>
        <div>
            <Link to="/">
                <img src={logo} alt="Logo" className="header-logo" />
            </Link>
        </div>
        <ul>
            <li className="dropdown">
                <Link to="/asociacion">Asociación</Link>
                <div className="dropdown-content">
                    <Link to="/nosotros">Nosotros</Link>
                    <Link to="/historia">Historia</Link>
                    <Link to="/donde-estamos">Dónde estamos</Link>
                    <Link to="/">Organización</Link>
                    <Link to="/transparencia">Transparencia</Link>
                    <Link to="/entidades-colaboradoras">Entidades Colaboradoras</Link>

                </div>
            </li>
            <li className="dropdown">
                <Link to="/actividades">Actividades</Link>
                <div className="dropdown-content">
                    <Link to="/campamentos">Campamento de verano</Link>
                    <Link to="/aula-abierta">Aula abierta</Link>
                    <Link to="/aula-convivencia">Aula de convivencia</Link>
                    <Link to="/talleres-familiares">Talleres familiares</Link>
                    <Link to="/club-verano">Club de verano</Link>
                </div>
            </li>
            <li><Link to="/agenda">Agenda</Link></li>
            <li><Link to="/donaciones">Donaciones</Link></li>
            <li><Link to="/voluntariado">Voluntariado</Link></li>
            <li><Link to="/sugerencias">Sugerencias</Link></li>
            <li><Link to="/registrarse">Registrarse</Link></li>
            <li className='login'><Link to="/iniciar-sesion">Iniciar Sesión</Link></li> 
        </ul>
   
        </div>
        
    );
}
export default Header; 
