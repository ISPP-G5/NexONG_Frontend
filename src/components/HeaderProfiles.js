import { Link } from 'react-router-dom';
import logo from '../logo/macn-logo.png';
import '../styles/styles.css';

function HeaderProfiles({profile, id}){

    return (
        <div className='header-profiles'>
            <img className='header-logo' src={logo} alt='logo'/>
            <p>Manos Abiertas Con Norte</p>
            <Link to={`/${profile}/perfil`}>{profile}</Link>        
        </div>
    );
}
export default HeaderProfiles;