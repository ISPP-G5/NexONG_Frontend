import logo from '../logo/macn-logo.png';
import '../styles/styles.css';
import LogoutButton from './LogOutButton';
import { Link } from 'react-router-dom';

function HeaderProfiles({ profile, id, showProfile = true}) {

    return (
        <div className='header-profiles'>
            <img className='header-logo' src={logo} alt='logo' />
            <p>Manos Abiertas Con Norte</p>
            <ul>
                <li className="dropdown">
                    <p>{profile}</p>
                    <div className="dropdown-content">
                        {showProfile && <Link to={`/${profile}/perfil`}>perfil</Link>}
                        <LogoutButton/>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default HeaderProfiles;
