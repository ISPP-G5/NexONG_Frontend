import { Link } from 'react-router-dom';
import logo from '../logo/macn-logo.png';
import '../styles/styles.css';
import LogoutButton from './LogOutButton';

function HeaderProfiles({ profile, id }) {
    return (
        <div className='header-profiles'>
            <img className='header-logo' src={logo} alt='logo' />
            <p>Manos Abiertas Con Norte</p>
            
            <div className="header-content">
                <Link to={`/${profile}/perfil`} >{profile}</Link>
                <LogoutButton />
            </div>

        </div>
    );
}

export default HeaderProfiles;
