import { Link } from 'react-router-dom';
import logo from '../logo/macn-logo.png';
import '../styles/styles.css';

function HeaderAdmin({ id }){
    return (
        <div className='header-admin'>
            <img src={logo} alt='logo'/>
            <p>Manos Abiertas Con Norte</p>
            <a href='/AdminProfile'>Admin</a>
        </div>
    );
}
export default HeaderAdmin;