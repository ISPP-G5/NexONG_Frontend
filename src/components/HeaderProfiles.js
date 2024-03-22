import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo/macn-logo.png';
import '../styles/styles.css';
import LogoutButton from './LogOutButton';

function HeaderProfiles({ profile, id }) {

    const navigate = useNavigate();

    const move = () => {
        navigate(`/${profile}/perfil`); // Redireccionar a la página de inicio
      };
    
      return (
        <div className='header-profiles'>
            <img className='header-logo' src={logo} alt='logo' />
            <p>Manos Abiertas Con Norte</p>
            
                <button className='prof-button' onClick={move}>Perfil</button> 
                <LogoutButton/>
                
        </div>
    );
}

export default HeaderProfiles;
