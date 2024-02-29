import logo from '../logo/macn-logo.png';
import {Link} from 'react-router-dom';
import '../styles/styles.css';

function HeaderAdmin(){
    return (
        <div className='header-admin'>
            <img src={logo} alt='logo'/>
            <p>Manos Abiertas Con Norte</p>
            <a>
                <Link to={`/AdminProfile`}>Admin</Link>
            </a>
        </div>
        
    );
}
export default HeaderAdmin; 