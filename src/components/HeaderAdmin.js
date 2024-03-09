import logo from '../logo/macn-logo.png';
import '../styles/styles.css';

function HeaderAdmin({id}){
    return (
        <div className='header-admin'>
            <img src={logo} alt='logo'/>
            <p>Manos Abiertas Con Norte</p>
            <a href='/AdminPerfil'>Admin</a>
        </div>
        
    );
}
export default HeaderAdmin; 