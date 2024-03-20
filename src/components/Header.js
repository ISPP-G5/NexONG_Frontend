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
                    <Link to="/asociacion/nosotros">Nosotros</Link>
                    <Link to="/asociacion/historia">Historia</Link>
                    <Link to="/asociacion/donde-estamos">Dónde estamos</Link>
                    <Link to="/asociacion/mision-vision-valores">Misión, Visión y Valores</Link>
                    <Link to="/asociacion/la-salle">La salle</Link>
                    <Link to="/asociacion/organizacion">Organización</Link>
                    <Link to="/asociacion/transparencia">Transparencia</Link>
                    <Link to="/asociacion/entidades-colaboradoras">Entidades Colaboradoras</Link>

                </div>
            </li>
            <li className="dropdown">
                <Link to="/actividades">Actividades</Link>
                <div className="dropdown-content">
                    <Link to="/actividades/campamentos">Campamento de verano</Link>
                    <Link to="/actividades/aula-abierta">Aula abierta</Link>
                    <Link to="/actividades/aula-convivencia">Aula de convivencia</Link>
                    <Link to="/actividades/talleres-familiares">Talleres familiares</Link>
                    <Link to="/actividades/club-verano">Club de verano</Link>
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
