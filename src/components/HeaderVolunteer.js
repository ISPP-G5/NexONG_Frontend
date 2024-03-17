import logo from '../logo/macn-logo.png';
import '../styles/styles.css';

function HeaderVolunteer(){
    return (
        <div className='header-volunteer'>
            <img src={logo} alt='logo'/>
            <p>Manos Abiertas Con Norte</p>
            <a href='/voluntarioPerfil'>Voluntario</a>
        </div>
        
    );
}
export default HeaderVolunteer; 